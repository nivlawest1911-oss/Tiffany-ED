'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X, Mic, MicOff, Maximize2, Minimize2 } from 'lucide-react';
import { useTavus } from '@/context/TavusContext';

export default function TavusPlayer() {
    const { isSessionActive, isConnecting, conversationUrl, endAdvisorySession } = useTavus();
    const [isExpanded, setIsExpanded] = useState(false);

    // Chroma Key Simulation (CSS Backdrop)
    // In a real high-end implementation, we might use WebGL to key out the background
    // For now, we use a sleek, glass-morphic container that floats over the UI.

    if (!isSessionActive && !isConnecting) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    width: isExpanded ? '100vw' : '400px',
                    height: isExpanded ? '100vh' : '600px',
                    borderRadius: isExpanded ? '0px' : '24px',
                    bottom: isExpanded ? '0px' : '24px',
                    right: isExpanded ? '0px' : '24px'
                }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`fixed z-[100] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col`}
            >
                {/* Header / Controls */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                            PHOENIX-3 LIVE // 4K UPLINK
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 rounded-full bg-black/40 text-white hover:bg-white/20 transition-all"
                        >
                            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>
                        <button
                            onClick={endAdvisorySession}
                            className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isConnecting && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white z-10">
                        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                        <div className="text-center">
                            <h3 className="text-lg font-bold tracking-tight">SECURING LINE</h3>
                            <p className="text-xs text-zinc-400 font-mono">ENCRYPTING TAVUS PROTOCOL...</p>
                        </div>
                    </div>
                )}

                {/* Video Stream (Iframe Embed) */}
                {conversationUrl && (
                    <motion.div
                        className="w-full h-full bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <iframe
                            src={conversationUrl}
                            allow="camera; microphone; autoplay; fullscreen; display-capture"
                            className="w-full h-full border-none object-cover"
                            style={{
                                pointerEvents: 'auto',
                                // Attempting to blend if theiframe supports transparency (Daily.co often does not without custom CSS injection)
                                // Standard fallback: High fidelity rectangular video
                            }}
                        />

                        {/* Overlay Elements for immersion */}
                        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-[inherit] mix-blend-overlay" />
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
