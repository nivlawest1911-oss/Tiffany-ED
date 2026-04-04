'use client';

import React from 'react';
import { Users, BrainCircuit, Activity, ShieldCheck, Zap } from 'lucide-react';
import PersonnelPulse from '@/components/ui/PersonnelPulse';
import LeadershipIntelligence from '@/components/ui/LeadershipIntelligence';
import LeadershipMetrics from '@/components/dossier/ProfessionalMetrics';
import GlassPanel from '@/components/ui/GlassPanel';
import { useIntelligence } from '@/context/IntelligenceContext';

export default function TalentCommandPage() {
    const { isRescueOneActive } = useIntelligence();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-lg ${isRescueOneActive ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            <Users size={16} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isRescueOneActive ? 'text-rose-500' : 'text-emerald-400/70'}`}>
                            {isRescueOneActive ? 'Human Capital Stabilization' : 'Talent & Institutional Pulse'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                        Talent <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isRescueOneActive ? 'from-rose-500 to-orange-600' : 'from-emerald-400 to-teal-500'} italic`}>Command</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed mt-2">
                        Institutional stability starts with the collective intelligence and well-being of your staff.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">System Alignment</span>
                            <span className="text-sm font-bold text-white">94.2%</span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <ShieldCheck size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Macro Metrics Section */}
            <div className="grid grid-cols-1 gap-6">
                <LeadershipMetrics />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Bio-Dynamic Burnout Monitor */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                            <Activity className={isRescueOneActive ? 'text-rose-500' : 'text-emerald-400'} size={20} />
                            Bio-Dynamic <span className="text-zinc-500 italic">Pulse</span>
                        </h2>
                    </div>
                    <PersonnelPulse />
                    
                    <GlassPanel className="p-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Pulse Indicators</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Teacher Retention Risk', value: 'Low', color: 'text-emerald-400' },
                                { label: 'Collective Agency Score', value: 'High', color: 'text-emerald-400' },
                                { label: 'Protocol Compliance', value: 'Optimal', color: 'text-blue-400' },
                            ].map((indicator) => (
                                <div key={indicator.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{indicator.label}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${indicator.color}`}>{indicator.value}</span>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </div>

                {/* Right: Cognitive Reframe Engine */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                            <BrainCircuit className={isRescueOneActive ? 'text-rose-500' : 'text-pink-400'} size={20} />
                            Cognitive <span className="text-zinc-500 italic">Reframe</span>
                        </h2>
                    </div>
                    <LeadershipIntelligence />

                    <div className={`p-6 rounded-3xl border transition-all duration-500 ${isRescueOneActive ? 'bg-rose-500/5 border-rose-500/20' : 'bg-pink-500/5 border-pink-500/20'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className={isRescueOneActive ? 'text-rose-500' : 'text-pink-400'} size={18} />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Strategic Directives</h3>
                        </div>
                        <ul className="space-y-3">
                            <li className="text-[11px] text-zinc-400 leading-relaxed flex gap-3">
                                <span className={`shrink-0 w-1 h-1 rounded-full mt-1.5 ${isRescueOneActive ? 'bg-rose-500' : 'bg-pink-500'}`} />
                                Prioritize emotional safety protocols for secondary staff before Q3 transition.
                            </li>
                            <li className="text-[11px] text-zinc-400 leading-relaxed flex gap-3">
                                <span className={`shrink-0 w-1 h-1 rounded-full mt-1.5 ${isRescueOneActive ? 'bg-rose-500' : 'bg-pink-500'}`} />
                                Deploy 'Recognition Pulse' for Grade 9 leads to offset systemic fatigue.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
