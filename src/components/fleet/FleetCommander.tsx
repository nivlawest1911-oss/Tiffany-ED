'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Activity, Globe, Cpu, RefreshCcw, Send, User, Shield } from 'lucide-react';
import { FleetOrchestrator, FleetNode, RegionalMetrics } from '@/lib/FleetOrchestrator';
import { toast } from 'sonner';
import HumanAvatar from '../ui/HumanAvatar';
import { CORE_AVATARS } from '@/data/avatars';

const getRolePulseCode = (role: string) => {
    if (role.includes('Strategist')) return 'STRAT_ARCHITECT';
    if (role.includes('Principal')) return 'INSTRUCTIONAL_LEAD';
    if (role.includes('Superintendent')) return 'GOVERNANCE_EXEC';
    if (role.includes('Intervention')) return 'CLIMATE_MASTER';
    if (role.includes('Literacy')) return 'DATA_SENTINEL';
    if (role.includes('Special Education')) return 'IEP_OPTIMIZER';
    if (role.includes('Recovery')) return 'FISCAL_ARCHITECT';
    return 'FLEET_SIGNAL';
};

export default function FleetCommander() {
    const [nodes, setNodes] = useState<FleetNode[]>([]);
    const [metrics, setMetrics] = useState<RegionalMetrics | null>(null);
    const [selectedNode, setSelectedNode] = useState<FleetNode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [directive, setDirective] = useState("");
    const [logs, setLogs] = useState<{ id: string; message: string; timestamp: string; type: 'directive' | 'alert' }[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);

    const orchestrator = useMemo(() => FleetOrchestrator.getInstance(), []);

    const loadData = useCallback(async () => {
        setIsSyncing(true);
        const fleetNodes = await orchestrator.getFleetNodes();
        const regionalMetrics = await orchestrator.getRegionalMetrics();
        setNodes(fleetNodes);
        setMetrics(regionalMetrics);
        setIsLoading(false);
        
        // Auto-detect alerts
        fleetNodes.forEach(node => {
            if (node.intelligenceLoad > 90) {
                const alertId = `alert-${node.id}-${Date.now()}`;
                setLogs(prev => {
                    if (prev.find(l => l.message.includes(node.name) && l.type === 'alert')) return prev;
                    return [{
                        id: alertId,
                        message: `CRITICAL LOAD: ${node.name} at ${node.intelligenceLoad}%`,
                        timestamp: new Date().toLocaleTimeString(),
                        type: 'alert' as const
                    }, ...prev].slice(0, 10);
                });
            }
        });

        setTimeout(() => setIsSyncing(false), 800);
    }, [orchestrator]);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, [loadData]);

    const handleBroadcast = async () => {
        if (!directive.trim()) return;
        const targetName = selectedNode ? selectedNode.name : "Regional Fleet";
        const result = await orchestrator.broadcastDirective(targetName, directive);
        
        if (result.success) {
            toast.success(`Directive Logged: ${result.hash}`);
            const nodeAvatar = CORE_AVATARS.find(a => a.name === targetName) || CORE_AVATARS[0];
            const roleCode = getRolePulseCode(nodeAvatar.role);
            
            setLogs(prev => [{
                id: result.hash,
                message: `[${roleCode}] ${directive}`,
                timestamp: new Date().toLocaleTimeString(),
                type: 'directive' as const
            }, ...prev].slice(0, 10));
            setDirective("");
            loadData();
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
                            <AnimatePresence>
                                {isSyncing && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="text-[8px] font-black text-noble-gold uppercase tracking-[0.3em] flex items-center gap-1.5"
                                    >
                                        <RefreshCcw className="w-2.5 h-2.5 animate-spin" /> Syncing...
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                                whileHover={{ 
                                    scale: 1.02,
                                    y: -4,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                                }}
                                onClick={() => setSelectedNode(node)}
                                className={`p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${selectedNode?.id === node.id
                                    ? 'bg-noble-gold/5 border-noble-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                                    : 'bg-black/40 border-white/5 hover:border-white/20'
                                    } ${node.intelligenceLoad > 90 ? 'ring-1 ring-red-500/50' : ''}`}
                            >
                                {/* Pulse Effect for Critical Load */}
                                {node.intelligenceLoad > 90 && (
                                    <motion.div 
                                        className="absolute inset-0 bg-red-500/5 pointer-events-none"
                                        animate={{ opacity: [0, 0.2, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}

                                {/* Neural Scan Line Effect (Depth Lens) */}
                                <motion.div 
                                    className="absolute inset-0 bg-white/5 pointer-events-none opacity-0 group-hover:opacity-100 z-20 overflow-hidden"
                                    animate={{ 
                                        top: ['-100%', '100%'] 
                                    }}
                                    transition={{ 
                                        duration: 2.5, 
                                        repeat: Infinity, 
                                        ease: "linear" 
                                    }}
                                >
                                    <div className="w-full h-8 bg-white/10 backdrop-blur-md saturate-150 border-y border-white/20" />
                                </motion.div>

                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div className={`p-3 rounded-2xl bg-white/5 ${getStatusColor(node.status)} transition-colors duration-500`}>
                                        <Cpu className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                    </div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-black/60 border border-white/5 ${getStatusColor(node.status)}`}>
                                        {node.intelligenceLoad > 90 ? 'CRITICAL' : node.status}
                                    </div>
                                </div>
                                
                                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-noble-gold transition-colors relative z-10">{node.name}</h3>
                                <p className="text-[10px] text-zinc-500 mb-4 relative z-10">{node.location}</p>

                                <div className="space-y-3 relative z-10">
                                    <div className="flex justify-between items-center text-[9px]">
                                        <span className="text-zinc-500 uppercase font-bold tracking-widest">Intelligence Load</span>
                                        <motion.span 
                                            key={node.intelligenceLoad}
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white font-mono"
                                        >
                                            {node.intelligenceLoad}%
                                        </motion.span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${node.intelligenceLoad}%` }}
                                            className={`h-full ${node.intelligenceLoad > 85 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-noble-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]'} transition-all duration-1000`}
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
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={directive}
                                onChange={(e) => setDirective(e.target.value)}
                                placeholder={selectedNode ? `Command logic for ${selectedNode.name}...` : "Issue fleet-wide command logic..."}
                                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-noble-gold/50 transition-all font-medium"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] font-mono text-zinc-600 uppercase">
                                CHANNEL: {selectedNode ? `DIRECT_${selectedNode.id.toUpperCase()}` : 'REGIONAL_HIGH_SIG'}
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
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.totalActiveNodes || 0}</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Active nodes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.regionalComplianceScore || 0}%</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Compliance Adherence</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.averageIntelligenceLoad || 0}%</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Fleet Capacity</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{metrics?.activeDirectives || 0}</div>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Active Directives</div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {selectedNode ? (
                        <motion.div
                            key={selectedNode.id}
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden"
                        >
                            {/* Neural Signature Particles */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-noble-gold/20 rounded-full"
                                        animate={{
                                            x: [Math.random() * 400, Math.random() * 400],
                                            y: [Math.random() * 600, Math.random() * 600],
                                            opacity: [0, 0.5, 0],
                                            scale: [0.5, 1.5, 0.5]
                                        }}
                                        transition={{
                                            duration: 5 + Math.random() * 10,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center gap-6 mb-10 relative z-10">
                                <div className="relative w-24 h-24 group">
                                    <motion.div 
                                        animate={{ 
                                            borderColor: selectedNode.status === 'operational' ? ['rgba(212,175,55,0.2)', 'rgba(212,175,55,0.5)', 'rgba(212,175,55,0.2)'] : 'rgba(255,255,255,0.1)'
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-[2px] rounded-2xl border transition-all" 
                                    />
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-black hover:border-noble-gold/40 transition-colors cursor-crosshair">
                                        <HumanAvatar
                                            src={CORE_AVATARS[nodes.indexOf(selectedNode) % CORE_AVATARS.length]?.avatar || '/images/placeholders/avatar.png'}
                                            alt={selectedNode.name}
                                            isActive={selectedNode.status === 'operational'}
                                            load={selectedNode.intelligenceLoad}
                                            isFocused={true}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-900 ${getStatusColor(selectedNode.status)} bg-current shadow-[0_0_10px_currentColor]`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">{selectedNode.name}</h4>
                                        <button onClick={() => setSelectedNode(null)} className="text-[8px] font-black text-zinc-600 hover:text-white transition-colors tracking-widest uppercase">Close</button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] text-noble-gold uppercase tracking-[0.4em] font-black opacity-60">
                                            {CORE_AVATARS[nodes.indexOf(selectedNode) % CORE_AVATARS.length]?.role || 'Fleet Intelligence'}
                                        </p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3].map(i => (
                                                <motion.div 
                                                    key={i}
                                                    animate={{ 
                                                        opacity: [0.2, 1, 0.2],
                                                        scaleY: [1, 1.5, 1]
                                                    }}
                                                    transition={{ 
                                                        duration: 1, 
                                                        delay: i * 0.2, 
                                                        repeat: Infinity 
                                                    }}
                                                    className="w-0.5 h-2 bg-noble-gold/40 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group hover:border-noble-gold/20 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <User className="w-4 h-4 text-zinc-600" />
                                            <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Active Learning Souls</div>
                                        </div>
                                        <div className="text-[8px] font-black text-emerald-500/60 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded">
                                            Normalizing
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-white tracking-tight italic">
                                        <motion.span
                                            key={selectedNode.activeUsers}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {(selectedNode.activeUsers || 0).toLocaleString()}
                                        </motion.span>
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-2">Synced</span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group hover:border-noble-gold/20 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-4 h-4 text-zinc-600" />
                                            <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Vault Integrity</div>
                                        </div>
                                        <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                            (selectedNode.vaultCompliance || 0) >= 98 ? 'text-emerald-500/60 bg-emerald-500/5' : 'text-amber-500/60 bg-amber-500/5'
                                        }`}>
                                            {(selectedNode.vaultCompliance || 0) >= 98 ? 'Optimal' : 'Audit Required'}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-white tracking-tight italic">
                                        <motion.span
                                            key={selectedNode.vaultCompliance}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {selectedNode.vaultCompliance || 0}%
                                        </motion.span>
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-2">Compliance</span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group hover:border-noble-gold/20 transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Activity className="w-4 h-4 text-zinc-600" />
                                            <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Neural Stability</div>
                                        </div>
                                        <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                            (Date.now() - new Date(selectedNode.lastSync).getTime()) < 10000 
                                            ? 'text-cyan-500/60 bg-cyan-500/5' 
                                            : 'text-yellow-500/60 bg-yellow-500/5'
                                        }`}>
                                            {(Date.now() - new Date(selectedNode.lastSync).getTime()) < 10000 ? 'Coherent' : 'Stale Data'}
                                        </div>
                                    </div>
                                    
                                    {/* Sub-Neural Stability bar */}
                                    <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                                        <motion.div 
                                            className={`h-full bg-gradient-to-r ${CORE_AVATARS[nodes.indexOf(selectedNode) % CORE_AVATARS.length]?.color || 'from-noble-gold to-white'}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.max(30, selectedNode.intelligenceLoad - 10)}%` }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-mono text-cyan-500 uppercase tracking-tighter">
                                            {new Date(selectedNode.lastSync).toLocaleTimeString()} {" // "} Pulse: {Math.floor(Math.random() * 40 + 10)}ms
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="py-4 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                                        Ping Node
                                    </button>
                                    <button className="py-4 rounded-xl bg-noble-gold/10 border border-noble-gold/20 text-[9px] font-black text-noble-gold uppercase tracking-widest hover:bg-noble-gold/20 transition-all active:scale-95">
                                        Analyze Hub
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="space-y-8">
                            {/* Tactical Log Feed */}
                            <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-noble-gold/10" />
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
                                    Tactical Activity Log
                                    <span className="text-noble-gold/40">LIVE_FEED</span>
                                </h3>
                                
                                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                    <AnimatePresence initial={false}>
                                        {logs.length > 0 ? (
                                            logs.map(log => (
                                                <motion.div
                                                    key={log.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`p-4 rounded-xl border ${log.type === 'alert' ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/5'} flex items-start gap-4`}
                                                >
                                                    <div className={`mt-1.5 w-1 h-1 rounded-full ${log.type === 'alert' ? 'bg-red-500 shadow-[0_0_5px_red]' : 'bg-cyan-500 shadow-[0_0_5px_cyan]'}`} />
                                                    <div className="flex-1">
                                                        <p className={`text-[10px] font-medium leading-relaxed ${log.type === 'alert' ? 'text-red-200' : 'text-zinc-200'}`}>
                                                            {log.message}
                                                        </p>
                                                        <span className="text-[8px] font-mono text-zinc-600 uppercase mt-1 block tracking-wider">
                                                            {log.timestamp} {" // "} {log.type === 'alert' ? 'PRIORITY_SIG' : 'LOG_ENTRY'}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center opacity-20 transform -translate-y-4">
                                                <Activity className="w-8 h-8 text-zinc-500 mb-2" />
                                                <p className="text-[8px] font-black uppercase tracking-widest">Waiting for tactical signal...</p>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="bg-zinc-900/30 border border-dashed border-white/10 rounded-[2.5rem] p-8 text-center">
                                <Map className="w-8 h-8 text-zinc-700 mx-auto mb-4" />
                                <p className="text-[8px] text-zinc-600 uppercase tracking-widest font-bold">Node selection telemetry dormant</p>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
