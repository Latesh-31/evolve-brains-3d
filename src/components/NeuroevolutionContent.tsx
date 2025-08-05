import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Dna, TrendingUp, Users, Zap, Target } from "lucide-react";
import { NeuroevolutionBasics } from "./neuroevolution/NeuroevolutionBasics";
import { NeuroevolutionSteps } from "./neuroevolution/NeuroevolutionSteps";
import { InteractiveDemo } from "./neuroevolution/InteractiveDemo";
import { DatasetExplorer } from "./neuroevolution/DatasetExplorer";
import { CaseStudies } from "./neuroevolution/CaseStudies";
import { NeuroevolutionGlossary } from "./neuroevolution/NeuroevolutionGlossary";

export const NeuroevolutionContent = () => {
  const [activeTab, setActiveTab] = useState("basics");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-primary" />
            <Dna className="h-12 w-12 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Neuroevolution
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how artificial intelligence learns through evolution. Explore the fascinating intersection 
            of neural networks and genetic algorithms that powers some of the most impressive AI achievements.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              Neural Networks
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Dna className="h-3 w-3" />
              Genetic Algorithms
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Evolutionary Learning
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              Optimization
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="basics" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Basics</span>
            </TabsTrigger>
            <TabsTrigger value="steps" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Steps</span>
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Interactive</span>
            </TabsTrigger>
            <TabsTrigger value="dataset" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dataset</span>
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Cases</span>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <Dna className="h-4 w-4" />
              <span className="hidden sm:inline">Glossary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <NeuroevolutionBasics />
          </TabsContent>

          <TabsContent value="steps">
            <NeuroevolutionSteps />
          </TabsContent>

          <TabsContent value="interactive">
            <InteractiveDemo />
          </TabsContent>

          <TabsContent value="dataset">
            <DatasetExplorer />
          </TabsContent>

          <TabsContent value="cases">
            <CaseStudies />
          </TabsContent>

          <TabsContent value="glossary">
            <NeuroevolutionGlossary />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};