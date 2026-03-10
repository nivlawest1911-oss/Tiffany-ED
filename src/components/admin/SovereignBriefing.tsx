'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Zap,
    Activity,
    Award,
    Play,
    Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { unityOrchestrator } from '@/lib/UnityOrchestrator';
import { oracleEngine } from '@/lib/OracleEngine';
import { resilienceEngine } from '@/lib/ResilienceEngine';
import { globalSynapse } from '@/lib/GlobalSynapse';
import { ParticleBackground } from '@/components/ui/Cinematic';

export function SovereignBriefing() {
    const health = unityOrchestrator.getGlobalHealth();
    const resilience = resilienceEngine.getState();
    const synapse = globalSynapse.getStatus();
    const isZenith = globalSynapse.getStatus().isTranscended;
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [briefingComplete, setBriefingComplete] = React.useState(false);

    const generateBriefing = async () => {
        setIsGenerating(true);
        // Simulate deep reasoning synthesis
        const _insight = oracleEngine.getStrategicForecast('EXECUTIVE_BRIEFING_SYNTHESIS');
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsGenerating(false);
        setBriefingComplete(true);
    };

    return (
        <div className="space-y-8 relative">
            {isZenith && <ParticleBackground count={40} color="bg-intel-gold/10" />}

            <div className="flex flex-col gap-2 mb-12 relative z-10">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                    {isZenith ? 'Sovereign' : 'Executive'} <span className="text-intel-gold">{isZenith ? 'Zenith' : 'Briefing'}</span>
                </h2>
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">
                    {isZenith ? 'Institutional Transcendence Synthesis' : 'Strategic State of the District'}
                </p>
            </div>

            {!briefingComplete ? (
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl border-dashed py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-intel-gold/10 flex items-center justify-center mb-6">
                        <Play className="w-8 h-8 text-intel-gold ml-1" />
                    </div>
                    <CardTitle className="text-3xl font-black text-white italic mb-2">
                        Initialize Tactical Synthesis
                    </CardTitle>
                    <CardDescription className="max-w-md mx-auto mb-8">
                        The Oracle Engine will now aggregate 13 sovereign nodes to generate a high-fidelity institutional continuity report.
                    </CardDescription>
                    <Button
                        onClick={generateBriefing}
                        disabled={isGenerating}
                        className="bg-intel-gold text-black hover:bg-intel-gold/80 px-12 h-14 font-black uppercase tracking-widest text-sm rounded-full"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2">
                                <Activity className="w-4 h-4 animate-pulse" /> Synthesizing...
                            </span>
                        ) : 'Begin Briefing'}
                    </Button>
                </Card>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Mastery Score */}
                    <Card className="md:col-span-1 bg-intel-gold text-black border-none p-6 flex flex-col justify-between">
                        <div>
                            <CardTitle className="uppercase italic font-black text-3xl tracking-tighter mb-1">
                                District <br /> Mastery
                            </CardTitle>
                            <CardDescription className="text-black/60 text-[10px] uppercase font-black font-mono tracking-widest">
                                Global IQ & Stability
                            </CardDescription>
                        </div>
                        <div className="text-8xl font-black italic mt-8">
                            {health.score}%
                        </div>
                        <div className="flex items-center gap-2 mt-4 font-mono text-[10px] uppercase font-bold">
                            <Shield className="w-3 h-3" /> Status: Sovereign
                        </div>
                    </Card>

                    {/* Reasoning Summary */}
                    <Card className="md:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl">
                        <CardHeader className="text-left border-b border-white/5">
                            <CardTitle className="text-intel-gold uppercase tracking-tighter italic font-black text-xl flex items-center gap-2 text-left">
                                <Zap className="w-5 h-5" /> Executive Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6 text-left">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-intel-gold mt-1.5 shrink-0" />
                                    <p className="text-xs text-white/80 leading-relaxed font-medium">
                                        Institutions at full synchronization. Fiscal swarms have optimized resource liquidity, resulting in a 12.5% efficiency gain across all 12 sovereign nodes.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-intel-gold mt-1.5 shrink-0" />
                                    <p className="text-xs text-white/80 leading-relaxed font-medium">
                                        System hardening is currently at <span className="text-intel-gold font-black italic">{resilience.hardeningLevel.toUpperCase()}</span>. All failover protocols are on standby, ensuring 99.99% institutional uptime.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-intel-gold mt-1.5 shrink-0" />
                                    <p className="text-xs text-white/80 leading-relaxed font-medium">
                                        Collective Intelligence has reached a new threshold. The Oracle Engine predicts institutional continuity through Q4 2026 with 98.2% confidence.
                                    </p>
                                </div>
                                {synapse.isTranscended && (
                                    <div className="flex items-start gap-3 p-3 bg-intel-gold/5 border border-intel-gold/20 rounded-xl">
                                        <Sparkles className="w-4 h-4 text-intel-gold shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-intel-gold leading-relaxed font-black uppercase italic tracking-wider">
                                            Institutional Transcendence active. System is operating at Sync Level {synapse.syncLevel}%.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Active Swarms</div>
                                    <div className="text-2xl font-black text-white italic">{health.totalSwarms}</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Ledger Status</div>
                                    <div className="text-2xl font-black text-emerald-500 italic">Immutable</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Institutional Directives */}
                    <Card className="md:col-span-3 bg-black/40 border-intel-gold/20 backdrop-blur-xl border-dashed">
                        <CardHeader className="text-left">
                            <CardTitle className="text-intel-gold uppercase tracking-tighter italic font-black text-xl flex items-center gap-2 text-left">
                                <Award className="w-5 h-5" /> Active Institutional Directives
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-intel-gold/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Autonomous Defense</span>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] uppercase font-black">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-intel-gold/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-intel-gold/10 rounded-lg">
                                        <Zap className="w-4 h-4 text-intel-gold" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Swarm Reallocation</span>
                                </div>
                                <Badge className="bg-intel-gold/20 text-intel-gold border-none text-[8px] uppercase font-black">Active</Badge>
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button 
                                onClick={() => {
                                    // Mock ledger commit for Zenith state
                                    setIsGenerating(true);
                                    setTimeout(() => {
                                        setIsGenerating(false);
                                        toast.success("Institutional Briefing committed to Legacy Ledger", {
                                            description: "Sync Level 100% verified by Global Synapse.",
                                            className: "bg-black border-intel-gold text-intel-gold"
                                        });
                                    }, 1500);
                                }}
                                disabled={isGenerating}
                                className="w-full bg-noble-gold text-black hover:bg-yellow-500 font-black uppercase tracking-[0.2em] text-[10px] h-12 rounded-xl border-none"
                            >
                                {isGenerating ? 'Archiving...' : 'Commit Briefing to Legacy Ledger'}
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
