import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Code2, Zap } from "lucide-react";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import TechStack from "@/components/landing/TechStack";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold">ICM Ruby Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
                Features
              </a>
              <a href="#tech" className="text-muted-foreground hover:text-foreground transition-smooth">
                How It Works
              </a>
            </nav>
            <Button onClick={() => navigate("/auth")} size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero: Live Editor First */}
        <section className="container mx-auto px-4 pt-8 pb-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-xs text-green-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live Ruby 3.0.1 Runtime — Try It Now
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Browser-Based Ruby IDE with Real Execution
                </h1>
                <p className="text-muted-foreground mt-1">
                  Edit Ruby code below and click <strong>Run</strong> to execute on our backend. No signup required.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/auth")}
                className="gradient-ruby text-white shrink-0"
              >
                <Zap className="w-4 h-4 mr-2" />
                Create Free Account
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Demo - The Real Product */}
        <InteractiveDemo />

        {/* Technical Specs Bar */}
        <section className="border-y border-border bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span>🔷 <strong className="text-foreground">Monaco Editor</strong> (VS Code engine)</span>
              <span>🔷 <strong className="text-foreground">Ruby 3.0.1</strong> via Piston API</span>
              <span>🔷 <strong className="text-foreground">Sandboxed</strong> execution</span>
              <span>🔷 <strong className="text-foreground">30s timeout</strong> • 128MB memory</span>
            </div>
          </div>
        </section>

        {/* What You Get (Features) */}
        <div id="features">
          <FeatureShowcase />
        </div>

        {/* How It Works */}
        <div id="tech">
          <HowItWorks />
        </div>

        {/* Tech Stack */}
        <TechStack />

        {/* Simple CTA */}
        <CallToAction />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">ICM Infoworks Ruby Studio</p>
                <p className="text-xs text-muted-foreground">v2.5.0 • Built for Ruby developers</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-smooth">Features</a>
              <a href="#tech" className="hover:text-foreground transition-smooth">Tech Stack</a>
              <span>© 2025 ICM Infoworks</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
