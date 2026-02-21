import React from 'react';
import { cn } from '@/lib/utils';
import GlassPanel from '@/components/ui/GlassPanel';

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
        <GlassPanel className={cn(
            "p-6 h-full flex flex-col group shadow-lg shadow-black/20",
            span,
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {Icon && <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/50 group-hover:bg-primary-500/10 group-hover:text-primary-400 group-hover:border-primary-500/20 group-hover:scale-110 transition-all duration-300"><Icon size={18} /></div>}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-white transition-colors tracking-tight">{title}</h3>
                        {description && <p className="text-[10px] text-white/50 font-medium">{description}</p>}
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full">
                {children}
            </div>
        </GlassPanel>
    );
};
