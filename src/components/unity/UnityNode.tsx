"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Shield,
    Zap,
    Cpu,
    Globe,
    RefreshCw,
    Terminal,
    Sparkles,
    CloudDownload,
    Headphones
} from 'lucide-react';
import { unityOrchestrator, NodeStatus, GlobalHealth, DistrictData } from '@/lib/UnityOrchestrator';
import { resilienceEngine, ResilienceState } from '@/lib/ResilienceEngine';
import { globalSynapse } from '@/lib/GlobalSynapse';
import { GlassCard } from '@/components/ui/Cinematic';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTavus } from '@/context/TavusContext';

export const UnityNode: React.FC = () => {
    const [stats, setStats] = useState<GlobalHealth | null>(null);
    const [nodes, setNodes] = useState<NodeStatus[]>([]);
    const [districts, setDistricts] = useState<DistrictData[]>([]);
    const [currentDistrictId, setCurrentDistrictId] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);
    const [isIngesting, setIsIngesting] = useState(false);
    const [selectedNode, setSelectedNode] = useState<NodeStatus | null>(null);
    const [resilience, setResilience] = useState<ResilienceState>(resilienceEngine.getState());
    const [isTranscending, setIsTranscending] = useState(false);
    
    const router = useRouter();
    const { startAdvisorySession, isConnecting, isSessionActive } = useTavus();

    const refreshTelemetry = useCallback(async () => {
        const fetchedDistricts = await unityOrchestrator.fetchDistricts();
        setDistricts(fetchedDistricts);
        
        // If we don't have a current district or it's no longer there, pick the first one
        if (fetchedDistricts.length > 0) {
            const current = currentDistrictId && fetchedDistricts.some(d => d.id === currentDistrictId) 
                ? currentDistrictId 
                : fetchedDistricts[0].id;
            
            if (current !== currentDistrictId) {
                setCurrentDistrictId(current);
            }

            setNodes(unityOrchestrator.getNodeStatuses(current));
            setStats(unityOrchestrator.getGlobalHealth(current));
        }
        
        setResilience(resilienceEngine.getState());
    }, [currentDistrictId]);

    useEffect(() => {
        refreshTelemetry();
        const interval = setInterval(refreshTelemetry, 5000);
        return () => clearInterval(interval);
    }, [refreshTelemetry]);

    const handleIngest = async () => {
        setIsIngesting(true);
        const newName = `District ${String.fromCharCode(65 + districts.length)}`;
        
        toast.loading(`Ingesting ${newName} Protocol...`);
        
        const successId = await unityOrchestrator.ingestNewDistrict(newName);
        
        if (successId) {
            setIsIngesting(false);
            setCurrentDistrictId(successId);
            await refreshTelemetry();
            toast.success(`${newName} Ingested into Sovereign Network.`);
        } else {
            setIsIngesting(false);
            toast.error(`Failed to ingest ${newName}. Check system logs.`);
        }
    };

    const handleAdvisoryUplink = async () => {
        try {
            await startAdvisorySession();
        } catch (err) {
            console.error(err);
            toast.error("Advisory Uplink Failed: Verify Phoenix-3 Credentials.");
        }
    };

    const handleSync = async () => {
        setIsSyncing(true);
        await unityOrchestrator.resolveCrossNodeTriggers(currentDistrictId);
        setTimeout(() => {
            setIsSyncing(false);
            refreshTelemetry();
        }, 2000);
    };

    const handleHardening = async (level: ResilienceState['hardeningLevel']) => {
        const newState = await resilienceEngine.setHardeningLevel(level);
        setResilience(newState);
        toast.success(`System Hardening: ${level.toUpperCase()}`);
    };

    const handleArchive = async () => {
        const newState = await resilienceEngine.archiveLedger();
        setResilience(newState);
        toast.info("Legacy Ledger moved to Cold Storage.");
    };

    const handleSynapse = async () => {
        setIsTranscending(true);
        const success = await globalSynapse.processSynapticPulse();
        if (success) {
            toast.success("TRANSITIONING TO TRANSCENDENCE LAYER...");
            setTimeout(() => {
                router.push('/transcendence');
            }, 3000);
        } else {
            setIsTranscending(false);
            toast.error("Synaptic Pulse Failed: Ensure system health is optimal.");
        }
    };

    if (!stats) return null;

    return (
        <div className="space-y-8 pb-20">
            {/* Global Equilibrium Pulse */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-3xl bg-black border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

                {/* Orbital Rings */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.05, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 10 + ring * 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute border border-white/10 rounded-full"
                        style={{
                            width: ring * 200,
                            height: ring * 200
                        }}
                    />
                ))}

                {/* Central Core */}
                <div className="relative flex flex-col items-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            filter: ["blur(20px)", "blur(40px)", "blur(20px)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-blue-500/20 rounded-full"
                    />
                    <div className="relative text-center">
                        <div className="text-[120px] font-black text-white leading-none tracking-tighter italic">
                            {stats.score}<span className="text-4xl text-blue-400 font-bold ml-2">%</span>
                        </div>
                        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-400 mt-2">Global Equilibrium</p>
                        <div className="flex gap-4 mt-6 justify-center">
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                                <Activity size={12} className="text-green-400" />
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{stats.equilibrium}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Cpu size={14} className="text-zinc-400" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">System Load: {stats.systemLoad}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Globe size={14} className="text-zinc-400" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Network Nodes: {districts.reduce((acc, d) => acc + d.nodes.length, 0)}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <select 
                            title="Institutional District Switcher"
                            value={currentDistrictId}
                            onChange={(e) => setCurrentDistrictId(e.target.value)}
                            className="bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {districts.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>

                        <button
                            onClick={handleIngest}
                            disabled={isIngesting}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 transition-all disabled:opacity-50"
                        >
                            <CloudDownload size={14} />
                            {isIngesting ? "Ingesting..." : "Ingest District"}
                        </button>

                        <button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="group relative px-8 py-4 bg-white text-black font-black uppercase italic tracking-tighter text-sm rounded-xl overflow-hidden active:scale-95 transition-all shadow-2xl shadow-white/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex items-center gap-2">
                                {isSyncing ? (
                                    <RefreshCw className="animate-spin" size={16} />
                                ) : (
                                    <Zap size={16} fill="black" />
                                )}
                                {isSyncing ? "Synchronizing..." : "Initialize Total Sync"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nodes.map((node) => (
                    <GlassCard
                        key={node.id}
                        className={`p-6 cursor-pointer group transition-all hover:bg-white/[0.07] ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500/50 bg-white/[0.07]' : ''}`}
                        onClick={() => setSelectedNode(node)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${node.status === 'optimal' ? 'bg-green-500/10 text-green-400' :
                                node.status === 'stressed' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                <Shield size={16} />
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-black text-white italic">{node.health}%</div>
                                <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Node Health</div>
                            </div>
                        </div>

                        <h3 className="text-lg font-black text-white uppercase tracking-tighter italic group-hover:text-blue-400 transition-colors">
                            {node.name}
                        </h3>

                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Status</span>
                                <span className={`text-[10px] font-black uppercase ${node.status === 'optimal' ? 'text-green-400' :
                                    node.status === 'stressed' ? 'text-yellow-400' : 'text-red-400'
                                    }`}>{node.status}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Active Swarms</span>
                                <span className="text-[10px] font-black text-white">{node.activeSwarms}</span>
                            </div>
                        </div>

                        {/* Sparkline simulation */}
                        <div className="mt-6 flex items-end gap-1 h-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${20 + Math.random() * 80}%` }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                                    className={`flex-1 rounded-t-sm ${node.status === 'optimal' ? 'bg-blue-500/20' :
                                        node.status === 'stressed' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                                        }`}
                                />
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* System Log Overlay */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <GlassCard className="lg:col-span-2 p-8 overflow-hidden relative">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <Terminal className="text-blue-500" size={20} />
                            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">System Pulse Stream</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Active</span>
                        </div>
                    </div>

                    <div className="space-y-4 font-mono text-[11px] h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="group border-l border-white/10 pl-4 py-1 hover:border-blue-500/50 transition-colors">
                                <div className="flex justify-between text-zinc-400 mb-1">
                                    <span>[SYNC_NODE_{i * 1024}]</span>
                                    <span>{new Date().toLocaleTimeString()}</span>
                                </div>
                                <div className="text-zinc-300">
                                    <span className="text-blue-400">INFO:</span> Cross-node equilibrium check successful. Pulse strength at 0.982.
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard className={`p-8 ${resilience.hardeningLevel === 'absolute' ? 'bg-red-900/40 border-red-500/50' : 'bg-blue-600'} shadow-xl transition-all`}>
                        <Shield className="text-white mb-4" size={32} />
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">
                            Resilience<br />Control
                        </h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-white/60">
                                <span>Hardening</span>
                                <span className={resilience.hardeningLevel === 'absolute' ? 'text-red-400' : 'text-blue-200'}>
                                    {resilience.hardeningLevel}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleHardening('standard')}
                                    className={`flex-1 py-2 text-[8px] font-black uppercase rounded border ${resilience.hardeningLevel === 'standard' ? 'bg-white text-blue-600 border-white' : 'bg-transparent text-white border-white/20'}`}
                                >
                                    Std
                                </button>
                                <button
                                    onClick={() => handleHardening('absolute')}
                                    className={`flex-1 py-2 text-[8px] font-black uppercase rounded border ${resilience.hardeningLevel === 'absolute' ? 'bg-white text-red-600 border-white' : 'bg-transparent text-white border-white/20'}`}
                                >
                                    Abs
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-white/60">
                                <span>Archive</span>
                                <span className="text-blue-200">{resilience.ledgerArchiveStatus}</span>
                            </div>
                            <button
                                onClick={handleArchive}
                                disabled={resilience.ledgerArchiveStatus !== 'online'}
                                className="w-full py-3 bg-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50"
                            >
                                Trigger Cold Storage
                            </button>

                            <button
                                onClick={handleAdvisoryUplink}
                                disabled={isConnecting}
                                className={`w-full py-3 mt-2 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] rounded border transition-all ${
                                    isSessionActive 
                                    ? 'bg-blue-500 border-blue-400 text-white' 
                                    : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30'
                                }`}
                            >
                                {isConnecting ? (
                                    <RefreshCw className="animate-spin" size={14} />
                                ) : (
                                    <Headphones size={14} />
                                )}
                                {isConnecting ? "Establishing..." : isSessionActive ? "Advisory Active" : "Phoenix-3 Advisory Uplink"}
                            </button>
                        </div>

                        <p className="text-blue-100 text-[9px] leading-relaxed opacity-60">
                            Immutable failover protocols active. System state is mirrored across {districts.length} institutional clusters.
                        </p>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <button
                                onClick={handleSynapse}
                                disabled={isTranscending || stats.score < 80}
                                className="w-full py-4 bg-intel-gold text-black font-black uppercase italic tracking-tighter text-xs rounded-xl shadow-[0_0_20px_rgba(191,155,48,0.3)] hover:shadow-[0_0_30px_rgba(191,155,48,0.5)] transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                            >
                                {isTranscending ? (
                                    <RefreshCw className="animate-spin" size={14} />
                                ) : (
                                    <Sparkles size={14} />
                                )}
                                {isTranscending ? "TRANSCENDING..." : "ACHIEVE TRANSCENDENCE"}
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
