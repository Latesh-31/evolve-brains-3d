import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, ExternalLink, Code, Gamepad2, Car, Target } from "lucide-react";
import { CaseStudyVisualization } from "@/components/3d/CaseStudyVisualization";

const caseStudies = [
  {
    id: "flappy-bird",
    title: "Flappy Bird AI",
    icon: Gamepad2,
    category: "Game Playing",
    difficulty: "Beginner",
    description: "Train neural networks to play Flappy Bird using neuroevolution. Watch as the AI learns to navigate pipes through trial and error.",
    details: "This case study demonstrates how neuroevolution can solve game-playing tasks without explicit programming of game strategies. Networks evolve to process visual input and output movement commands.",
    keyLearnings: [
      "Fitness function design for game objectives",
      "Real-time evaluation and selection",
      "Balancing exploration vs exploitation"
    ],
    networkStructure: "Input: 4 sensors → Hidden: 8 neurons → Output: 1 action",
    populationSize: 150,
    generations: 50,
    successRate: "95%"
  },
  {
    id: "car-racing",
    title: "Autonomous Car Racing",
    icon: Car,
    category: "Control Systems",
    difficulty: "Intermediate",
    description: "Evolve neural networks to control a racing car, learning optimal racing lines and speed control.",
    details: "A more complex control problem where networks must learn continuous control of steering and acceleration while avoiding obstacles and maximizing speed.",
    keyLearnings: [
      "Continuous control with neural networks",
      "Multi-objective fitness functions",
      "Handling dynamic environments"
    ],
    networkStructure: "Input: 12 sensors → Hidden: 16 neurons → Output: 2 actions",
    populationSize: 100,
    generations: 200,
    successRate: "78%"
  },
  {
    id: "pole-balancing",
    title: "Pole Balancing",
    icon: Target,
    category: "Control Systems",
    difficulty: "Advanced",
    description: "Classic control problem where networks learn to balance a pole on a movable cart through evolved neural controllers.",
    details: "This benchmark problem showcases neuroevolution's ability to solve complex control tasks with minimal domain knowledge, evolving both network topology and weights.",
    keyLearnings: [
      "Evolving network topology (NEAT algorithm)",
      "Solving control problems with minimal sensors",
      "Importance of population diversity"
    ],
    networkStructure: "Input: 4 state variables → Evolving topology → Output: 1 force",
    populationSize: 150,
    generations: 100,
    successRate: "89%"
  }
];

export const CaseStudiesContent = () => {
  const [selectedCase, setSelectedCase] = useState(caseStudies[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Advanced": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Neuroevolution <span className="gradient-neural bg-clip-text text-transparent">Case Studies</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore real-world applications of neuroevolution through interactive demos 
            and detailed analysis of successful implementations.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Case Study Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Select Case Study</h3>
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <Card 
                  key={study.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCase.id === study.id ? "ring-2 ring-primary border-primary/50" : ""
                  }`}
                  onClick={() => setSelectedCase(study)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg gradient-neural">
                        <Icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{study.title}</h4>
                        <p className="text-xs text-muted-foreground">{study.category}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(study.difficulty)}`}
                    >
                      {study.difficulty}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="demo">Live Demo</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg gradient-neural">
                          <selectedCase.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{selectedCase.title}</CardTitle>
                          <p className="text-muted-foreground">{selectedCase.category}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(selectedCase.difficulty)}
                      >
                        {selectedCase.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg">{selectedCase.description}</p>
                    
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold mb-2">Technical Details</h4>
                      <p className="text-muted-foreground">{selectedCase.details}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{selectedCase.populationSize}</div>
                          <div className="text-sm text-muted-foreground">Population Size</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">{selectedCase.generations}</div>
                          <div className="text-sm text-muted-foreground">Generations</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-accent">{selectedCase.successRate}</div>
                          <div className="text-sm text-muted-foreground">Success Rate</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Key Learning Outcomes</h4>
                      <ul className="space-y-2">
                        {selectedCase.keyLearnings.map((learning, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-muted-foreground">{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border/40">
                      <h4 className="font-semibold mb-2">Network Architecture</h4>
                      <code className="text-sm text-muted-foreground">{selectedCase.networkStructure}</code>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Interactive Demo</CardTitle>
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="gradient-neural text-primary-foreground"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {isPlaying ? "Pause" : "Run"} Simulation
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video">
                      <CaseStudyVisualization 
                        caseId={selectedCase.id} 
                        isPlaying={isPlaying}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Fitness Evolution</h4>
                        <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Fitness graph visualization</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Population Diversity</h4>
                        <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Diversity metrics</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Implementation Notes</h4>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-muted-foreground mb-4">
                          This implementation uses a standard genetic algorithm with tournament selection, 
                          single-point crossover, and Gaussian mutation. The fitness function rewards 
                          successful task completion while penalizing inefficient behavior.
                        </p>
                        <Button variant="outline" className="gap-2">
                          <Code className="h-4 w-4" />
                          View Source Code
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};