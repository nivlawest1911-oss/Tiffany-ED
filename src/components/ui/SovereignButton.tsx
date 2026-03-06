"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SovereignButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    icon?: LucideIcon;
    loading?: boolean;
    glow?: boolean;
}

const SovereignButton: React.FC<SovereignButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    loading = false,
    glow = false,
    ...props
}) => {
    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
        xl: "px-10 py-5 text-lg font-bold",
    };

    const variants = {
        primary: "bg-indigo-600 text-white shadow-soft hover:bg-indigo-700 hover:shadow-medium border-transparent",
        secondary: "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 shadow-soft border",
        glass: "bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 shadow-hard border",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 border-transparent",
        danger: "bg-accent-red text-white hover:bg-red-700 shadow-soft",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden",
                sizeClasses[size],
                variants[variant],
                glow && variant === 'primary' && "shadow-[0_0_20px_rgba(99,102,241,0.5)]",
                className
            )}
            {...props}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Loading Spinner */}
            {loading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : Icon && (
                <Icon className={cn("mr-2 group-hover:rotate-12 transition-transform duration-300", size === 'sm' ? "w-3 h-3" : "w-5 h-5")} />
            )}

            <span className="relative z-10">{children}</span>

            {/* Hover Shine Effect */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />
        </motion.button>
    );
};

export default SovereignButton;
