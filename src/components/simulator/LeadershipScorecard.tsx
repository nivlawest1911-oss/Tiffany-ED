'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

interface ScorecardProps {
    metrics: {
        diplomacy: number;
        decisiveness: number;
        resources: number;
        sentiment: number;
    };
    scenarioTitle: string;
}

export function LeadershipScorecard({ metrics, scenarioTitle }: ScorecardProps) {
    const overallScore = Math.round((metrics.diplomacy + metrics.decisiveness + metrics.resources + metrics.sentiment) / 4);

    const getGrade = (score: number) => {
        if (score >= 90) return { label: 'Strategic Visionary', color: 'text-intel-gold' };
        if (score >= 75) return { label: 'Effective Administrator', color: 'text-emerald-400' };
        if (score >= 60) return { label: 'Pragmatic Leader', color: 'text-blue-400' };
        return { label: 'Crisis Mode', color: 'text-rose-400' };
    };

    const grade = getGrade(overallScore);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 rounded-full bg-intel-gold/10 border border-intel-gold/20 mb-4">
                    <span className="text-[10px] font-black text-intel-gold uppercase tracking-[0.2em]">Leadership Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                    <span>Index: 0x{Math.floor(Math.random() * 1000).toString(16).toUpperCase()}</span>
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    {scenarioTitle} <span className="text-intel-gold">Final Audit</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="p-8 border-intel-gold/20 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-6">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={376.8}
                                initial={{ strokeDashoffset: 376.8 }}
                                animate={{ strokeDashoffset: 376.8 - (376.8 * overallScore) / 100 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="text-intel-gold"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-white italic">{overallScore}%</span>
                            <span className="text-[8px] font-black text-zinc-400 uppercase">Efficacy</span>
                        </div>
                    </div>
                    <div className={`text-xl font-black uppercase italic ${grade.color}`}>{grade.label}</div>
                    <p className="text-[10px] text-zinc-400 mt-2 font-mono uppercase tracking-widest">Aggregate Leadership Index</p>
                </GlassCard>

                <div className="space-y-4">
                    {[
                        { label: 'Diplomacy', val: metrics.diplomacy, icon: <Users size={14} />, desc: 'Stakeholder alignment and community trust.' },
                        { label: 'Decisiveness', val: metrics.decisiveness, icon: <Zap size={14} />, desc: 'Speed and clarity of strategic action.' },
                        { label: 'Resources', val: metrics.resources, icon: <TrendingUp size={14} />, desc: 'Fiscal health and material readiness.' },
                        { label: 'Sentiment', val: metrics.sentiment, icon: <HeartIcon size={14} />, desc: 'School morale and cultural stability.' }
                    ].map((m) => (
                        <GlassCard key={m.label} className="p-4 border-white/5 hover:border-white/10 transition-all flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-lg text-white/60">
                                {m.icon}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{m.label}</span>
                                    <span className="text-xs font-bold text-intel-gold">{m.val}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-intel-gold/40"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.val}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </div>
                                <p className="text-[8px] text-white/30 mt-1 italic">{m.desc}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-intel-gold w-4 h-4" />
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Swarm Integration Insights</h4>
                </div>
                <p className="text-xs text-white/60 text-left italic leading-relaxed">
                    Based on these results, the EdIntel Swarm predicts a 14% increase in institutional stability if the "Hybrid Teacher-in-the-Loop" protocol is maintained. Continuous simulation is recommended for optimal continuity.
                </p>
            </div>
        </div>
    );
}

function HeartIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}
