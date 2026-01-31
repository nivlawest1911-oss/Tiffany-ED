'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, BookOpen, Lock } from 'lucide-react';

export function DueProcessShield() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex flex-col bg-zinc-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 shadow-2xl relative overflow-hidden group max-w-sm"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-8 -mt-8" />

            <div className="flex items-start gap-4 h-full relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <Shield className="text-emerald-500 w-6 h-6 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <AlertCircle className="absolute -top-1 -right-1 text-emerald-500 w-4 h-4 bg-zinc-950 rounded-full" size={14} />
                </div>

                <div className="flex-1">
                    <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">
                        Due Process Shield Active
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-bold leading-tight uppercase tracking-wider mb-3">
                        Session ID #9921 monitored for <span className="text-white">AL Code 290-8-9</span> compliance.
                    </p>

                    <div className="flex gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[8px] font-black text-zinc-500 uppercase tracking-widest hover:border-zinc-700 hover:text-white transition-all cursor-help italic">
                            <BookOpen size={10} />
                            Mastering the Maze p. 42
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[8px] font-black text-zinc-500 uppercase tracking-widest hover:border-zinc-700 hover:text-white transition-all cursor-help italic">
                            <Lock size={10} />
                            PII Redaction: ON
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function StatutoryDisclaimer() {
    return (
        <footer className="w-full bg-black/40 border-t border-white/5 py-8 px-12 mt-auto">
            <div className="max-w-7xl mx-auto flex items-start gap-6">
                <AlertCircle className="text-red-500 shrink-0 mt-1" size={24} />
                <div>
                    <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">
                        STATUTORY DISCLAIMER
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase tracking-wider italic">
                        <span className="text-white">EdIntel Professional</span> is an executive intelligence amplification system, not a licensed medical or legal entity. Outputs generated regarding IEPs, behavior intervention plans, or psychological profiles are for <span className="text-noble-gold">informational and strategic purposes only</span>. This system does not provide medical diagnoses, legal counsel, or binding regulatory advice. Always consult with a certified school psychologist, licensed attorney, or appropriate medical professional before finalizing binding educational contracts.
                    </p>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] italic">
                    &copy; 2026 SOVEREIGN OS &bull; SYSTEM PROTOCOL 5.1.0
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] italic">MAINNET ONLINE</span>
                </div>
            </div>
        </footer>
    );
}
