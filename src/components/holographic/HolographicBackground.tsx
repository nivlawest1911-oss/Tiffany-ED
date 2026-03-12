'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Sparkles } from '@react-three/drei'

interface CubeProps {
    position: [number, number, number]
    color: string
}

function HolographicCube({ position, color }: CubeProps) {
    const meshRef = useRef<any>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005
            meshRef.current.rotation.y += 0.008
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
                roughness={0.1}
                metalness={0.9}
            />
        </mesh>
    )
}

export function HolographicBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00b0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.7} color="#8b5cf6" />
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
                <Sparkles count={50} scale={10} size={20} speed={0.5} opacity={0.7} />
                <HolographicCube position={[1.5, 0, 0]} color="#00b0ff" />
                <HolographicCube position={[-1.5, 1, -1]} color="#8b5cf6" />
                <HolographicCube position={[0, -2, 1]} color="#10b981" />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}

