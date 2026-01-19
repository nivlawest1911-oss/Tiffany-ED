'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle, FileText, ChevronRight, AlertTriangle, Zap, Activity } from 'lucide-react';
import { useState } from 'react';
import useSovereignSounds from '@/hooks/useSovereignSounds';

export default function MobileTacticalCommand() {
    const { playClick } = useSovereignSounds();
    const [isAlerOpen, setIsAlertOpen] = useState(true);

    return (
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pointer-events-none">
            <div className="pointer-events-auto flex items-end justify-between gap-4 max-w-md mx-auto relative">

                {/* Tactical Accent: Kente Bar */}
                <div className="absolute -top-4 left-0 w-full h-[3px] flex opacity-40">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className={`flex-1 h-full ${i % 4 === 0 ? 'bg-amber-500' : i % 4 === 1 ? 'bg-emerald-600' : i % 4 === 2 ? 'bg-rose-600' : 'bg-black'}`} />
                    ))}
                </div>

                {/* Voice Field Note Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={playClick}
                    className="flex-1 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(79,70,229,0.3)] border border-indigo-400/30"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Mic size={14} className="text-white animate-pulse" />
                    </div>
                    <span className="text-white font-black uppercase tracking-[0.15em] text-[10px]">Dictate Field Note</span>
                </motion.button>

                {/* Status Hub */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={playClick}
                    className="w-16 h-16 bg-zinc-900 rounded-[2rem] flex items-center justify-center border border-white/5 shadow-2xl relative"
                >
                    <Activity size={20} className="text-indigo-400" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2 border-zinc-950">2</div>
                </motion.button>
            </div>

            {/* Mobile Push Alert */}
            <AnimatePresence>
                {isAlerOpen && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 100 }}
                        onDragEnd={(_, info) => { if (info.offset.y > 50) setIsAlertOpen(false); }}
                        className="pointer-events-auto mt-6 p-5 bg-zinc-900/80 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative mx-auto max-w-md"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                                <AlertTriangle size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-1">
                                    Priority Neural Alert
                                </h4>
                                <p className="text-sm font-bold text-white leading-tight">ALSDE: New Reading Assessment Window</p>
                                <p className="text-[10px] text-zinc-500 mt-2 font-mono">CODE: ACT-2024-548</p>
                            </div>
                            <button className="self-center p-2 bg-white/5 rounded-lg text-zinc-500">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
