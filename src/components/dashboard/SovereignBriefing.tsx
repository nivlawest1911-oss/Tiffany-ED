'use client';

import React from 'react';

interface SovereignBriefingProps {
    summary: string;
    loading?: boolean;
}

export const SovereignBriefing = ({ summary, loading }: SovereignBriefingProps) => {
    return (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="bg-amber-500/10 px-6 py-3 border-b border-amber-500/20 flex justify-between items-center">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Daily Tactical Synthesis</h3>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-zinc-500">ENCRYPTED_LINK_ACTIVE</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                </div>
            </div>

            <div className="p-8">
                {loading ? (
                    <div className="animate-pulse space-y-6">
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                        </div>
                    </div>
                ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                        <ul className="list-none p-0 m-0 space-y-6">
                            {summary.split('\n').filter(line => line.trim() !== '').map((bullet, i) => (
                                <li key={i} className="flex gap-5 items-start group">
                                    <span className="text-amber-500 font-black text-xs font-mono bg-amber-500/10 w-7 h-7 flex items-center justify-center rounded-lg border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                        0{i + 1}
                                    </span>
                                    <div className="flex-1">
                                        <span className="text-zinc-100 font-bold block text-[11px] mb-1 uppercase tracking-wider">
                                            {bullet.split(':')[0]}:
                                        </span>
                                        <span className="text-zinc-400 font-medium leading-relaxed block">
                                            {bullet.split(':').slice(1).join(':').trim() || bullet.replace(/^\d+\.\s*/, '')}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {!loading && (
                <div className="px-8 py-4 bg-zinc-900/40 border-t border-zinc-800 flex justify-end">
                    <button className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors flex items-center gap-2">
                        Execute All Protocols <span className="text-lg">→</span>
                    </button>
                </div>
            )}
        </div>
    );
};
