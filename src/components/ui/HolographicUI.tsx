'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

// ========================================
// GLASSMORPHIC PANEL COMPONENT
// ========================================
interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: ReactNode;
    variant?: 'default' | 'gold' | 'cyan' | 'emerald';
    glow?: boolean;
    hover?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
    ({ children, variant = 'default', glow = false, hover = true, className = '', ...props }, ref) => {
        const variantStyles = {
            default: 'border-white/10 from-white/10 to-white/5',
            gold: 'border-[#FFB300]/20 from-[#FFB300]/10 to-[#FFB300]/5',
            cyan: 'border-[#00E5FF]/20 from-[#00E5FF]/10 to-[#00E5FF]/5',
            emerald: 'border-emerald-500/20 from-emerald-500/10 to-emerald-500/5',
        };

        const glowStyles = {
            default: 'shadow-[0_0_60px_rgba(255,255,255,0.05)]',
            gold: 'shadow-[0_0_60px_rgba(255,179,0,0.15)]',
            cyan: 'shadow-[0_0_60px_rgba(0,229,255,0.15)]',
            emerald: 'shadow-[0_0_60px_rgba(16,185,129,0.15)]',
        };

        return (
            <motion.div
                ref={ref}
                className={`
                    relative overflow-hidden rounded-3xl
                    bg-gradient-to-br ${variantStyles[variant]}
                    backdrop-blur-xl border
                    ${glow ? glowStyles[variant] : ''}
                    ${hover ? 'hover:border-opacity-50 hover:scale-[1.01] transition-all duration-300' : ''}
                    ${className}
                `}
                {...props}
            >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {children}
            </motion.div>
        );
    }
);
GlassPanel.displayName = 'GlassPanel';

// ========================================
// HOLOGRAPHIC TEXT COMPONENT
// ========================================
interface HolographicTextProps {
    children: ReactNode;
    variant?: 'gold' | 'cyan' | 'gradient' | 'white';
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    glow?: boolean;
    className?: string;
}

export function HolographicText({
    children,
    variant = 'gold',
    as: Component = 'span',
    glow = true,
    className = '',
}: HolographicTextProps) {
    const variantStyles = {
        gold: 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFB300] via-[#FFA000] to-[#FF8F00]',
        cyan: 'text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00B8D4] to-[#0097A7]',
        gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFB300] via-[#00E5FF] to-[#FFB300]',
        white: 'text-white',
    };

    const glowStyles = {
        gold: 'drop-shadow-[0_0_20px_rgba(255,179,0,0.5)]',
        cyan: 'drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]',
        gradient: 'drop-shadow-[0_0_20px_rgba(255,179,0,0.3)]',
        white: 'drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]',
    };

    return (
        <Component
            className={`
                ${variantStyles[variant]}
                ${glow ? glowStyles[variant] : ''}
                ${className}
            `}
        >
            {children}
        </Component>
    );
}

