import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';

// For local dev, we use simple fallback shapes if lottie JSONs aren't downloaded yet.
// The user will replace these with actual Lottie JSONs downloaded from LottieFiles.

export type AvatarState = 'IDLE' | 'THINKING' | 'SPEAKING';

interface AvatarDisplayProps {
    state: AvatarState;
    className?: string;
    size?: number;
}

export function AvatarDisplay({ state, className = '', size = 120 }: AvatarDisplayProps) {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        // Dynamic import of Lottie files. 
        // In a real scenario, these JSONs must exist in public/animations/ or be imported directly.
        // For now we try to fetch them dynamically and fallback gracefully if missing.
        const loadLottie = async () => {
            try {
                let response;
                if (state === 'IDLE') {
                    response = await fetch('/animations/avatar-idle.json');
                } else if (state === 'THINKING') {
                    response = await fetch('/animations/avatar-thinking.json');
                } else if (state === 'SPEAKING') {
                    response = await fetch('/animations/avatar-speaking.json');
                }

                if (response && response.ok) {
                    const data = await response.json();
                    setAnimationData(data);
                } else {
                    // Simulating fallback state if Lottie files are not yet uploaded
                    setAnimationData(null);
                }
            } catch (err) {
                console.warn("Lottie animation files not found. Using CSS fallback.", err);
                setAnimationData(null);
            }
        };

        loadLottie();
    }, [state]);

    return (
        <div
            className={`relative flex items-center justify-center rounded-full glassmorphism overflow-hidden ${className}`}
            style={{ width: size, height: size }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={state}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {animationData ? (
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        // Holographic CSS Fallback if Lottie JSON isn't available
                        <div className="w-full h-full flex items-center justify-center relative">
                            <div className={`absolute inset-0 rounded-full mix-blend-screen opacity-50
                  ${state === 'IDLE' ? 'animate-pulse-gold bg-[#00B0FF]/20' : ''}
                  ${state === 'THINKING' ? 'animate-glow-pulse bg-[#FFB300]/30' : ''}
                  ${state === 'SPEAKING' ? 'animate-gold-glow bg-[#00B0FF]/40' : ''}
               `} />

                            {state === 'IDLE' && (
                                <div className="w-1/2 h-1/2 rounded-full border border-[#00B0FF]/50 animate-[spin_10s_linear_infinite]" />
                            )}
                            {state === 'THINKING' && (
                                <div className="w-2/3 h-2/3 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                                    <div className="w-full h-full border-2 border-[#FFB300] border-t-transparent rounded-full" />
                                </div>
                            )}
                            {state === 'SPEAKING' && (
                                <div className="flex gap-1 h-1/2 items-center">
                                    <motion.div animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-2 bg-[#00B0FF]" />
                                    <motion.div animate={{ height: [10, 40, 10] }} transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} className="w-2 bg-[#00B0FF]" />
                                    <motion.div animate={{ height: [10, 50, 10] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 bg-[#00B0FF]" />
                                    <motion.div animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }} className="w-2 bg-[#00B0FF]" />
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
