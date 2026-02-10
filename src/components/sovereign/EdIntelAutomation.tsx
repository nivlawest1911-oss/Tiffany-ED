'use client';

import React, { useState } from 'react';
import { connectAntigravity } from '@/lib/antigravity-bridge';

interface EdIntelAutomationProps {
    tier: string;
}

export const EdIntelAutomation = ({ tier }: EdIntelAutomationProps) => {
    const [isNavigating, setIsNavigating] = useState(false);
    const [log, setLog] = useState<string[]>(["Node standby..."]);

    const startProtocol = () => {
        const connection = connectAntigravity(tier);

        if (!connection.connected) {
            setLog(prev => [...prev, `ERROR: ${connection.message}`]);
            return;
        }

        setIsNavigating(true);
        setLog(prev => [...prev, "Initializing Antigravity Extension...", "Navigating to Alabama State Portal..."]);

        // Dispatch a custom event that the extension can hear
        window.postMessage({
            type: "EdIntel_EXECUTE",
            tier: tier,
            targetPortal: "https://alsde.edu/portal" // Example Alabama State Portal
        }, "*");

        setLog(prev => [...prev, "Command broadcasted to Antigravity Engine...", "Awaiting Agent Uplink..."]);

        // Simulation of agent feedback for the user interface if extension doesn't reply immediately in this demo
        setTimeout(() => {
            setLog(prev => [...prev, "> Agent: Uplink Established.", "> Agent: Scanning credentials..."]);
        }, 2000);
    };

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
        <div className="mt-8 border border-zinc-800 bg-zinc-900/50 rounded-xl overflow-hidden">
            <div className="bg-zinc-800 p-3 flex justify-between items-center">
                <span className="text-xs font-mono text-amber-500 tracking-tighter">ANTIGRAVITY_AGENT_OVERLAY</span>
                <div className="flex gap-2">
                    <div className={`h-2 w-2 rounded-full ${isNavigating ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
                </div>
            </div>

            <div className="p-6">
                <div className="bg-black p-4 rounded font-mono text-[10px] text-green-400 h-32 overflow-y-auto mb-4 border border-zinc-800 scrollbar-hide">
                    {log.map((line, i) => <div key={i} className={line.startsWith('!!!') ? 'text-red-500' : ''}>{`> ${line}`}</div>)}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={startProtocol}
                        disabled={tier === 'EdIntel Initiate' || isNavigating}
                        className="flex-1 py-3 bg-zinc-100 text-black font-bold rounded-lg hover:bg-amber-500 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                    >
                        {tier === 'EdIntel Initiate' ? 'UPGRADE TO UNLOCK' : 'EXECUTE PROTOCOL'}
                    </button>
                    {isNavigating && (
                        <button
                            onClick={abortProtocol}
                            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-all"
                        >
                            ABORT
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
