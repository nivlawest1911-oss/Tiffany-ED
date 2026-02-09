'use client';

/**
 * EdIntel SOVEREIGN - Payment Cancelled Page Client
 * Handles cancelled payments with high-fidelity protocol visuals
 */

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, HelpCircle, MessageCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelClient() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Sovereign Background elements */}
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

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full relative z-10"
            >
                {/* Cancel Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-600 rounded-full blur-3xl opacity-10" />
                        <XCircle className="w-32 h-32 text-zinc-700 relative" />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">
                        Sync <span className="text-white/20">Interrupted</span>
                    </h1>
                    <p className="text-xl font-bold text-white/60 mb-2">
                        Transmissions Halted
                    </p>
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                        Your request was aborted. No credits were deducted.
                    </p>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 mb-8"
                >
                    <h3 className="text-xs font-black text-noble-gold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Protocol Support
                    </h3>

                    <div className="space-y-4 mb-8">
                        <div className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                            <h4 className="font-bold text-white mb-1 uppercase text-xs tracking-wider">Channel Interference?</h4>
                            <p className="text-sm text-white/40">
                                If you encountered technical latency during checkout, please verify your credentials or attempt an alternate transmission channel.
                            </p>
                        </div>

                        <div className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                            <h4 className="font-bold text-white mb-1 uppercase text-xs tracking-wider">Strategic Deployment?</h4>
                            <p className="text-sm text-white/40">
                                Sovereign Network access is available via both annual and lifecycle subscriptions. Review our deployment tiers for details.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/payment"
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-noble-gold text-black rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry Protocol
                        </Link>

                        <Link
                            href="/support"
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 text-white border border-zinc-700 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-zinc-700 transition-all"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Open Comm Link
                        </Link>
                    </div>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-noble-gold transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Abort to Pricing
                    </Link>

                    <div className="hidden sm:block w-px h-4 bg-zinc-800" />

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        Return to Command
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
