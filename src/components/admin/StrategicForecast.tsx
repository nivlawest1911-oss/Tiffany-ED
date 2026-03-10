'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, BarChart3, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

const PROJECTION_DATA = [
    { month: 'Mar', roi: 45000, efficiency: 1.2 },
    { month: 'Apr', roi: 68000, efficiency: 1.8 },
    { month: 'May', roi: 125000, efficiency: 2.5 },
    { month: 'Jun', roi: 185000, efficiency: 3.1 },
    { month: 'Jul', roi: 240000, efficiency: 4.2 },
    { month: 'Aug', roi: 310000, efficiency: 5.8 },
];

export function StrategicForecast() {
    const [projectionData, setProjectionData] = useState(PROJECTION_DATA);
    const [liveMetrics, setLiveMetrics] = useState<any>(null);

    useEffect(() => {
        const fetchLiveMetrics = async () => {
            try {
                const res = await fetch('/api/swarm/metrics');
                const data = await res.json();
                if (data.metrics) {
                    setLiveMetrics(data.metrics);
                    // Update the last data point with live ROI for jitter effect
                    setProjectionData(prev => {
                        const next = [...prev];
                        next[next.length - 1] = {
                            ...next[next.length - 1],
                            roi: data.metrics.roi / 10 // scale for chart
                        };
                        return next;
                    });
                }
            } catch (err) {
                console.error('Failed to poll swarm metrics:', err);
            }
        };

        const interval = setInterval(fetchLiveMetrics, 5000);
        return () => clearInterval(interval);
    }, []);

    const maxRoi = Math.max(...projectionData.map(d => d.roi));

    return (
        <GlassCard className="p-8 border-intel-gold/20 bg-intel-black/40 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
                <BarChart3 className="w-48 h-48 text-intel-gold" />
            </div>

            <div className="flex justify-between items-start mb-12 relative z-10">
                <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                        Strategic <span className="text-intel-gold">Projections</span>
                    </h3>
                    <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">
                        Neural Simulation: Fiscal ROI & Efficiency Forecast
                    </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-intel-gold/10 border border-intel-gold/20 text-intel-gold text-[9px] font-black uppercase tracking-widest animate-pulse">
                    Live Simulation
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end relative z-10">
                {/* Simulated Chart */}
                <div className="md:col-span-8 flex items-end justify-between h-48 gap-2">
                    {projectionData.map((data, idx) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center gap-4">
                            <div className="relative w-full h-full flex items-end">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(data.roi / maxRoi) * 100}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                    className="w-full bg-gradient-to-t from-intel-gold/40 to-intel-gold rounded-t-lg group-hover:from-intel-gold/60 group-hover:to-white transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 + idx * 0.1 }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-intel-gold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ${(data.roi / 100).toFixed(0)}k
                                </motion.div>
                            </div>
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">{data.month}</span>
                        </div>
                    ))}
                </div>

                {/* Key Metrics */}
                <div className="md:col-span-4 space-y-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-intel-gold/40 transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Est. 12mo ROI</span>
                        </div>
                        <div className="text-3xl font-black text-white tracking-tighter italic">
                            $2.4M<span className="text-emerald-400 text-sm ml-1">+180%</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-intel-gold/40 transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="w-4 h-4 text-intel-gold" />
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Efficiency Multiplier</span>
                        </div>
                        <div className="text-3xl font-black text-white tracking-tighter italic">
                            {liveMetrics ? `${(liveMetrics.efficiency).toFixed(1)}x` : '5.8x'}
                            <span className="text-intel-gold text-sm ml-1">{liveMetrics ? 'Live' : 'Peak'}</span>
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-intel-gold transition-all group/btn">
                        Optimize Projection <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Background scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </GlassCard>
    );
}
