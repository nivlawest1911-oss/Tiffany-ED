'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TranscendLogoProps {
    className?: string;
    variant?: 'fidelity' | 'minimal' | 'monochrome';
    size?: number;
}

export default function TranscendLogo({
    className = "",
    variant = "fidelity",
    size = 40
}: TranscendLogoProps) {
    if (variant === 'fidelity') {
        return (
            <div className={cn("relative flex items-center gap-3 group", className)}>
                <div
                    className={cn(
                        "relative flex items-center justify-center overflow-hidden rounded-xl",
                        size === 40 ? "w-10 h-10" : size === 80 ? "w-20 h-20" : "w-10 h-10"
                    )}
                >
                    {/* High Fidelity Asset */}
                    <Image
                        src="/images/branding/transcend_logo_premium.png"
                        alt="Transcend Premium Logo"
                        width={size}
                        height={size}
                        className="object-contain"
                        priority
                    />

                    {/* Animated Glow Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-teal-400/20"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="flex flex-col leading-none">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-noble-gold to-teal-400">
                        Transcend
                    </span>
                    <span className="text-[0.6rem] font-bold text-teal-400/70 uppercase tracking-[0.3em]">
                        Holistic Wellness
                    </span>
                </div>
            </div>
        );
    }

    // Default / Minimal variant (simplified SVG)
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                className={cn(
                    variant === 'monochrome' ? "text-current" : "text-purple-500"
                )}
            >
                <path
                    d="M50 10 L80 40 L50 70 L20 40 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinejoin="round"
                />
                <circle cx="50" cy="45" r="5" fill="currentColor" />
            </svg>
            <span className="text-xl font-bold tracking-tight">Transcend</span>
        </div>
    );
}
