import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  FileText, 
  Video, 
  Code, 
  Users, 
  MessageCircle,
  Star,
  Clock
} from "lucide-react";

const glossaryTerms = [
  {
    term: "Fitness Function",
    definition: "A function that evaluates how well an individual neural network performs on a given task, returning a numerical score that guides the evolutionary process."
  },
  {
    term: "Crossover",
    definition: "A genetic operator that combines genetic material from two or more parent networks to create offspring, potentially inheriting beneficial traits from each parent."
  },
  {
    term: "Mutation",
    definition: "Random modifications applied to network weights or structure to maintain genetic diversity and enable exploration of new solutions."
  },
  {
    term: "Selection Pressure",
    definition: "The degree to which better-performing individuals are favored for reproduction, affecting the speed and direction of evolution."
  },
  {
    term: "NEAT",
    definition: "NeuroEvolution of Augmenting Topologies - an algorithm that evolves both the weights and structure of neural networks simultaneously."
  },
  {
    term: "Elitism",
    definition: "A strategy that preserves the best-performing individuals from one generation to the next, ensuring good solutions are not lost."
  }
];

const faqs = [
  {
    question: "What's the difference between neuroevolution and traditional machine learning?",
    answer: "Neuroevolution uses evolutionary algorithms to optimize neural networks, while traditional ML typically uses gradient-based methods like backpropagation. Neuroevolution can evolve network topology and doesn't require differentiable functions."
  },
  {
    question: "When should I use neuroevolution instead of deep learning?",
    answer: "Neuroevolution is particularly useful for reinforcement learning tasks, when you don't have labeled training data, for evolving network architectures, or when dealing with non-differentiable fitness functions."
  },
  {
    question: "How do I choose the right population size?",
    answer: "Larger populations explore more solutions but are computationally expensive. Start with 50-200 individuals for simple problems, and scale up for more complex tasks. Monitor diversity and convergence rates to find the sweet spot."
  },
  {
    question: "What's the best mutation rate to use?",
    answer: "Typical mutation rates range from 0.01 to 0.1. Higher rates increase exploration but may disrupt good solutions. Start with 0.05 and adjust based on your problem's complexity and convergence behavior."
  },
  {
    question: "Can neuroevolution handle large neural networks?",
    answer: "Yes, but it becomes computationally expensive. Modern techniques like novelty search, quality diversity, and hybrid approaches help scale neuroevolution to larger networks and more complex problems."
  }
];

const papers = [
  {
    title: "Evolving Neural Networks through Augmenting Topologies",
    authors: "Kenneth O. Stanley, Risto Miikkulainen",
    year: "2002",
    venue: "Evolutionary Computation",
    description: "The foundational paper introducing NEAT algorithm for evolving neural network topologies.",
    url: "#",
    citations: "3,847"
  },
  {
    title: "Deep Neuroevolution: Genetic Algorithms Are a Competitive Alternative",
    authors: "Felipe Petroski Such, Vashisht Madhavan, et al.",
    year: "2017",
    venue: "arXiv",
    description: "Demonstrates that evolution strategies can be competitive with reinforcement learning on complex tasks.",
    url: "#",
    citations: "892"
  },
  {
    title: "Quality Diversity: A New Frontier for Evolutionary Computation",
    authors: "Justin K. Pugh, Lisa B. Soros, Kenneth O. Stanley",
    year: "2016",
    venue: "Frontiers in Robotics and AI",
    description: "Introduction to quality diversity algorithms that seek diverse high-performing solutions.",
    url: "#",
    citations: "456"
  }
];

const tools = [
  {
    name: "NEAT-Python",
    description: "Pure Python implementation of NEAT with good documentation and examples.",
    language: "Python",
    stars: "1,247",
    url: "#"
  },
  {
    name: "MultiNEAT",
    description: "Fast C++ implementation of NEAT with Python bindings, supports advanced features.",
    language: "C++/Python",
    stars: "892",
    url: "#"
  },
  {
    name: "Evosax",
    description: "JAX-based evolution strategies library for scalable neuroevolution.",
    language: "Python/JAX",
    stars: "634",
    url: "#"
  },
  {
    name: "PyTorch-NEAT",
    description: "NEAT implementation built on PyTorch for GPU acceleration.",
    language: "Python",
    stars: "423",
    url: "#"
  }
];

export const ResourcesContent = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Learning <span className="gradient-neural bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of resources to deepen your understanding of neuroevolution, 
            from academic papers to practical tools and community discussions.
          </p>
        </div>

        <Tabs defaultValue="glossary" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="papers">Papers</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="glossary" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search terms..." 
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {glossaryTerms.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-primary">{item.term}</h3>
                    <p className="text-muted-foreground">{item.definition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="papers" className="space-y-6">
            <div className="grid gap-6">
              {papers.map((paper, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{paper.authors}</span>
                          <Badge variant="outline">{paper.year}</Badge>
                          <span>{paper.venue}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        {paper.citations}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{paper.description}</p>
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Read Paper
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Code className="h-5 w-5" />
                          {tool.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{tool.language}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4" />
                            {tool.stars}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Repository
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Discussion Forums
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">Reddit r/MachineLearning</h4>
                        <p className="text-sm text-muted-foreground">General ML discussions including neuroevolution</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">Stack Overflow</h4>
                        <p className="text-sm text-muted-foreground">Technical Q&A for implementation issues</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">NEAT Algorithm Explained</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>45 min</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">Evolution Strategies Tutorial</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>32 min</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Recommended Books
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Introduction to Evolutionary Computing</h4>
                      <p className="text-sm text-muted-foreground">A.E. Eiben, J.E. Smith</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Neuroevolution: From Principles to Practice</h4>
                      <p className="text-sm text-muted-foreground">Kenneth Stanley</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Courses & Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">CS231n: Convolutional Neural Networks</h4>
                      <p className="text-sm text-muted-foreground">Stanford University</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium">Evolutionary Computation Course</h4>
                      <p className="text-sm text-muted-foreground">MIT OpenCourseWare</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};