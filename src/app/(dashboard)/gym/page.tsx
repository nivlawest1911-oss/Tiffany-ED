'use client';

import { Dumbbell, Brain, Zap, Activity, Timer, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

export default function GymPage() {
    const zones = [
        { title: "Focus Crucible", description: "High-intensity attention training modules.", icon: <Target className="h-6 w-6 text-orange-400" /> },
        { title: "Logic Lab", description: "Complex problem-solving and algorithmic thinking.", icon: <Brain className="h-6 w-6 text-cyan-400" /> },
        { title: "Resilience Zone", description: "Stress-testing and cognitive endurance drills.", icon: <Activity className="h-6 w-6 text-emerald-400" /> },
        { title: "Memory Vault", description: "Advanced mnemonic and information retention training.", icon: <Timer className="h-6 w-6 text-purple-400" /> },
    ];

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
                className="max-w-4xl mb-16 relative z-10"
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
                    <Button size="lg" className="h-14 px-8 bg-white hover:bg-slate-200 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-white/5">
                        Start Workout
                    </Button>
                    <Button size="lg" variant="secondary" className="h-14 px-8 border border-white/10 bg-transparent hover:bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        Performance Stats
                    </Button>
                </div>
            </motion.div>

            {/* Zones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {zones.map((zone, idx) => (
                    <SmartHover key={idx} message={`Performance Zone: ${zone.description} Master these metrics to unlock cognitive dominance.`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <GlassCard className="p-8 h-full flex flex-col group cursor-pointer hover:border-white/20 transition-all">
                                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                                    {zone.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                    {zone.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    {zone.description}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                    Enter Zone <ChevronRight className="h-3 w-3" />
                                </div>
                            </GlassCard>
                        </motion.div>
                    </SmartHover>
                ))}
            </div>

            {/* Performance Bar */}
            <div className="mt-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Neural Readiness</span>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-orange-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                            <span className="text-xs font-bold text-white">85%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500 pointer-events-none">
                    <Zap className="h-3 w-3 text-yellow-500" /> Authorized Performance Monitoring Active
                </div>
            </div>
        </div>
    );
}

const Target = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);
