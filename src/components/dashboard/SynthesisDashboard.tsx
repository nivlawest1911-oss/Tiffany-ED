'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, Info, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SynthesisDashboardProps {
    tokens: number;
    tier: string;
}

export default function SynthesisDashboard({ tokens, tier }: SynthesisDashboardProps) {
    // Capacity based on tier
    const capacities: Record<string, number> = {
        'free': 100,
        'Sovereign Initiate': 100,
        'standard-pack': 1000,
        'Standard Pack': 1000,
        'practitioner': 5000,
        'Practitioner': 5000,
        'director-pack': 15000,
        'Director Pack': 15000,
        'site-command': 50000,
        'Site Command': 50000,
    };

    const capacity = capacities[tier] || 1000;
    const percentage = Math.min((tokens / capacity) * 100, 100);

    const burnRates = [
        { label: 'IRP Generation', cost: 50, icon: BarChart3 },
        { label: 'Avatar Sync', cost: 200, icon: Zap },
        { label: 'Literacy Audit', cost: 500, icon: TrendingDown },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Token Progress Bar */}
            <div className="md:col-span-2 p-6 rounded-[2rem] bg-black/40 border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-noble-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-noble-gold">
                                <Zap size={14} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-noble-gold/70">Neural Capacity</span>
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tighter">
                                {tokens.toLocaleString()} <span className="text-sm font-medium text-zinc-500 text-zinc-500">TKN / {capacity.toLocaleString()} MAX</span>
                            </h2>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-black text-white">{Math.round(percentage)}%</span>
                        </div>
                    </div>

                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={cn(
                                "h-full relative",
                                percentage < 20 ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" :
                                    percentage < 50 ? "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" :
                                        "bg-noble-gold shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                            )}
                        >
                            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                        </motion.div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                            <Info size={10} />
                            Refreshes in 12 days
                        </div>
                        <button className="text-[9px] font-black uppercase tracking-widest text-noble-gold hover:underline">
                            Refill Tank
                        </button>
                    </div>
                </div>
            </div>

            {/* Burn Rate Visualization */}
            <div className="p-6 rounded-[2rem] bg-noble-gold/5 border border-noble-gold/20 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-noble-gold">
                        <TrendingDown size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Predictive Burn Rate</span>
                    </div>

                    <div className="space-y-4">
                        {burnRates.map((rate, i) => (
                            <div key={i} className="flex items-center justify-between group/rate">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-zinc-400 group-hover/rate:text-noble-gold transition-colors">
                                        <rate.icon size={12} />
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wide group-hover/rate:text-white transition-colors">{rate.label}</span>
                                </div>
                                <span className="text-[10px] font-black text-white bg-white/5 py-1 px-2 rounded-md border border-white/5">-{rate.cost} TKN</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-noble-gold/10">
                        <p className="text-[8px] text-zinc-500 leading-relaxed italic uppercase font-medium">
                            Synthesizing complex data consumes neural energy. High-fidelity avatars require maximum current.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
