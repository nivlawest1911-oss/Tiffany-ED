'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, Clock, PlayCircle, Star, Brain } from 'lucide-react';

const ANALYTICS_METRICS = [
    { label: 'Neural Ingestion Rate', value: '94%', icon: Brain, color: 'text-noble-gold' },
    { label: 'Active Learners', value: '1.2k', icon: Users, color: 'text-cyan-400' },
    { label: 'Synthesis Engagement', value: '42m', icon: Clock, color: 'text-emerald-400' },
    { label: 'Media Fidelity', value: 'High', icon: Star, color: 'text-purple-400' },
];

export default function MediaAnalytics() {
    return (
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-noble-gold/5 blur-3xl rounded-full" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Media Consumption <span className="text-noble-gold">Pulse</span></h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Real-time engagement heuristics</p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                    <BarChart3 className="w-5 h-5 text-noble-gold" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {ANALYTICS_METRICS.map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-noble-gold/20 transition-all group"
                    >
                        <metric.icon className={`w-4 h-4 mb-3 ${metric.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                        <div className="text-2xl font-black text-white mb-1">{metric.value}</div>
                        <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{metric.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Simulated Live Stream Feed */}
            <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <PlayCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Neural Stream</span>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between text-[9px] font-mono text-white/40 border-b border-white/[0.02] pb-2">
                            <span>Ingesting: Module_42_Synthesis...</span>
                            <span className="text-cyan-900/40">0x{(Math.random() * 1000000).toString(16).substring(0, 8)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
