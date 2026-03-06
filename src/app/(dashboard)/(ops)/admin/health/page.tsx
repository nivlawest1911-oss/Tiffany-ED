'use client';

import React from 'react';
import EdIntelShell from '@/components/layout/EdIntelShell';
import { Activity, ShieldCheck, Cpu, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemHealthPage() {
    const systems = [
        { name: 'Core Intelligence (Vertex AI)', status: 'Optimal', load: '12%', latency: '240ms', icon: Cpu },
        { name: 'Data Lake (BigQuery)', status: 'Syncing', load: '45%', latency: '1.2s', icon: Database },
        { name: 'Auth Node (Supabase)', status: 'Optimal', load: '8%', latency: '85ms', icon: ShieldCheck },
        { name: 'Edge Delivery (Vercel)', status: 'Optimal', load: '2%', latency: '12ms', icon: Zap }
    ];

    return (
        <EdIntelShell>
            <div className="space-y-12 pb-20">
                <header className="mb-16">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-gold-gradient mb-4">Neural Health Matrix</h2>
                    <p className="text-zinc-500 text-sm font-black uppercase tracking-[0.3em] italic">Real-time telemetrics for the EdIntel OS deployment.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {systems.map((s, i) => (
                        <motion.div
                            key={s.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-3xl group relative overflow-hidden transition-all hover:border-intel-gold/40"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-intel-gold/5 blur-3xl group-hover:bg-intel-gold/10 transition-colors" />

                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-intel-gold group-hover:scale-110 transition-transform shadow-2xl">
                                        <s.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl uppercase tracking-tighter italic text-white group-hover:text-intel-gold transition-colors">{s.name}</h3>
                                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">Protocol v5.0.2</p>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${s.status === 'Optimal' ? 'bg-intel-gold/10 border-intel-gold/20 text-intel-gold shadow-[0_0_12px_rgba(197,164,126,0.3)]' : 'bg-white/5 border-white/10 text-zinc-500 animate-pulse'}`}>
                                    {s.status}
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] uppercase font-black tracking-[0.2em] text-zinc-600 italic">
                                        <span>System Load</span>
                                        <span className="text-white">{s.load}</span>
                                    </div>
                                    <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/5 p-0.5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: s.load }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-intel-gold rounded-full shadow-[0_0_8px_rgba(197,164,126,0.5)]"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                                    <span className="text-zinc-600">Latency Response</span>
                                    <span className="font-mono text-intel-gold italic">{s.latency}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-intel-gold/[0.02] to-transparent pointer-events-none" />

                    <div className="flex items-center gap-5 mb-12 relative z-10">
                        <div className="p-4 bg-intel-gold/20 rounded-2xl border border-intel-gold/40 shadow-2xl">
                            <Activity className="text-intel-gold w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter italic text-gold-gradient">Neural Signal Flow</h2>
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] mt-2 italic shadow-orange-951">Real-time Telemetry Visualization</p>
                        </div>
                    </div>

                    <div className="h-80 flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-[2.5rem] relative z-10 shadow-inner overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#C5A47E_1px,transparent_0)] bg-[size:24px_24px]" />

                        <motion.div
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-intel-gold font-mono text-[10px] font-black uppercase tracking-[0.5em] text-center relative z-10"
                        >
                            Scanning Neural Paths...
                            <div className="mt-8 flex gap-2 justify-center items-end h-16">
                                {[...Array(32)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-intel-gold/30 rounded-full"
                                        animate={{
                                            height: [8, Math.random() * 40 + 8, 8],
                                            backgroundColor: ['#C5A47E33', '#C5A47EEE', '#C5A47E33']
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1 + Math.random(),
                                            delay: i * 0.05,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </EdIntelShell>
    );
}
