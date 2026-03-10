'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, TrendingDown, ArrowRight, Gavel, AlertCircle } from 'lucide-react';
import { RoleplayEngine, ScenarioType, SimulationState, SimulationStep } from '@/lib/RoleplayEngine';
import { GlassCard } from '@/components/ui/Cinematic';
import { LeadershipScorecard } from './LeadershipScorecard';

const engine = RoleplayEngine.getInstance();

export default function ConflictSimulator() {
    const [gameState, setGameState] = useState<SimulationState | null>(null);
    const [currentStep, setCurrentStep] = useState<SimulationStep | null>(null);

    const startSim = (type: ScenarioType) => {
        const newState = engine.startSimulation(type);
        setGameState(newState);
        setCurrentStep(engine.getStep(type, 'start') || null);
    };

    const handleChoice = (choiceId: string) => {
        if (!gameState) return;
        const updatedState = engine.makeChoice(gameState, choiceId);
        setGameState(updatedState);
        // In a real scenario, we'd move to the next step, but here we complete.
    };

    if (!gameState) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-20">
                {(['BUDGET_CRISIS', 'SECURITY_BREACH', 'COMMUNITY_POLARIZATION', 'PEDAGOGICAL_SHIFT'] as ScenarioType[]).map((type) => (
                    <motion.div
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => startSim(type)}
                        className="cursor-pointer"
                    >
                        <GlassCard className="p-8 border-white/10 hover:border-intel-gold/40 transition-all text-left">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-intel-gold/20 rounded-2xl text-intel-gold">
                                    {type === 'BUDGET_CRISIS' ? <TrendingDown /> :
                                        type === 'SECURITY_BREACH' ? <Shield /> :
                                            type === 'COMMUNITY_POLARIZATION' ? <Gavel /> :
                                                <Zap />}
                                </div>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Available</span>
                            </div>
                            <h3 className="text-xl font-black text-white uppercase italic mb-2 tracking-tighter">
                                {engine.getScenarioTitle(type)}
                            </h3>
                            <p className="text-xs text-white/60 mb-8 font-inter leading-relaxed max-w-sm">
                                {type.replace('_', ' ')}: A critical narrative branch driven by real district data patterns.
                            </p>
                            <div className="flex items-center gap-2 text-intel-gold text-[10px] font-black uppercase tracking-widest">
                                Initialize <ArrowRight size={12} />
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (gameState.isCompleted) {
        return (
            <div className="max-w-4xl mx-auto py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <LeadershipScorecard
                        metrics={gameState.metrics}
                        scenarioTitle={engine.getScenarioTitle(gameState.type)}
                    />

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setGameState(null)}
                            className="bg-intel-gold text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-intel-gold/80 transition-colors shadow-lg shadow-intel-gold/20"
                        >
                            Review & Exit Terminal
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-20 relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 bg-intel-gold/20 flex-1 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-intel-gold"
                                initial={{ width: "0%" }}
                                animate={{ width: "50%" }}
                            />
                        </div>
                        <span className="text-[10px] font-mono text-intel-gold uppercase font-black tracking-widest">Simulation Active</span>
                    </div>

                    <div className="text-left mb-16">
                        <div className="flex items-center gap-2 text-intel-gold mb-4">
                            <AlertCircle size={16} />
                            <span className="text-[10px] uppercase font-black tracking-widest">Tactical Briefing</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tighter mb-6 italic">
                            {currentStep?.description}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentStep?.choices.map((choice) => (
                            <motion.button
                                key={choice.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleChoice(choice.id)}
                                className="p-8 bg-white/5 border border-white/10 rounded-2xl text-left group hover:border-intel-gold transition-all"
                            >
                                <h4 className="text-lg font-black text-white uppercase italic mb-2 group-hover:text-intel-gold transition-colors">{choice.text}</h4>
                                <div className="flex gap-4 mt-4">
                                    {Object.entries(choice.impact).map(([key, val]) => (
                                        <div key={key} className="flex items-center gap-1 opacity-40 group-hover:opacity-100">
                                            <span className={`text-[8px] font-black uppercase ${val > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {key[0]} {val > 0 ? '+' : ''}{val}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
