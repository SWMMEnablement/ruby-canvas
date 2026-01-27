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
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ICM Ruby Studio</h1>
              <p className="text-xs text-muted-foreground">v2.5.0</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-smooth">
              Try Demo
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-smooth">
              How It Works
            </a>
            <a href="#tech" className="text-muted-foreground hover:text-foreground transition-smooth">
              Tech Stack
            </a>
          </nav>
          <Button onClick={() => navigate("/auth")} variant="outline">
            Sign In
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-4">
              <Zap className="w-4 h-4" />
              Cloud-Based Ruby IDE — No Installation Required
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Write, Run & Ship
              <br />
              <span className="gradient-ruby bg-clip-text text-transparent">
                Ruby Code Online
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ICM Ruby Studio is a browser-based IDE for Ruby. Edit multiple files, 
              execute code instantly, and manage projects—all without installing anything locally.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="gradient-ruby text-white text-lg px-8 hover:opacity-90 glow-ruby"
                onClick={() => navigate("/auth")}
              >
                Start Coding Free
                <Code2 className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <a href="#demo">Try the Demo Below ↓</a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ Free tier available &nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp; ✓ Works in any modern browser
            </p>
          </div>
        </section>

        {/* Interactive Demo */}
        <div id="demo">
          <InteractiveDemo />
        </div>

        {/* Feature Showcase */}
        <div id="features">
          <FeatureShowcase />
        </div>

        {/* How It Works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Tech Stack */}
        <div id="tech">
          <TechStack />
        </div>

        {/* Call to Action */}
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
