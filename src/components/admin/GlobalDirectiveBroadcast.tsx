'use client';

import { motion } from 'framer-motion';
import { Send, Zap, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { CollectiveLearningEngine, GlobalDirective } from '@/lib/CollectiveLearningEngine';
import { useState, useEffect } from 'react';

const engine = CollectiveLearningEngine.getInstance();

export function GlobalDirectiveBroadcast() {
    const [directives, setDirectives] = useState<GlobalDirective[]>(engine.getActiveDirectives());
    const [isBroadcasting, setIsBroadcasting] = useState(false);

    const handleBroadcast = () => {
        setIsBroadcasting(true);
        setTimeout(() => {
            setIsBroadcasting(false);
        }, 3000);
    };

    return (
        <GlassCard className="p-8 border-amber-500/10 bg-amber-500/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                        Global Directive Broadcast
                        <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase">Protocol_Alpha</span>
                        </div>
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sovereign Orchestration Command</p>
                </div>
                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                    <Zap size={20} fill="currentColor" />
                </div>
            </div>

            {/* Directive Input Area */}
            <div className="space-y-6">
                <div className="relative group">
                    <textarea 
                        className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-zinc-300 font-medium placeholder:text-zinc-700 focus:outline-none focus:border-amber-500/40 transition-all resize-none custom-scrollbar uppercase tracking-tight"
                        placeholder="ENTER GLOBAL DIRECTIVE ORCHESTRATION STRING..."
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Auth_Level</span>
                        <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-black text-white uppercase tracking-widest">Sovereign_0x1</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={handleBroadcast}
                        disabled={isBroadcasting}
                        className="relative h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-900/20 active:scale-95 transition-all overflow-hidden disabled:opacity-50"
                    >
                        {isBroadcasting ? (
                            <motion.div 
                                className="flex items-center justify-center gap-3"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <RefreshCw size={14} className="animate-spin" />
                                <span>Syncing Swarm...</span>
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center gap-3">
                                <Send size={14} />
                                <span>Push Directive</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors pointer-events-none" />
                    </button>
                    <button className="h-14 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-zinc-500 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95">
                        <ShieldCheck size={14} />
                        <span>Policy Check</span>
                    </button>
                </div>
            </div>

            {/* Active Directives Feed */}
            <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Directives</span>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">In Sync</span>
                    </div>
                </div>

                {directives.map((dir, i) => (
                    <div key={dir.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] group hover:bg-white/[0.04] transition-all relative overflow-hidden">
                        <div className="flex items-start justify-between mb-3 relative z-10">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-sm font-black text-white tracking-widest uppercase italic">{dir.title}</h4>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-[8px] font-black text-amber-500 uppercase tracking-widest">
                                        <Zap size={8} fill="currentColor" />
                                        {dir.targetAgents.join(' + ')}
                                    </div>
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tight">Timestamp: {dir.timestamp.toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                                Enforcing
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-medium transition-colors relative z-10 leading-relaxed uppercase">
                            {dir.description}
                        </p>
                        
                        {/* Decorative Background Icon */}
                        <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-amber-500/[0.02] rounded-full blur-2xl group-hover:bg-amber-500/[0.05] transition-all" />
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500 flex-shrink-0">
                    <AlertCircle size={18} />
                </div>
                <div className="flex flex-col">
                    <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1 italic">Sovereign Override Policy</h5>
                    <p className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
                        Pushing directives will immediately override local agent context windows. Use with discretion to prevent instructional dislocation.
                    </p>
                </div>
            </div>
        </GlassCard>
    );
}
