import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Database, 
  Search, 
  Filter, 
  TrendingUp, 
  Download,
  Eye,
  BarChart3
} from "lucide-react";

// Mock dataset based on the uploaded image
const mockDataset = [
  { networkId: 1, generation: 1, weights: "[-0.158, -0.469, -0.191, -0.308, -0.929]", fitnessScore: 12, mutationApplied: "Weight Mutation", parentIds: "-" },
  { networkId: 2, generation: 1, weights: "[-0.352, 0.423, -0.301, -0.83, 0.451]", fitnessScore: 13, mutationApplied: "Weight Mutation", parentIds: "1" },
  { networkId: 3, generation: 1, weights: "[-0.966, -0.691, 0.085, 0.634, 0.032]", fitnessScore: 14, mutationApplied: "Weight Mutation", parentIds: "1" },
  { networkId: 4, generation: 1, weights: "[-0.751, -0.654, -0.604, 0.128, -0.633]", fitnessScore: 15, mutationApplied: "Weight Mutation", parentIds: "3" },
  { networkId: 5, generation: 1, weights: "[-0.099, -0.406, -0.357, -0.447, -0.887]", fitnessScore: 12, mutationApplied: "None", parentIds: "-" },
  { networkId: 6, generation: 1, weights: "[0.743, 0.027, 0.623, -0.281, 0.052]", fitnessScore: 26, mutationApplied: "Weight Mutation", parentIds: "2" },
  { networkId: 7, generation: 1, weights: "[-0.607, -0.22, 0.73, -0.993, 0.007]", fitnessScore: 26, mutationApplied: "Weight Mutation", parentIds: "5" },
  { networkId: 8, generation: 1, weights: "[-0.581, 0.174, -0.021, -0.493, -0.833]", fitnessScore: 22, mutationApplied: "Node Addition", parentIds: "7" },
  { networkId: 9, generation: 1, weights: "[-0.409, -0.513, 0.055, 0.743, 0.56]", fitnessScore: 23, mutationApplied: "Weight Mutation", parentIds: "5" },
  { networkId: 10, generation: 1, weights: "[0.77, -0.467, -0.093, 0.387, 0.99]", fitnessScore: 23, mutationApplied: "Crossover", parentIds: "1, 3" },
  { networkId: 11, generation: 1, weights: "[-0.349, -0.883, 0.601, -0.122, -0.028]", fitnessScore: 15, mutationApplied: "None", parentIds: "-" },
  { networkId: 12, generation: 1, weights: "[-0.224, 0.553, 0.225, 0.947, 0.555]", fitnessScore: 21, mutationApplied: "Weight Mutation", parentIds: "4" },
  { networkId: 13, generation: 1, weights: "[-0.753, -0.394, 0.529, -0.879, 0.867]", fitnessScore: 25, mutationApplied: "Weight Mutation", parentIds: "10" },
  { networkId: 14, generation: 1, weights: "[0.019, 0.361, 0.405, -0.21, -0.509]", fitnessScore: 15, mutationApplied: "Crossover", parentIds: "4, 1" },
  { networkId: 15, generation: 1, weights: "[-0.201, -0.925, 0.504, -0.026, 0.031]", fitnessScore: 22, mutationApplied: "None", parentIds: "-" }
];

const fitnessData = [
  { generation: 1, bestFitness: 26, avgFitness: 18.3, diversity: 0.82 },
  { generation: 2, bestFitness: 28, avgFitness: 20.1, diversity: 0.75 },
  { generation: 3, bestFitness: 31, avgFitness: 22.7, diversity: 0.68 },
  { generation: 4, bestFitness: 33, avgFitness: 24.2, diversity: 0.71 },
  { generation: 5, bestFitness: 35, avgFitness: 26.8, diversity: 0.64 }
];

