'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Shield, Activity, Globe, Cpu, RefreshCcw, Send } from 'lucide-react';
import { FleetOrchestrator, FleetNode, RegionalMetrics } from '@/lib/FleetOrchestrator';
import { toast } from 'sonner';

export default function FleetCommander() {
    const [nodes, setNodes] = useState<FleetNode[]>([]);
    const [metrics, setMetrics] = useState<RegionalMetrics | null>(null);
    const [selectedNode, setSelectedNode] = useState<FleetNode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [directive, setDirective] = useState("");

    const orchestrator = FleetOrchestrator.getInstance();

    useEffect(() => {
        const loadData = async () => {
            const fleetNodes = await orchestrator.getFleetNodes();
            const regionalMetrics = await orchestrator.getRegionalMetrics();
            setNodes(fleetNodes);
            setMetrics(regionalMetrics);
            setIsLoading(false);
        };
        loadData();
    }, [orchestrator]);

    const handleBroadcast = async () => {
        if (!directive.trim()) return;
        const result = await orchestrator.broadcastDirective(directive);
        if (result.success) {
            toast.success(`Regional Directive Broadcasted: ${result.hash}`);
            setDirective("");
        }
    };

    const getStatusColor = (status: FleetNode['status']) => {
        switch (status) {
            case 'operational': return 'text-emerald-400';
            case 'syncing': return 'text-cyan-400';
            case 'alert': return 'text-red-400';
            case 'offline': return 'text-zinc-600';
            default: return 'text-white';
        }
    };

    if (isLoading) {
        return (
            <div className="h-[600px] flex items-center justify-center bg-black/40 rounded-[2.5rem] border border-white/5">
                <RefreshCcw className="w-8 h-8 text-noble-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Fleet Status Map Visualization (Cinema-style Grid) */}
            <div className="lg:col-span-8 space-y-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-noble-gold/20 to-transparent" />

                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Regional <span className="text-noble-gold">Fleet</span> Matrix</h2>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Sovereign Node Distribution & Telemetry</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Global Sync: Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {nodes.map((node) => (
                            <motion.div
                                key={node.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedNode(node)}
                                className={`p-6 rounded-3xl border transition-all cursor-pointer group ${selectedNode?.id === node.id
                                    ? 'bg-noble-gold/5 border-noble-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                                    : 'bg-black/40 border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl bg-white/5 ${getStatusColor(node.status)}`}>
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-black/60 border border-white/5 ${getStatusColor(node.status)}`}>
                                        {node.status}
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-noble-gold transition-colors">{node.name}</h3>
                                <p className="text-[10px] text-zinc-500 mb-4">{node.location}</p>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[9px]">
                                        <span className="text-zinc-500 uppercase font-bold tracking-widest">Intelligence Load</span>
                                        <span className="text-white font-mono">{node.intelligenceLoad}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${node.intelligenceLoad}%` }}
                                            className={`h-full ${node.intelligenceLoad > 85 ? 'bg-red-500' : 'bg-noble-gold'}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Regional Broadcast Terminal */}
                <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-8">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cyan-400" /> Regional Directive Console
                    </h3>
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={directive}
                                onChange={(e) => setDirective(e.target.value)}
                                placeholder="Issue fleet-wide command logic..."
                                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-noble-gold/50 transition-all font-medium"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] font-mono text-zinc-600">
                                CHANNEL: REGIONAL_HIGH_SIG
                            </div>
                        </div>
                        <button
                            onClick={handleBroadcast}
                            className="bg-noble-gold hover:bg-yellow-500 text-black px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            Broadcast <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Regional Metrics & Node Detail */}
            <div className="lg:col-span-4 space-y-8">
                {/* Regional Rollup */}
                <div className="bg-noble-gold/5 border border-noble-gold/20 rounded-[2.5rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-noble-gold/10 blur-[80px] rounded-full" />
                    <h3 className="text-xs font-black text-noble-gold uppercase tracking-[0.2em] mb-8">Regional Status</h3>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.totalActiveNodes}</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Active nodes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.regionalComplianceScore}%</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Compliance Adherence</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.averageIntelligenceLoad}%</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Fleet Capacity</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.activeDirectives}</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Active Directives</div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {selectedNode ? (
                        <motion.div
                            key={selectedNode.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-2xl bg-white/5 ${getStatusColor(selectedNode.status)}`}>
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-white uppercase tracking-tighter">{selectedNode.name}</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Node ID: {selectedNode.id}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-noble-gold/20 transition-all">
                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Participant Count</div>
                                    <div className="text-xl font-bold text-white tracking-tight">{selectedNode.activeUsers.toLocaleString()} Learning Souls</div>
                                </div>

                                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-noble-gold/20 transition-all">
                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Last Neural Sync</div>
                                    <div className="text-xs font-mono text-cyan-500">{new Date(selectedNode.lastSync).toLocaleString()}</div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                                        Ping Node
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl bg-noble-gold/10 border border-noble-gold/20 text-[9px] font-black text-noble-gold uppercase tracking-widest hover:bg-noble-gold/20 transition-all">
                                        Analyze Metrics
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-zinc-900/30 border border-dashed border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center">
                            <Map className="w-12 h-12 text-zinc-700 mb-4" />
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Select a fleet node for detailed telemetry</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
