'use client';

import React from 'react';
import { Activity, Clock, Terminal, ChevronRight } from 'lucide-react';
import { BentoGridItem } from './BentoGridItem';
import { motion } from 'framer-motion';

interface Log {
    id: string;
    type: string;
    status: string;
    timestamp: string;
}

export const StrategicLogs = () => {
    const logs: Log[] = [
        { id: '1', type: 'Leadership Protocol', status: 'Generated', timestamp: '2m ago' },
        { id: '2', type: 'Curriculum Audit', status: 'Analyzing', timestamp: '15m ago' },
        { id: '3', type: 'Executive Brief', status: 'Archived', timestamp: '1h ago' },
        { id: '4', type: 'Cognitive Sync', status: 'Complete', timestamp: '3h ago' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Generated': return 'text-cyan-400';
            case 'Analyzing': return 'text-amber-400';
            case 'Archived': return 'text-zinc-500';
            case 'Complete': return 'text-emerald-400';
            default: return 'text-white';
        }
    };

    return (
        <BentoGridItem
            title="Strategic Logs Feed"
            description="Real-time institutional activity"
            icon={Terminal}
            span="col-span-12 lg:col-span-4"
        >
            <div className="space-y-1 pt-2">
                {logs.map((log, i) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-white/5 border border-white/5 text-zinc-500 group-hover:text-cyan-400 transition-colors">
                                <Clock size={12} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-white group-hover:translate-x-1 transition-transform">{log.type}</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${getStatusColor(log.status)}`}>{log.status}</span>
                                    <span className="text-[9px] text-zinc-600 font-medium">{log.timestamp}</span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={14} className="text-zinc-700 group-hover:text-white transition-colors" />
                    </motion.div>
                ))}

                <div className="pt-4">
                    <button className="w-full py-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors border-t border-white/5">
                        View Command History
                    </button>
                </div>
            </div>
        </BentoGridItem>
    );
};
