'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Radio, Lock, RefreshCw, Send } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

const ACTIONS = [
    {
        id: 'pii-scrub',
        title: 'Global PII Scrub',
        description: 'Instantly purge all sensitive PII from active agent memory across all district nodes.',
        icon: Lock,
        color: 'from-rose-500 to-red-600',
        textColor: 'text-rose-500',
        bgSecondary: 'bg-rose-500/10',
        borderSecondary: 'border-rose-500/20'
    },
    {
        id: 'policy-sync',
        title: 'Force Policy Sync',
        description: 'Redeploy the master Sovereign Prompt to all AI delegates to ensure total governance alignment.',
        icon: RefreshCw,
        color: 'from-amber-500 to-orange-600',
        textColor: 'text-amber-500',
        bgSecondary: 'bg-amber-500/10',
        borderSecondary: 'border-amber-500/20'
    },
    {
        id: 'broadcast',
        title: 'District Broadcast',
        description: 'Send an emergency tactical update to all AI-human interfaces (Web, Mobile, Avatar).',
        icon: Radio,
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-500',
        bgSecondary: 'bg-blue-500/10',
        borderSecondary: 'border-blue-500/20'
    }
];

export function TacticalActions() {
    return (
        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase">Tactical Actions</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sovereign Intervention Protocols</p>
                </div>
            </div>

            <div className="space-y-6">
                {ACTIONS.map((action, i) => (
                    <motion.div
                        key={action.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-2xl border ${action.borderSecondary} ${action.bgSecondary} group hover:bg-white/[0.03] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden`}
                    >
                        <div className="flex flex-col relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl bg-white/10 ${action.textColor}`}>
                                    <action.icon size={20} />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                    <ShieldAlert size={12} className="text-amber-500" />
                                    <span>High Priority</span>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-black text-white tracking-widest uppercase mb-2 leading-none">
                                {action.title}
                            </h3>
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-6">
                                {action.description}
                            </p>

                            <button className={`w-full py-3 rounded-xl bg-gradient-to-br ${action.color} text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-black/20 flex items-center justify-center gap-2 active:scale-95 transition-transform`}>
                                <Zap size={14} fill="currentColor" />
                                <span>Execute Protocol</span>
                            </button>
                        </div>

                        {/* Background Decorative Gradient */}
                        <div className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full blur-[60px] opacity-20 bg-gradient-to-br ${action.color}`} />
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
                <button className="w-full py-4 rounded-2xl border border-white/10 hover:bg-white/[0.05] text-zinc-400 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Send size={14} />
                    <span>Initiate Full Swarm Lockdown</span>
                </button>
            </div>
        </GlassCard>
    );
}
