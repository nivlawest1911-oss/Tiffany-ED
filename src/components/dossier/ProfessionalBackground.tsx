'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function StrategicConnections() {
    const [paths, setPaths] = useState<Array<{ d: string, duration: number, delay: number }>>([]);

    useEffect(() => {
        setPaths(Array(10).fill(0).map(() => ({
            d: `M ${Math.random() * 100} ${Math.random() * 100} L ${Math.random() * 100} ${Math.random() * 100}`,
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 10
        })));
    }, []);

    return (
        <>
            {paths.map((p, i) => (
                <motion.path
                    key={i}
                    d={p.d}
                    stroke="url(#line-grad)"
                    strokeWidth="0.2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.5, 0],
                        transition: {
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: p.delay
                        }
                    }}
                />
            ))}
        </>
    );
}

export default function ProfessionalBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Ambient Atmosphere */}
            <div className="absolute inset-0 bg-[#030303]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.05)_0%,transparent_50%)]" />

            {/* Strategic Connections (Animated Lines) - Using raw coordinates and viewBox */}
            <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <StrategicConnections />
            </svg>

            {/* Floating Strategic Centers */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.5, 1],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
}
