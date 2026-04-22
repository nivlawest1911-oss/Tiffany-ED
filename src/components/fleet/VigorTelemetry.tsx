'use client';

import { motion } from 'framer-motion';
import { Activity, Brain, Heart, TrendingUp, TrendingDown } from 'lucide-react';

interface VigorData {
    score: number;
    avgStress: number;
    avgHrv: number;
    totalResilienceProtocols: number;
    trend: 'improving' | 'declining' | 'stable';
    period: string;
}

interface VigorTelemetryProps {
    data: VigorData | null;
}

export default function VigorTelemetry({ data }: VigorTelemetryProps) {
    if (!data) return null;

    const isImproving = data.trend === 'improving';

    return (
        <div className="bg-zinc-900 border border-[#22d3ee]/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
            {/* Background Neural Pulse */}
            <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 bg-[#22d3ee]/5 rounded-full blur-3xl p-10"
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xs font-black text-[#22d3ee] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Brain className="w-4 h-4" /> Institutional Vigor
                    </h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Biometric Resilience Index</p>
                </div>
                <div className={`px-3 py-1 rounded-full border border-[#22d3ee]/20 text-[8px] font-black text-[#22d3ee] uppercase tracking-widest flex items-center gap-1.5 ${isImproving ? 'bg-[#22d3ee]/10' : 'bg-red-500/10'}`}>
                    {isImproving ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {data.trend} ({data.period})
                </div>
            </div>

            <div className="flex items-end gap-6 mb-8 relative z-10">
                <div className="text-7xl font-black text-white italic tracking-tighter leading-none">
                    {data.score}<span className="text-2xl text-zinc-600 not-italic ml-1">%</span>
                </div>
                <div className="pb-2 flex-1">
                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                        <span>Fleet Composite Stability</span>
                        <span className="text-[#22d3ee]">{data.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${data.score}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#22d3ee]/20 transition-all group/stat">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-3 h-3 text-zinc-600 group-hover/stat:text-[#22d3ee] transition-colors" />
                        <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Avg Stress</div>
                    </div>
                    <div className="text-2xl font-black text-white italic tracking-tighter">{data.avgStress}%</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#22d3ee]/20 transition-all group/stat">
                    <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-3 h-3 text-zinc-600 group-hover/stat:text-[#f43f5e] transition-colors" />
                        <div className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Avg HRV</div>
                    </div>
                    <div className="text-2xl font-black text-white italic tracking-tighter">{data.avgHrv}<span className="text-xs text-zinc-600 ml-1">ms</span></div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                    Active Resilience Protocols: <span className="text-white ml-2">{data.totalResilienceProtocols}</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                height: [4, 12, 4],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{ 
                                duration: 1, 
                                delay: i * 0.15, 
                                repeat: Infinity 
                            }}
                            className="w-1 bg-[#22d3ee] rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
