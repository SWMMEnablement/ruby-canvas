import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Play, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

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

  const runCode = async () => {
    setRunning(true);
    setOutput("▶ Running Ruby code...\n\n");
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`▶ Running Ruby code...\n\n${modules["app.rb"]}\n\n✓ Execution completed\n\nNote: This is a demo. Connect to a Ruby runtime for actual execution.`);
      setRunning(false);
    }, 1000);
  };

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
          <Button variant="outline" onClick={saveProject}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={runCode} disabled={running} className="gradient-ruby text-white">
            <Play className="w-4 h-4 mr-2" />
            Run
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
              <TabsContent key={name} value={name} className="flex-1 m-0 p-4">
                <Textarea
                  value={content}
                  onChange={(e) => updateModule(name as keyof Project["modules"], e.target.value)}
                  className="h-full font-mono text-sm resize-none bg-[hsl(var(--code-bg))] text-foreground border-border"
                  placeholder={`// ${name}\n\nWrite your Ruby code here...`}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="w-96 border-l border-border bg-card flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="font-semibold">Console Output</h2>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <Card className="bg-[hsl(var(--code-bg))] border-border">
              <pre className="p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
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
