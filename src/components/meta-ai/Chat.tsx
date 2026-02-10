'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, Send, Shield, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AbilityAnimation from '@/components/shared/AbilityAnimation';

export interface MetaAIChatProps {
    className?: string;
}

export function MetaAIChat({ className = '' }: MetaAIChatProps) {
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [provider, setProvider] = useState<'together' | 'replicate'>('together');

    // Ref to hold the controller for the active request
    const abortControllerRef = useRef<AbortController | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // Cancel previous request if any (though UI prevents it via isLoading)
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/meta-ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    provider,
                }),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            // Check if aborted before updating state
            if (controller.signal.aborted) return;

            const assistantMessage = data.choices[0]?.message;

            if (assistantMessage) {
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error: any) {
            if (error.name === 'AbortError') return;
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
            }]);
        } finally {
            if (abortControllerRef.current === controller) {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    return (
        <Card className={`flex flex-col h-[700px] bg-black border-white/5 shadow-2xl relative overflow-hidden group/chat ${className}`}>
            {/* Background Ability Animation - Subtle */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <AbilityAnimation type="communication" />
            </div>

            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-zinc-900/40 backdrop-blur-xl relative z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl relative">
                                <Brain className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Meta AI</h3>
                                <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-[10px] text-blue-400 font-black uppercase tracking-widest">Llama 3.3</div>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-1 italic">EdIntel Neural Interface</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Compute Provider</span>
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value as any)}
                            className="px-4 py-2 bg-black border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-blue-500/50 hover:bg-zinc-900 transition-all cursor-pointer"
                            title="Select AI Provider"
                        >
                            <option value="together">Together AI (Fast)</option>
                            <option value="replicate">Replicate (Deep)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 scrollbar-hide">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="p-8 bg-blue-500/5 rounded-full border border-blue-500/10"
                        >
                            <Zap className="w-16 h-16 text-blue-500/20" />
                        </motion.div>
                        <div className="space-y-2">
                            <p className="text-zinc-400 font-bold text-lg uppercase tracking-tight">System Ready</p>
                            <p className="text-zinc-600 text-xs max-w-xs uppercase tracking-widest leading-relaxed">Input strategic directive or educational inquiry to begin neural synthesis.</p>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                        <motion.div
                            key={`${index}-${message.role}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-[2rem] px-6 py-4 shadow-xl ${message.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none border border-blue-400/30'
                                    : 'bg-zinc-900/80 text-zinc-100 rounded-bl-none border border-white/5 backdrop-blur-xl'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2 opacity-50">
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">{message.role === 'user' ? 'Executive' : 'Meta System'}</span>
                                    <div className={`w-1 h-1 rounded-full ${message.role === 'user' ? 'bg-white' : 'bg-blue-500'}`} />
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] rounded-bl-none px-6 py-4 flex items-center gap-3">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Analyzing Pattern...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-white/5 bg-zinc-900/20 relative z-20">
                <div className="flex gap-4 items-center">
                    <div className="flex-1 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            placeholder="TRANSMIT STRATEGIC QUERY..."
                            className="relative w-full px-6 py-5 bg-black border border-white/10 rounded-2xl text-white text-sm font-bold placeholder:text-zinc-700 outline-none focus:border-blue-500/50 transition-all uppercase tracking-wider"
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="h-full px-8 py-5 bg-white text-black hover:bg-blue-500 hover:text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-3">
                                <span>Transmit</span>
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        )}
                    </Button>
                </div>
                <div className="mt-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                            <Shield size={10} className="text-emerald-500" />
                            Secure Link Active
                        </div>
                        <div className="flex items-center gap-1.5 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                            <Activity size={10} className="text-blue-500" />
                            Latency: {isLoading ? 'Calculating...' : '42ms'}
                        </div>
                    </div>
                    <p className="text-[7px] font-mono text-zinc-700 uppercase tracking-[0.3em]">Llama-3.3-70B-Instruct-Turbo // EdIntel_Core_v4</p>
                </div>
            </div>
        </Card>
    );
}
