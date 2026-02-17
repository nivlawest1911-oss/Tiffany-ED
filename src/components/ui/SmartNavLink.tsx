'use client';

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/config/navigation';

interface SmartNavLinkProps {
    item: NavItem;
    active?: boolean;
    className?: string;
}

export const SmartNavLink: React.FC<SmartNavLinkProps> = ({ item, active, className }) => {
    // unlocked for emergency repair
    // const { user } = useAuth(); // TODO: Uncomment when AuthContext is fully stable
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userTier = 10; // FORCE UNLOCK FOR USER
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isLocked = false; // userTier < item.minTier;

    // Dynamically resolve the Lucide icon
    const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;

    // Color Logic: EdIntel Blue vs Transcend Gold/Purple
    const isEducation = item.href.startsWith('/vault') ||
        item.href.startsWith('/generators') ||
        item.href.startsWith('/cognitive') ||
        item.href.startsWith('/admin') ||
        item.href.startsWith('/gemini-workspace');
    const moduleColor = isEducation ? 'text-blue-400' : 'text-purple-400';
    const activeBg = isEducation ? 'bg-blue-500/10 border-blue-500/20' : 'bg-purple-500/10 border-purple-500/20';

    if (isLocked) {
        return (
            <div className={cn(
                "flex items-center justify-between opacity-30 cursor-not-allowed p-3 rounded-xl border border-white/5 bg-black/40 group",
                className
            )}>
                <span className="flex items-center gap-3">
                    <IconComponent size={18} className="text-zinc-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        {item.label}
                    </span>
                </span>
                <Lock size={12} className="text-noble-gold/40" />
            </div>
        );
    }

    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 border border-transparent",
                active
                    ? `${activeBg} ${moduleColor}`
                    : "hover:bg-white/5 hover:border-white/10 text-zinc-400 hover:text-white",
                className
            )}
        >
            <IconComponent size={18} className={active ? moduleColor : "text-zinc-500 group-hover:text-white"} />
            <span className="text-[10px] font-black uppercase tracking-widest">
                {item.label}
            </span>
        </Link>
    );
};
