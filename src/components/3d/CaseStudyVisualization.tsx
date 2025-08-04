import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Line, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface CaseStudyVisualizationProps {
  caseId: string;
  isPlaying: boolean;
}

// Flappy Bird simulation
const FlappyBirdSim = ({ isPlaying }: { isPlaying: boolean }) => {
  const birdRef = useRef<THREE.Mesh>(null);
  const [birdY, setBirdY] = useState(0);
  const [pipes] = useState([
    { x: 2, gapY: 0.5 },
    { x: 5, gapY: -0.5 },
    { x: 8, gapY: 1 }
  ]);

  useFrame((state) => {
    if (!isPlaying) return;
    
    if (birdRef.current) {
      // Simple bird movement simulation
      const newY = Math.sin(state.clock.elapsedTime * 2) * 0.5;
      setBirdY(newY);
      birdRef.current.position.y = newY;
    }
  });

  return (
    <group>
      {/* Bird */}
      <Sphere ref={birdRef} position={[-2, birdY, 0]} args={[0.2, 8, 8]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} />
      </Sphere>
      
      {/* Pipes */}
      {pipes.map((pipe, i) => (
        <group key={i}>
          <Box position={[pipe.x, pipe.gapY + 1.5, 0]} args={[0.3, 2, 0.3]}>
            <meshStandardMaterial color="#22c55e" />
          </Box>
          <Box position={[pipe.x, pipe.gapY - 1.5, 0]} args={[0.3, 2, 0.3]}>
            <meshStandardMaterial color="#22c55e" />
          </Box>
        </group>
      ))}
      
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        Flappy Bird AI
      </Text>
    </group>
  );
};

// Car racing simulation
const CarRacingSim = ({ isPlaying }: { isPlaying: boolean }) => {
  const carRef = useRef<THREE.Mesh>(null);
  const [carPosition, setCarPosition] = useState(0);

  useFrame((state) => {
    if (!isPlaying || !carRef.current) return;
    
    const time = state.clock.elapsedTime;
    const x = Math.cos(time * 0.5) * 2;
    const z = Math.sin(time * 0.5) * 2;
    
    carRef.current.position.x = x;
    carRef.current.position.z = z;
    carRef.current.rotation.y = time * 0.5 + Math.PI / 2;
  });

  // Track markers
  const trackPoints = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    trackPoints.push([Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5]);
  }

  return (
    <group>
      {/* Track */}
      {trackPoints.map((point, i) => (
        <Box key={i} position={point as [number, number, number]} args={[0.1, 0.05, 0.1]}>
          <meshStandardMaterial color="#71717a" />
        </Box>
      ))}
      
      {/* Car */}
      <Box ref={carRef} position={[2, 0.1, 0]} args={[0.4, 0.2, 0.2]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} />
      </Box>
      
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="#ef4444"
        anchorX="center"
        anchorY="middle"
      >
        Racing Car AI
      </Text>
    </group>
  );
};

// Pole balancing simulation
const PoleBalancingSim = ({ isPlaying }: { isPlaying: boolean }) => {
  const cartRef = useRef<THREE.Mesh>(null);
  const poleRef = useRef<THREE.Mesh>(null);
  const [cartX, setCartX] = useState(0);
  const [poleAngle, setPoleAngle] = useState(0);

  useFrame((state) => {
    if (!isPlaying) return;
    
    const time = state.clock.elapsedTime;
    const newCartX = Math.sin(time * 0.8) * 1.5;
    const newPoleAngle = Math.sin(time * 1.2) * 0.3;
    
    setCartX(newCartX);
    setPoleAngle(newPoleAngle);
    
    if (cartRef.current) {
      cartRef.current.position.x = newCartX;
    }
    
    if (poleRef.current) {
      poleRef.current.position.x = newCartX;
      poleRef.current.rotation.z = newPoleAngle;
    }
  });

  return (
    <group>
      {/* Track */}
      <Box position={[0, -0.5, 0]} args={[6, 0.1, 0.2]}>
        <meshStandardMaterial color="#71717a" />
      </Box>
      
      {/* Cart */}
      <Box ref={cartRef} position={[cartX, -0.3, 0]} args={[0.4, 0.3, 0.3]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
      </Box>
      
      {/* Pole */}
      <Box 
        ref={poleRef} 
        position={[cartX, 0.5, 0]} 
        args={[0.05, 1.5, 0.05]}
      >
        <meshStandardMaterial color="#f59e0b" />
      </Box>
      
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Pole Balancing
      </Text>
    </group>
  );
};

export const CaseStudyVisualization = ({ caseId, isPlaying }: CaseStudyVisualizationProps) => {
  const renderSimulation = () => {
    switch (caseId) {
      case "flappy-bird":
        return <FlappyBirdSim isPlaying={isPlaying} />;
      case "car-racing":
        return <CarRacingSim isPlaying={isPlaying} />;
      case "pole-balancing":
        return <PoleBalancingSim isPlaying={isPlaying} />;
      default:
        return <FlappyBirdSim isPlaying={isPlaying} />;
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-card/30 border border-border/40">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        {renderSimulation()}
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};