'use client';

import React from 'react';
import { SovereignGate } from '@/components/SovereignGate';

interface DesignBridgeProps {
    type: string;
    tier: string;
}

declare global {
    interface Window {
        Canva?: any;
    }
}

export const DesignBridge = ({ type, tier }: DesignBridgeProps) => {
    const isAuthorized = tier !== 'Sovereign Initiate';
    const [showGate, setShowGate] = React.useState(false);

    const launchCanva = async () => {
        if (!isAuthorized) {
            setShowGate(true);
            return;
        }

        if (type === 'Canva' && window.Canva) {
            try {
                const api = await window.Canva.DesignButton.initialize({ apiKey: 'YOUR_CANVA_KEY' });
                api.createDesign({ designType: 'Poster' });
            } catch (e) {
                console.error("Canva Error:", e);
                // Could open a new tab as fallback or show error
            }
        } else {
            console.log(`Launching ${type} Protocol...`);
            // Determine action based on type if not Canva
        }
    };

    return (
        <>
            <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900">
                <h4 className="text-amber-500 font-mono text-xs uppercase mb-2">{type} Engine</h4>
                <button
                    onClick={launchCanva}
                    className={`w-full py-2 font-bold rounded transition-all ${isAuthorized ? 'bg-zinc-100 text-black hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}`}
                >
                    {isAuthorized ? `Open ${type}` : 'Upgrade Required'}
                </button>
            </div>
            <SovereignGate
                isOpen={showGate}
                onClose={() => setShowGate(false)}
                toolName={type}
            />
        </>
    );
};
