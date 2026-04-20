'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ShieldCheck, Star, Zap } from 'lucide-react';

interface SovereignBadgeProps {
    tier: string;
    className?: string;
}

export const SovereignBadge = ({ tier, className }: SovereignBadgeProps) => {
    const tierConfig = {
        unlimited: {
            label: 'Unlimited',
            gradient: 'from-[#00f5ff] via-[#00d4ff] to-[#00b2ff]',
            bg: 'bg-electric-cyan/10',
            border: 'border-electric-cyan/30',
            icon: <Zap className="w-3 h-3 text-electric-cyan" />,
            glow: 'shadow-[0_0_15px_#00f5ff]'
        },
        standard: {
            label: 'Standard',
            gradient: 'from-[#c5a47e] via-[#d4af37] to-[#b5952f]',
            bg: 'bg-noble-gold/10',
            border: 'border-noble-gold/30',
            icon: <ShieldCheck className="w-3 h-3 text-noble-gold" />,
            glow: 'shadow-[0_0_15px_#d4af37]'
        },
        practitioner: {
            label: 'Practitioner',
            gradient: 'from-amber-400 via-amber-500 to-amber-600',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/30',
            icon: <Star className="w-3 h-3 text-amber-500" />,
            glow: 'shadow-[0_0_15px_#f59e0b]'
        },
        initiate: {
            label: 'Initiate',
            gradient: 'from-zinc-400 via-zinc-500 to-zinc-600',
            bg: 'bg-zinc-500/10',
            border: 'border-zinc-500/30',
            icon: <ShieldCheck className="w-3 h-3 text-zinc-500" />,
            glow: ''
        }
    };

    const config = tierConfig[tier.toLowerCase() as keyof typeof tierConfig] || tierConfig.initiate;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md",
                config.bg,
                config.border,
                config.glow,
                className
            )}
        >
            {config.icon}
            <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r",
                config.gradient
            )}>
                {config.label}
            </span>
        </motion.div>
    );
};
