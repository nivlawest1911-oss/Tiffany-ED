'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EnergyProps {
    tokens: number;
    capacity: number;
}

export const LiquidEnergyGauge = ({ tokens, capacity }: EnergyProps) => {
    const percentage = Math.min((tokens / capacity) * 100, 100);

    return (
        <div className="flex flex-col items-center p-6 bg-black/40 border border-emerald-500/20 rounded-3xl backdrop-blur-md">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-emerald-500 mb-4 font-black">
                Liquid Energy Core
            </h3>

            <div className="relative w-32 h-48 border-2 border-emerald-500/30 rounded-full overflow-hidden bg-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                {/* Liquid Level */}
                <motion.div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Animated Wave Effect */}
                    <motion.div
                        className="absolute -top-4 w-[200%] h-8 bg-emerald-400/50 rounded-[40%]"
                        animate={{
                            x: [-200, 0],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ left: '-50%' }}
                    />
                </motion.div>

                {/* Digital Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white drop-shadow-md">
                        {tokens}
                    </span>
                </div>
            </div>

            <p className="mt-4 text-[9px] text-slate-500 uppercase tracking-widest text-center leading-tight">
                Neural Capacity: {capacity} Units<br />
                <span className="text-emerald-500/50">Excellence Saturated</span>
            </p>
        </div>
    );
};
