import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Neural network node component
const NetworkNode = ({ position, color = "#8b5cf6", scale = 1 }: { 
  position: [number, number, number]; 
  color?: string;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = Math.sin(time + position[0]) * 0.1;
      const currentScale = scale + Math.sin(time * 2 + position[0]) * 0.1;
      meshRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15 * scale, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Connection line component
const Connection = ({ start, end, color = "#06b6d4" }: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([...start, ...end])}
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.6} />
    </line>
  );
};

// Main neural network visualization
const NetworkStructure = () => {
  // Define network layers
  const inputLayer = [
    [-2, 1, 0], [-2, 0, 0], [-2, -1, 0]
  ] as [number, number, number][];
  
  const hiddenLayer1 = [
    [-0.5, 1.5, 0], [-0.5, 0.5, 0], [-0.5, -0.5, 0], [-0.5, -1.5, 0]
  ] as [number, number, number][];
  
  const hiddenLayer2 = [
    [1, 1, 0], [1, 0, 0], [1, -1, 0]
  ] as [number, number, number][];
  
  const outputLayer = [
    [2.5, 0.5, 0], [2.5, -0.5, 0]
  ] as [number, number, number][];

  return (
    <>
      {/* Input layer nodes */}
      {inputLayer.map((pos, i) => (
        <NetworkNode key={`input-${i}`} position={pos} color="#06b6d4" scale={1.2} />
      ))}
      
      {/* Hidden layer 1 nodes */}
      {hiddenLayer1.map((pos, i) => (
        <NetworkNode key={`hidden1-${i}`} position={pos} color="#8b5cf6" />
      ))}
      
      {/* Hidden layer 2 nodes */}
      {hiddenLayer2.map((pos, i) => (
        <NetworkNode key={`hidden2-${i}`} position={pos} color="#8b5cf6" />
      ))}
      
      {/* Output layer nodes */}
      {outputLayer.map((pos, i) => (
        <NetworkNode key={`output-${i}`} position={pos} color="#ec4899" scale={1.3} />
      ))}
      
      {/* Connections from input to hidden1 */}
      {inputLayer.map((start, i) =>
        hiddenLayer1.map((end, j) => (
          <Connection key={`input-hidden1-${i}-${j}`} start={start} end={end} color="#06b6d4" />
        ))
      )}
      
      {/* Connections from hidden1 to hidden2 */}
      {hiddenLayer1.map((start, i) =>
        hiddenLayer2.map((end, j) => (
          <Connection key={`hidden1-hidden2-${i}-${j}`} start={start} end={end} color="#8b5cf6" />
        ))
      )}
      
      {/* Connections from hidden2 to output */}
      {hiddenLayer2.map((start, i) =>
        outputLayer.map((end, j) => (
          <Connection key={`hidden2-output-${i}-${j}`} start={start} end={end} color="#ec4899" />
        ))
      )}
    </>
  );
};

export const NeuralNetworkVisualization = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-card/50 border border-border/40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <NetworkStructure />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};