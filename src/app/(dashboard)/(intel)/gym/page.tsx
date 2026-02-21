'use client';

import { useState } from 'react';
import { Dumbbell, Brain, Activity, Timer, Target, Zap, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

const ZONES = [
    { id: 1, title: "Focus Crucible", description: "High-intensity attention training modules.", icon: <Target className="h-6 w-6 text-orange-400" /> },
    { id: 2, title: "Logic Lab", description: "Complex problem-solving and algorithmic thinking.", icon: <Brain className="h-6 w-6 text-cyan-400" /> },
    { id: 3, title: "Resilience Zone", description: "Stress-testing and cognitive endurance drills.", icon: <Activity className="h-6 w-6 text-emerald-400" /> },
    { id: 4, title: "Memory Vault", description: "Advanced mnemonic and information retention training.", icon: <Timer className="h-6 w-6 text-purple-400" /> },
];

export default function GymPage() {
    const [isSprintActive, setIsSprintActive] = useState(false);

    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Gymnasium
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-12 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">
                        Cognitive Performance Lab
                    </span>
                </div>

                <SmartHover message="Cognitive Gym: Push the limits of your intellectual capacity through high-intensity neuro-performance training.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Push the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">Limits</span> of Thought.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    The Cognitive Gym is where neuro-plasticity meets tactical execution. Train your mind to thrive under the pressures of sovereign leadership.
                </p>

                <div className="flex flex-wrap gap-4">
                    <Button
                        size="lg"
                        onClick={() => setIsSprintActive(true)}
                        className="h-14 px-8 bg-white hover:bg-slate-200 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-white/5"
                    >
                        Initialize Logic Sprint
                    </Button>
                    <Button size="lg" variant="secondary" className="h-14 px-8 border border-white/10 bg-transparent hover:bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        Performance Analytics
                    </Button>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Zones Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ZONES.map((zone, idx) => (
                        <SmartHover key={zone.id} message={zone.description}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <GlassCard className="p-6 h-full flex items-center gap-6 group cursor-pointer hover:border-orange-500/20 transition-all">
                                    <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                        {zone.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                                            {zone.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                            {zone.description}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </SmartHover>
                    ))}
                </div>

                {/* Performance Sidebar */}
                <div className="space-y-6">
                    <GlassCard className="p-8 border-orange-500/10">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-orange-400 flex items-center gap-2">
                                <Zap className="h-4 w-4" /> Neural Readiness
                            </h4>
                            <span className="text-xl font-black text-white">85%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-6">
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-cyan-500/10 rounded-lg text-cyan-400">
                                        <Brain size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300">Logic Accuracy</span>
                                </div>
                                <span className="text-xs font-black text-white">94%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-400">
                                        <Timer size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300">Reaction Velocity</span>
                                </div>
                                <span className="text-xs font-black text-white">120ms</span>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-8 bg-orange-500/5 group">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Sovereign Daily Ritual</h4>
                        <p className="text-sm font-bold text-white mb-6 italic leading-relaxed">
                            "The mind is a muscle that must be stressed to sustain sovereignty."
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Trophy size={14} className="text-yellow-500" /> New Personal Record Available
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Logic Sprint Overlay */}
            <AnimatePresence>
                {isSprintActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-black/80"
                    >
                        <GlassCard className="max-w-xl w-full p-12 border-orange-500/30 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 30, ease: 'linear' }}
                                    className="h-full bg-orange-500"
                                />
                            </div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Logic Sprint Active</h2>
                                <p className="text-slate-400 font-medium">Solve the architecture following pattern...</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-white/5">
                                <div className="flex justify-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-orange-500/20 border border-orange-500/30" />
                                    <div className="h-12 w-12 rounded-xl bg-slate-800" />
                                    <div className="h-12 w-12 rounded-xl bg-orange-500/20 border border-orange-500/30" />
                                    <div className="h-12 w-12 rounded-xl bg-slate-800" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Sequencing Institutional Logic</p>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    className="flex-1 h-12 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-200"
                                    onClick={() => setIsSprintActive(false)}
                                >
                                    Submit Solution
                                </Button>
                                <button
                                    className="px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                                    onClick={() => setIsSprintActive(false)}
                                >
                                    Terminate
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
