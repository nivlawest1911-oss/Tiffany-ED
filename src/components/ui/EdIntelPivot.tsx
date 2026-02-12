'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Cpu,
    Zap,
    Server,
    Database,
    Lock,
    Scale,
    Camera,
    Radio
} from 'lucide-react';

import { toast } from 'sonner';

const initialLogs = [
    { id: 1, time: '08:42:12', level: 'INFO', msg: 'Lead precursors detected in 3rd Grade cohort.' },
    { id: 2, time: '08:42:15', level: 'WARN', msg: 'Attendance anomaly: 12% deviation from baseline.' },
    { id: 3, time: '08:42:18', level: 'SUCCESS', msg: 'Neural Sync operational. 4 nodes active.' },
    { id: 4, time: '08:42:21', level: 'INFO', msg: 'Analyzing behavioral patterns...' },
    { id: 5, time: '08:42:24', level: 'SUCCESS', msg: 'Report generated for Admin Review.' },
];

export function EdIntelPivotDashboard() {
    const [logs, setLogs] = useState(initialLogs);
    const [latency, setLatency] = useState(12);
    const [isBroadcasting, setIsBroadcasting] = useState(false);

    // Live Latency Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(prev => Math.max(8, Math.min(24, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Live Logs Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const actions = [
                { level: 'INFO', msg: 'Synchronizing district nodes...' },
                { level: 'SUCCESS', msg: 'Packet verified: SHA-256' },
                { level: 'WARN', msg: 'High traffic detected in Sector 4' },
                { level: 'INFO', msg: 'Optimizing neural weights...' },
                { level: 'SUCCESS', msg: 'EdIntel Uplink Confirmed' }
            ];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });

            setLogs(prev => {
                const newLogs = [...prev, { id: Date.now(), time, ...randomAction }];
                return newLogs.slice(-6); // Keep last 6 logs
            });
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleJoinBroadcast = () => {
        setIsBroadcasting(true);
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Establishing Secure Uplink...',
            success: 'EdIntel Broadcast Connected',
            error: 'Connection Failed'
        });

        setTimeout(() => {
            // Dispatch event to open LiveAvatarChat with Alvin
            const alvin = {
                id: 'EdIntel_1',
                name: 'Dr. Alvin West II',
                role: 'Chief AI Strategist | DBA, Ph.D., MBA',
                avatar: '/images/avatars/Dr._alvin_west.png',
                specialty: 'Strategic Leadership & Universal I.E.P. Advisor',
                heygenId: 'josh_lite3_20230714',
                voiceId: 'JBFqnCBv79x13pTo1U5r',
                clearance: 'Quantum',
                video: '/videos/dr-west-loop.mp4'
            };
            window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: alvin }));
            setIsBroadcasting(false);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[600px] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-gold/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Sidebar: System Status */}
            <div className="lg:col-span-4 bg-[#09090b] p-6 border-r border-white/5 flex flex-col justify-between relative z-10">
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-noble-gold/10 border border-noble-gold/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                            <Cpu className="text-noble-gold w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-black text-lg text-white tracking-tight uppercase italic leading-none">System Status</h3>
                            <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider font-bold mt-1 pl-0.5 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Operational
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div>
                            <h4 className="text-[9px] text-zinc-500 uppercase tracking-widest font-black mb-3">Core Metrics</h4>
                            <div className="space-y-2">
                                <StatusItem
                                    icon={<Server size={12} />}
                                    label="EdIntel Core"
                                    status="Active"
                                    color="text-emerald-400"
                                />
                                <StatusItem
                                    icon={<Database size={12} />}
                                    label="Predictive DB"
                                    status="Synced"
                                    color="text-blue-400"
                                />
                                <StatusItem
                                    icon={<Lock size={12} />}
                                    label="FERPA Shield"
                                    status="Locked"
                                    color="text-noble-gold"
                                />
                                <StatusItem
                                    icon={<Zap size={12} />}
                                    label="Neural Latency"
                                    status={`${latency}ms`}
                                    color="text-purple-400"
                                />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[9px] text-zinc-500 uppercase tracking-widest font-black mb-3">Live System Logs</h4>
                            <div className="space-y-1.5 font-mono text-[9px] h-32 overflow-hidden relative">
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none z-10" />
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-2 text-zinc-500"
                                    >
                                        <span className="text-zinc-700 select-none">[{log.time}]</span>
                                        <span className={log.level === 'WARN' ? 'text-amber-500' : log.level === 'SUCCESS' ? 'text-emerald-500' : 'text-blue-500'}>{log.level}</span>
                                        <span className="truncate text-zinc-400">{log.msg}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
                        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Build v2.5.0</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-noble-gold/50" />
                    </div>
                </div>
            </div>

            {/* Main Content: The Pivot Info */}
            <div className="lg:col-span-8 p-8 relative z-10 flex flex-col h-full bg-[#0c0c0f]">
                <div className="mb-6 flex-shrink-0">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
                        <Activity className="text-noble-gold w-6 h-6" />
                        The EdIntel Pivot
                    </h2>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-lg mt-1">
                        Shift from <span className="text-zinc-500 line-through decoration-zinc-600">reactive chaos</span> to <span className="text-noble-gold font-medium">Absolute Strategic Clarity</span> using our predictive engines.
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
                    {/* Key Metric Highlight Card - More compact and functional */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-noble-gold/20 transition-all">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] -mr-12 -mt-12 pointer-events-none" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                            <div className="space-y-3 max-w-sm">
                                <div className="flex items-center gap-2 text-noble-gold text-xs font-black uppercase tracking-widest">
                                    <Scale size={12} />
                                    <span>Executive Protocol</span>
                                </div>
                                <h4 className="text-xl font-bold text-white">The 1% Margin Rule</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Identify the <span className="text-emerald-400">1% of leverage points</span> that drive 99% of outcomes. Connect with Dr. West to isolate these variables now.
                                </p>
                            </div>

                            <button
                                onClick={handleJoinBroadcast}
                                disabled={isBroadcasting}
                                className="sm:w-auto w-full px-5 py-3 bg-noble-gold hover:bg-[#c5a028] text-black rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group/btn min-w-[180px]"
                            >
                                {isBroadcasting ? (
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-black/80 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-black/80 rounded-full animate-bounce delay-75" />
                                        <div className="w-1.5 h-1.5 bg-black/80 rounded-full animate-bounce delay-150" />
                                    </div>
                                ) : (
                                    <>
                                        <Radio size={14} className="group-hover/btn:animate-pulse" />
                                        Start Broadcast
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Active Modules Grid - Functional Looking */}
                    <div className="flex-1">
                        <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                            <Zap size={10} /> Intelligence Nodes
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <AIModule
                                name="IEP Architect"
                                icon={<FileText size={16} />}
                                status="Online"
                                load="42% Capacity"
                                desc="Generating compliance docs"
                            />
                            <AIModule
                                name="Leadership EQ"
                                icon={<Brain size={16} />}
                                status="Online"
                                load="18% Capacity"
                                desc="Analyzing protocols"
                            />
                            <AIModule
                                name="Lesson Plan Gen"
                                icon={<BookOpen size={16} />}
                                status="Online"
                                load="65% Capacity"
                                desc="Synthesizing curriculum"
                            />
                            <div
                                onClick={() => toast.info("Visual Scan Node is initializing...", { description: "Please connect external camera source." })}
                                className="p-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 flex flex-col items-center justify-center text-zinc-500 gap-2 hover:border-noble-gold/30 hover:text-noble-gold hover:bg-noble-gold/5 transition-all cursor-pointer group h-full min-h-[100px]"
                            >
                                <Camera size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Deploy Visual Scan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



function StatusItem({ icon, label, status, color }: { icon: any; label: string; status: string; color: string }) {
    return (
        <div className="flex items-center justify-between group p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-default">
            <div className="flex items-center gap-2.5">
                <div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">{icon}</div>
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</span>
            </div>
            <span className={`text-[9px] font-bold font-mono ${color}`}>{status}</span>
        </div>
    );
}

import { FileText, Brain, BookOpen } from 'lucide-react';

function AIModule({ name, status, load, desc, icon }: { name: string; status: string; load: string, desc?: string, icon?: any }) {
    return (
        <div
            onClick={() => toast.success(`${name} Active`, { description: `Module running at ${load}` })}
            className="p-4 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-800/80 transition-all hover:border-noble-gold/20 hover:shadow-lg cursor-pointer group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-start justify-between mb-3 relative z-10">
                <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-noble-gold group-hover:bg-noble-gold/10 transition-colors">
                    {icon || <Zap size={16} />}
                </div>
                <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{status}</span>
            </div>

            <div className="relative z-10">
                <h5 className="text-sm font-bold text-zinc-200 group-hover:text-white mb-0.5">{name}</h5>
                <p className="text-[10px] text-zinc-500 font-medium group-hover:text-zinc-400">{desc}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="text-[8px] text-zinc-600 uppercase tracking-wider font-bold">Load</span>
                    <span className="text-[9px] font-mono text-zinc-500">{load}</span>
                </div>
            </div>
        </div>
    );
}


