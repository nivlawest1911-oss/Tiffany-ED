'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ChevronRight, Zap, Terminal, Activity } from 'lucide-react';
import { useState } from 'react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

interface IntelSignal {
    id: string;
    type: 'LEGISLATIVE' | 'TACTICAL' | 'CALENDAR' | 'SYNTHESIS';
    text: string;
    urgency: 'high' | 'medium' | 'low';
    timestamp: string;
}

export default function IntelligenceBriefingAgent() {
    const { playClick, playHover } = useProfessionalSounds();
    const [signals, setSignals] = useState<IntelSignal[]>([
        { id: '1', type: 'LEGISLATIVE', text: "ALSDE 'Literacy Act' Amendment (Act 2024-548) detected. IEP review required.", urgency: 'high', timestamp: 'NOW' },
        { id: '2', type: 'TACTICAL', text: "Center Sync Error: Oak Shadow Middle attendance lattice showing 0.82 entropy.", urgency: 'medium', timestamp: '2m ago' },
        { id: '3', type: 'SYNTHESIS', text: "Dr. West synthesis complete: Curricular Leadership Roadmap archived in Vault.", urgency: 'low', timestamp: '15m ago' },
    ]);

    const [isListening, setIsListening] = useState(false);

    return (
        <div className="bg-zinc-950/50 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
            {/* Background Scanner FX */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent animate-scan" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Activity className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-zinc-950"></span>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Strategic Intel Stream</h3>
                        <p className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5 uppercase">
                            <Terminal size={10} className="text-indigo-500" /> Multi-Agent Lattice: ONLINE
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => { playClick(); setIsListening(!isListening); }}
                    className={`p-3 rounded-xl transition-all ${isListening ? 'bg-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'}`}
                >
                    <Mic className={isListening ? 'animate-pulse' : ''} size={18} />
                </button>
            </div>

            {/* Signal Stream */}
            <div className="space-y-4 relative z-10">
                <AnimatePresence mode="popLayout">
                    {signals.map((signal, i) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.1 }}
                            key={signal.id}
                            onMouseEnter={playHover}
                            className="group flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer relative"
                        >
                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${signal.urgency === 'high' ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse' :
                                signal.urgency === 'medium' ? 'bg-amber-500' : 'bg-indigo-500'
                                }`} />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{signal.type}</span>
                                    <span className="text-[8px] font-mono text-zinc-600">{signal.timestamp}</span>
                                </div>
                                <p className="text-sm text-zinc-200 font-medium leading-relaxed group-hover:text-white transition-colors">
                                    {signal.text}
                                </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-indigo-400 self-center transition-colors" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Strategic Actions */}
            <div className="mt-8 flex gap-3 relative z-10">
                <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-900/40">
                    <Zap size={14} fill="currentColor" /> Executive Pivot
                </button>
                <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-all">
                    Dismiss All
                </button>
            </div>
        </div>
    );
}