export const DatasetExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGeneration, setFilterGeneration] = useState("all");
  const [filterMutation, setFilterMutation] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    return mockDataset.filter(row => {
      const matchesSearch = 
        row.networkId.toString().includes(searchTerm) ||
        row.weights.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.mutationApplied.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGeneration = filterGeneration === "all" || row.generation.toString() === filterGeneration;
      const matchesMutation = filterMutation === "all" || row.mutationApplied === filterMutation;
      
      return matchesSearch && matchesGeneration && matchesMutation;
    });
  }, [searchTerm, filterGeneration, filterMutation]);

  const mutationTypes = [...new Set(mockDataset.map(row => row.mutationApplied))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Neuroevolution CartPole Dataset Explorer
          </CardTitle>
          <CardDescription>
            Real evolutionary data from 1000 neural networks solving the CartPole problem
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="evolution-log" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evolution-log">Evolution Log</TabsTrigger>
          <TabsTrigger value="fitness-trends">Fitness Trends</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution-log" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search networks, weights, mutations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={filterGeneration} onValueChange={setFilterGeneration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Generation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Generations</SelectItem>
                    <SelectItem value="1">Generation 1</SelectItem>
                    <SelectItem value="2">Generation 2</SelectItem>
                    <SelectItem value="3">Generation 3</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterMutation} onValueChange={setFilterMutation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mutation Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Mutations</SelectItem>
                    {mutationTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>

              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredData.length} of {mockDataset.length} networks</span>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Evolution Log</CardTitle>
              <CardDescription>
                Detailed records of each neural network's evolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Network ID</TableHead>
                      <TableHead>Generation</TableHead>
                      <TableHead>Weights (Sample)</TableHead>
                      <TableHead>Fitness</TableHead>
                      <TableHead>Mutation</TableHead>
                      <TableHead>Parents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((row) => (
                      <TableRow key={row.networkId}>
                        <TableCell className="font-medium">
                          <Badge variant="outline">#{row.networkId}</Badge>
                        </TableCell>
                        <TableCell>{row.generation}</TableCell>
                        <TableCell className="font-mono text-xs max-w-32 truncate">
                          {row.weights}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={row.fitnessScore > 20 ? "default" : "secondary"}
                          >
                            {row.fitnessScore}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              row.mutationApplied === "Weight Mutation" ? "border-blue-500 text-blue-700" :
                              row.mutationApplied === "Node Addition" ? "border-green-500 text-green-700" :
                              row.mutationApplied === "Crossover" ? "border-purple-500 text-purple-700" :
                              "border-gray-500 text-gray-700"
                            }
                          >
                            {row.mutationApplied}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.parentIds}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedNetwork(row.networkId)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fitness-trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Fitness Evolution Over Generations
              </CardTitle>
              <CardDescription>
                Track how population fitness improves over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Fitness Chart Placeholder */}
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive fitness chart would appear here</p>
                    <p className="text-xs text-muted-foreground">Best, Average, and Worst fitness over generations</p>
                  </div>
                </div>

                {/* Fitness Statistics */}
                <div className="grid md:grid-cols-3 gap-4">
                  {fitnessData.map((gen) => (
                    <Card key={gen.generation} className="text-center">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Generation {gen.generation}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <div className="text-2xl font-bold text-primary">{gen.bestFitness}</div>
                          <div className="text-xs text-muted-foreground">Best Fitness</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-secondary">{gen.avgFitness}</div>
                          <div className="text-xs text-muted-foreground">Average</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-accent">{gen.diversity}</div>
                          <div className="text-xs text-muted-foreground">Diversity</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Mutation Distribution</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Weight Mutation</span>
                      <Badge variant="outline">67%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Crossover</span>
                      <Badge variant="outline">20%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Node Addition</span>
                      <Badge variant="outline">7%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">None</span>
                      <Badge variant="outline">6%</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Max Fitness: <strong>35</strong></div>
                    <div>Min Fitness: <strong>12</strong></div>
                    <div>Avg Fitness: <strong>20.8</strong></div>
                    <div>Std Dev: <strong>6.2</strong></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educational Links</CardTitle>
                <CardDescription>
                  Connect dataset patterns to theory
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    📊 Why fitness varies across generations
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🧬 How crossover creates new solutions
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    ⚡ Impact of mutation rates on diversity
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🎯 Parent selection strategies in action
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Network Detail Modal would go here */}
      {selectedNetwork && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Network #{selectedNetwork} Details</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedNetwork(null)}
              className="absolute right-4 top-4"
            >
              ✕
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Detailed network analysis would appear here, including weight visualization, 
              parent-child relationships, and performance history.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};