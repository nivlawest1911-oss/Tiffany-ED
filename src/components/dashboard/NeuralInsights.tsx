"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    ShieldAlert,
    TrendingUp,
    ChevronRight,
    Target,
    BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const insights = [
    {
        id: 1,
        type: 'strategic',
        title: 'Leadership Protocol Gap',
        description: 'Current instructional data suggests a 4% variance in compliance across Sovereign nodes.',
        action: 'Deploy Executive Protocol',
        icon: Target,
        color: 'text-sovereign-gold',
        bgColor: 'bg-sovereign-gold/10'
    },
    {
        id: 2,
        type: 'compliance',
        title: 'Neural Compliance Alert',
        description: 'New Alabama Literacy standards detected. Auto-Pilot synthesis suggested for 100% adherence.',
        action: 'Synthesize Standards',
        icon: ShieldAlert,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10'
    },
    {
        id: 3,
        type: 'growth',
        title: 'Expansion Opportunity',
        description: 'Community impact metrics are trending 15% higher in localized "Gym" nodes.',
        action: 'View Growth Map',
        icon: TrendingUp,
        color: 'text-electric-cyan',
        bgColor: 'bg-electric-cyan/10'
    }
];

const NeuralInsights = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Brain size={12} className="text-electric-cyan" />
                    Neural Intelligence Feed
                </h4>
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-electric-cyan animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Live Synthesis</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights.map((insight, i) => (
                    <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-bento p-5 group cursor-pointer hover:border-electric-cyan/30 transition-all relative overflow-hidden h-full flex flex-col"
                    >
                        {/* Background Accent */}
                        <div className={cn(
                            "absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity",
                            insight.bgColor
                        )} />

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className={cn("p-2 rounded-lg", insight.bgColor, insight.color)}>
                                <insight.icon size={16} />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">
                                {insight.type}
                            </span>
                        </div>

                        <div className="flex-1 relative z-10">
                            <h5 className="text-[12px] font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-electric-cyan transition-colors">
                                {insight.title}
                            </h5>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed tracking-tight">
                                {insight.description}
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                            <span className="text-[9px] font-black uppercase text-electric-cyan opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                {insight.action} <ChevronRight size={10} />
                            </span>
                            <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                <BarChart3 size={10} className="text-slate-400" />
                                <span className="text-[8px] font-bold text-slate-400">98% Match</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NeuralInsights;
