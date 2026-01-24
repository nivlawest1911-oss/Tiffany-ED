'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShieldCheck, DollarSign, Activity, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricProps {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
}

const Metric = ({ label, value, trend, trendValue }: MetricProps) => (
    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-end justify-between">
            <h4 className="text-2xl font-black text-white">{value}</h4>
            <div className={`flex items-center gap-0.5 text-xs font-bold ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-zinc-400'
                }`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : trend === 'down' ? <ArrowDownRight size={14} /> : null}
                {trendValue}
            </div>
        </div>
    </div>
);

export default function StrategicExecutiveDashboard({
    districtName = "Birmingham Unified",
    academicGain = "+12%",
    complianceScore = "98%",
    fiscalHealth = "Optimal",
    studentAttendance = "94.2%"
}) {
    return (
        <div className="w-full max-w-4xl bg-zinc-950 border border-noble-gold/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-noble-gold/10 to-transparent">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-noble-gold mb-2">
                            <Target className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Strategic Command</span>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Executive <span className="text-noble-gold">District Portfolio</span>
                        </h2>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Real-time Strategic Synthesis for {districtName}</p>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                        Live Neural Sync
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Metric label="Academic Growth" value={academicGain} trend="up" trendValue="2.4%" />
                    <Metric label="Compliance" value={complianceScore} trend="up" trendValue="Satisfactory" />
                    <Metric label="Fiscal Velocity" value={fiscalHealth} trend="neutral" trendValue="N/A" />
                    <Metric label="ADA Engagement" value={studentAttendance} trend="down" trendValue="-0.5%" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Critical Vectors */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-400" />
                        Operational Vitality
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Instructional Consistency", value: 88, color: "bg-indigo-500" },
                            { label: "Special Education Compliance", value: 96, color: "bg-emerald-500" },
                            { label: "State Testing Readiness", value: 72, color: "bg-amber-500" }
                        ].map((v, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                                    <span className="text-zinc-400">{v.label}</span>
                                    <span className="text-white">{v.value}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${v.value}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                        className={`h-full ${v.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tactical Directives */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                    <h3 className="text-xs font-black text-noble-gold uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Executive Directives
                    </h3>
                    <div className="space-y-3">
                        {[
                            "Authorize immediate Literacy-Vector audit for Grade 3.",
                            "Calibrate Federal Grant allocation for STEM expansion.",
                            "Deploy restorative coaching protocol to High School West."
                        ].map((d, i) => (
                            <div key={i} className="flex gap-3 items-start group">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-noble-gold/40 group-hover:bg-noble-gold transition-colors" />
                                <p className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors leading-relaxed font-medium">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/[0.02] border-t border-white/10 flex justify-between items-center">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">Architecture: SITE_COMMAND_V4 // EdIntel Global Deployment</span>
                <button className="px-5 py-2 rounded-xl bg-noble-gold text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-noble-gold/20">
                    Export Executive Summary
                </button>
            </div>
        </div>
    );
}
