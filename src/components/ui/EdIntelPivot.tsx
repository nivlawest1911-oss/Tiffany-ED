'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Cpu,
    Zap,
    Server,
    Database,
    Lock,
    Scale,
    Camera
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const systemLogs = [
    { id: 1, time: '08:42:12', level: 'INFO', msg: 'Lead precursors detected in 3rd Grade cohort.' },
    { id: 2, time: '08:42:15', level: 'WARN', msg: 'Attendance anomaly: 12% deviation from baseline.' },
    { id: 3, time: '08:42:18', level: 'SUCCESS', msg: 'Neural Sync operational. 4 nodes active.' },
    { id: 4, time: '08:42:21', level: 'INFO', msg: 'Analyzing behavioral patterns...' },
    { id: 5, time: '08:42:24', level: 'SUCCESS', msg: 'Report generated for Admin Review.' },
];

export default function EdIntelPivot() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative inline-block group cursor-pointer" id="intel-agent-wrapper">
                    {/* Enhanced Trigger Button */}
                    <div className="absolute inset-0 bg-noble-gold/20 rounded-full blur-xl group-hover:bg-noble-gold/40 transition-all duration-500 animate-pulse" />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-zinc-950/80 backdrop-blur-md text-white px-8 py-4 rounded-full font-black hover:bg-zinc-900 border-2 border-noble-gold/50 hover:border-noble-gold transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] flex items-center gap-4 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] min-w-[200px]"
                    >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-noble-gold/10 border border-noble-gold/30">
                            <Activity className="text-noble-gold w-4 h-4 animate-pulse" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold group-hover:text-noble-gold transition-colors">Studio Active</span>
                            <span className="text-sm font-black italic tracking-wide uppercase">The Sovereign Pivot</span>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                        </div>
                    </motion.button>
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-5xl bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 h-[650px]">
                    {/* Left Sidebar: System Status */}
                    <div className="lg:col-span-4 bg-zinc-900/60 p-8 border-r border-zinc-800 flex flex-col justify-between relative z-10 backdrop-blur-md">
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-noble-gold rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                    <Cpu className="text-black w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-white tracking-tight uppercase italic">System Status</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                                        <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider font-bold">Operational</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-black border-b border-white/5 pb-2">Core Metrics</h4>
                                <StatusItem
                                    icon={<Server size={14} />}
                                    label="Sovereign Core"
                                    status="Active"
                                    color="text-emerald-400"
                                />
                                <StatusItem
                                    icon={<Database size={14} />}
                                    label="Predictive DB"
                                    status="Synced"
                                    color="text-blue-400"
                                />
                                <StatusItem
                                    icon={<Lock size={14} />}
                                    label="FERPA Shield"
                                    status="Locked"
                                    color="text-noble-gold"
                                />
                                <StatusItem
                                    icon={<Zap size={14} />}
                                    label="Neural Latency"
                                    status="12ms"
                                    color="text-purple-400"
                                />
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-black border-b border-white/5 pb-2">Live System Logs</h4>
                                <div className="space-y-2 font-mono text-[9px]">
                                    {systemLogs.map((log) => (
                                        <div key={log.id} className="flex gap-2 text-zinc-400">
                                            <span className="text-zinc-600">[{log.time}]</span>
                                            <span className={log.level === 'WARN' ? 'text-amber-400' : log.level === 'SUCCESS' ? 'text-emerald-400' : 'text-blue-400'}>{log.level}</span>
                                            <span className="truncate">{log.msg}</span>
                                        </div>
                                    ))}
                                    <div className="text-zinc-600 animate-pulse pt-2">_waiting for signal...</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Build Version</span>
                                    <span className="text-xs font-mono text-zinc-300">v2.4.9-Sovereign</span>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-noble-gold animate-ping" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content: The Pivot Info */}
                    <div className="lg:col-span-8 p-10 relative z-10 flex flex-col h-full overflow-y-auto bg-gradient-to-br from-transparent to-black/40">
                        <DialogHeader className="mb-8">
                            <DialogTitle className="text-4xl font-black text-white uppercase tracking-tighter italic flex items-center gap-4">
                                <Activity className="text-noble-gold w-8 h-8" />
                                The Sovereign Pivot
                            </DialogTitle>
                            <p className="text-zinc-400 max-w-xl text-lg font-light leading-relaxed">
                                Shifting educational leadership from <span className="text-red-400 line-through decoration-red-400/50 decoration-2">reactive fire-fighting</span> to <span className="text-noble-gold font-bold">Absolute Strategic Clarity</span>.
                            </p>
                        </DialogHeader>

                        <div className="space-y-6 flex-1">
                            {/* Key Metric Highlight */}
                            <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-16 -mt-16 transition-all group-hover:bg-emerald-500/10 pointer-events-none" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div className="space-y-4 max-w-md">
                                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                            <Scale className="text-noble-gold" size={20} />
                                            The 1% Margin Rule
                                        </h4>
                                        <p className="text-sm text-zinc-300 leading-relaxed">
                                            The Sovereign Engine identifies the 1% of data points that will determine 99% of your outcomes. Speak directly to our delegates to synthesize strategy in real-time.
                                        </p>
                                        <button
                                            onClick={() => window.location.href = '/pivot?host=alvin'}
                                            className="px-6 py-3 bg-noble-gold text-black rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-lg"
                                        >
                                            <Activity size={14} />
                                            Join Live Broadcast with Alvin
                                        </button>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <div className="text-4xl font-black text-white italic underline decoration-noble-gold/50">LEAD</div>
                                        <div className="text-xs text-noble-gold uppercase tracking-wide font-bold mt-2">Executive Protocol</div>
                                    </div>
                                </div>
                            </div>

                            {/* Active Modules Grid */}
                            <div>
                                <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Zap size={12} /> Active Intelligence Nodes
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AIModule
                                        name="IEP Architect"
                                        status="Online"
                                        load="42% Capacity"
                                        desc="Generating compliance docs"
                                    />
                                    <AIModule
                                        name="Leadership EQ"
                                        status="Online"
                                        load="18% Capacity"
                                        desc="Analyzing protocols"
                                    />
                                    <AIModule
                                        name="Lesson Plan Gen"
                                        status="Online"
                                        load="65% Capacity"
                                        desc="Synthesizing curriculum"
                                    />
                                    <div className="p-4 rounded-xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-600 text-xs uppercase tracking-widest hover:border-noble-gold/40 hover:text-noble-gold transition-all cursor-pointer group gap-2"
                                        onClick={() => window.location.href = '/pivot'}>
                                        <Camera size={14} className="group-hover:animate-pulse" />
                                        <span>Deploy Visual Scan Node</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs text-zinc-500">System ID: SOV-2948-XJ</span>
                            <a href="/pivot" className="flex items-center gap-2 text-noble-gold hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
                                Full Intelligence Briefing
                                <ArrowUpRightIcon className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function StatusItem({ icon, label, status, color }: { icon: any; label: string; status: string; color: string }) {
    return (
        <div className="flex items-center justify-between group p-2 rounded-lg hover:bg-white/5 transition-colors cursor-default">
            <div className="flex items-center gap-3">
                <div className="text-zinc-500 group-hover:text-white transition-colors">{icon}</div>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{label}</span>
            </div>
            <span className={`text-[10px] font-bold font-mono ${color}`}>{status}</span>
        </div>
    );
}

function AIModule({ name, status, load, desc }: { name: string; status: string; load: string, desc?: string }) {
    return (
        <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:bg-zinc-900/80 transition-all hover:border-zinc-700 group cursor-default">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
                    <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{name}</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/10 uppercase">{status}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">{desc}</span>
                <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400">{load}</span>
            </div>
        </div>
    );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-zinc-600 ${className}`}>
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
        </svg>
    )
}
