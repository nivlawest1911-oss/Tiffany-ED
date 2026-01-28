'use client';

import React, { useEffect } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Brain, Scroll, Scale, Users, Shield, LogOut, ChevronRight, Activity, Zap } from 'lucide-react';
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
    const { data: balance, error } = useSWR(user ? `/api/tokens/balance?userId=${user.uid}` : null, fetcher);

    // Calculate Trial Days Remaining (Assuming 30 Day Trial)
    const trialStart = user?.metadata?.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now();
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
                        <p className="text-sm font-medium text-white">{user?.displayName || 'Sovereign User'}</p>
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

            {/* 4. Intelligence Nodes (Quick Actions) */}
            <div>
                <h3 className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-4">Initialize Intelligence Node</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {QUICK_NODES.map((node) => (
                        <Card key={node.name} className="bg-slate-900/40 border-white/5 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-lg bg-white/5 ${node.color} group-hover:scale-110 transition-transform`}>
                                    <node.icon className="w-6 h-6" />
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{node.name}</h4>
                        </Card>
                    ))}
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
