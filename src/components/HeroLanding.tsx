'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroLandingProps {
    onScrollToContent?: () => void;
    onInitialize?: () => void;
}

export function HeroLanding({ onScrollToContent, onInitialize }: HeroLandingProps) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
            {/* Main Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-6xl mx-auto"
            >
                {/* Overline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-8 flex items-center justify-center gap-3"
                >
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-noble-gold to-transparent" />
                    <span className="text-[10px] md:text-xs font-black text-noble-gold uppercase tracking-[0.3em]">
                        EdIntel Operating System
                    </span>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-noble-gold to-transparent" />
                </motion.div>

                {/* Main Title - Massive Typography */}
                <motion.h1
                    className="text-[80px] md:text-[120px] lg:text-[140px] font-black leading-[0.9] mb-12 tracking-tight"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="block bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent"
                    >
                        EdIntel
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="block bg-gradient-to-br from-noble-gold via-noble-gold to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]"
                    >
                        EdIntel
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg md:text-xl lg:text-2xl text-white/60 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    Orchestrate your educational ecosystem with AI-powered delegates,
                    real-time intelligence, and EdIntel-grade security protocols.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={onInitialize}
                        className="group relative px-8 py-4 bg-noble-gold/10 hover:bg-noble-gold/20 border border-noble-gold/40 hover:border-noble-gold rounded-2xl transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-noble-gold/0 via-noble-gold/10 to-noble-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative text-sm md:text-base font-black text-white uppercase tracking-wider flex items-center gap-3">
                            Initialize Command Center
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </span>
                    </button>

                    <button
                        onClick={onScrollToContent}
                        className="px-8 py-4 text-sm md:text-base font-bold text-white/60 hover:text-white transition-colors duration-300 uppercase tracking-wider"
                    >
                        Explore Features
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
                onClick={onScrollToContent}
            >
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-noble-gold rounded-full"
                    />
                </motion.div>
                <ChevronDown className="w-4 h-4 text-white/20 animate-pulse" />
            </motion.div>

            {/* Ambient Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-noble-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
}
