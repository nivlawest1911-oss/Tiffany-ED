'use client';

import React from 'react';
import SovereignShell from '@/components/layout/SovereignShell';
import { Shield, Lock, Eye, ShieldAlert, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityVaultPage() {
    const logs = [
        { event: 'Bio-Auth Success', user: 'Dr. Alvin West', time: '2m ago', level: 'Elevated' },
        { event: 'Encrypted Sync', user: 'System', time: '15m ago', level: 'Standard' },
        { event: 'Key Rotation', user: 'Security Bot', time: '1h ago', level: 'Critical' },
        { event: 'Access Grant', user: 'Admin Node', time: '3h ago', level: 'Standard' }
    ];

    return (
        <SovereignShell>
            <div className="space-y-16 pb-20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5 relative overflow-hidden p-10 bg-white/[0.02] rounded-[3rem] backdrop-blur-3xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-intel-gold/5 blur-[100px] -z-10" />

                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-20 h-20 rounded-[2rem] bg-intel-gold/10 border border-intel-gold/20 flex items-center justify-center text-intel-gold shadow-2xl shadow-intel-gold/10">
                            <Shield className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-gold-gradient">Security Vault</h1>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Quantum Encryption Active // AES-256 // Layer 7</p>
                        </div>
                    </div>

                    <button className="bg-red-600/10 border border-red-500/20 text-red-500 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="relative z-10 flex items-center gap-3">
                            <Lock className="w-4 h-4" />
                            <span>System Lockdown</span>
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 space-y-12"
                    >
                        <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-intel-gold/5 blur-[80px] -z-10" />
                            <h3 className="font-black text-2xl uppercase tracking-tighter italic mb-12 flex items-center gap-4 text-white">
                                <ShieldAlert className="text-intel-gold w-6 h-6" />
                                Security Protocols
                            </h3>
                            <div className="space-y-6">
                                {logs.map((log, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-intel-gold/30 transition-all group/item">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-3 h-3 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)] ${log.level === 'Critical' ? 'bg-red-500 shadow-red-500/50' :
                                                log.level === 'Elevated' ? 'bg-intel-gold shadow-intel-gold/50' : 'bg-emerald-500'
                                                }`} />
                                            <div>
                                                <p className="font-black text-sm tracking-wide text-white group-hover/item:text-intel-gold transition-colors italic uppercase">{log.event}</p>
                                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-1">{log.user}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-xs text-white/50">{log.time}</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-700 mt-1 italic">{log.level} Clearance</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-intel-gold/5 blur-[100px] -z-10" />
                            <h3 className="font-black text-2xl uppercase tracking-tighter italic mb-12 flex items-center gap-4 text-white">
                                <Fingerprint className="text-intel-gold w-6 h-6" />
                                Intelligence Firewall
                            </h3>
                            <div className="h-64 rounded-[2.5rem] bg-black/60 border border-white/5 flex items-center justify-center relative overflow-hidden shadow-inner">
                                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(197,164,126,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(197,164,126,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                                <motion.div
                                    className="absolute inset-x-10 h-1 bg-intel-gold/40 shadow-[0_0_25px_#C5A47E]"
                                    animate={{ top: ['10%', '90%', '10%'] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                />
                                <p className="relative z-10 text-[11px] font-black font-mono text-intel-gold/40 uppercase tracking-[0.6em] text-center">Threat Matrix Scanning...</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-12">
                        <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-intel-gold/5 blur-3xl -z-10" />
                            <h4 className="font-black uppercase tracking-tighter text-intel-gold mb-8 italic text-xl">Master Access</h4>
                            <div className="space-y-8">
                                <div className="p-6 rounded-[2rem] bg-black/60 border border-white/5">
                                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-4 italic">District Private Key</p>
                                    <div className="flex items-center justify-between gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                                        <span className="font-mono text-sm tracking-[0.4em] text-white/30">••••••••••••</span>
                                        <Eye className="w-5 h-5 text-zinc-700 cursor-pointer hover:text-intel-gold transition-colors" />
                                    </div>
                                </div>
                                <button className="w-full py-6 bg-intel-gold text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl shadow-intel-gold/20 group">
                                    <span className="relative z-10">Rotate Protocols</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-red-600/5 border border-red-500/20 p-12 rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden">
                            <h4 className="font-black uppercase tracking-tighter text-red-500 mb-8 italic text-xl">Emergency Pulse</h4>
                            <p className="text-[10px] text-zinc-600 leading-relaxed mb-10 font-black uppercase tracking-widest italic">
                                "Executing emergency protocols will immediately sever all AI neural twins and lock institutional data lakes."
                            </p>
                            <button className="w-full py-6 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-500 transition-all shadow-2xl shadow-red-900/40">
                                Level 5 Cleanse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SovereignShell>
    );
}
