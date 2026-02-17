'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import EdIntelLogo from '../EdIntelLogo';

export default function Hero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden">
            {/* Cinematic Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    src="/videos/edintel_ad_strategic_engine.mp4"
                    className="w-full h-full object-cover opacity-20"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
            </div>

            {/* Spotlight Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
                <div className="w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm"
                >
                    <Sparkles size={14} className="text-[#D4AF37]" />
                    <span className="text-sm font-black text-amber-500 uppercase tracking-widest">EdIntel v4.0</span>
                </motion.div>

                {/* Logo & Headline */}
                <div className="flex flex-col items-center justify-center min-h-[350px] md:min-h-[450px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 origin-center"
                    >
                        <div className="transform scale-[2] md:scale-[3]">
                            <EdIntelLogo variant="fidelity" className="scale-150 mb-4" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[1.1] uppercase"
                    >
                        The Operating Layer <br className="hidden md:block" />
                        <span className="text-[#D4AF37]">for Education.</span>
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
                        <button className="px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95">
                            Initiate Access
                        </button>
                    </Link>
                    <Link href="/#how-it-works">
                        <button className="px-8 py-4 glass-panel-premium rounded-xl font-bold hover:bg-white/10 transition-all">
                            View Demo
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
