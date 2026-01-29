'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Database, HardDrive, Cpu, Globe } from 'lucide-react';

interface SystemNode {
    id: string;
    name: string;
    provider: string;
    status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
    latency: string;
    uptime: string;
    icon: React.ElementType;
}

export const SystemStatus = () => {
    const [nodes, setNodes] = useState<SystemNode[]>([
        { id: '1', name: 'Neural Core', provider: 'GCP Gemini 1.5', status: 'ONLINE', latency: '42ms', uptime: '99.98%', icon: Cpu },
        { id: '2', name: 'Memory Cluster', provider: 'Supabase PGSQL', status: 'ONLINE', latency: '12ms', uptime: '99.99%', icon: Database },
        { id: '3', name: 'Sovereign Gateway', provider: 'Vercel Edge', status: 'ONLINE', latency: '8ms', uptime: '100%', icon: Globe },
        { id: '4', name: 'Cold Vault', provider: 'GCS Backup Node', status: 'STANDBY', latency: 'N/A', uptime: '99.9%', icon: HardDrive },
    ]);

    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setScanProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="p-10 bg-[#050507] border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            {/* Background Matrix Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #00C853 1px, transparent 1px), linear-gradient(#00C853 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Scanning Line Effect */}
            <div
                className="absolute inset-x-0 h-[2px] bg-emerald-500/20 blur-sm pointer-events-none z-20"
                style={{ top: `${scanProgress}%` }}
            />

            <div className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10 gap-6 text-center md:text-left">
                <div>
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <Activity className="text-emerald-500 w-4 h-4 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">System Telemetry</h2>
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-black">Institutional Integrity Monitor // v4.2</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                        <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Global Health</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            <span className="text-xs font-black italic text-emerald-400">NOMINAL</span>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                        <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Last Audit</span>
                        <span className="text-xs font-black italic text-indigo-400">0.4ms AGO</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {nodes.map((node, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={node.id}
                        className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all group/node"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/node:border-emerald-500/50 transition-colors">
                                    <node.icon className="text-zinc-600 w-6 h-6 group-hover/node:text-emerald-400 transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-tight italic">{node.name}</h3>
                                    <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mt-1">{node.provider}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${node.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-500' :
                                        node.status === 'STANDBY' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    <div className={`w-1 h-1 rounded-full ${node.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse' :
                                            node.status === 'STANDBY' ? 'bg-indigo-400' : 'bg-red-500'
                                        }`} />
                                    {node.status}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                <span className="block text-[7px] text-zinc-700 uppercase font-black mb-1">Latency</span>
                                <span className="text-[10px] font-mono font-black text-zinc-400 italic">{node.latency}</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                <span className="block text-[7px] text-zinc-700 uppercase font-black mb-1">Uptime</span>
                                <span className="text-[10px] font-mono font-black text-emerald-900/50 italic">{node.uptime}</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                <span className="block text-[7px] text-zinc-700 uppercase font-black mb-1">Protocol</span>
                                <span className="text-[10px] font-mono font-black text-zinc-600 italic">V4_TLS</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-500/30" />
                    <span className="text-[8px] text-zinc-700 uppercase font-black tracking-widest">Encrypted Sovereign Link Active</span>
                </div>
                <button className="text-[8px] text-emerald-500/50 uppercase font-black tracking-[0.4em] hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Initiate Full Diagnostic Handshake →
                </button>
            </div>
        </div>
    );
};
