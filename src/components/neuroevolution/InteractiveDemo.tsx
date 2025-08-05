import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  TrendingUp,
  Users,
  Zap,
  Target
} from "lucide-react";
import { InteractiveEvolution } from "../3d/InteractiveEvolution";

export const InteractiveDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [populationSize, setPopulationSize] = useState([50]);
  const [mutationRate, setMutationRate] = useState([0.1]);
  const [crossoverRate, setCrossoverRate] = useState([0.8]);
  const [eliteSize, setEliteSize] = useState([5]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setGeneration(0);
  };

  const handleGenerationUpdate = (newGeneration: number) => {
    setGeneration(newGeneration);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Interactive Neuroevolution Demo
          </CardTitle>
          <CardDescription>
            Adjust parameters and watch evolution in real-time with 3D visualizations
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Evolution Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Simulation Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={handleStart}
                  disabled={isRunning}
                  className="flex-1 flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Start
                </Button>
                <Button
                  onClick={handlePause}
                  disabled={!isRunning}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                >
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
                <Button
                  onClick={handleReset}
                  variant="destructive"
                  size="icon"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Generation: {generation}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Parameter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Parameters
              </CardTitle>
              <CardDescription>
                Adjust these values to see their impact on evolution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Population Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Population Size</label>
                  <Badge variant="outline">{populationSize[0]}</Badge>
                </div>
                <Slider
                  value={populationSize}
                  onValueChange={setPopulationSize}
                  min={10}
                  max={200}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Larger populations explore more solutions but evolve slower
                </p>
              </div>

              {/* Mutation Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Mutation Rate</label>
                  <Badge variant="outline">{mutationRate[0].toFixed(2)}</Badge>
                </div>
                <Slider
                  value={mutationRate}
                  onValueChange={setMutationRate}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher rates increase exploration but may disrupt good solutions
                </p>
              </div>

              {/* Crossover Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Crossover Rate</label>
                  <Badge variant="outline">{crossoverRate[0].toFixed(2)}</Badge>
                </div>
                <Slider
                  value={crossoverRate}
                  onValueChange={setCrossoverRate}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Probability that parents will produce offspring through crossover
                </p>
              </div>

              {/* Elite Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Elite Size</label>
                  <Badge variant="outline">{eliteSize[0]}</Badge>
                </div>
                <Slider
                  value={eliteSize}
                  onValueChange={setEliteSize}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Number of best individuals preserved each generation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Live Evolution Visualization
              </CardTitle>
              <CardDescription>
                3D visualization of the evolving neural network population
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted/20 rounded-lg overflow-hidden">
                <InteractiveEvolution
                  isRunning={isRunning}
                  onGenerationUpdate={handleGenerationUpdate}
                  parameters={{
                    populationSize: populationSize[0],
                    mutationRate: mutationRate[0],
                    crossoverRate: crossoverRate[0],
                    eliteSize: eliteSize[0]
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Evolution Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0.85</div>
                  <div className="text-sm text-muted-foreground">Best Fitness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">0.42</div>
                  <div className="text-sm text-muted-foreground">Average Fitness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">0.78</div>
                  <div className="text-sm text-muted-foreground">Diversity Index</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Notes */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            What You're Seeing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">🔵 Blue Spheres</h4>
              <p className="text-sm text-muted-foreground">
                Individual neural networks in the population. Size indicates fitness level.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🌊 Fitness Landscape</h4>
              <p className="text-sm text-muted-foreground">
                The undulating plane represents the fitness function that networks are trying to optimize.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Real-time Evolution</h4>
              <p className="text-sm text-muted-foreground">
                Watch how the population adapts over generations, with better networks becoming more prominent.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚙️ Parameter Effects</h4>
              <p className="text-sm text-muted-foreground">
                Adjust parameters to see immediate effects on population diversity and convergence speed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};