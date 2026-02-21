'use client';

import React from 'react';
import { Target, Info } from 'lucide-react';
import { BentoGridItem } from './BentoGridItem';
import { motion } from 'framer-motion';

interface TokenMeterProps {
    tokens?: number;
    maxTokens?: number;
}

export const TokenMeter = ({ tokens = 8, maxTokens = 10 }: TokenMeterProps) => {
    const percentage = (tokens / maxTokens) * 100;

    return (
        <BentoGridItem
            title="Usage Token Meter"
            description="Neural protocol capacity status"
            icon={Target}
            span="col-span-12 lg:col-span-4"
        >
            <div className="space-y-6 pt-4">
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Available Reserve</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-cyan-400 tracking-tighter">{tokens}</span>
                            <span className="text-sm font-bold text-zinc-600 uppercase">/ {maxTokens}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                            <Info size={10} /> Tier: Free
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                        />
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                        <span>Depleted</span>
                        <span>Propellant Capacity</span>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Reset in 4 days</span>
                    <button className="text-[9px] font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-widest">Upgrade Hub</button>
                </div>
            </div>
        </BentoGridItem>
    );
};
