'use client';

import { motion } from 'framer-motion';

interface SovereignPulseProps {
    isSpeaking?: boolean;
    isActive?: boolean;
}

export default function SovereignPulse({ isSpeaking = false, isActive = true }: SovereignPulseProps) {
    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            {/* Outer Atmospheric Ring */}
            <motion.div
                animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
                    opacity: isActive ? [0.1, 0.2, 0.1] : 0.05,
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-full h-full rounded-full border border-amber-500/20"
            />

            {/* Neural Frequency Rings */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        scale: isSpeaking ? [1, 1.5, 1] : [1, 1.1, 1],
                        opacity: isSpeaking ? [0.2, 0, 0.2] : [0.1, 0.05, 0.1],
                    }}
                    transition={{
                        duration: isSpeaking ? 1.5 : 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                    className="absolute w-3/4 h-3/4 rounded-full border border-emerald-500/30"
                />
            ))}

            {/* The Core Nucleus */}
            <motion.div
                animate={{
                    scale: isSpeaking ? [1, 1.1, 1] : 1,
                    rotate: isActive ? 360 : 0,
                }}
                transition={{
                    scale: { duration: 0.5, repeat: Infinity },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
                className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-600 to-emerald-600 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.2)] overflow-hidden"
            >
                {/* Geometric Lattice overlay */}
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]" />

                {/* Inner Glow */}
                <div className="w-12 h-12 rounded-full bg-white/20 blur-xl" />

                {/* Sovereign Icon (Simplified) */}
                <div className="w-4 h-4 rounded-full border-2 border-white/80 animate-pulse z-10" />
            </motion.div>

            {/* Orbiting Particles */}
            {isActive && [...Array(4)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-full h-full"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    />
                </motion.div>
            ))}
        </div>
    );
}
