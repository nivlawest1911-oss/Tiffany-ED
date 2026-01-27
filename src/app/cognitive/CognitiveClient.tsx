'use client';
import { useState, useEffect } from 'react';
import { CARBON_FIBRE_BG } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Target,
    Trophy,
    Activity,
    ShieldCheck,
    BarChart3,
    Lock,
    Cpu,
    Sparkles,
    Terminal
} from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import LeadershipGym from '@/components/bento/LeadershipGym';
import { useLeadershipRank } from '@/hooks/useLeadershipRank';

export default function CognitiveClient() {
    const [user, setUser] = useState<any>({ uid: 'SIMULATED-LEADERSHIP-CENTER', displayName: 'Executive Director' });
    const [activeTab, setActiveTab] = useState<'simulator' | 'analytics' | 'certification'>('simulator');

    const { addXP, xp, currentRank, progressToNext } = useLeadershipRank();

    useEffect(() => {
        // Simulated Auth Check
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <FloatingNavbar />

            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse-slow" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: CARBON_FIBRE_BG }}
                />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                            <Terminal size={12} className="text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Center Sync Active // v4.2.0</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            Strategic <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Command Center</span>
                        </h1>
                        <p className="text-zinc-500 max-w-xl text-lg font-medium leading-relaxed italic">
                            "Cognitive fitness is the fuel of authority. Calibrate your baseline, expand your working memory, and protect against professional burnout."
                        </p>
                    </div>

                    <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-xl">
                        {[
                            { id: 'simulator', label: 'Simulator', icon: <Cpu size={14} /> },
                            { id: 'analytics', label: 'Strategic Logs', icon: <BarChart3 size={14} /> },
                            { id: 'certification', label: 'Certs', icon: <ShieldCheck size={14} /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Interactive Area */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {activeTab === 'simulator' && (
                                <motion.div
                                    key="simulator"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <LeadershipGym onXPAction={addXP} />
                                </motion.div>
                            )}

                            {activeTab === 'analytics' && (
                                <motion.div
                                    key="analytics"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="p-10 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 backdrop-blur-xl"
                                >
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                                            <BarChart3 className="text-cyan-400" size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black uppercase tracking-tight">Intelligence Velocity</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-3xl bg-black/40 border border-zinc-800">
                                            <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">Memory Index Progression</p>
                                            <div className="h-40 flex items-end gap-2 group cursor-pointer">
                                                {[30, 45, 38, 52, 65, 58, 72].map((v, i) => (
                                                    <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-lg transition-all hover:bg-cyan-500" style={{ height: `${v}%` }} />
                                                ))}
                                            </div>
                                            <p className="mt-4 text-[10px] font-mono text-zinc-600 text-center">Last 7 Calibration Cycles</p>
                                        </div>
                                        <div className="p-6 rounded-3xl bg-black/40 border border-zinc-800">
                                            <p className="text-[10px] font-black uppercase text-zinc-500 mb-4">Reaction Latency (ms)</p>
                                            <div className="h-40 flex items-end gap-2 group cursor-pointer">
                                                {[70, 62, 75, 55, 48, 50, 42].map((v, i) => (
                                                    <div key={i} className="flex-1 bg-purple-500/20 rounded-t-lg transition-all hover:bg-purple-500" style={{ height: `${v}%` }} />
                                                ))}
                                            </div>
                                            <p className="mt-4 text-[10px] font-mono text-zinc-600 text-center">Inhibition Center Response</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 p-6 rounded-3xl bg-cyan-600/5 border border-cyan-500/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Activity className="text-cyan-500" size={20} />
                                            <p className="text-sm font-medium text-zinc-400">Your cognitive baseline is <span className="text-white font-bold">18% above</span> the district average.</p>
                                        </div>
                                        <button className="text-xs font-black uppercase text-cyan-500 hover:text-cyan-400">View Full Nexus Audit</button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'certification' && (
                                <motion.div
                                    key="certification"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="p-10 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 backdrop-blur-xl flex flex-col items-center justify-center text-center py-20"
                                >
                                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-700">
                                        <Lock className="text-zinc-500" size={32} />
                                    </div>
                                    <h2 className="text-2xl font-black uppercase mb-4">Professional Certification Locked</h2>
                                    <p className="text-zinc-500 max-w-md mx-auto mb-10 text-sm leading-relaxed">
                                        Complete at least 5 calibration cycles in all 4 simulators to unlock your professional achievement badges.
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('simulator')}
                                        className="px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all"
                                    >
                                        Begin Calibration
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Sidebar Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 relative overflow-hidden group/card shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full group-hover/card:bg-cyan-500/10 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-6">Current Stats</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex items-center gap-3">
                                            <Trophy className="text-amber-500" size={16} />
                                            <span className="text-xs font-bold text-zinc-300">Total Professional XP</span>
                                        </div>
                                        <span className="text-xl font-black text-white">{xp}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex items-center gap-3">
                                            <Target className="text-blue-500" size={16} />
                                            <span className="text-xs font-bold text-zinc-300">Sync Streak</span>
                                        </div>
                                        <span className="text-xl font-black text-white">12 Days</span>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex items-center gap-3">
                                            <Zap className="text-purple-500" size={16} />
                                            <span className="text-xs font-bold text-zinc-200 uppercase tracking-widest">{currentRank.title}</span>
                                        </div>
                                        <span className="text-xl font-black text-white">{Math.floor(progressToNext)}%</span>
                                    </div>
                                </div>
                                <div className="mt-8 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressToNext}%` }}
                                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Simulator Brief</h4>
                            <div className="space-y-6">
                                {[
                                    { title: "Working Memory", desc: "Recall increasing sequences of neural triggers.", impact: "High" },
                                    { title: "Pulse Control", desc: "Override automatic responses to focus on core data.", impact: "Medium" },
                                    { title: "Math Flux", desc: "Execute rapid calculations under temporal pressure.", impact: "High" }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-default">
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="text-xs font-black text-zinc-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{item.title}</h5>
                                            <span className="text-[8px] font-black bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">{item.impact} IMPACT</span>
                                        </div>
                                        <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-4">
                                <Sparkles className="text-cyan-500" size={16} />
                                <p className="text-[10px] text-cyan-700 dark:text-cyan-400 font-bold leading-tight">
                                    Strategic Advice: High math flux scores correlate with 32% faster IEP drafting velocity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-zinc-900 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                    <p className="text-xs font-mono font-bold tracking-widest uppercase">Encryption: Strategic-AES-256</p>
                    <div className="flex gap-8">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase">Center: {'SIMULATED-ACCOUNT'}</span>
                        <span className="text-xs font-mono font-bold tracking-widest uppercase">ALSDE Standards Compliant</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
