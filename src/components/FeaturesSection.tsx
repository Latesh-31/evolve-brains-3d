import { Brain, Zap, Eye, BookOpen, Code, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Step-by-Step Learning",
    description: "Master each phase of neuroevolution with clear explanations, analogies, and simplified pseudocode.",
    color: "text-primary"
  },
  {
    icon: Eye,
    title: "3D Visualizations",
    description: "Explore interactive 3D models of neural networks, populations, and evolutionary processes.",
    color: "text-secondary"
  },
  {
    icon: Zap,
    title: "Interactive Demos",
    description: "Adjust parameters in real-time and see their impact on evolutionary algorithms.",
    color: "text-accent"
  },
  {
    icon: Code,
    title: "Case Studies",
    description: "Learn through practical examples: game playing, robot control, and optimization problems.",
    color: "text-primary"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    description: "Access glossaries, FAQs, references, and additional learning materials.",
    color: "text-secondary"
  },
  {
    icon: Lightbulb,
    title: "Beginner Friendly",
    description: "Designed for learners with basic programming knowledge, progressing to advanced concepts.",
    color: "text-accent"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-neural bg-clip-text text-transparent">Master</span> Neuroevolution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive approach combines visual learning, hands-on interaction, and theoretical understanding 
            to make complex algorithms accessible and engaging.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className={`inline-flex p-3 rounded-lg bg-muted/30 ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};