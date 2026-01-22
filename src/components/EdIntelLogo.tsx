'use client';

import { motion } from 'framer-motion';

export default function EdIntelLogo({ className = "", animated = true }: { className?: string, animated?: boolean }) {
    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Outer Ring / Shield */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500 overflow-visible">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#4f46e5" />
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
                        fill="#a5b4fc"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>

                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            <div className="flex flex-col leading-none select-none">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-indigo-100 transition-colors">
                    EdIntel
                </span>
                <span className="text-[0.6rem] font-bold text-indigo-400 uppercase tracking-[0.2em]">
                    Professional
                </span>
            </div>
        </div>
    );
}
