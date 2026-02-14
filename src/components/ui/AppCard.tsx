'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AppCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

/**
 * Standardized "Glassmorphism" Card Component
 * Used across both Education and Wellness modules to ensure aesthetic consistency.
 */
export const AppCard: React.FC<AppCardProps> = ({ children, className, hover = true }) => {
    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300",
            hover && "hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-indigo-500/10",
            className
        )}>
            {/* Subtle Inner Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 p-6">
                {children}
            </div>
        </div>
    );
};
