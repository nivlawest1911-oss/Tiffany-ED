'use client';

import { useChat } from '@ai-sdk/react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Send, Brain } from 'lucide-react';
import { useState } from 'react';
import EdIntelPulse from '@/components/edintel-core/EdIntelPulse';

export default function EdIntelAvatar() {
    const pathname = usePathname();
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat/gemini',
        body: { pathname }
    } as any) as any;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative group">
            {/* The Floating Avatar Presence */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer relative z-50"
            >
                <EdIntelPulse isSpeaking={isLoading} isActive={true} />

                {/* Badge */}
                <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-[8px] font-black px-2 py-0.5 rounded-full border border-black shadow-lg uppercase tracking-tighter">
                    EdIntel Mentor
                </div>
            </motion.div>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        className="absolute bottom-full right-0 mb-8 w-96 z-[100]"
                    >
                        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-amber-500/20 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-amber-900/20">
                            {/* Header */}
                            <div className="p-5 bg-amber-500/10 flex justify-between items-center border-b border-amber-500/20">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                                        <Brain className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase">EdIntel Mentor</span>
                                        <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Neural Sync Active</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                    aria-label="Close Chat"
                                    title="Close Chat"
                                >
                                    <MessageSquare size={16} />
                                </button>
                            </div>

                            {/* Chat Log */}
                            <div className="h-80 p-6 overflow-y-auto space-y-4 text-sm text-zinc-300 scrollbar-hide">
                                {messages.length === 0 && (
                                    <div className="text-center py-10 space-y-4 opacity-40">
                                        <Sparkles className="w-8 h-8 mx-auto text-amber-500" />
                                        <p className="text-[10px] uppercase font-black tracking-widest leading-relaxed">
                                            "Speak your strategic intent.<br />I will architect the resonance."
                                        </p>
                                    </div>
                                )}
                                {messages.map((m: any) => (
                                    <div key={m.id} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        <div className={`inline-block p-4 rounded-2xl max-w-[85%] ${m.role === 'user'
                                            ? 'bg-amber-500/10 text-amber-100 border border-amber-500/20'
                                            : 'bg-zinc-800/60 text-zinc-200 border border-white/5'
                                            }`}>
                                            {(m as any).content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-2">
                                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" />
                                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 flex gap-2 bg-black/40">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Inquire with purpose..."
                                    className="flex-1 bg-zinc-950/50 border border-amber-500/20 rounded-full px-5 py-3 text-xs text-amber-100 placeholder:text-amber-500/30 focus:outline-none focus:border-amber-500 transition-all font-bold"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="p-3 bg-amber-500 rounded-full text-black hover:scale-110 active:scale-95 transition-all shadow-lg shadow-amber-900/60 disabled:opacity-50"
                                    aria-label="Send Message"
                                    title="Send Message"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
