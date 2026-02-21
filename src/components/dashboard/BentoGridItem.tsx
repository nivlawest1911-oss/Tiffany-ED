import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/Cinematic';
import { motion } from 'framer-motion';

interface BentoGridItemProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ElementType;
    span?: string; // e.g. "col-span-8", "col-span-4"
}

export const BentoGridItem = ({ title, description, children, className, icon: Icon, span }: BentoGridItemProps) => {
    return (
        <GlassCard className={cn(
            "p-6 flex flex-col h-full bg-black/40 border-white/5 hover:border-white/20 transition-all duration-300",
            span,
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {Icon && <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400"><Icon size={18} /></div>}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">{title}</h3>
                        {description && <p className="text-[10px] text-zinc-500 font-medium italic">{description}</p>}
                    </div>
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </GlassCard>
    );
};
