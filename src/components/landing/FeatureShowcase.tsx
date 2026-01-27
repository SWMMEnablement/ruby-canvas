import { Code2, Zap, Shield, Layers, Terminal, GitBranch, Package, Bug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Layers,
    title: "Multi-Pane Project Editor",
    description: "Edit app.rb, models.rb, routes.rb, and ui_logic.rb simultaneously in a tabbed interface. Navigate your project structure with a visual file tree.",
    details: ["Tabbed editing with syntax highlighting", "Split view for comparing files", "Auto-save with change tracking"]
  },
  {
    icon: Terminal,
    title: "Integrated Ruby Console",
    description: "Execute Ruby code instantly with our sandboxed runtime. See stdout, stderr, and exception traces in real-time as your code runs.",
    details: ["Real-time output streaming", "Error highlighting with line numbers", "Execution history and replay"]
  },
  {
    icon: Package,
    title: "Gem Dependency Management",
    description: "Add and manage RubyGems directly from the editor. We handle installation and version resolution automatically.",
    details: ["Bundler integration", "Version pinning support", "Popular gems pre-installed"]
  },
  {
    icon: Bug,
    title: "Debugging & Error Traces",
    description: "Clickable stack traces jump directly to the error line. Inspect variables and understand exactly where your code failed.",
    details: ["Source-mapped error locations", "Variable inspection", "Step-through debugging (coming soon)"]
  },
  {
    icon: GitBranch,
    title: "Version History",
    description: "Every save creates a checkpoint you can restore. See exactly what changed, when, and revert to any previous state.",
    details: ["Automatic checkpoints on save", "Diff viewer for changes", "One-click restore"]
  },
  {
    icon: Shield,
    title: "Secure Sandboxed Execution",
    description: "Your code runs in isolated containers with no access to our systems. Projects are encrypted and only accessible to you.",
    details: ["Per-user isolated environments", "Encrypted project storage", "Row-level security on all data"]
  }
];

const FeatureShowcase = () => {
  return (
    <section className="container mx-auto px-4 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Write Ruby
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for Ruby developers. Not a generic code playground—a focused environment 
            for Ruby applications with tools that understand your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border bg-card hover:border-primary/50 transition-smooth group"
            >
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-3 group-hover:bg-primary/20 transition-smooth">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {feature.description}
                </p>
                <ul className="space-y-1.5">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
