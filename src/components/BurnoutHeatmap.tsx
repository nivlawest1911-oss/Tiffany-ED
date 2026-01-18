'use client';
import { Activity, Flame, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BurnoutHeatmap() {
    // 5 days x 4 time blocks? Or just days of week?
    // Let's do a contribution-graph style but for "Hours Saved"

    // Mock data: High intensity = Lots of EdIntel usage = High time savings = Low burnout risk
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const blocks = [
        [3, 5, 2, 4, 1], // Morning
        [1, 2, 8, 2, 0], // Midday
        [4, 6, 3, 5, 2], // Afternoon
    ];

    const totalHoursSaved = 48;
    const adminCostRecovered = totalHoursSaved * 55; // $55/hr avg admin rate

    const getIntensityColor = (intensity: number) => {
        if (intensity === 0) return 'bg-zinc-800/50';
        if (intensity < 3) return 'bg-orange-500/20'; // Low usage
        if (intensity < 6) return 'bg-emerald-500/40'; // Med usage
        return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]'; // High usage (Good!)
    };

    return (
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg text-white">
                        <Flame size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Burnout Reduction Heatmap</h3>
                        <p className="text-[10px] text-zinc-400 font-mono">Administrative Load Absorption</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400">{totalHoursSaved}h</div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Hours Reclaimed</div>
                </div>
            </div>

            <div className="space-y-2 mb-6">
                {blocks.map((row, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="w-16 text-[10px] text-zinc-500 font-bold uppercase text-right mr-2">
                            {i === 0 ? '08:00 - 11:00' : i === 1 ? '11:00 - 14:00' : '14:00 - 17:00'}
                        </span>
                        {row.map((val, j) => (
                            <motion.div
                                key={j}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: j * 0.1 + i * 0.1 }}
                                className={`h-8 flex-1 rounded-md ${getIntensityColor(val)} hover:scale-105 transition-transform relative group cursor-pointer`}
                            >
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded text-[9px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    {val} Protocols Generated
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}
                <div className="flex justify-between pl-20 pr-2">
                    {days.map(d => (
                        <span key={d} className="text-[10px] text-zinc-600 font-bold uppercase w-full text-center">{d}</span>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Capital Recovery</p>
                    <p className="text-lg font-mono font-bold text-white">${adminCostRecovered.toLocaleString()}</p>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div className="flex items-center gap-3">
                    <Activity size={16} className="text-emerald-500" />
                    <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Cognitive Load</p>
                        <p className="text-xs font-bold text-emerald-400">-32% vs Last Week</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
