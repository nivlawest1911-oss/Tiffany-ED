'use client';

import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import { CollectiveIntelligenceDashboard } from '@/components/intelligence/CollectiveIntelligenceDashboard';

export default function IntelligencePage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col font-inter text-slate-200 text-left">
            <HolographicBackground />

            {/* Header */}
            <div className="relative z-10 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">
                            Neural Command
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic mt-1">
                            Intelligence Swarm Terminal <ChevronRight size={10} /> v8.1 Collective
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight tracking-tighter max-w-4xl">
                        Swarm Mind & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-white italic">Collective Learning.</span>
                    </h1>

                    <div className="flex items-center gap-6 pb-2">
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Knowledge Sync</div>
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Activity size={14} />
                                <span className="text-xs font-bold uppercase tracking-tight">Active Pulse</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Audit Trail</div>
                            <div className="flex items-center gap-2 text-intel-gold">
                                <ShieldCheck size={14} />
                                <span className="text-xs font-bold uppercase tracking-tight italic">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Dashboard */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex-1"
            >
                <CollectiveIntelligenceDashboard />
            </motion.div>

            {/* Footer Metadata */}
            <div className="mt-20 pt-8 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    Cognitive_Hash: 0x8A2C...F9B0
                </div>
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                    <span>Neural Integrity Verified</span>
                    <span>Cross-Node Synapse Open</span>
                </div>
            </div>
        </div>
    );
}
