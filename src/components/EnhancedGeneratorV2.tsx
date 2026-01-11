'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, Sparkles, Loader2, CheckCircle2, Zap, TrendingUp, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface EnhancedGeneratorV2Props {
    generatorId: string;
    title: string;
    description: string;
    quickPrompts?: string[];
    accentColor?: 'purple' | 'blue' | 'green' | 'orange';
}

const colorSchemes = {
    purple: {
        gradient: 'from-purple-500 to-pink-500',
        glow: 'shadow-purple-500/50',
        border: 'border-purple-500/20',
        hoverBorder: 'hover:border-purple-500/40',
        bg: 'bg-purple-500/10',
        hoverBg: 'hover:bg-purple-500/20',
        text: 'text-purple-400',
        lightText: 'text-purple-300',
    },
    blue: {
        gradient: 'from-blue-500 to-cyan-500',
        glow: 'shadow-blue-500/50',
        border: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/40',
        bg: 'bg-blue-500/10',
        hoverBg: 'hover:bg-blue-500/20',
        text: 'text-blue-400',
        lightText: 'text-blue-300',
    },
    green: {
        gradient: 'from-green-500 to-emerald-500',
        glow: 'shadow-green-500/50',
        border: 'border-green-500/20',
        hoverBorder: 'hover:border-green-500/40',
        bg: 'bg-green-500/10',
        hoverBg: 'hover:bg-green-500/20',
        text: 'text-green-400',
        lightText: 'text-green-300',
    },
    orange: {
        gradient: 'from-orange-500 to-red-500',
        glow: 'shadow-orange-500/50',
        border: 'border-orange-500/20',
        hoverBorder: 'hover:border-orange-500/40',
        bg: 'bg-orange-500/10',
        hoverBg: 'hover:bg-orange-500/20',
        text: 'text-orange-400',
        lightText: 'text-orange-300',
    },
};

