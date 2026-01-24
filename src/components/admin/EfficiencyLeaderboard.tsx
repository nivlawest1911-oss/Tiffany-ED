'use client';

import React from 'react';
import { Trophy, TrendingUp, Cpu, Workflow, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EfficiencyLeaderboard = ({ departments }: { departments: any[] }) => {
    return (
        <div className="p-8 bg-[#050507] border border-emerald-500/20 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
            {/* Decorative Matrix Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #00C853 1px, transparent 1px), linear-gradient(#00C853 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <BarChart3 className="text-emerald-500 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">Efficiency Rank</h2>
                        <p className="text-[9px] text-emerald-500/60 uppercase tracking-[0.4em] font-black mt-2">Departmental Output Density</p>
                    </div>
                </div>
                <Trophy className="text-emerald-500/30 w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>

            <div className="space-y-8 relative z-10">
                {departments && departments.length > 0 ? departments.sort((a, b) => b.total_outputs - a.total_outputs).map((dept, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        key={dept.department}
                        className="group/item relative"
                    >
                        <div className="flex justify-between items-end mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-black text-white italic opacity-20 group-hover/item:opacity-100 transition-opacity">0{index + 1}</span>
                                <span className="text-sm font-black uppercase text-zinc-300 tracking-tight leading-none group-hover/item:text-emerald-400 transition-colors">
                                    {dept.department}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    <span className="text-sm font-black text-white italic">
                                        {dept.total_outputs} Narratives
                                    </span>
                                </div>
                                <p className="text-[7px] text-zinc-600 uppercase font-black tracking-widest mt-1">High Yield Synthesis</p>
                            </div>
                        </div>

                        {/* Progress Bar showing remaining department energy */}
                        <div className="relative h-2 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (dept.remaining_energy / (dept.staff_count * 500)) * 100)}%` }}
                                transition={{ duration: 2, ease: "circOut" }}
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover/item:from-emerald-500 group-hover/item:to-white transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                            />
                        </div>

                        <div className="flex justify-between mt-2 px-1">
                            <span className="text-[7px] text-zinc-700 uppercase font-bold tracking-widest">Active Staff: {dept.staff_count}</span>
                            <span className="text-[7px] text-zinc-700 uppercase font-bold tracking-widest">Reserve: {dept.remaining_energy} U</span>
                        </div>
                    </motion.div>
                )) : (
                    <div className="p-12 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-2xl">
                        <Workflow className="w-8 h-8 text-zinc-800 mx-auto mb-4" />
                        <div className="text-[10px] text-zinc-700 uppercase font-black tracking-widest">Awaiting Departmental Sync</div>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-emerald-500/50" />
                    <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Node: Mobile_County_V4</span>
                </div>
                <button className="text-[8px] text-emerald-500/50 uppercase font-black tracking-[0.3em] hover:text-emerald-400 transition-colors">
                    Request Full Audit →
                </button>
            </div>
        </div>
    );
};
