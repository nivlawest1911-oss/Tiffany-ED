'use client';
import { motion } from 'framer-motion';
import { ScrollText, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

export default function LegislativeWatchdog({ onTriggerSynthesisAction }: { onTriggerSynthesisAction?: (prompt: string) => void }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasCriticalAlert, setHasCriticalAlert] = useState(true);
    const { playClick } = useProfessionalSounds();

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
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col h-full group">
            {/* Ambient Alert Glow */}
            {hasCriticalAlert && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse" />
            )}

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400 relative">
                        <ScrollText size={18} />
                        {hasCriticalAlert && <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />}
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Montgomery Pulse</h3>
                        <p className="text-[9px] text-zinc-500 font-mono">SIGNAL_STRENGTH: 98.2%</p>
                    </div>
                </div>
                <button
                    onClick={refreshFeed}
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            {/* Critical Priority Alert Panel */}
            {hasCriticalAlert && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 relative overflow-hidden group/alert"
                >
                    <div className="absolute top-0 right-0 p-2 opacity-30 group-hover/alert:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle size={14} className="text-rose-500" />
                        <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em]">Priority Strategic Signal</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">Alabama Literacy Act: Amendment Critical</h4>
                    <p className="text-[10px] text-zinc-400 leading-tight mb-3">Recent floor changes mandate immediate curriculum pivot for Spring '26.</p>
                    <button
                        onClick={() => {
                            playClick();
                            if (onTriggerSynthesisAction) {
                                onTriggerSynthesisAction("Analyze SB 101 - Literacy Amendment for Alabama Spring '26. Generate a curriculum pivot and defense synthesis protocol.");
                            }
                            setHasCriticalAlert(false);
                        }}
                        className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/40"
                    >
                        Trigger Professional Defense Synthesis
                    </button>
                </motion.div>
            )}

            <div className="flex-1 space-y-3 relative z-10 overflow-y-auto custom-scrollbar pr-2 max-h-[300px]">
                {updates.map((update, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={update.id}
                        className="p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{update.title}</h4>
                            <span className="text-[9px] font-mono text-zinc-500">{update.date}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-relaxed mb-2 line-clamp-2">{update.desc}</p>

                        <div className="flex items-center gap-2">
                            <span className={`text-[8px] uppercase font-black px-2 py-0.5 rounded-md ${update.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                {update.status}
                            </span>
                            <span className={`text-[8px] uppercase font-black px-2 py-0.5 rounded-md border ${update.impact === 'High' ? 'border-red-500/30 text-red-400' : 'border-zinc-700 text-zinc-500'
                                }`}>
                                {update.impact} Impact
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors group">
                    Enter Montgomery Center <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}


