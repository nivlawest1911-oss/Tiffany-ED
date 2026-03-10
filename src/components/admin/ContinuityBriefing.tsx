'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    AlertTriangle,
    ArrowRightLeft,
    TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ContinuityBriefingProps {
    userId?: string;
}

import { globalSynapse } from '@/lib/GlobalSynapse';
import { ParticleBackground } from '@/components/ui/Cinematic';

export function ContinuityBriefing({ userId: _userId }: ContinuityBriefingProps) {
    const isZenith = globalSynapse.getStatus().isTranscended;
    // userId will be used for future permission scoping
    const [ongoingDirectives, setOngoingDirectives] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBriefingData = async () => {
            try {
                const response = await fetch('/api/vault/legacy');
                if (response.ok) {
                    const data = await response.json();
                    // For the briefing, we prioritize entries that don't have an outcome yet (ongoing)
                    const ongoing = data.filter((entry: any) => !entry.outcome).slice(0, 3);
                    setOngoingDirectives(ongoing);
                }
            } catch (error) {
                console.error('Failed to fetch briefing data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBriefingData();
    }, []);

    const handleHandoffSimulation = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Synthesizing institutional memory for handoff...',
                success: 'Strategic continuity briefing exported to secure buffer.',
                error: 'Handoff synthesis failed.'
            }
        );
    };

    return (
        <Card className={`relative bg-zinc-900/50 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl h-full border-l-4 ${isZenith ? 'border-l-intel-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-l-amber-500'}`}>
            {isZenith && <ParticleBackground count={15} color="bg-intel-gold/5" />}

            <CardHeader className={`relative z-10 border-b border-white/5 ${isZenith ? 'bg-intel-gold/5' : 'bg-black/40'} py-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 ${isZenith ? 'bg-intel-gold' : 'bg-amber-500/10'} rounded-lg transition-all duration-1000`}>
                            <ArrowRightLeft className={`w-5 h-5 ${isZenith ? 'text-black' : 'text-amber-500'}`} />
                        </div>
                        <div>
                            <CardTitle className="text-white text-sm tracking-widest uppercase font-black">
                                {isZenith ? 'Sovereign' : 'Continuity'} <span className="text-intel-gold">{isZenith ? 'Zenith' : 'Briefing'}</span>
                            </CardTitle>
                            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-tighter">
                                {isZenith ? 'Transcendence Level Reporting' : 'Institutional Succession Layer'}
                            </p>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
                        onClick={handleHandoffSimulation}
                    >
                        Export Handoff
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {/* Active Directives */}
                    <div className="p-6 space-y-4 col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-amber-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Active Strategic Directives</h4>
                        </div>

                        {isLoading ? (
                            <div className="animate-pulse space-y-3">
                                {[1, 2].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl" />)}
                            </div>
                        ) : ongoingDirectives.length === 0 ? (
                            <div className="py-8 text-center bg-white/5 rounded-xl border border-dashed border-white/10">
                                <Target className="w-6 h-6 text-zinc-700 mx-auto mb-2" />
                                <p className="text-[10px] text-zinc-500 uppercase font-black">No active directives found</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {ongoingDirectives.map((directive, index) => (
                                    <motion.div
                                        key={directive.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-amber-500/30 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="text-[11px] font-bold text-amber-100 group-hover:text-amber-400 transition-colors uppercase">{directive.title}</h5>
                                            <span className="text-[8px] font-black text-amber-500/70 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-widest">Ongoing</span>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                                            {directive.directive}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stats & Health */}
                    <div className="p-6 bg-black/20 space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-4 h-4 text-cyan-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Growth Velocity</h4>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
                                        <span className="text-zinc-500">Continuity Score</span>
                                        <span className="text-cyan-400">92%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-cyan-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "92%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Knowledge Retention</p>
                                        <p className="text-lg font-black text-white tracking-tighter">0.98<span className="text-[10px] text-zinc-500 ml-1">σ</span></p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Succession Readiness</p>
                                        <p className="text-lg font-black text-white tracking-tighter">Alpha</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-3 h-3 text-amber-500" />
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-amber-100">Priority Alerts</h4>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-[9px] text-zinc-400 leading-tight">
                                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-1 shrink-0" />
                                    Long-term scalability logic requires verification in Q3.
                                </li>
                                <li className="flex gap-2 text-[9px] text-zinc-400 leading-tight">
                                    <div className="w-1 h-1 rounded-full bg-cyan-500 mt-1 shrink-0" />
                                    AI core alignment shift detected in regional swarm.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
            {/* Ambient Background Element */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />
        </Card>
    );
}
