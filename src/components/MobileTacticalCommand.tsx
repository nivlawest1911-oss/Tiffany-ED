'use client';
import { motion } from 'framer-motion';
import { Mic, CheckCircle, FileText, ChevronRight, AlertTriangle } from 'lucide-react';

export default function MobileTacticalCommand() {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 p-4 pb-6 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
            <div className="pointer-events-auto flex items-end justify-between gap-4">

                {/* Voice Field Note Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-indigo-400/30"
                >
                    <Mic className="text-white animate-pulse" />
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Dictate Field Note</span>
                </motion.button>

                {/* Quick Action FAB */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700 shadow-xl"
                >
                    <div className="relative">
                        <FileText className="text-zinc-300" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">2</div>
                    </div>
                </motion.button>
            </div>

            {/* Push Alert Notification (Mock) */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 100 }}
                className="pointer-events-auto mt-4 mx-2 p-4 bg-zinc-900/95 backdrop-blur-md rounded-2xl border-l-4 border-amber-500 shadow-2xl relative"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 mb-1">
                            <AlertTriangle size={12} /> High Urgency Update
                        </h4>
                        <p className="text-sm font-bold text-white leading-tight">ALSDE: New Reading Assessment Window</p>
                        <p className="text-xs text-zinc-400 mt-1">Check "Lesson Nodes" for compliance.</p>
                    </div>
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                        <ChevronRight className="text-zinc-400" size={16} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
