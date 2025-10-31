import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Code2, Zap, Shield, Layers } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
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
          <Button onClick={() => navigate("/auth")} variant="outline">
            Sign In
          </Button>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-4">
              <Zap className="w-4 h-4" />
              Professional Ruby Development Environment
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Build Ruby Apps
              <br />
              <span className="gradient-ruby bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ICM Infoworks Ruby Studio is a professional IDE for Ruby development. 
              Create, edit, and run Ruby projects with an intuitive interface and powerful tools.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="gradient-ruby text-white text-lg px-8 hover:opacity-90 glow-ruby"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <Code2 className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-smooth">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Module Editing</h3>
              <p className="text-muted-foreground">
                Organize your code with separate modules for app logic, routes, models, and UI components.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-smooth">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Execution</h3>
              <p className="text-muted-foreground">
                Run your Ruby code instantly and see real-time output in the integrated console.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-smooth">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your projects are stored securely with user authentication and private data access.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 ICM Infoworks Ruby Studio v2.5.0</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
