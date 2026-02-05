'use client';

import React, { useState } from 'react';
import { connectAntigravity } from '@/lib/antigravity-bridge';

interface SovereignAutomationProps {
    tier: string;
}

export const SovereignAutomation = ({ tier }: SovereignAutomationProps) => {
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
            type: "SOVEREIGN_EXECUTE",
            tier: tier,
            targetPortal: "https://alsde.edu/portal" // Example Alabama State Portal
        }, "*");

        setLog(prev => [...prev, "Command broadcasted to Antigravity Engine...", "Awaiting Agent Uplink..."]);

        // Simulation of agent feedback for the user interface if extension doesn't reply immediately in this demo
        setTimeout(() => {
            setLog(prev => [...prev, "> Agent: Uplink Established.", "> Agent: Scanning credentials..."]);
        }, 2000);
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
                <div className="bg-black p-4 rounded font-mono text-[10px] text-green-400 h-32 overflow-y-auto mb-4 border border-zinc-800">
                    {log.map((line, i) => <div key={i}>{`> ${line}`}</div>)}
                </div>

                <button
                    onClick={startProtocol}
                    // Initiate triggers 'UPGRADE_REQUIRED' logic, but we keep button enabled to show the error in the log/UI as per request "Initiate ($0.00) tier will see the button, but clicking it will trigger..."
                    // Wait, user said "Initiate ($0.00) tier will see the button, but clicking it will trigger an 'Upgrade Required' modal to the Site Command ($79.99) tier." 
                    // AND in component code provided: "disabled={tier === 'Sovereign Initiate' ... {tier === 'Sovereign Initiate' ? 'UPGRADE TO UNLOCK AUTOMATION' : 'EXECUTE BROWSER PROTOCOL'}"
                    // I will follow the visual component code provided by the user as it effectively acts as a block/CTA.
                    disabled={tier === 'Sovereign Initiate'}
                    className="w-full py-3 bg-zinc-100 text-black font-bold rounded-lg hover:bg-amber-500 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                >
                    {tier === 'Sovereign Initiate' ? 'UPGRADE TO UNLOCK AUTOMATION' : 'EXECUTE BROWSER PROTOCOL'}
                </button>
            </div>
        </div>
    );
};