// ========================================
// NEON BUTTON COMPONENT
// ========================================
interface NeonButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: ReactNode;
    variant?: 'gold' | 'cyan' | 'white' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ children, variant = 'gold', size = 'md', glow = true, className = '', ...props }, ref) => {
        const variantStyles = {
            gold: 'bg-[#FFB300] text-black hover:bg-[#FFA000] border-[#FFB300]',
            cyan: 'bg-[#00E5FF] text-black hover:bg-[#00B8D4] border-[#00E5FF]',
            white: 'bg-white text-black hover:bg-zinc-100 border-white',
            ghost: 'bg-transparent text-white hover:bg-white/10 border-white/20 hover:border-white/40',
        };

        const sizeStyles = {
            sm: 'px-4 py-2 text-xs',
            md: 'px-6 py-3 text-sm',
            lg: 'px-8 py-4 text-base',
        };

        const glowStyles = {
            gold: 'shadow-[0_0_30px_rgba(255,179,0,0.4)] hover:shadow-[0_0_40px_rgba(255,179,0,0.6)]',
            cyan: 'shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)]',
            white: 'shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]',
            ghost: '',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                    font-black uppercase tracking-[0.2em] rounded-2xl border
                    transition-all duration-300
                    ${variantStyles[variant]}
                    ${sizeStyles[size]}
                    ${glow ? glowStyles[variant] : ''}
                    ${className}
                `}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
NeonButton.displayName = 'NeonButton';

// ========================================
// AURORA BACKGROUND COMPONENT
// ========================================
interface AuroraBackgroundProps {
    variant?: 'gold' | 'cyan' | 'mixed';
    intensity?: 'low' | 'medium' | 'high';
    className?: string;
}

export function AuroraBackground({ variant = 'mixed', intensity = 'medium', className = '' }: AuroraBackgroundProps) {
    const intensityScale = {
        low: 0.1,
        medium: 0.2,
        high: 0.3,
    };

    const opacity = intensityScale[intensity];

    const colors = {
        gold: ['#FFB300', '#FFA000'],
        cyan: ['#00E5FF', '#00B8D4'],
        mixed: ['#FFB300', '#00E5FF'],
    };

    const [color1, color2] = colors[variant];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
                style={{ backgroundColor: color1, opacity }}
                animate={{
                    x: ['-10%', '10%', '-10%'],
                    y: ['-10%', '10%', '-10%'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full blur-[120px]"
                style={{ backgroundColor: color2, opacity }}
                animate={{
                    x: ['10%', '-10%', '10%'],
                    y: ['10%', '-10%', '10%'],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    );
}

// ========================================
// PARTICLE FIELD COMPONENT
// ========================================
interface ParticleFieldProps {
    count?: number;
    colors?: string[];
    className?: string;
}

export function ParticleField({ count = 30, colors = ['#FFB300', '#00E5FF', 'white'], className = '' }: ParticleFieldProps) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        color: colors[i % colors.length],
    }));

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// ========================================
// HOLOGRAPHIC GRID COMPONENT
// ========================================
interface HolographicGridProps {
    color?: string;
    opacity?: number;
    className?: string;
}

export function HolographicGrid({ color = '#00E5FF', opacity = 0.15, className = '' }: HolographicGridProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <pattern id="holo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke={color} strokeWidth="0.5" />
                    </pattern>
                    <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <mask id="grid-mask">
                        <rect width="100%" height="100%" fill="url(#grid-fade)" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="url(#holo-grid)" mask="url(#grid-mask)" />
            </svg>
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(180deg, transparent 0%, ${color}10 50%, transparent 100%)`,
                }}
                animate={{ y: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

// ========================================
// NEON BADGE COMPONENT
// ========================================
interface NeonBadgeProps {
    children: ReactNode;
    variant?: 'gold' | 'cyan' | 'emerald' | 'white';
    pulse?: boolean;
    className?: string;
}

export function NeonBadge({ children, variant = 'gold', pulse = false, className = '' }: NeonBadgeProps) {
    const variantStyles = {
        gold: 'bg-[#FFB300]/10 border-[#FFB300]/30 text-[#FFB300]',
        cyan: 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]',
        emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        white: 'bg-white/10 border-white/30 text-white',
    };

    return (
        <span
            className={`
                inline-flex items-center gap-2 px-4 py-1.5 rounded-full border
                text-[10px] font-black uppercase tracking-[0.2em]
                ${variantStyles[variant]}
                ${className}
            `}
        >
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: variant === 'gold' ? '#FFB300' : variant === 'cyan' ? '#00E5FF' : variant === 'emerald' ? '#10B981' : 'white' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: variant === 'gold' ? '#FFB300' : variant === 'cyan' ? '#00E5FF' : variant === 'emerald' ? '#10B981' : 'white' }} />
                </span>
            )}
            {children}
        </span>
    );
}

// ========================================
// LASER LINE COMPONENT
// ========================================
interface LaserLineProps {
    direction?: 'horizontal' | 'vertical';
    color?: string;
    animated?: boolean;
    className?: string;
}

export function LaserLine({ direction = 'horizontal', color = '#FFB300', animated = true, className = '' }: LaserLineProps) {
    const isHorizontal = direction === 'horizontal';

    return (
        <div className={`relative overflow-hidden ${isHorizontal ? 'h-px w-full' : 'w-px h-full'} ${className}`}>
            <div
                className={`absolute inset-0 ${isHorizontal ? 'bg-gradient-to-r' : 'bg-gradient-to-b'}`}
                style={{
                    background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, ${color}, transparent)`,
                }}
            />
            {animated && (
                <motion.div
                    className="absolute"
                    style={{
                        width: isHorizontal ? '30%' : '100%',
                        height: isHorizontal ? '100%' : '30%',
                        background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, ${color}, transparent)`,
                        boxShadow: `0 0 20px ${color}`,
                    }}
                    animate={isHorizontal ? { x: ['-100%', '400%'] } : { y: ['-100%', '400%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
        </div>
    );
}

// ========================================
// ORBITAL RING COMPONENT
// ========================================
interface OrbitalRingProps {
    size?: number;
    color?: string;
    duration?: number;
    reverse?: boolean;
    dashed?: boolean;
    className?: string;
}

export function OrbitalRing({
    size = 300,
    color = '#FFB300',
    duration = 20,
    reverse = false,
    dashed = false,
    className = '',
}: OrbitalRingProps) {
    return (
        <motion.div
            className={`absolute border rounded-full ${className}`}
            style={{
                width: size,
                height: size,
                borderColor: `${color}30`,
                borderStyle: dashed ? 'dashed' : 'solid',
            }}
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}`,
                }}
            />
        </motion.div>
    );
}
