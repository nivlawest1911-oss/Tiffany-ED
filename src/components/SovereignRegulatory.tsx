'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertCircle, Lock, ChevronDown, CheckCircle2 } from 'lucide-react';

interface ShieldProps {
    className?: string;
    compact?: boolean;
    showDetails?: boolean;
}

export function DueProcessShield({ className = "", compact = false, showDetails = false }: ShieldProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // If forced to show details via prop, we respect it, otherwise manage internal state
    const effectiveExpanded = showDetails || isExpanded;

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col bg-zinc-950/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${compact ? 'w-full' : 'max-w-sm'} ${className}`}
            onMouseEnter={() => !showDetails && setIsExpanded(true)}
            onMouseLeave={() => !showDetails && setIsExpanded(false)}
        >
            <div className={`flex items-center gap-3 p-3 cursor-help relative z-10 ${effectiveExpanded ? 'bg-emerald-500/5' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Shield className="text-emerald-500 w-4 h-4 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        Due Process Shield
                        {!effectiveExpanded && <span className="text-[8px] text-zinc-500 font-medium tracking-normal opacity-60">Active</span>}
                    </h3>
                </div>

                {/* Status Indicator */}
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            </div>

            <AnimatePresence>
                {effectiveExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 overflow-hidden"
                    >
                        <div className="pt-2 border-t border-emerald-500/10 space-y-3">
                            <p className="text-[9px] text-zinc-400 font-bold leading-relaxed uppercase tracking-wider">
                                Session ID #9921 monitored for <a href="https://alabamaadministrativecode.state.al.us/docs/ed/290-8-9.pdf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 underline decoration-emerald-500/50 underline-offset-4 transition-colors">AL Code 290-8-9</a> compliance.
                            </p>

                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center gap-2 text-[8px] font-black text-zinc-500 uppercase tracking-widest italic opacity-70">
                                    <CheckCircle2 size={10} className="text-emerald-500" />
                                    Mastering the Maze p. 42
                                </div>
                                <div className="flex items-center gap-2 text-[8px] font-black text-zinc-500 uppercase tracking-widest italic opacity-70">
                                    <Lock size={10} className="text-emerald-500" />
                                    PII Redaction: ON
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function StatutoryDisclaimer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full py-6 border-t border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <AlertCircle className="text-zinc-600 group-hover:text-red-500 transition-colors" size={14} />
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] group-hover:text-zinc-400 transition-colors">
                        Statutory Disclaimer & Sovereign Protocols
                    </span>
                </div>
                <ChevronDown size={14} className={`text-zinc-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2">
                            <p className="text-[9px] text-zinc-500 font-bold leading-relaxed uppercase tracking-wider italic">
                                <span className="text-zinc-400">EdIntel Professional</span> is an executive intelligence amplification system, not a licensed medical or legal entity. Outputs generated regarding IEPs, behavior intervention plans, or psychological profiles are for <span className="text-intel-gold/60">informational and strategic purposes only</span>. This system does not provide medical diagnoses, legal counsel, or binding regulatory advice. Always consult with a certified school psychologist, licensed attorney, or appropriate medical professional before finalizing binding educational contracts.
                            </p>
                            <div className="mt-4 flex items-center justify-between opacity-50">
                                <div className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] italic">
                                    &copy; 2026 SOVEREIGN OS
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-900" />
                                    <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em] italic">SYSTEM v5.1</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
