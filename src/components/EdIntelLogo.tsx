'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import EdIntelSovereignLogo from './EdIntelSovereignLogo';

export default function EdIntelLogo({
    className = "",
    animated = true,
    variant = "classic"
}: {
    className?: string,
    animated?: boolean,
    variant?: "classic" | "fidelity" | "sovereign-fidelity"
}) {
    if (variant === "fidelity") {
        return <EdIntelSovereignLogo className={className} size={40} showText={false} />;
    }

    if (variant === "sovereign-fidelity") {
        return (
            <div className={`flex items-center gap-4 group ${className}`}>
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-noble-gold/20 blur-xl rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <Image
                        src="/images/branding/edintel_logo_sovereign.png"
                        alt="EdIntel Sovereign"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain relative z-10"
                    />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-2xl font-black text-white tracking-tighter">
                        EdIntel
                    </span>
                    <span className="text-[0.6rem] font-bold text-noble-gold uppercase tracking-[0.4em]">
                        Sovereign OS
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Outer Ring / Shield */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] overflow-visible">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D4AF37" />
                            <stop offset="100%" stopColor="#8A6B0E" />
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Rotating Ring Pulse */}
                    {animated && (
                        <motion.circle
                            cx="50" cy="50" r="45"
                            stroke="url(#logoGradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="10 10"
                            opacity="0.3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    )}

                    {/* Core Hex/Shield Shape */}
                    <motion.path
                        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                        fill="none"
                        stroke="url(#logoGradient)"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Internal Brain/Circuit Logic */}
                    <motion.path
                        d="M35 50 L50 35 L65 50 M50 35 L50 65 M35 65 L50 65 L65 65"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    />

                    {/* Professional Dot */}
                    <motion.circle
                        cx="50" cy="20" r="3"
                        fill="#FFD700"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>

                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            <div className="flex flex-col leading-none select-none">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-amber-100 transition-colors">
                    EdIntel
                </span>
                <span className="text-[0.6rem] font-bold text-noble-gold uppercase tracking-[0.2em]">
                    EdIntel OS
                </span>
            </div>
        </div>
    );
}
