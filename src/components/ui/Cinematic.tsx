'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic Particle Background
 * Creates rising gold embers for a premium Regal aesthetic.
 */
export const ParticleBackground = ({ count = 30, color = "bg-intel-gold/20" }: { count?: number, color?: string }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(count)].map((_, i) => {
            const size = Math.random() * 3 + 1;
            return (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${color}`}
                    style={{
                        width: size,
                        height: size,
                        filter: `blur(${size / 2}px) brightness(1.5)`,
                        boxShadow: `0 0 ${size * 2}px ${color.includes('gold') ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.2)'}`,
                        willChange: 'transform'
                    }}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "110%",
                        opacity: 0
                    }}
                    animate={{
                        y: ["110%", "-10%"],
                        x: [
                            (Math.random() * 100) + "%",
                            (Math.random() * 100 + (Math.random() - 0.5) * 5) + "%"
                        ],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 10
                    }}
                />
            );
        })}
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
    hover = true,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
    [key: string]: any;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={hover ? { y: -5 } : {}}
        className={`glass-panel-premium rounded-3xl overflow-hidden transition-all duration-500 ${className}`}
        {...props}
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
