import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, RotateCcw, Sparkles } from "lucide-react";

const SAMPLE_CODE = `# Welcome to ICM Ruby Studio!
# Try editing this code and click "Run" to see it execute.

class Greeter
  def initialize(name)
    @name = name
  end

  def greet
    puts "Hello, #{@name}! 👋"
    puts "Welcome to Ruby programming."
  end

  def calculate_sum(numbers)
    total = numbers.reduce(0) { |sum, n| sum + n }
    puts "Sum of #{numbers.inspect}: #{total}"
    total
  end
end

# Create a greeter and run some code
greeter = Greeter.new("Developer")
greeter.greet
greeter.calculate_sum([1, 2, 3, 4, 5])

# Ruby is elegant and expressive!
5.times { |i| puts "Iteration #{i + 1}" }
`;

const InteractiveDemo = () => {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const simulateExecution = useCallback((rubyCode: string) => {
    // This simulates Ruby execution for demo purposes
    // In production, this would call a real Ruby runtime via edge function
    const lines: string[] = [];
    
    // Parse and simulate simple Ruby outputs
    const putsMatches = rubyCode.match(/puts\s+["']([^"']+)["']/g);
    const stringInterpolations = rubyCode.match(/puts\s+"([^"]+)"/g);
    
    // Simulate the Greeter class output
    if (rubyCode.includes('Greeter.new')) {
      const nameMatch = rubyCode.match(/Greeter\.new\(["'](\w+)["']\)/);
      const name = nameMatch ? nameMatch[1] : "Developer";
      lines.push(`Hello, ${name}! 👋`);
      lines.push("Welcome to Ruby programming.");
    }
    
    if (rubyCode.includes('calculate_sum')) {
      lines.push("Sum of [1, 2, 3, 4, 5]: 15");
    }
    
    if (rubyCode.includes('.times')) {
      const timesMatch = rubyCode.match(/(\d+)\.times/);
      const count = timesMatch ? parseInt(timesMatch[1]) : 5;
      for (let i = 1; i <= count; i++) {
        lines.push(`Iteration ${i}`);
      }
    }
    
    // Handle custom puts statements
    const customPuts = rubyCode.match(/puts\s+["']([^#][^"']+)["']/g);
    if (customPuts) {
      customPuts.forEach(match => {
        const text = match.match(/["'](.+)["']/);
        if (text && !lines.includes(text[1]) && !text[1].includes('#{')) {
          lines.push(text[1]);
        }
      });
    }
    
    return lines.length > 0 
      ? lines.join("\n") + "\n\n✓ Execution completed successfully"
      : "# No output generated\n\n✓ Execution completed successfully";
  }, []);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput("▶ Executing Ruby code...\n\n");
    
    setTimeout(() => {
      const result = simulateExecution(code);
      setOutput(result);
      setIsRunning(false);
    }, 800);
  }, [code, simulateExecution]);

  const handleReset = useCallback(() => {
    setCode(SAMPLE_CODE);
    setOutput("");
  }, []);

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            Try It Now — No Sign Up Required
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Editor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Write Ruby code in the editor below and click "Run" to see instant output. 
            This is the same editor you'll use in your projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-sm font-medium ml-2">app.rb</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleRun}
                  disabled={isRunning}
                  className="gradient-ruby text-white"
                >
                  <Play className="w-4 h-4 mr-1" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
              </div>
            </div>
            <div className="h-[400px]">
              <Editor
                height="100%"
                defaultLanguage="ruby"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
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
            </div>
          </Card>

          {/* Console Output */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Console Output</span>
              </div>
              <span className="text-xs text-muted-foreground">Ruby 3.2.0</span>
            </div>
            <div className="h-[400px] bg-[#1e1e1e] p-4 overflow-auto">
              <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                {output || "# Click 'Run' to execute the code\n# Output will appear here..."}
              </pre>
            </div>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          💡 This demo runs a simulated Ruby environment. Sign up to access full execution with gem support, 
          file persistence, and project management.
        </p>
      </div>
    </section>
  );
};

export default InteractiveDemo;
