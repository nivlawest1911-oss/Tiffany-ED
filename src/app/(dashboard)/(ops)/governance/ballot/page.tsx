'use client';

import { motion } from 'framer-motion';
import { Gavel, ShieldCheck, History, ChevronRight } from 'lucide-react';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import { SovereignBallot } from '@/components/governance/SovereignBallot';

export default function GovernanceBallotPage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col font-inter text-slate-200">
            <HolographicBackground />

            {/* Header */}
            <div className="relative z-10 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-intel-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-intel-gold/20">
                        <Gavel className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-intel-gold">
                            Neural Governance
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic mt-1">
                            District Ballot Node <ChevronRight size={10} /> v2.4 Regulatory Stable
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight tracking-tighter max-w-4xl">
                        Voice of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-gold via-yellow-400 to-white italic">Constituency.</span>
                    </h1>

                    <div className="flex items-center gap-6 pb-2">
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Session Integrity</div>
                            <div className="flex items-center gap-2 text-emerald-400">
                                <ShieldCheck size={14} />
                                <span className="text-xs font-bold uppercase">Quantum Secured</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Constitutional Ledger</div>
                            <div className="flex items-center gap-2 text-intel-gold">
                                <History size={14} />
                                <span className="text-xs font-bold uppercase tracking-tight italic">0x4F...E921</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Voting Terminal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex-1"
            >
                <SovereignBallot />
            </motion.div>

            {/* Footer Metadata */}
            <div className="mt-20 pt-8 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    District_Governance_ID: 1102-ALPHA-9
                </div>
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                    <span>Participation Optimal</span>
                    <span>Consensus Threshold Active</span>
                </div>
            </div>
        </div>
    );
}
