"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Activity, Timer, RefreshCw, ChevronRight } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                Types & Stats                               */
/* -------------------------------------------------------------------------- */

type DrillType = 'working-memory' | 'inhibition' | 'flexibility';

interface DrillStats {
    score: number;
    streak: number;
    highScore: number;
    reactionTime: number[]; // ms
    focusScore: number; // 0-100 derived from consistency
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export default function CognitiveGym() {
    const [activeDrill, setActiveDrill] = useState<DrillType | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [stats, setStats] = useState<DrillStats>({
        score: 0,
        streak: 0,
        highScore: 0,
        reactionTime: [],
        focusScore: 85,
    });

    // --- Session State ---
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-950/20 to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
                {/* Neural Synapse Grid (Simulated with CSS) */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col h-screen">

                {/* --- HEADER --- */}
                <header className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Neural Architect</span>
                            <div className="h-px flex-1 w-12 bg-[#D4AF37]/50" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
                            <Brain className="w-8 h-8 text-indigo-500" />
                            COGNITIVE GYM
                        </h1>
                    </div>

                    <div className="flex items-center gap-8">
                        <StatBlock label="Focus Score" value={stats.focusScore} unit="%" icon={Activity} color="text-emerald-400" />
                        <StatBlock label="Session" value={formatTime(elapsedTime)} icon={Timer} color="text-blue-400" />
                        <StatBlock label="Streak" value={stats.streak} icon={Zap} color="text-[#D4AF37]" />
                    </div>
                </header>

                {/* --- MAIN ARENA --- */}
                <main className="flex-1 flex flex-col items-center justify-center relative">
                    <AnimatePresence mode='wait'>
                        {!activeDrill ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full max-w-5xl"
                            >
                                <h2 className="text-2xl font-bold mb-8 text-center text-zinc-400">Select Training Protocol</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <DrillCard
                                        type="working-memory"
                                        title="N-Back Challenge"
                                        desc="Enhance working memory capacity by tracking sequential patterns."
                                        onClick={() => setActiveDrill('working-memory')}
                                    />
                                    <DrillCard
                                        type="inhibition"
                                        title="Stroop Effect"
                                        desc="Train impulse control and inhibition by resolving conflict."
                                        onClick={() => setActiveDrill('inhibition')}
                                    />
                                    <DrillCard
                                        type="flexibility"
                                        title="Task Switching"
                                        desc="Improve cognitive flexibility by adapting to changing rules."
                                        onClick={() => setActiveDrill('flexibility')}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <ActiveDrillArena
                                type={activeDrill}
                                onExit={() => { setActiveDrill(null); setIsPlaying(false); }}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                score={stats.score}
                                onScore={(points) => setStats(prev => ({ ...prev, score: prev.score + points, streak: prev.streak + 1 }))}
                                onMiss={() => setStats(prev => ({ ...prev, streak: 0 }))}
                                onSwitchDrill={setActiveDrill}
                            />
                        )}
                    </AnimatePresence>
                </main>

            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Sub-Components                                */
/* -------------------------------------------------------------------------- */

function StatBlock({ label, value, unit, icon: Icon, color }: any) {
    return (
        <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                {label} <Icon className={`w-3 h-3 ${color}`} />
            </p>
            <p className="text-2xl font-black font-mono tracking-tight text-white">
                {value}<span className="text-sm text-zinc-600 ml-0.5">{unit}</span>
            </p>
        </div>
    );
}

function DrillCard({ type, title, desc, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-300 text-left hover:-translate-y-2 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/5 transition-all" />

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    {type === 'working-memory' && <Brain className="w-6 h-6 text-emerald-400" />}
                    {type === 'inhibition' && <Activity className="w-6 h-6 text-rose-400" />}
                    {type === 'flexibility' && <RefreshCw className="w-6 h-6 text-amber-400" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">{desc}</p>

                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                    Initialize Protocol <ChevronRight className="w-3 h-3 ml-1" />
                </div>
            </div>
        </button>
    );
}

/* -------------------------------------------------------------------------- */
/*                            Drill Implementations                           */
/* -------------------------------------------------------------------------- */

// --- STROOP MOCK ---
interface ActiveDrillArenaProps {
    type: DrillType;
    onExit: () => void;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    score: number;
    onScore: (points: number) => void;
    onMiss: () => void;
    onSwitchDrill: (drill: DrillType) => void;
}

const COLORS = [
    { name: 'RED', hex: '#ef4444' },
    { name: 'BLUE', hex: '#3b82f6' },
    { name: 'GREEN', hex: '#22c55e' },
    { name: 'YELLOW', hex: '#eab308' },
];

function ActiveDrillArena({ type, onExit, isPlaying, setIsPlaying, score, onScore, onMiss, onSwitchDrill }: ActiveDrillArenaProps) {
    const [currentStimulus, setCurrentStimulus] = useState<{ word: string, color: string } | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'miss' | null>(null);

    const generateStimulus = React.useCallback(() => {
        const word = COLORS[Math.floor(Math.random() * COLORS.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]; // Can be congruent or incongruent
        setCurrentStimulus({ word: word.name, color: color.hex });
    }, []);

    useEffect(() => {
        if (isPlaying && !currentStimulus) {
            generateStimulus();
        }
    }, [isPlaying, currentStimulus, generateStimulus]);

    const handleResponse = (selectedColor: string) => {
        if (!currentStimulus) return;

        // Stroop: Match the INK COLOR, not the word
        if (selectedColor === currentStimulus.color) {
            setFeedback('correct');
            onScore(100);
        } else {
            setFeedback('miss');
            onMiss();
        }

        setTimeout(() => {
            setFeedback(null);
            generateStimulus();
        }, 500);
    };

    if (!isPlaying) {
        return (
            <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Zap className="w-10 h-10 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Protocol Ready</h2>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                    {type === 'inhibition' && "Tap the button matching the INK COLOR of the word shown."}
                    {type === 'working-memory' && "Memorize the sequence. Tap when the current item matches 2 steps back."}
                    {type === 'flexibility' && "Sort the number by Even/Odd or High/Low depending on the rule color."}
                </p>
                <div className="flex gap-4 justify-center">
                    <button onClick={onExit} className="px-8 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5 text-sm font-bold uppercase tracking-wider">
                        Abort
                    </button>
                    <button onClick={() => setIsPlaying(true)} className="px-8 py-3 rounded-xl bg-[#D4AF37] text-black hover:bg-amber-400 text-sm font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20">
                        Start Session
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl text-center relative">
            <div className="absolute top-0 right-0 p-4 font-mono text-zinc-500">
                SCORE: <span className="text-white">{score}</span>
            </div>

            {/* FEEDBACK OVERLAY */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 font-black text-6xl uppercase tracking-tighter ${feedback === 'correct' ? 'text-emerald-500' : 'text-rose-500'}`}
                    >
                        {feedback === 'correct' ? 'EXCELLENT' : 'MISMATCH'}
                    </motion.div>
                )}
            </AnimatePresence>

            {type === 'inhibition' && currentStimulus && (
                <div className="py-20">
                    <motion.div
                        key={currentStimulus.word + currentStimulus.color}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-8xl font-black tracking-tighter mb-12 drop-shadow-2xl"
                        style={{ color: currentStimulus.color }}
                    >
                        {currentStimulus.word}
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {COLORS.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => handleResponse(c.hex)}
                                className="h-16 rounded-xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all font-bold tracking-widest text-zinc-300"
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Disclaimer for other modes in this mockup */}
            {(type === 'working-memory' || type === 'flexibility') && (
                <div className="py-20">
                    <p className="text-zinc-500 mb-8">Simulation Mode: Only 'Stroop Effect' is fully interactive in this demo.</p>
                    <button onClick={() => onSwitchDrill('inhibition')} className="text-indigo-400 hover:text-indigo-300 underline">Switch to Stroop</button>
                </div>
            )}

            <button onClick={onExit} className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest">
                End Session
            </button>
        </div>
    );
}
