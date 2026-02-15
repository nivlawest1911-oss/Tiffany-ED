'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Scale, BookOpen, Loader2, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

// Types for the swarm response
interface AgentResponse {
    agent: string;
    analysis: any;
    error?: string;
}

interface SwarmIntelligenceDisplayProps {
    synthesis: string;
    agentResponses: AgentResponse[];
}

export function SwarmIntelligenceDisplay({ synthesis, agentResponses }: SwarmIntelligenceDisplayProps) {
    const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
    const [showSynthesis, setShowSynthesis] = useState(false);

    // Staggered reveal effect
    useEffect(() => {
        const timer = setTimeout(() => setShowSynthesis(true), 1500); // Wait for "agents" to "report"
        return () => clearTimeout(timer);
    }, []);

    const getAgentIcon = (agent: string) => {
        switch (agent) {
            case 'literacy': return <BookOpen className="w-4 h-4 text-cyan-400" />;
            case 'wellness': return <Heart className="w-4 h-4 text-rose-400" />;
            case 'policy': return <Scale className="w-4 h-4 text-noble-gold" />;
            default: return <Brain className="w-4 h-4 text-purple-400" />;
        }
    };

    const getAgentColor = (agent: string) => {
        switch (agent) {
            case 'literacy': return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
            case 'wellness': return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
            case 'policy': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'; // distinct from noble-gold for better contrast 
            default: return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
        }
    };

    return (
        <div className="w-full space-y-6 font-sans">
            {/* 1. Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {agentResponses.map((response, idx) => (
                    <motion.div
                        key={response.agent}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        onClick={() => setExpandedAgent(expandedAgent === response.agent ? null : response.agent)}
                        className={`
                            relative cursor-pointer group overflow-hidden rounded-xl border p-4 transition-all hover:scale-[1.02]
                            ${getAgentColor(response.agent)}
                            ${expandedAgent === response.agent ? 'ring-1 ring-white/20' : ''}
                        `}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-black/20 backdrop-blur-sm">
                                    {getAgentIcon(response.agent)}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-90">
                                    {response.agent} Check
                                </span>
                            </div>
                            {response.error ? (
                                <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
                            ) : (
                                <CheckCircle2 className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                            )}
                        </div>

                        {/* Summary / Pulse */}
                        <div className="space-y-1">
                            {response.error ? (
                                <p className="text-[10px] text-red-400 font-medium">Protocol Failure</p>
                            ) : (
                                <div className="text-[10px] font-medium opacity-80 line-clamp-2">
                                    {/* Simply showing the first key-value pair as a preview */}
                                    {Object.entries(response.analysis || {})[0]?.[1] as string}
                                </div>
                            )}
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                            {expandedAgent === response.agent && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-3 pt-3 border-t border-black/10 dark:border-white/10"
                                >
                                    <pre className="text-[9px] font-mono whitespace-pre-wrap opacity-70">
                                        {JSON.stringify(response.analysis, null, 2)}
                                    </pre>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* 2. Synthesis Stream */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showSynthesis ? 1 : 0 }}
                className="relative pl-6 border-l-2 border-indigo-500/30"
            >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-950 border-2 border-indigo-500 flex items-center justify-center">
                    <Layers className="w-2 h-2 text-indigo-400" />
                </div>

                <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                        Swarm Synthesis
                    </span>
                    {!showSynthesis && <Loader2 className="w-3 h-3 animate-spin text-indigo-400/50" />}
                </div>

                <div className="text-sm leading-relaxed text-zinc-200">
                    <p>{synthesis}</p>
                </div>
            </motion.div>
        </div>
    );
}
