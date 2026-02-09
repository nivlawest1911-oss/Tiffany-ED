'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { VibeController } from './VibeController';
import { useSovereignVibe } from '@/context/SovereignVibeContext';

export const TacticalHeader = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const { toggleCommandConsole, isCommandConsoleOpen } = useSovereignVibe();

    return (
        <header className="h-20 border-b border-white/10 bg-zinc-950/50 backdrop-blur-xl px-10 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
                    <span className="text-[9px] font-mono text-primary uppercase tracking-[0.3em] font-black italic">Protocol Active</span>
                </div>
                <div className="h-[1px] w-4 bg-zinc-800"></div>
                <nav className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    {segments.map((segment, i) => (
                        <React.Fragment key={segment}>
                            <span>{segment}</span>
                            {i < segments.length - 1 && <span className="text-zinc-700">{"/"}</span>}
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            <div className="hidden md:block text-right">
                <h2 className="text-sm font-black text-white uppercase tracking-tight">
                    Mobile County <span className="text-zinc-500 font-medium">District_049</span>
                </h2>
            </div>

            <div className="flex items-center gap-8">
                <VibeController />

                <div className="hidden xl:flex bg-white/5 rounded-full px-5 py-2 border border-white/5 shadow-sm items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">District:</span>
                        <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-tighter">Optimal</span>
                    </div>
                    <div className="w-px h-3 bg-zinc-800"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Latency:</span>
                        <span className="text-[9px] font-mono text-primary font-black">1.4ms</span>
                    </div>
                </div>

                <button
                    onClick={toggleCommandConsole}
                    className={`px-5 py-2 text-[10px] font-black uppercase rounded-lg transition-all active:scale-95 ${isCommandConsoleOpen
                            ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                            : 'bg-primary text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                        }`}
                >
                    {isCommandConsoleOpen ? 'Close Console' : 'Command Console'}
                </button>
            </div>
        </header>
    );
};
