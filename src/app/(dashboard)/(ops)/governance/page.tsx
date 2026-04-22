'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';
import { ComplianceAuditor } from '@/components/admin/ComplianceAuditor';
import { DirectiveConsole } from '@/components/admin/DirectiveConsole';
import GovernanceEngine from '@/components/GovernanceEngine';

export default function GovernanceHubPage() {
    return (
        <div className="relative flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    SOVEREIGN
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-16 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Shield className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                        Institutional Oversight & Auditing
                    </span>
                </div>

                <SmartHover message="Governance Hub: The final layer of institutional control. Direct the swarm and enforce absolute policy compliance.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Directives</span>.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    Control the trajectory of institutional intelligence. The Governance Hub provides real-time auditing against Alabama Code and federal benchmarks, ensuring every AI decision remains within sovereign guardrails.
                </p>
            </motion.div>

            {/* Core Governance Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 mb-12">
                {/* 1. Live Compliance Auditor */}
                <div className="lg:col-span-8">
                    <ComplianceAuditor />
                </div>

                {/* 2. Directive Console */}
                <div className="lg:col-span-4">
                    <DirectiveConsole />
                </div>
            </div>

            {/* Secondary Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {/* 3. Parliamentary Engine Integration */}
                <GlassCard className="p-8 border-white/5">
                    <GovernanceEngine />
                </GlassCard>

                {/* 4. Strategic Guardrails Info */}
                <div className="space-y-6">
                    <GlassCard className="p-8 bg-gradient-to-br from-pink-500/5 to-transparent border-pink-500/20">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-2">Redline Protocols</h4>
                                <p className="text-slate-400 text-sm font-medium">
                                    Current Swarm constraints prevent autonomous PII exposure. Any decision affecting {'>'}$5,000 in budget allocation requires explicit Sovereign seconding via the Parliamentary Engine.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="grid grid-cols-2 gap-6">
                        <GlassCard className="p-6 flex flex-col border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Active Audits</span>
                            <span className="text-4xl font-black text-white mb-2 tracking-tighter">1,248</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-mono text-zinc-500 uppercase">Live Stream Active</span>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-6 flex flex-col border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Policy Delta</span>
                            <span className="text-4xl font-black text-emerald-400 mb-2 tracking-tighter">0.02%</span>
                            <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-emerald-500" />
                                <span className="text-[8px] font-mono text-zinc-500 uppercase">Minimal Variance</span>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
