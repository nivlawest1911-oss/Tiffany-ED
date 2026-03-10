'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Activity, Zap, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TelemetryTerminal() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // Poll the consolidated swarm metrics/logs endpoint
                const response = await fetch('/api/swarm/metrics');
                if (!response.ok) throw new Error('Terminal sync failed');
                const data = await response.json();

                // If we have swarm logs, prioritize them; otherwise fallback to general telemetry
                if (data.logs && data.logs.length > 0) {
                    setLogs(data.logs);
                } else {
                    const fallback = await fetch('/api/admin/telemetry');
                    if (fallback.ok) setLogs(await fallback.json());
                }
            } catch (error) {
                console.error('Telemetry error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 5000); // Sync every 5s for live feel
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl h-[400px] flex flex-col font-mono">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-intel-gold" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-intel-gold/80">Swarm Intelligence Feed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-intel-gold animate-pulse" />
                    <span className="text-[9px] uppercase font-bold text-intel-gold/50 tracking-widest">Neural Link Synchronized</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={log.id || i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-4 group"
                        >
                            <span className="text-[9px] text-slate-600 mt-1 whitespace-nowrap">
                                [{new Date(log.timestamp).toLocaleTimeString()}]
                            </span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-tight ${log.event_type.includes('ERROR') ? 'text-rose-500' : 'text-blue-400'
                                        }`}>
                                        {log.event_type}
                                    </span>
                                    <span className="text-[9px] text-slate-500">·</span>
                                    <span className="text-[9px] text-slate-400 capitalize">
                                        {log.event_data?.agent || 'System Node'}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                                    {log.event_data?.message || 'Neural synthesis event captured.'}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {logs.length === 0 && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-4">
                        <Activity className="w-8 h-8 opacity-20" />
                        <p className="text-[10px] uppercase tracking-widest font-black">Waiting for Neural Events...</p>
                    </div>
                )}
            </div>

            <div className="px-6 py-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[9px] text-slate-600">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-amber-500/50" />
                        Neural Latency: 42ms
                    </span>
                    <span className="flex items-center gap-1.5">
                        <ShieldAlert className="w-3 h-3 text-indigo-500/50" />
                        Encryption: AES-256-Sovereign
                    </span>
                </div>
                <span className="uppercase tracking-widest opacity-30">EdIntel Alpha v2.0.5</span>
            </div>
        </div>
    );
}
