import { useState, useCallback, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, RotateCcw, Loader2, Palette, Download, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EDITOR_THEMES, EditorThemeKey } from "@/components/editor/EditorThemes";

const CODE_EXAMPLES = {
  greeter: {
    name: "Greeter Class",
    code: `# Welcome to ICM Ruby Studio!
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
`
  },
  calculator: {
    name: "Calculator",
    code: `# Calculator Class Example
# Demonstrates OOP patterns in Ruby

class Calculator
  attr_reader :history

  def initialize
    @history = []
  end

  def add(a, b)
    result = a + b
    log_operation("#{a} + #{b} = #{result}")
    result
  end

  def subtract(a, b)
    result = a - b
    log_operation("#{a} - #{b} = #{result}")
    result
  end

  def multiply(a, b)
    result = a * b
    log_operation("#{a} × #{b} = #{result}")
    result
  end

  def divide(a, b)
    raise "Cannot divide by zero!" if b == 0
    result = a.to_f / b
    log_operation("#{a} ÷ #{b} = #{result}")
    result
  end

  private

  def log_operation(msg)
    @history << msg
    puts msg
  end
end

# Usage
calc = Calculator.new
calc.add(10, 5)
calc.subtract(20, 8)
calc.multiply(6, 7)
calc.divide(100, 4)

puts "\\n📊 History:"
calc.history.each { |op| puts "  • #{op}" }
`
  },
  fizzbuzz: {
    name: "FizzBuzz",
    code: `# FizzBuzz - Classic Programming Challenge
# Print numbers 1-30, but:
#   - Multiples of 3: print "Fizz"
#   - Multiples of 5: print "Buzz"
#   - Multiples of both: print "FizzBuzz"

def fizzbuzz(n)
  (1..n).each do |i|
    output = ""
    output += "Fizz" if i % 3 == 0
    output += "Buzz" if i % 5 == 0
    output = i.to_s if output.empty?
    puts output
  end
end

puts "🎯 FizzBuzz (1-30):"
puts "-" * 20
fizzbuzz(30)
`
  },
  fibonacci: {
    name: "Fibonacci",
    code: `# Fibonacci Sequence Generator
# Demonstrates recursion and memoization

class Fibonacci
  def initialize
    @memo = {}
  end

  # Recursive with memoization
  def calculate(n)
    return n if n <= 1
    @memo[n] ||= calculate(n - 1) + calculate(n - 2)
  end

  # Generate sequence
  def sequence(count)
    (0...count).map { |i| calculate(i) }
  end
end

fib = Fibonacci.new

puts "🔢 Fibonacci Sequence (first 20 numbers):"
puts "-" * 40
seq = fib.sequence(20)
puts seq.join(", ")

puts "\\n📈 Growth pattern:"
seq.each_with_index do |num, i|
  bar = "█" * [num / 100, 50].min
  puts "F(#{i.to_s.rjust(2)}): #{num.to_s.rjust(5)} #{bar}"
end
`
  }
};

type ExampleKey = keyof typeof CODE_EXAMPLES;

interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
  error?: string;
}

const InteractiveDemo = () => {
  const [code, setCode] = useState(CODE_EXAMPLES.greeter.code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<EditorThemeKey>("monokai");
  const [currentExample, setCurrentExample] = useState<ExampleKey>("greeter");
  const monacoRef = useRef<Monaco | null>(null);

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

  const handleExampleChange = useCallback((example: ExampleKey) => {
    setCurrentExample(example);
    setCode(CODE_EXAMPLES[example].code);
    setOutput("");
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app.rb";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code]);

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

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput("▶ Executing Ruby code...\n");
    
    const result = await executeRubyCode(code);
    setOutput(result);
    setIsRunning(false);
  }, [code, executeRubyCode]);

  const handleReset = useCallback(() => {
    setCode(CODE_EXAMPLES[currentExample].code);
    setOutput("");
  }, [currentExample]);

  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-sm font-medium ml-2">app.rb</span>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Code className="w-4 h-4 mr-1" />
                      {CODE_EXAMPLES[currentExample].name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => handleExampleChange(key as ExampleKey)}
                        className={currentExample === key ? "bg-accent" : ""}
                      >
                        {example.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Palette className="w-4 h-4 mr-1" />
                      {EDITOR_THEMES[currentTheme].name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-muted-foreground hover:text-foreground"
                  title="Download as .rb file"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-foreground"
                  disabled={isRunning}
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
                  {isRunning ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-1" />
                  )}
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
            </div>
          </Card>

          {/* Console Output */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`} />
                <span className="text-sm font-medium">Console Output</span>
              </div>
              <span className="text-xs text-muted-foreground">Ruby 3.0.1 (Live)</span>
            </div>
            <div className="h-[400px] bg-[hsl(var(--code-bg))] p-4 overflow-auto">
              <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                {output || "# Click 'Run' to execute the code\n# Output will appear here..."}
              </pre>
            </div>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          ✓ This is not a simulation — your code executes on a real Ruby 3.0.1 runtime via the Piston API.
        </p>
      </div>
    </section>
  );
};

export default InteractiveDemo;
