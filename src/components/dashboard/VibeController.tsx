'use client';

import React from 'react';
import { useEdIntelVibe, VIBES } from '@/context/EdIntelVibeContext';

export const VibeController = () => {
    const { currentVibe, setVibe } = useEdIntelVibe();

    return (
        <div className="flex bg-zinc-900/80 backdrop-blur-xl border border-white/5 p-1 rounded-full shadow-2xl scale-90 md:scale-100">
            {VIBES.map((v) => (
                <button
                    key={v.id}
                    onClick={() => setVibe(v)}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${currentVibe.id === v.id
                            ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                            : 'text-zinc-500 hover:text-zinc-100'
                        }`}
                >
                    {v.label}
                </button>
            ))}
        </div>
    );
};
