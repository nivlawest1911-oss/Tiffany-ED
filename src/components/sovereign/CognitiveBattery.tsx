import React from 'react';
import { motion } from 'framer-motion';

interface CognitiveBatteryProps {
    loadScore: number; // 0-100, where 100 is max load (fatigue)
}

export const CognitiveBattery: React.FC<CognitiveBatteryProps> = ({ loadScore }) => {
    // loadScore is derived from BCI focus data and interaction speed
    const getStatusColor = (score: number) => {
        if (score > 80) return 'bg-red-500'; // Critical Fatigue
        if (score > 50) return 'bg-yellow-500'; // Approaching Fatigue
        return 'bg-green-500'; // Optimal
    };

    const remaining = Math.max(0, 100 - loadScore);

    return (
        <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/10 mb-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity" />

            <div className="flex justify-between items-center mb-3 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Cognitive Capacity</span>
                <span className={`text-[10px] font-black font-mono ${loadScore > 80 ? 'text-red-400' : 'text-noble-gold'}`}>
                    {remaining}% Nominal
                </span>
            </div>

            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-4 relative z-10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${remaining}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full relative ${getStatusColor(loadScore)} transition-colors duration-500`}
                    style={{
                        boxShadow: loadScore > 80
                            ? '0 0 20px rgba(239, 68, 68, 0.5)'
                            : loadScore > 50
                                ? '0 0 15px rgba(234, 179, 8, 0.3)'
                                : '0 0 15px rgba(212, 175, 55, 0.3)'
                    }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
            </div>

            <div className="relative z-10">
                {loadScore > 75 ? (
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-red-400 animate-ping" />
                        <p className="text-[9px] text-red-400 uppercase tracking-widest font-black italic">
                            Critical Fatigue: Switching to Binary Mode.
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black italic">
                            Neural Sync: Optimal Interaction State
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

