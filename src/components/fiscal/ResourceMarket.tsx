'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, Zap, Users, Home, ArrowRight, ShieldAlert, Cpu, DollarSign, Activity } from 'lucide-react';
import { FiscalEngine, FiscalNode } from '@/lib/FiscalEngine';
import { GlassCard } from '@/components/ui/Cinematic';
import { toast } from 'sonner';

const engine = FiscalEngine.getInstance();

export function ResourceMarket() {
    const [nodes, setNodes] = useState<FiscalNode[]>([]);
    const [liquidity, setLiquidity] = useState(0);
    const [optimization, setOptimization] = useState(0);

    useEffect(() => {
        const tick = () => {
            setNodes(engine.getLiveMetrics());
            setLiquidity(engine.getMarketLiquidity());
            setOptimization(engine.getOptimizationScore());
        };
        tick();
        const interval = setInterval(tick, 3000);
        return () => clearInterval(interval);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'CAPITAL': return <DollarSign size={18} />;
            case 'COMPUTE': return <Cpu size={18} />;
            case 'STAFF': return <Users size={18} />;
            case 'FACILITY': return <Home size={18} />;
            default: return <PieChart size={18} />;
        }
    };

    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Market Header Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 border-intel-gold/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-intel-gold/10 rounded-lg text-intel-gold">
                            <Activity size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Real-time</span>
                    </div>
                    <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{liquidity.toFixed(1)}%</div>
                    <div className="text-[10px] font-black uppercase text-intel-gold tracking-widest">Market Liquidity</div>
                    <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-intel-gold"
                            animate={{ width: `${liquidity}%` }}
                        />
                    </div>
                </GlassCard>

                <GlassCard className="p-6 border-cyan-500/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            <Zap size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">AI Optimized</span>
                    </div>
                    <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{optimization.toFixed(1)}%</div>
                    <div className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">Efficiency Index</div>
                    <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-cyan-400"
                            animate={{ width: `${optimization}%` }}
                        />
                    </div>
                </GlassCard>

                <GlassCard className="p-6 border-rose-500/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                            <ShieldAlert size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Institutional</span>
                    </div>
                    <div className="text-3xl font-black text-white italic tracking-tighter mb-1">0.42x</div>
                    <div className="text-[10px] font-black uppercase text-rose-400 tracking-widest">Drift Sensitivity</div>
                    <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-rose-400"
                            animate={{ width: `42%` }}
                        />
                    </div>
                </GlassCard>
            </div>

            {/* Resource Nodes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {nodes.map(node => (
                    <motion.div key={node.id} layout>
                        <GlassCard className="p-8 border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-2xl ${node.type === 'CAPITAL' ? 'bg-emerald-500/10 text-emerald-400' :
                                    node.type === 'COMPUTE' ? 'bg-cyan-500/10 text-cyan-400' :
                                        'bg-intel-gold/10 text-intel-gold'
                                    } shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                                    {getIcon(node.type)}
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{node.type}</div>
                                    <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{node.name}</h4>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="text-[10px] font-bold text-white/40 uppercase">
                                            Usage: <span className="text-white">{node.utilization.toFixed(1)}%</span>
                                        </div>
                                        <div className={`text-[10px] font-bold uppercase ${node.drift > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                            Drift: {node.drift > 0 ? '+' : ''}{node.drift.toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-4">
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Current Pool</div>
                                    <div className="text-2xl font-black text-white">{node.allocation.toLocaleString()}</div>
                                </div>
                                <button
                                    className="p-2 bg-white/5 border border-white/5 rounded-full hover:border-intel-gold transition-colors text-white/40 hover:text-intel-gold"
                                    title="View Node Details"
                                    onClick={() => toast.info(`Accessing ${node.name} depth telemetry...`)}
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Market Activity Pulse */}
            <div className="pt-12 border-t border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <TrendingUp className="text-intel-gold" size={20} />
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Autonomous Reallocation Swarm</h3>
                    </div>
                    <div className="px-3 py-1 bg-intel-gold/10 border border-intel-gold/20 rounded-full">
                        <span className="text-[8px] font-black text-intel-gold uppercase tracking-widest">Active Monitoring</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div 
                            key={i} 
                            className="flex items-center justify-between p-4 bg-white/2 border border-white/5 rounded-xl opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={() => toast.info("Locking block hash for autonomous procurement...")}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-intel-gold animate-pulse" />
                                <span className="text-[10px] font-mono text-white/60">PROCUREMENT_AUTH_0x{8329 * i}...82F</span>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Neutral Cluster Expansion Initialized</span>
                            </div>
                            <span className="text-[9px] font-bold text-intel-gold uppercase">Executing</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
