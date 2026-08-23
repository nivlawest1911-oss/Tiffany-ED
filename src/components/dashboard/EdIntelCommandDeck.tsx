'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Brain, Shield, LogOut, Activity, Zap, Loader2, Mic, FileText, Briefcase, Video, Globe, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useEdIntelSwarm } from '@/hooks/useEdIntelSwarm';
import { EdIntelBentoGrid, EdIntelBentoItem } from '@/components/ui/EdIntelBento';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import { motion } from 'framer-motion';
import { SovereignBadge } from '@/components/ui/SovereignBadge';
import React, { memo } from 'react';

// MEMOIZED SUB-COMPONENTS
const NeuralResourcesCard = memo(({ balance, isSystemThinking, onAcquire, onViewLedger }: { balance: any, isSystemThinking: boolean, onAcquire: () => void, onViewLedger: () => void }) => (
    <Card className={cn(
        "col-span-1 lg:col-span-2 bg-[#050814]/90 border-white/10 backdrop-blur-xl p-6 relative overflow-hidden group transition-all duration-500 shadow-2xl rounded-2xl",
        isSystemThinking ? "border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]" : "hover:border-amber-400/30"
    )}>
        {isSystemThinking && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-amber-400 pointer-events-none"
            />
        )}

        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
            <Zap className={cn("w-48 h-48 text-amber-400 transition-transform duration-700", isSystemThinking && "scale-110 rotate-12")} />
        </div>

        <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-400 font-mono font-bold text-xs tracking-[0.25em] uppercase flex items-center gap-2">
                    <Zap className={cn("w-4 h-4", isSystemThinking && "animate-pulse")} /> Neural Resources Matrix
                </h2>
                <Badge className={cn(
                    "border-none font-mono text-[9px] px-2.5 py-0.5 uppercase tracking-wider transition-colors duration-500 rounded-full",
                    isSystemThinking ? "bg-emerald-500 text-white animate-pulse" : "bg-amber-400 text-black font-black"
                )}>
                    {isSystemThinking ? 'Neural Sync Active' : 'LIVE UPLINK'}
                </Badge>
            </div>

            <div className="flex items-end gap-3">
                <span className="text-5xl md:text-6xl font-black text-white font-mono tracking-tighter shadow-xl">
                    {balance?.currentTokens?.toLocaleString() || '951,400'}
                </span>
                <span className="text-zinc-400 text-xs font-mono font-bold uppercase tracking-widest mb-2">Tokens Available</span>
            </div>

            <Progress
                value={balance ? (balance.currentTokens / 2000) * 100 : 75}
                className="h-2 bg-white/5 rounded-full overflow-hidden"
                indicatorClassName={cn(
                    "bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-1000",
                    isSystemThinking ? "brightness-125 shadow-[0_0_12px_rgba(245,158,11,0.8)]" : ""
                )}
            />

            <div className="flex gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                        onClick={onAcquire}
                        className="bg-amber-400 hover:bg-amber-300 text-black font-mono font-black tracking-widest uppercase px-6 py-5 text-xs rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                        Acquire Tokens
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                        onClick={onViewLedger}
                        variant="secondary"
                        className="border border-white/10 text-zinc-300 hover:bg-white/5 font-mono uppercase text-xs rounded-xl px-5 py-5"
                    >
                        View Ledger
                    </Button>
                </motion.div>
            </div>
        </div>
    </Card>
));

NeuralResourcesCard.displayName = 'NeuralResourcesCard';

const ExecutiveBriefCard = memo(({ daysRemaining }: { daysRemaining: number }) => (
    <Card className="col-span-1 bg-[#050814]/90 border-white/10 backdrop-blur-xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-2xl rounded-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_60%)]" />

        <div className="space-y-6">
            <h2 className="text-amber-400 font-mono font-bold text-xs tracking-[0.25em] uppercase flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Executive Brief
            </h2>

            <div className="space-y-4">
                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <p className="text-zinc-300 text-xs leading-relaxed font-sans font-medium">
                        "Dr. West, you saved <span className="text-emerald-400 font-bold">14 teachers</span> from burnout today. Battery at <span className="text-amber-400 font-bold">90%</span>."
                    </p>
                </div>
                <div className="text-center py-2">
                    <span className="text-4xl md:text-5xl font-black text-white font-mono tabular-nums tracking-tighter block mb-1">
                        {daysRemaining}
                    </span>
                    <span className="text-zinc-500 text-[9px] font-mono font-bold uppercase tracking-[0.3em]">Days Remaining in Pilot</span>
                </div>
            </div>
        </div>
    </Card>
));

ExecutiveBriefCard.displayName = 'ExecutiveBriefCard';

