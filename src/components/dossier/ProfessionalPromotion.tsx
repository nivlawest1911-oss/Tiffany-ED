'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import Confetti from 'react-confetti';

interface PromotionProps {
    rank: {
        title: string;
        level: number;
        color: string;
        clearance: string;
    };
    isOpen: boolean;
    onCloseAction: () => void;
}

export default function ProfessionalPromotion({ rank, isOpen, onCloseAction }: PromotionProps) {
    const { playSuccess } = useProfessionalSounds();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
            playSuccess();
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, playSuccess]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
                    {showConfetti && <Confetti recycle={false} numberOfPieces={500} colors={['#6366f1', '#a855f7', '#fbbf24']} />}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotateX: -20 }}
                        className="relative w-full max-w-xl text-center"
                    >
                        {/* Radiant Background FX */}
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />

                        <div className="relative z-10 space-y-8">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                                <Star size={12} fill="currentColor" /> Executive Ascension Detected
                            </motion.div>

                            <div className="space-y-2">
                                <motion.h2
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                                    className="text-6xl font-black text-white uppercase tracking-tighter"
                                >
                                    Promoted
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-zinc-500 font-mono text-xs uppercase tracking-[0.5em]"
                                >
                                    New Rank Calibrated
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", duration: 1, delay: 0.6 }}
                                className="w-48 h-48 mx-auto relative"
                            >
                                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
                                <div className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-full animate-spin-slow" />
                                <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[3rem] shadow-2xl flex items-center justify-center">
                                    <Trophy size={64} className="text-white drop-shadow-2xl" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="space-y-4"
                            >
                                <div>
                                    <h3 className={`text-3xl font-black uppercase tracking-widest ${rank.color}`}>{rank.title}</h3>
                                    <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest font-bold">Clearance: {rank.clearance}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="pt-8"
                            >
                                <button
                                    onClick={onCloseAction}
                                    className="group relative px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl hover:shadow-indigo-500/50"
                                >
                                    Return to Command Deck <ChevronRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
