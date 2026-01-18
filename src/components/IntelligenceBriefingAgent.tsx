'use client';
import { motion } from 'framer-motion';
import { Mic, MessageSquare, Briefcase, ChevronRight, Zap } from 'lucide-react';

export default function IntelligenceBriefingAgent() {
    // This would be connected to your AI backend in a real implementation
    const priorities = [
        { type: 'LEGISLATIVE', text: "ALSDE 'Literacy Act' Amendment (Act 2024-548) detected. 3 IEPs need review.", urgency: 'high' },
        { type: 'CALENDAR', text: "Board Meeting in 48 hours. 'State of District' draft is 60% complete.", urgency: 'medium' },
        { type: 'TASK', text: "Student #8821 Behavior Plan draft pending teacher approval.", urgency: 'low' },
    ];

    return (
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-6 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                            <Zap className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Intelligence Briefing</h3>
                        <p className="text-[10px] text-zinc-400">Multi-Agent Task Force Active</p>
                    </div>
                </div>
                <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <Mic className="text-zinc-400 w-4 h-4" />
                </button>
            </div>

            {/* Tactical Priority List */}
            <div className="space-y-3 relative z-10">
                {priorities.map((item, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer"
                    >
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${item.urgency === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                item.urgency === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{item.type}</span>
                                <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <p className="text-sm text-zinc-200 mt-1 leading-snug">{item.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Agent Actions */}
            <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                <button className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                    <MessageSquare className="w-4 h-4" /> Agent Handoff
                </button>
                <button className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                    <Briefcase className="w-4 h-4" /> Verify
                </button>
            </div>

            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
    );
}
