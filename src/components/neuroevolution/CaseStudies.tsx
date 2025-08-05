import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Gamepad2, 
  Bot, 
  Car, 
  Plane,
  TrendingUp,
  Settings,
  Eye
} from "lucide-react";

export const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState("cartpole");

  const caseStudies = {
    cartpole: {
      title: "CartPole Control",
      icon: Gamepad2,
      difficulty: "Beginner",
      description: "Balance a pole on a moving cart using neural network control",
      objectives: [
        "Keep the pole upright for as long as possible",
        "Minimize cart position deviation",
        "Learn smooth control policies"
      ],
      networkStructure: "4 inputs (position, velocity, angle, angular velocity) → 2 hidden layers → 2 outputs (left/right force)",
      fitnessFunction: "Time steps balanced + penalty for extreme positions",
      results: {
        generations: 50,
        maxFitness: "500 steps",
        avgFitness: "287 steps",
        successRate: "94%"
      }
    },
    flappybird: {
      title: "Flappy Bird AI",
      icon: Plane,
      difficulty: "Intermediate",
      description: "Navigate a bird through pipes using evolved neural networks",
      objectives: [
        "Maximize distance traveled through pipes",
        "Avoid collisions with obstacles",
        "Develop timing strategies"
      ],
      networkStructure: "3 inputs (bird Y, pipe distance, pipe gap Y) → 1 hidden layer → 1 output (jump/no jump)",
      fitnessFunction: "Distance traveled + bonus for passing pipes",
      results: {
        generations: 75,
        maxFitness: "1247 points",
        avgFitness: "423 points",
        successRate: "87%"
      }
    },
    robotwalk: {
      title: "Bipedal Walker",
      icon: Bot,
      difficulty: "Advanced",
      description: "Evolve walking gaits for a two-legged robot",
      objectives: [
        "Achieve stable forward locomotion",
        "Minimize energy consumption",
        "Adapt to terrain variations"
      ],
      networkStructure: "24 inputs (joint angles, velocities, ground contact) → 3 hidden layers → 4 outputs (joint torques)",
      fitnessFunction: "Distance traveled + stability bonus - energy penalty",
      results: {
        generations: 200,
        maxFitness: "245.3 meters",
        avgFitness: "89.7 meters",
        successRate: "71%"
      }
    },
    carrace: {
      title: "Autonomous Racing",
      icon: Car,
      difficulty: "Expert",
      description: "Race cars that learn optimal racing lines through evolution",
      objectives: [
        "Complete laps in minimum time",
        "Avoid track boundaries",
        "Learn racing strategies"
      ],
      networkStructure: "19 inputs (lidar sensors, speed, track angle) → 2 hidden layers → 3 outputs (steering, throttle, brake)",
      fitnessFunction: "Lap time + completion bonus - collision penalty",
      results: {
        generations: 150,
        maxFitness: "1:23.45 lap time",
        avgFitness: "2:17.89 lap time",
        successRate: "63%"
      }
    }
  };

  const currentCase = caseStudies[selectedCase];
  const Icon = currentCase.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Neuroevolution Case Studies
          </CardTitle>
          <CardDescription>
            Real-world applications demonstrating neuroevolution in action
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Case Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(caseStudies).map(([key, study]) => {
          const StudyIcon = study.icon;
          return (
            <Card 
              key={key}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCase === key ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCase(key)}
            >
              <CardHeader className="text-center pb-4">
                <StudyIcon className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-sm">{study.title}</CardTitle>
                <Badge 
                  variant={
                    study.difficulty === "Beginner" ? "default" :
                    study.difficulty === "Intermediate" ? "secondary" :
                    study.difficulty === "Advanced" ? "destructive" : "outline"
                  }
                  className="text-xs"
                >
                  {study.difficulty}
                </Badge>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Selected Case Details */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Case Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                {currentCase.title}
              </CardTitle>
              <CardDescription>{currentCase.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Objectives:</h4>
                <ul className="space-y-1">
                  {currentCase.objectives.map((objective, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Network Architecture:</h4>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg font-mono">
                  {currentCase.networkStructure}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Fitness Function:</h4>
                <p className="text-sm text-muted-foreground">
                  {currentCase.fitnessFunction}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3D Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Live Demonstration
              </CardTitle>
              <CardDescription>
                Watch evolved neural networks in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">3D Simulation Environment</p>
                  <Button className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Simulation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results & Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Evolution Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentCase.results.generations}</div>
                <div className="text-sm text-muted-foreground">Generations</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-semibold text-secondary">{currentCase.results.maxFitness}</div>
                <div className="text-sm text-muted-foreground">Best Performance</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-medium text-accent">{currentCase.results.avgFitness}</div>
                <div className="text-sm text-muted-foreground">Average Performance</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-medium">{currentCase.results.successRate}</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Evolution Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Population Size</span>
                <Badge variant="outline">100</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Mutation Rate</span>
                <Badge variant="outline">0.15</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Crossover Rate</span>
                <Badge variant="outline">0.7</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Elite Size</span>
                <Badge variant="outline">5</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Selection</span>
                <Badge variant="outline">Tournament</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">Learn More</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                📚 Implementation Guide
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🔧 Parameter Tuning Tips
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📊 Performance Analysis
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🎮 Try Interactive Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle>Key Insights from Case Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Why Neuroevolution Works Well Here:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  No need for differentiable reward functions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Handles discrete and continuous action spaces
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Naturally explores diverse strategies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Can evolve both weights and network topology
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Common Challenges & Solutions:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Fitness function design is crucial for success
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Balance exploration vs exploitation carefully
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Population diversity prevents premature convergence
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Computational cost scales with population size
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};