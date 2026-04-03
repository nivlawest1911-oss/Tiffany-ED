'use client';

import React from 'react';
import { Zap, Wind } from 'lucide-react';

interface BurnoutShieldProps {
    wellnessAgentRole: string;
    stressLevel?: number;
    onExecuteReset: (type: string) => void;
}

export const BurnoutShield: React.FC<BurnoutShieldProps> = ({ wellnessAgentRole, stressLevel, onExecuteReset }) => {
    const getStatus = (stress: number | undefined) => {
        if (stress === undefined) return { label: 'Awaiting Uplink', color: 'text-black/40', bg: 'bg-black/5' };
        if (stress > 80) return { label: 'CRITICAL SATURATION', color: 'text-red-600', bg: 'bg-red-500/20' };
        if (stress > 50) return { label: 'ELEVATED LOAD', color: 'text-orange-600', bg: 'bg-orange-500/20' };
        return { label: 'OPTIMAL FLOW', color: 'text-emerald-700', bg: 'bg-emerald-500/20' };
    };

    const status = getStatus(stressLevel);

    return (
        <div className="p-8 rounded-[40px] bg-noble-gold border border-noble-gold/20 text-black space-y-6 text-left relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <Zap className="fill-black" size={24} />
                    <h2 className="text-xl font-black uppercase tracking-tight text-left">Rapid Neural Detox</h2>
                </div>
                <div className={`px-3 py-1 rounded-full ${status.bg} border border-black/5 flex items-center gap-2`}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.label.includes('CRITICAL') ? 'bg-red-600' : 'bg-black'}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${status.color}`}>
                        {status.label}
                    </span>
                </div>
            </div>

            <p className="text-black/70 font-bold leading-tight text-left relative z-10">
                Execute a high-rigor cognitive reset protocol guided by <span className="underline">{wellnessAgentRole}</span>.
            </p>
            <div className="space-y-3 relative z-10">
                {['Box Breathing', 'Logic Sprint', 'Sensory Grounding', 'Neural Detox'].map((reset) => (
                    <button
                        key={reset}
                        onClick={() => onExecuteReset(reset)}
                        className="w-full p-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-colors flex items-center justify-between group/btn"
                    >
                        {reset}
                        <Wind size={14} className="text-noble-gold group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                ))}
            </div>
        </div>
    );
};
