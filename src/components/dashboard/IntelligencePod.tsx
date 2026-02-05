'use client';

import React from 'react';

interface IntelligencePodProps {
    label: string;
    value: string;
    trend?: 'up' | 'down';
    detail: string;
}

export const IntelligencePod = ({ label, value, trend, detail }: IntelligencePodProps) => (
    <div className="group relative p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:bg-zinc-900/60 transition-all duration-500 hover:border-amber-500/40 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">{label}</span>
            <div className={`h-1.5 w-1.5 rounded-full ${trend === 'up' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'} animate-pulse`} />
        </div>

        <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-black text-zinc-100 tracking-tighter transition-all duration-300 group-hover:text-white">{value}</span>
            <span className="text-[10px] text-zinc-500 font-mono italic tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">{detail}</span>
        </div>

        {/* Subtle Progress Bar for Visual Reading */}
        <div className="w-full h-1 bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-amber-500/30 w-3/4 group-hover:bg-amber-500 transition-all duration-700" />
        </div>

        {/* Subtle Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
    </div>
);
