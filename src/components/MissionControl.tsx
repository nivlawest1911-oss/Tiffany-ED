'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Eye, Target, User, Activity, Zap, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    role: string;
    status: 'idle' | 'running' | 'completed' | 'waiting';
    currentTask: string;
    thoughtLog: Array<{ timestamp: string; message: string }>;
    tokensUsed: number;
    lastActive: string;
    icon: any;
    color: string;
}

export default function MissionControl() {
    const [agents, setAgents] = useState<Agent[]>([
        {
            id: 'observer',
            name: 'The Observer',
            role: 'Vision Analysis',
            status: 'running',
            currentTask: 'Scanning classroom videos for engagement patterns',
            thoughtLog: [
                { timestamp: new Date().toISOString(), message: 'Analyzing video feed from Room 204...' },
                { timestamp: new Date().toISOString(), message: 'Detected 3 students showing low engagement' },
                { timestamp: new Date().toISOString(), message: 'Cross-referencing with historical data...' }
            ],
            tokensUsed: 1247,
            lastActive: new Date().toISOString(),
            icon: Eye,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'analyst',
            name: 'The Analyst',
            role: 'Pattern Recognition',
            status: 'running',
            currentTask: 'Finding invisible patterns in IEP data',
            thoughtLog: [
                { timestamp: new Date().toISOString(), message: 'Querying Vercel Postgres for student history...' },
                { timestamp: new Date().toISOString(), message: 'Pattern detected: Student X struggles on Tuesdays' },
                { timestamp: new Date().toISOString(), message: 'Correlation: Post-lunch timing affects performance' }
            ],
            tokensUsed: 2891,
            lastActive: new Date().toISOString(),
            icon: Brain,
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'strategist',
            name: 'The Strategist',
            role: 'Intervention Planning',
            status: 'waiting',
            currentTask: 'Awaiting analyst findings to draft intervention plan',
            thoughtLog: [
                { timestamp: new Date().toISOString(), message: 'Standing by for pattern analysis...' },
                { timestamp: new Date().toISOString(), message: 'Preparing evidence-based intervention templates' }
            ],
            tokensUsed: 456,
            lastActive: new Date().toISOString(),
            icon: Target,
            color: 'from-emerald-500 to-teal-500'
        },
        {
            id: 'avatar',
            name: 'Dr. Alvin West',
            role: '4K Neural Avatar',
            status: 'idle',
            currentTask: 'Ready to deliver personalized briefing',
            thoughtLog: [
                { timestamp: new Date().toISOString(), message: 'Avatar systems online' },
                { timestamp: new Date().toISOString(), message: 'Voice synthesis ready (ElevenLabs Turbo v2.5)' },
                { timestamp: new Date().toISOString(), message: 'Awaiting strategic briefing from Strategist...' }
            ],
            tokensUsed: 0,
            lastActive: new Date().toISOString(),
            icon: User,
            color: 'from-amber-500 to-orange-500'
        }
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'running': return 'bg-green-500 text-green-100 animate-pulse';
            case 'completed': return 'bg-blue-500 text-blue-100';
            case 'waiting': return 'bg-amber-500 text-amber-100';
            default: return 'bg-slate-500 text-slate-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'running': return <Activity className="w-3 h-3 animate-spin" />;
            case 'completed': return <CheckCircle className="w-3 h-3" />;
            case 'waiting': return <Clock className="w-3 h-3" />;
            default: return <AlertCircle className="w-3 h-3" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <Zap className="w-10 h-10 text-amber-500" />
                            MISSION CONTROL
                        </h1>
                        <p className="text-purple-300">Sovereign Multi-Agent Swarm • EdIntel Professional</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">
                        <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">System Status</div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-white font-bold">OPERATIONAL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Agent Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {agents.map((agent, index) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
                    >
                        {/* Agent Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} p-0.5`}>
                                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                        <agent.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                                    <p className="text-sm text-zinc-400">{agent.role}</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${getStatusColor(agent.status)}`}>
                                {getStatusIcon(agent.status)}
                                {agent.status.toUpperCase()}
                            </div>
                        </div>

                        {/* Current Task */}
                        <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Current Task</div>
                            <p className="text-sm text-white">{agent.currentTask}</p>
                        </div>

                        {/* Thought Log */}
                        <div className="bg-slate-900 rounded-xl p-4 h-48 overflow-y-auto mb-4">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Neural Thought Log</div>
                            <div className="space-y-2">
                                {agent.thoughtLog.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-xs font-mono"
                                    >
                                        <span className="text-cyan-400">&gt;</span>
                                        <span className="text-blue-300 ml-2">{log.message}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="text-zinc-500 uppercase tracking-wider">Tokens</span>
                                    <span className="text-white font-bold ml-2">{agent.tokensUsed.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-zinc-500 uppercase tracking-wider">Uptime</span>
                                    <span className="text-emerald-400 font-bold ml-2">99.9%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Kente Pattern Footer */}
            <div className="max-w-7xl mx-auto mt-8">
                <div className="h-2 rounded-full overflow-hidden flex">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 ${i % 4 === 0 ? 'bg-amber-500' :
                                    i % 4 === 1 ? 'bg-emerald-600' :
                                        i % 4 === 2 ? 'bg-rose-600' :
                                            'bg-black'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
