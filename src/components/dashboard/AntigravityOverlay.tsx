'use client';

import React, { useState } from 'react';

export const AntigravityOverlay = () => {
    const [isNavigating, setIsNavigating] = useState(true);
    const [log, setLog] = useState<string[]>([
        "Protocol Initialized...",
        "Targeting: ALSDE Portal (District 049)",
        "Navigating to Enrollment Services...",
        'Identifying "Code 290-8-9" Compliance Fields...',
        "Data Extraction in progress..."
    ]);

    const abortProtocol = () => {
        // 1. Broadcast to the Chrome Extension
        window.postMessage({
            type: "ANTIGRAVITY_KILL_SIGNAL",
            timestamp: new Date().toISOString()
        }, "*");

        // 2. Update the local UI state
        setLog(prev => [...prev, "!!! ABORT SIGNAL SENT", "Terminating browser process..."]);
        setIsNavigating(false);

        console.log("%c [EdIntel] Protocol Aborted by User", "color: #ef4444; font-weight: bold;");
    };

    return (
        <div id="antigravity-root" className="flex flex-col">
            <div className="agent-header">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Antigravity Agent v2.1</span>
                <div className={`agent-status-blink ${!isNavigating ? 'opacity-20 grayscale' : ''}`}></div>
            </div>

            <div className="p-4 h-48 overflow-y-auto bg-black/40 text-[10px] leading-relaxed text-zinc-400 font-mono scrollbar-hide">
                {log.map((line, i) => (
                    <div key={i} className={`mb-1 ${line.startsWith('!!!') ? 'text-red-500 font-bold' : ''}`}>
                        {line.startsWith('Targeting') || line.startsWith('Identifying') ? (
                            <span className="text-zinc-100">{`> ${line}`}</span>
                        ) : line.startsWith('Navigating') || line.startsWith('Data') ? (
                            <span className="text-amber-500/80 underline decoration-amber-500/20">{`> ${line}`}</span>
                        ) : line.startsWith('!!!') ? (
                            line
                        ) : (
                            <span className="text-zinc-500">{`[${new Date().toLocaleTimeString()}] ${line}`}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-3 bg-zinc-900/80 border-t border-zinc-800 flex gap-2">
                <button
                    onClick={abortProtocol}
                    disabled={!isNavigating}
                    className="flex-1 py-2 bg-amber-500 text-black text-[10px] font-black uppercase rounded hover:bg-amber-400 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                >
                    Abort Protocol
                </button>
                <button className="px-3 py-2 border border-zinc-700 text-zinc-400 text-[10px] uppercase rounded hover:text-white transition-all font-bold">
                    Settings
                </button>
            </div>
        </div>
    );
};
