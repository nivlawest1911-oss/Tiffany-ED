'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    HeartPulse,
    Sparkles,
    Target,
    Zap,
    ShieldCheck
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/Cinematic';
import { EdIntelPivotDashboard } from '@/components/ui/EdIntelPivot';

const roiData = [
    { month: 'Sep', administrative: 45, strategic: 25 },
    { month: 'Oct', administrative: 38, strategic: 35 },
    { month: 'Nov', administrative: 30, strategic: 45 },
    { month: 'Dec', administrative: 15, strategic: 65 },
    { month: 'Jan', administrative: 8, strategic: 82 },
];

const mentalHealthImpact = [
    { name: 'Counseling Hours', value: '420+', unit: 'Monthly Reclaimed' },
    { name: 'Teacher Retention', value: '24%', unit: 'Index Increase' },
    { name: 'Crisis Response', value: '3.4m', unit: 'Reduction Time' },
];

const burnoutData = [
    { category: 'Paperwork', before: 85, after: 12 },
    { category: 'Compliance', before: 92, after: 15 },
    { category: 'Emails', before: 78, after: 22 },
    { category: 'Planning', before: 70, after: 18 },
];

export default function PivotIntelligencePage() {
    return (
        <div className="space-y-20">
            {/* Header / Hero Section */}
            <section className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-noble-gold/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-noble-gold/10 border border-noble-gold/20 rounded-lg">
                            <Target className="w-5 h-5 text-noble-gold" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-noble-gold/60">Strategic Intelligence Briefing</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
                        The <span className="text-noble-gold">Pivot</span>: <br />
                        <span className="text-zinc-600">Executive ROI</span>
                    </h1>

                    <p className="max-w-2xl text-lg text-zinc-400 font-medium leading-relaxed">
                        Transforming instructional leadership from administrative friction to strategic acceleration.
                        Reallocating human capacity to the highest-need areas.
                    </p>
                </motion.div>
            </section>

            {/* Technical Hub Integration */}
            <section className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                        <Zap size={14} className="text-noble-gold" />
                        Institutional Sync Engine
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
                        Uplink Active
                    </div>
                </div>
                <EdIntelPivotDashboard />
            </section>

            {/* Metrics Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mentalHealthImpact.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="p-8 hover:border-noble-gold/30 transition-all group">
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-noble-gold transition-colors">{item.name}</div>
                            <div className="text-4xl font-black text-white mb-1">{item.value}</div>
                            <div className="text-xs font-bold text-zinc-600 uppercase tracking-tighter">{item.unit}</div>
                        </GlassCard>
                    </motion.div>
                ))}
            </section>

            {/* Primary Narrative: Mental Health Reallocation */}
            <section className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl font-black tracking-tight uppercase italic flex items-center gap-4">
                        <HeartPulse className="text-red-500" />
                        The Human <span className="text-noble-gold">Dividend</span>
                    </h2>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                        <p>
                            Traditional districts spend <span className="text-white font-bold px-2 italic text-lg">68% of capacity</span> on compliance friction. 
                            EdIntel Pivot automates these administrative cycles.
                        </p>
                        <div className="bg-noble-gold/5 border-l-2 border-noble-gold p-6 rounded-r-2xl italic text-white/90">
                            "The Pivot reallocates human hours. We are moving counselors back into the hallways and psychologists back into interventions."
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <GlassCard className="p-10 h-[400px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles size={120} />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Capacity Reallocation Matrix</h3>
                        <ResponsiveContainer width="100%" height="70%">
                            <AreaChart data={roiData}>
                                <defs>
                                    <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorStrat" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#374151" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase' }}
                                />
                                <Area type="monotone" dataKey="administrative" stroke="#ef4444" fillOpacity={1} fill="url(#colorAdmin)" strokeWidth={3} />
                                <Area type="monotone" dataKey="strategic" stroke="#D4AF37" fillOpacity={1} fill="url(#colorStrat)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Admin Friction</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-noble-gold" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Strategic Impact</span>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </section>

            {/* Burnout Mitigation */}
            <section className="bg-noble-gold/5 border border-noble-gold/10 rounded-[4rem] p-12 overflow-hidden relative">
                <div className="max-w-3xl">
                    <h2 className="text-4xl font-black tracking-tight uppercase italic mb-6">
                        Burnout <span className="text-zinc-600">Neutralized</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-12">
                        Teacher and administrative burnout is data-logistics failure. We solve the logistics to reclaim the professional.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {burnoutData.map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="text-[10px] font-black uppercase text-zinc-500 tracking-wider font-mono">{item.category}</div>
                                <div className="h-40 w-full bg-black/40 rounded-2xl flex flex-col justify-end p-4 gap-2 border border-white/5 relative group overflow-hidden">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${item.before}%` }}
                                        className="w-full bg-red-500/10 rounded-lg absolute bottom-4 left-4 right-4 transition-all duration-1000 group-hover:opacity-30 opacity-10"
                                    />
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${item.after}%` }}
                                        className="w-full bg-emerald-500/40 rounded-lg relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                    />
                                    <div className="flex justify-between items-center text-[8px] font-black text-white relative z-20">
                                        <span>OPTIMIZED: {item.after}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Upgrade Call */}
            <section className="py-20 text-center">
                <div className="flex flex-col items-center max-w-2xl mx-auto">
                    <ShieldCheck className="w-16 h-16 text-noble-gold mb-8 italic" />
                    <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
                        Zenith <span className="text-noble-gold">Absolute</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12">
                        The platform is now fully synchronized. All institutional nodes are active and verified under the Sovereign Protocol.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/pricing" className="px-10 py-4 bg-noble-gold text-black rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:scale-105 transition-all shadow-xl shadow-noble-gold/20">
                            Institutional Upgrade
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.3);
                }
            `}</style>
        </div>
    );
}
