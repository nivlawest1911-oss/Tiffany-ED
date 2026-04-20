'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Zap, Activity } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, ForecastPoint } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function StrategicForecast() {
    const [forecast, setForecast] = useState<ForecastPoint[]>(engine.getStrategicForecast());

    useEffect(() => {
        setForecast(engine.getStrategicForecast());
    }, []);

    // Simple line generator for mock visualization
    const maxIq = Math.max(...forecast.map(p => p.iq));
    const minIq = Math.min(...forecast.map(p => p.iq));
    const range = maxIq - minIq;

    return (
        <GlassCard className="p-8 border-indigo-500/10 bg-indigo-500/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                        Strategic Forecast Hub
                        <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                            <span className="text-[10px] text-indigo-500 font-black tracking-widest">30-DAY PROJECTION</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Temporal District Trajectory</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Predicted IQ Growth</span>
                        <span className="text-xl font-black text-emerald-400">+(15.2%)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 30-Day Projection (Simplified Visualization) */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="relative h-48 w-full bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-px w-full bg-white" />)}
                        </div>
                        
                        {/* Simulated Trend Line */}
                        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                            <motion.path
                                d={`M 0 100 ${forecast.map((p, i) => `L ${i * (100 / (forecast.length - 1))}% ${100 - ( (p.iq - minIq) / range * 100)}%`).join(' ')}`}
                                fill="none"
                                stroke="url(#forecastGradient)"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="forecastGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            <Activity size={12} className="text-indigo-400 animate-pulse" />
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Neural Convergence Trend</span>
                        </div>
                    </div>

                    <div className="flex justify-between px-2">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">T-0 Days</span>
                        <div className="flex gap-4">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">T+15 Midpoint</span>
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">T+30 Days</span>
                    </div>
                </div>

                {/* Key Insights Stats */}
                <div className="space-y-4">
                    {[
                        { label: 'IQ Baseline', value: '142.8', sub: 'Calculated at 0x8A', icon: Zap, color: 'text-amber-500' },
                        { label: 'Predicted Target', value: '164.5', sub: 'Neural Target reached', icon: TrendingUp, color: 'text-emerald-500' },
                        { label: 'Forecast Epoch', value: 'Q3-26', sub: 'July 2026 Sync', icon: Calendar, color: 'text-indigo-500' }
                    ].map((stat, i) => (
                        <GlassCard key={i} className="p-4 border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-1.5 rounded-lg bg-white/5 ${stat.color}`}>
                                    <stat.icon size={14} />
                                </div>
                                <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-2xl font-black text-white italic tracking-tighter mb-1">{stat.value}</div>
                            <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-tight">{stat.sub}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <TrendingUp size={18} />
                </div>
                <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest leading-relaxed">
                    Sovereign Modeling predicts a <span className="text-indigo-400">sustained growth period</span> for district-wide intelligence quotient as node synchronization reaches 94%.
                </p>
            </div>
        </GlassCard>
    );
}
