'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, AlertTriangle, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

// Agent Status Types
type AgentStatus = 'idle' | 'scanning' | 'thinking' | 'acting' | 'auditing';

interface CabinetAgent {
    id: string;
    role: string;
    name: string;
    status: AgentStatus;
    currentTask?: string;
    icon: React.ReactNode;
    color: string;
}

export default function ProfessionalCabinet() {
    // Simulated State for Agents
    const [agents, setAgents] = useState<CabinetAgent[]>([
        {
            id: 'lead',
            role: 'Lead Strategist',
            name: 'Marcus Aurelius',
            status: 'idle',
            currentTask: 'Awaiting strategic directive...',
            icon: <Users size={16} />,
            color: 'text-zinc-200 bg-white/10'
        },
        {
            id: 'audit',
            role: 'Compliance Auditor',
            name: 'Sarah Connors',
            status: 'auditing',
            currentTask: 'Scanning for AL Code 290-8-9 violations...',
            icon: <ShieldCheck size={16} />,
            color: 'text-indigo-400 bg-indigo-500/10'
        },
        {
            id: 'data',
            role: 'Innovation Architect',
            name: 'André State',
            status: 'idle',
            currentTask: 'Optimizing district agility...',
            icon: <Zap size={16} />,
            color: 'text-emerald-400 bg-emerald-500/10'
        },
        {
            id: 'arch',
            role: 'Professional Lead',
            name: 'Dr. Alvin West',
            status: 'idle',
            currentTask: 'District uplink synchronized.',
            icon: <Activity size={16} />,
            color: 'text-amber-400 bg-amber-500/10'
        }
    ]);

    // Simulate Agent Interactions
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly change statuses to make it feel alive
            setAgents(prev => prev.map(agent => {
                const roll = Math.random();
                if (roll > 0.7) {
                    if (agent.id === 'audit') {
                        return { ...agent, status: Math.random() > 0.5 ? 'auditing' : 'idle', currentTask: Math.random() > 0.5 ? 'Red Teaming recent IEP...' : 'Audit complete. No flags.' };
                    }
                    if (agent.id === 'lead') {
                        return { ...agent, status: Math.random() > 0.5 ? 'thinking' : 'idle', currentTask: Math.random() > 0.5 ? 'Delegating sub-tasks...' : 'Ready.' };
                    }
                }
                return agent;
            }));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: AgentStatus) => {
        switch (status) {
            case 'idle': return 'bg-zinc-700';
            case 'scanning': return 'bg-blue-500 animate-pulse';
            case 'thinking': return 'bg-purple-500 animate-pulse';
            case 'acting': return 'bg-emerald-500';
            case 'auditing': return 'bg-amber-500 animate-pulse';
            default: return 'bg-zinc-700';
        }
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 h-[300px] animate-pulse" />;
    }

    return (
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <Users className="w-32 h-32" />
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Zap size={18} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Professional Cabinet</h3>
                        <p className="text-[10px] text-zinc-400">Multi-Agent Orchestration Layer</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[9px] font-mono text-emerald-500">ONLINE</span>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <AnimatePresence>
                    {agents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center gap-4 hover:bg-black/40 transition-colors group"
                        >
                            <div className={`p-2 rounded-full ${agent.color}`}>
                                {agent.icon}
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">{agent.role}</h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.status)}`} />
                                        <span className="text-[9px] font-mono text-zinc-500 uppercase">{agent.status}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-zinc-500 truncate font-mono">
                                    {agent.status === 'auditing' ? (
                                        <span className="text-amber-500">{agent.currentTask}</span>
                                    ) : (
                                        agent.currentTask
                                    )}
                                </p>
                            </div>

                            {agent.status !== 'idle' && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5"
                                >
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Handoff Visualizer Line */}
            <div className="mt-4 flex justify-between px-6 opacity-30">
                {agents.map((_, i) => (
                    <div key={i} className="w-px h-4 bg-gradient-to-b from-white to-transparent" />
                ))}
            </div>
        </div>
    );
}
