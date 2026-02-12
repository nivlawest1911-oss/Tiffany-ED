'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Brain, FileText, CheckCircle2, RefreshCw, Sparkles, Image as ImageIcon, Target } from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';
import { useEffect } from 'react';

const AGENTS = [
    { id: 'iep', name: 'IEP Architect', role: 'Legal-Compliant Goals', avatar: '/images/avatars/iep.png', color: 'bg-indigo-500' },
    { id: 'lesson', name: 'Lesson Wizard', role: '5-Day Curriculum', avatar: '/images/avatars/lesson.png', color: 'bg-cyan-500' },
    { id: 'visual', name: 'Visual Lab', role: 'Generative Assets', avatar: '/images/avatars/visual.png', color: 'bg-pink-500' },
];

export default function AgentsClient() {
    const { triggerBriefing } = useIntelligence();
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'agent', agentId?: string, content: string, timestamp?: string }[]>([
        { role: 'agent', agentId: 'iep', content: 'IEP Architect Online. Ready to construct legal-compliant goals aligned with Alabama State Standards.', timestamp: '09:00 AM' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [activeAgent, setActiveAgent] = useState('iep');

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAgentSelect = (agentId: string) => {
        setActiveAgent(agentId);
        const agent = AGENTS.find(a => a.id === agentId);
        if (agent) {
            triggerBriefing(agent.name);
        }
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [...prev, { role: 'user', content: inputValue, timestamp }]);
        setInputValue('');
        setIsThinking(true);

        const currentAgent = AGENTS.find(a => a.id === activeAgent);

        // Simulation of Agentic Workflow
        setTimeout(() => {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages(prev => [...prev, { role: 'agent', agentId: activeAgent, content: `Processing request via ${currentAgent?.name} node...`, timestamp }]);
        }, 800);

        setTimeout(() => {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages(prev => [...prev, { role: 'agent', agentId: activeAgent, content: `Drafting content based on Mobile County parameters. Visualizing output...`, timestamp }]);
            setIsThinking(false);
        }, 2500);
    };

    return (
        <div className="font-sans font-inter h-[calc(100vh-2rem)]">
            <div className="max-w-[1600px] mx-auto h-full grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Panel: Agent Selection */}
                <div className="lg:col-span-1 space-y-6 h-full flex flex-col">
                    <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">CogniFit Workspace</span>
                            </div>
                            <button
                                onClick={() => triggerBriefing('Legacy Profile')}
                                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all group shrink-0"
                            >
                                <Target size={12} className="group-hover:rotate-45 transition-transform" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Founder Hub</span>
                            </button>
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Agent <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Studio</span></h1>
                    </div>

                    <div className="bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-3xl p-4 overflow-hidden relative shadow-2xl flex-1 flex flex-col">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
                        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 ml-2">Select Neural Node</h3>
                        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                            {AGENTS.map(agent => (
                                <button
                                    key={agent.id}
                                    onClick={() => handleAgentSelect(agent.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${activeAgent === agent.id
                                        ? 'bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${agent.color}/10 border border-white/10 relative group-hover:scale-110 transition-transform`}>
                                        {agent.id === 'visual' ? <ImageIcon className={`w-5 h-5 text-white`} /> : <Bot className={`w-5 h-5 text-white`} />}
                                        <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full ${agent.color} border-2 border-[#020617] shadow-[0_0_5px_currentColor]`} />
                                    </div>
                                    <div className="text-left">
                                        <div className={`text-sm font-bold transition-colors ${activeAgent === agent.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{agent.name}</div>
                                        <div className="text-[9px] text-slate-600 uppercase tracking-wider font-bold group-hover:text-slate-500">{agent.role}</div>
                                    </div>
                                    {activeAgent === agent.id && (
                                        <motion.div layoutId="active-agent" className="absolute right-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 ml-2">System Status</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium bg-cyan-950/20 p-2 rounded-lg border border-cyan-500/10">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> <span>Neural Core: Online</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-indigo-400 font-medium bg-indigo-950/20 p-2 rounded-lg border border-indigo-500/10">
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> <span>Context Window: 128k</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Panel: Orchestration Canvas (Chat) */}
                <div className="lg:col-span-3 bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] flex flex-col relative overflow-hidden shadow-2xl h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 opacity-50" />

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 p-8 sm:p-10">
                        <div className="space-y-10 max-w-4xl mx-auto">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    {msg.role === 'agent' ? (
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)]`}>
                                            <Bot className="w-6 h-6 text-indigo-400" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                            <User className="w-6 h-6 text-cyan-400" />
                                        </div>
                                    )}

                                    <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {msg.role === 'user' ? 'Operator' : AGENTS.find(a => a.id === msg.agentId)?.name || 'System Node'}
                                            </span>
                                            <span className="text-[9px] text-slate-700 font-mono font-bold">
                                                {mounted ? msg.timestamp : '--:--'}
                                            </span>
                                        </div>
                                        <div className={`p-6 rounded-3xl text-sm leading-relaxed shadow-lg backdrop-blur-md ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-cyan-950/50 to-indigo-900/50 border border-cyan-500/20 text-cyan-50 rounded-tr-sm'
                                            : 'bg-white/[0.03] border border-white/10 text-slate-300 rounded-tl-sm'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6 max-w-4xl mx-auto">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 shrink-0`}>
                                        <Bot className="w-6 h-6 text-indigo-500 animate-pulse" />
                                    </div>
                                    <div className="h-12 flex items-center">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">Orchestrating Logic...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-6 md:p-8 bg-black/20 border-t border-white/5 backdrop-blur-xl">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    // onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Disabled plain enter to encourage usage of button or specific action
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                    placeholder={`Issue command to ${AGENTS.find(a => a.id === activeAgent)?.name || 'Agent'}...`}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500/50 h-16 rounded-2xl px-6 pr-20 font-medium shadow-inner text-base tracking-wide"
                                />
                                <div className="absolute right-2 top-2 bottom-2">
                                    <Button
                                        onClick={handleSend}
                                        className="h-full aspect-square rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-6 px-2">
                                <div className="flex gap-6">
                                    <button className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 flex items-center gap-2 transition-colors group">
                                        <Brain className="w-3 h-3 group-hover:text-cyan-400 transition-colors" /> Add Context
                                    </button>
                                    <button className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 flex items-center gap-2 transition-colors group">
                                        <FileText className="w-3 h-3 group-hover:text-cyan-400 transition-colors" /> Upload Brief
                                    </button>
                                </div>
                                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-500/40">
                                    Quantum Encrypted // Mobile County Node
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
