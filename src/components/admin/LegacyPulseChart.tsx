'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, History, Activity } from 'lucide-react';

const LEGACY_PULSE_DATA = [
    { year: '2023', score: 65 },
    { year: '2024', score: 72 },
    { year: '2025', score: 85 },
    { year: '2026', score: 94 },
];

export function LegacyPulseChart() {
    const [pulseData] = useState(LEGACY_PULSE_DATA);

    return (
        <div className="p-6 bg-amber-950/10 border border-amber-500/10 rounded-2xl relative overflow-hidden group">
            {/* Background Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                <History className="w-32 h-32 text-amber-500" />
            </div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                        Institutional <span className="text-amber-500">Pulse</span>
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mt-1">
                        Longitudinal Growth & Memory Integrity
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-black uppercase tracking-widest">
                    <Activity className="w-2.5 h-2.5 animate-pulse" />
                    Archive Active
                </div>
            </div>

            <div className="flex items-end justify-between h-32 gap-3 relative z-10">
                {pulseData.map((data, idx) => (
                    <div key={data.year} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full h-full flex items-end">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${data.score}%` }}
                                transition={{ duration: 1.5, delay: idx * 0.2, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full bg-gradient-to-t from-amber-500/20 to-amber-500 rounded-t-sm group-hover:from-amber-500/40 group-hover:to-amber-400 transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 + idx * 0.1 }}
                                className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-black text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {data.score}%
                            </motion.div>
                        </div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase">{data.year}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Shield className="w-3 h-3 text-amber-500" />
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Integrity</span>
                    </div>
                    <p className="text-xs font-black text-white italic">0.9997</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Transfer Rate</span>
                    </div>
                    <p className="text-xs font-black text-white italic">0.84ms</p>
                </div>
            </div>

            {/* Background scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
