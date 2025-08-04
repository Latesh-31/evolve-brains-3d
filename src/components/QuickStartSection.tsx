import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Settings, Beaker } from "lucide-react";

const quickStartOptions = [
  {
    icon: Play,
    title: "Start with Basics",
    description: "Begin with the fundamentals of neuroevolution and biological inspiration.",
    href: "/steps",
    buttonText: "Learn the Steps",
    gradient: "gradient-neural"
  },
  {
    icon: Settings,
    title: "Try Interactive Demo",
    description: "Jump into hands-on exploration with adjustable parameters and real-time visualization.",
    href: "/interactive",
    buttonText: "Open Demo",
    gradient: "gradient-synapse"
  },
  {
    icon: Beaker,
    title: "Explore Case Studies",
    description: "See neuroevolution in action with practical examples and applications.",
    href: "/case-studies",
    buttonText: "View Examples",
    gradient: "gradient-evolution"
  }
];

export const QuickStartSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Learning Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're new to evolutionary algorithms or looking to deepen your understanding, 
            we have the perfect starting point for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {quickStartOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center space-y-6">
                  <div className={`inline-flex p-4 rounded-full ${option.gradient}`}>
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{option.title}</h3>
                    <p className="text-muted-foreground">{option.description}</p>
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full neural-glow"
                    variant="outline"
                  >
                    <Link to={option.href}>
                      {option.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Additional resources */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Need additional resources? Check out our comprehensive guide.
          </p>
          <Button asChild variant="ghost" className="hover:bg-primary/5">
            <Link to="/resources">
              Browse All Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};