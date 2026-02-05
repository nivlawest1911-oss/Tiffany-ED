'use client';

import React from 'react';

interface SovereignBriefingProps {
    summary: string;
    loading?: boolean;
}

export const SovereignBriefing = ({ summary, loading }: SovereignBriefingProps) => {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Daily Tactical Synthesis // Node-02</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-amber-500">ENCRYPTED</span>
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="card-body">
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="flex gap-3">
                            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                        </div>
                    </div>
                ) : (
                    <ul className="list-none p-0 m-0 space-y-4">
                        {summary.split('\n').filter(line => line.trim() !== '').map((bullet, i) => (
                            <li key={i} className="flex gap-3 items-start group">
                                <span className="text-amber-500 font-black text-xs font-mono bg-amber-500/10 w-6 h-6 flex items-center justify-center rounded-lg border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all flex-shrink-0">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <span className="text-white font-bold block text-xs mb-1 uppercase tracking-wider">
                                        {bullet.split(':')[0]}:
                                    </span>
                                    <span className="text-gray-400 text-sm leading-relaxed block">
                                        {bullet.split(':').slice(1).join(':').trim() || bullet.replace(/^\d+\.\s*/, '')}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="card-footer">
                Execute All Protocols →
            </div>
        </div>
    );
};
