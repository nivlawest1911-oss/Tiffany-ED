import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, MessageSquare, Send, X, Terminal, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AIAgentAvatar from './AIAgentAvatar';

export function SovereignDelegate() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [isThinking, setIsThinking] = useState(false);

    const handleSend = async () => {
        if (!chatInput.trim()) return;

        const userMsg = { role: 'user' as const, content: chatInput };
        setMessages(prev => [...prev, userMsg]);
        setChatInput('');
        setIsThinking(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    protocolContext: 'Sovereign Delegate Dashboard Interface'
                })
            });

            if (!response.ok) throw new Error('Neural Link Severed');

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No stream');

            let assistantContent = '';
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = new TextDecoder().decode(value);
                assistantContent += chunk;
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    return [...prev.slice(0, -1), { ...last, content: assistantContent }];
                });
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection Interrupted. Neural safeguards active.' }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Avatar Viewport */}
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <AIAgentAvatar
                                textToSpeak={messages.findLast(m => m.role === 'assistant')?.content || ""}
                                className="w-full h-full"
                            />

                            {/* Overlay UI */}
                            <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Sovereign Node #001</span>
                            </div>

                            <button
                                onClick={() => setIsChatOpen(!isChatOpen)}
                                title="Open Intelligence Interface"
                                aria-label="Open Intelligence Interface"
                                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-blue-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all group/btn"
                            >
                                <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Interface & Stats */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">GENESIS PROTOCOL ACTIVE</Badge>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Sovereign OS</span> Delegate
                            </h2>
                            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                                Your autonomous executive extension. Trained on district policy, legislative statutes, and your unique leadership rhetoric.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Shield, title: 'Compliance', val: '99.9%', color: 'text-blue-400' },
                                { icon: Zap, title: 'Latency', val: '12ms', color: 'text-cyan-400' },
                                { icon: Globe, title: 'Network', val: 'Secure', color: 'text-indigo-400' },
                                { icon: Cpu, title: 'Neural Core', val: 'v1.5-Pro', color: 'text-purple-400' }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.title}</div>
                                    <div className="text-xl font-bold text-white mt-1">{stat.val}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button
                                onClick={() => setIsChatOpen(true)}
                                size="lg"
                                className="rounded-full px-8 bg-white text-black hover:bg-slate-200 font-black uppercase text-xs tracking-widest"
                            >
                                Initiate Tactical Uplink
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide-out Chat Panel */}
            <AnimatePresence>
                {isChatOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsChatOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 z-[110] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                                        <Terminal size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white uppercase text-xs tracking-widest">Neural Link: Activated</h3>
                                        <p className="text-[10px] text-slate-500 font-mono">ENCRYPTION: AES-256-GCM</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                                    <X size={20} />
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.length === 0 && (
                                    <div className="text-center py-20">
                                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                                            <Brain className="text-blue-400 w-8 h-8" />
                                        </div>
                                        <h4 className="text-white font-bold mb-2">Neural Synchronization Ready</h4>
                                        <p className="text-sm text-slate-500">Awaiting executive input for tactical analysis.</p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isThinking && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-white/10">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="relative"
                                >
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Command Sovereign Delegate..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        title="Send Command"
                                        aria-label="Send Command"
                                        disabled={!chatInput.trim() || isThinking}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-500 transition-colors"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                                <p className="text-[9px] text-center text-slate-600 mt-4 font-mono uppercase tracking-[0.2em]">
                                    Direct Neural Interface Protocol v4.0.2
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
