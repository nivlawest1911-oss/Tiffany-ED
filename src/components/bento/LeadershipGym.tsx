'use client';
import { useState, useEffect, useCallback } from 'react';
import {
    Brain,
    Zap,
    Target,
    Trophy,
    Clock,
    ShieldCheck,
    Activity,
    Heart,
    Users,
    AlertCircle,
    RefreshCw,
    Eye,
    Cpu,
    ZapOff
} from 'lucide-react';

type GameMode = 'memory' | 'inhibition' | 'logic' | 'speed';

export default function LeadershipGym({ onXPAction }: { onXPAction?: (amount: number) => void }) {
    const [mode, setMode] = useState<GameMode>('memory');
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(30);

    // Memory Game State
    const [sequence, setSequence] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const [isFlashing, setIsFlashing] = useState(false);
    const [activeColor, setActiveColor] = useState<number | null>(null);

    // Inhibition Game State
    const [stroopWord, setStroopWord] = useState('');
    const [stroopColor, setStroopColor] = useState('');

    // Speed Game State
    const [mathProblem, setMathProblem] = useState({ q: '', a: 0 });
    const [mathOptions, setMathOptions] = useState<number[]>([]);

    // Logic Game State
    const [pattern, setPattern] = useState<number[]>([]);
    const [patternMissing, setPatternMissing] = useState(0);
    const [patternOptions, setPatternOptions] = useState<number[]>([]);

    const colors = [
        { id: 0, name: 'Red', bg: 'bg-red-500', text: 'text-red-500' },
        { id: 1, name: 'Blue', bg: 'bg-blue-500', text: 'text-blue-500' },
        { id: 2, name: 'Green', bg: 'bg-green-500', text: 'text-green-500' },
        { id: 3, name: 'Yellow', bg: 'bg-yellow-500', text: 'text-yellow-500' }
    ];

    const startNewRound = useCallback(() => {
        if (mode === 'memory') {
            const newLength = 2 + level;
            const newSeq = Array.from({ length: newLength }, () => Math.floor(Math.random() * 4));
            setSequence(newSeq);
            setUserInput([]);
            flashSequence(newSeq);
        } else if (mode === 'inhibition') {
            const wordIdx = Math.floor(Math.random() * 4);
            const colorIdx = Math.floor(Math.random() * 4);
            setStroopWord(colors[wordIdx].name);
            setStroopColor(colors[colorIdx].bg);
        } else if (mode === 'speed') {
            const a = Math.floor(Math.random() * (level * 5)) + 1;
            const b = Math.floor(Math.random() * (level * 5)) + 1;
            const ans = a + b;
            setMathProblem({ q: `${a} + ${b}`, a: ans });
            const options = [ans, ans + 1, ans - 1, ans + 2].sort(() => Math.random() - 0.5);
            setMathOptions(options);
        } else if (mode === 'logic') {
            const start = Math.floor(Math.random() * 10);
            const step = Math.floor(Math.random() * 5) + 1;
            const fullPattern = [start, start + step, start + (step * 2), start + (step * 3)];
            const missingIdx = Math.floor(Math.random() * 4);
            const missingVal = fullPattern[missingIdx];

            setPattern(fullPattern);
            setPatternMissing(missingIdx);

            const options = [missingVal, missingVal + 1, missingVal - 1, missingVal + step].sort(() => Math.random() - 0.5);
            setPatternOptions(options);
        }
    }, [mode, level]);

    const flashSequence = async (seq: number[]) => {
        setIsFlashing(true);
        for (const colorId of seq) {
            setActiveColor(colorId);
            await new Promise(r => setTimeout(r, 600));
            setActiveColor(null);
            await new Promise(r => setTimeout(r, 200));
        }
        setIsFlashing(false);
    };

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setLevel(1);
        setTimeLeft(30);
        startNewRound();
    };

    const handleInput = (val: any) => {
        if (!gameActive || isFlashing) return;

        if (mode === 'memory') {
            const colorId = val as number;
            const newInput = [...userInput, colorId];
            setUserInput(newInput);
            if (colorId !== sequence[newInput.length - 1]) {
                setGameActive(false);
            } else if (newInput.length === sequence.length) {
                setScore(score + 10);
                setLevel(level + 1);
                setTimeout(startNewRound, 500);
            }
        } else if (mode === 'inhibition') {
            const selectedColorName = val as string;
            // The goal is to click the word, or the color? Let's say click the COLOR of the text.
            const colorName = colors.find(c => c.bg === stroopColor)?.name;
            if (selectedColorName === colorName) {
                setScore(score + 5);
                startNewRound();
            } else {
                setScore(Math.max(0, score - 2));
                startNewRound();
            }
        } else if (mode === 'speed') {
            if (val === mathProblem.a) {
                setScore(score + 5);
                if (score > 0 && score % 20 === 0) setLevel(level + 1);
                startNewRound();
            } else {
                setScore(Math.max(0, score - 2));
                startNewRound();
            }
        } else if (mode === 'logic') {
            if (val === pattern[patternMissing]) {
                setScore(score + 15);
                startNewRound();
                if (onXPAction) onXPAction(2);
            } else {
                setScore(Math.max(0, score - 5));
                startNewRound();
            }
        }
    };

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameActive(false);
        }
    }, [gameActive, timeLeft]);

    return (
        <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-cyan-950 to-zinc-950 text-white shadow-3xl border border-cyan-900/50 relative overflow-hidden group">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-3xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shadow-xl shadow-cyan-900/20">
                            <Brain className="text-cyan-400" size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter">Leadership Workout</h2>
                            <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Mental Performance Exercises</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center min-w-[80px]">
                            <div className="text-2xl font-black text-yellow-400 leading-none mb-1">{score}</div>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Score</div>
                        </div>
                        <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-center min-w-[80px]">
                            <div className="text-2xl font-black text-purple-400 leading-none mb-1">{level}</div>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stage</div>
                        </div>
                    </div>
                </div>

                {/* Mode Selector */}
                <div className="grid grid-cols-4 gap-3 mb-10">
                    {[
                        { id: 'memory', label: 'Retention', icon: <Cpu size={16} /> },
                        { id: 'inhibition', label: 'Focus Check', icon: <ZapOff size={16} /> },
                        { id: 'speed', label: 'Quick Math', icon: <Zap size={16} /> },
                        { id: 'logic', label: 'Pattern Finder', icon: <Eye size={16} /> }
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => { setMode(m.id as GameMode); setGameActive(false); }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${mode === m.id
                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-900/20'
                                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                        >
                            {m.icon}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-center">{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* Game Area */}
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 rounded-[2rem] bg-black/40 border border-zinc-900 relative">
                    {!gameActive ? (
                        <div className="text-center space-y-6">
                            <h3 className="text-xl font-bold text-zinc-300">
                                {mode === 'memory' && "Sequence Mastery"}
                                {mode === 'inhibition' && "Color Challenge"}
                                {mode === 'speed' && "Math Sprints"}
                                {mode === 'logic' && "Pattern Match"}
                            </h3>
                            <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                                {mode === 'memory' && "Improve your working memory by recalling increasing sequences."}
                                {mode === 'inhibition' && "Click the NAME of the color, ignoring the text color. Improves decision making."}
                                {mode === 'speed' && "Solve rapid math equations to increase processing speed."}
                                {mode === 'logic' && "Identify the missing piece of the pattern. Improves abstract reasoning."}
                            </p>
                            <button
                                onClick={startGame}
                                className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-cyan-900/40 hover:scale-105 transition-all flex items-center gap-3 mx-auto relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <RefreshCw size={18} />
                                    Start Workout
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <div className="absolute top-6 right-8 flex items-center gap-2 text-orange-500">
                                <Clock size={18} />
                                <span className="text-2xl font-black font-mono">{timeLeft}s</span>
                            </div>

                            {mode === 'memory' && (
                                <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                                    {colors.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => handleInput(c.id)}
                                            className={`h-24 rounded-3xl transition-all transform active:scale-95 border-4 ${activeColor === c.id ? `bg-white border-white scale-110` : `${c.bg} border-transparent opacity-60`
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {mode === 'inhibition' && (
                                <div className="text-center space-y-12">
                                    <div className="text-7xl font-black uppercase tracking-tighter p-4 transition-all duration-300">
                                        <span className={stroopColor.replace('bg-', 'text-')}>{stroopWord}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {colors.map((c) => (
                                            <button
                                                key={c.id}
                                                onClick={() => handleInput(c.name)}
                                                className="px-8 py-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm font-bold hover:bg-zinc-800 hover:border-cyan-500/50 transition-all uppercase tracking-[0.2em] shadow-lg"
                                            >
                                                {c.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {mode === 'speed' && (
                                <div className="text-center space-y-12">
                                    <div className="text-7xl font-black text-cyan-400 font-mono tracking-tighter">
                                        {mathProblem.q}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {mathOptions.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleInput(opt)}
                                                className="px-10 py-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl font-black hover:bg-zinc-800 transition-all text-zinc-300"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {mode === 'logic' && (
                                <div className="text-center space-y-12">
                                    <div className="flex items-center gap-6 justify-center">
                                        {pattern.map((p, i) => (
                                            <div key={i} className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black ${i === patternMissing ? 'bg-zinc-800 border-2 border-dashed border-cyan-500/50 text-cyan-500 animate-pulse' : 'bg-zinc-900 border border-white/5 text-white'}`}>
                                                {i === patternMissing ? '?' : p}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                                        {patternOptions.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleInput(opt)}
                                                className="px-8 py-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xl font-black hover:border-cyan-500 transition-all"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Dashboard Stats */}
                <div className="mt-10 grid grid-cols-3 gap-6">
                    <StatItem label="Impulse Control" value="+42%" icon={<Target size={14} />} color="text-emerald-400" />
                    <StatItem label="Working Memory" value="+67%" icon={<Brain size={14} />} color="text-cyan-400" />
                    <StatItem label="Reaction Speed" value="-120ms" icon={<Zap size={14} />} color="text-orange-400" />
                </div>

                {/* Professional Centers Grid */}
                <div className="mt-12">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center">Stakeholder Cognitive Hubs</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <TrainingCenter title="Student Focus" description="Executive function & recall" color="cyan" icon={<Brain size={14} />} />
                        <TrainingCenter title="Teacher Guard" description="Burnout shield & focus" color="blue" icon={<ShieldCheck size={14} />} />
                        <TrainingCenter title="Admin Vision" description="Strategic decision velocity" color="purple" icon={<Target size={14} />} />
                        <TrainingCenter title="Parent Sync" description="Cognitive patience & calm" color="orange" icon={<Heart size={14} />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col items-center">
            <div className={`mb-2 ${color} opacity-80`}>{icon}</div>
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function TrainingCenter({ title, description, color, icon }: { title: string, description: string, color: string, icon: React.ReactNode }) {
    const colorClasses: Record<string, string> = {
        cyan: 'border-cyan-500/20 hover:border-cyan-500/50 bg-cyan-500/5',
        blue: 'border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5',
        purple: 'border-purple-500/20 hover:border-purple-500/50 bg-purple-500/5',
        orange: 'border-orange-500/20 hover:border-orange-500/50 bg-orange-500/5',
    };

    return (
        <button className={`p-4 rounded-2xl border ${colorClasses[color]} transition-all text-left group overflow-hidden relative`}>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="opacity-60 group-hover:opacity-100 transition-opacity">{icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{title}</span>
                </div>
                <p className="text-[9px] text-zinc-500 leading-tight group-hover:text-zinc-300 transition-colors">{description}</p>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-400/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}
