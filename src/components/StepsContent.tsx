import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Brain, Users, Target, Shuffle, Dna, RotateCcw, TrendingUp } from "lucide-react";
import { StepVisualization } from "@/components/3d/StepVisualization";

const steps = [
  {
    id: 1,
    title: "Population Initialization",
    icon: Users,
    description: "Create a diverse population of neural networks with random weights and topologies.",
    details: "Start with a population of neural networks, each representing a potential solution. These networks have random connection weights and may vary in structure (number of layers, nodes, connections).",
    analogy: "Like starting a cooking competition with chefs who have different recipes and techniques - variety is key for evolution.",
    pseudocode: `
// Initialize population
population = []
for i in range(POPULATION_SIZE):
    network = createRandomNeuralNetwork()
    network.randomizeWeights()
    population.append(network)`,
    keyPoints: [
      "Diversity drives evolution",
      "Random initialization prevents bias",
      "Population size affects exploration vs exploitation"
    ]
  },
  {
    id: 2,
    title: "Neural Network Encoding",
    icon: Brain,
    description: "Represent neural networks as genomes that can be manipulated by genetic operators.",
    details: "Convert neural network structure and weights into a genetic representation (chromosome) that can be modified through evolutionary operations.",
    analogy: "Like writing down a recipe in a standardized format so it can be easily shared, modified, and improved.",
    pseudocode: `
// Encode network as genome
genome = {
    'weights': flattenWeights(network.weights),
    'topology': encodeTopology(network.structure)
}`,
    keyPoints: [
      "Genome represents entire network",
      "Must capture both weights and structure",
      "Encoding affects what mutations are possible"
    ]
  },
  {
    id: 3,
    title: "Fitness Evaluation",
    icon: Target,
    description: "Test each neural network's performance on the target task and assign fitness scores.",
    details: "Run each network through the target task (game, control problem, etc.) and measure how well it performs. This becomes its fitness score.",
    analogy: "Like judges scoring performances in a competition - better performance gets higher scores.",
    pseudocode: `
// Evaluate fitness
for network in population:
    score = 0
    for trial in range(NUM_TRIALS):
        score += evaluateTask(network)
    network.fitness = score / NUM_TRIALS`,
    keyPoints: [
      "Fitness defines evolutionary pressure",
      "Multiple trials reduce noise",
      "Task design critically affects results"
    ]
  },
  {
    id: 4,
    title: "Selection",
    icon: TrendingUp,
    description: "Choose which networks will reproduce based on their fitness scores.",
    details: "Select networks for reproduction, typically favoring higher-fitness individuals while maintaining some diversity.",
    analogy: "Like choosing the best students to mentor the next class - good performers get more chances to pass on their knowledge.",
    pseudocode: `
// Tournament selection
def selectParent(population):
    tournament = randomSample(population, TOURNAMENT_SIZE)
    return max(tournament, key=lambda x: x.fitness)
    
parents = [selectParent(population) for _ in range(PARENT_COUNT)]`,
    keyPoints: [
      "Balance between exploitation and exploration",
      "Tournament selection is popular and effective",
      "Selection pressure affects convergence speed"
    ]
  },
  {
    id: 5,
    title: "Crossover",
    icon: Shuffle,
    description: "Combine genetic material from parent networks to create offspring.",
    details: "Mix the genetic material (weights, connections) of two or more parent networks to create new offspring networks.",
    analogy: "Like combining ingredients from two successful recipes to create a new dish that might be even better.",
    pseudocode: `
// Single-point crossover
def crossover(parent1, parent2):
    crossoverPoint = random(len(parent1.genome))
    child1 = parent1.genome[:crossoverPoint] + parent2.genome[crossoverPoint:]
    child2 = parent2.genome[:crossoverPoint] + parent1.genome[crossoverPoint:]
    return child1, child2`,
    keyPoints: [
      "Combines beneficial traits from parents",
      "Crossover point affects mixing",
      "May preserve or disrupt network modules"
    ]
  },
  {
    id: 6,
    title: "Mutation",
    icon: Dna,
    description: "Introduce random changes to maintain genetic diversity and enable exploration.",
    details: "Apply random modifications to network weights, add/remove connections, or change topology to explore new solutions.",
    analogy: "Like a chef experimenting with small changes to a recipe - most changes might make it worse, but some could make it much better.",
    pseudocode: `
// Gaussian weight mutation
def mutate(genome):
    for i, weight in enumerate(genome.weights):
        if random() < MUTATION_RATE:
            genome.weights[i] += gaussian(0, MUTATION_STRENGTH)
    
    // Structural mutations
    if random() < ADD_CONNECTION_RATE:
        addRandomConnection(genome)`,
    keyPoints: [
      "Prevents premature convergence",
      "Mutation rate affects exploration",
      "Can modify weights or structure"
    ]
  },
  {
    id: 7,
    title: "Generational Replacement",
    icon: RotateCcw,
    description: "Replace the old population with the new offspring and repeat the process.",
    details: "Create the next generation by replacing some or all of the current population with the newly created offspring.",
    analogy: "Like graduating students and enrolling a new class - the next generation builds on what came before.",
    pseudocode: `
// Generational replacement
newPopulation = []
while len(newPopulation) < POPULATION_SIZE:
    parent1 = selectParent(population)
    parent2 = selectParent(population)
    child1, child2 = crossover(parent1, parent2)
    mutate(child1)
    mutate(child2)
    newPopulation.extend([child1, child2])

population = newPopulation`,
    keyPoints: [
      "Determines survival strategy",
      "Elitism can preserve best solutions",
      "Generation gap affects diversity"
    ]
  }
];

export const StepsContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            How <span className="gradient-neural bg-clip-text text-transparent">Neuroevolution</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn the seven key steps of neuroevolution algorithms through detailed explanations, 
            analogies, and interactive 3D visualizations.
          </p>
        </div>

        {/* Step navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 p-2 rounded-full bg-muted/30">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full gradient-neural">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <Badge variant="outline">Step {step.id}</Badge>
                    <CardTitle className="text-2xl mt-2">{step.title}</CardTitle>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-muted-foreground">{step.details}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Real-World Analogy</h3>
                  <p className="text-muted-foreground italic">{step.analogy}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Key Points</h3>
                  <ul className="space-y-1">
                    {step.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Pseudocode</h3>
                  <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
                    <code>{step.pseudocode}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="gradient-neural text-primary-foreground"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* 3D Visualization */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>3D Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square">
                  <StepVisualization stepId={step.id} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};