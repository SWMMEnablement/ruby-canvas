import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="p-8 rounded-xl bg-card border border-border">
          <h2 className="text-xl font-bold mb-2">
            Ready to Save Your Projects?
          </h2>
          <p className="text-muted-foreground mb-6">
            Create a free account to persist your code, manage multiple files, and track version history.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button 
              className="gradient-ruby text-white px-6"
              onClick={() => navigate("/auth")}
            >
              Create Free Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Free tier: 10 projects • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
