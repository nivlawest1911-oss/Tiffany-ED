'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="min-h-screen text-white selection:bg-intel-gold/30">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative overflow-hidden p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-intel-gold/5 blur-[100px] -z-10" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-intel-gold flex items-center justify-center shadow-lg shadow-intel-gold/20">
                            <ShieldCheck className="text-black w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-[0.5em] text-intel-gold">EdIntel Site Command</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                        {schoolName} <span className="text-gold-gradient">Node</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold mt-4 italic">
                        Administrative Oversight Layer // Clearance: Level 5
                    </p>
                </div>

                <div className="flex gap-4 relative z-10">
                    <div className="bg-white/5 border border-white/10 px-8 py-5 rounded-3xl backdrop-blur-xl">
                        <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Active Personnel</span>
                        <span className="text-2xl font-black italic">{staffData.length}</span>
                    </div>
                    <div className="bg-intel-gold border border-intel-gold/50 px-8 py-5 rounded-3xl shadow-2xl shadow-intel-gold/10">
                        <span className="block text-[8px] text-black/60 uppercase font-black tracking-widest mb-1">Vault Reserve</span>
                        <span className="text-2xl font-black italic text-black">4,200 U</span>
                    </div>
                </div>
            </header>

            <nav className="flex items-center gap-2 mb-12 bg-white/5 p-2 rounded-2xl w-fit border border-white/5 backdrop-blur-3xl">
                {[
                    { id: 'personnel', label: 'Personnel Management', icon: Users },
                    { id: 'forecast', label: 'Usage Forecast', icon: Zap },
                    { id: 'efficiency', label: 'Efficiency Ranking', icon: Filter }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                            ? 'bg-intel-gold text-black shadow-2xl border border-intel-gold/30'
                            : 'text-zinc-600 hover:text-zinc-400'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
                <div className="w-px h-8 bg-white/10 mx-4 hidden md:block" />
                <Link
                    href="/admin/status"
                    className="flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-intel-gold/60 hover:text-intel-gold hover:bg-intel-gold/5 transition-all border border-intel-gold/10"
                >
                    <Activity className="w-4 h-4" />
                    System Status
                </Link>
            </nav>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2 space-y-12">
                    {activeTab === 'personnel' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {staffData.map((staff, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={staff.id}
                                    className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:border-intel-gold/40 transition-all group relative overflow-hidden backdrop-blur-3xl"
                                >
                                    {/* ID Indicator */}
                                    <div className="absolute top-10 right-10 text-[9px] font-mono text-zinc-700 tracking-widest font-black uppercase">
                                        ID: {staff.id}
                                    </div>

                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-intel-gold/50 transition-colors shadow-2xl">
                                                {staff.avatar_url ? (
                                                    <Image src={staff.avatar_url} alt={`${staff.full_name}'s avatar`} fill className="object-cover opacity-80" />
                                                ) : (
                                                    <User className="text-zinc-600 w-8 h-8" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase tracking-tight italic group-hover:text-intel-gold transition-colors">{staff.full_name}</h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[9px] text-zinc-500 uppercase font-black">{staff.department}</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                                    <span className="text-[9px] text-intel-gold/50 uppercase font-bold tracking-widest">{staff.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5 mb-8">
                                        <div className="bg-black/20 border border-white/5 p-5 rounded-2xl">
                                            <span className="block text-[7px] text-zinc-600 uppercase font-black tracking-widest mb-1 font-mono">Energy Balance</span>
                                            <span className="text-2xl font-black italic">{staff.usage_tokens} U</span>
                                        </div>
                                        <div className="bg-black/20 border border-white/5 p-5 rounded-2xl">
                                            <span className="block text-[7px] text-zinc-600 uppercase font-black tracking-widest mb-1 font-mono">Audit Score</span>
                                            <span className="text-2xl font-black italic text-intel-gold">92%</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-[10px] uppercase font-black tracking-[0.3em] py-5 rounded-2xl border border-white/10 transition-all group-hover:border-white/20">
                                            Intelligence Report
                                        </button>
                                        <button className="p-5 bg-intel-gold/10 hover:bg-intel-gold/20 text-intel-gold rounded-2xl border border-intel-gold/20 transition-all" title="Download Intelligence Report">
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

                <div className="space-y-12">
                    <aside className="sticky top-28 space-y-12">
                        <TransferTerminal staffId="ST-99" staffName="Lead Special Ed Teacher" />

                        <div className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden group backdrop-blur-3xl">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-intel-gold/5 blur-[50px]" />
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-black italic mb-8">System Notifications</h4>
                            <div className="space-y-5">
                                {[
                                    { title: 'Low Energy Threshold', body: 'Blount High special ed node is under 15%', type: 'WARN' },
                                    { title: 'Compliance Sync', body: 'District backup finalized at 02:00 AM', type: 'INFO' }
                                ].map((alert, i) => (
                                    <div key={i} className="p-5 bg-white/[0.03] border border-white/10 rounded-2xl flex items-start gap-4 hover:border-white/20 transition-colors">
                                        <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.type === 'WARN' ? 'bg-intel-gold shadow-[0_0_12px_rgba(197,164,126,0.6)]' : 'bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.2)]'}`} />
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-zinc-300 tracking-wider font-mono">{alert.title}</p>
                                            <p className="text-[9px] text-zinc-600 mt-2 uppercase font-bold leading-relaxed italic">"{alert.body}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 bg-intel-gold border border-intel-gold/50 rounded-[3rem] shadow-2xl shadow-intel-gold/10 group cursor-pointer hover:bg-white transition-all overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Zap className="text-black w-32 h-32 -rotate-12" />
                            </div>
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <Zap className="text-black w-8 h-8" />
                                <span className="text-[9px] font-black uppercase text-black/40 tracking-[0.3em]">Site Provisioning</span>
                            </div>
                            <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter leading-tight relative z-10">
                                Bulk Refill Station
                            </h3>
                            <p className="text-[10px] text-black/60 uppercase font-black mt-3 tracking-widest relative z-10 font-mono">
                                Provision 5,000 Energy Units // EXEC-TRN-902
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <footer className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 pb-10">
                <div className="text-center md:text-left">
                    <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.4em]">Integrated Intelligence by transcendence holistic wellness, LLC</p>
                    <p className="text-[8px] text-zinc-800 uppercase font-bold mt-3 tracking-[0.3em] italic">Authored by Dr. Alvin West, Jr. // MCPSS Emeritus Protocol</p>
                </div>
                <div className="flex gap-8">
                    <button className="text-[9px] uppercase font-black tracking-widest text-zinc-700 hover:text-intel-gold transition-colors">Privacy Shield</button>
                    <button className="text-[9px] uppercase font-black tracking-widest text-zinc-700 hover:text-intel-gold transition-colors">Terms of EdIntelty</button>
                    <button className="text-[9px] uppercase font-black tracking-widest text-zinc-700 hover:text-intel-gold transition-colors">Support Neural-Link</button>
                </div>
            </footer>
        </div>
    );
}
