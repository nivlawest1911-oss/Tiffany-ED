'use client';

import React from 'react';

interface AIAgentAvatarProps {
    textToSpeak?: string;
    className?: string;
}

/**
 * AIAgentAvatar - Placeholder component
 * HeyGen streaming avatar integration has been disabled.
 * This component displays a placeholder UI instead.
 */
export default function AIAgentAvatar({ className = "" }: AIAgentAvatarProps) {
    return (
        <div className={`avatar-container relative w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-black ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <div className="flex flex-col items-center gap-4 text-center p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-noble-gold/20 to-zinc-800 flex items-center justify-center border border-noble-gold/30">
                        <svg className="w-12 h-12 text-noble-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-noble-gold/70 uppercase tracking-[0.3em]">
                            Avatar Stream Offline
                        </p>
                        <p className="text-xs text-white/40 font-mono">
                            Live avatar integration not available
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
