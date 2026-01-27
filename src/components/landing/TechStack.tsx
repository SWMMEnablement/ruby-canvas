import { Database, Server, Lock, Cloud, Code } from "lucide-react";

const TechStack = () => {
  return (
    <section className="container mx-auto px-4 py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built on Modern Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We use battle-tested technologies to ensure reliability, speed, and security.
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
                <h3 className="font-semibold mb-1">Sandboxed Ruby Runtime</h3>
                <p className="text-sm text-muted-foreground">
                  Ruby 3.2 runs in isolated containers via edge functions. 
                  Each execution is stateless and secure.
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
