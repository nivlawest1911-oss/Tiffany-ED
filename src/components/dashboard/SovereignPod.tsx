'use client';

import React from 'react';

interface SovereignPodProps {
    title: string;
    value: string;
    status: 'ready' | 'syncing' | 'optimal';
    children: React.ReactNode;
}

export const SovereignPod = ({ title, value, status, children }: SovereignPodProps) => (
    <section className="sovereign-card group">
        <header className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{title}</h3>
                <p className="text-3xl font-black text-zinc-100 mt-1 tracking-tight group-hover:text-white transition-colors">{value}</p>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${status === 'optimal'
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                : status === 'ready'
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                    : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}>
                {status}
            </div>
        </header>
        <div className="text-zinc-400 text-sm leading-relaxed font-medium">
            {children}
        </div>
        {/* Subtle Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none rounded-3xl" />
    </section>
);
