'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, Zap, TrendingUp } from 'lucide-react';

export default function GlobalReachCounter() {
    const [count, setCount] = useState(1245678);
    const [lastIncrement, setLastIncrement] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Highly aggressive increment to simulate "million a second" feeling
            const inc = Math.floor(Math.random() * 850) + 150;
            setCount(prev => prev + inc);
            setLastIncrement(inc);
        }, 80); // Fast heartbeat

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-zinc-950/60 backdrop-blur-2xl border-y border-white/5 py-4 overflow-hidden relative z-50 group">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left: Branding */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl group-hover:bg-indigo-500/50 transition-colors" />
                        <div className="relative p-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                            <Globe className="w-6 h-6 animate-spin-slow" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">Live Global Status</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-white tracking-tighter">NEURAL UPLINK ACTIVE</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 12, 4] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-emerald-500 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* center: The Massive Counter */}
                <div className="flex items-center gap-8 bg-black/40 px-8 py-3 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            <TrendingUp size={10} /> Reach Velocity: 850k/sec
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tabular-nums tracking-tighter">
                                {count.toLocaleString()}
                            </span>
                            <AnimatePresence mode='popLayout'>
                                <motion.span
                                    key={count}
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 1.2 }}
                                    className="text-xs font-bold text-emerald-400 font-mono"
                                >
                                    +{lastIncrement}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1">Total Sovereign Nodes Connected</span>
                    </div>
                </div>

                {/* Right: Quick Share / CTA */}
                <div className="flex items-center gap-4">
                    <div className="text-right hidden lg:block">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Network Capacity</p>
                        <div className="w-32 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                animate={{ width: ["70%", "95%", "85%"] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Viral Protocol Initiated. Secure link copied.");
                        }}
                        className="px-6 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 group/btn"
                    >
                        <Zap size={14} className="fill-indigo-500 text-indigo-500 group-hover:animate-pulse" />
                        BROADCAST NOW
                    </button>
                </div>

            </div>

            {/* Animated Grid Background for the Ticker */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] pointer-events-none" />
        </div>
    );
}
