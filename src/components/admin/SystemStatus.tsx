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
        // Visual Scan Line
        const scanTimer = setInterval(() => {
            setScanProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, 50);

        // Simulate Real-time Health Checks
        const metricsTimer = setInterval(() => {
            setNodes(prev => prev.map(node => ({
                ...node,
                latency: node.status === 'ONLINE'
                    ? `${Math.floor(Math.random() * 20 + 30)}ms`
                    : 'N/A',
                uptime: node.status === 'ONLINE'
                    ? (Math.random() > 0.99 ? '99.97%' : '99.98%')
                    : node.uptime
            })));
        }, 3000);

        return () => {
            clearInterval(scanTimer);
            clearInterval(metricsTimer);
        };
    }, []);

    return (
        <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] shadow-2xl relative overflow-hidden group backdrop-blur-3xl">
            {/* Background Matrix Lines */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #C5A47E 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Scanning Line Effect */}
            <div
                className="absolute inset-x-0 h-px bg-intel-gold/40 shadow-[0_0_20px_rgba(197,164,126,0.5)] pointer-events-none z-20"
                style={{ top: `${scanProgress}%` }}
            />

            <div className="flex flex-col md:flex-row justify-between items-center mb-16 relative z-10 gap-10 text-center md:text-left">
                <div className="space-y-4">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-12 h-12 rounded-[1.25rem] bg-intel-gold/10 border border-intel-gold/20 flex items-center justify-center shadow-2xl">
                            <Activity className="text-intel-gold w-6 h-6 animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white leading-none">System Telemetry</h2>
                    </div>
                    <p className="text-[11px] text-zinc-600 uppercase tracking-[0.4em] font-black italic">Institutional Integrity Monitor // v4.2 // LAYER 9</p>
                </div>

                <div className="flex gap-6">
                    <div className="bg-black/40 border border-white/5 px-8 py-4 rounded-3xl backdrop-blur-xl">
                        <span className="block text-[9px] text-zinc-700 uppercase font-black tracking-widest mb-1.5">Global Health</span>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-intel-gold shadow-[0_0_12px_rgba(197,164,126,1)]" />
                            <span className="text-[10px] font-black italic text-intel-gold tracking-widest uppercase">NOMINAL</span>
                        </div>
                    </div>
                    <div className="bg-black/40 border border-white/5 px-8 py-4 rounded-3xl backdrop-blur-xl">
                        <span className="block text-[9px] text-zinc-700 uppercase font-black tracking-widest mb-1.5">Last Audit</span>
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">0.4ms AGO</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {nodes.map((node, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={node.id}
                        className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] hover:border-intel-gold/40 transition-all duration-500 group/node relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-intel-gold/5 blur-3xl group-hover/node:bg-intel-gold/10 transition-colors" />

                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center group-hover/node:border-intel-gold/50 transition-all shadow-2xl">
                                    <node.icon className="text-zinc-600 w-8 h-8 group-hover/node:text-intel-gold transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-md font-black text-white uppercase tracking-tighter italic group-hover/node:text-intel-gold transition-colors">{node.name}</h3>
                                    <p className="text-[10px] text-zinc-700 uppercase font-black tracking-widest mt-1.5">{node.provider}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2.5 ${node.status === 'ONLINE' ? 'bg-intel-gold/10 border border-intel-gold/20 text-intel-gold shadow-[0_0_10px_rgba(197,164,126,0.3)]' :
                                    node.status === 'STANDBY' ? 'bg-white/5 border border-white/10 text-zinc-600' : 'bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'ONLINE' ? 'bg-intel-gold animate-pulse' :
                                        node.status === 'STANDBY' ? 'bg-zinc-700' : 'bg-red-500'
                                        }`} />
                                    {node.status}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 relative z-10">
                            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 group-hover/node:border-white/10 transition-colors">
                                <span className="block text-[8px] text-zinc-800 uppercase font-black mb-1.5 tracking-widest">Latency</span>
                                <span className="text-[11px] font-mono font-black text-zinc-500 italic">{node.latency}</span>
                            </div>
                            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 group-hover/node:border-white/10 transition-colors text-center">
                                <span className="block text-[8px] text-zinc-800 uppercase font-black mb-1.5 tracking-widest">Uptime</span>
                                <span className="text-[11px] font-mono font-black text-intel-gold italic">{node.uptime}</span>
                            </div>
                            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 group-hover/node:border-white/10 transition-colors text-right">
                                <span className="block text-[8px] text-zinc-800 uppercase font-black mb-1.5 tracking-widest">Protocol</span>
                                <span className="text-[11px] font-mono font-black text-zinc-700 italic">V4_TLS</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-intel-gold/30" />
                    <span className="text-[10px] text-zinc-700 uppercase font-black tracking-[0.4em] italic">Encrypted Sovereign Link Passive // ACTIVE_NODE_951</span>
                </div>
                <button className="text-[10px] text-intel-gold/50 hover:text-white uppercase font-black tracking-[0.5em] transition-all flex items-center gap-3 italic group">
                    <Activity className="w-4 h-4 group-hover:animate-spin" /> Initiate Institutional Handshake →
                </button>
            </div>
        </div>
    );
};
