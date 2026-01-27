import { ArrowRight, UserPlus, FolderPlus, Code2, Play } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Create an Account",
    description: "Sign up with email in seconds. No credit card required for the free tier."
  },
  {
    icon: FolderPlus,
    title: "2. Start a Project",
    description: "Create a new Ruby project. We scaffold app.rb, routes.rb, models.rb, and ui_logic.rb for you."
  },
  {
    icon: Code2,
    title: "3. Write Your Code",
    description: "Edit files in our Monaco-powered editor with Ruby syntax highlighting and autocomplete."
  },
  {
    icon: Play,
    title: "4. Run & Iterate",
    description: "Click Run to execute. See output instantly. Fix errors, re-run—your typical development loop."
  }
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Zero to Running Ruby in 60 Seconds
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No local Ruby installation. No environment configuration. Just open your browser and code.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-3 w-6 h-6 text-muted-foreground/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
