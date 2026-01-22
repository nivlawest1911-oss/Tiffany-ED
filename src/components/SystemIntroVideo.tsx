'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Shield, Globe, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E`;

export default function SystemIntroVideo({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const phases = [
            setTimeout(() => setPhase(1), 1000), // Logo Stroke
            setTimeout(() => setPhase(2), 2500), // Fill & Glow
            setTimeout(() => setPhase(3), 3500), // Text Reveal
            setTimeout(() => setPhase(4), 4500), // Fade Out
            setTimeout(onComplete, 5500)
        ];
        return () => phases.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0, duration: 1 }}
        >
            {/* Background Neural Noise */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-repeat opacity-30 animate-grain" style={{ backgroundImage: `url("${NOISE_SVG}")` }} />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* LOGO ANIMATION */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8">
                    {/* Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-transparent"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 rounded-full border border-purple-500/30 border-b-transparent"
                    />

                    {/* Central Icon Morph */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                        >
                            <Brain size={64} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                        </motion.div>
                    </div>

                    {/* Particle Explosion */}
                    {phase === 2 && (
                        <>
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full"
                                    initial={{ x: 0, y: 0, opacity: 1 }}
                                    animate={{
                                        x: (Math.random() - 0.5) * 200,
                                        y: (Math.random() - 0.5) * 200,
                                        opacity: 0
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* TEXT REVEAL */}
                <div className="overflow-hidden h-20 flex flex-col items-center">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: phase >= 3 ? 0 : 50, opacity: phase >= 3 ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500"
                    >
                        ED.INTEL
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 3 ? 1 : 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 flex items-center gap-3 text-xs md:text-sm font-mono text-cyan-500 tracking-[0.5em] uppercase"
                >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    Sovereign Intelligence
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                </motion.div>
            </div>

            {/* Cinematic Letterbox Bars */}
            <motion.div
                initial={{ height: "50vh" }}
                animate={{ height: "0vh" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 right-0 bg-black z-50"
            />
            <motion.div
                initial={{ height: "50vh" }}
                animate={{ height: "0vh" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 right-0 bg-black z-50"
            />

        </motion.div>
    );
}
