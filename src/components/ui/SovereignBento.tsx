'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface SovereignBentoProps {
    className?: string;
    children: React.ReactNode;
}

export const SovereignBentoGrid = ({ className, children }: SovereignBentoProps) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

interface SovereignBentoItemProps {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export const SovereignBentoItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick
}: SovereignBentoItemProps) => {
    return (
        <motion.div
            whileHover={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-500 shadow-input border border-white/5 bg-zinc-950/50 backdrop-blur-xl flex flex-col justify-between space-y-4 p-8 cursor-pointer relative overflow-hidden",
                className
            )}
        >
            {/* Obsidian Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent z-0 pointer-events-none" />

            {/* Beam Effect on Hover */}
            <div className="absolute inset-0 bg-noble-gold/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700 pointer-events-none z-0 mix-blend-overlay" />

            <div className="relative z-10">
                {header}
            </div>

            <div className="group-hover/bento:translate-x-2 transition duration-300 relative z-10">
                <div className="w-10 h-10 rounded-full bg-noble-gold/10 flex items-center justify-center mb-4 text-noble-gold border border-noble-gold/20">
                    {icon || <Sparkles size={16} />}
                </div>
                <div className="font-black text-white mb-2 mt-2 uppercase tracking-wide">
                    {title}
                </div>
                <div className="font-sans font-normal text-zinc-500 text-xs">
                    {description}
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-noble-gold/10 to-transparent opacity-50" />
        </motion.div>
    );
};
