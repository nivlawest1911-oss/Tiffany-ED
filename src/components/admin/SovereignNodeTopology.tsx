'use client';

import { motion } from 'framer-motion';
import { Globe, Server, Activity, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, SovereignNode } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function SovereignNodeTopology() {
    const [nodes, setNodes] = useState<SovereignNode[]>(engine.getNodeTopology());

    useEffect(() => {
        const interval = setInterval(() => {
            setNodes(engine.getNodeTopology());
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    const centralNode = nodes.find(n => n.type === 'ADMIN');

    return (
        <GlassCard className="p-8 border-emerald-500/10 bg-emerald-500/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                        Sovereign Node Topology
                        <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            <span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">District Atlas</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Institutional Connectivity Graph</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Nodes</span>
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-xl font-black text-emerald-400">22</span>
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter italic">/ 24</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative h-[300px] w-full bg-black/40 rounded-3xl border border-white/5 overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
                
                {/* Visualizing Connections as SVG Lines */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    {centralNode && nodes.filter(n => n.id !== centralNode.id).map((node) => (
                        <motion.line
                            key={`line-${node.id}`}
                            x1={`${centralNode.coordinates.x}%`}
                            y1={`${centralNode.coordinates.y}%`}
                            x2={`${node.coordinates.x}%`}
                            y2={`${node.coordinates.y}%`}
                            stroke="url(#lineGrad)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    ))}
                </svg>

                {/* Rendering Nodes as Interactive Dots */}
                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: Math.random() * 0.5 }}
                        className="absolute cursor-pointer group/node"
                        style={{
                            left: `${node.coordinates.x}%`,
                            top: `${node.coordinates.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Glow for Syncing Nodes */}
                        {node.status === 'SYNCING' && (
                            <div className="absolute inset-0 h-8 w-8 -m-3 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                        )}
                        
                        <div className={`h-3 w-3 rounded-full border-2 transition-all group-hover/node:scale-125 ${
                            node.status === 'ONLINE' ? 'bg-emerald-500 border-emerald-900 group-hover/node:shadow-[0_0_15px_rgba(16,185,129,0.6)]' : 
                            node.status === 'SYNCING' ? 'bg-amber-500 border-amber-900 animate-pulse' : 'bg-rose-500 border-rose-900'
                        }`} />
                        
                        {/* Node Tooltip/Label on Hover */}
                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 scale-95 group-hover/node:opacity-100 group-hover/node:scale-100 transition-all pointer-events-none z-20">
                            <div className="px-3 py-1.5 rounded-lg bg-black/90 border border-white/10 shadow-2xl backdrop-blur-xl whitespace-nowrap">
                                <p className="text-[10px] font-black text-white tracking-widest uppercase mb-1">{node.name}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-[8px] font-mono text-emerald-400 uppercase">Lat: {node.latency}ms</span>
                                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Load: {node.load}%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <Globe size={14} className="text-emerald-500 animate-[spin_4s_linear_infinite]" />
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Sovereign Mesh Active</span>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                    { label: 'Avg Latency', value: '12.4ms', status: 'stable', icon: Activity },
                    { label: 'Data Throughput', value: '840GB/s', status: 'optimal', icon: Server }
                ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4 group hover:bg-white/[0.04] transition-colors">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                            <stat.icon size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</span>
                            <span className="text-sm font-black text-white italic">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
                <button className="w-full py-3 rounded-xl border border-white/5 hover:bg-white/[0.05] text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group">
                    View Logical Sync Map
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </GlassCard>
    );
}
