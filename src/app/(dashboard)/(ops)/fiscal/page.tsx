'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { HolographicBackground } from '@/components/ui/HolographicBackground';

const ResourceMarket = dynamic(() => import('@/components/fiscal/ResourceMarket').then(mod => mod.ResourceMarket), {
    ssr: false,
    loading: () => <div className="h-96 w-full bg-white/5 animate-pulse rounded-[40px] border border-white/5" />
});

export default function FiscalPage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col font-inter text-slate-200 text-left">
            <HolographicBackground />

            {/* Header */}
            <div className="relative z-10 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-intel-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-intel-gold/20">
                        <DollarSign className="h-6 w-6 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-intel-gold">
                            Fiscal Command
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic mt-1">
                            Resource Market Node <ChevronRight size={10} /> v4.2 Autonomous
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight tracking-tighter max-w-4xl">
                        Liquidity & <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-gold via-yellow-400 to-white italic">Optimization.</span>
                    </h1>

                    <div className="flex items-center gap-6 pb-2">
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Fiscal Integrity</div>
                            <div className="flex items-center gap-2 text-emerald-400">
                                <ShieldCheck size={14} />
                                <span className="text-xs font-bold uppercase">Audit-Mirror Active</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-right">
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Resource Swarm</div>
                            <div className="flex items-center gap-2 text-intel-gold">
                                <Activity size={14} />
                                <span className="text-xs font-bold uppercase tracking-tight italic">Pulse Stable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Resource Market */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex-1"
            >
                <Suspense fallback={<div className="h-96 w-full bg-white/5 animate-pulse rounded-[40px]" />}>
                    <ResourceMarket />
                </Suspense>
            </motion.div>

            {/* Footer Metadata */}
            <div className="mt-20 pt-8 border-t border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    Economic_Hash: 0x9329...7C22
                </div>
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                    <span>Fiscal ROI Analytics Open</span>
                    <span>Constraint Solvers Locked</span>
                </div>
            </div>
        </div>
    );
}
