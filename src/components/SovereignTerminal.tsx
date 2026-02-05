'use client';

import React from 'react';

export default function SovereignTerminal() {
    return (
        <div className="sovereign-card">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-800 text-xs tracking-widest text-gray-500 uppercase">
                <span>ALABAMA SOVEREIGN // NODE-01</span>
                <span className="text-green-500">● ACTIVE</span>
            </div>

            {/* Content */}
            <div className="terminal-output">
                <h2 className="text-2xl text-white font-bold mb-6">INITIALIZE SITE NODE</h2>
                <div className="space-y-3 text-sm leading-relaxed">
                    <p>&gt; Establishing neural handshake...</p>
                    <p>&gt; Loading Mobile County Directive...</p>
                    <p>&gt; FERPA encryption layer secured.</p>
                    <p>&gt; Bento ecosystem sync complete.</p>
                    <p>&gt; Optimizing instructional nodes...</p>
                    <p className="mt-4 text-green-400 font-bold">&gt; SYSTEM STATUS: OPTIMAL</p>
                </div>
            </div>

            {/* Command Deck */}
            <div className="command-deck">
                🔒 ACCESS COMMAND DECK
            </div>
        </div>
    );
}
