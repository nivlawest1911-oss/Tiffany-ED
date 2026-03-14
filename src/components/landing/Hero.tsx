'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import Link from 'next/link';
import EdIntelLogo from '../EdIntelLogo';
import { useState } from 'react';

export default function Hero() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-black">
            {/* Holographic Background Grid */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,179,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '100px 100px',
                    }}
                />

                {/* Cinematic Video Background */}
                <video
                    src="/videos/edintel_ad_strategic_engine.mp4"
                    className="w-full h-full object-cover opacity-15"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Aurora Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black opacity-70" />

                {/* Spotlight Effects */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#FFB300]/10 rounded-full blur-[120px] pointer-events-none"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        >
                            <Sparkles size={14} className="text-[#FFB300]" />
                            <span className="text-sm font-black text-[#FFB300] uppercase tracking-[0.2em]">EdIntel v4.1 Omega</span>
                        </motion.div>

                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex lg:flex-col gap-6 items-center lg:items-start"
                        >
                            <div className="transform lg:scale-100 scale-75">
                                <EdIntelLogo variant="fidelity" showText={false} animated={true} />
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1] uppercase"
                        >
                            The Operating Layer <br className="hidden lg:block" />
                            <span className="bg-gradient-to-r from-[#FFB300] via-amber-400 to-[#FF8F00] bg-clip-text text-transparent">
                                for Education.
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg text-zinc-400 max-w-xl leading-relaxed"
                        >
                            EdIntel replaces guesswork with insight. Track performance, funding, and safety across your entire district in one unified, intelligent dashboard.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-0"
                        >
                            <Link href="/login">
                                <button className="relative px-8 py-4 bg-gradient-to-r from-[#FFB300] via-amber-400 to-[#FF8F00] text-black rounded-xl font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(255,179,0,0.5)] transition-all hover:scale-105 active:scale-95 overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative z-10 flex items-center gap-2 justify-center">
                                        Initiate Access
                                        <Sparkles size={16} />
                                    </span>
                                </button>
                            </Link>
                            <button
                                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                                className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-bold hover:bg-white/15 hover:border-[#FFB300]/60 hover:shadow-[0_0_30px_rgba(255,179,0,0.2)] transition-all backdrop-blur-sm flex items-center gap-2 justify-center group"
                            >
                                <Play size={16} className="group-hover:text-[#FFB300] transition-colors" />
                                View Demo
                            </button>
                        </motion.div>
                    </div>

                    {/* Right - Video Demo or Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden lg:flex justify-center relative h-[600px]"
                    >
                        {/* Glassmorphic Container */}
                        <div className="relative w-full max-w-md h-full">
                            {/* Glow Ring */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-b from-[#FFB300]/40 to-[#00E5FF]/30 shadow-[0_0_40px_rgba(255,179,0,0.3), 0_0_40px_rgba(0,229,255,0.2)]" />

                            {/* Glass Panel */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-xl overflow-hidden border border-white/20">
                                {/* Scan Lines */}
                                <div
                                    className="absolute inset-0 opacity-20 pointer-events-none"
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.1) 2px, rgba(0, 229, 255, 0.1) 4px)',
                                    }}
                                />

                                {/* Content */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {isVideoPlaying ? (
                                        <video
                                            src="/videos/ai-companion-hub.mp4"
                                            className="w-full h-full object-cover rounded-2xl"
                                            autoPlay
                                            controls
                                            playsInline
                                        />
                                    ) : (
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                                            onClick={() => setIsVideoPlaying(true)}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB300]/20 to-[#00E5FF]/20" />
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#FFB300] to-[#FF8F00] shadow-[0_0_40px_rgba(255,179,0,0.5)] group-hover:shadow-[0_0_60px_rgba(255,179,0,0.7)] transition-shadow"
                                            >
                                                <Play size={32} className="text-black fill-black ml-1" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FFB300]/60" />
                                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]/60" />
                                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00E5FF]/60" />
                                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FFB300]/60" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFB300]/50 to-transparent z-10"
            />
        </section>
    );
}
