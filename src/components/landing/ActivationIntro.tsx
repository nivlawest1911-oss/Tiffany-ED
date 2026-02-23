'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EdIntelCore from '../edintel-core/EdIntelCore';
import ActivationNarrative from './ActivationNarrative';

const BIOS_LINES = [
    "EDINTEL(R) SOVEREIGN BIOS V5.0.0",
    "COPYRIGHT (C) 2026 EDINTEL ADAPTIVE SYSTEMS",
    "CHECKING NEURAL NETWORKS... [OK]",
    "INITIALIZING QUANTUM UPLINK... [OK]",
    "ESTABLISHING SOVEREIGN GATEKEEPER... [OK]",
    "WARNING: FRAGMENTED DATA DETECTED.",
    "COMMENCING RECONSTRUCTION PROTOCOL...",
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
            }, 300);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-[#020617] overflow-hidden select-none"
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
                        className="p-12 font-mono text-electric-cyan text-xs md:text-sm leading-relaxed"
                    >
                        {bootLines.map((line, i) => (
                            <div key={i} className="mb-2 tracking-widest uppercase">
                                <span className="mr-3 opacity-50">::</span>
                                {line}
                            </div>
                        ))}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2.5 h-5 bg-sovereign-gold ml-2 translate-y-1 shadow-[0_0_10px_#FFB300]"
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
                            className="absolute bottom-16 left-1/2 -translate-x-1/2"
                        >
                            <button
                                onClick={onCompleteAction}
                                className="px-12 py-4 bg-gradient-to-r from-electric-cyan to-blue-600 text-black font-black uppercase tracking-widest rounded-xl hover:scale-110 transition-transform shadow-[0_0_40px_rgba(0,176,255,0.4)]"
                            >
                                Enter System
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
