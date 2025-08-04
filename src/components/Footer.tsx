import { Brain, Github, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">NeuroEvolution Guide</span>
            </div>
            <p className="text-muted-foreground">
              A comprehensive educational resource for understanding neuroevolution algorithms
              through interactive visualizations and step-by-step explanations.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/steps" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="/interactive" className="hover:text-primary transition-colors">Interactive Demo</a></li>
              <li><a href="/case-studies" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="/resources" className="hover:text-primary transition-colors">Resources</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Learn More</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground">
          <p>&copy; 2024 NeuroEvolution Guide. Educational content for learning purposes.</p>
        </div>
      </div>
    </footer>
  );
};