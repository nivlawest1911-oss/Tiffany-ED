'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function NeuralCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        const handleScroll = () => {
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 500);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Outer Ring */}
            <motion.div
                className="absolute w-8 h-8 border border-emerald-500/30 rounded-full"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    borderColor: isPointer ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.3)',
                    rotate: isScrolling ? 180 : 0
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isPointer ? 0.5 : 1,
                }}
            />

            {/* Neural Trails */}
            <AnimatePresence>
                {isPointer && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: [0, 0.3, 0], scale: 2 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-8 h-8 border border-emerald-400 rounded-full"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                )}
            </AnimatePresence>

            {/* Coordinate Display (Subtle EdIntel Motif) */}
            <motion.div
                className="absolute text-[6px] font-black text-emerald-500/20 uppercase tracking-widest font-mono whitespace-nowrap"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '20px',
                    translateY: '20px',
                }}
            >
                LATENCY_SYNCED // POS_{Math.round(cursorX.get())}_{Math.round(cursorY.get())}
            </motion.div>
        </div>
    );
}
