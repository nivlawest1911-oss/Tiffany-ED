'use client';

import React from 'react';

interface Log {
    id: string;
    created_at: string;
    action: string;
    details?: string;
}

interface SovereignTerminalProps {
    logs?: Log[];
}

export default function SovereignTerminal({ logs = [] }: SovereignTerminalProps) {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Alabama Sovereign // Node-01</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </div>

            <div className="card-body font-mono text-xs">
                <div className="space-y-2">
                    {logs.length > 0 ? (
                        logs.slice(0, 15).map((log, i) => (
                            <div key={log.id || i} className="text-emerald-400">
                                <span className="text-gray-600">[{new Date(log.created_at).toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">→</span> {log.action}
                                {log.details && <span className="text-gray-500 ml-2">({log.details})</span>}
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="text-emerald-400">
                                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">→</span> Establishing neural handshake...
                            </div>
                            <div className="text-emerald-400">
                                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">→</span> Loading Mobile County Directives...
                            </div>
                            <div className="text-emerald-400">
                                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">→</span> Hento ecosystem sync complete.
                            </div>
                            <div className="text-emerald-400">
                                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">→</span> Optimizing instructional nodes...
                            </div>
                            <div className="text-emerald-400">
                                <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">✓</span> SYSTEM STATUS: OPTIMAL
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="card-footer">
                Access Command Deck
            </div>
        </div>
    );
}
