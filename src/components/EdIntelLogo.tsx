'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useState, MouseEvent, useEffect, memo } from 'react';
import { Shield, Sparkles } from 'lucide-react';

const SPRING_CONFIG = { damping: 25, stiffness: 200 };

/** Vector High-Fidelity SVG Emblem for EdIntel */
export const EdIntelVectorEmblem = memo(({ size = 40, className = "" }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] ${className}`}
    >
        <defs>
            <linearGradient id="goldLinearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3C4" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#AA7C11" />
                <stop offset="100%" stopColor="#5B4308" />
            </linearGradient>
            <linearGradient id="cyanAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <radialGradient id="goldGlowRad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="50" cy="50" r="45" fill="url(#goldGlowRad)" />

        {/* Primary Vector Shield Hex Frame */}
        <path
            d="M50 8 L85 25 V55 L50 92 L15 55 V25 Z"
            stroke="url(#goldLinearGrad)"
            strokeWidth="3"
            fill="#050508"
            strokeLinejoin="round"
        />

        {/* Inner Facet Lattice */}
        <path
            d="M50 16 L77 30 V52 L50 84 L23 52 V30 Z"
            fill="url(#goldLinearGrad)"
            fillOpacity="0.15"
            stroke="url(#goldLinearGrad)"
            strokeWidth="1.5"
        />

        {/* Chevron Nodes */}
        <path d="M50 24 L68 35 V46 L50 38 L32 46 V35 Z" fill="url(#goldLinearGrad)" />
        <path d="M50 44 L68 55 L50 76 L32 55 Z" fill="url(#goldLinearGrad)" fillOpacity="0.85" />
        
        {/* Core Intelligence Node */}
        <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" className="animate-pulse" />
        
        {/* Cyber Orbit Grid lines */}
        <path d="M50 20 V80 M20 50 H80" stroke="url(#cyanAccentGrad)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
    </svg>
));

EdIntelVectorEmblem.displayName = 'EdIntelVectorEmblem';

interface LogoProps {
    className?: string;
    animated?: boolean;
    variant?: "classic" | "fidelity" | "sovereign-fidelity" | "geometric" | "transcend" | "orbital";
    size?: number;
    showText?: boolean;
}

export const EdIntelLogo = memo(({
    className = "",
    animated = true,
    variant = "sovereign-fidelity",
    size = 40,
    showText = true
}: LogoProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), SPRING_CONFIG);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), SPRING_CONFIG);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    const isFidelity = variant === "fidelity" || variant === "sovereign-fidelity";
    const isSovereign = variant === "sovereign-fidelity";

    if (!isMounted) return <div className={`logo-placeholder ${className}`} style={{ width: size, height: size }} />;

    if (variant === "orbital") {
        return (
            <motion.div
                className={`logo-sizer relative flex items-center justify-center ${className}`}
                style={{ width: size, height: size }}
            >
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
            </motion.div>
        );
    }

    if (variant === "geometric") {
        return (
            <motion.div
                className={`logo-geo-sizer relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-[#0c0c0c] to-black border border-white/5 shadow-2xl ${className}`}
                style={{ width: size * 1.5, height: size * 1.5 }}
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
            </motion.div>
        );
    }

    if (variant === "transcend") {
        return (
            <motion.div
                className={`relative flex items-center gap-4 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="logo-sizer relative"
                    style={{ width: size, height: size }}
                >
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

                    <motion.div
                        animate={animated ? { rotate: 360 } : {}}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[1.5px] border-noble-gold/40 rounded-full"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-noble-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                    </motion.div>

                    <motion.div
                        animate={animated ? { rotate: -360 } : {}}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[4px] border border-white/10 rounded-full border-dashed"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-noble-gold/10 to-transparent rounded-full backdrop-blur-sm p-1">
                        <EdIntelVectorEmblem size={size * 0.8} />
                    </div>
                </motion.div>

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

    if (isFidelity) {
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
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.5)] ring-1 ring-noble-gold/30 p-2 bg-[#060810]">
                        <EdIntelVectorEmblem size={size || 120} />
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
                    <div className="flex flex-col items-center leading-none mt-2">
                        <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-[0.35em] uppercase mb-2">EdIntel</span>
                        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-noble-gold to-transparent mb-2 opacity-80" />
                        <span className="text-xs font-black text-noble-gold uppercase tracking-[0.6em]">
                            {isSovereign ? "Intelligence in Education" : "Intelligence Systems"}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className="relative flex items-center justify-center">
                <EdIntelVectorEmblem size={size || 40} />
            </div>
            {showText && (
                <div className="flex flex-col leading-none pointer-events-none">
                    <span className="text-xl font-black text-white tracking-tight">EdIntel</span>
                    <span className="text-[0.6rem] font-bold text-noble-gold/60 uppercase tracking-widest">Intelligence in Education</span>
                </div>
            )}
        </div>
    );
});

EdIntelLogo.displayName = 'EdIntelLogo';

export default EdIntelLogo;
