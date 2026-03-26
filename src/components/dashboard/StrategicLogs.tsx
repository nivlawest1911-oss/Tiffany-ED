'use client';

import React from 'react';
import { Clock, Terminal, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BentoGridItem } from './BentoGridItem';
import { motion } from 'framer-motion';
import SovereignButton from '@/components/ui/SovereignButton';

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
            case 'Generated': return 'text-primary-400';
            case 'Analyzing': return 'text-indigo-400';
            case 'Archived': return 'text-white/30';
            case 'Complete': return 'text-emerald-400';
            default: return 'text-white/50';
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
                        className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-white/5 border border-white/5 text-white/30 group-hover:bg-primary-500/10 group-hover:border-primary-500/30 group-hover:text-primary-400 transition-all shadow-sm shadow-black/20">
                                <Clock size={12} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">{log.type}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{log.timestamp}</span>
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10", getStatusColor(log.status))}>
                                        {log.status}
                                    </span>
                                    <h4 className="text-xs font-black text-white uppercase tracking-tight">{log.type}</h4>
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-colors group-hover:translate-x-1" />
                    </motion.div>
                ))}

                <div className="pt-2 border-t border-white/5">
                    <SovereignButton variant="glass" size="sm" className="w-full">
                        <Zap size={14} className="mr-2" /> View Command History
                    </SovereignButton>
                </div>
            </div>
        </BentoGridItem>
    );
};
