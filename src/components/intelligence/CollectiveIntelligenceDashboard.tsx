'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Share2, ShieldCheck, Activity, Info, Network, Sparkles, Zap } from 'lucide-react';
import { CollectiveLearningEngine, LearningEntry, IntelligenceMetric, NodeDomain } from '@/lib/CollectiveLearningEngine';
import { GlassCard } from '@/components/ui/Cinematic';

const engine = CollectiveLearningEngine.getInstance();

export function CollectiveIntelligenceDashboard() {
    const [metrics, setMetrics] = useState<IntelligenceMetric[]>([]);
    const [insights, setInsights] = useState<LearningEntry[]>([]);
    const [globalIndex, setGlobalIndex] = useState(0);

    useEffect(() => {
        const tick = () => {
            setMetrics(engine.getIntelligenceMetrics());
            setInsights(engine.getLiveInsights());
            setGlobalIndex(engine.getOverallIntelligenceIndex());
        };
        tick();
        const interval = setInterval(tick, 4000);
        return () => clearInterval(interval);
    }, []);

    const getDomainIcon = (domain: NodeDomain) => {
        switch (domain) {
            case 'PEDAGOGY': return <Brain size={16} />;
            case 'FISCAL': return <Activity size={16} />;
            case 'LOGISTICS': return <Network size={16} />;
            case 'SECURITY': return <ShieldCheck size={16} />;
            case 'GOVERNANCE': return <Cpu size={16} />;
            default: return <Info size={16} />;
        }
    };

    return (
        <div className="space-y-12">
            {/* Global Intelligence Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <GlassCard className="p-6 border-cyan-500/20 col-span-1 md:col-span-2">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4 items-center">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">District IQ</div>
                                <div className="text-4xl font-black text-white italic tracking-tighter">
                                    {globalIndex.toFixed(1)}
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Neural Convergence Stable</span>
                        </div>
                    </div>

                    <div className="h-64 relative overflow-hidden rounded-xl bg-black/40 border border-white/5 p-4">
                        {/* Synaptic Animation Overlay (Simplified representation) */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            {[1, 2, 3, 4, 5].map(i => (
                                <motion.div
                                    key={i}
                                    className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                    style={{
                                        top: `${20 * i}%`,
                                        left: 0,
                                        right: 0
                                    }}
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        duration: 3 + i,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            ))}
                        </div>
                        <div className="relative z-10 flex flex-col justify-end h-full">
                            <div className="text-[9px] font-mono text-cyan-400/40 mb-2 uppercase tracking-tight">Active Knowledge Neurons</div>
                            <div className="flex gap-2 items-end">
                                {[30, 45, 60, 50, 80, 70, 90, 85, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-full bg-cyan-500/30 rounded-t-sm"
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 gap-6 col-span-1 md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        {metrics.slice(0, 4).map(m => (
                            <GlassCard key={m.domain} className="p-4 border-white/5 hover:border-white/10 transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-white/5 rounded-lg text-intel-gold">
                                        {getDomainIcon(m.domain)}
                                    </div>
                                    <span className="text-[9px] font-black uppercase text-white tracking-widest">{m.domain}</span>
                                </div>
                                <div className="text-2xl font-black text-white italic tracking-tighter mb-1">{m.intelligenceQuotient.toFixed(0)}</div>
                                <div className={`text-[8px] font-bold uppercase ${m.syncStatus === 'SYNCHRONIZED' ? 'text-emerald-400' : 'text-orange-400'}`}>
                                    {m.syncStatus} (+{m.growthRate.toFixed(1)}%)
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Knowledge Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <Share2 className="text-intel-gold" size={20} />
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Collective Learning Stream</h3>
                    </div>

                    <div className="space-y-4">
                        {insights.map((insight, idx) => (
                            <motion.div
                                key={insight.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <GlassCard className="p-6 border-white/5 group hover:border-intel-gold/20 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-4">
                                            <div className="px-2 py-1 bg-white/5 rounded text-[8px] font-black text-intel-gold border border-white/5 uppercase">
                                                {insight.domain}
                                            </div>
                                            <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest italic">
                                                From Node_{insight.originNodeId.split('_').pop()}
                                            </div>
                                        </div>
                                        <div className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${insight.impact === 'CRITICAL' ? 'border-rose-500/50 text-rose-400' :
                                            insight.impact === 'HIGH' ? 'border-orange-500/50 text-orange-400' :
                                                'border-cyan-500/50 text-cyan-400'
                                            }`}>
                                            {insight.impact} IMPACT
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-white/80 leading-relaxed italic">
                                        "{insight.insight}"
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1">Neural Convergence</div>
                                            <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-intel-gold"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${insight.confidence * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-intel-gold">{(insight.confidence * 100).toFixed(0)}%</span>
                                        </div>
                                        <span className="text-[8px] font-mono text-white/20">{insight.timestamp.toLocaleTimeString()}</span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <GlassCard className="p-8 border-intel-gold/10 bg-gradient-to-br from-intel-gold/5 to-transparent">
                        <div className="p-3 bg-intel-gold/10 rounded-2xl text-intel-gold w-fit mb-6">
                            <Zap size={20} />
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-4">Neural Optimizer</h4>
                        <p className="text-xs text-white/60 leading-relaxed mb-8">
                            Swarm-wide pattern recognition is currently identifying curriculum optimizations for the upcoming fiscal quarter.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Synaptic Strength</span>
                                    <span className="text-[10px] font-bold text-intel-gold">92%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-intel-gold/60" initial={{ width: 0 }} animate={{ width: '92%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Cross-Node Sync</span>
                                    <span className="text-[10px] font-bold text-cyan-400">Active</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-cyan-400/60" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity }} />
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-12 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:border-intel-gold transition-all">
                            Refresh Context Swarm
                        </button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
