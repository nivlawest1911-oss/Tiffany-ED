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
            <motion.div
                className={cn("relative flex items-center gap-3 group cursor-pointer", className)}
                initial="initial"
                whileHover="hover"
            >
                <motion.div
                    className={cn(
                        "relative flex items-center justify-center overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/5",
                        size === 40 ? "w-10 h-10" : size === 80 ? "w-20 h-20" : "w-10 h-10"
                    )}
                    variants={{
                        hover: {
                            rotateY: -15,
                            rotateX: 10,
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 400, damping: 12 }
                        }
                    }}
                >
                    {/* High Fidelity Asset */}
                    <Image
                        src="/images/branding/transcend_logo_premium.png"
                        alt="Transcend Premium Logo"
                        width={size}
                        height={size}
                        className="object-contain relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        priority
                    />

                    {/* Animated Glow Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-teal-400/20"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Regal Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-noble-gold/30 to-transparent skew-x-12 -translate-x-[200%] z-20"
                        variants={{
                            hover: {
                                translateX: ["150%", "-150%"],
                                transition: { duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }
                            }
                        }}
                    />
                </motion.div>

                <div className="flex flex-col leading-none">
                    <motion.span
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-noble-gold to-teal-400"
                        variants={{
                            hover: { x: 3, transition: { duration: 0.2 } }
                        }}
                    >
                        Transcend
                    </motion.span>
                    <motion.span
                        className="text-[0.6rem] font-bold text-teal-400/70 uppercase tracking-[0.3em]"
                        variants={{
                            hover: { letterSpacing: "0.4em", opacity: 1, transition: { duration: 0.3 } }
                        }}
                    >
                        Holistic Wellness
                    </motion.span>
                </div>
            </motion.div>
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
