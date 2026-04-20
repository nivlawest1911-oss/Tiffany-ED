'use client';

import React from 'react';
import {
    TrendingUp,
    Clock,
    Activity,
    Users,
    ArrowUpRight,
    ShieldCheck,
    Globe,
    Award,
    Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { calculateSovereignSavings, formatCurrency } from '@/lib/roi-logic';
import { StrategicForecast } from './StrategicForecast';
import { ContinuityBriefing } from './ContinuityBriefing';
import { LegacyPulseChart } from './LegacyPulseChart';
// Imports kept for type alignment or future functional hooks
import { unityOrchestrator } from '@/lib/UnityOrchestrator';
import { oracleEngine } from '@/lib/OracleEngine';
import { globalSynapse } from '@/lib/GlobalSynapse';
import { ParticleBackground } from '@/components/ui/Cinematic';

const MOCK_METRICS = {
    legalDocumentsReviewed: 42,
    gradingHoursSaved: 156,
    administrativeTasksAutomated: 88,
    complianceChecksRun: 120
};

const MOCK_ORACLE_INSIGHTS = [
    { id: 'o1', insight: 'Cross-node latency detected in Education/Academy bridge.', impact: 'medium' },
    { id: 'o2', insight: 'Fiscal swarm predicts 15% surplus for Q3.', impact: 'high' },
    { id: 'o3', insight: 'Personnel sentiment trending positive (+12%).', impact: 'low' }
];

export function AdminCommandDashboard() {
    const savings = calculateSovereignSavings(MOCK_METRICS);
    const isZenith = globalSynapse.getStatus().isTranscended;

    // Initial check for system equilibrium and strategic reasoning
    React.useEffect(() => {
        const _health = unityOrchestrator.getGlobalHealth();
        const _insights = oracleEngine.getStrategicForecast('ADMIN_COMMAND_BOOTLOAD');
    }, []);

    return (
        <div className="space-y-8 pb-20 relative">
            <ParticleBackground count={40} color="bg-intel-gold/10" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${isZenith ? 'bg-intel-gold animate-pulse shadow-[0_0_20px_#D4AF37]' : 'bg-white/5'} transition-all duration-1000`}>
                            <ShieldCheck className={isZenith ? 'text-black' : 'text-intel-gold'} size={24} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white text-left leading-none">
                                {isZenith ? 'Sovereign' : 'Admin'} <span className="text-intel-gold">{isZenith ? 'Zenith' : 'Command'}</span>
                            </h2>
                            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] mt-1 text-left">
                                {isZenith ? 'Institutional Transcendence Active' : 'Tactical District Operations & Intelligence'}
                            </p>
                        </div>
                    </div>
                    {globalSynapse.getStatus().isTranscended && (
                        <Badge className="mt-4 bg-intel-gold text-black border-none font-black italic flex items-center gap-1 w-fit">
                            <Sparkles className="w-3 h-3" /> Transcendence Layer Active
                        </Badge>
                    )}
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="ghost"
                        className="border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                        onClick={() => window.location.href = '/vault'}
                    >
                        Audit System Lineage
                    </Button>
                    <Button
                        className="bg-intel-gold text-black hover:bg-intel-gold/90 font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-intel-gold/20 px-8 py-6 h-auto"
                        onClick={() => window.location.href = '/unity'}
                    >
                        Execute Unity Sync
                    </Button>
                </div>
            </div>

            {/* ROI & District Pulse Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-intel-gold" /> Total Savings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-intel-gold italic">
                            {formatCurrency(savings.totalSavings)}
                        </div>
                        <p className="text-[10px] text-emerald-500/60 font-mono mt-1">
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3 text-intel-gold" /> Capacity Reclaimed
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-white italic">
                            {savings.hoursReclaimed}h
                        </div>
                        <p className="text-[10px] text-white/20 font-mono mt-1">
                            Equivalent to 2.4 FT staff
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-intel-gold" /> Risk Mitigated
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-emerald-500 italic">
                            92%
                        </div>
                        <p className="text-[10px] text-white/20 font-mono mt-1">
                            Active compliance shielding
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader className="pb-2 text-left">
                        <CardTitle className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-3 h-3 text-intel-gold" /> System Equilibrium
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="text-3xl font-black text-intel-gold italic">
                            98.2
                        </div>
                        <p className="text-[10px] text-white/20 font-mono mt-1">
                            Unity Orchestrator Score
                        </p>
                    </CardContent>
                </Card>
            </div >

            {/* Strategic Projections Expansion */}
            < StrategicForecast />

            {/* Continuity Briefing - Phase 19 */}
            < ContinuityBriefing />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Fleet Overview - Phase 24 */}
                <Card className="bg-noble-gold/5 border-noble-gold/20 backdrop-blur-xl relative overflow-hidden group hover:border-noble-gold/40 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                        <Globe className="w-24 h-24 text-noble-gold" />
                    </div>
                    <CardHeader className="text-left">
                        <CardTitle className="text-noble-gold uppercase tracking-tighter italic font-black text-xl flex items-center gap-2">
                            Regional <span className="text-white">Fleet</span>
                        </CardTitle>
                        <CardDescription className="text-noble-gold/40 text-[10px] uppercase font-mono tracking-widest">
                            Cross-District Intelligence Status
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-left">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] font-bold text-white/40 uppercase">Active Nodes</span>
                                <span className="text-xl font-black text-white">4 / 5</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] font-bold text-white/40 uppercase">Global Sync Status</span>
                                <span className="text-emerald-500 font-black text-xs uppercase italic drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">Operational</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => window.location.href = '/fleet'}
                            className="w-full bg-noble-gold text-black hover:bg-yellow-500 font-bold uppercase tracking-widest text-[10px] mt-6 border-none"
                        >
                            Open Command Hub <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Alerts & Operational Status */}
                {/* Oracle Strategic Insights */}
                <Card className="lg:col-span-1 bg-black/40 border-intel-gold/20 backdrop-blur-xl border-dashed">
                    <CardHeader className="text-left">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-intel-gold uppercase tracking-tighter italic font-black text-xl">
                                    Oracle <span className="text-white">Insights</span>
                                </CardTitle>
                                <CardDescription className="text-intel-gold/40 text-[10px] uppercase font-mono tracking-widest">
                                    Deep reasoning synthesis
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="border-intel-gold/50 text-intel-gold font-black text-[9px] uppercase tracking-widest">
                                Live
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {MOCK_ORACLE_INSIGHTS.map((insight) => (
                                <div key={insight.id} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-intel-gold/20 transition-all">
                                    <p className="text-xs text-white/80 font-medium italic">"{insight.insight}"</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className={`w-1 h-1 rounded-full ${insight.impact === 'high' ? 'bg-red-500' :
                                            insight.impact === 'medium' ? 'bg-intel-gold' : 'bg-emerald-500'
                                            }`} />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-white/20">
                                            Impact: {insight.impact}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={() => window.location.href = '/oracle'}
                            className="w-full bg-white/5 text-intel-gold hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] mt-6 border border-intel-gold/20"
                        >
                            Open Reasoning Engine
                        </Button>
                    </CardContent>
                </Card>

                {/* Quick Commands */}
                <div className="space-y-6 text-left">
                    <Card className="bg-intel-gold text-black border-none relative overflow-hidden group mb-6">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                            <Users className="w-32 h-32" />
                        </div>
                        <CardHeader className="text-left">
                            <CardTitle className="uppercase italic font-black text-2xl tracking-tighter">
                                Executive <br /> Roleplay
                            </CardTitle>
                            <CardDescription className="text-black/60 text-[10px] uppercase font-black font-mono tracking-widest">
                                Simulate District Conflict
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-left">
                            <Button
                                onClick={() => window.location.href = '/simulator'}
                                className="w-full bg-black text-intel-gold hover:bg-black/80 font-bold uppercase tracking-widest text-[10px] mt-4 border-none"
                            >
                                Launch Simulator
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-intel-gold text-black border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                            <Award className="w-32 h-32" />
                        </div>
                        <CardHeader className="text-left">
                            <CardTitle className="uppercase italic font-black text-2xl tracking-tighter">
                                Sovereign <br /> Briefing
                            </CardTitle>
                            <CardDescription className="text-black/60 text-[10px] uppercase font-black font-mono tracking-widest">
                                Official District Mastery Report
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-left">
                            <Button
                                onClick={() => window.location.href = '/briefing'}
                                className="w-full bg-black text-intel-gold hover:bg-black/80 font-bold uppercase tracking-widest text-[10px] mt-4 border-none"
                            >
                                Review Synthesis
                            </Button>
                        </CardContent>
                    </Card>

                    <LegacyPulseChart />
                </div>
            </div>
        </div >
    );
}
