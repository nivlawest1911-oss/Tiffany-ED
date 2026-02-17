'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic Particle Background
 * Creates rising gold embers for a premium Regal aesthetic.
 */
export const ParticleBackground = ({ count = 20, color = "bg-noble-gold/20" }: { count?: number, color?: string }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(count)].map((_, i) => (
            <motion.div
                key={i}
                className={`absolute w-1 h-1 ${color} rounded-full`}
                initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0
                }}
                animate={{
                    y: [null, "-100%"],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5
                }}
            />
        ))}
    </div>
);

/**
 * Cinematic Glass Card
 * High-fidelity glassmorphism with smooth entrance animation.
 */
export const GlassCard = ({
    children,
    className = "",
    delay = 0,
    hover = true
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={hover ? { y: -5 } : {}}
        className={`glass-panel-premium rounded-3xl overflow-hidden transition-all duration-500 ${className}`}
    >
        {children}
    </motion.div>
);

/**
 * Cinematic Header Accent
 * Subtle pulse for section headers.
 */
export const HeaderAccent = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-1 bg-noble-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">{text}</h3>
    </div>
);
