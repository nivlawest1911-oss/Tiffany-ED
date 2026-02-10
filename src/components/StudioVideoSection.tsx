'use client';

import React, { useState } from 'react';
import { EdIntelGate } from '@/components/sovereign/EdIntelGate';

interface StudioVideoSectionProps {
    userTier: string;
    isCommandLevel: boolean;
}

export const StudioVideoSection = ({ userTier, isCommandLevel }: StudioVideoSectionProps) => {
    const [gateOpen, setGateOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState('');

    const handleToolClick = (toolName: string) => {
        if (!isCommandLevel) {
            setSelectedTool(toolName);
            setGateOpen(true);
        } else {
            console.log(`Launching ${toolName}...`);
            // TODO: Implement actual tool launch logic (InVideo/Captions API)
        }
    };

    return (
        <>
            <div className="contents">
                {/* This component returns fragment/contents to fit in the grid if used there, 
                 but in the Page it was outside the grid?
                 Wait, in page.tsx I closed the grid div before calling this? 
                 Let's check my page.tsx write. 
                 Ah, I see:
                 <div className="grid ...">
                    Canva...
                    Adobe...
                    InVideo... (Wait, in my previous write I put InVideo block inside grid but incomplete)
                 </div>
                 <StudioVideoSection ... />
                 
                 I should probably put the InVideo and Captions blocks INSIDE the grid in the Page logic, 
                 or have StudioVideoSection render those two blocks.
                 The user snippet had them in the grid.
                 I will make StudioVideoSection render the two Video Quadrant divs.
             */}
                {/* Video Quadrant: InVideo AI */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-amber-500 font-mono text-xs uppercase mb-2">InVideo AI Engine</h4>
                        <p className="text-zinc-400 text-sm mb-4">Convert student data logs into localized AI video lessons.</p>
                    </div>
                    <button
                        onClick={() => handleToolClick('InVideo AI')}
                        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-all uppercase text-xs"
                    >
                        {isCommandLevel ? 'Generate AI Video' : 'Generate AI Video (Locked)'}
                    </button>
                </div>

                {/* Video Quadrant: Captions.ai */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-amber-500 font-mono text-xs uppercase mb-2">Captions Protocol</h4>
                        <p className="text-zinc-400 text-sm mb-4">Auto-subtitle district announcements for ADA compliance.</p>
                    </div>
                    <button
                        onClick={() => handleToolClick('Captions.ai')}
                        className="w-full py-3 bg-zinc-100 text-black font-bold rounded-lg hover:bg-zinc-300 transition-all uppercase text-xs"
                    >
                        {isCommandLevel ? 'Initiate Transcription' : 'Initiate Transcription (Locked)'}
                    </button>
                </div>
            </div>

            <EdIntelGate
                isOpen={gateOpen}
                onClose={() => setGateOpen(false)}
                toolName={selectedTool}
            />
        </>
    );
};
