'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';

interface EdIntelSovereignLogoProps {
    className?: string;
    size?: number;
}

/**
 * High-Fidelity EdIntel Logo with 3D Parallax and Holographic effects.
 * Formerly known as SovereignLogo, now unified under the EdIntel brand.
 */
export default function EdIntelSovereignLogo({
    className = "",
    size = 120
}: EdIntelSovereignLogoProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse Parallax Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
        >
            <motion.div
                style={{
                    perspective: 1000,
                    rotateX,
                    rotateY,
                }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                className="relative group cursor-pointer"
            >
                {/* Background Glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.6 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    className="absolute inset-0 bg-noble-gold/20 blur-2xl rounded-full"
                />

                {/* Primary Logo Image */}
                <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.5)] ring-1 ring-noble-gold/30">
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edintel_logo_high_fidelity_1774298407403.png-40aMNM0IwgAivJXguDqZ1AimCtnxVu.jpeg"
                        alt="EdIntel - Intelligence in Education"
                        width={size}
                        height={size}
                        className="object-contain"
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Holographic Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 z-20 overflow-hidden rounded-full pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                        <motion.div
                            animate={{
                                x: ['-200%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />
                    </motion.div>

                    {/* Pulse Ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -inset-4 border border-noble-gold/20 rounded-full z-0"
                    />
                </div>
            </motion.div>

            {/* Text disabled - Logo image now contains full branding */}
        </div>
    );
}
