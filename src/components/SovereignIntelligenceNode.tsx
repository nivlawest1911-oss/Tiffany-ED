'use client';

import React from 'react';

export default function SovereignIntelligenceNode() {
    return (
        <div className="sovereign-card">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-800 text-xs tracking-widest text-gray-500 uppercase">
                <span>INTELLIGENCE AGENT // NODE-02</span>
                <span className="text-blue-500">● LISTENING</span>
            </div>

            {/* Content */}
            <div className="terminal-output">
                <h2 className="text-2xl text-white font-bold mb-6">LIVE OBSERVATION FEED</h2>
                <div className="space-y-3 text-sm leading-relaxed">
                    <p>&gt; Listening for evidence data...</p>
                    <p>&gt; Compliance Standard: <span className="text-white bg-gray-800 px-1 rounded">AL Code 290-8-9</span></p>
                    <p>&gt; Student Roster Index: 844 Records</p>
                    <div className="mt-4 p-3 bg-gray-900 border border-gray-800 rounded text-xs text-gray-400">
                        Waiting for new clinical stressors...
                    </div>
                </div>
            </div>

            {/* Command Deck */}
            <div className="command-deck">
                VIEW ANALYTICS
            </div>
        </div>
    );
}
