'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, RiskVector } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function PredictiveRiskRadar() {
    const [atlas, setAtlas] = useState(engine.getPredictiveRiskAtlas());

    useEffect(() => {
        const interval = setInterval(() => {
            setAtlas(engine.getPredictiveRiskAtlas());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const getTrendIcon = (trend: RiskVector['trend']) => {
        switch (trend) {
            case 'up': return <TrendingUp size={12} className="text-rose-500" />;
            case 'down': return <TrendingDown size={12} className="text-emerald-500" />;
            default: return <Minus size={12} className="text-zinc-500" />;
        }
    };

    return (
        <GlassCard className="p-8 border-rose-500/10 bg-rose-500/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                        Predictive Risk Radar
                        <div className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                            <span className="text-[10px] text-rose-500 font-black tracking-widest">LIVE RADAR</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Institutional Vulnerability Atlas</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Aggregate Risk Index</span>
                    <div className="text-2xl font-black text-rose-500 tracking-tighter">{atlas.overallRisk.toFixed(1)}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Radar Map Placeholder (Visual only for now) */}
                <div className="relative aspect-square rounded-full border border-rose-500/20 bg-rose-500/5 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 border border-rose-500/5 rounded-full scale-[0.75]" />
                    <div className="absolute inset-0 border border-rose-500/5 rounded-full scale-[0.5]" />
                    <div className="absolute inset-0 border border-rose-500/5 rounded-full scale-[0.25]" />
                    
                    {/* Rotating Scan Line */}
                    <motion.div 
                        className="absolute h-1/2 w-[2px] bg-gradient-to-t from-rose-500 to-transparent top-0 origin-bottom"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />

                    {/* Risk Hotspots */}
                    {atlas.vectors.map((v, i) => (
                        <motion.div
                            key={v.type}
                            className={`absolute h-3 w-3 rounded-full blur-[2px] ${v.status === 'critical' ? 'bg-rose-500 shadow-rose-900' : v.status === 'warning' ? 'bg-amber-500 shadow-amber-900' : 'bg-emerald-500'}`}
                            style={{
                                top: `${25 + i * 15}%`,
                                left: `${30 + i * 10}%`,
                            }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                        />
                    ))}

                    <div className="relative z-10 flex flex-col items-center gap-1 opacity-40">
                        <ShieldAlert size={32} className="text-rose-500" />
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Scanning Grid</span>
                    </div>
                </div>

                {/* Risk Vector Details */}
                <div className="flex flex-col gap-4 justify-center">
                    {atlas.vectors.map((vector) => (
                        <div key={vector.type} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${vector.status === 'critical' ? 'bg-rose-500/10 text-rose-500' : vector.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {vector.status === 'stable' ? <ShieldAlert size={16} /> : <AlertTriangle size={16} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{vector.type}</span>
                                    <span className="text-sm font-black text-white">{vector.status.toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col text-right">
                                    <div className="flex items-center gap-1.5 justify-end">
                                        {getTrendIcon(vector.trend)}
                                        <span className="text-xs font-black text-white">{vector.score}%</span>
                                    </div>
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tight">Vulnerability_Ref: 0x{vector.score}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                    <AlertTriangle size={18} />
                </div>
                <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest leading-relaxed">
                    AI Entropy Analysis suggests a <span className="text-amber-500">rising burnout vector</span> in the Special Education department. Monitor interaction frequency to prevent threshold overflow.
                </p>
            </div>
        </GlassCard>
    );
}
