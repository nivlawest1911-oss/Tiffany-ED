'use client';

import React from 'react';
import useSWR from 'swr';
import { Brain, Users, Shield, LogOut, ChevronRight, Activity, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Quick Node Definitions
const QUICK_NODES = [
    { name: 'IEP Architect', icon: Brain, path: '/generators/iep-architect', color: 'text-emerald-400' },
    { name: 'Legal Vault', icon: Shield, path: '/vault', color: 'text-blue-400' },
    { name: 'Behavior Analyst', icon: Activity, path: '/generators/behavior', color: 'text-purple-400' },
    { name: 'Staff Signal', icon: Users, path: '/generators/staff-signal', color: 'text-amber-400' },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SovereignCommandDeck() {
    const { user, logout } = useAuth();
    const { data: balance, error } = useSWR(user ? `/api/tokens/balance?userId=${user.id}` : null, fetcher);

    // Calculate Trial Days Remaining (Assuming 30 Day Trial)
    // Fallback since creation time isn't strictly typed in AuthContext yet
    const trialStart = (user as any)?.created_at ? new Date((user as any).created_at).getTime() : Date.now();
    const trialEnd = trialStart + (30 * 24 * 60 * 60 * 1000); // 30 days in ms
    const daysRemaining = Math.max(0, Math.ceil((trialEnd - Date.now()) / (1000 * 60 * 60 * 24)));
    const isTrialActive = daysRemaining > 0;

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8 text-white min-h-screen bg-[#050507]">

            {/* 1. Header Protocol */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight font-sans">EdIntel SOVEREIGN</h1>
                        <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Command Deck // Mobile County Node</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-white">{user?.name || 'Sovereign User'}</p>
                        <Badge variant="outline" className="text-[10px] border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
                            STATUS: ACTIVE
                        </Badge>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => logout()} className="text-slate-400 hover:text-white hover:bg-white/5">
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 2. Neural Resources (Token Economy) */}
                <Card className="col-span-1 lg:col-span-2 bg-slate-900/40 border-white/10 backdrop-blur-sm p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap className="w-32 h-32 text-emerald-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-emerald-400 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Neural Resources
                            </h2>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none">LIVE</Badge>
                        </div>

                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-5xl font-black text-white tracking-tighter">
                                {balance?.currentTokens?.toLocaleString() || '---'}
                            </span>
                            <span className="text-slate-400 text-lg font-medium mb-2">TOKENS AVAILABLE</span>
                        </div>

                        <Progress value={balance ? (balance.currentTokens / 2000) * 100 : 0} className="h-2 bg-slate-800 mb-6" indicatorClassName="bg-emerald-500" />

                        <div className="flex gap-4">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide shadow-lg shadow-emerald-900/20">
                                Acquire Resources
                            </Button>
                            <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                                View Usage Logs
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* 3. Trial Protocol Status */}
                <Card className="col-span-1 bg-[#D4AF37]/5 border-[#D4AF37]/20 backdrop-blur-sm p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />

                    <div>
                        <h2 className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                            <Activity className="w-3 h-3" /> Pilot Protocol Status
                        </h2>

                        <div className="text-center py-6">
                            <span className="text-6xl font-black text-white tabular-nums tracking-tighter block mb-1">
                                {daysRemaining}
                            </span>
                            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Days Remaining</span>
                        </div>
                    </div>

                    <Button className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-[#050507] font-bold tracking-wide mt-4">
                        Finalize Site Provisioning
                    </Button>
                </Card>
            </div>

            {/* 4. Strategic Modules & Intelligence Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-4">Strategic Modules</h3>
                    <div className="space-y-4">
                        <Card onClick={() => window.location.href = '/dashboard/agents'} className="bg-gradient-to-r from-purple-900/40 to-slate-900/40 border-purple-500/20 hover:border-purple-500/50 p-4 cursor-pointer group flex items-center gap-4 transition-all">
                            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200 text-lg group-hover:text-purple-400 transition-colors">Digital Teams</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Agentic Orchestration Layer</p>
                            </div>
                        </Card>
                        <Card onClick={() => window.location.href = '/video-studio'} className="bg-gradient-to-r from-sky-900/40 to-slate-900/40 border-sky-500/20 hover:border-sky-500/50 p-4 cursor-pointer group flex items-center gap-4 transition-all">
                            <div className="p-3 bg-sky-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-sky-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200 text-lg group-hover:text-sky-400 transition-colors">Virtual Film Studio</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Generative Media Suite</p>
                            </div>
                        </Card>
                    </div>
                </div>

                <div>
                    <h3 className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-4">Initialize Intelligence Node</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {QUICK_NODES.map((node) => (
                            <Card key={node.name} onClick={() => window.location.href = node.path} className="bg-slate-900/40 border-white/5 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group p-4 flex flex-col justify-between h-32">
                                <div className={`self-start p-2 rounded-lg bg-white/5 ${node.color} group-hover:scale-110 transition-transform`}>
                                    <node.icon className="w-6 h-6" />
                                </div>
                                <div className="flex justify-between items-end">
                                    <h4 className="font-bold text-slate-200 text-sm group-hover:text-emerald-400 transition-colors max-w-[80%] leading-tight">{node.name}</h4>
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Recent Activity (Placeholder for now) */}
            <Card className="bg-slate-900/40 border-white/5 p-6">
                <h3 className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-6">Recent Transmissions</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-sm font-medium text-slate-300">IEP Narrative Generation</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-xs text-slate-500 font-mono">2026-01-28 14:30</span>
                                <Badge variant="outline" className="border-white/10 text-slate-400 text-[10px]">-15 TOKENS</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
}
