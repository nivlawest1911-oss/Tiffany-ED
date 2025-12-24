'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function NeuralWave() {
  const mesh = useRef();
  const count = 100;
  const [positions, phase] = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    const ph = new Float32Array(count * count);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        pos[(i * count + j) * 3] = i - count / 2;
        pos[(i * count + j) * 3 + 1] = 0;
        pos[(i * count + j) * 3 + 2] = j - count / 2;
        ph[i * count + j] = Math.random() * 10;
      }
    }
    return [pos, ph];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = i * count + j;
        mesh.current.geometry.attributes.position.array[index * 3 + 1] = 
          Math.sin(time + phase[index]) * 0.5 + Math.cos(time * 0.5 + phase[index]) * 0.5;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#3b82f6" transparent opacity={0.4} />
    </points>
  );
}

export default function MorphicNeuralMesh() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 10, 20], fov: 75 }}>
        <NeuralWave />
      </Canvas>
    </div>
  );
}
