import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

interface EvolutionParameters {
  populationSize: number;
  mutationRate: number;
  crossoverRate: number;
  eliteSize: number;
}

interface InteractiveEvolutionProps {
  isRunning: boolean;
  parameters: EvolutionParameters;
  onGenerationUpdate: (generation: number) => void;
}

interface Individual {
  position: [number, number, number];
  fitness: number;
  color: string;
  scale: number;
}

const Population = ({ individuals, generation }: { individuals: Individual[]; generation: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {individuals.map((individual, i) => (
        <mesh 
          key={i} 
          position={individual.position}
        >
          <sphereGeometry args={[0.1 * individual.scale, 8, 8]} />
          <meshStandardMaterial 
            color={individual.color}
            emissive={individual.color}
            emissiveIntensity={individual.fitness * 0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      <Text
        position={[0, -3, 0]}
        fontSize={0.3}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
      >
        Generation {generation}
      </Text>
    </group>
  );
};

const FitnessLandscape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(8, 8, 32, 32);
    const vertices = geom.attributes.position.array as Float32Array;
    
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.5;
    }
    
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#1a1a2e"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

export const InteractiveEvolution = ({ 
  isRunning, 
  parameters, 
  onGenerationUpdate 
}: InteractiveEvolutionProps) => {
  const [generation, setGeneration] = useState(0);
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  
  // Initialize population
  useEffect(() => {
    const newIndividuals: Individual[] = [];
    for (let i = 0; i < parameters.populationSize; i++) {
      const angle = (i / parameters.populationSize) * Math.PI * 2;
      const radius = 2 + Math.random() * 0.5;
      const fitness = Math.random();
      
      newIndividuals.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 0.5
        ],
        fitness,
        color: `hsl(${120 * fitness}, 70%, 60%)`,
        scale: 0.5 + fitness
      });
    }
    setIndividuals(newIndividuals);
  }, [parameters.populationSize]);

  // Evolution simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGeneration(prev => {
        const newGen = prev + 1;
        onGenerationUpdate(newGen);
        
        // Simulate evolution
        setIndividuals(prevIndividuals => {
          const newIndividuals = [...prevIndividuals];
          
          // Apply selection pressure - improve fitness of better individuals
          newIndividuals.forEach(individual => {
            if (Math.random() < 0.3) { // 30% chance of improvement
              individual.fitness = Math.min(1, individual.fitness + Math.random() * 0.1);
              individual.color = `hsl(${120 * individual.fitness}, 70%, 60%)`;
              individual.scale = 0.5 + individual.fitness;
            }
          });
          
          // Simulate mutation
          if (Math.random() < parameters.mutationRate) {
            const randomIndex = Math.floor(Math.random() * newIndividuals.length);
            const individual = newIndividuals[randomIndex];
            individual.fitness = Math.max(0, Math.min(1, individual.fitness + (Math.random() - 0.5) * 0.2));
            individual.color = `hsl(${120 * individual.fitness}, 70%, 60%)`;
            individual.scale = 0.5 + individual.fitness;
          }
          
          return newIndividuals;
        });
        
        return newGen;
      });
    }, 1000); // New generation every second

    return () => clearInterval(interval);
  }, [isRunning, parameters.mutationRate, onGenerationUpdate]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-card/30 border border-border/40">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
        
        <FitnessLandscape />
        <Population individuals={individuals} generation={generation} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};