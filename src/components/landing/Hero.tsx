'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import EdIntelLogo from '../EdIntelLogo';

export default function Hero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden">
            {/* Spotlight Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                    <Sparkles size={14} className="text-blue-400" />
                    <span className="text-sm font-medium text-foreground/80">New Feature</span>
                </motion.div>

                {/* Logo & Headline */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 scale-150"
                    >
                        <EdIntelLogo />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-gradient-main"
                    >
                        Data-Driven Decisions for Modern Schools.
                    </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                    EdIntel replaces guesswork with insight. Track performance, funding, and safety in one unified dashboard.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                >
                    <Link href="/login">
                        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all">
                            Get Started Free
                        </button>
                    </Link>
                    <Link href="/#how-it-works">
                        <button className="px-8 py-4 glass-panel rounded-xl font-bold hover:bg-white/10 transition-all">
                            View Demo
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
