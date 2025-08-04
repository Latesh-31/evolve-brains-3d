import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { InteractiveEvolution } from "@/components/3d/InteractiveEvolution";

export const InteractiveContent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [populationSize, setPopulationSize] = useState([50]);
  const [mutationRate, setMutationRate] = useState([0.1]);
  const [crossoverRate, setCrossoverRate] = useState([0.8]);
  const [eliteSize, setEliteSize] = useState([5]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setGeneration(0);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Interactive <span className="gradient-neural bg-clip-text text-transparent">Neuroevolution</span> Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experiment with neuroevolution parameters in real-time and observe their impact 
            on the evolutionary process through interactive 3D visualizations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Evolution Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Button
                    onClick={handleStart}
                    disabled={isRunning}
                    className="flex-1 gradient-neural text-primary-foreground"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                  <Button
                    onClick={handlePause}
                    disabled={!isRunning}
                    variant="outline"
                    className="flex-1"
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="icon"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-primary">Generation {generation}</div>
                  <div className="text-sm text-muted-foreground">Current Evolution Cycle</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Population Size</label>
                    <Badge variant="outline">{populationSize[0]}</Badge>
                  </div>
                  <Slider
                    value={populationSize}
                    onValueChange={setPopulationSize}
                    max={200}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Larger populations explore more solutions but are slower to evolve.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Mutation Rate</label>
                    <Badge variant="outline">{(mutationRate[0] * 100).toFixed(1)}%</Badge>
                  </div>
                  <Slider
                    value={mutationRate}
                    onValueChange={setMutationRate}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher mutation rates increase exploration but may disrupt good solutions.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Crossover Rate</label>
                    <Badge variant="outline">{(crossoverRate[0] * 100).toFixed(1)}%</Badge>
                  </div>
                  <Slider
                    value={crossoverRate}
                    onValueChange={setCrossoverRate}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Probability of combining genetic material from two parents.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Elite Size</label>
                    <Badge variant="outline">{eliteSize[0]}</Badge>
                  </div>
                  <Slider
                    value={eliteSize}
                    onValueChange={setEliteSize}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of best individuals automatically kept for next generation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Evolution Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <InteractiveEvolution
                    isRunning={isRunning}
                    parameters={{
                      populationSize: populationSize[0],
                      mutationRate: mutationRate[0],
                      crossoverRate: crossoverRate[0],
                      eliteSize: eliteSize[0]
                    }}
                    onGenerationUpdate={setGeneration}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">87.5</div>
                  <div className="text-sm text-muted-foreground">Best Fitness</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">64.2</div>
                  <div className="text-sm text-muted-foreground">Average Fitness</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">23.8</div>
                  <div className="text-sm text-muted-foreground">Diversity Index</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};