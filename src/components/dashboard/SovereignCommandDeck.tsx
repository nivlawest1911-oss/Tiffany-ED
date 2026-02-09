'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Brain, Shield, LogOut, Activity, Zap, Loader2, Mic, FileText, Briefcase, Video } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useSovereignSwarm } from '@/hooks/useSovereignSwarm';
import { SovereignBentoGrid, SovereignBentoItem } from '@/components/ui/SovereignBento';
import { useSovereignVibe } from '@/context/SovereignVibeContext';

// AGGREGATOR NODE DEFINITIONS
// Replaces "QUICK NODES" with the full "Sovereign Swarm" categories
const SWARM_AGGREGATORS = [
    {
        category: 'Admin & Compliance',
        name: 'The Sovereign Brief',
        id: 'admin_brief',
        icon: Mic,
        path: '/admin/vault',
        color: 'text-amber-400',
        intent: 'Synthesize meeting audio into sovereign vault compliance logs',
        description: 'Auto-logs meetings & updates Vault.',
        agents: ['NotebookLM', 'Otter.ai', 'Jotform', 'Grammarly']
    },
    {
        category: 'SPED & IEP',
        name: 'Narrative Architect',
        id: 'iep-architect',
        icon: Brain,
        path: '/generators/iep-architect',
        color: 'text-emerald-400',
        intent: 'Generate comprehensive IEP protocol with predictive modeling',
        description: 'Drafts perfect IEPs in seconds.',
        agents: ['Monsha', 'Brisk', 'Flint', 'Varsity Tutors']
    },
    {
        category: 'Instructional Design',
        name: 'Lesson Architect',
        id: 'lesson-planner',
        icon: FileText,
        path: '/generators/lesson-planner',
        color: 'text-blue-400',
        intent: 'Construct differentiated lesson plan aligned with Science of Reading',
        description: 'Targets Science of Reading benchmarks.',
        agents: ['MagicSchool', 'Eduaide', 'Khanmigo', 'Curipod']
    },
    {
        category: 'Creative & Media',
        name: 'Avatar Synthesis Hub',
        id: 'media_hub',
        icon: Video,
        path: '/video-studio',
        color: 'text-purple-400',
        intent: 'Synthesize text brief into high-fidelity avatar presentation',
        description: 'Turns briefs into Avatar Video.',
        agents: ['HeyGen', 'InVideo', 'Gamma', 'Beautiful.ai']
    },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SovereignCommandDeck() {
    const { user, logout } = useAuth();
    const { toggleCommandConsole } = useSovereignVibe();
    const { data: balance, error: _error } = useSWR(user ? `/api/tokens/balance?userId=${user.id}` : null, fetcher);

    // Sovereign Swarm Integration
    const { executeSwarmProtocol, swarmResponse, isSwarmActive, swarmError } = useSovereignSwarm();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeProtocol, setActiveProtocol] = useState<string>('');

    // Calculate Trial Days Remaining (Assuming 30 Day Trial)
    const trialStart = (user as any)?.created_at ? new Date((user as any).created_at).getTime() : Date.now();
    const trialEnd = trialStart + (30 * 24 * 60 * 60 * 1000); // 30 days in ms
    const daysRemaining = Math.max(0, Math.ceil((trialEnd - Date.now()) / (1000 * 60 * 60 * 24)));
    const _isTrialActive = daysRemaining > 0;

    const handleNodeExecution = (node: typeof SWARM_AGGREGATORS[0]) => {
        setIsDialogOpen(true);
        setActiveProtocol(node.name);
        executeSwarmProtocol(node.intent, { user_tier: 'sovereign', location: 'Mobile County Node', agents: node.agents });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8 text-white min-h-screen bg-[var(--sovereign-black)] legacy-texture overflow-y-auto">

            {/* Swarm Intelligence Overlay */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#0A0E1A]/95 backdrop-blur-xl border border-[var(--intel-gold)]/20 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-[var(--intel-gold)] text-xl font-bold uppercase tracking-widest">
                            {isSwarmActive ? <Loader2 className="animate-spin" /> : <Zap className="fill-current" />}
                            {activeProtocol} Interface
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                            Sovereign Intelligence Architecture // {isSwarmActive ? 'SYNTHESIZING' : 'COMPLETE'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 p-6 rounded-xl bg-black/40 border border-white/5 min-h-[300px] max-h-[60vh] overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed">
                        {swarmResponse ? (
                            <div className="whitespace-pre-wrap">{swarmResponse}</div>
                        ) : isSwarmActive ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 opacity-50">
                                <Activity className="w-8 h-8 text-[var(--intel-gold)] animate-pulse" />
                                <span className="text-xs uppercase tracking-[0.2em]">Aggregating specialized agents...</span>
                            </div>
                        ) : (
                            <div className="text-center opacity-30">Protocol Initialized. Awaiting Data Stream.</div>
                        )}
                        {swarmError && (
                            <div className="text-rose-400 font-bold border-l-2 border-rose-500 pl-4 py-2 mt-4 bg-rose-500/10">
                                ERROR: {swarmError}
                            </div>
                        )}
                    </div>

                    {!isSwarmActive && swarmResponse && (
                        <div className="flex justify-end gap-3 mt-4">
                            <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="border-white/10 hover:bg-white/5">Close</Button>
                            <Button className="bg-[var(--intel-gold)] text-black hover:bg-yellow-500 font-bold uppercase tracking-wider">
                                Execute Protocol
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* 1. Header Protocol */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#050505] to-[#1A1A1A] border border-[var(--intel-gold)]/20 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <Shield className="w-7 h-7 text-[var(--intel-gold)] relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight font-sans text-white">EdIntel <span className="text-[var(--intel-gold)] gilded-flow bg-clip-text text-transparent bg-gradient-to-r from-[var(--intel-gold)] to-[#FDE68A]">SOVEREIGN</span></h1>
                        <p className="text-[10px] text-slate-400 font-mono tracking-[0.3em] uppercase opacity-80">Command Deck // Mobile County Node</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-sm font-bold text-white uppercase tracking-wide">{user?.name || 'Sovereign User'}</p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">System Optimal</span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleCommandConsole}
                        className="text-amber-400 border border-amber-400/20 hover:bg-amber-400/10 uppercase font-bold text-[10px] tracking-widest mr-2"
                    >
                        Close Deck
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => logout()} className="text-slate-400 hover:text-white hover:bg-white/5 rounded-full w-10 h-10 border border-transparent hover:border-white/10">
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2. Neural Resources (Token Economy) */}
                <Card className="col-span-1 lg:col-span-2 bg-[#0A0E1A]/80 border-white/5 backdrop-blur-md p-8 relative overflow-hidden group hover:border-[var(--intel-gold)]/30 transition-all duration-500 shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                        <Zap className="w-64 h-64 text-[var(--intel-gold)]" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-[var(--intel-gold)] font-black text-xs tracking-[0.3em] uppercase flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Neural Resources
                            </h2>
                            <Badge className="bg-[var(--intel-gold)] text-black border-none font-bold animate-pulse text-[10px] px-2 py-0.5">LIVE UPLINK</Badge>
                        </div>

                        <div className="flex items-end gap-3 mb-4">
                            <span className="text-7xl font-black text-white tracking-tighter shadow-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                {balance?.currentTokens?.toLocaleString() || '---'}
                            </span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Tokens Available</span>
                        </div>

                        <Progress value={balance ? (balance.currentTokens / 2000) * 100 : 0} className="h-1.5 bg-white/5 mb-8 rounded-full overflow-hidden" indicatorClassName="bg-gradient-to-r from-[var(--intel-gold)] to-[#FDE68A] gilded-flow" />

                        <div className="flex gap-4">
                            <Button className="bg-[var(--intel-gold)] hover:bg-[#b5952f] text-black font-black tracking-widest uppercase px-8 py-6 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-transform hover:scale-105">
                                Acquire
                            </Button>
                            <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 font-mono uppercase text-xs rounded-full px-6">
                                View Ledger
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* 3. Executive Brief (Leadership IQ) - Formerly Trial Status */}
                <Card className="col-span-1 bg-gradient-to-br from-[#1A1A1A] to-[#0A0E1A] border-[var(--intel-gold)]/20 backdrop-blur-sm p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_60%)]" />

                    <div>
                        <h2 className="text-[var(--intel-gold)] font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                            <Briefcase className="w-3 h-3" /> Executive Brief
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                    "Dr. West, you saved <span className="text-emerald-400 font-bold">14 teachers</span> from burnout today. Battery at <span className="text-[var(--intel-gold)] font-bold">90%</span>."
                                </p>
                            </div>
                            <div className="text-center py-4">
                                <span className="text-5xl font-black text-white tabular-nums tracking-tighter block mb-1 group-hover:scale-105 transition-transform duration-500">
                                    {daysRemaining}
                                </span>
                                <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em]">Days Remaining in Pilot</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 4. Super-Intelligence Aggregator (The Swarm) */}
            <div>
                <h3 className="text-noble-gold/60 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 border-b border-white/5 pb-2">Swarm Intelligence Aggregator</h3>

                <SovereignBentoGrid>
                    {SWARM_AGGREGATORS.map((node, i) => (
                        <SovereignBentoItem
                            key={node.id}
                            title={node.name}
                            description={node.description}
                            icon={<node.icon size={20} />}
                            className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                            onClick={() => handleNodeExecution(node)}
                            header={
                                <div className="flex -space-x-2 mb-4">
                                    {node.agents.map((agent, agentIndex) => (
                                        <div key={agentIndex} className="w-6 h-6 rounded-full bg-slate-800 border border-noble-gold/20 flex items-center justify-center text-[6px] text-white font-bold overflow-hidden shadow-lg z-[1]" style={{ zIndex: 10 - agentIndex }}>
                                            {agent[0]}
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    ))}
                </SovereignBentoGrid>
            </div>

            {/* 5. Live Transmission Log */}
            <Card className="bg-[#0A0E1A]/60 border-white/5 p-8 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-70">Sovereign Transmission Log</h3>
                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 text-[10px] px-2">SYSTEM STABLE</Badge>
                </div>
                <div className="space-y-1">
                    {[
                        { action: 'IEP Narrative Generated', time: '14:30', cost: '-15', status: 'COMPLETE' },
                        { action: 'Behavioral Pattern Detected', time: '14:15', cost: 'AUTO', status: 'FLAGGED' },
                        { action: 'Executive Briefing Synced', time: '09:00', cost: 'FREE', status: 'SYNCED' }
                    ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 -mx-4 transition-colors group cursor-default">
                            <div className="flex items-center gap-4">
                                <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'FLAGGED' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
                                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{log.action}</span>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">2026-02-03 {log.time}</span>
                                <Badge variant="outline" className="border-white/5 text-slate-500 text-[9px] group-hover:border-[var(--intel-gold)]/30 group-hover:text-[var(--intel-gold)] transition-all min-w-[60px] justify-center">{log.cost} TOKENS</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
}
