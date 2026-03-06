'use client';

import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

const FRAGILITY_DATA = [
    { id: 1, region: "District North", score: 85, trend: "Increasing", status: "Critical" },
    { id: 2, region: "Central Hub", score: 42, trend: "Stable", status: "Stable" },
    { id: 3, region: "West Corridor", score: 68, trend: "Steady", status: "Warning" },
    { id: 4, region: "South Sector", score: 92, trend: "Extreme", status: "Critical" },
    { id: 5, region: "East Terminal", score: 12, trend: "Decreasing", status: "Stable" },
];

export default function DefensePage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Defense
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-12 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                        <ShieldAlert className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">
                        Audit Defense Protocol
                    </span>
                </div>

                <SmartHover message="Defense Protocol: Execute predictive fragility mapping and audit defense sequences to safeguard institutional integrity.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-orange-400">Defense</span>.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    The Elite Defense node is your institutional shield. Deploying predictive fragility maps to identify vulnerabilities before they manifest as crises.
                </p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Predictive Fragility Map Visualizer */}
                <GlassCard className="lg:col-span-2 p-8 border-rose-500/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">Predictive Fragility Map</h3>
                            <p className="text-xs text-slate-500 font-medium">Real-time institutional vulnerability detection</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Live Telemetry</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 h-64 gap-2 mb-8">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: Math.random() * 0.5 + 0.1 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                className={`rounded-sm ${i % 7 === 0 ? 'bg-rose-500' :
                                    i % 4 === 0 ? 'bg-amber-500' : 'bg-slate-800'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        {FRAGILITY_DATA.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${item.status === 'Critical' ? 'bg-rose-500/10 text-rose-500' : item.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                        <AlertTriangle size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{item.region}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">Trend: {item.trend}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-white">{item.score}%</p>
                                    <p className={`text-[10px] font-black uppercase ${item.status === 'Critical' ? 'text-rose-500' : item.status === 'Warning' ? 'text-amber-500' : 'text-emerald-500'}`}>{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Audit Defense Sequences */}
                <div className="space-y-6">
                    <GlassCard className="p-8 border-emerald-500/10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" /> Defense Sequences
                        </h4>
                        <div className="space-y-4">
                            {[
                                { name: "Audit Integrity Shield", active: true },
                                { name: "Compliance Fortress", active: false },
                                { name: "Document Traceability", active: true }
                            ].map((seq, i) => (
                                <button key={i} className="w-full p-4 flex items-center justify-between bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                                    <span className="text-xs font-bold text-slate-300 group-hover:text-white">{seq.name}</span>
                                    <span className={`h-2 w-2 rounded-full ${seq.active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                                </button>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-8 bg-rose-500/5 border-rose-500/10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Current Threat Level</h4>
                        <div className="text-4xl font-black text-rose-500 mb-4">ELEVATED</div>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            Predictive tracking indicates a 22% increase in potential compliance anomalies in District South. Executive attention advised.
                        </p>
                        <button className="w-full mt-6 py-3 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-rose-500/20 transition-all">
                            Initialize Response
                        </button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