export default function EnhancedGeneratorV2({
    generatorId,
    title,
    description,
    quickPrompts = [],
    accentColor = 'purple'
}: EnhancedGeneratorV2Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [totalGenerations, setTotalGenerations] = useState(0);
    const [avgResponseTime, setAvgResponseTime] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const colors = colorSchemes[accentColor];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const startTime = Date.now();
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
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
                                content: assistantMessage,
                                timestamp: new Date()
                            }];
                        }
                    });
                }

                // Update stats
                const responseTime = (Date.now() - startTime) / 1000;
                setTotalGenerations(prev => prev + 1);
                setAvgResponseTime(prev =>
                    prev === 0 ? responseTime : (prev + responseTime) / 2
                );
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            {/* Header with enhanced design */}
            <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <motion.div
                                className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg ${colors.glow}`}
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles className="w-7 h-7 text-white" />
                            </motion.div>
                            <div>
                                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                    {title}
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                    </motion.span>
                                </h1>
                                <p className={`text-sm ${colors.lightText} mt-1`}>{description}</p>
                            </div>
                        </div>

                        {/* Live stats badge */}
                        <motion.div
                            className="hidden md:flex items-center gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className={`px-4 py-2 rounded-full bg-black/40 border ${colors.border} backdrop-blur-sm`}>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-sm text-green-400 font-medium">Live</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Enhanced Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Start Card */}
                        <motion.div
                            className={`bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl p-6 shadow-2xl`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Sparkles className={`w-5 h-5 ${colors.text}`} />
                                Quick Start
                            </h2>
                            <div className="space-y-2">
                                {quickPrompts.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleQuickPrompt(prompt)}
                                        className={`w-full text-left p-3 rounded-lg ${colors.bg} ${colors.hoverBg} border ${colors.border} ${colors.hoverBorder} transition-all text-sm ${colors.lightText} hover:text-white group relative overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        <span className="relative z-10">{prompt}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Stats Card */}
                        <motion.div
                            className={`bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl p-6 shadow-2xl`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className={`w-5 h-5 ${colors.text}`} />
                                Performance
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    className={`text-center p-4 rounded-xl ${colors.bg} border ${colors.border}`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Star className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                                    <div className={`text-3xl font-bold ${colors.text}`}>
                                        {totalGenerations}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Generated</div>
                                </motion.div>
                                <motion.div
                                    className={`text-center p-4 rounded-xl ${colors.bg} border ${colors.border}`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Clock className={`w-6 h-6 ${colors.text} mx-auto mb-2`} />
                                    <div className={`text-3xl font-bold ${colors.text}`}>
                                        {avgResponseTime > 0 ? `${avgResponseTime.toFixed(1)}s` : '< 1s'}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Avg Time</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Enhanced Chat Area */}
                    <div className="lg:col-span-2">
                        <motion.div
                            className={`bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-16rem)] shadow-2xl`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >

                            {/* Messages with enhanced styling */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                <AnimatePresence mode="popLayout">
                                    {messages.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-center py-16"
                                        >
                                            <motion.div
                                                className={`inline-flex p-6 rounded-full bg-gradient-to-br ${colors.gradient} mb-6 shadow-lg ${colors.glow}`}
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 5, -5, 0]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <Sparkles className="w-16 h-16 text-white" />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                Ready to Create Magic
                                            </h3>
                                            <p className={`${colors.lightText} max-w-md mx-auto text-lg`}>
                                                Choose a quick start or type your own prompt to begin
                                            </p>
                                        </motion.div>
                                    )}

                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                            transition={{
                                                delay: index * 0.05,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 20
                                            }}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${message.role === 'user'
                                                        ? `bg-gradient-to-br ${colors.gradient} text-white ${colors.glow}`
                                                        : `bg-slate-800/50 border ${colors.border} text-purple-100`
                                                    }`}
                                            >
                                                <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                                                <div className="text-xs opacity-50 mt-2">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className={`bg-slate-800/50 border ${colors.border} rounded-2xl p-4`}>
                                                <div className={`flex items-center gap-3 ${colors.lightText}`}>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span className="text-sm font-medium">Generating magic...</span>
                                                    <div className="flex gap-1">
                                                        <motion.div
                                                            className={`w-2 h-2 ${colors.bg} rounded-full`}
                                                            animate={{ scale: [1, 1.5, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                        />
                                                        <motion.div
                                                            className={`w-2 h-2 ${colors.bg} rounded-full`}
                                                            animate={{ scale: [1, 1.5, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                        />
                                                        <motion.div
                                                            className={`w-2 h-2 ${colors.bg} rounded-full`}
                                                            animate={{ scale: [1, 1.5, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                        />
                                                    </div>
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
                                            <p className="text-red-400 text-sm font-medium">Error: {error}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Enhanced Action Buttons */}
                            {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
                                <motion.div
                                    className={`border-t ${colors.border} p-4 bg-black/20`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCopy}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colors.bg} ${colors.hoverBg} border ${colors.border} ${colors.hoverBorder} ${colors.lightText} hover:text-white transition-all shadow-lg`}
                                        >
                                            {copied ? (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Copy</span>
                                                </>
                                            )}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleDownload}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colors.bg} ${colors.hoverBg} border ${colors.border} ${colors.hoverBorder} ${colors.lightText} hover:text-white transition-all shadow-lg`}
                                        >
                                            <Download className="w-4 h-4" />
                                            <span className="text-sm font-medium">Download</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Enhanced Input Area */}
                            <div className={`border-t ${colors.border} p-4 bg-black/20`}>
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={`Message ${title}...`}
                                        disabled={isLoading}
                                        className={`flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border ${colors.border} focus:${colors.hoverBorder} focus:outline-none focus:ring-2 focus:ring-${accentColor}-500/20 text-white placeholder-gray-400 disabled:opacity-50 transition-all`}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className={`px-6 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} hover:shadow-lg ${colors.glow} text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Send className="w-5 h-5" />
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
        </div>
    );
}
