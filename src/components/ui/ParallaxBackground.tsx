'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="absolute inset-0 z-[-1] overflow-hidden bg-black">
            {/* Deep Space Layer */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 bg-[url('/images/bg/stars-deep.png')] bg-repeat opacity-20"
            />

            {/* Nebula Layer */}
            <motion.div
                style={{ y: y2, opacity }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-noble-navy/20 to-black pointer-events-none"
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-intel-gold/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-noble-gold/5 rounded-full blur-[180px] animate-pulse delay-1000" />
            </motion.div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc fillPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyNXYxaC0yNXYtMXptMCAxaC0zNXYtMWgzNXYxem0wIDV2MjVoLTF2LTI1aDF6bTAgMXYtMzVoMXYzNWgtMXoiIGZpbGw9InJnYmEoMjQwLCAxOTAsIDQwLCAwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20" />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
    );
}
