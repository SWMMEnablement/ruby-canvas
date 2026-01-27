import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Coding?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Create your free account and launch your first Ruby project in under a minute. 
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gradient-ruby text-white text-lg px-8 hover:opacity-90 glow-ruby"
              onClick={() => navigate("/auth")}
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8"
              onClick={() => navigate("/auth")}
            >
              Sign In to Existing Account
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free tier includes 10 projects • No time limits • Upgrade anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
