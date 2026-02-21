'use client';

import { Activity, DollarSign, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

export default function LedgerPage() {
    const metrics = [
        { label: "Institutional ROI", value: "+12.5%", trending: "up", description: "Operational efficiency gains." },
        { label: "Sovereign Spend", value: "$4.2k", trending: "down", description: "Monthly AI utilization costs." },
        { label: "Grant Synthesis", value: "$128k", trending: "up", description: "AI-identified funding paths." },
        { label: "Compliance Score", value: "99.2%", trending: "up", description: "Data sovereignty audit status." },
    ];

    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Ledger
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-16 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Activity className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                        Executive Fiscal Intelligence
                    </span>
                </div>

                <SmartHover message="Sovereign Ledger: Execute clinical precision in fiscal oversight and institutional resource allocation.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Prosperity</span>.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    Monitor institutional health with clinical precision. The Sovereign Ledger synthesizes complex financial telemetry into actionable executive insights.
                </p>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {metrics.map((metric, idx) => (
                    <SmartHover key={idx} message={`Fiscal Telemetry: ${metric.label} - ${metric.description} Calibrating ROI pathways.`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <GlassCard className="p-8 h-full flex flex-col group hover:border-emerald-500/20 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{metric.label}</span>
                                    {metric.trending === 'up' ? (
                                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 text-rose-500" />
                                    )}
                                </div>
                                <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">
                                    {metric.value}
                                </h3>
                                <p className="text-slate-400 text-xs font-medium">
                                    {metric.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    </SmartHover>
                ))}
            </div>

            {/* Tactical Feed */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                <GlassCard className="lg:col-span-2 p-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Sovereign Audit Log
                    </h4>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <DollarSign className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Resource Allocation Synthesized</p>
                                        <p className="text-[10px] text-slate-500 font-medium">District Unit 04 • 12m ago</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-white">+$12,400.00</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
                <div className="space-y-6">
                    <GlassCard className="p-8 bg-emerald-500/5 group">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Fiscal Health Index</h4>
                        <div className="text-4xl font-black text-white mb-4">94.2</div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-emerald-500"
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                transition={{ duration: 1.5 }}
                            />
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
