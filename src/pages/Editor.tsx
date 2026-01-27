import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Play, ArrowLeft, Save, Palette, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { EDITOR_THEMES, EditorThemeKey } from "@/components/editor/EditorThemes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  modules: {
    "app.rb": string;
    "routes.rb": string;
    "models.rb": string;
    "ui_logic.rb": string;
  };
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
  error?: string;
}

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [modules, setModules] = useState<Project["modules"]>({
    "app.rb": "",
    "routes.rb": "",
    "models.rb": "",
    "ui_logic.rb": "",
  });
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("app.rb");
  const [currentTheme, setCurrentTheme] = useState<EditorThemeKey>("monokai");
  const monacoRef = useRef<Monaco | null>(null);

  useEffect(() => {
    checkAuth();
    fetchProject();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      const projectData = data as unknown as Project;
      setProject(projectData);
      setModules(projectData.modules);
    } catch (error: any) {
      toast.error("Failed to load project");
      navigate("/dashboard");
    }
  };

  const saveProject = async () => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ modules })
        .eq("id", id);

      if (error) throw error;
      toast.success("Project saved!");
    } catch (error: any) {
      toast.error("Failed to save project");
    }
  };

  const handleEditorMount = useCallback((monaco: Monaco) => {
    monacoRef.current = monaco;
    Object.entries(EDITOR_THEMES).forEach(([key, theme]) => {
      monaco.editor.defineTheme(key, theme.data);
    });
    monaco.editor.setTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeChange = useCallback((theme: EditorThemeKey) => {
    setCurrentTheme(theme);
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme);
    }
  }, []);

  const executeRubyCode = useCallback(async (rubyCode: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke<ExecutionResult>("execute-ruby", {
        body: { code: rubyCode },
      });

      if (error) {
        return `❌ Error: ${error.message}`;
      }

      if (!data) {
        return "❌ No response from execution service";
      }

      if (data.error) {
        return `❌ ${data.error}`;
      }

      let result = "";
      
      if (data.stdout) {
        result += data.stdout;
      }
      
      if (data.stderr) {
        result += result ? "\n" : "";
        result += `⚠️ Stderr:\n${data.stderr}`;
      }

      if (data.success) {
        result += result ? "\n\n" : "";
        result += "✓ Execution completed successfully";
      } else {
        result += result ? "\n\n" : "";
        result += `✗ Exited with code ${data.exitCode}`;
      }

      return result || "# No output generated";
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return `❌ Execution failed: ${errorMessage}`;
    }
  }, []);

  const runCode = useCallback(async () => {
    setRunning(true);
    setOutput("▶ Executing Ruby code...\n");
    
    const result = await executeRubyCode(modules[activeTab as keyof Project["modules"]]);
    setOutput(result);
    setRunning(false);
  }, [modules, activeTab, executeRubyCode]);

  const updateModule = (moduleName: keyof Project["modules"], value: string) => {
    setModules((prev) => ({
      ...prev,
      [moduleName]: value,
    }));
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <h1 className="font-semibold">{project.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Palette className="w-4 h-4 mr-2" />
                {EDITOR_THEMES[currentTheme].name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              {Object.entries(EDITOR_THEMES).map(([key, theme]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleThemeChange(key as EditorThemeKey)}
                  className={currentTheme === key ? "bg-accent" : ""}
                >
                  {theme.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={saveProject}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={runCode} disabled={running} className="gradient-ruby text-white">
            {running ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {running ? "Running..." : "Run"}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-border bg-card px-4">
              <TabsList className="h-12">
                <TabsTrigger value="app.rb">app.rb</TabsTrigger>
                <TabsTrigger value="routes.rb">routes.rb</TabsTrigger>
                <TabsTrigger value="models.rb">models.rb</TabsTrigger>
                <TabsTrigger value="ui_logic.rb">ui_logic.rb</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(modules).map(([name, content]) => (
              <TabsContent key={name} value={name} className="flex-1 m-0">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="ruby"
                  value={content}
                  onChange={(value) => updateModule(name as keyof Project["modules"], value || "")}
                  theme={currentTheme}
                  beforeMount={handleEditorMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="w-96 border-l border-border bg-card flex flex-col">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Console Output</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${running ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`} />
              <span className="text-xs text-muted-foreground">Ruby 3.0.1</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <Card className="bg-[hsl(var(--code-bg))] border-border h-full">
              <pre className="p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
                {output || "// Console output will appear here"}
              </pre>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
