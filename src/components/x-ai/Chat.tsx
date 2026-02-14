'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Zap, Send, Shield, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AbilityAnimation from '@/components/shared/AbilityAnimation';
import { useChat } from '@ai-sdk/react';

export interface XAIChatProps {
    className?: string;
}

export function XAIChat({ className = '' }: XAIChatProps) {
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/x-ai/chat',
        initialMessages: [],
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Card className={`flex flex-col h-[700px] bg-black border-white/5 shadow-2xl relative overflow-hidden group/chat ${className}`}>
            {/* Background Ability Animation - Subtle */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <AbilityAnimation type="analysis" />
            </div>

            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-zinc-900/40 backdrop-blur-xl relative z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl relative">
                                <Zap className="w-8 h-8 text-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">X.AI Grok</h3>
                                <div className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 rounded text-[10px] text-yellow-400 font-black uppercase tracking-widest">Real-time</div>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-1 italic">EdIntel Sovereign Intelligence</p>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-2">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Neural Mode</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black border border-white/10 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3 text-yellow-400" />
                            Grok-1 Advanced
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 scrollbar-hide">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="p-8 bg-yellow-500/5 rounded-full border border-yellow-500/10"
                        >
                            <Zap className="w-16 h-16 text-yellow-500/20" />
                        </motion.div>
                        <div className="space-y-2">
                            <p className="text-zinc-400 font-bold text-lg uppercase tracking-tight">Grok Core Initialized</p>
                            <p className="text-zinc-600 text-xs max-w-xs uppercase tracking-widest leading-relaxed">Establish neural link via high-latency command or research directive.</p>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-[2rem] px-6 py-4 shadow-xl ${message.role === 'user'
                                    ? 'bg-zinc-800 text-white rounded-br-none border border-white/10'
                                    : 'bg-yellow-900/20 text-yellow-50 rounded-bl-none border border-yellow-500/10 backdrop-blur-xl'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2 opacity-50">
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">{message.role === 'user' ? 'Directiv' : 'Grok Intelligence'}</span>
                                    <div className={`w-1 h-1 rounded-full ${message.role === 'user' ? 'bg-white' : 'bg-yellow-500'}`} />
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-[2rem] rounded-bl-none px-6 py-4 flex items-center gap-3">
                            <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                            <span className="text-[10px] font-bold text-yellow-500/50 uppercase tracking-widest animate-pulse">Synthesizing Real-time Data...</span>
                        </div>
                    </motion.div>
                )}

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center">
                        Neural Link Failure: {error.message}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-8 border-t border-white/5 bg-zinc-900/20 relative z-20">
                <div className="flex gap-4 items-center">
                    <div className="flex-1 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="COMMENCE GROK ANALYSIS..."
                            className="relative w-full px-6 py-5 bg-black border border-white/10 rounded-2xl text-white text-sm font-bold placeholder:text-zinc-700 outline-none focus:border-yellow-500/50 transition-all uppercase tracking-wider"
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="h-[60px] px-8 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl group"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-3">
                                <span>Analyze</span>
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        )}
                    </Button>
                </div>
                <div className="mt-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                            <Shield size={10} className="text-emerald-500" />
                            Sovereign Encryption
                        </div>
                        <div className="flex items-center gap-1.5 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                            <Activity size={10} className="text-yellow-500" />
                            Neural Load: {isLoading ? 'Peak' : 'Nominal'}
                        </div>
                    </div>
                    <p className="text-[7px] font-mono text-zinc-700 uppercase tracking-[0.3em]">X.AI-GROK-1-SOVEREIGN // EdIntel_Core_v4</p>
                </div>
            </form>
        </Card>
    );
}
