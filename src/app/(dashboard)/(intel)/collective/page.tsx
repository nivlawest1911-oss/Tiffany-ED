'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SwarmGrid from '@/components/intelligence/SwarmGrid';
import { 
    Zap, Shield, Brain, Activity, 
    Globe, Cpu,
    ChevronDown, BarChart3, AlertTriangle
} from 'lucide-react';

const CollectiveDashboard = () => {
    return (
        <div className="min-h-screen bg-[#020408] text-white p-6 lg:p-12 space-y-12">
            {/* TOP BAR / COMMAND HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-noble-gold/10 border border-noble-gold/30 flex items-center justify-center p-2">
                            <Brain className="text-noble-gold" size={20} />
                        </div>
                        <span className="text-noble-gold font-black uppercase text-[10px] tracking-[0.5em]">District Command // Collective Intelligence</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter"
                    >
                        The <span className="gold-gradient-text text-glow">Sovereign</span> Swarm
                    </motion.h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                        <div className="relative">
                            <Globe size={20} className="text-emerald-400" />
                            <div className="absolute inset-0 bg-emerald-400/20 blur-lg rounded-full" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Mainnet Status</p>
                            <p className="text-xs font-black uppercase text-emerald-400 tracking-tighter flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Synchronized
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Neural Throughput', value: '1.4 PB/day', icon: Cpu, color: 'text-noble-gold' },
                    { label: 'Decision Latency', value: '0.04 ms', icon: Zap, color: 'text-amber-400' },
                    { label: 'Compliance Score', value: '100%', icon: Shield, color: 'text-emerald-400' },
                    { label: 'District Reach', value: '98 Sites', icon: Globe, color: 'text-sky-400' }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
                            <stat.icon size={80} />
                        </div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                        <div className="flex items-end gap-3">
                            <p className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
                            <stat.icon className={`${stat.color} mb-1.5`} size={16} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* SWARM GRID COMPONENT */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] flex items-center gap-4">
                        <Activity className="text-noble-gold" size={14} />
                        Live Personnel Visualization
                    </h2>
                    <div className="h-px flex-1 bg-white/5 mx-8" />
                </div>
                
                <SwarmGrid />
            </div>

            {/* LOWER INTEL / FEED */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Strategic <span className="text-noble-gold">Insights</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-noble-gold/10 flex items-center justify-center">
                                    <BarChart3 className="text-noble-gold" size={18} />
                                </div>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Instructional Efficiency</p>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed italic">
                                The swarm is currently identifying a 14% drift in IEP compliance across the Eastern Cluster. Automated "IEP Architect" nodes have been dispatched to remediate.
                            </p>
                            <button className="text-noble-gold text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                VIEW DETAILED REPORT <ChevronDown size={14} className="-rotate-90" />
                            </button>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                                    <AlertTriangle className="text-orange-400" size={18} />
                                </div>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Alert Profile: HIGH</p>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed italic">
                                4 "Teacher Guard" burnout signatures detected in the last 2 hours. Predictive models suggest immediate intervention by "Wellness Architect" to prevent systemic fatigue.
                            </p>
                            <button className="text-orange-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                DEPLOY WELLNESS DRONE <ChevronDown size={14} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Mainnet <span className="opacity-40">Feed</span></h3>
                    <div className="p-4 rounded-3xl bg-black border border-white/5 min-h-[400px] font-mono text-[10px] text-white/30 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                        <div className="space-y-3 p-4">
                            <p className="flex items-start gap-4">
                                <span className="text-noble-gold">[14:22:04]</span>
                                <span>RESCUE ONE initial pulse check // Handshake established.</span>
                            </p>
                            <p className="flex items-start gap-4 text-emerald-400/60">
                                <span className="text-noble-gold">[14:22:01]</span>
                                <span>IEP ARCHITECT v3.1: 42 documents audited. Zero compliance drift.</span>
                            </p>
                            <p className="flex items-start gap-4">
                                <span className="text-noble-gold">[14:21:58]</span>
                                <span>District Command: Syncing biometric data for Dr. Alvin West, II...</span>
                            </p>
                            <p className="flex items-start gap-4 animate-pulse">
                                <span className="text-noble-gold">[14:21:42]</span>
                                <span className="text-white/60">DATA INTELLIGENCE: Analyzing fiscal variance for Q3... [78%]</span>
                            </p>
                            <p className="flex items-start gap-4">
                                <span className="text-noble-gold">[14:21:10]</span>
                                <span>SWARM STATUS: All nodes optimal. Neural temperature stable.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectiveDashboard;
