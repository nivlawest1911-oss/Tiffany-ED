'use client';

import React from 'react';
import { TrendingDown, Activity, User, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const UsageForecast = ({ forecastData }: { forecastData: any[] }) => {
    return (
        <div className="p-8 bg-[#050507] border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative overflow-hidden group">
            {/* Dynamic Background Mesh */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10 group-hover:bg-indigo-500/10 transition-all duration-1000" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Resource Depletion</h2>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-bold mt-1">Autonomous Neural Forecast // v4.2</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Activity className="text-indigo-400 w-6 h-6" />
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                {forecastData && forecastData.length > 0 ? forecastData.map((user, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={user.profile_id}
                        className="group/item flex items-center justify-between p-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors">
                                <User className="text-zinc-500 w-5 h-5 group-hover/item:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-white uppercase tracking-tight group-hover/item:text-indigo-300 transition-colors">{user.full_name}</p>
                                <p className="text-[9px] text-zinc-600 uppercase font-mono mt-1">Burn Rate: {user.avg_daily_burn.toFixed(1)} Units / Day</p>
                            </div>
                        </div>

                        <div className="text-right flex items-center gap-4">
                            <div className="hidden md:block">
                                <div className="flex items-center gap-1 text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">
                                    <TrendingDown className="w-2.5 h-2.5" /> Stability
                                </div>
                                <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: `${Math.max(10, 100 - (user.avg_daily_burn * 5))}%` }} />
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${user.days_until_depletion < 5
                                    ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'
                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                }`}>
                                {user.days_until_depletion < 1 ? 'EXHAUSTED' : `${user.days_until_depletion} DAYS REMAINING`}
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-700 hidden sm:block" />
                        </div>
                    </motion.div>
                )) : (
                    <div className="p-10 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
                        <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Awaiting Neural Data</div>
                        <div className="text-[8px] text-zinc-700 uppercase mt-2">Historical burn rate requires 3 synthesis events</div>
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center gap-2 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl relative z-10">
                <Clock className="w-4 h-4 text-indigo-400/50" />
                <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest leading-relaxed">
                    Predictive Model: Linear Regression v2.0 // Refresh cycle: Continuous node-sync
                </p>
            </div>
        </div>
    );
};
