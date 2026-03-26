'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Holographic Grid Background
export function HolographicGrid({ opacity = 0.15 }: { opacity?: number }) {
    return (
        <>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,179,0,${opacity}) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,229,255,${opacity}) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />
            <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB300]/50 to-transparent"
            />
        </>
    );
}

// Neon Glow Text
export function NeonText({
    children,
    color = '#FFB300',
    className = ''
}: {
    children: React.ReactNode;
    color?: string;
    className?: string;
}) {
    return (
        <motion.span
            className={`${className}`}
            style={{
                textShadow: `0 0 10px ${color}, 0 0 20px ${color}80, 0 0 40px ${color}40`,
                color: color,
            }}
            animate={{
                textShadow: [
                    `0 0 10px ${color}, 0 0 20px ${color}80, 0 0 40px ${color}40`,
                    `0 0 20px ${color}, 0 0 30px ${color}60, 0 0 60px ${color}60`,
                    `0 0 10px ${color}, 0 0 20px ${color}80, 0 0 40px ${color}40`,
                ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            {children}
        </motion.span>
    );
}

// Glass Panel
export function GlassPanel({
    children,
    className = '',
    animate = true,
}: {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}) {
    return (
        <motion.div
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={animate ? { duration: 0.6 } : undefined}
            className={`
                relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20
                shadow-[0_0_30px_rgba(255,179,0,0.1)]
                hover:shadow-[0_0_40px_rgba(255,179,0,0.2)]
                transition-all duration-300
                ${className}
            `}
        >
            {/* Scan Lines */}
            <div
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-20"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.1) 2px, rgba(0, 229, 255, 0.1) 4px)',
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// Particle Field
export function ParticleField({ count = 20, color = 'rgba(255,179,0,0.6)' }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: Math.random() * 4 + 2,
                        height: Math.random() * 4 + 2,
                        background: color,
                        boxShadow: `0 0 ${8 + Math.random() * 8}px ${color}`,
                    }}
                    animate={{
                        y: [0, -50 - Math.random() * 100, 0],
                        x: [0, Math.random() * 40 - 20, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// Holographic Border
export function HolographicBorder({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative ${className}`}>
            <motion.div
                animate={{ borderColor: ['rgba(255,179,0,0.5)', 'rgba(0,229,255,0.5)', 'rgba(255,179,0,0.5)'] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 border border-[#FFB300]/50 rounded-2xl pointer-events-none"
            />
            <motion.div
                animate={{
                    boxShadow: [
                        '0 0 20px rgba(255,179,0,0.3), inset 0 0 20px rgba(0,229,255,0.1)',
                        '0 0 40px rgba(255,179,0,0.5), inset 0 0 30px rgba(0,229,255,0.2)',
                        '0 0 20px rgba(255,179,0,0.3), inset 0 0 20px rgba(0,229,255,0.1)',
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Shimmer Effect
export function ShimmerEffect({ className = '' }: { className?: string }) {
    return (
        <motion.div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`}
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
    );
}

// Aurora Background
export function AuroraBackground({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#FFB300]/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none"
            />
            {children && <div className="relative z-10">{children}</div>}
        </div>
    );
}

// Rotating Gear
export function RotatingGear({
    size = 80,
    color = '#FFB300',
    duration = 20,
}: {
    size?: number;
    color?: string;
    duration?: number;
}) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none"
        >
            <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
            <path
                d="M50 15 L55 20 L60 15 L65 20 L70 15 L65 25 L70 30 L60 35 L65 40 L55 45 L60 50 L50 55 L55 60 L45 65 L50 70 L40 75 L35 70 L30 80 L25 70 L20 75 L15 65 L20 60 L10 55 L15 50 L5 45 L15 40 L10 35 L20 30 L15 25 L20 20 L15 15 L25 20 L30 15 L35 20 L40 15 Z"
                fill={color}
                fillOpacity="0.6"
            />
            <circle cx="50" cy="50" r="15" fill={color} fillOpacity="0.8" />
        </motion.svg>
    );
}

// Laser Beam
export function LaserBeam({
    from = { x: 0, y: 0 },
    to = { x: 100, y: 100 },
    color = '#FFB300',
    animated = true,
}: {
    from?: { x: number; y: number };
    to?: { x: number; y: number };
    color?: string;
    animated?: boolean;
}) {
    const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: from.x,
                top: from.y,
                width: length,
                height: 2,
                background: color,
                transformOrigin: '0 50%',
                transform: `rotate(${angle}deg)`,
                boxShadow: `0 0 20px ${color}`,
            }}
            animate={animated ? {
                opacity: [0.5, 1, 0.5],
                boxShadow: [`0 0 20px ${color}`, `0 0 40px ${color}`, `0 0 20px ${color}`],
            } : undefined}
            transition={animated ? { duration: 2, repeat: Infinity } : undefined}
        />
    );
}

// Orbital Ring
export function OrbitalRing({
    size = 200,
    color = '#00E5FF',
    duration = 15,
}: {
    size?: number;
    color?: string;
    duration?: number;
}) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none"
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 10}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                opacity="0.6"
            />
            <motion.circle
                cx={size / 2}
                cy={10}
                r="6"
                fill={color}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.svg>
    );
}
