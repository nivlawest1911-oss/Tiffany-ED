'use client';

import { Activity } from 'lucide-react';
import SovereignNode from './layout/SovereignNode';

interface ActivityLog {
    id: string;
    action: string;
    timestamp: string;
}

interface SovereignTerminalProps {
    logs?: ActivityLog[];
}

export default function SovereignTerminal({ logs = [] }: SovereignTerminalProps) {
    const displayLogs = logs.length > 0 ? logs : [
        { id: '1', action: 'Establishing neural handshake...', timestamp: new Date().toISOString() },
        { id: '2', action: 'Loading Mobile County Directives...', timestamp: new Date().toISOString() },
        { id: '3', action: 'Hento ecosystem sync complete.', timestamp: new Date().toISOString() },
        { id: '4', action: 'Optimizing instructional nodes...', timestamp: new Date().toISOString() },
        { id: '5', action: '✓ SYSTEM STATUS: OPTIMAL', timestamp: new Date().toISOString() },
    ];

    return (
        <SovereignNode
            title="ALABAMA SOVEREIGN // NODE-01"
            videoSrc="/videos/dashboard/terminal-matrix.mp4"
            fallbackImage="/images/dashboard/terminal-fallback.jpg"
            actionText="ACCESS COMMAND DECK"
            onAction={() => console.log('Opening terminal...')}
        >
            <div className="space-y-2">
                {displayLogs.map((log) => (
                    <div
                        key={log.id}
                        className="flex items-start gap-3 p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg hover:border-emerald-500/40 transition-colors font-mono text-xs"
                    >
                        <Activity className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-emerald-400">
                                <span className="text-gray-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                                <span className="text-emerald-500">→</span> {log.action}
                            </p>
                        </div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
                    </div>
                ))}
            </div>
        </SovereignNode>
    );
}
