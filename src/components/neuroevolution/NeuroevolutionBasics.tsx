import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Dna, Lightbulb, Target, Zap, TreePine } from "lucide-react";

export const NeuroevolutionBasics = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            What is Neuroevolution?
          </CardTitle>
          <CardDescription>
            Understanding the fusion of neural networks and evolutionary algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            Neuroevolution is a powerful machine learning technique that combines the structure of 
            <strong> neural networks</strong> with the optimization power of <strong>evolutionary algorithms</strong>. 
            Instead of using traditional gradient-based methods like backpropagation, neuroevolution evolves 
            neural networks through processes inspired by biological evolution.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
            <p className="font-semibold text-primary mb-2">Key Insight:</p>
            <p>
              Just as biological organisms evolve to better survive in their environment, 
              neural networks can evolve to better solve computational problems through 
              selection, crossover, and mutation operations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Biological Inspiration */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-emerald-600" />
              Biological Evolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                🧬 Genetic Variation
              </Badge>
              <p className="text-sm text-muted-foreground pl-4">
                Organisms have different traits encoded in their DNA
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                🎯 Natural Selection
              </Badge>
              <p className="text-sm text-muted-foreground pl-4">
                Fitter organisms are more likely to survive and reproduce
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                🔄 Inheritance & Mutation
              </Badge>
              <p className="text-sm text-muted-foreground pl-4">
                Offspring inherit traits with slight random changes
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Neuroevolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                🔗 Network Diversity
              </Badge>
              <p className="text-sm text-muted-foreground pl-4">
                Neural networks have different weights and structures
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                📊 Fitness Evaluation
              </Badge>
              <p className="text-sm text-muted-foreground pl-4">
                Better performing networks are selected for reproduction
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                🧬 Genetic Operations
              </Badge>
              <p className="text-sm text-muted-foreground pl-4">
                New networks created through crossover and mutation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why Use Neuroevolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Why Choose Neuroevolution?
          </CardTitle>
          <CardDescription>
            Advantages over traditional neural network training methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">No Gradient Required</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Works with non-differentiable objectives and discrete action spaces
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">Global Optimization</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Can escape local optima through population diversity
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Dna className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">Architecture Evolution</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Can evolve both weights and network topology
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Analogy */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Simple Analogy: The AI Breeding Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Imagine you're running a breeding program for racing horses, but instead of horses, 
            you're breeding AI brains (neural networks) to solve problems:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="mt-1">1</Badge>
              <div>
                <p className="font-semibold">Start with a diverse population</p>
                <p className="text-sm text-muted-foreground">
                  Create many AI brains with random "genetic material" (weights and connections)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge className="mt-1">2</Badge>
              <div>
                <p className="font-semibold">Test their performance</p>
                <p className="text-sm text-muted-foreground">
                  Let each AI brain try to solve your problem and measure how well it does
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge className="mt-1">3</Badge>
              <div>
                <p className="font-semibold">Select the winners</p>
                <p className="text-sm text-muted-foreground">
                  Keep the best-performing AI brains as "parents" for the next generation
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge className="mt-1">4</Badge>
              <div>
                <p className="font-semibold">Create offspring</p>
                <p className="text-sm text-muted-foreground">
                  Combine parent traits and add small random changes to create new AI brains
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge className="mt-1">5</Badge>
              <div>
                <p className="font-semibold">Repeat the process</p>
                <p className="text-sm text-muted-foreground">
                  Over many generations, the AI brains get better and better at solving your problem
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};