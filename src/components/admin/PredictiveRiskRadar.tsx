'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Cinematic';
import { ShieldAlert, AlertTriangle, Zap, Target, Users } from 'lucide-react';

const RISK_CATEGORIES = [
    { key: 'compliance', label: 'Compliance', icon: ShieldAlert, color: 'text-rose-500' },
    { key: 'budget', label: 'Budget', icon: Zap, color: 'text-amber-500' },
    { key: 'staffing', label: 'Staffing', icon: Users, color: 'text-blue-500' },
    { key: 'performance', label: 'Performance', icon: Target, color: 'text-emerald-500' },
    { key: 'operational', label: 'Operational', icon: AlertTriangle, color: 'text-indigo-500' },
];

export function PredictiveRiskRadar() {
    const [risks, setRisks] = useState<Record<string, number>>({
        compliance: 12,
        budget: 45,
        staffing: 28,
        performance: 15,
        operational: 32
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate live variance based on "Forecaster" agent jitter
            setRisks(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(k => {
                    updated[k] = Math.max(5, Math.min(95, updated[k] + (Math.random() * 10 - 5)));
                });
                return updated;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GlassCard className="p-8 border-rose-500/10 bg-black/40 relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldAlert className="w-32 h-32 text-rose-500" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/90">Predictive Risk Radar</h3>
                        <p className="text-[10px] text-slate-500 font-bold">Live AI Threat Vector Assessment</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {RISK_CATEGORIES.map((cat, _idx) => (
                        <div key={cat.key} className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest">
                                <div className="flex items-center gap-2">
                                    <cat.icon className={`w-3 h-3 ${cat.color}`} />
                                    <span className="text-white/60">{cat.label}</span>
                                </div>
                                <span className={cat.color}>{risks[cat.key].toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${risks[cat.key]}%`,
                                        backgroundColor: risks[cat.key] > 70 ? '#f43f5e' : risks[cat.key] > 40 ? '#f59e0b' : '#10b981'
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
                            </div>
                        ))}
                    </div>
                    <span className="text-[9px] font-bold text-rose-500/50 uppercase tracking-widest animate-pulse">
                        Analyzing 42 vector points...
                    </span>
                </div>
            </div>
        </GlassCard>
    );
}
