'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Brain, FileText, Zap } from 'lucide-react';

export function SovereignBrief() {
    return (
        <div className="h-full flex flex-col gap-6 relative overflow-hidden">
            {/* Background Texture - Mawu Lisa inspired geometric overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Sovereign Brief</h2>
                    <p className="text-[10px] font-bold text-noble-gold uppercase tracking-[0.3em]">Daily Executive Summary</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-noble-gold/10 border border-noble-gold/20 rounded-xl">
                    <Zap size={14} className="text-noble-gold fill-current" />
                    <span className="text-xs font-black text-white">90% Battery</span>
                </div>
            </div>

            {/* The "Zero Decision" Hero Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-950/80 border border-noble-gold/30 p-8 rounded-[2rem] relative overflow-hidden shadow-2xl group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-noble-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">All Systems Sovereign</span>
                    </div>

                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed font-serif italic opacity-90">
                        "Today, we saved <span className="text-noble-gold font-bold not-italic">14 teachers</span> from burnout by auto-drafting their IEPs.
                        We prevented <span className="text-noble-gold font-bold not-italic">3 potential suspensions</span> in the 5th Grade via the Reform Engine.
                        Literacy growth in the Whistler area is up <span className="text-emerald-400 font-bold not-italic">6%</span>."
                    </p>
                </div>
            </motion.div>

            {/* Swarm Intelligence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto no-scrollbar pb-4">

                {/* Admin Swarm */}
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl hover:border-noble-gold/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <FileText size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Admin Swarm</h3>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">NotebookLM • Otter.ai</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">Updated 2m ago</span>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-xs text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                            <span>Board meeting minutes analyzed and filed in Vault.</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                            <span>Compliance audit for Q1 98% complete.</span>
                        </li>
                    </ul>
                </div>

                {/* SPED / Narrative Architect */}
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl hover:border-noble-gold/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Brain size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Narrative Architect</h3>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Monsha • Brisk</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">Active</span>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-xs text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                            <span><span className="text-white font-bold">12 IEPs</span> drafted for review (Avg time: 4s).</span>
                        </li>
                    </ul>
                </div>

                {/* Reform Engine */}
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl hover:border-noble-gold/30 transition-all group md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Recidivism Kill-Switch</h3>
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Affective Computing • Custom Zen</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black text-rose-400 uppercase">Live Monitoring</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Classroom Vibe (Avg)</span>
                            <span className="text-2xl font-black text-emerald-400">92% <span className="text-sm text-zinc-600 font-normal">Calm</span></span>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col justify-center">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Interventions</span>
                            <span className="text-lg font-bold text-white">3 Restorative Sessions <span className="text-zinc-600">Active</span></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
