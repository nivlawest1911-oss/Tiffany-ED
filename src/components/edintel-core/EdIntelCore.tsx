import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Lock, Brain, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EdIntelCoreProps {
    phase?: 'grid' | 'activation' | 'ready';
    className?: string;
}

export default function EdIntelCore({ phase = 'ready', className = "" }: EdIntelCoreProps) {
    const [rotation, setRotation] = useState(0);
    const [pulseIntensity, setPulseIntensity] = useState(0);

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setRotation(prev => (prev + (phase === 'grid' ? 2 : 0.5)) % 360);
        }, 16);

        const pulseInterval = setInterval(() => {
            // Intensive pulsing during grid phase
            setPulseIntensity(phase === 'grid' ? (Math.sin(Date.now() / 200) * 50 + 50) : (Math.sin(Date.now() / 1000) * 50 + 50));
        }, 50);

        return () => {
            clearInterval(rotationInterval);
            clearInterval(pulseInterval);
        };
    }, [phase]);

    return (
        <div
            className={cn("relative w-full h-full min-h-[600px] bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden flex items-center justify-center", className)}
            style={{ filter: `contrast(${100 + pulseIntensity}%)` }}
        >
            <AnimatePresence mode="wait">
                {/* Scene 1: The Grid (Chaos) */}
                {phase === 'grid' && (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        {/* Tangled Blue Wires - Data Network */}
                        <svg className="absolute inset-0 w-full h-full">
                            {[...Array(40)].map((_, i) => (
                                <motion.path
                                    key={i}
                                    d={`M ${Math.random() * 100}% ${Math.random() * 100}% Q ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%`}
                                    stroke="#3b82f6"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: [0, 1, 0],
                                        opacity: [0, 0.4, 0],
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 3,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </svg>

                        {/* Chaos Glow Particles */}
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={`part-${i}`}
                                className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[2px]"
                                animate={{
                                    x: [Math.random() * 800 - 400, Math.random() * 800 - 400],
                                    y: [Math.random() * 800 - 400, Math.random() * 800 - 400],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
                            />
                        ))}

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_70%)]" />
                    </motion.div>
                )}

                {/* Scene 2 & 3: The EdIntel Core */}
                {(phase === 'activation' || phase === 'ready') && (
                    <motion.div
                        key="core-container"
                        initial={phase === 'activation' ? { opacity: 0, scale: 0.8 } : {}}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Gold Pulse Layer (Scene 2 Transition) */}
                        {phase === 'activation' && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [1, 5], opacity: [0.8, 0] }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-noble-gold blur-3xl -z-10"
                            />
                        )}

                        {/* The EdIntel Core - Central Crystalline Engine */}
                        <div className="relative">
                            {/* Outer Glow Rings */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-noble-gold/30"
                                    style={{
                                        width: `${300 + i * 100}px`,
                                        height: `${300 + i * 100}px`,
                                    }}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.2, 0.4, 0.2],
                                        rotate: rotation * (i % 2 === 0 ? 0.5 : -0.5)
                                    }}
                                    transition={{
                                        duration: 4 + i,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}

                            {/* Crystalline Core */}
                            <motion.div
                                className="relative w-64 h-64 flex items-center justify-center"
                                animate={{ rotate: rotation }}
                                transition={{ duration: 0.016, ease: "linear" }}
                            >
                                <div className="relative w-48 h-48 group">
                                    {/* Metallic Shield Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 rounded-2xl transform rotate-45 shadow-2xl border-4 border-noble-gold flex items-center justify-center">
                                        <div className="absolute inset-2 bg-gradient-to-br from-noble-gold/20 to-transparent rounded-xl" />
                                        {/* "A" Icon - EdIntel Logo */}
                                        <div className="transform -rotate-45">
                                            <Shield className="w-24 h-24 text-noble-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Energy Particles */}
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-noble-gold rounded-full"
                                        animate={{
                                            x: [0, Math.cos(i * 30 * Math.PI / 180) * 120],
                                            y: [0, Math.sin(i * 30 * Math.PI / 180) * 120],
                                            opacity: [1, 0],
                                            scale: [1, 0]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </motion.div>

                            {/* Data Flow Indicators */}
                            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 flex gap-12">
                                {[
                                    { icon: Brain, label: 'Neural Core', color: 'text-noble-gold' },
                                    { icon: Lock, label: 'Quantum Security', color: 'text-amber-500' },
                                    { icon: Network, label: 'Omni-Channel', color: 'text-emerald-500' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.2 }}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        <div className="relative group">
                                            <item.icon className={cn("w-10 h-10 transition-transform duration-500 group-hover:scale-110", item.color)} />
                                            <motion.div
                                                className={cn("absolute inset-0 rounded-full blur-2xl opacity-40", item.color.replace('text-', 'bg-'))}
                                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none -z-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-noble-gold/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}

