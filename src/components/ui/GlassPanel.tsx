"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
    hoverIntensity?: 'none' | 'low' | 'medium' | 'high';
    opacity?: number;
    blur?: number;
    onClick?: () => void;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
    children,
    className,
    hoverIntensity = 'medium',
    opacity = 0.05,
    blur = 12,
}) => {
    const hoverVariants = {
        none: {},
        low: { scale: 1.01, backgroundColor: `rgba(255, 255, 255, ${opacity + 0.02})` },
        medium: { scale: 1.02, backgroundColor: `rgba(255, 255, 255, ${opacity + 0.05})` },
        high: { scale: 1.03, backgroundColor: `rgba(255, 255, 255, ${opacity + 0.08})`, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' },
    };

    return (
        <motion.div
            whileHover={hoverIntensity !== 'none' ? hoverVariants[hoverIntensity] : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10",
                className
            )}
            style={{
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
            }}
        >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Animated Shine Effect on Hover */}
            {hoverIntensity !== 'none' && (
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent"
                    initial={{ x: '-100%', y: '-100%' }}
                    whileHover={{ x: '100%', y: '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            )}
        </motion.div>
    );
};

export default GlassPanel;
