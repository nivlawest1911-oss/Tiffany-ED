'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, MouseEvent, useEffect } from 'react';

interface LogoProps {
    className?: string;
    animated?: boolean;
    variant?: "classic" | "fidelity" | "sovereign-fidelity" | "geometric" | "transcend" | "orbital";
    size?: number;
    showText?: boolean;
}

export default function EdIntelLogo({
    className = "",
    animated = true,
    variant = "transcend",
    size = 40,
    showText = true
}: LogoProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Mouse Parallax for High-Fidelity variants
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 200 };
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

    if (!isMounted) return null;

    if (variant === "orbital") {
        return (
            <div className={`logo-sizer relative flex items-center justify-center ${className}`} style={{ "--logo-size": `${size}px` } as React.CSSProperties}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-noble-gold/20 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-1.5 border border-cyan-500/20 rounded-full border-dashed"
                />
                <div className="relative z-10 w-3 h-3 bg-noble-gold rounded-full shadow-[0_0_15px_#D4AF37]" />
            </div>
        );
    }

    if (variant === "geometric") {
        return (
            <div
                className={`relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-[#0c0c0c] to-black border border-white/5 shadow-2xl ${className}`}
                style={{ "--logo-geo-size": `${size * 1.5}px` } as React.CSSProperties}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full text-noble-gold">
                    <motion.rect
                        x="20" y="20" width="60" height="60"
                        stroke="currentColor" strokeWidth="2" fill="none"
                        animate={{ rotate: [0, 90, 180, 270, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M50 10 L90 90 L10 90 Z"
                        stroke="currentColor" strokeWidth="1" fill="none"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <circle cx="50" cy="50" r="4" fill="white" />
                </svg>
            </div>
        );
    }

    if (variant === "transcend") {
        return (
            <motion.div
                className={`relative flex items-center gap-4 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="logo-sizer relative" style={{ "--logo-size": `${size}px` } as React.CSSProperties}>
                    {/* Atmospheric Glow */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 bg-noble-gold/20 blur-2xl rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Ring 1: Noble Gold Orbit */}
                    <motion.div
                        animate={animated ? { rotate: 360 } : {}}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[1.5px] border-noble-gold/40 rounded-full"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-noble-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                    </motion.div>

                    {/* Ring 2: Inner Technical Dash */}
                    <motion.div
                        animate={animated ? { rotate: -360 } : {}}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[4px] border border-white/10 rounded-full border-dashed"
                    />

                    {/* Core: Sovereign Shield Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-noble-gold/10 to-transparent rounded-full backdrop-blur-sm">
                        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 text-noble-gold fill-current">
                            <path d="M50 15 L85 30 L85 60 C85 75 70 85 50 90 C30 85 15 75 15 60 L15 30 L50 15 Z" />
                        </svg>
                    </div>
                </div>

                {showText && (
                    <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        className="flex flex-col leading-none"
                    >
                        <span className="text-xl font-black text-white tracking-[0.2em] uppercase">EdIntel</span>
                        <div className="h-[1px] w-full bg-gradient-to-r from-noble-gold/60 to-transparent mt-1" />
                        <span className="text-[0.6rem] font-bold text-noble-gold/80 uppercase tracking-[0.4em] mt-1">Sovereign OS</span>
                    </motion.div>
                )}
            </motion.div>
        );
    }

    if (variant === "fidelity" || variant === "sovereign-fidelity") {
        const isSovereign = variant === "sovereign-fidelity";
        return (
            <div
                className={`flex flex-col items-center justify-center gap-4 ${className}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setIsHovered(true)}
            >
                <motion.div
                    style={{ perspective: 1000, rotateX, rotateY }}
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    className="relative group cursor-pointer"
                >
                    <motion.div
                        animate={{ opacity: isHovered ? 0.6 : 0.3, scale: isHovered ? 1.2 : 1 }}
                        className="absolute inset-0 bg-noble-gold/20 blur-2xl rounded-full"
                    />
                    <div className="relative z-10 bg-black/40 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
                        <Image
                            src={isSovereign ? "/images/branding/edintel_logo_sovereign.png" : "/assets/images/Edintellogo.png"}
                            alt="EdIntel Logo"
                            width={size || 120}
                            height={size || 120}
                            className="drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] filter contrast-125"
                            priority
                        />
                        <motion.div
                            className="absolute inset-0 z-20 overflow-hidden rounded-3xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                        >
                            <motion.div
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                        </motion.div>
                    </div>
                </motion.div>
                {showText && (
                    <div className="flex flex-col items-center leading-none">
                        <span className="text-2xl font-black text-white tracking-[0.3em] uppercase mb-1">EdIntel</span>
                        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-noble-gold to-transparent mb-1 opacity-50" />
                        <span className="text-[10px] font-bold text-noble-gold uppercase tracking-[0.5em]">
                            {isSovereign ? "Sovereign OS" : "Intelligence Systems"}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    // Classic/Default fallback
    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] overflow-visible">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D4AF37" /><stop offset="100%" stopColor="#8A6B0E" />
                        </linearGradient>
                    </defs>
                    <motion.circle cx="50" cy="50" r="45" stroke="url(#logoGradient)" strokeWidth="1" fill="none" strokeDasharray="10 5" opacity="0.3" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
                    <motion.path d="M50 10 L85 27 L85 73 L50 90 L15 73 L15 27 Z" fill="none" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinejoin="round" />
                    <motion.path d="M50 25 V75 M30 45 L50 65 L70 45" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {showText && (
                <div className="flex flex-col leading-none pointer-events-none">
                    <span className="text-xl font-black text-white tracking-tight">EdIntel</span>
                    <span className="text-[0.6rem] font-bold text-noble-gold/60 uppercase tracking-widest">Sovereign Delegate</span>
                </div>
            )}
        </div>
    );
}
