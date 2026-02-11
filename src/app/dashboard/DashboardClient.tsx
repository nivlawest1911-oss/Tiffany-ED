'use client';

import React from 'react';

import { Zap, Activity, Shield, Brain, Swords, FileText, ChevronRight } from 'lucide-react';

import { EdIntelAutomation } from '@/components/edintel-core/EdIntelAutomation';
import { EdIntelIdentity } from '@/components/dashboard/EdIntelIdentity';
import { ParticleBackground, GlassCard } from '@/components/ui/Cinematic';
import DistrictIntelligenceScore from '@/components/landing/DistrictIntelligenceScore';
import PlatformActivity from '@/components/landing/PlatformActivity';

interface DashboardClientProps {
    tierName?: string;
}

export default function DashboardClient({ tierName = 'EdIntel Initiate' }: DashboardClientProps) {

    // Note: Auth checks and Layout (Dock, Global Status) are handled in /dashboard/layout.tsx

    return (
        <main className="content-stage relative">
            <ParticleBackground count={40} />
            <div className="max-w-[1600px] mx-auto space-y-8 relative z-10">
                {/* Page Header (Local) */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-noble-gold animate-pulse shadow-[0_0_10px_#D4AF37]" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-noble-gold uppercase">EdIntel OS Active</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white italic">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-white">Center</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium italic max-w-lg">
                            "Directing administrative intelligence through high-fidelity neural protocols."
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-6 py-2.5 bg-noble-gold/5 rounded-full border border-noble-gold/20 backdrop-blur-md">
                            <Activity className="w-4 h-4 text-noble-gold" />
                            <span className="text-[10px] font-black text-noble-gold uppercase tracking-widest">Neural Status: Stable</span>
                        </div>
                    </div>
                </header>

                {/* Identity Hub */}
                <EdIntelIdentity />

                {/* V0 EdIntel Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* LEFT: EDINTEL HUB */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Shield className="w-3 h-3 text-noble-gold" />
                            EdIntel Hub
                        </div>
                        <GlassCard className="p-0 overflow-hidden h-full flex flex-col">
                            <DistrictIntelligenceScore />
                        </GlassCard>
                    </div>

                    {/* MIDDLE: THE EDUCATOR'S BRAIN */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Brain className="w-3 h-3 text-indigo-400" />
                            The Educator's Brain
                        </div>
                        <GlassCard className="p-8 h-full bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border-indigo-500/20">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                        <Zap className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white uppercase tracking-wider text-sm">Super-Tools</h3>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Active Intelligence Suite</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {['Magic Grader', 'Quiz Engine', 'IEP Generator'].map(tool => (
                                        <button key={tool} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all uppercase">
                                            {tool}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-2xl border border-white/5 p-6 mb-6 font-mono text-xs text-zinc-400 min-h-[200px] border-l-2 border-l-indigo-500">
                                <p className="mb-2 text-zinc-600 tracking-tighter uppercase font-black text-[9px]">Neural Input Processing...</p>
                                <p>&gt; Awaiting strategic data upload...</p>
                                <p>&gt; Protocols standing by.</p>
                            </div>

                            <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(79,70,229,0.3)]">
                                Initialize AI Synthesis <ChevronRight className="w-4 h-4" />
                            </button>
                        </GlassCard>
                    </div>

                    {/* RIGHT: THE WAR ROOM */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Swords className="w-3 h-3 text-rose-400" />
                            The War Room
                        </div>
                        <GlassCard className="p-6 h-full flex flex-col bg-rose-500/[0.02] border-rose-500/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                                    <FileText className="w-5 h-5 text-rose-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Grant Architect</h3>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Target Acquisition Mode</p>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center py-8">
                                <div className="relative w-32 h-32 mb-6">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                                        <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="376.99" strokeDashoffset="82.93" className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-2xl font-black text-white">78%</span>
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Probability</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-2 animate-pulse">Scanning Opportunities</p>
                                <p className="text-[11px] text-zinc-500 italic text-center px-4 mb-6">
                                    Institutional finding protocols active. Target identified in District Matrix.
                                </p>
                            </div>

                            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-[10px] text-white uppercase tracking-widest transition-all">
                                Open Operations Deck
                            </button>
                        </GlassCard>
                    </div>

                    {/* Activity & Automation Row */}
                    <div className="lg:col-span-8">
                        <GlassCard className="p-0 overflow-hidden">
                            <PlatformActivity />
                        </GlassCard>
                    </div>
                    <div className="lg:col-span-4">
                        <EdIntelAutomation tier={tierName} />
                    </div>
                </div>
            </div>
        </main>
    );
}
