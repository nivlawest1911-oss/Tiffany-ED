'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, Copy, Check, Sparkles, Download, ArrowRight, Bot, Zap, History, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface EnhancedGeneratorProps {
    generatorId: string;
    generatorName: string;
    generatorColor: string;
    iconNode: React.ReactNode;
    prompts: string[];
    heroImage?: string;
}

import { useAuth } from '@/context/AuthContext';

export default function EnhancedGenerator({
    generatorId,
    generatorName,
    generatorColor,
    iconNode,
    prompts,
    heroImage
}: EnhancedGeneratorProps) {
    // ... (rest of hook logic is unchanged)
    const { user, isLoading: isAuthLoading } = useAuth();
    const [input, setInput] = useState('');
    const [completion, setCompletion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [errorMsg, setErrorMsg] = useState('');

    // Auto-scroll to bottom of output when generating
    useEffect(() => {
        if (isLoading && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [completion, isLoading]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setErrorMsg('');

        if (!user) {
            setErrorMsg('Authentication required. Please Sign In to access this Sovereign Protocol.');
            return;
        }

        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setCompletion('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    generatorId,
                    stream: true
                })
            });

            if (response.status === 402) {
                const data = await response.json();
                throw new Error(data.message || 'Free Limit Reached');
            }

            if (!response.ok) throw new Error('Generation failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const text = decoder.decode(value);
                    setCompletion(prev => prev + text);
                }
            }
        } catch (error: any) {
            console.error('Generation error:', error);
            setErrorMsg(error.message || 'Generation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (completion) {
            await navigator.clipboard.writeText(completion);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (completion) {
            const blob = new Blob([completion], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${generatorId}-${new Date().toISOString().split('T')[0]}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Header Navigation */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <nav className="flex items-center gap-2 text-sm text-zinc-500">
                        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/generators" className="hover:text-zinc-300 transition-colors">Generators</Link>
                        <span>/</span>
                        <span className="text-zinc-300">{generatorName}</span>
                    </nav>
                </div>

                <div className="grid lg:grid-cols-[1fr,400px] gap-8">
                    {/* LEFT COLUMN: Main Interface */}
                    <div className="space-y-6">
                        {/* Title Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group min-h-[200px] flex items-center"
                        >
                            {heroImage && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={heroImage}
                                        alt={`${generatorName} Background`}
                                        fill
                                        className="object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
                                </div>
                            )}

                            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${generatorColor} z-0`} />

                            <div className="relative z-10 flex items-start gap-6">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${generatorColor} shadow-lg shadow-indigo-500/20 ring-1 ring-white/10`}>
                                    {iconNode}
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-bold tracking-tight font-sans text-white drop-shadow-md">
                                        {generatorName}
                                    </h1>
                                    <p className="text-zinc-300 max-w-xl font-medium drop-shadow-sm">
                                        Powered by Sovereign AI • Specialized for Educational Leadership
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Input Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            {errorMsg && (
                                <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur-sm"></div>
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={user ? `Describe what you need from ${generatorName}...` : "Please Sign In to Initialize Protocol..."}
                                        className="relative w-full h-40 bg-zinc-950 border border-white/10 rounded-xl p-5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none leading-relaxed transition-all"
                                        disabled={isLoading || !user}
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded-md border border-white/5">
                                        {input.length} chars
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="relative inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                GENERATING...
                                            </>
                                        ) : !user ? (
                                            <>
                                                <Zap className="w-4 h-4 text-zinc-400" />
                                                SIGN IN REQUIRED
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                                GENERATE SCRIPT
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Output Area */}
                        <AnimatePresence>
                            {(completion || isLoading) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
                                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                                            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                                                <Bot className="w-4 h-4" />
                                                <span>AI Output</span>
                                            </div>
                                            {completion && !isLoading && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={handleCopy}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                        title="Copy to clipboard"
                                                    >
                                                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={handleDownload}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                        title="Download text file"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-8">
                                            {isLoading && !completion ? (
                                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-zinc-500 animate-pulse">Analyzing context and generating response...</p>
                                                </div>
                                            ) : (
                                                <div className="prose prose-invert prose-lg max-w-none">
                                                    <div className="whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed">
                                                        {completion}
                                                    </div>
                                                    <div ref={messagesEndRef} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Prompts Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-zinc-400 uppercase tracking-wider">
                                <Zap className="w-4 h-4" />
                                Quick Start
                            </div>
                            <div className="grid gap-3">
                                {prompts.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickPrompt(prompt)}
                                        className="group text-left p-4 rounded-xl bg-white/5 hover:bg-indigo-600/10 border border-white/5 hover:border-indigo-500/30 transition-all active:scale-[0.98]"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-sm text-zinc-300 group-hover:text-indigo-200 transition-colors line-clamp-2">
                                                {prompt}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Usage / Stats (Placeholder) */}
                        {/* Recent Usage / Stats */}
                        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">
                                <History className="w-4 h-4" />
                                Protocol Status
                            </div>
                            <div className="text-center py-4">
                                {user ? (
                                    <div className="space-y-2">
                                        <p className="text-zinc-300 font-medium">Access Level: <span className="text-indigo-400 uppercase">{user.tier}</span></p>
                                        {user.tier === 'free' && (
                                            <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2 overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                                                    style={{ width: `${Math.min(((user.usage_count || 0) / 5) * 100, 100)}%` }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xs text-zinc-500 mt-2">
                                            <span>Protocol Active</span>
                                            {user.tier === 'free' && <span>{(user.usage_count || 0)}/5 Credits</span>}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-zinc-500 text-sm">Sign In to view activity</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
