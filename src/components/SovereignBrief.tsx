'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Brain, Zap, Activity, TrendingUp } from 'lucide-react';

export function SovereignBrief() {
    return (
        <div className="h-full flex flex-col gap-6 relative overflow-hidden p-1">
            {/* Background Texture - Refined geometric overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-shrink-0"
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-1">Intelligence Assessment</h3>
                        <p className="text-2xl text-white font-black italic uppercase tracking-tighter">Sovereign Briefing // 001</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Activity size={12} className="text-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-zinc-400">SYNC_OK</span>
                    </div>
                </div>
            </motion.div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Strategic Alignment', value: '98.4%', icon: TrendingUp, color: 'text-noble-gold' },
                    { label: 'Operational Vibe', value: 'High', icon: Brain, color: 'text-purple-400' },
                    { label: 'Compliance Health', value: 'Secured', icon: CheckCircle2, color: 'text-emerald-400' },
                    { label: 'Network Pulse', value: 'Optimal', icon: Zap, color: 'text-amber-400' }
                ].map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-[1.5rem] bg-white/[0.03] backdrop-blur-md border border-white/10 hover:bg-white/[0.05] transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-colors" />
                        <metric.icon size={16} className={`${metric.color} mb-3`} />
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">{metric.label}</p>
                        <p className="text-lg text-white font-black">{metric.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Narrative Intelligence Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1 min-h-0 flex flex-col gap-4"
            >
                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <Brain size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Narrative Architect</h3>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Monsha • Brisk AI</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">Active</span>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-xs text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                            <span><span className="text-white font-bold">12 IEPs</span> drafted for review (Avg time: 4s).</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                            <span><span className="text-white font-bold">3 Lesson Plans</span> generated for Grade 8 Math.</span>
                        </li>
                    </ul>
                </div>

                {/* Reform Engine */}
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl hover:border-noble-gold/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Recidivism Kill-Switch</h3>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Affective Computing</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-rose-400 uppercase">Monitoring</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Classroom Vibe</span>
                            <span className="text-2xl font-black text-emerald-400">92%</span>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Interventions</span>
                            <span className="text-lg font-bold text-white">3 Active</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
