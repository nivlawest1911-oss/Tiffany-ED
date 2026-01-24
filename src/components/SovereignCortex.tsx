'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu, Database, Globe, Zap, Shield, Search,
    MessageSquare, Eye, Mic, Book, Cloud,
    BarChart3, Binary, HardDrive, Activity,
    Share2, Terminal, Layers, Video, Youtube,
    Film, Workflow
} from 'lucide-react';

interface NeuralNode {
    id: string;
    name: string;
    icon: any;
    status: 'active' | 'synced' | 'locked' | 'standby';
    category: 'Intelligence' | 'Data' | 'Infrastructure' | 'Outreach' | 'Media';
    load: number;
}

const NEURAL_NODES: NeuralNode[] = [
    // Intelligence Tier
    { id: 'vertex', name: 'Vertex AI Sovereign Core', icon: Cpu, status: 'active', category: 'Intelligence', load: 92 },
    { id: 'gemini', name: 'Gemini 2.0 architecture', icon: Workflow, status: 'active', category: 'Intelligence', load: 88 },
    { id: 'dialogflow', name: 'Dialogflow (Conversational)', icon: MessageSquare, status: 'synced', category: 'Intelligence', load: 12 },
    { id: 'vision', name: 'Vision Intelligence (OCR)', icon: Eye, status: 'active', category: 'Intelligence', load: 45 },
    { id: 'stt', name: 'Speech-to-Text Perception', icon: Mic, status: 'active', category: 'Intelligence', load: 24 },
    { id: 'dlp', name: 'Sensitive Data Protection', icon: Shield, status: 'synced', category: 'Intelligence', load: 9 },

    // Data Tier (Sovereign Memory)
    { id: 'supabase', name: 'Supabase Memory Core', icon: Database, status: 'active', category: 'Data', load: 24 },
    { id: 'bigquery', name: 'BigQuery Analytics Core', icon: BarChart3, status: 'active', category: 'Data', load: 65 },
    { id: 'sql', name: 'Google Cloud SQL', icon: Database, status: 'synced', category: 'Data', load: 31 },
    { id: 'storage', name: 'Sovereign Media Storage', icon: HardDrive, status: 'synced', category: 'Data', load: 58 },
    { id: 'dataplex', name: 'Cloud Dataplex Mesh', icon: Binary, status: 'standby', category: 'Data', load: 0 },

    // Infrastructure Tier (Gateway)
    { id: 'vercel', name: 'Vercel Edge Gateway', icon: Zap, status: 'active', category: 'Infrastructure', load: 15 },
    { id: 'compute', name: 'Compute Engine Clusters', icon: Zap, status: 'synced', category: 'Infrastructure', load: 72 },
    { id: 'gke', name: 'Kubernetes Engine (GKE)', icon: Layers, status: 'active', category: 'Infrastructure', load: 45 },
    { id: 'run', name: 'Cloud Run (Serverless)', icon: Cloud, status: 'active', category: 'Infrastructure', load: 12 },
    { id: 'dns', name: 'Cloud DNS Matrix', icon: Globe, status: 'synced', category: 'Infrastructure', load: 5 },
    { id: 'logging', name: 'Cloud Logging & Ops', icon: Terminal, status: 'active', category: 'Infrastructure', load: 94 },

    // Media & Video Tier
    { id: 'transcoder', name: 'Cloud Video Transcoder', icon: Film, status: 'active', category: 'Media', load: 34 },
    { id: 'youtube_data', name: 'YouTube Data Protocol', icon: Youtube, status: 'synced', category: 'Media', load: 15 },
    { id: 'youtube_analytics', name: 'YouTube Strategic Growth', icon: Activity, status: 'synced', category: 'Media', load: 8 },
    { id: 'meet', name: 'Google Meet Bridge', icon: Video, status: 'standby', category: 'Media', load: 0 },

    // Outreach & Compliance Tier
    { id: 'classroom', name: 'Google Classroom LMS', icon: Book, status: 'active', category: 'Outreach', load: 55 },
    { id: 'workspace', name: 'Workspace (Drive/Sheets)', icon: HardDrive, status: 'synced', category: 'Outreach', load: 38 },
    { id: 'gmail', name: 'Gmail Secure Comms', icon: Globe, status: 'synced', category: 'Outreach', load: 22 },
    { id: 'checks', name: 'Checks Compliance API', icon: Shield, status: 'synced', category: 'Outreach', load: 4 }
];

export default function SovereignCortex() {
    const [nodes, setNodes] = useState<NeuralNode[]>(NEURAL_NODES);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setNodes(prev => prev.map(node => ({
                ...node,
                load: node.status === 'active' ? Math.min(100, Math.max(0, node.load + (Math.random() * 4 - 2))) : node.load
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const filteredNodes = selectedCategory
        ? nodes.filter(n => n.category === selectedCategory)
        : nodes;

    return (
        <div className="w-full bg-[#050507] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 mb-2">
                            <Layers className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Infrastructure</span>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                            Sovereign <span className="text-indigo-500">Cortex</span>
                        </h2>
                        <p className="text-zinc-500 text-xs font-medium mt-1">Real-time telemetry for Google Cloud Enterprise API Mesh</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['Intelligence', 'Data', 'Infrastructure', 'Outreach', 'Media'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/40'
                                    : 'bg-white/5 text-zinc-500 border border-white/5 hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Area */}
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredNodes.map((node, i) => (
                        <motion.div
                            key={node.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.02 }}
                            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 group transition-all relative overflow-hidden"
                        >
                            {/* Animated Background Pulse */}
                            {node.status === 'active' && (
                                <motion.div
                                    className="absolute inset-0 bg-indigo-500/5"
                                    animate={{ opacity: [0, 0.5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            )}

                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 transition-colors group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20`}>
                                    <node.icon className={`w-5 h-5 ${node.status === 'active' ? 'text-indigo-400' :
                                        node.status === 'synced' ? 'text-emerald-400' :
                                            'text-zinc-600'
                                        }`} />
                                </div>
                                <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border ${node.status === 'active' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                    node.status === 'synced' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        'bg-zinc-500/10 text-zinc-600 border-zinc-500/20'
                                    }`}>
                                    {node.status}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-3 leading-tight group-hover:text-indigo-300 transition-colors">
                                    {node.name}
                                </h4>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">
                                        <span>Throughput Load</span>
                                        <span className={node.load > 80 ? 'text-amber-500' : 'text-indigo-400'}>{Math.round(node.load)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${node.load > 80 ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-indigo-500 shadow-[0_0_8px_#6366f1]'}`}
                                            animate={{ width: `${node.load}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* System Status Footer */}
            <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">System Integrity: 100% Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-indigo-500" />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Edge Nodes: 16 Active</span>
                    </div>
                </div>
                <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">
                    Mainframe: edintel-sovereign-2027 // ARCHITECTURE: v4.2-2027-Sovereign
                </div>
            </div>
        </div>
    );
}
