'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';

interface EdIntelSovereignLogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
}

/**
 * High-Fidelity EdIntel Logo with 3D Parallax and Holographic effects.
 * Formerly known as SovereignLogo, now unified under the EdIntel brand.
 */
export default function EdIntelSovereignLogo({
    className = "",
    size = 120,
    showText = true
}: EdIntelSovereignLogoProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse Parallax Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
        >
            <motion.div
                style={{
                    perspective: 1000,
                    rotateX,
                    rotateY,
                }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                className="relative group cursor-pointer"
            >
                {/* Background Glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.6 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    className="absolute inset-0 bg-noble-gold/20 blur-2xl rounded-full"
                />

                {/* Primary Logo Image */}
                <div className="relative z-10 bg-white p-4 rounded-[40px] shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/20">
                    <Image
                        src="/assets/images/Edintellogo.png"
                        alt="EdIntel Logo"
                        width={size}
                        height={size}
                        className="drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] filter contrast-125 mix-blend-multiply"
                        priority
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Holographic Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 z-20 overflow-hidden rounded-full pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                        <motion.div
                            animate={{
                                x: ['-200%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />
                    </motion.div>

                    {/* Pulse Ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -inset-4 border border-noble-gold/20 rounded-full z-0"
                    />
                </div>
            </motion.div>

            {showText && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center leading-none mt-2"
                >
                    <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-[0.35em] uppercase mb-2">
                        EdIntel
                    </span>
                    <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-noble-gold to-transparent mb-2 opacity-80" />
                    <span className="text-xs font-black text-noble-gold uppercase tracking-[0.6em]">
                        EdIntel Intelligence
                    </span>
                </motion.div>
            )}
        </div>
    );
}
