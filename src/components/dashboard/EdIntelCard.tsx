'use client';

import React from 'react';

interface EdIntelCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

export const EdIntelCard = ({ title, subtitle, children, action }: EdIntelCardProps) => (
    <div className="group bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/50 transition-all rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/20 flex justify-between items-center">
            <div>
                <h4 className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] font-black">{title}</h4>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">{subtitle}</p>
            </div>
            {action && <div className="animate-pulse-slow">{action}</div>}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);
