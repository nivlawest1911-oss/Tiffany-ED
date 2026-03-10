"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Send,
    Zap,
    Shield,
    FileText,
    MessageCircle,
    Brain,
    Bot,
    User,
    ChevronRight,
    Terminal
} from 'lucide-react';

import { oracleEngine, ReasoningStep, StrategicForecast } from '@/lib/OracleEngine';
import { toast } from 'sonner';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    reasoning?: ReasoningStep[];
    forecast?: StrategicForecast;
    directiveId?: string;
}

export const OracleInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Institutional memory layer active. How can I assist with your strategic objectives today?' }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [activeReasoning, setActiveReasoning] = useState<ReasoningStep[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking, activeReasoning]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsThinking(true);

        // Chain of Thought simulation
        const steps = await oracleEngine.simulateReasoning(userMsg);
        for (let i = 0; i < steps.length; i++) {
            setActiveReasoning(prev => [...prev, steps[i]]);
            await new Promise(r => setTimeout(r, 600));
        }

        const forecast = oracleEngine.getStrategicForecast(userMsg);
        const directiveId = oracleEngine.generateDirectiveId();

        setMessages(prev => [...prev, {
            role: 'assistant',
            content: forecast.logic,
            reasoning: steps,
            forecast,
            directiveId
        }]);

        setIsThinking(false);
        setActiveReasoning([]);
    };

    const handleExport = async (msg: Message) => {
        if (!msg.directiveId || !msg.forecast) return;

        toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
            loading: 'Securing Strategic Directive in Ledger...',
            success: () => `Directive Secured: ${msg.directiveId}`,
            error: 'Uplink failure during cryptographic signature.',
        });

        // In a real scenario, we would call logOracleInsight here
        console.log("Logged strategic directive to Ledger:", msg.directiveId);
    };

    return (
        <div className="flex-1 flex flex-col max-h-screen">
            {/* Header omitted for brevity in chunk but exists in file */}
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 relative">
                        <Cpu className="w-6 h-6 text-purple-400" />
                        <div className="absolute inset-0 bg-purple-400/20 blur-xl rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                            Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Oracle</span>
                        </h1>
                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Deep Strategic Reasoning Layer</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {[
                        { label: 'Latency', value: '42ms', icon: Zap },
                        { label: 'Memory', value: '8.4TB', icon: Brain },
                        { label: 'Context', value: '1M Tokens', icon: Terminal }
                    ].map((stat) => (
                        <div key={stat.label} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                            <stat.icon size={10} className="text-purple-500" />
                            <span className="text-[10px] font-black uppercase text-zinc-500">{stat.label}:</span>
                            <span className="text-[10px] font-bold text-white">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto mb-6 space-y-6 pr-4 custom-scrollbar"
            >
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'assistant'
                                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                                    }`}>
                                    {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                                </div>
                                <div className={`p-5 rounded-2xl relative ${msg.role === 'assistant'
                                    ? 'bg-white/5 border border-white/5 text-zinc-300'
                                    : 'bg-purple-600 text-white font-medium shadow-lg shadow-purple-900/20'
                                    }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                                    {msg.forecast && (
                                        <div className="mt-4 p-4 bg-black/40 border border-white/5 rounded-xl space-y-3">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-purple-400">
                                                <span>Strategic Projection</span>
                                                <span>Confidence: {msg.forecast.confidence * 100}%</span>
                                            </div>
                                            <div className="flex items-end gap-4">
                                                <div className="flex-1">
                                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${msg.forecast.projected}%` }}
                                                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-xl font-black text-white">{msg.forecast.projected}%</div>
                                            </div>
                                            <button
                                                title="Commit Directive to Ledger"
                                                onClick={() => handleExport(msg)}
                                                className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-purple-300 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Shield size={12} />
                                                Commit Directive to Ledger
                                            </button>
                                        </div>
                                    )}

                                    {msg.role === 'assistant' && (
                                        <div className="absolute top-0 right-0 p-2 opacity-10">
                                            <Cpu size={24} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isThinking && (
                        <div className="space-y-4">
                            {activeReasoning.map((step) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex justify-start pl-12"
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                            <span className="text-purple-400">{step.node}:</span> {step.action}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="flex gap-4 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-purple-500/10 border-purple-500/20 text-purple-400">
                                        <Bot size={16} />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-zinc-500 italic text-sm flex items-center gap-2">
                                        Deep Synthesis in progress...
                                        <div className="flex gap-1">
                                            <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce [animation-delay:0ms]" />
                                            <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce [animation-delay:150ms]" />
                                            <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="relative">
                <div className="absolute inset-0 bg-purple-500/5 blur-2xl rounded-full opacity-50" />
                <div className="relative flex items-center gap-4 p-2 bg-zinc-900 border border-white/10 rounded-2xl focus-within:border-purple-500/50 transition-all shadow-xl">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-zinc-500">
                        <MessageCircle size={20} />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Inquire deep institutional knowledge..."
                        className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-zinc-600 font-medium"
                    />
                    <button
                        title="Send Inquiry"
                        onClick={handleSend}
                        disabled={!input.trim() || isThinking}
                        className="p-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white rounded-xl transition-all shadow-lg shadow-purple-950/20"
                    >
                        <Send size={20} />
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-6 px-4">
                    {[
                        { label: 'Query Node', icon: ChevronRight },
                        { label: 'Ground Context', icon: Shield },
                        { label: 'Export Directive', icon: FileText }
                    ].map((action) => (
                        <button key={action.label} className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-600 hover:text-purple-400 transition-colors">
                            <action.icon size={10} />
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
