'use client';

/**
 * EdIntel EdIntel - Payment Success Page Client
 * Celebrates successful payment with high-fidelity protocol visuals
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight, Download, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessClient() {
    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        // Start confetti on mount (client-side only)
        setConfetti(true);
        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* EdIntel Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
                <motion.div
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-full h-px bg-white shadow-[0_0_10px_white]"
                />
            </div>

            {/* Confetti Effect */}
            {confetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                            animate={{
                                y: window.innerHeight + 100,
                                rotate: Math.random() * 360,
                                opacity: 0,
                            }}
                            transition={{
                                duration: Math.random() * 2 + 3,
                                ease: 'linear',
                            }}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ['#D4AF37', '#71717A', '#FFFFFF', '#A1A1AA', '#52525B'][Math.floor(Math.random() * 5)],
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full relative z-10"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-noble-gold rounded-full blur-3xl opacity-20 animate-pulse" />
                        <CheckCircle className="w-32 h-32 text-noble-gold relative shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">
                        Access <span className="text-noble-gold italic">Granted</span>
                    </h1>
                    <p className="text-xl font-black text-noble-gold uppercase tracking-widest mb-2">
                        Welcome to the EdIntel Network
                    </p>
                    <p className="text-white/40 text-sm font-medium">
                        Your neural protocols have been updated and all premium tiers are now unlocked.
                    </p>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-zinc-800 pb-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-noble-gold/10 border border-noble-gold/20 rounded-xl mb-3">
                                <Mail className="w-6 h-6 text-noble-gold" />
                            </div>
                            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Protocol Confirmation</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-tight">Sent to communication node</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-noble-gold/10 border border-noble-gold/20 rounded-xl mb-3">
                                <Download className="w-6 h-6 text-noble-gold" />
                            </div>
                            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Data Ledger</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-tight">Available in Command Center</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-noble-gold/10 border border-noble-gold/20 rounded-xl mb-3">
                                <Calendar className="w-6 h-6 text-noble-gold" />
                            </div>
                            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Cycle Reset</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-tight">Next cycle in 30 solar days</p>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div>
                        <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Strategic Next Steps
                        </h3>

                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:bg-zinc-700 transition-all group"
                            >
                                <div className="text-left">
                                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">EdIntel Dashboard</h4>
                                    <p className="text-[10px] text-white/40 uppercase">Access all high-tier AI nodes and protocols</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-noble-gold group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/gemini-workspace"
                                className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:bg-zinc-700 transition-all group"
                            >
                                <div className="text-left">
                                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Neural Sync</h4>
                                    <p className="text-[10px] text-white/40 uppercase">Synchronize content with Gemini Workspace</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-noble-gold group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/huggingface"
                                className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:bg-zinc-700 transition-all group"
                            >
                                <div className="text-left">
                                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Synthesis Studio</h4>
                                    <p className="text-[10px] text-white/40 uppercase">Execute complex multi-modal generations</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-noble-gold group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-noble-gold text-black rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:scale-105 transition-all"
                    >
                        <Sparkles className="w-5 h-5" />
                        Initiate Activation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
