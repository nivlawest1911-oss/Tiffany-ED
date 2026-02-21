"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GenerativeBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 overflow-hidden bg-gray-50"
        >
            {/* Moving Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ y: y1 }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-primary-500/10 to-secondary-500/10 blur-[100px]"
            />

            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ y: y2, rotate }}
                className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-secondary-500/10 to-primary-500/10 blur-[120px]"
            />

            {/* Grid Pattern with Holographic Feel */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Noise Texture for High-Fidelity Look */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none contrast-150 brightness-100"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Vignette for Focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
        </div>
    );
};

export default GenerativeBackground;
