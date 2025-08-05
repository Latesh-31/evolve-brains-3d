import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen, ExternalLink } from "lucide-react";

const glossaryTerms = [
  {
    term: "Neuroevolution",
    category: "Core Concepts",
    definition: "A machine learning technique that uses evolutionary algorithms to optimize neural networks, including their weights, biases, and topology.",
    example: "Instead of using backpropagation, neuroevolution breeds neural networks like biological organisms to solve problems."
  },
  {
    term: "Fitness Function",
    category: "Core Concepts", 
    definition: "A function that evaluates how well a neural network performs on a given task, assigning a numerical score that guides the evolutionary process.",
    example: "In CartPole, fitness might be the number of time steps the pole stays balanced."
  },
  {
    term: "Population",
    category: "Core Concepts",
    definition: "A collection of neural networks (individuals) that evolve together over generations to solve a problem.",
    example: "A population of 100 neural networks, each with different random weights initially."
  },
  {
    term: "Generation", 
    category: "Core Concepts",
    definition: "One complete cycle of the evolutionary process: evaluation, selection, reproduction, and replacement.",
    example: "After 50 generations, the neural networks became much better at playing the game."
  },
  {
    term: "Crossover",
    category: "Genetic Operations",
    definition: "A genetic operator that combines two parent neural networks to create offspring that inherit traits from both.",
    example: "Single-point crossover splits parent genomes at a random point and swaps the segments."
  },
  {
    term: "Mutation",
    category: "Genetic Operations",
    definition: "A genetic operator that introduces random changes to neural networks to maintain diversity and explore new solutions.",
    example: "Weight mutation adds small random values to existing connection weights."
  },
  {
    term: "Selection",
    category: "Genetic Operations",
    definition: "The process of choosing which neural networks from the current generation will become parents for the next generation.",
    example: "Tournament selection randomly picks small groups and chooses the best from each group."
  },
  {
    term: "Elitism",
    category: "Genetic Operations",
    definition: "A strategy that preserves the best-performing individuals from one generation to the next without modification.",
    example: "Keeping the top 5 neural networks unchanged ensures the best solution isn't lost."
  },
  {
    term: "Genome",
    category: "Encoding",
    definition: "The genetic representation of a neural network, typically encoding weights, biases, and sometimes topology.",
    example: "A direct encoding represents each weight as a real number in the genome."
  },
  {
    term: "Phenotype",
    category: "Encoding",
    definition: "The actual neural network structure and behavior that results from expressing the genome.",
    example: "The phenotype is the working neural network that can process inputs and produce outputs."
  },
  {
    term: "Genotype",
    category: "Encoding",
    definition: "The encoded genetic information (genome) that represents a neural network's properties.",
    example: "The genotype might be a list of real numbers representing all network weights."
  },
  {
    term: "NEAT",
    category: "Algorithms",
    definition: "NeuroEvolution of Augmenting Topologies - an algorithm that evolves both neural network weights and topology.",
    example: "NEAT can start with simple networks and evolve complex architectures as needed."
  },
  {
    term: "ESP",
    category: "Algorithms", 
    definition: "Enforced SubPopulations - a neuroevolution method that evolves neurons rather than complete networks.",
    example: "ESP maintains separate populations for each neuron position in the network."
  },
  {
    term: "HyperNEAT",
    category: "Algorithms",
    definition: "Hypercube-based NEAT - extends NEAT to evolve large-scale neural networks with geometric patterns.",
    example: "HyperNEAT can evolve visual processing networks by exploiting spatial relationships."
  },
  {
    term: "Fitness Sharing",
    category: "Diversity",
    definition: "A technique that reduces the fitness of similar individuals to maintain population diversity.",
    example: "Networks that behave similarly share their fitness scores, preventing one strategy from dominating."
  },
  {
    term: "Speciation",
    category: "Diversity",
    definition: "Grouping similar individuals into species to protect innovation and maintain diversity.",
    example: "NEAT uses speciation to allow new structural innovations time to optimize before competing."
  },
  {
    term: "Novelty Search",
    category: "Diversity",
    definition: "An evolutionary approach that rewards behavioral novelty rather than objective performance.",
    example: "Instead of maximizing score, novelty search rewards doing something different from previous attempts."
  }
];

