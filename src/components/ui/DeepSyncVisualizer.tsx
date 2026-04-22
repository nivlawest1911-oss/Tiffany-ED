'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Database, Zap, Cpu, Search, CheckCircle2 } from 'lucide-react';

const PROGRESS_STRINGS = [
    "Establishing Sovereign Handshake...",
    "Querying Institutional Nodes...",
    "Synchronizing Pedagogical Metadata...",
    "Mapping Governance Protocols...",
    "Calibrating Neural Sentinel...",
    "Uplink Stable. Welcome, Sovereign."
];

interface DeepSyncVisualizerProps {
    onComplete?: () => void;
}

export default function DeepSyncVisualizer({ onComplete }: DeepSyncVisualizerProps) {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    if (onComplete) setTimeout(onComplete, 1000);
                    return 100;
                }
                return prev + Math.random() * 8;
            });
        }, 150);

        const statusTimer = setInterval(() => {
            setStatusIndex((prev) => (prev < PROGRESS_STRINGS.length - 1 ? prev + 1 : prev));
        }, 800);

        return () => {
            clearInterval(timer);
            clearInterval(statusTimer);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-white overflow-hidden">
            {/* Background Grid (Neural Style) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Central Holographic Pulse */}
            <div className="relative mb-12">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-blue-500 rounded-full blur-[60px] opacity-20"
                />
                
                <div className="relative w-24 h-24 flex items-center justify-center border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={statusIndex}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            className="text-blue-400"
                        >
                            {statusIndex === 0 && <Zap className="w-10 h-10" />}
                            {statusIndex === 1 && <Database className="w-10 h-10" />}
                            {statusIndex === 2 && <Cpu className="w-10 h-10" />}
                            {statusIndex === 3 && <Shield className="w-10 h-10" />}
                            {statusIndex === 4 && <Search className="w-10 h-10" />}
                            {statusIndex === 5 && <CheckCircle2 className="w-10 h-10 text-emerald-400" />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Status Text */}
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-2">
                    <motion.h2 
                        key={statusIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-light tracking-[0.2em] uppercase text-sky-200"
                    >
                        {PROGRESS_STRINGS[statusIndex]}
                    </motion.h2>
                    <p className="text-white/40 text-sm font-mono tracking-widest uppercase">
                        Protocol: Uplink_Security_v2.0
                    </p>
                </div>

                {/* Progress Bar (Cinematic) */}
                <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-right from-blue-600 to-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                    />
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                    <div className="text-left space-y-1">
                        <p className="text-[10px] uppercase tracking-tighter text-white/30">Latency</p>
                        <p className="text-xs font-mono text-cyan-400">14ms</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] uppercase tracking-tighter text-white/30">Node_Sync</p>
                        <p className="text-xs font-mono text-emerald-400">Stable</p>
                    </div>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-12 flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-xs ring-1 ring-white/20">Ed</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-light">Intel_Sovereign</div>
            </div>
        </div>
    );
}
