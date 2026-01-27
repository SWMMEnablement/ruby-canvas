import { Code2, ExternalLink, Github, Rocket, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutProject = () => {
  return (
    <section className="container mx-auto px-4 py-16 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            About This Project
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with modern web technologies. Open about our stack, our roadmap, and who this is for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Tech Stack Card */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Built With
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#61DAFB]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#61DAFB] font-bold text-sm">R</span>
                </div>
                <div>
                  <a 
                    href="https://react.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary flex items-center gap-1"
                  >
                    React 18 <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">Component-based UI with hooks</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#646CFF]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#646CFF] font-bold text-sm">V</span>
                </div>
                <div>
                  <a 
                    href="https://vitejs.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary flex items-center gap-1"
                  >
                    Vite <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">Fast build tooling with HMR</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#38BDF8]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#38BDF8] font-bold text-sm">T</span>
                </div>
                <div>
                  <a 
                    href="https://tailwindcss.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary flex items-center gap-1"
                  >
                    Tailwind CSS <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">Utility-first styling</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#3ECF8E]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#3ECF8E] font-bold text-sm">S</span>
                </div>
                <div>
                  <a 
                    href="https://supabase.com/docs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary flex items-center gap-1"
                  >
                    Supabase <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">Auth, database, and edge functions</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">M</span>
                </div>
                <div>
                  <a 
                    href="https://microsoft.github.io/monaco-editor/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary flex items-center gap-1"
                  >
                    Monaco Editor <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-sm text-muted-foreground">VS Code's editor in the browser</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Card */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Public Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-primary">Currently Live</p>
                  <p className="text-sm text-muted-foreground">
                    Advanced Cloud Playground — Monaco editor, Ruby 3.0.1 execution, 
                    multi-theme support, instant code running
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-secondary-foreground text-xs">◐</span>
                </div>
                <div>
                  <p className="font-medium text-secondary-foreground">In Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Multi-file project editing, version history, 
                    keyboard shortcuts (Ctrl+Enter to run)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-muted-foreground text-xs">○</span>
                </div>
                <div>
                  <p className="font-medium">Planned</p>
                  <p className="text-sm text-muted-foreground">
                    Debugger integration, Git sync, gem dependency UI, 
                    test runner, shareable project links
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Who This Is For */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Who This Is Perfect For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="font-medium mb-1">Quick Snippet Testing</p>
                <p className="text-sm text-muted-foreground">
                  Test Ruby code instantly without opening a terminal or installing anything.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="font-medium mb-1">Workshops & Tutorials</p>
                <p className="text-sm text-muted-foreground">
                  Zero-setup environment for teaching Ruby. Students start coding immediately.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="font-medium mb-1">Gem Exploration</p>
                <p className="text-sm text-muted-foreground">
                  Quickly try out gem APIs without polluting your local environment.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="font-medium mb-1">Code Sharing</p>
                <p className="text-sm text-muted-foreground">
                  Share runnable Ruby examples with colleagues or in documentation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutProject;
