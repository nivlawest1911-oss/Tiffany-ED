'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { VibeController } from './VibeController';

export const TacticalHeader = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <header className="h-20 border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-xl px-10 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
            {/* SITE CONTEXT & BREADCRUMBS */}
            <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.3em] font-black">Protocol Active</span>
                    <div className="h-[1px] w-4 bg-zinc-800"></div>
                    <nav className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        {segments.map((segment, i) => (
                            <React.Fragment key={segment}>
                                <span>{segment}</span>
                                {i < segments.length - 1 && <span>{"//"}</span>}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
                <h2 className="text-sm font-black text-zinc-300 uppercase tracking-tighter">
                    Mobile County <span className="text-zinc-600">District_049</span>
                </h2>
            </div>

            <div className="flex items-center gap-8">
                {/* AMBIENT VIBE CONTROL */}
                <VibeController />

                {/* DISTRICT STATUS PILL */}
                <div className="hidden xl:flex bg-zinc-900/50 rounded-full px-5 py-2 border border-zinc-800 shadow-sm items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">District:</span>
                        <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-tighter">Optimal</span>
                    </div>
                    <div className="w-px h-3 bg-zinc-800"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Latency:</span>
                        <span className="text-[9px] font-mono text-amber-500 font-black">1.4ms</span>
                    </div>
                </div>

                <button className="px-5 py-2 bg-amber-500 text-black text-[10px] font-black uppercase rounded-lg hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)] active:scale-95">
                    Command Console
                </button>
            </div>
        </header>
    );
};
