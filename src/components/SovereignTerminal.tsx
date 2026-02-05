'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SovereignTerminal() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        // Fetch logs from the new 'system_logs' table
        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from('system_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(8);

            if (!error && data) {
                setLogs(data.reverse());
            }
        };

        fetchLogs();

        // Optional: Real-time subscription to logs
        const subscription = supabase
            .channel('system_logs_realtime')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'system_logs' }, (payload) => {
                setLogs(prev => [...prev.slice(1), payload.new]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <div className="sovereign-card h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-black text-rose-500 uppercase tracking-[.3em] animate-pulse">
                    Sovereign Terminal • Live
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
            </div>

            <div className="terminal-output overflow-y-auto no-scrollbar font-mono text-[11px]">
                {logs.length === 0 ? (
                    <p className="text-zinc-600 italic">&gt; ESTABLISHING UPLINK...</p>
                ) : (
                    logs.map(log => (
                        <p key={log.id} className="mb-1">
                            <span className="text-zinc-600 mr-2">[{new Date(log.created_at).toLocaleTimeString()}]</span>
                            <span className={log.severity === 'ERROR' ? 'text-rose-400' : 'text-zinc-400'}>
                                &gt; {log.log_entry}
                            </span>
                        </p>
                    ))
                )}
                <p className="status-ok text-emerald-400 mt-2 font-bold animate-pulse">&gt; SYSTEM STATUS: OPTIMAL</p>
            </div>

            <div className="command-deck mt-auto cursor-pointer hover:bg-zinc-200 transition-colors">
                ACCESS COMMAND DECK
            </div>

            {/* Background scanner effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
