"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import GlassPanel from './GlassPanel';

interface HolographicCardProps {
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    gradientFrom?: string;
    gradientTo?: string;
    onClick?: () => void;
}

const HolographicCard: React.FC<HolographicCardProps> = ({
    title,
    subtitle,
    icon,
    children,
    className,
    gradientFrom = "rgba(99, 102, 241, 0.2)", // primary-500
    gradientTo = "rgba(139, 92, 246, 0.2)",   // secondary-500
    onClick,
}) => {
    return (
        <GlassPanel
            className={cn("group cursor-pointer", className)}
            hoverIntensity="high"
            onClick={onClick}
        >
            {/* Background Accent Gradient */}
            <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: gradientFrom }}
            />
            <div
                className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: gradientTo }}
            />

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        {title && (
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-500 font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {icon && (
                        <div className="p-3 bg-white/50 rounded-xl shadow-inner border border-white/20 group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                            {icon}
                        </div>
                    )}
                </div>

                {children && (
                    <div className="mt-4 text-gray-600 leading-relaxed">
                        {children}
                    </div>
                )}
            </div>

            {/* Decorative Border Glow */}
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none group-hover:border-primary-400/50 transition-colors duration-300" />
        </GlassPanel>
    );
};

export default HolographicCard;
