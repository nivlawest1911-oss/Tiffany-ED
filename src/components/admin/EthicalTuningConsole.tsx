'use client';

import { motion } from 'framer-motion';
import { Zap, Brain, MessageSquare, ShieldCheck, Heart, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, EthicalTuning } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function EthicalTuningConsole() {
    const [tuning, setTuning] = useState<EthicalTuning>(engine.getEthicalTuning());
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setTuning(engine.getEthicalTuning());
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setTuning({ ...tuning, lastUpdated: new Date() });
        }, 1500);
    };

    return (
        <GlassCard className="p-8 border-amber-500/10 bg-amber-500/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-amber-500 tracking-widest uppercase flex items-center gap-3">
                        Ethical Tuning Console
                        <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            <span className="text-[10px] text-amber-500 font-black tracking-widest">BEHAVIORAL OVERRIDE</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Swarm Personality Calibration</p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                    <Brain size={20} fill="currentColor" />
                </div>
            </div>

            <div className="space-y-8">
                {/* Creativity vs Factuality Slider */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Zap size={14} className="text-amber-400" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Inference mode</span>
                        </div>
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase">Ratio: {tuning.creativityVsFactuality}% FACTUALITY</span>
                    </div>
                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden group">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-emerald-500"
                            animate={{ width: `${tuning.creativityVsFactuality}%` }}
                            transition={{ duration: 0.5 }}
                        />
                        <input 
                            type="range"
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                            min="0"
                            max="100"
                            value={tuning.creativityVsFactuality}
                            onChange={(e) => setTuning({ ...tuning, creativityVsFactuality: parseInt(e.target.value) })}
                            aria-label="Adjust Creativity vs Factuality"
                            title="Creativity vs Factuality"
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600">
                        <span>Creative Resonance</span>
                        <span>Absolute Factuality</span>
                    </div>
                </div>

                {/* Tone Selector */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <MessageSquare size={14} className="text-blue-400" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Interface Tone</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {['AUTHORITATIVE', 'COLLABORATIVE', 'NEUTRAL'].map((tone) => (
                            <button
                                key={tone}
                                onClick={() => setTuning({ ...tuning, tonePersona: tone as any })}
                                className={`py-4 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                                    tuning.tonePersona === tone 
                                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-400 shadow-lg shadow-blue-900/20' 
                                    : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:border-white/10 hover:text-white'
                                }`}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Compliance Sensitivity */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Guardrail Sensitivity</span>
                        </div>
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase">Level: {tuning.complianceSensitivity}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden group">
                        <motion.div 
                            className="absolute inset-0 bg-emerald-500"
                            animate={{ width: `${tuning.complianceSensitivity}%` }}
                            transition={{ duration: 0.5 }}
                        />
                        <input 
                            type="range"
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                            min="0"
                            max="100"
                            value={tuning.complianceSensitivity}
                            onChange={(e) => setTuning({ ...tuning, complianceSensitivity: parseInt(e.target.value) })}
                            aria-label="Adjust Compliance Sensitivity"
                            title="Compliance Sensitivity"
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600">
                        <span>Permissive</span>
                        <span>Zero Tolerance (SOC2+)</span>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/20 active:scale-95 transition-all overflow-hidden flex items-center justify-center gap-3 group px-8"
                >
                    {isSaving ? (
                        <RefreshCw size={14} className="animate-spin text-amber-500" />
                    ) : (
                        <Heart size={14} className="text-rose-500 group-hover:scale-125 transition-transform" />
                    )}
                    <span>{isSaving ? 'Syncing Swarm Behavior...' : 'Commit Ethical Preset'}</span>
                </button>
                <div className="flex items-center justify-between text-[8px] font-mono text-zinc-600 uppercase tracking-widest px-2">
                    <span>Last Calibration: {tuning.lastUpdated.toLocaleDateString()}</span>
                    <span>Hash: 0xETH_CAL_9B0</span>
                </div>
            </div>
        </GlassCard>
    );
}
