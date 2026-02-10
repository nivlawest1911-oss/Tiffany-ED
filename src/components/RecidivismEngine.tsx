'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Users, AlertTriangle, Wind, Brain } from 'lucide-react';

interface RecidivismEngineProps {
    classVibe?: number;
}

export function RecidivismEngine({ classVibe = 92 }: RecidivismEngineProps) {
    const [vibe, setVibe] = useState(classVibe);
    const [alertActive, setAlertActive] = useState(false);
    const [restorativeMode, setRestorativeMode] = useState(false);

    // Simulate Vibe Fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setVibe(prev => {
                const fluctuation = Math.random() * 4 - 2;
                const newVibe = Math.min(100, Math.max(0, prev + fluctuation));
                // Trigger alert if vibe drops below 75
                if (newVibe < 75 && !alertActive) setAlertActive(true);
                if (newVibe > 85) setAlertActive(false);
                return newVibe;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [alertActive]);

    return (
        <div className="h-full flex flex-col gap-6 relative p-6">
            {/* Background - Minimal Dark Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between z-10">
                <div>
                    <h2 className="text-xl font-black text-rose-500 italic uppercase tracking-tighter flex items-center gap-3">
                        <AlertTriangle size={20} /> Reform Engine
                    </h2>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Classroom Affective Computing</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full border ${vibe > 80 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400 animate-pulse'} `}>
                        <span className="text-[10px] font-black uppercase tracking-widest">{vibe > 80 ? 'Atmosphere Stable' : 'Tension Detected'}</span>
                    </div>
                </div>
            </div>

            {/* Main Vibe Monitor */}
            <div className="bg-black/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden z-10">
                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] block mb-2">Real-Time Vibe Score</span>
                        <div className="text-6xl font-black text-white tracking-tighter flex items-baseline gap-2">
                            {Math.round(vibe)}%
                            <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Positive</span>
                        </div>
                    </div>
                    <HeartPulse size={48} className={`opacity-20 ${vibe < 80 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`} />
                </div>

                {/* Visualizer Bar */}
                <div className="mt-8 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full ${vibe > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        animate={{ width: `${vibe}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 1 }}
                    />
                </div>
            </div>

            {/* Active Interventions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 z-10">
                {/* Protocol Card */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-noble-gold/30 transition-all cursor-pointer group" onClick={() => setRestorativeMode(true)}>
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        <Users size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">Restorative Twin</h3>
                    <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">
                        Initiate 1-on-1 AI mediation session for conflict resolution.
                    </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-noble-gold/30 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                        <Wind size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">Focus Keeper</h3>
                    <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">
                        Deploy 3-minute collective breathing exercise.
                    </p>
                </div>
            </div>

            {/* Restorative Mode Overlay */}
            <AnimatePresence>
                {restorativeMode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-8 text-center"
                    >
                        <Brain size={48} className="text-noble-gold mb-6 animate-pulse" />
                        <h3 className="text-2xl font-black text-white italic uppercase mb-2">Restorative Session Active</h3>
                        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
                            The AI EdIntel Twin is currently guiding the student through a reflective "Goblin Tools" protocol to de-escalate tension.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-noble-gold text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">Monitor Audio</button>
                            <button onClick={() => setRestorativeMode(false)} className="px-6 py-3 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors">End Session</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
