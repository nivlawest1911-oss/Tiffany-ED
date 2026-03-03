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
    collapsed?: boolean;
}

export const SmartNavLink: React.FC<SmartNavLinkProps> = ({ item, active, className, collapsed }) => {
    // unlocked for emergency repair
    const _userTier = 10; // FORCE UNLOCK FOR USER
    const _isLocked = false;

    // Dynamically resolve the Lucide icon
    const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;

    // Color Logic: Electric Cyan vs Sovereign Gold
    const isEducation = item.href.startsWith('/vault') ||
        item.href.startsWith('/generators') ||
        item.href.startsWith('/cognitive') ||
        item.href.startsWith('/admin') ||
        item.href.startsWith('/gemini-workspace') ||
        item.href.startsWith('/roster') ||
        item.href.startsWith('/pivot') ||
        item.href.startsWith('/ledger') ||
        item.href.startsWith('/education') ||
        item.href.startsWith('/conversation') ||
        item.href.startsWith('/settings');

    const activeColor = isEducation ? 'text-electric-cyan' : 'text-sovereign-gold';
    const activeBg = isEducation ? 'bg-electric-cyan/10 border-electric-cyan/20' : 'bg-sovereign-gold/10 border-sovereign-gold/20';

    if (_isLocked) {
        return (
            <div
                title={item.label}
                className={cn(
                    "flex items-center justify-between opacity-30 cursor-not-allowed p-3 rounded-xl border border-white/5 bg-black/40 group",
                    className
                )}>
                <span className="flex items-center gap-3">
                    <IconComponent size={20} className="text-zinc-600" />
                    {!collapsed && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                            {item.label}
                        </span>
                    )}
                </span>
                {!collapsed && <Lock size={12} className="text-sovereign-gold/40" />}
            </div>
        );
    }

    return (
        <Link
            href={item.href}
            title={item.label}
            className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 border border-transparent group",
                active
                    ? `${activeBg} ${activeColor}`
                    : "hover:bg-white/5 hover:border-white/10 text-zinc-400 hover:text-white",
                collapsed && "justify-center px-0",
                className
            )}
        >
            <IconComponent size={20} className={active ? activeColor : "text-zinc-500 group-hover:text-white"} />
            {!collapsed && (
                <span className="text-[10px] font-black uppercase tracking-widest">
                    {item.label}
                </span>
            )}
        </Link>
    );
};
