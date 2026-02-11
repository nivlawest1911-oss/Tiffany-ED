'use client';

import { motion } from 'framer-motion';
import { FileText, Bot, Activity, ArrowUpRight } from 'lucide-react';

const RECENT_ACTIVITY = [
    { action: "IEP Generated", user: "Principal Anderson", time: "2m ago", icon: FileText },
    { action: "Grant Proposal Drafted", user: "Dr. Roberts", time: "15m ago", icon: FileText },
    { action: "AI Counseling Session", user: "Counselor Davis", time: "1h ago", icon: Bot },
    { action: "Compliance Audit", user: "System", time: "3h ago", icon: Activity },
];

export default function PlatformActivity() {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full flex flex-col bg-black/20">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                <span className="w-2 h-6 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                Operations Stream
            </h3>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 group hover:border-[#D4AF37]/30 transition-all">
                    <div className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Docs Minted</div>
                    <div className="text-3xl font-black text-white tabular-nums">12,450</div>
                    <div className="text-emerald-400 text-[10px] font-bold mt-1 flex items-center gap-1 uppercase">
                        <ArrowUpRight size={10} /> +12% Delta
                    </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 group hover:border-[#D4AF37]/30 transition-all">
                    <div className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Neural Cycles</div>
                    <div className="text-3xl font-black text-white tabular-nums">8,320</div>
                    <div className="text-noble-gold text-[10px] font-bold mt-1 flex items-center gap-1 uppercase">
                        <ArrowUpRight size={10} /> +8% Sync
                    </div>
                </div>
            </div>

            {/* Monthly Usage Chart (Simulated) */}
            <div className="mb-8 flex-grow">
                <div className="text-xs text-slate-500 mb-2 font-bold uppercase">Monthly Usage</div>
                <div className="h-32 flex items-end gap-2">
                    {[35, 55, 45, 70, 60, 85, 75, 90, 65, 80, 95, 85].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-noble-gold/20 to-noble-gold rounded-t-sm hover:from-noble-gold/40 hover:to-white transition-all shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                        />
                    ))}
                </div>
            </div>

            {/* Recent Activity List */}
            <div>
                <div className="text-xs text-slate-500 mb-4 font-bold uppercase">Recent Actions</div>
                <div className="space-y-4">
                    {RECENT_ACTIVITY.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 border border-white/5">
                                <item.icon size={14} />
                            </div>
                            <div className="flex-grow">
                                <div className="text-sm text-white font-medium">{item.action}</div>
                                <div className="text-xs text-slate-500">{item.user}</div>
                            </div>
                            <div className="text-[10px] text-slate-600 font-mono">{item.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
