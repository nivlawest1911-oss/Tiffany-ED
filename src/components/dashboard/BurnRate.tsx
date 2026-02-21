'use client';

import React from 'react';
import { TrendingDown, BarChart3, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BurnRateProps {
    className?: string;
}

export default function BurnRate({ className }: BurnRateProps) {
    const burnRates = [
        { label: 'IRP Generation', cost: 50, icon: BarChart3 },
        { label: 'Avatar Sync', cost: 200, icon: Zap },
        { label: 'Literacy Audit', cost: 500, icon: TrendingDown },
    ];

    return (
        <div className={cn("glass-bento flex flex-col justify-between h-full", className)}>
            <div>
                <div className="flex items-center gap-2 mb-6 text-sovereign-gold">
                    <TrendingDown size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-sovereign-gold/80">Predictive Burn Rate</span>
                </div>

                <div className="space-y-4">
                    {burnRates.map((rate, i) => (
                        <div key={i} className="flex items-center justify-between group/rate p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white border border-slate-100 text-slate-400 group-hover/rate:text-sovereign-gold transition-colors">
                                    <rate.icon size={14} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide group-hover/rate:text-slate-900 transition-colors">{rate.label}</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-900">-{rate.cost} TKN</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-[8px] text-slate-400 leading-relaxed italic uppercase font-medium">
                    High-compute tasks scale proportionally. Upgrade to Site Command for unlimited daily synthesis refills.
                </p>
            </div>
        </div>
    );
}
