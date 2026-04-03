'use client';

import { motion } from 'framer-motion';
import { Shield, Activity, Zap, Cpu, Users, Globe, Lock, Brain } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import { AgentStatusMatrix } from '../../../../components/admin/AgentStatusMatrix';
import { ComplianceHeatmap } from '../../../../components/admin/ComplianceHeatmap';
import { TacticalActions } from '../../../../components/admin/TacticalActions';
import { PredictiveRiskRadar } from '@/components/admin/PredictiveRiskRadar';
import { StrategicForecast } from '@/components/admin/StrategicForecast';
import { IntelligenceExchangeFeed } from '@/components/admin/IntelligenceExchangeFeed';
import { SovereignNodeTopology } from '@/components/admin/SovereignNodeTopology';
import { GlobalDirectiveBroadcast } from '@/components/admin/GlobalDirectiveBroadcast';
import { RedlineMonitor } from '@/components/admin/RedlineMonitor';
import { EthicalTuningConsole } from '@/components/admin/EthicalTuningConsole';
import { SafetyOverrideLog } from '@/components/admin/SafetyOverrideLog';

export default function CommandPage() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <HolographicBackground />
            
            {/* Ambient Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none">
                <span className="text-[15rem] font-black uppercase tracking-tighter leading-none">
                    OVERWATCH
                </span>
            </div>

            {/* Header / Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mb-12 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 ring-1 ring-white/20">
                        <Shield className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">
                            District Overwatch Terminal
                        </span>
                        <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                            Auth_Level: SOVEREIGN <span className="opacity-30">|</span> Node: 0x8A2C <span className="opacity-30">|</span> Status: ENFORCING
                        </div>
                    </div>
                </div>

                <SmartHover message="Command Center: The ultimate synthesis of institutional intelligence. Manage the fleet and optimize the swarm.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-6 tracking-tighter">
                        God-Mode <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Command Control.</span>
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl font-medium">
                    Centralized orchestration for the EdIntel Sovereign fleet. Monitor agent entropy, enforce ethical guardrails, and pivot resources across the entirety of Mobile County's institutional intelligence.
                </p>
            </motion.div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-10">
                {[
                    { label: 'Active Agents', value: '1,248', icon: Cpu, color: 'text-amber-400' },
                    { label: 'Policy Drift', value: '0.02%', icon: Activity, color: 'text-emerald-400' },
                    { label: 'User Interactions', value: '42.8k', icon: Users, color: 'text-blue-400' },
                    { label: 'Global Latency', value: '14ms', icon: Globe, color: 'text-rose-400' },
                ].map((stat, i) => (
                    <GlassCard key={i} className="p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={`w-5 h-5 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{stat.label}</span>
                            <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Main Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 mb-12">
                {/* Orchestration & Intelligence LHS */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <StrategicForecast />
                    <SovereignNodeTopology />
                    <RedlineMonitor />
                    <AgentStatusMatrix />
                    <IntelligenceExchangeFeed />
                    <ComplianceHeatmap />
                </div>

                {/* Tactical & Directives RHS */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <TacticalActions />
                    <EthicalTuningConsole />
                    <GlobalDirectiveBroadcast />
                    <SafetyOverrideLog />
                    <PredictiveRiskRadar />
                </div>
            </div>
        </div>
    );
}
