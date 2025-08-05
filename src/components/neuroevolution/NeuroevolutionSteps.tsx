import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Brain, 
  Target, 
  Crown, 
  Shuffle, 
  Zap, 
  RefreshCw,
  Play,
  ChevronRight,
  Code
} from "lucide-react";
import { StepVisualization } from "../3d/StepVisualization";

export const NeuroevolutionSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      id: "initialization",
      title: "Population Initialization",
      icon: Users,
      color: "text-blue-500",
      description: "Creating the first generation of neural networks"
    },
    {
      id: "encoding",
      title: "Neural Network Encoding",
      icon: Brain,
      color: "text-purple-500",
      description: "How networks are represented as genetic material"
    },
    {
      id: "evaluation",
      title: "Fitness Evaluation",
      icon: Target,
      color: "text-green-500",
      description: "Testing each network's performance"
    },
    {
      id: "selection",
      title: "Parent Selection",
      icon: Crown,
      color: "text-yellow-500",
      description: "Choosing the best networks for reproduction"
    },
    {
      id: "crossover",
      title: "Crossover",
      icon: Shuffle,
      color: "text-orange-500",
      description: "Combining parent networks to create offspring"
    },
    {
      id: "mutation",
      title: "Mutation",
      icon: Zap,
      color: "text-red-500",
      description: "Adding random variations to maintain diversity"
    },
    {
      id: "replacement",
      title: "Population Replacement",
      icon: RefreshCw,
      color: "text-indigo-500",
      description: "Creating the next generation"
    }
  ];

  const stepDetails = {
    initialization: {
      concept: "Population Initialization is the starting point where we create a diverse group of neural networks with random properties.",
      analogy: "Like planting a garden with many different seed varieties - each will grow differently and some will thrive better than others.",
      pseudocode: `function initializePopulation(populationSize, networkShape) {
  population = []
  for i = 1 to populationSize:
    network = createRandomNetwork(networkShape)
    network.weights = randomWeights()
    network.biases = randomBiases()
    population.add(network)
  return population
}`,
      keyPoints: [
        "Random initialization ensures genetic diversity",
        "Population size affects exploration vs exploitation",
        "Network architecture can be fixed or evolved"
      ]
    },
    encoding: {
      concept: "Neural networks must be encoded as genetic material that can be manipulated by evolutionary operators.",
      analogy: "Like translating a recipe into DNA - each ingredient and instruction becomes a gene that can be inherited and modified.",
      pseudocode: `function encodeNetwork(network) {
  genome = []
  // Encode weights as real numbers
  for each layer in network:
    for each weight in layer:
      genome.append(weight)
  // Encode topology (optional)
  genome.append(network.structure)
  return genome
}`,
      keyPoints: [
        "Direct encoding: weights as real numbers",
        "Indirect encoding: rules for network construction",
        "Topology encoding for structure evolution"
      ]
    },
    evaluation: {
      concept: "Each network is tested on the problem to determine its fitness score, which guides the evolutionary process.",
      analogy: "Like a driving test - each student driver (network) is evaluated on how well they navigate the course (problem).",
      pseudocode: `function evaluateFitness(network, environment) {
  totalReward = 0
  for episode = 1 to numEpisodes:
    state = environment.reset()
    while not done:
      action = network.forward(state)
      state, reward, done = environment.step(action)
      totalReward += reward
  return totalReward / numEpisodes
}`,
      keyPoints: [
        "Fitness function must reflect problem objectives",
        "Multiple evaluation episodes reduce noise",
        "Fitness normalization prevents domination"
      ]
    },
    selection: {
      concept: "The best-performing networks are chosen as parents for the next generation based on their fitness scores.",
      analogy: "Like choosing the strongest and smartest animals for breeding - those with the best traits get to pass on their genes.",
      pseudocode: `function selectParents(population, numParents) {
  // Tournament selection
  parents = []
  for i = 1 to numParents:
    tournament = randomSample(population, tournamentSize)
    winner = max(tournament, key=fitness)
    parents.add(winner)
  return parents
}`,
      keyPoints: [
        "Tournament selection balances diversity and quality",
        "Fitness proportionate selection favors best individuals",
        "Elite preservation maintains best solutions"
      ]
    },
    crossover: {
      concept: "Parent networks are combined to create offspring that inherit traits from both parents.",
      analogy: "Like mixing paint colors - you combine the best features of two parent colors to create a new, potentially better color.",
      pseudocode: `function crossover(parent1, parent2) {
  child = createEmptyNetwork()
  // Single-point crossover
  crossoverPoint = random(0, genome.length)
  for i = 0 to crossoverPoint:
    child.genome[i] = parent1.genome[i]
  for i = crossoverPoint to genome.length:
    child.genome[i] = parent2.genome[i]
  return child
}`,
      keyPoints: [
        "Single-point crossover splits genomes at one point",
        "Uniform crossover mixes genes randomly",
        "Arithmetic crossover averages parent values"
      ]
    },
    mutation: {
      concept: "Small random changes are introduced to maintain genetic diversity and explore new solutions.",
      analogy: "Like introducing typos while copying a book - most typos make it worse, but occasionally one creates an improvement.",
      pseudocode: `function mutate(network, mutationRate, mutationStrength) {
  for each gene in network.genome:
    if random() < mutationRate:
      if mutationType == "weight":
        gene += gaussian(0, mutationStrength)
      elif mutationType == "node":
        addRandomNode(network)
      elif mutationType == "connection":
        addRandomConnection(network)
  return network
}`,
      keyPoints: [
        "Gaussian mutation adds noise to weights",
        "Structural mutation changes network topology",
        "Adaptive mutation adjusts based on progress"
      ]
    },
    replacement: {
      concept: "The new generation replaces the old one, with strategies to maintain the best solutions.",
      analogy: "Like a sports team draft - you keep your star players (elites) and replace underperformers with promising newcomers.",
      pseudocode: `function replacePopulation(oldPop, offspring, eliteSize) {
  newPopulation = []
  // Keep elite individuals
  elites = getBest(oldPop, eliteSize)
  newPopulation.extend(elites)
  
  // Add offspring to fill population
  remaining = populationSize - eliteSize
  newPopulation.extend(offspring[:remaining])
  
  return newPopulation
}`,
      keyPoints: [
        "Generational replacement: complete population turnover",
        "Steady-state: replace worst individuals only",
        "Elite preservation ensures progress isn't lost"
      ]
    }
  };

  const currentStepData = steps[currentStep];
  const currentDetails = stepDetails[currentStepData.id];

  return (
    <div className="space-y-8">
      {/* Step Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Neuroevolution Algorithm Steps
          </CardTitle>
          <CardDescription>
            Click on each step to explore the detailed process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Button
                  key={step.id}
                  variant={currentStep === index ? "default" : "outline"}
                  className="flex items-center gap-2"
                  onClick={() => setCurrentStep(index)}
                >
                  <Icon className={`h-4 w-4 ${step.color}`} />
                  <span className="hidden sm:inline">{step.title}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Explanation */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <currentStepData.icon className={`h-5 w-5 ${currentStepData.color}`} />
                {currentStepData.title}
              </CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Concept:</h4>
                <p className="text-sm text-muted-foreground">{currentDetails.concept}</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  💡 Simple Analogy:
                </h4>
                <p className="text-sm">{currentDetails.analogy}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Key Points:</h4>
                <ul className="space-y-1">
                  {currentDetails.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pseudocode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Pseudocode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{currentDetails.pseudocode}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* 3D Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>3D Visualization</CardTitle>
            <CardDescription>
              Interactive 3D representation of {currentStepData.title.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/20 rounded-lg overflow-hidden">
              <StepVisualization />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Step
        </Button>
        <Badge variant="secondary">
          Step {currentStep + 1} of {steps.length}
        </Badge>
        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};
