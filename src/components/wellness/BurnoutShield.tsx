'use client';

import React from 'react';
import { Zap, Wind } from 'lucide-react';

interface BurnoutShieldProps {
    wellnessAgentRole: string;
    onExecuteReset: (type: string) => void;
}

export const BurnoutShield: React.FC<BurnoutShieldProps> = ({ wellnessAgentRole, onExecuteReset }) => {
    return (
        <div className="p-8 rounded-[40px] bg-noble-gold border border-noble-gold/20 text-black space-y-6 text-left relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-3 relative z-10">
                <Zap className="fill-black" size={24} />
                <h2 className="text-xl font-black uppercase tracking-tight text-left">Rapid Neural Detox</h2>
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
