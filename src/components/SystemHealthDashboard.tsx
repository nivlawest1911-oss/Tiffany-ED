'use client';

import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Heart, Zap } from 'lucide-react';

export default function SystemHealthDashboard() {
    const metrics = [
        { label: 'Neural Sync Uptime', value: '99.99%', sub: 'Global Node Active', icon: Activity, color: 'text-blue-400' },
        { label: 'Collective Wellness', value: '84/100', sub: 'Regional Resonance', icon: Heart, color: 'text-emerald-400' },
        { label: 'Active EdIntels', value: '1,204', sub: 'Alabama District Sync', icon: ShieldCheck, color: 'text-amber-400' },
        { label: 'Neural Throughput', value: '1.2 GB/s', sub: 'Low Latency Link', icon: Zap, color: 'text-purple-400' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="p-5 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl relative overflow-hidden group cursor-default"
                >
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 flex flex-col gap-4">
                        <div className={`p-3 w-fit rounded-2xl bg-white/5 ${m.color}`}>
                            <m.icon className="w-5 h-5" />
                        </div>

                        <div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">
                                {m.label}
                            </div>
                            <div className="text-2xl font-black text-white italic tracking-tighter">
                                {m.value}
                            </div>
                            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">
                                {m.sub}
                            </div>
                        </div>
                    </div>

                    {/* Antigravity Corner Accent */}
                    <div className="absolute top-0 right-0 p-4">
                        <div className={`w-1 h-1 rounded-full ${m.color} blur-[2px] opacity-20`} />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
