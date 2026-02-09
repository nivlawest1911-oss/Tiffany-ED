'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ShieldCheck, Zap, Activity, Cpu } from 'lucide-react';

interface NeuralSynthesisHUDProps {
    isActive: boolean;
    phase: 'ingestion' | 'alignment' | 'selection' | 'ready';
    strategies?: string[];
    complianceScore?: number;
}

export const NeuralSynthesisHUD: React.FC<NeuralSynthesisHUDProps> = ({
    isActive,
    phase,
    strategies = ["Baseline Operational Scaffolding", "Risk-Mitigated Intervention", "Sovereign Growth Protocol"],
    complianceScore = 98.7
}) => {
    const [scannedLines, setScannedLines] = useState<string[]>([]);

    useEffect(() => {
        if (isActive) {
            const lines = [
                "INTEL_CORE: Initializing quantum handshake...",
                "VAULT_LINK: Retrieving Alabama statutes...",
                "NEURAL_GRID: Mapping K-12 performance vectors...",
                "ETHIC_CORE: Verifying parental rights alignment...",
                "SYNTAX_ENGINE: Generating high-entropy response..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                setScannedLines(prev => [...prev.slice(-4), lines[i]]);
                i = (i + 1) % lines.length;
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-xl border border-white/5 overflow-hidden">
            {/* Background Neural Grid Animation */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full grid grid-cols-12 grid-rows-12 gap-px bg-white/5">
                    {[...Array(144)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.1, 0.4, 0.1] }}
                            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                            className="bg-white/20"
                        />
                    ))}
                </div>
            </div>

            <div className="w-full max-w-4xl space-y-8 relative z-50">
                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tighter text-white uppercase italic font-heading">Neural Synthesis Phase</h2>
                            <div className="flex items-center gap-2">
                                <Activity className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Sync Status: Optimal</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-3xl font-black text-emerald-400 font-heading tabular-nums">{complianceScore}%</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Compliance Confidence</div>
                    </div>
                </div>

                {/* Progress Visualizer */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: 'ingestion', label: 'Data Ingestion', icon: Cpu, color: 'text-blue-400' },
                        { id: 'alignment', label: 'Ethical Alignment', icon: ShieldCheck, color: 'text-amber-400' },
                        { id: 'selection', label: 'Strategic Selection', icon: Zap, color: 'text-emerald-400' }
                    ].map((step, _idx) => (
                        <div
                            key={step.id}
                            className={`p-4 rounded-xl border transition-all duration-500 ${phase === step.id ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/5 opacity-50'
                                }`}
                        >
                            <step.icon className={`w-5 h-5 mb-2 ${step.color}`} />
                            <div className="text-xs font-bold text-white uppercase tracking-wider">{step.label}</div>
                            {phase === step.id && (
                                <motion.div
                                    className="h-1 bg-white/30 mt-2 rounded-full overflow-hidden"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2 }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Strategy Evaluation Stack */}
                <div className="space-y-4">
                    <h3 className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-mono">Strategy Evaluation Engine</h3>
                    <div className="space-y-2">
                        {strategies.map((strategy, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <span className="text-[10px] font-mono text-zinc-600">00{i + 1}</span>
                                <span className="text-sm font-bold text-zinc-200">{strategy}</span>
                                {i === 2 && phase === 'selection' && (
                                    <span className="ml-auto text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full font-black">SELECTED</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Diagnostic Feed */}
                <div className="p-4 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px] h-24 overflow-hidden">
                    <AnimatePresence>
                        {scannedLines.map((line, _idx) => (
                            <motion.div
                                key={_idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-zinc-500 mb-1"
                            >
                                <span className="text-blue-500/50">[{new Date().toLocaleTimeString()}]</span> {line}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
