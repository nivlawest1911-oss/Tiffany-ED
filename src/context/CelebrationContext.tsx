'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, ShieldCheck } from 'lucide-react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

type CelebrationType = 'success' | 'achievement' | 'milestone' | 'prime';

interface Celebration {
    id: string;
    title: string;
    message: string;
    type: CelebrationType;
}

interface CelebrationContextType {
    celebrate: (title: string, message: string, type?: CelebrationType) => void;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>(undefined);

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
    const [activeCelebration, setActiveCelebration] = useState<Celebration | null>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const celebrate = useCallback((title: string, message: string, type: CelebrationType = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setActiveCelebration({ id, title, message, type });

        // Auto-dismiss
        setTimeout(() => {
            setActiveCelebration(null);
        }, 5000);
    }, []);

    return (
        <CelebrationContext.Provider value={{ celebrate }}>
            {children}

            <AnimatePresence>
                {activeCelebration && (
                    <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center">
                        {/* Confetti Effect */}
                        <Confetti
                            width={windowSize.width}
                            height={windowSize.height}
                            numberOfPieces={200}
                            recycle={false}
                            colors={['#D4AF37', '#FFF', '#C5A47E', '#8A6D3B']}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, y: -20, filter: 'blur(10px)' }}
                            className="pointer-events-auto liquid-glass p-8 max-w-md w-full border-noble-gold/50 shadow-[0_0_100px_rgba(212,175,55,0.4)] text-center space-y-6 rounded-[3rem]"
                        >
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-noble-gold/20 rounded-full flex items-center justify-center border border-noble-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                    {activeCelebration.type === 'achievement' && <Trophy size={32} className="text-noble-gold" />}
                                    {activeCelebration.type === 'prime' && <Star size={32} className="text-noble-gold" />}
                                    {activeCelebration.type === 'success' && <ShieldCheck size={32} className="text-noble-gold" />}
                                    {activeCelebration.type === 'milestone' && <Zap size={32} className="text-noble-gold" />}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-[10px] font-black uppercase text-noble-gold tracking-[0.5em] italic">Protocol Achievement Unlocked</div>
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                                    {activeCelebration.title}
                                </h3>
                                <p className="text-sm text-white/60 font-medium leading-relaxed italic">
                                    {activeCelebration.message}
                                </p>
                            </div>

                            <div className="pt-4 flex justify-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            delay: i * 0.2
                                        }}
                                        className="w-1.5 h-1.5 bg-noble-gold rounded-full"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </CelebrationContext.Provider>
    );
}

export const useCelebrate = () => {
    const context = useContext(CelebrationContext);
    if (!context) {
        console.warn('useCelebrate was used without a CelebrationProvider. This calls will be no-ops.');
        return { celebrate: () => { } };
    }
    return context;
};

import { useEffect } from 'react';
