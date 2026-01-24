'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import { useState } from 'react';

interface FlourishBuddyProps {
    isActive: boolean;
}

export default function FlourishBuddy({ isActive }: FlourishBuddyProps) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Peace be with you. How can I support your cognitive fitness today?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;
        setMessages([...messages, { role: 'user', content: inputValue }]);
        setInputValue('');
        // In a real scenario, this would trigger a Vertex AI call with the system prompt
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: 'I am reflecting on your resonance. Your strategic well-being is my priority.' }]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-8 right-8 w-80 z-[100]"
                >
                    {/* Floating Bubble Container */}
                    <div className="bg-emerald-900/40 backdrop-blur-3xl border border-emerald-400/30 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-emerald-900/40">

                        {/* Header */}
                        <div className="p-5 bg-emerald-400/10 flex justify-between items-center border-b border-emerald-400/20">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                                <span className="text-xs font-black text-emerald-100 tracking-[0.2em] uppercase">Flourish Buddy</span>
                            </div>
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                        </div>

                        {/* Chat Area */}
                        <div className="h-72 p-6 overflow-y-auto space-y-4 text-sm text-emerald-50/80 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <div key={i} className={`${msg.role === 'assistant' ? 'text-left' : 'text-right'}`}>
                                    <p className={`inline-block p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-emerald-800/40 border border-emerald-400/10' : 'bg-emerald-400/20 text-emerald-100 border border-emerald-400/20'}`}>
                                        {msg.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-emerald-400/20 flex gap-2 bg-black/20">
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your reflection..."
                                className="flex-1 bg-emerald-950/50 border border-emerald-400/20 rounded-full px-4 py-2 text-xs text-emerald-100 placeholder:text-emerald-400/30 focus:outline-none focus:border-emerald-400 transition-all font-medium"
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 bg-emerald-400 rounded-full text-zinc-900 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-emerald-900/40"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
