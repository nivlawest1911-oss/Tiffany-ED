'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import { cn } from '@/lib/utils';

interface HumanoidHolographProps {
    icon: React.ComponentType<{ className?: string; size?: number }>;
    className?: string;
    isActive?: boolean;
    size?: number;
}

export const HumanoidHolograph = ({
    icon: Icon,
    className,
    isActive = true,
    size = 20
}: HumanoidHolographProps) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { behaviorStyles } = useHumanBehavior(isActive, { mousePos });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn("relative flex items-center justify-center p-2", className)}
        >
            {/* Humanoid Base Kinematics */}
            <motion.div
                animate={behaviorStyles}
                transition={{ duration: 3.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10"
            >
                {/* Holographic Projection Layer */}
                <div className="relative">
                    {/* Shadow/Glow Base */}
                    <div
                        className={cn(
                            "absolute inset-0 blur-md opacity-20 scale-150 animate-pulse bg-noble-gold rounded-full",
                            `w-[${size}px] h-[${size}px]`
                        )}
                    />

                    {/* Primary Icon */}
                    <Icon
                        className="relative z-20 text-noble-gold/80"
                        size={size}
                    />

                    {/* Chromatic Aberration Layers */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-0 z-10 text-blue-500/30 blur-[1.5px]"
                            animate={{ x: [-1, 0, -1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Icon size={size} />
                        </motion.div>
                        <motion.div
                            className="absolute top-0 left-0 z-10 text-red-500/30 blur-[1.5px]"
                            animate={{ x: [1, 0, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                            <Icon size={size} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Energy Pedestal (Subtle base glow) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-noble-gold/10 blur-sm rounded-full" />

            {/* Holographic Flicker Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                animate={{
                    opacity: [0, 0.1, 0, 0.2, 0],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
        </div>
    );
};
