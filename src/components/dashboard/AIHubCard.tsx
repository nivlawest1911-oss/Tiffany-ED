'use client';

import React from 'react';
import { Cpu, Zap } from 'lucide-react';
import { BentoGridItem } from './BentoGridItem';
import { motion } from 'framer-motion';
import SovereignButton from '@/components/ui/SovereignButton';

export const AIHubCard = () => {
    const nodes = [
        { name: 'Leadership', status: 'Active', color: 'text-cyan-400' },
        { name: 'Curriculum', status: 'Idle', color: 'text-zinc-500' },
        { name: 'Cognitive Gym', status: 'Active', color: 'text-indigo-400' },
        { name: 'The Room', status: 'Standby', color: 'text-amber-500' },
    ];

    return (
        <BentoGridItem
            title="Sovereign AI Hub"
            description="Active intelligence nodes monitoring"
            icon={Cpu}
            span="col-span-12 lg:col-span-4"
        >
            <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                    {nodes.map((node, i) => (
                        <motion.div
                            key={node.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 cursor-pointer shadow-sm shadow-black/20"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-tighter text-white">{node.name}</span>
                                <div className={`h-1.5 w-1.5 rounded-full ${node.status === 'Active' ? 'bg-primary-400 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-white/20'}`} />
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${node.status === 'Active' ? 'text-primary-400' : 'text-white/40'}`}>{node.status}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="pt-2 border-t border-white/5">
                    <SovereignButton variant="primary" glow size="sm" className="w-full">
                        <Zap size={14} className="mr-2" /> DEPLOY NEW NODE
                    </SovereignButton>
                </div>
            </div>
        </BentoGridItem>
    );
};
