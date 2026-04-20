"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Zap, Activity, Timer, RefreshCw, ChevronRight, Sparkles, Loader2, Shield, Copy,
    CheckCircle2, AlertCircle
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

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

    // --- AI Protocol State ---
    const [stressContext, setStressContext] = useState("");
    const [neuroBase, setNeuroBase] = useState("Balanced");
    const [loadPreference, setLoadPreference] = useState("High");
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiProtocol, setAiProtocol] = useState<string | null>(null);

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

    const handleGenerateProtocol = async () => {
        if (!stressContext.trim()) {
            toast.error("Stress Context Required", {
                description: "The Verse protocol necessitates a functional context for cognitive synthesis."
            });
            return;
        }

        setIsGenerating(true);
        setAiProtocol("");

        try {
            const res = await fetch('/api/generate/cognitive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentState: stressContext,
                    neuroBase,
                    loadPreference
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Neural Link Interrupted');

            setAiProtocol(data.content);
            toast.success("Intelligence Synthesized", {
                description: "Your optimized Neural Resilience Protocol is ready."
            });
        } catch (error: any) {
            console.error('Generation failure:', error);
            toast.error("Synthesis Failed", {
                description: error.message
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-950/20 to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
                {/* Neural Synapse Grid (Simulated with CSS) */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-opacity%3D%22.05%22%2F%3E%3C%2Fsvg%3E')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />
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
                <div className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto custom-scrollbar pb-20">
                    <AnimatePresence mode='wait'>
                        {!activeDrill ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full max-w-6xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left: Drill Selection */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <h2 className="text-2xl font-black mb-8 text-white uppercase tracking-tighter flex items-center gap-2">
                                            <Zap className="w-6 h-6 text-amber-500" />
                                            Active Training Protocols
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                                        {/* Strategic Protocol Response Area */}
                                        {aiProtocol && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="mt-12 p-8 rounded-[2rem] bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-xl relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                                    <Shield size={120} className="text-white" />
                                                </div>
                                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                                            <Activity className="w-6 h-6 text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-black text-white leading-none mb-1">STRATEGIC NEURAL PROTOCOL</h3>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Authorized by Verse â€¢ Chief of Neuro-Resilience</p>
                                                                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] text-emerald-400 font-black uppercase tracking-tighter">
                                                                    <CheckCircle2 size={8} />
                                                                    Clinically Verified
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(aiProtocol);
                                                                toast.success("Protocol copied to clipboard");
                                                            }}
                                                            className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-colors"
                                                        >
                                                            <Copy size={12} />
                                                            Copy
                                                        </button>
                                                        <button
                                                            onClick={() => setAiProtocol(null)}
                                                            className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors"
                                                        >
                                                            Dismiss
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 font-medium leading-relaxed font-sans">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {aiProtocol}
                                                    </ReactMarkdown>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Right: AI Synthesis Panel */}
                                    <div className="space-y-6">
                                        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden h-fit">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Sparkles className="w-3 h-3" />
                                                        Verse Synthesis
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 italic">Neural Resilience Generator</h3>
                                                <p className="text-xs text-zinc-500 mb-8 leading-relaxed font-semibold uppercase tracking-wide">Synthesize a custom cognitive protocol based on real-time neural load.</p>

                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block">Current Stress Context</label>
                                                        <textarea
                                                            value={stressContext}
                                                            onChange={(e) => setStressContext(e.target.value)}
                                                            placeholder="e.g., High-stakes board meeting, systemic resource constraints, multiple conflicting deadlines..."
                                                            className="w-full h-32 bg-black/50 border border-white/10 rounded-2xl p-4 text-xs text-white placeholder:text-zinc-700 focus:border-indigo-500/50 focus:outline-none transition-all resize-none font-medium"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block text-center">Neuro Base</label>
                                                            <select
                                                                value={neuroBase}
                                                                onChange={(e) => setNeuroBase(e.target.value)}
                                                                title="Neuro-Biological Base State"
                                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-[11px] font-bold text-white focus:border-indigo-500/50 outline-none appearance-none"
                                                            >
                                                                <option>Balanced</option>
                                                                <option>Sympathetic High</option>
                                                                <option>Parasympathetic Low</option>
                                                                <option>Exhausted</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block text-center">Target Load</label>
                                                            <select
                                                                value={loadPreference}
                                                                onChange={(e) => setLoadPreference(e.target.value)}
                                                                title="Target Cognitive Load"
                                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-[11px] font-bold text-white focus:border-indigo-500/50 outline-none appearance-none"
                                                            >
                                                                <option>Low (Recovery)</option>
                                                                <option>Moderate</option>
                                                                <option>High (Growth)</option>
                                                                <option>Peak Performance</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleGenerateProtocol}
                                                        disabled={isGenerating || !stressContext}
                                                        className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3 active:scale-95 group"
                                                    >
                                                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4 group-hover:animate-pulse" />}
                                                        {isGenerating ? "Synthesizing..." : "Execute Protocol"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Recap Card */}
                                        <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                <AlertCircle className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mb-0.5">Focus State</p>
                                                <h4 className="text-sm font-black text-emerald-500 uppercase tracking-tight italic">Optimized (Zone 1)</h4>
                                            </div>
                                        </div>
                                    </div>
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
                </div>

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

function ActiveDrillArena({ type, onExit, isPlaying, setIsPlaying, score, onScore, onMiss, onSwitchDrill: _onSwitchDrill }: ActiveDrillArenaProps) {
    const [currentStimulus, setCurrentStimulus] = useState<any>(null);
    const [feedback, setFeedback] = useState<'correct' | 'miss' | null>(null);
    const [nBackSequence, setNBackSequence] = useState<string[]>([]);
    const [taskSwitchRule, setTaskSwitchRule] = useState<'even-odd' | 'lo-hi'>('even-odd');

    const generateStimulus = React.useCallback(() => {
        if (type === 'inhibition') {
            const word = COLORS[Math.floor(Math.random() * COLORS.length)];
            const color = COLORS[Math.floor(Math.random() * COLORS.length)]; // Can be congruent or incongruent
            setCurrentStimulus({ word: word.name, color: color.hex });
        } else if (type === 'working-memory') {
            const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
            const newLetter = letters[Math.floor(Math.random() * letters.length)];
            setNBackSequence(prev => [...prev.slice(-5), newLetter]);
            setCurrentStimulus(newLetter);
        } else if (type === 'flexibility') {
            const num = Math.floor(Math.random() * 9) + 1;
            const newRule = Math.random() > 0.5 ? 'even-odd' : 'lo-hi';
            setTaskSwitchRule(newRule);
            setCurrentStimulus(num);
        }
    }, [type]);

    useEffect(() => {
        if (isPlaying && !currentStimulus) {
            generateStimulus();
        }
    }, [isPlaying, currentStimulus, generateStimulus, type]);

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

            {type === 'inhibition' && currentStimulus && typeof currentStimulus === 'object' && (
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

            {type === 'working-memory' && currentStimulus && (
                <div className="py-20 text-center">
                    <motion.div
                        key={nBackSequence.length}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-9xl font-black text-white mb-12"
                    >
                        {currentStimulus}
                    </motion.div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                const isMatch = nBackSequence.length >= 3 && nBackSequence[nBackSequence.length - 1] === nBackSequence[nBackSequence.length - 3];
                                if (isMatch) {
                                    setFeedback('correct');
                                    onScore(150);
                                } else {
                                    setFeedback('miss');
                                    onMiss();
                                }
                                setTimeout(() => { setFeedback(null); generateStimulus(); }, 500);
                            }}
                            className="px-12 py-6 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xl uppercase tracking-tighter"
                        >
                            Match (2-Back)
                        </button>
                        <button
                            onClick={() => {
                                const isMatch = nBackSequence.length >= 3 && nBackSequence[nBackSequence.length - 1] === nBackSequence[nBackSequence.length - 3];
                                if (!isMatch) {
                                    setFeedback('correct');
                                    onScore(50);
                                } else {
                                    setFeedback('miss');
                                    onMiss();
                                }
                                setTimeout(() => { setFeedback(null); generateStimulus(); }, 500);
                            }}
                            className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xl uppercase tracking-tighter"
                        >
                            No Match
                        </button>
                    </div>
                    <p className="mt-8 text-zinc-500 text-xs uppercase tracking-widest font-bold">Sequence depth: {nBackSequence.length}</p>
                </div>
            )}

            {type === 'flexibility' && currentStimulus && (
                <div className="py-16 text-center">
                    <div className={`inline-block px-6 py-2 rounded-full mb-8 text-xs font-black uppercase tracking-widest border ${taskSwitchRule === 'even-odd' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'}`}>
                        Rule: {taskSwitchRule === 'even-odd' ? 'Even or Odd?' : 'High or Low? (>5)'}
                    </div>

                    <motion.div
                        key={currentStimulus + taskSwitchRule}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-9xl font-black text-white mb-12"
                    >
                        {currentStimulus}
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <button
                            onClick={() => {
                                const isCorrect = taskSwitchRule === 'even-odd' ? (currentStimulus % 2 === 0) : (currentStimulus > 5);
                                if (isCorrect) {
                                    setFeedback('correct');
                                    onScore(120);
                                } else {
                                    setFeedback('miss');
                                    onMiss();
                                }
                                setTimeout(() => { setFeedback(null); generateStimulus(); }, 500);
                            }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-noble-gold/30 hover:bg-noble-gold/5 text-white font-bold"
                        >
                            {taskSwitchRule === 'even-odd' ? 'EVEN' : 'HIGH (>5)'}
                        </button>
                        <button
                            onClick={() => {
                                const isCorrect = taskSwitchRule === 'even-odd' ? (currentStimulus % 2 !== 0) : (currentStimulus <= 5);
                                if (isCorrect) {
                                    setFeedback('correct');
                                    onScore(120);
                                } else {
                                    setFeedback('miss');
                                    onMiss();
                                }
                                setTimeout(() => { setFeedback(null); generateStimulus(); }, 500);
                            }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-noble-gold/30 hover:bg-noble-gold/5 text-white font-bold"
                        >
                            {taskSwitchRule === 'even-odd' ? 'ODD' : 'LOW (â‰¤5)'}
                        </button>
                    </div>
                </div>
            )}

            <button onClick={onExit} className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest">
                End Session
            </button>
        </div>
    );
}
