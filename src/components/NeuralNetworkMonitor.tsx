'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Globe, Zap, Database, Github } from 'lucide-react';

export default function NeuralNetworkMonitor() {
    const [metrics, setMetrics] = useState({
        compute: 12.4,
        latency: 24,
        throughput: 4.8,
        activeAgents: 8
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                compute: 12 + Math.random() * 2,
                latency: 22 + Math.round(Math.random() * 5),
                throughput: 4.5 + Math.random() * 0.5,
                activeAgents: 8 + (Math.random() > 0.8 ? 1 : 0)
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" /> Neural Health
                </h3>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Global Mainnet</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Compute Load', val: `${metrics.compute.toFixed(1)}%`, icon: Cpu, color: 'text-indigo-400' },
                    { label: 'Neural Latency', val: `${metrics.latency}ms`, icon: Zap, color: 'text-amber-400' },
                    { label: 'Data Velocity', val: `${metrics.throughput.toFixed(1)}GB/s`, icon: Database, color: 'text-blue-400' },
                    { label: 'Active Agents', val: metrics.activeAgents, icon: Globe, color: 'text-emerald-400' },
                ].map((m, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <m.icon className={`w-3 h-3 ${m.color}`} />
                            <span className="text-[9px] font-bold text-zinc-500 uppercase">{m.label}</span>
                        </div>
                        <div className="text-lg font-black text-white">{m.val}</div>
                    </div>
                ))}
            </div>

            {/* Infrastructure Map Implementation: GCP + Vercel + GitHub */}
            <div className="pt-4 border-t border-white/5 space-y-4">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest text-center">Infrastructure Integrity</p>
                <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col items-center gap-2 group cursor-help" title="Google Cloud Architecture: Vertex AI, Vision, TTS/STT">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                            <Globe className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase group-hover:text-white transition-colors">Google Cloud</span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-2" />

                    <div className="flex flex-col items-center gap-2 group cursor-help" title="Vercel Optimized Platform: Fast Storage, Analytics, Edge Computing">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                            <Zap className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase group-hover:text-white transition-colors">Vercel</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 group cursor-help" title="Supabase Memory Core: Relational Postgres, Real-time Data, Document Vault">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                            <Database className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase group-hover:text-white transition-colors">Supabase</span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-2" />

                    <div className="flex flex-col items-center gap-2 group cursor-help" title="GitHub Repo Management: Continuous Integration, Source Control">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                            <Github className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase group-hover:text-white transition-colors">GitHub</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
