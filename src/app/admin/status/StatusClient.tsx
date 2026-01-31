'use client';

import { SystemStatus } from '@/components/admin/SystemStatus';
import { ShieldCheck, ArrowLeft, RefreshCcw, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function StatusClient() {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white p-8 md:p-16 selection:bg-intel-gold/30">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 overflow-hidden relative p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] backdrop-blur-3xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-intel-gold/5 blur-[150px] -z-10" />

                    <div className="relative z-10">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600 hover:text-intel-gold transition-all mb-12 group italic">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Return to Command Center
                        </Link>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-intel-gold/10 rounded-2xl border border-intel-gold/20 shadow-2xl shadow-intel-gold/10">
                                <ShieldCheck className="text-intel-gold w-6 h-6" />
                            </div>
                            <span className="text-[11px] uppercase font-black tracking-[0.6em] text-intel-gold italic">Security & Operational Layer</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-lighter leading-none">
                            Infrastructure <span className="text-gold-gradient">Sovereignty</span>
                        </h1>
                        <p className="text-zinc-600 text-sm md:text-xl font-medium mt-10 italic max-w-2xl tracking-tight leading-relaxed">
                            "Real-time neural telemetry and institutional health monitoring for the Mobile County district deployment."
                        </p>
                    </div>

                    <button className="relative z-10 p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] hover:border-intel-gold/40 transition-all group overflow-hidden shadow-2xl">
                        <RefreshCcw className="w-8 h-8 text-zinc-600 group-hover:text-intel-gold group-hover:rotate-180 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-intel-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <SystemStatus />
                    </div>

                    <aside className="space-y-12">
                        <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] shadow-2xl relative overflow-hidden group backdrop-blur-3xl">
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-intel-gold/5 blur-[80px]" />

                            <div className="flex items-center gap-3 mb-12">
                                <Cpu className="w-5 h-5 text-intel-gold" />
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white italic">Compliance Ledger</h3>
                            </div>

                            <div className="space-y-10">
                                {[
                                    { date: '2026-01-24 03:07', action: 'Daily Backup Handshake', status: 'VERIFIED', node: 'VAULT_01' },
                                    { date: '2026-01-24 02:59', action: 'Identity Sync Optimized', status: 'SUCCESS', node: 'AUTH_GRID' },
                                    { date: '2026-01-23 23:59', action: 'GCS Cold Storage Mirror', status: 'STAGED', node: 'BACKUP_CRON' }
                                ].map((log, i) => (
                                    <div key={i} className="relative pl-8 border-l border-white/5 group/log">
                                        <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-white/10 group-hover/log:bg-intel-gold group-hover/log:shadow-[0_0_12px_rgba(197,164,126,0.5)] transition-all" />
                                        <p className="text-[11px] font-black text-white italic group-hover/log:text-intel-gold transition-colors">{log.action}</p>
                                        <div className="flex items-center gap-4 mt-3 text-[9px] font-black uppercase tracking-widest text-zinc-700">
                                            <span className="font-mono">{log.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                            <span className="text-intel-gold/50">{log.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-12 bg-intel-gold border border-white/20 rounded-[3.5rem] shadow-2xl shadow-intel-gold/20 group cursor-pointer hover:bg-white transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl group-hover:bg-intel-gold/10 transition-colors" />

                            <div className="relative z-10">
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6 text-black">Uptime SLA</h3>
                                <div className="text-7xl font-black italic mb-8 text-black tracking-tighter">99.99%</div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-black/60 leading-relaxed mb-10 italic">
                                    "Institutional Grade Reliability guaranteed for all 2026 Mobile County Pilot Sites."
                                </p>
                                <button className="w-full py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-xl">
                                    Access Specification
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>

                <footer className="mt-40 pt-16 border-t border-white/5 text-center pb-20">
                    <p className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.6em] italic">System Status: Sovereign Operational Layer // v4.2.1 Stable</p>
                    <p className="text-[9px] text-zinc-800 uppercase font-black mt-6 tracking-[0.3em] italic opacity-50">Encrypted analytical output by transcendence holistic wellness, LLC</p>
                </footer>
            </div>
        </div>
    );
}
