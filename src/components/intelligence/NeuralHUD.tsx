'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Brain, ChevronRight, Heart, Wind } from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';
import { useWearable } from '@/hooks/use-wearable';

export function NeuralHUD() {
    const { recentActions, suggestion, isHudExpanded, setIsHudExpanded } = useIntelligence();
    const { lastData, isConnected } = useWearable();
    const [isVisible, setIsVisible] = useState(false);

    // Auto-show when actions occur
    useEffect(() => {
        if (recentActions.length > 0) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                // If minimized, don't auto-hide, but maybe pulse?
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [recentActions]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-24 right-6 z-[60] pointer-events-none">
            <AnimatePresence>
                {!isHudExpanded ? (
                    <motion.button
                        key="minimized"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsHudExpanded(true)}
                        title="Expand Neural HUD"
                        className="pointer-events-auto w-12 h-12 rounded-full bg-black/80 border border-intel-gold/30 backdrop-blur-xl flex items-center justify-center group shadow-[0_0_20px_rgba(255,184,0,0.15)]"
                    >
                        <Brain className="w-6 h-6 text-intel-gold group-hover:scale-110 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-intel-gold text-black rounded-full text-[8px] font-black flex items-center justify-center">
                            {recentActions.length}
                        </div>
                    </motion.button>
                ) : (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                        className="pointer-events-auto w-80 bg-black/60 border border-white/10 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-2xl relative"
                    >
                        {/* Status Bar */}
                        <div className="bg-intel-gold/10 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-intel-gold animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Neural Stream Active</span>
                            </div>
                            <button onClick={() => setIsHudExpanded(false)} title="Minimize Neural HUD" className="text-white/40 hover:text-white transition-colors">
                                <ChevronRight size={14} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Biometric Link */}
                            {isConnected && lastData && (
                                <div className="space-y-3">
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Live Telemetry</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Heart className="w-3 h-3 text-red-500 animate-[pulse_1s_infinite]" />
                                                <span className="text-[8px] font-bold text-zinc-400">BPM</span>
                                            </div>
                                            <div className="text-xl font-black italic text-white">{lastData.heartRate}</div>
                                        </div>
                                        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Wind className="w-3 h-3 text-blue-400" />
                                                <span className="text-[8px] font-bold text-zinc-400">STRESS</span>
                                            </div>
                                            <div className="text-xl font-black italic text-white">{Math.round(lastData.stressLevel * 100)}<span className="text-xs">%</span></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recent Activity */}
                            <div className="space-y-3">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Recent Protocols</h4>
                                <div className="space-y-2">
                                    {recentActions.map((action, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-3 group"
                                        >
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-intel-gold/40 group-first:bg-intel-gold group-first:animate-ping" />
                                            <div className="text-[11px] font-bold text-white/80 leading-snug tracking-tight">
                                                {action}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {recentActions.length === 0 && (
                                        <p className="text-[10px] italic text-zinc-600">No active protocols detected...</p>
                                    )}
                                </div>
                            </div>

                            {/* Predictive Suggestion */}
                            {suggestion && (
                                <div className="pt-4 border-t border-white/5">
                                    <div className="bg-cyan-500/10 rounded-2xl p-4 border border-cyan-500/20 group cursor-pointer hover:bg-cyan-500/20 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-3 h-3 text-cyan-400" />
                                            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Neural Suggestion</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-white/90 leading-relaxed italic mb-3">
                                            "{suggestion.text}"
                                        </p>
                                        <div className="flex items-center justify-end text-[8px] font-black text-cyan-400 uppercase tracking-widest">
                                            {suggestion.action} <ChevronRight size={10} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Info */}
                        <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em]">Sovereign Link Stable</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
