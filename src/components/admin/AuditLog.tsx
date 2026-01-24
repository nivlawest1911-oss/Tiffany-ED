'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntryData {
    timestamp: string;
    tag: string;
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
}

const LogEntry = ({ entry }: { entry: LogEntryData }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-3 py-1 border-b border-white/5 font-mono text-[10px]"
    >
        <span className="text-zinc-500">[{entry.timestamp}]</span>
        <span className={`${entry.type === 'success' ? 'text-emerald-400' : entry.type === 'error' ? 'text-rose-400' : 'text-amber-500'} font-bold`}>
            {entry.tag}
        </span>
        <span className="text-zinc-300">{entry.message}</span>
    </motion.div>
);

export default function AuditLog() {
    const [logs] = useState<LogEntryData[]>([
        { timestamp: new Date().toLocaleTimeString([], { hour12: false }), tag: '[DB-PULSE]', type: 'success', message: 'Project tucspkptgrjgcccdacnw Handshake Verified.' },
        { timestamp: new Date().toLocaleTimeString([], { hour12: false }), tag: '[CORE-AI]', type: 'success', message: 'Gemini 1.5 Node Active in edintel-sovereign-2027.' },
        { timestamp: new Date().toLocaleTimeString([], { hour12: false }), tag: '[SHIELD]', type: 'info', message: 'Antigravity Protocol: All systems nominal.' }
    ]);

    return (
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-64 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Live Audit Stream</h3>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Streaming Live</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <LogEntry key={i} entry={log} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
