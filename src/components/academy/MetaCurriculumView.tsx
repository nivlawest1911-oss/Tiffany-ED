"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sliders,
    Target,
    BookOpen,
    ShieldCheck,
    Activity,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CurriculumEngine, LearningModule } from '@/lib/curriculum-engine';
import { useSovereignState } from '@/context/SovereignState';

export const MetaCurriculumView: React.FC = () => {
    const { onboardingData } = useSovereignState();
    const [modules, setModules] = useState<LearningModule[]>([]);
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const [rigor, setRigor] = useState(5);
    const [activeModule, setActiveModule] = useState<string | null>(null);

    const handleSynthesize = useCallback(async () => {
        if (!onboardingData) return;
        setIsSynthesizing(true);
        const engine = CurriculumEngine.getInstance();
        const synthesized = await engine.synthesizeCurriculum({
            districtName: onboardingData.districtName,
            objective: onboardingData.objective,
            rigor
        });
        setModules(synthesized);
        setIsSynthesizing(false);
    }, [onboardingData, rigor]);

    useEffect(() => {
        if (modules.length === 0 && onboardingData) {
            handleSynthesize();
        }
    }, [onboardingData, rigor, modules.length, handleSynthesize]);

    if (!onboardingData) return null;

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Meta-Curriculum Synthesis
                    </h2>
                    <p className="text-zinc-400">
                        Synthesizing objective-based learning pathways for {onboardingData.districtName || 'the District'}.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-xl border border-white/5">
                    <Sliders className="w-4 h-4 text-purple-400" />
                    <label htmlFor="rigor-slider" className="text-xs font-mono text-zinc-300 uppercase tracking-widest">Neural Rigor</label>
                    <input
                        id="rigor-slider"
                        type="range"
                        min="1"
                        max="10"
                        value={rigor}
                        onChange={(e) => setRigor(parseInt(e.target.value))}
                        className="w-32 accent-purple-500"
                        title="Adjust Neural Rigor"
                    />
                    <span className="text-lg font-bold text-white w-4">{rigor}</span>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {isSynthesizing ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[400px] flex flex-col items-center justify-center space-y-4"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                                borderRadius: ["20%", "50%", "20%"]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                        >
                            <Cpu className="w-10 h-10 text-white" />
                        </motion.div>
                        <p className="text-xl font-light text-zinc-200 animate-pulse">Scanning Alabama Institutional Registry...</p>
                        <div className="flex gap-2">
                            {['ARI', 'AMSTI', 'ALEX', 'ALSDE'].map((tag) => (
                                <span key={tag} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded">
                                    {tag}_GROUNDING
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {modules.map((module) => (
                            <GlassCard
                                key={module.id}
                                className={`transition-all duration-300 ${activeModule === module.id ? 'ring-2 ring-purple-500' : ''}`}
                                onClick={() => setActiveModule(module.id)}
                            >
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <BookOpen className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 uppercase">
                                            <Activity className="w-3 h-3" />
                                            Rigor Level: {module.rigor}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                                        <p className="text-sm text-zinc-400 line-clamp-2 mt-1">{module.description}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Objectives</span>
                                        <ul className="space-y-1">
                                            {module.objectives.slice(0, 2).map((obj, i) => (
                                                <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                                                    <Target className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                                                    {obj}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-white/5">
                                        <div className="flex gap-1">
                                            {module.standards.slice(0, 2).map((std) => (
                                                <span key={std} className="text-[8px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-white/5">
                                                    {std}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                            Launch Module <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <GlassCard className="bg-purple-900/10 border-purple-500/20">
                <div className="p-4 flex items-center gap-4">
                    <ShieldCheck className="w-8 h-8 text-purple-500" />
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tighter">Sovereign Compliance Layer</h4>
                        <p className="text-[10px] text-zinc-400">
                            All synthesized content is automatically audited against Chapter 290 and Section 16 of the Alabama Administrative Code.
                        </p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};
