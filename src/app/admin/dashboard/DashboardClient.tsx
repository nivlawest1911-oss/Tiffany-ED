'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, User, Users, Zap, Filter, Download, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { TransferTerminal } from '@/components/admin/TransferTerminal';
import { UsageForecast } from '@/components/admin/UsageForecast';
import { EfficiencyLeaderboard } from '@/components/admin/EfficiencyLeaderboard';

export default function AdminCommandCenter() {
    const schoolName = "Mobile County Public Schools";
    const staffData = [
        { id: 'ST-001', full_name: 'Dr. Mary Johnson', role: 'Special Education Lead', department: 'Special Ed', usage_tokens: 840, avatar_url: null },
        { id: 'ST-002', full_name: 'Marcus Williams', role: 'Math Department Chair', department: 'Math', usage_tokens: 420, avatar_url: null },
        { id: 'ST-003', full_name: 'Sarah Chen', role: 'Instructional Specialist', department: 'ELA', usage_tokens: 950, avatar_url: null },
        { id: 'ST-004', full_name: 'James Rodriguez', role: 'ESL Coordinator', department: 'ESL', usage_tokens: 120, avatar_url: null }
    ];
    const [activeTab, setActiveTab] = useState<'personnel' | 'forecast' | 'efficiency'>('personnel');

    return (
        <div className="p-8 bg-[#0a0a0c] min-h-screen text-white selection:bg-emerald-500/30">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative overflow-hidden p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                            <ShieldCheck className="text-black w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500">Sovereign Site Command</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                        {schoolName} <span className="text-emerald-500">Node</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold mt-4 italic">
                        Administrative Oversight Layer // Clearance: Level 5
                    </p>
                </div>

                <div className="flex gap-3 relative z-10">
                    <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-xl">
                        <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Active Personnel</span>
                        <span className="text-2xl font-black italic">{staffData.length}</span>
                    </div>
                    <div className="bg-emerald-500 border border-emerald-400 px-8 py-4 rounded-3xl shadow-lg shadow-emerald-900/20">
                        <span className="block text-[8px] text-black uppercase font-black tracking-widest mb-1">Vault Reserve</span>
                        <span className="text-2xl font-black italic text-black">4,200 U</span>
                    </div>
                </div>
            </header>

            <nav className="flex items-center gap-2 mb-12 bg-white/5 p-1.5 rounded-2xl w-fit border border-white/5">
                {[
                    { id: 'personnel', label: 'Personnel Management', icon: Users },
                    { id: 'forecast', label: 'Usage Forecast', icon: Zap },
                    { id: 'efficiency', label: 'Efficiency Ranking', icon: Filter }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                            ? 'bg-white/10 text-white shadow-xl border border-white/10'
                            : 'text-zinc-600 hover:text-zinc-400'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
                <div className="w-px h-6 bg-white/5 mx-4 hidden md:block" />
                <Link
                    href="/admin/status"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-500/60 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all border border-emerald-500/10"
                >
                    <Activity className="w-4 h-4" />
                    System Status
                </Link>
            </nav>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 space-y-10">
                    {activeTab === 'personnel' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {staffData.map((staff, i) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={staff.id}
                                    className="bg-[#050507] border border-white/10 p-8 rounded-[2.5rem] hover:border-emerald-500/40 transition-all group relative overflow-hidden"
                                >
                                    {/* ID Indicator */}
                                    <div className="absolute top-8 right-8 text-[10px] font-mono text-zinc-800">
                                        MEM_REF: {staff.id.substring(0, 4)}
                                    </div>

                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/50 transition-colors">
                                                {staff.avatar_url ? (
                                                    <img src={staff.avatar_url} className="w-full h-full object-cover opacity-80" />
                                                ) : (
                                                    <User className="text-zinc-700 w-6 h-6" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black uppercase tracking-tight italic group-hover:text-emerald-400 transition-colors">{staff.full_name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] text-zinc-500 uppercase font-black">{staff.department}</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                                    <span className="text-[9px] text-emerald-500/50 uppercase font-bold tracking-widest">{staff.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                                            <span className="block text-[7px] text-zinc-600 uppercase font-black tracking-widest mb-1">Energy Balance</span>
                                            <span className="text-xl font-black italic">{staff.usage_tokens} U</span>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                                            <span className="block text-[7px] text-zinc-600 uppercase font-black tracking-widest mb-1">Audit Score</span>
                                            <span className="text-xl font-black italic text-indigo-400">92%</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-[9px] uppercase font-black tracking-[0.2em] py-4 rounded-xl border border-white/10 transition-all group-hover:border-white/20">
                                            View Intelligence
                                        </button>
                                        <button className="p-4 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 rounded-xl border border-emerald-500/20 transition-all">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'forecast' && (
                        <UsageForecast forecastData={staffData.map(s => ({
                            profile_id: s.id,
                            full_name: s.full_name,
                            avg_daily_burn: Math.random() * 20 + 5,
                            days_until_depletion: Math.floor(Math.random() * 14) + 1
                        }))} />
                    )}

                    {activeTab === 'efficiency' && (
                        <EfficiencyLeaderboard departments={[
                            { department: 'Special Ed', total_outputs: 142, staff_count: 8, remaining_energy: 3200 },
                            { department: 'Math', total_outputs: 89, staff_count: 5, remaining_energy: 1500 },
                            { department: 'ELA', total_outputs: 76, staff_count: 6, remaining_energy: 2100 },
                            { department: 'Science', total_outputs: 52, staff_count: 4, remaining_energy: 900 }
                        ]} />
                    )}
                </div>

                <div className="space-y-10">
                    <aside className="sticky top-10 space-y-10">
                        <TransferTerminal staffId="ST-99" staffName="Lead Special Ed Teacher" />

                        <div className="p-8 bg-[#050507] border border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-[50px]" />
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-black italic mb-6">Recent Alerts</h4>
                            <div className="space-y-4">
                                {[
                                    { title: 'Low Energy Threshold', body: 'Blount High special ed node is under 15%', type: 'WARN' },
                                    { title: 'Compliance Sync', body: 'District backup finalized at 02:00 AM', type: 'INFO' }
                                ].map((alert, i) => (
                                    <div key={i} className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-start gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${alert.type === 'WARN' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-zinc-300">{alert.title}</p>
                                            <p className="text-[8px] text-zinc-600 mt-1 uppercase font-bold leading-relaxed">{alert.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-emerald-600 border border-emerald-400 rounded-[2rem] shadow-lg shadow-emerald-900/20 group cursor-pointer hover:bg-emerald-500 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <Zap className="text-black w-6 h-6" />
                                <span className="text-[8px] font-black uppercase text-black/50 tracking-widest">Site Upsell</span>
                            </div>
                            <h3 className="text-xl font-black text-black uppercase italic tracking-tighter leading-tight">
                                Bulk Refill Station
                            </h3>
                            <p className="text-[10px] text-black/80 uppercase font-black mt-2 tracking-widest">
                                Provision another 5,000 Energy Units
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.4em]">Integrated Intelligence by transcendence holistic wellness, LLC</p>
                    <p className="text-[7px] text-zinc-800 uppercase font-bold mt-2 tracking-widest italic">Authored by Dr. Alvin West, Jr. // MCPSS Emeritus Protocol</p>
                </div>
                <div className="flex gap-4">
                    <button className="text-[8px] uppercase font-black tracking-widest text-zinc-700 hover:text-white transition-colors">Privacy Shield</button>
                    <button className="text-[8px] uppercase font-black tracking-widest text-zinc-700 hover:text-white transition-colors">Terms of Sovereignty</button>
                    <button className="text-[8px] uppercase font-black tracking-widest text-zinc-700 hover:text-white transition-colors">Support Neural-Link</button>
                </div>
            </footer>
        </div>
    );
}
