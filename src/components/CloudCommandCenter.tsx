'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github, Zap, Cloud, Server, Shield, Activity,
    ArrowRight, CheckCircle, Terminal, Globe,
    Cpu, Database, Layout, Rocket
} from 'lucide-react';

const LOG_MESSAGES = [
    "[SYSTEM] Initiating Sovereign Production Audit...",
    "[AUDIT] Scanning 482 components for design fidelity... 100%",
    "[AUDIT] Verifying Executive Voice Profiles... ENHANCED",
    "[GITHUB] Fetching latest commit: 'Sovereign Core Alpha v4.2'",
    "[GITHUB] Running Strategic CI/CD Tests... PASSED",
    "[GOOGLE CLOUD] Provisioning TPU-v5 Infrastructure in us-east1...",
    "[GOOGLE CLOUD] Syncing Neural Model Weights (1.4TB)... DONE",
    "[VERCEL] Building Edge Middleware Architecture...",
    "[GOOGLE CLOUD] Initializing Vertex AI Super-Engines... OK",
    "[GOOGLE CLOUD] Calibrating Vision Intelligence Hub... OK",
    "[GOOGLE CLOUD] Synchronizing BigQuery Data Vectors... OK",
    "[SYSTEM] Calibrating Human Behavior Engines...",
    "[SYSTEM] Voice Synthesis Core Synchronized.",
    "[SYSTEM] DEPLOYMENT SUCCESSFUL: edintel.sovereign.ai"
];

export default function CloudCommandCenter() {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showConsole, setShowConsole] = useState(false);
    const [currentLogIndex, setCurrentLogIndex] = useState(-1);

    const startDeployment = () => {
        setShowConsole(true);
        setLogs([]);
        setProgress(0);
        setIsComplete(false);
        setCurrentLogIndex(-1);

        LOG_MESSAGES.forEach((msg, i) => {
            setTimeout(() => {
                setLogs(prev => [...prev, msg]);
                setCurrentLogIndex(i);
                setProgress(Math.round(((i + 1) / LOG_MESSAGES.length) * 100));
                if (i === LOG_MESSAGES.length - 1) setIsComplete(true);
            }, i * 800);
        });
    };

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden font-sans">
            {/* Neural Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"
                />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)]" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <Activity size={12} />
                        <span>Cloud Infrastructure Status</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Unified <span className="text-zinc-600">Sovereign Cloud.</span>
                    </h2>
                    <p className="text-sm text-zinc-500 max-w-xl mx-auto font-medium">
                        Your strategic intelligence is powered by a triple-redundant edge architecture.
                        Github Actions, Google Cloud TPU nodes, and Vercel Edge compute.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            icon: Github,
                            title: "Github Enterprise",
                            status: "Connected",
                            desc: "Source control & Secure CI/CD pipelines",
                            color: "text-white"
                        },
                        {
                            icon: Cloud,
                            title: "Vertex AI Super-Compute",
                            status: "Optimized",
                            desc: "Sovereign model training on TPU-v5 Pods",
                            color: "text-blue-400"
                        },
                        {
                            icon: Zap,
                            title: "Vercel Edge",
                            status: "Live",
                            desc: "Global distribution & Sub-10ms delivery",
                            color: "text-amber-500"
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all group">
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{item.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{item.status}</span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={startDeployment}
                        className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/10 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex items-center gap-3">
                            <Rocket size={18} />
                            Optimize Production Launch
                        </span>
                    </button>
                </div>

                <AnimatePresence>
                    {showConsole && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                        >
                            <div className="w-full max-w-3xl bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.1)]">
                                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-zinc-950">
                                    <div className="flex items-center gap-3">
                                        <Terminal size={16} className="text-emerald-500" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Sovereign Deployment Terminal</span>
                                    </div>
                                    <button onClick={() => setShowConsole(false)} className="text-zinc-500 hover:text-white transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="p-8 h-[400px] overflow-y-auto font-mono text-xs custom-scrollbar bg-black/50">
                                    <div className="space-y-3">
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`flex gap-3 ${log.includes('SUCCESSFUL') ? 'text-emerald-400 font-bold' : 'text-zinc-400'}`}
                                            >
                                                <span className="text-zinc-700">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                                                <span>{log}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 border-t border-white/5 bg-zinc-950">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Progress: {progress}%</span>
                                        {isComplete && <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">System Ready</span>}
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    {isComplete && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-6 p-6 rounded-2xl bg-emerald-500 text-black text-center"
                                        >
                                            <div className="flex items-center justify-center gap-3 mb-2">
                                                <Rocket size={24} className="animate-bounce" />
                                                <h3 className="text-xl font-black uppercase tracking-tighter">Mission Accomplished</h3>
                                            </div>
                                            <p className="text-sm font-bold opacity-80 mb-4 uppercase tracking-widest">
                                                The Sovereign Platform is now Live.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setShowConsole(false);
                                                }}
                                                className="w-full py-4 bg-black text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-800 transition-colors"
                                            >
                                                Enter Sovereign Hub
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function X({ size, className = "" }: { size: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}
