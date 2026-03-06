'use client';

import React from 'react';
import Link from 'next/link';

interface EdIntelGateProps {
    isOpen: boolean;
    onClose: () => void;
    toolName: string;
}

export const EdIntelGate = ({ isOpen, onClose, toolName }: EdIntelGateProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border border-amber-600 p-8 rounded-2xl max-w-md w-full shadow-[0_0_40px_rgba(245,158,11,0.2)] text-center">
                <div className="inline-block p-3 bg-amber-500/10 rounded-full border border-amber-500/30 mb-4">
                    <span className="text-amber-500 font-bold text-xl leading-none">!</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-100 uppercase tracking-tight mb-2">Protocol Elevation Required</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                    Accessing the <span className="text-amber-500 font-bold uppercase">{toolName} Engine</span> requires
                    Site Command or Director level authorization. Your current Initiate Node is for Data Onboarding only.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/pricing"
                        className="block w-full py-4 bg-amber-500 text-black font-black rounded-lg hover:bg-amber-400 transition-all uppercase text-sm shadow-lg"
                    >
                        Ascend to Site Command
                    </Link>
                    <button
                        onClick={onClose}
                        className="block w-full py-2 text-zinc-500 text-[10px] font-mono hover:text-zinc-300 transition-all uppercase tracking-widest"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};
