'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Brain, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

const AGENTS = [
    { id: 'curriculum', name: 'Curriculum Architect', role: 'Instructional Design', avatar: '/images/avatars/curriculum.png', color: 'bg-emerald-500' },
    { id: 'feedback', name: 'Feedback Sentinel', role: 'Quality Assurance', avatar: '/images/avatars/feedback.png', color: 'bg-rose-500' },
    { id: 'compliance', name: 'Compliance Officer', role: 'FERPA/Policy', avatar: '/images/avatars/compliance.png', color: 'bg-blue-500' },
];

export default function AgenticOrchestrationPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'agent', agentId?: string, content: string }[]>([
        { role: 'agent', agentId: 'curriculum', content: 'Protocol Initialized. EdIntel Curriculum Architect ready for collaborative design. What is the instructional objective?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
        setInputValue('');
        setIsThinking(true);

        // Simulation of Agentic Workflow
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'agent', agentId: 'curriculum', content: `Analyzing objective: "${inputValue}". Constructing pedagogical framework...` }]);
        }, 1000);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'agent', agentId: 'feedback', content: `Monitoring alignment. Suggestion: Ensure modification strategies for diverse learners are explicitly defined.` }]);
            setIsThinking(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-black p-6 md:p-12 font-sans selection:bg-purple-500/30">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15)_0%,transparent_50%)] pointer-events-none" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-6rem)]">

                {/* Left Panel: Digital Team */}
                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Digital<br /><span className="text-purple-500">Teams</span></h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Orchestration Layer v2.0</p>
                    </div>

                    <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl p-4 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 ml-2">Active Protocol</h3>
                        <div className="space-y-4">
                            {AGENTS.map(agent => (
                                <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${agent.color}/20 border border-white/10 relative`}>
                                        <Bot className={`w-5 h-5 text-white`} />
                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${agent.color} border-2 border-black`} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{agent.name}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{agent.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 ml-2">Workflow State</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-xs text-emerald-400">
                                    <CheckCircle2 className="w-3 h-3" /> <span>Analysis Phase</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-600">
                                    <RefreshCw className="w-3 h-3 animate-spin" /> <span>Drafting Content</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-600">
                                    <div className="w-3 h-3 rounded-full border border-zinc-600" /> <span>Compliance Review</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Panel: Orchestration Canvas (Chat) */}
                <Card className="lg:col-span-3 bg-zinc-900/50 border-white/10 backdrop-blur-xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500" />

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 p-8">
                        <div className="space-y-8">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    {msg.role === 'agent' ? (
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 border border-white/10 shrink-0`}>
                                            <Bot className="w-5 h-5 text-purple-400" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 border border-white/10 shrink-0">
                                            <User className="w-5 h-5 text-emerald-400" />
                                        </div>
                                    )}

                                    <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                                {msg.role === 'user' ? 'Direct Command' : AGENTS.find(a => a.id === msg.agentId)?.name || 'System'}
                                            </span>
                                            <span className="text-[9px] text-zinc-600 font-mono">
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-tr-sm'
                                                : 'bg-white/5 border border-white/10 text-zinc-300 rounded-tl-sm'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 border border-white/10 shrink-0`}>
                                        <Bot className="w-5 h-5 text-zinc-500 animate-pulse" />
                                    </div>
                                    <div className="h-10 flex items-center">
                                        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest animate-pulse">Orchestrating Logic...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-6 bg-black/40 border-t border-white/5">
                        <div className="flex gap-4">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Issue command to digital team..."
                                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-purple-500/50 h-14 rounded-xl px-6 font-medium"
                            />
                            <Button
                                onClick={handleSend}
                                className="h-14 w-14 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="flex justify-between items-center mt-4 px-2">
                            <div className="flex gap-4">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white flex items-center gap-2 transition-colors">
                                    <Brain className="w-3 h-3" /> Add Context
                                </button>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white flex items-center gap-2 transition-colors">
                                    <FileText className="w-3 h-3" /> Upload Brief
                                </button>
                            </div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                                Secure Channel // End-to-End Encrypted
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
