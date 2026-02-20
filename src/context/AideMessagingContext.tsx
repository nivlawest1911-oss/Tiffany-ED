'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AideMessage {
    text: string;
    source?: string;
    type?: 'insight' | 'action' | 'warning';
}

interface AideContextType {
    setMessage: (msg: AideMessage | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const AideContext = createContext<AideContextType | undefined>(undefined);

export function AideProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessageState] = useState<AideMessage | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const setMessage = useCallback((msg: AideMessage | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (!msg) {
            // Small delay before clearing to prevent flickering on fast movements
            timeoutRef.current = setTimeout(() => {
                setMessageState(null);
            }, 100);
            return;
        }

        setMessageState(msg);
    }, []);

    return (
        <AideContext.Provider value={{ setMessage, isLoading, setIsLoading }}>
            {children}

            {/* Global Aide Message Overlay */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="fixed bottom-24 right-8 z-[110] max-w-xs"
                    >
                        <div className="bg-zinc-900/90 backdrop-blur-xl border border-noble-gold/20 p-4 rounded-2xl shadow-2xl relative overflow-hidden group">
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-noble-gold/5 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex gap-3">
                                <div className="shrink-0 mt-1">
                                    <div className="bg-noble-gold/10 p-2 rounded-lg border border-noble-gold/20">
                                        <Sparkles className="w-4 h-4 text-noble-gold animate-pulse" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noble-gold/60">
                                            Sovereign Aide
                                        </span>
                                        {isLoading && (
                                            <div className="flex gap-0.5">
                                                <span className="w-1 h-1 bg-noble-gold rounded-full animate-bounce" />
                                                <span className="w-1 h-1 bg-noble-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <span className="w-1 h-1 bg-noble-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                                        "{message.text}"
                                    </p>
                                </div>
                            </div>

                            {/* Progress bar effect on hover */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                className="absolute bottom-0 left-0 right-0 h-[1px] bg-noble-gold origin-left"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AideContext.Provider>
    );
}

export function useAide() {
    const context = useContext(AideContext);
    if (context === undefined) {
        throw new Error('useAide must be used within an AideProvider');
    }
    return context;
}
