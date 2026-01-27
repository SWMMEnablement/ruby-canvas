import { Database, Server, Lock, Cloud, Code, ExternalLink } from "lucide-react";

const TechStack = () => {
  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Technical Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open about how this works. No magic, just well-integrated open-source tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 h-fit">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Monaco Editor</h3>
                <p className="text-sm text-muted-foreground">
                  The same editor that powers VS Code. Full syntax highlighting, 
                  autocomplete, and error detection for Ruby.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 h-fit">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  Piston Execution Engine
                  <a href="https://github.com/engineer-man/piston" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ruby 3.0.1 runs via the Piston API in isolated containers. 
                  Stateless execution with 30s timeout and 128MB memory limit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 h-fit">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">PostgreSQL Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Projects stored in PostgreSQL with row-level security. 
                  Only you can access your code.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 h-fit">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Zero-Trust Security</h3>
                <p className="text-sm text-muted-foreground">
                  JWT authentication, encrypted connections, and strict 
                  access policies on every request.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              System Requirements
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Browser</span>
                <span>Chrome, Firefox, Safari, Edge (latest)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Ruby Version</span>
                <span>3.2.0 (MRI)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Execution Timeout</span>
                <span>30 seconds per run</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Memory Limit</span>
                <span>128MB per execution</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Storage</span>
                <span>Unlimited projects (free tier: 10)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
