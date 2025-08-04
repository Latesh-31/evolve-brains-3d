import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface StepVisualizationProps {
  stepId: number;
}

// Population visualization for step 1
const PopulationVisualization = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2;
      pos.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.5
      ] as [number, number, number]);
    }
    return pos;
  }, []);

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.15, 8, 8]}>
          <meshStandardMaterial 
            color={`hsl(${240 + i * 10}, 70%, 60%)`}
            emissive={`hsl(${240 + i * 10}, 70%, 30%)`}
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
      <Text
        position={[0, 0, -3]}
        fontSize={0.3}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
      >
        Population of Networks
      </Text>
    </group>
  );
};

// Fitness evaluation visualization for step 3
const FitnessVisualization = () => {
  const positions = [
    [-2, 1, 0], [-1, 1.5, 0], [0, 0.5, 0], [1, 1.8, 0], [2, 0.8, 0]
  ] as [number, number, number][];
  
  const fitness = [0.3, 0.8, 0.2, 0.9, 0.6];

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i}>
          <Sphere position={[pos[0], 0, pos[2]]} args={[0.1, 8, 8]}>
            <meshStandardMaterial 
              color={`hsl(${120 * fitness[i]}, 70%, 60%)`}
              emissive={`hsl(${120 * fitness[i]}, 70%, 30%)`}
              emissiveIntensity={0.3}
            />
          </Sphere>
          <mesh position={[pos[0], fitness[i], pos[2]]}>
            <boxGeometry args={[0.1, fitness[i] * 2, 0.1]} />
            <meshStandardMaterial 
              color={`hsl(${120 * fitness[i]}, 70%, 60%)`}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="#06b6d4"
        anchorX="center"
        anchorY="middle"
      >
        Fitness Scores
      </Text>
    </group>
  );
};

// Crossover visualization for step 5
const CrossoverVisualization = () => {
  const parent1Pos = [-1.5, 0.5, 0] as [number, number, number];
  const parent2Pos = [-1.5, -0.5, 0] as [number, number, number];
  const child1Pos = [1.5, 0.5, 0] as [number, number, number];
  const child2Pos = [1.5, -0.5, 0] as [number, number, number];

  return (
    <group>
      {/* Parents */}
      <Sphere position={parent1Pos} args={[0.15, 8, 8]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere position={parent2Pos} args={[0.15, 8, 8]}>
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
      </Sphere>
      
      {/* Children */}
      <Sphere position={child1Pos} args={[0.15, 8, 8]}>
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere position={child2Pos} args={[0.15, 8, 8]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
      </Sphere>
      
      {/* Connection lines */}
      <Line
        points={[new THREE.Vector3(...parent1Pos), new THREE.Vector3(...child1Pos)]}
        color="#8b5cf6"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Line
        points={[new THREE.Vector3(...parent2Pos), new THREE.Vector3(...child2Pos)]}
        color="#06b6d4"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="#ec4899"
        anchorX="center"
        anchorY="middle"
      >
        Crossover Operation
      </Text>
    </group>
  );
};

// Generic network visualization for other steps
const NetworkVisualization = () => {
  return (
    <group>
      {/* Simple network structure */}
      <Sphere position={[-1, 0, 0]} args={[0.1, 8, 8]}>
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere position={[0, 0.5, 0]} args={[0.1, 8, 8]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere position={[0, -0.5, 0]} args={[0.1, 8, 8]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere position={[1, 0, 0]} args={[0.1, 8, 8]}>
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} />
      </Sphere>
      
      {/* Connections */}
      <Line
        points={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0.5, 0)]}
        color="#06b6d4"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Line
        points={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, -0.5, 0)]}
        color="#06b6d4"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Line
        points={[new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(1, 0, 0)]}
        color="#8b5cf6"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Line
        points={[new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(1, 0, 0)]}
        color="#8b5cf6"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
    </group>
  );
};

export const StepVisualization = ({ stepId }: StepVisualizationProps) => {
  const renderVisualization = () => {
    switch (stepId) {
      case 1:
        return <PopulationVisualization />;
      case 3:
        return <FitnessVisualization />;
      case 5:
        return <CrossoverVisualization />;
      default:
        return <NetworkVisualization />;
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-card/30 border border-border/40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
        
        {renderVisualization()}
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={stepId === 1}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};