const categories = [...new Set(glossaryTerms.map(term => term.category))];

export const NeuroevolutionGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = 
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.example.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || term.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const resources = [
    {
      title: "Evolving Neural Networks through Augmenting Topologies",
      author: "Kenneth O. Stanley & Risto Miikkulainen",
      type: "Research Paper",
      description: "The original NEAT paper that introduced topology evolution"
    },
    {
      title: "Neuroevolution: A Review",
      author: "Dario Floreano et al.",
      type: "Survey Paper", 
      description: "Comprehensive overview of neuroevolution techniques and applications"
    },
    {
      title: "Deep Neuroevolution",
      author: "OpenAI",
      type: "Blog Post",
      description: "Modern applications of neuroevolution to deep learning"
    },
    {
      title: "The Nature of Code - Genetic Algorithms",
      author: "Daniel Shiffman",
      type: "Book Chapter",
      description: "Accessible introduction to evolutionary algorithms"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Neuroevolution Glossary & Resources
          </CardTitle>
          <CardDescription>
            Comprehensive definitions, examples, and learning resources
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Search and Filter */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Categories:</div>
                <div className="space-y-1">
                  <Badge 
                    variant={selectedCategory === "All" ? "default" : "outline"}
                    className="cursor-pointer w-full justify-start"
                    onClick={() => setSelectedCategory("All")}
                  >
                    All ({glossaryTerms.length})
                  </Badge>
                  {categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer w-full justify-start text-xs"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category} ({glossaryTerms.filter(t => t.category === category).length})
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>💡 <strong>Core Concepts:</strong> Fundamental terms</div>
                <div>🧬 <strong>Genetic Ops:</strong> Evolutionary operators</div>
                <div>📊 <strong>Encoding:</strong> Representation methods</div>
                <div>⚙️ <strong>Algorithms:</strong> Specific techniques</div>
                <div>🌈 <strong>Diversity:</strong> Population management</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Glossary Terms */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Definitions ({filteredTerms.length} terms)
              </CardTitle>
              <CardDescription>
                Click on any term to expand its definition and examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredTerms.map((term, index) => (
                  <AccordionItem key={term.term} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{term.term}</span>
                        <Badge variant="outline" className="text-xs">
                          {term.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div>
                          <div className="text-sm font-medium mb-1">Definition:</div>
                          <p className="text-sm text-muted-foreground">
                            {term.definition}
                          </p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-sm font-medium mb-1">Example:</div>
                          <p className="text-sm text-muted-foreground italic">
                            {term.example}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Further Reading
              </CardTitle>
              <CardDescription>
                Recommended papers, books, and online resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {resource.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="faq-1">
                  <AccordionTrigger>When should I use neuroevolution over backpropagation?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Use neuroevolution when: (1) you don't have differentiable objectives, 
                      (2) you need to evolve network topology, (3) you're working with 
                      reinforcement learning in complex environments, or (4) you want to 
                      explore diverse solutions rather than converge to a single optimum.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-2">
                  <AccordionTrigger>How do I choose population size and mutation rate?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Start with population sizes of 50-150 for simple problems, 200-500 for complex ones. 
                      Mutation rates typically range from 0.01-0.1. Higher mutation rates increase 
                      exploration but can disrupt good solutions. Adjust based on problem complexity 
                      and computational budget.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-3">
                  <AccordionTrigger>What makes a good fitness function?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Good fitness functions are: (1) aligned with your actual objectives, 
                      (2) provide smooth gradients when possible, (3) reward progress toward 
                      the goal, (4) avoid deceptive local optima, and (5) are computationally 
                      efficient to evaluate.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-4">
                  <AccordionTrigger>How does neuroevolution scale to large networks?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Modern techniques like HyperNEAT, compressed networks, and evolutionary 
                      strategies (ES) can handle networks with millions of parameters. The key 
                      is using structured representations, parallelization, and sometimes 
                      hybrid approaches that combine evolution with gradient-based fine-tuning.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};