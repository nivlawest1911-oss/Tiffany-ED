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
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Available Reserve</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-primary-400 tracking-tighter">{tokens}</span>
                            <span className="text-sm font-bold text-white/30 uppercase">/ {maxTokens}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1 shadow-sm shadow-black/20">
                            <Info size={10} /> Tier: Free
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] rounded-full"
                        />
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                        <span>Depleted</span>
                        <span>Propellant Capacity</span>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between shadow-sm shadow-black/20 group">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Reset in 4 days</span>
                    <button className="text-[9px] font-black text-white/50 group-hover:text-primary-400 transition-colors duration-300 uppercase tracking-widest">Upgrade Hub</button>
                </div>
            </div>
        </BentoGridItem>
    );
};
