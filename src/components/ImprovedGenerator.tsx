'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface ImprovedGeneratorProps {
    generatorId: string;
    title: string;
    description: string;
    quickPrompts?: string[];
}

export default function ImprovedGenerator({
    generatorId,
    title,
    description,
    quickPrompts = []
}: ImprovedGeneratorProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    generatorId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate response');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';

            if (reader) {
                const assistantId = (Date.now() + 1).toString();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    assistantMessage += chunk;

                    // Update the last message or add new one
                    setMessages(prev => {
                        const existing = prev.find(m => m.id === assistantId);
                        if (existing) {
                            return prev.map(m =>
                                m.id === assistantId
                                    ? { ...m, content: assistantMessage }
                                    : m
                            );
                        } else {
                            return [...prev, {
                                id: assistantId,
                                role: 'assistant',
                                content: assistantMessage
                            }];
                        }
                    });
                }
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant') {
            await navigator.clipboard.writeText(lastMessage.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant') {
            const blob = new Blob([lastMessage.content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${generatorId}-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Header */}
            <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">{title}</h1>
                            <p className="text-sm text-purple-300">{description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Sidebar - Quick Prompts */}
                    <div className="lg:col-span-1">
                        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                Quick Start
                            </h2>
                            <div className="space-y-2">
                                {quickPrompts.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleQuickPrompt(prompt)}
                                        className="w-full text-left p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all text-sm text-purple-200 hover:text-white"
                                    >
                                        {prompt}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-6 pt-6 border-t border-purple-500/20">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-400">
                                            {messages.filter(m => m.role === 'assistant').length}
                                        </div>
                                        <div className="text-xs text-purple-300">Generated</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-pink-400">
                                            {isLoading ? '...' : '< 1s'}
                                        </div>
                                        <div className="text-xs text-purple-300">Avg Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-16rem)]">

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {messages.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="text-center py-12"
                                        >
                                            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                                                <Sparkles className="w-12 h-12 text-purple-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                Ready to Generate
                                            </h3>
                                            <p className="text-purple-300 max-w-md mx-auto">
                                                Enter your prompt below or choose a quick start option to begin
                                            </p>
                                        </motion.div>
                                    )}

                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl p-4 ${message.role === 'user'
                                                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                                                        : 'bg-slate-800/50 border border-purple-500/20 text-purple-100'
                                                    }`}
                                            >
                                                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-4">
                                                <div className="flex items-center gap-2 text-purple-300">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span className="text-sm">Generating...</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
                                        >
                                            <p className="text-red-400 text-sm">Error: {error}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Action Buttons */}
                            {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
                                <div className="border-t border-purple-500/20 p-4 bg-black/20">
                                    <div className="flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 hover:text-white transition-all"
                                        >
                                            {copied ? (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-sm">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span className="text-sm">Copy</span>
                                                </>
                                            )}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleDownload}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 hover:text-white transition-all"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span className="text-sm">Download</span>
                                        </motion.button>
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="border-t border-purple-500/20 p-4 bg-black/20">
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={`Message ${title}...`}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-purple-500/20 focus:border-purple-500/40 focus:outline-none text-white placeholder-purple-300/50 disabled:opacity-50"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Send className="w-5 h-5" />
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
