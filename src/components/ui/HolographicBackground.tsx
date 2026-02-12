'use client';

import { motion } from 'framer-motion';
import React from 'react';

export const HolographicBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#020617]">
            {/* Mesh Gradient Base */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/40 blur-[120px] rounded-full animate-aurora-1" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/30 blur-[120px] rounded-full animate-aurora-2" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-noble-gold/10 blur-[100px] rounded-full animate-aurora-3" />
            </div>

            {/* Animated Grid System */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Floating Neural Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-noble-gold/20 rounded-full"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.5
                        }}
                        animate={{
                            y: [null, "-20%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 scanline opacity-[0.03] pointer-events-none" />

            {/* Diffraction Flares */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-noble-gold/20 to-transparent" />
        </div>
    );
};