const TransmissionLog = memo(() => (
    <Card className="bg-[#050814]/90 border-white/10 p-6 backdrop-blur-xl rounded-2xl">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-zinc-400 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">EdIntel Transmission Log</h3>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 font-mono text-[9px] px-2 py-0.5">SYSTEM STABLE</Badge>
        </div>
        <div className="space-y-1">
            {[
                { action: 'IEP Narrative Generated', time: '14:30', cost: '-15', status: 'COMPLETE' },
                { action: 'Behavioral Pattern Detected', time: '14:15', cost: 'AUTO', status: 'FLAGGED' },
                { action: 'Executive Briefing Synced', time: '09:00', cost: 'FREE', status: 'SYNCED' }
            ].map((log, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-3 rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'FLAGGED' ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`} />
                        <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">2026-02-03 {log.time}</span>
                        <Badge variant="outline" className="border-white/10 text-zinc-400 font-mono text-[9px] group-hover:border-amber-400/30 group-hover:text-amber-400 transition-all min-w-[60px] justify-center">{log.cost} TOKENS</Badge>
                    </div>
                </div>
            ))}
        </div>
    </Card>
));

TransmissionLog.displayName = 'TransmissionLog';

const SWARM_AGGREGATORS = [
    {
        category: 'Admin & Compliance',
        name: 'The EdIntel Brief',
        id: 'admin_brief',
        icon: Mic,
        path: '/admin/vault',
        color: 'text-amber-400',
        intent: 'Synthesize meeting audio into EdIntel vault compliance logs',
        description: 'Auto-logs meetings & updates Vault.',
        agents: ['Vault Link', 'Audit Node', 'Compliance Agent', 'Registry Guard']
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
        agents: ['IEP Specialist', 'Curriculum Node', 'Instructional Link', 'Data Architect']
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
        agents: ['Lesson Architect', 'Instructional Link', 'Differentiated Node', 'Engagement Agent']
    },
    {
        category: 'Creative & Media',
        name: 'Avatar Synthesis Hub',
        id: 'media_hub',
        icon: Video,
        path: '/studio',
        color: 'text-purple-400',
        intent: 'Synthesize text brief into high-fidelity presentation node',
        description: 'Turns briefs into Avatar Video.',
        agents: ['Synthesis Engine', 'Broadcast Node', 'Visual Link', 'Design Architect']
    },
    {
        category: 'District Operations',
        name: 'Fleet Intelligence',
        id: 'fleet_intel',
        icon: Globe,
        path: '/fleet',
        color: 'text-amber-500',
        intent: 'Analyze district-wide telemetry',
        description: 'Command district-wide fleet intelligence.',
        agents: ['Fleet Commander', 'Telemetry Node', 'Regional Link', 'Academic Agent']
    },
    {
        category: 'Executive Function',
        name: 'The Cognitive Gym',
        id: 'cognitive-gym',
        icon: Brain,
        path: '/generators/cognitive-gym',
        color: 'text-pink-400',
        intent: 'Initiate executive function training protocol',
        description: 'Mental sparring for leaders.',
        agents: ['Cognitive Node', 'Memory Agent', 'Focus Link']
    },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EdIntelCommandDeck() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { toggleCommandConsole, isSystemThinking } = useEdIntelVibe();
    const { data: balance } = useSWR(user ? `/api/tokens/balance?userId=${user.id}` : null, fetcher);

    const { executeSwarmProtocol, swarmResponse, isSwarmActive, swarmError, syncProgress } = useEdIntelSwarm();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeProtocol, setActiveProtocol] = useState<string>('');

    const trialStart = (user as any)?.created_at ? new Date((user as any).created_at).getTime() : Date.now();
    const trialEnd = trialStart + (30 * 24 * 60 * 60 * 1000);
    const daysRemaining = Math.max(0, Math.ceil((trialEnd - Date.now()) / (1000 * 60 * 60 * 24)));

    const handleNodeExecution = (node: typeof SWARM_AGGREGATORS[0]) => {
        setIsDialogOpen(true);
        setActiveProtocol(node.name);
        executeSwarmProtocol(node.intent, { user_tier: 'EdIntel', location: 'Mobile County Node', agents: node.agents });
    };

    return (
        <div className={cn(
            "w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 text-white min-h-screen relative overflow-y-auto transition-colors duration-500 font-sans",
            isSystemThinking ? "bg-[#030712]" : "bg-[#030712]"
        )}>
            {/* Swarm Dialog Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#050814]/95 backdrop-blur-2xl border border-amber-400/30 text-white max-w-2xl shadow-2xl rounded-2xl font-sans">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-amber-400 text-lg font-black uppercase tracking-wider font-mono">
                            {isSwarmActive ? <Loader2 className="animate-spin text-amber-400" /> : <Zap className="fill-amber-400 text-amber-400" />}
                            {activeProtocol} Interface
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.2em] flex justify-between items-center border-b border-white/5 pb-3">
                            <span>Swarm Protocol // {isSwarmActive ? 'SYNTHESIZING' : 'COMPLETE'}</span>
                            {isSwarmActive && <span className="text-amber-400 animate-pulse">{syncProgress}% SYNC</span>}
                        </DialogDescription>
                    </DialogHeader>

                    {isSwarmActive && (
                        <div className="mt-2 space-y-1">
                            <Progress value={syncProgress} className="h-1.5 bg-white/5 rounded-full overflow-hidden" indicatorClassName="bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-300" />
                            <p className="text-[9px] text-emerald-400 font-mono tracking-widest text-right uppercase">Neural Syncing...</p>
                        </div>
                    )}

                    <div className="mt-3 p-5 rounded-xl bg-black/60 border border-white/5 min-h-[260px] max-h-[55vh] overflow-y-auto custom-scrollbar font-mono text-xs leading-relaxed">
                        {swarmResponse ? (
                            <div className="whitespace-pre-wrap">{swarmResponse}</div>
                        ) : isSwarmActive ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3 opacity-60">
                                <Activity className="w-7 h-7 text-amber-400 animate-pulse" />
                                <span className="text-xs uppercase tracking-[0.2em] font-mono">Aggregating specialized agents...</span>
                            </div>
                        ) : (
                            <div className="text-center opacity-40">Protocol Initialized. Awaiting Data Stream.</div>
                        )}
                        {swarmError && (
                            <div className="text-rose-400 font-bold border-l-2 border-rose-500 pl-3 py-2 mt-3 bg-rose-500/10 font-mono text-xs">
                                ERROR: {swarmError}
                            </div>
                        )}
                    </div>

                    {!isSwarmActive && swarmResponse && (
                        <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-white/5 font-mono">
                            <Button onClick={() => setIsDialogOpen(false)} variant="secondary" className="border-white/10 text-zinc-400 uppercase text-[10px] tracking-widest font-bold rounded-lg">Close</Button>
                            <Button
                                onClick={() => router.push(SWARM_AGGREGATORS.find(n => n.name === activeProtocol)?.path || '/')}
                                className="bg-emerald-500 text-black hover:bg-emerald-400 font-black uppercase tracking-widest text-[10px] px-5 rounded-lg"
                            >
                                Enter Module
                            </Button>
                            <Button 
                                onClick={() => toast.success("Protocol Implementation Successful", { description: `Institutional sync with ${activeProtocol} finalized.` })}
                                className="bg-amber-400 text-black hover:bg-amber-300 font-black uppercase tracking-widest text-[10px] px-5 rounded-lg"
                            >
                                Execute Protocol
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Header Protocol */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-400/30 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden">
                        <Shield className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight font-sans text-white uppercase italic">
                            EdIntel <span className="text-amber-400">Sovereign</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] text-zinc-400 font-mono tracking-[0.2em] uppercase">Command Deck // Mobile County Node</p>
                            {user?.tier && <SovereignBadge tier={user.tier} className="py-0.5" />}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-xs font-bold text-white uppercase tracking-wide">{user?.name || 'Keisha Reynolds'}</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">System Optimal</span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleCommandConsole}
                        className="text-amber-400 border border-amber-400/20 hover:bg-amber-400/10 uppercase font-mono font-bold text-[10px] tracking-widest rounded-xl"
                    >
                        Close Deck
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => logout()} className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl w-9 h-9 border border-transparent hover:border-white/10">
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <NeuralResourcesCard
                    balance={balance}
                    isSystemThinking={isSystemThinking}
                    onAcquire={() => router.push('/pricing')}
                    onViewLedger={() => router.push('/admin/status')}
                />
                <ExecutiveBriefCard daysRemaining={daysRemaining} />
            </div>

            {/* Swarm Intelligence Matrix */}
            <div className="space-y-4">
                <h3 className="text-amber-400/80 font-mono text-[10px] font-bold tracking-[0.3em] uppercase border-b border-white/5 pb-2">
                    Swarm Intelligence Aggregator
                </h3>

                <EdIntelBentoGrid>
                    {SWARM_AGGREGATORS.map((aggregator, i) => (
                        <EdIntelBentoItem
                            key={aggregator.id}
                            title={aggregator.name}
                            description={aggregator.description}
                            icon={<aggregator.icon size={18} />}
                            className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                            onClick={() => handleNodeExecution(aggregator)}
                            header={
                                <div className="flex -space-x-1.5 mb-3">
                                    {aggregator.agents.map((agent, agentIndex) => (
                                        <div 
                                            key={agentIndex} 
                                            className="w-5 h-5 rounded-full bg-zinc-900 border border-amber-400/30 flex items-center justify-center text-[7px] text-amber-300 font-mono font-bold shadow-md"
                                        >
                                            {agent[0]}
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    ))}
                </EdIntelBentoGrid>
            </div>

            <TransmissionLog />
        </div>
    );
}
