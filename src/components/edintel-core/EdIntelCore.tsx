'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Activity, Brain, Network } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EdIntelCore() {
    const [rotation, setRotation] = useState(0);
    const [pulseIntensity, setPulseIntensity] = useState(0);

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360);
        }, 16);

        const pulseInterval = setInterval(() => {
            setPulseIntensity(prev => (prev + 1) % 100);
        }, 50);

        return () => {
            clearInterval(rotationInterval);
            clearInterval(pulseInterval);
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-black via-blue-950/20 to-black overflow-hidden">
            {/* The Grid - Server Room Background */}
            <div className="absolute inset-0">
                {/* Tangled Blue Wires - Data Network */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    {[...Array(20)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M ${Math.random() * 100}% ${Math.random() * 100}% Q ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%`}
                            stroke="url(#blueGradient)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                                pathLength: { duration: 3, delay: i * 0.1 },
                                opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                            }}
                        />
                    ))}
                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* The EdIntel Core - Central Crystalline Engine */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                {/* Outer Glow Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-500/30"
                        style={{
                            width: `${300 + i * 100}px`,
                            height: `${300 + i * 100}px`,
                        }}
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                            rotate: rotation * (i % 2 === 0 ? 1 : -1)
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Gold Pulse Ripple */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20"
                    animate={{
                        scale: [0, 3],
                        opacity: [0.8, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                    style={{
                        width: '200px',
                        height: '200px',
                        filter: 'blur(20px)'
                    }}
                />

                {/* Crystalline Core - Rotating Geometric Shape */}
                <motion.div
                    className="relative w-64 h-64"
                    animate={{ rotate: rotation }}
                    transition={{ duration: 0.016, ease: "linear" }}
                >
                    {/* Shield Shape with "A" Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                            {/* Metallic Shield Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 rounded-lg transform rotate-45 shadow-2xl border-4 border-amber-500/50">
                                {/* Inner Glow */}
                                <div className="absolute inset-2 bg-gradient-to-br from-amber-500/20 to-transparent rounded-lg" />
                            </div>

                            {/* "A" Icon - EdIntel Logo */}
                            <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                                <Shield className="w-24 h-24 text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]" />
                            </div>

                            {/* Rotating Energy Particles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-amber-400 rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                    }}
                                    animate={{
                                        x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                                        y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                                        opacity: [1, 0],
                                        scale: [1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.25,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Data Flow Indicators */}
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex gap-8">
                    {[
                        { icon: Brain, label: 'Neural Processing', color: 'text-blue-400' },
                        { icon: Lock, label: 'EdIntel Security', color: 'text-amber-400' },
                        { icon: Network, label: 'Data Integration', color: 'text-emerald-400' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.2 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="relative">
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                                <motion.div
                                    className={`absolute inset-0 ${item.color.replace('text-', 'bg-')} rounded-full blur-xl`}
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Title Overlay */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20"
            >
                <h2 className="text-5xl font-black text-white mb-2 tracking-tight drop-shadow-2xl">
                    EdIntel <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">EdIntel</span>
                </h2>
                <p className="text-sm text-zinc-400 uppercase tracking-[0.3em] font-bold">
                    AI Core • Activated
                </p>
            </motion.div>

            {/* Status Bar */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-4 z-20"
            >
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <span className="text-xs text-zinc-300 font-bold">System Active</span>
                    </div>
                    <div className="w-px h-6 bg-white/20" />
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        <span className="text-xs text-zinc-300 font-bold">Processing: {Math.round(pulseIntensity)}%</span>
                    </div>
                    <div className="w-px h-6 bg-white/20" />
                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-zinc-300 font-bold">Secure</span>
                    </div>
                </div>
            </motion.div>

            {/* Ambient Lighting Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />
            </div>
        </div>
    );
}
