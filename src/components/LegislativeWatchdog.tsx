'use client';
import { motion } from 'framer-motion';
import { ScrollText, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function LegislativeWatchdog() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshFeed = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
    };

    const updates = [
        { id: 1, title: 'SB 101 - Literacy Amendment', status: 'Passed', impact: 'High', date: '2h ago', desc: 'Mandatory reading blocks extended to 120min.' },
        { id: 2, title: 'AL Act 2024-548 Funding', status: 'In Committee', impact: 'Med', date: '5h ago', desc: 'Potential increase in Title I allocation for Mobile County.' },
        { id: 3, title: 'ALSDE Memo #8822', status: 'Active', impact: 'Low', date: '1d ago', desc: 'Updated calendar for spring assessment window.' },
    ];

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
                        <ScrollText size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Legislative Watchdog</h3>
                        <p className="text-[10px] text-zinc-400">Live Pulse: Montgomery, AL</p>
                    </div>
                </div>
                <button
                    onClick={refreshFeed}
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="flex-1 space-y-3 relative z-10 overflow-y-auto custom-scrollbar pr-2 max-h-[250px]">
                {updates.map((update, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={update.id}
                        className="p-3 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-bold text-zinc-200 group-hover:text-rose-400 transition-colors">{update.title}</h4>
                            <span className="text-[9px] font-mono text-zinc-500">{update.date}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed mb-2">{update.desc}</p>

                        <div className="flex items-center gap-2">
                            <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${update.status === 'Passed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                {update.status}
                            </span>
                            <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${update.impact === 'High' ? 'border-red-500/30 text-red-400' : 'border-zinc-700 text-zinc-500'
                                }`}>
                                {update.impact} Impact
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                    Access ALISON Database <ExternalLink size={10} />
                </button>
            </div>
        </div>
    );
}
