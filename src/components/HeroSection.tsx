import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Zap, Dna } from "lucide-react";
import { NeuralNetworkVisualization } from "@/components/3d/NeuralNetworkVisualization";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-neural opacity-10" />
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Dna className="h-6 w-6" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Interactive Learning
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-neural bg-clip-text text-transparent">
                  Neuro
                </span>
                <br />
                <span className="text-foreground">Evolution</span>
                <br />
                <span className="text-muted-foreground text-3xl lg:text-4xl">
                  Explained
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Master neuroevolution algorithms through interactive 3D visualizations, 
                step-by-step explanations, and hands-on examples. From biological inspiration 
                to technical implementation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="neural-glow gradient-neural text-primary-foreground hover:scale-105 transition-transform"
              >
                <Link to="/steps">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
              >
                <Link to="/interactive">
                  Try Interactive Demo
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/40">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Key Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">15+</div>
                <div className="text-sm text-muted-foreground">3D Models</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-sm text-muted-foreground">Case Studies</div>
              </div>
            </div>
          </div>
          
          {/* 3D Visualization */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto">
              <NeuralNetworkVisualization />
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 p-3 rounded-full bg-primary/10 backdrop-blur-sm floating">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute bottom-4 left-4 p-3 rounded-full bg-secondary/10 backdrop-blur-sm floating" style={{ animationDelay: '1s' }}>
              <Zap className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};