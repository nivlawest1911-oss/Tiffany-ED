'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const FuelCellWidget = () => {
    return (
        <div className="relative p-6 rounded-[2rem] bg-zinc-900/40 border border-amber-500/20 backdrop-blur-3xl overflow-hidden group">
            {/* Liquid Energy Simulation (Background) */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-500/20 to-transparent">
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        scaleY: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-amber-500/10 blur-xl"
                />
            </div>

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                            <Zap className="w-5 h-5 fill-amber-500/20" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Neural Energy Matrix</span>
                    </div>
                    <span className="text-[10px] font-black text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">RESERVE: 84%</span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-black text-white italic tracking-tighter">840 <span className="text-sm text-zinc-600 non-italic tracking-normal font-bold">UEU</span></span>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Efficiency Optimized</span>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">+12.4% vs Previous Cycle</span>
                        </div>
                    </div>

                    {/* Fuel Cell Progress Bar (Liquid Effect) */}
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "84%" }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 relative"
                        >
                            {/* Moving Shine */}
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-y-0 w-20 bg-white/20 skew-x-12"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 rounded-2xl bg-black/20 border border-white/5">
                        <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Consumption Range</span>
                        <span className="text-xs font-bold text-zinc-300 tracking-tight">24-Day Runway</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-black/20 border border-white/5">
                        <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Grid Priority</span>
                        <span className="text-xs font-bold text-emerald-500 tracking-tight italic uppercase">High Yield</span>
                    </div>
                </div>
            </div>

            {/* Visual Flair */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Zap size={120} className="text-amber-500" />
            </div>
        </div>
    );
};
