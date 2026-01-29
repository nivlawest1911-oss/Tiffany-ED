'use client';
import { AuroraCard } from '../flow/AuroraCard';
import { TrendingUp } from 'lucide-react';
import React from 'react';

export const ROICalculator = ({ narrativeCount }: { narrativeCount: number }) => {
    const hoursSaved = (narrativeCount * 3.75).toFixed(0); // 3.75 hours saved per doc
    const dollarsSaved = (Number(hoursSaved) * 35).toLocaleString();

    return (
        <AuroraCard>
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-2xl">
                    <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Efficiency Multiplier</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Instructional Hours Returned</p>
                    <p className="text-4xl font-light text-white">{hoursSaved} <span className="text-sm text-slate-400 font-black">HRS</span></p>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-1">Reallocated Labor Value</p>
                    <p className="text-2xl font-black text-emerald-400">${dollarsSaved}</p>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-[7px] text-zinc-700 uppercase font-bold italic">Calculation based on Doctoral Financial Model v4.2 // $35/hr base rate</p>
            </div>
        </AuroraCard>
    );
};
