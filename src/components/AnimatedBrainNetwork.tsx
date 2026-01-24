'use client';

import { motion } from 'framer-motion';
import { Brain, GraduationCap, BookOpen, Lightbulb, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Node {
    id: number;
    x: number;
    y: number;
    size: number;
}

export default function AnimatedBrainNetwork() {
    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        // Generate brain-shaped node network
        const generatedNodes: Node[] = [];
        const centerX = 50;
        const centerY = 50;

        // Create nodes in a brain-like pattern
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 20 + Math.random() * 15;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius * 0.8; // Flatten for brain shape

            generatedNodes.push({
                id: i,
                x,
                y,
                size: Math.random() * 8 + 4
            });
        }

        setNodes(generatedNodes);
    }, []);

    const educationalIcons = [
        { Icon: GraduationCap, color: 'text-purple-400', position: { top: '15%', left: '20%' } },
        { Icon: BookOpen, color: 'text-indigo-400', position: { top: '25%', right: '15%' } },
        { Icon: Lightbulb, color: 'text-amber-400', position: { bottom: '20%', left: '25%' } },
        { Icon: Sparkles, color: 'text-pink-400', position: { top: '40%', right: '20%' } },
        { Icon: Zap, color: 'text-yellow-400', position: { bottom: '30%', right: '30%' } },
        { Icon: Brain, color: 'text-purple-300', position: { top: '50%', left: '15%' } },
    ];

    return (
        <div className="relative w-full h-[600px] bg-black overflow-hidden rounded-3xl">
            {/* Animated Circuit Board Background */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M10 10 L90 10 L90 90 L10 90 Z" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
                            <circle cx="10" cy="10" r="2" fill="#8b5cf6" />
                            <circle cx="90" cy="90" r="2" fill="#8b5cf6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Central Brain Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Connection Lines */}
                    {nodes.map((node, i) =>
                        nodes.slice(i + 1).map((targetNode, j) => {
                            const distance = Math.sqrt(
                                Math.pow(node.x - targetNode.x, 2) +
                                Math.pow(node.y - targetNode.y, 2)
                            );

                            if (distance < 15) {
                                return (
                                    <motion.line
                                        key={`${i}-${j}`}
                                        x1={node.x}
                                        y1={node.y}
                                        x2={targetNode.x}
                                        y2={targetNode.y}
                                        stroke="url(#gradient)"
                                        strokeWidth="0.2"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: [0.2, 0.6, 0.2]
                                        }}
                                        transition={{
                                            pathLength: { duration: 2, delay: Math.random() * 2 },
                                            opacity: {
                                                duration: 3,
                                                repeat: Infinity,
                                                delay: Math.random() * 3
                                            }
                                        }}
                                    />
                                );
                            }
                            return null;
                        })
                    )}

                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <radialGradient id="nodeGradient">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
                        </radialGradient>
                    </defs>

                    {/* Network Nodes */}
                    {nodes.map((node) => (
                        <motion.g key={node.id}>
                            {/* Pulsing Glow */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={node.size * 2}
                                fill="url(#nodeGradient)"
                                animate={{
                                    r: [node.size * 2, node.size * 3, node.size * 2],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                            {/* Core Node */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={node.size}
                                fill="#a855f7"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: node.id * 0.05 }}
                            />
                        </motion.g>
                    ))}
                </svg>

                {/* Central Brain Glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Floating Educational Icons */}
            {educationalIcons.map(({ Icon, color, position }, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={position}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.2, 1, 0],
                        y: [0, -30, -60, -90],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.7,
                        ease: "easeInOut"
                    }}
                >
                    <div className="relative">
                        {/* Icon Glow */}
                        <motion.div
                            className={`absolute inset-0 ${color} blur-xl`}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Icon className={`w-12 h-12 ${color} relative z-10`} />
                    </div>
                </motion.div>
            ))}

            {/* Data Flow Streams */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: 0
                    }}
                    animate={{
                        y: ['0%', '600%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Floating Text Labels */}
            <motion.div
                className="absolute top-10 left-10 bg-purple-900/30 backdrop-blur-md border border-purple-500/30 rounded-xl px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Neural Network Active
                </div>
                <div className="text-[10px] text-purple-400 font-mono">
                    Processing: 1.2M nodes/sec
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-10 bg-indigo-900/30 backdrop-blur-md border border-indigo-500/30 rounded-xl px-4 py-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
            >
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    AI Learning Engine
                </div>
                <div className="text-[10px] text-indigo-400 font-mono">
                    Accuracy: 99.8%
                </div>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl" />
        </div>
    );
}
