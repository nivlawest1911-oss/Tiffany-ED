'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EdIntelCore from '../edintel-core/EdIntelCore';
import ActivationNarrative from './ActivationNarrative';

const BIOS_LINES = [
    "EDINTEL(R) BIOS V4.0.22",
    "COPYRIGHT (C) 2026 EDINTEL INTELLIGENCE SOLUTIONS",
    "CHECKING NEURAL NETWORKS... OK",
    "INITIALIZING OMNI-CHANNEL UPLINK... OK",
    "ESTABLISHING SECURE PROTOCOLS... OK",
    "WARNING: DATA UNSTRUCTURED. CHAOS DETECTED.",
    "COMMENCING THE ACTIVATION SEQUENCE...",
];

export default function ActivationIntro({ onCompleteAction }: { onCompleteAction: () => void }) {
    const [step, setStep] = useState<'boot' | 'scene1' | 'scene2' | 'complete'>('boot');
    const [bootLines, setBootLines] = useState<string[]>([]);

    useEffect(() => {
        if (step === 'boot') {
            let lineIdx = 0;
            const interval = setInterval(() => {
                if (lineIdx < BIOS_LINES.length) {
                    setBootLines(prev => [...prev, BIOS_LINES[lineIdx]]);
                    lineIdx++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setStep('scene1'), 1500);
                }
            }, 400);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-black overflow-hidden select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
        >
            <AnimatePresence mode="wait">
                {/* BOOT SEQUENCE */}
                {step === 'boot' && (
                    <motion.div
                        key="boot"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-8 font-mono text-noble-gold text-xs md:text-sm leading-relaxed"
                    >
                        {bootLines.map((line, i) => (
                            <div key={i} className="mb-1">
                                <span className="mr-2">&gt;</span>
                                {line}
                            </div>
                        ))}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-noble-gold ml-1 translate-y-1"
                        />
                    </motion.div>
                )}

                {/* SCENE 1: THE GRID */}
                {step === 'scene1' && (
                    <motion.div
                        key="scene1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full"
                    >
                        <EdIntelCore phase="grid" className="w-full h-full" />
                        <ActivationNarrative onCompleteAction={() => setStep('scene2')} />
                    </motion.div>
                )}

                {/* SCENE 2: THE ACTIVATION */}
                {step === 'scene2' && (
                    <motion.div
                        key="scene2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full"
                    >
                        <EdIntelCore phase="activation" className="w-full h-full" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        >
                            <button
                                onClick={onCompleteAction}
                                className="px-8 py-3 bg-noble-gold text-black font-black uppercase tracking-widest rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                            >
                                Enter EdIntel
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
