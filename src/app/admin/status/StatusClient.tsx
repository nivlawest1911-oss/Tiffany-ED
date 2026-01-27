'use client';

import { SystemStatus } from '@/components/admin/SystemStatus';
import { ShieldCheck, ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function StatusClient() {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white p-8 md:p-16 selection:bg-emerald-500/30">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 overflow-hidden relative p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem]">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] -z-10" />

                    <div className="relative z-10">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-zinc-600 hover:text-emerald-400 transition-colors mb-8 group">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Command Center
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                                <ShieldCheck className="text-black w-6 h-6" />
                            </div>
                            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500">Security & Operational Layer</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                            Infrastructure <span className="text-emerald-500">Sovereignty</span>
                        </h1>
                        <p className="text-zinc-600 text-sm md:text-lg font-bold mt-8 italic max-w-2xl tracking-tight leading-relaxed">
                            Real-time neural telemetry and institutional health monitoring for the Mobile County district deployment.
                        </p>
                    </div>

                    <button className="relative z-10 p-6 bg-white/[0.05] border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all group overflow-hidden">
                        <RefreshCcw className="w-6 h-6 text-zinc-500 group-hover:rotate-180 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <SystemStatus />
                    </div>

                    <aside className="space-y-10">
                        <div className="p-10 bg-[#050507] border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/5 blur-[60px]" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white italic mb-10">Compliance Ledger</h3>
                            <div className="space-y-8">
                                {[
                                    { date: '2026-01-24 03:07', action: 'Daily Backup Handshake', status: 'VERIFIED', node: 'VAULT_01' },
                                    { date: '2026-01-24 02:59', action: 'Identity Sync Optimized', status: 'SUCCESS', node: 'AUTH_GRID' },
                                    { date: '2026-01-23 23:59', action: 'GCS Cold Storage Mirror', status: 'STAGED', node: 'BACKUP_CRON' }
                                ].map((log, i) => (
                                    <div key={i} className="relative pl-6 border-l border-white/10 group/log">
                                        <div className="absolute left-[-4.5px] top-1 w-2 h-2 rounded-full bg-zinc-800 border border-white/10 group-hover/log:bg-emerald-500 group-hover/log:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" />
                                        <p className="text-[10px] font-black text-white italic">{log.action}</p>
                                        <div className="flex items-center gap-3 mt-2 text-[8px] font-black uppercase tracking-widest text-zinc-600">
                                            <span>{log.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                            <span className="text-emerald-500/60">{log.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 bg-emerald-600 border border-emerald-400 rounded-[2.5rem] shadow-lg shadow-emerald-900/20 group cursor-pointer hover:bg-emerald-500 transition-all text-black">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-4">Uptime SLA</h3>
                            <div className="text-5xl font-black italic mb-6">99.99%</div>
                            <p className="text-[10px] uppercase font-black tracking-widest opacity-70 leading-relaxed mb-8">
                                Institutional Grade Reliability guaranteed for all 2026 Mobile County Pilot Sites.
                            </p>
                            <button className="w-full py-4 bg-black text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] hover:bg-zinc-900 transition-all">
                                View Detailed Spec Sheet
                            </button>
                        </div>
                    </aside>
                </div>

                <footer className="mt-32 pt-12 border-t border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.5em]">System Status: Sovereign Operational Layer // v4.2.1 Stable</p>
                    <p className="text-[8px] text-zinc-800 uppercase font-bold mt-4 tracking-widest italic">Encrypted analytical output by transcendence holistic wellness, LLC</p>
                </footer>
            </div>
        </div>
    );
}
