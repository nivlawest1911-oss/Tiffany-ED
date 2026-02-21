'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, MessageSquare, TrendingUp, Users, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
    {
        name: "Director of Instruction",
        school: "Mobile West District",
        text: "The Strategic Polymath persona has transformed how we approach ALSDE mandates. It's not just a tool; it's a partner in leadership.",
        metric: "+24% Audit Efficiency"
    },
    {
        name: "Elementary Principal",
        school: "Southern Pines",
        text: "Automating IRP synthesis saved our team 40 hours of manual data entry this month. The token system is well worth the investment.",
        metric: "500+ IRPs Generated"
    },
    {
        name: "Federal Programs Coordinator",
        school: "Central Office",
        text: "EdIntel's high-luminance dashboard gives us clear visibility into compliance across all campuses in real-time.",
        metric: "100% Compliance Score"
    }
];

const devLogs = [
    { date: "Feb 19", ship: "Multi-Agent System v2 (Executive Mode) Deployed" },
    { date: "Feb 18", ship: "Alabama Literacy Module 'Auto-Pilot' Beta Live" },
    { date: "Feb 17", ship: "High-Luminance 'Illuminated Strategy' UI Overhaul" }
];

export default function WallOfSovereignty({ className }: { className?: string }) {
    return (
        <div className={cn("glass-bento p-8 flex flex-col gap-8 overflow-hidden", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-electric-cyan rounded-xl flex items-center justify-center shadow-lg shadow-electric-cyan/20">
                        <Users className="text-white" size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Wall of Sovereignty</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Impact & Real-Time Sync</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-600 uppercase">Live Feed</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonials */}
                <div className="md:col-span-1 flex flex-col gap-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={12} />
                        Leadership Voices
                    </h4>
                    <div className="space-y-3">
                        {testimonials.slice(0, 2).map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 bg-white/50 border border-slate-100 rounded-2xl relative overflow-hidden group hover:border-electric-cyan/30 transition-all"
                            >
                                <Quote className="absolute -top-1 -right-1 text-slate-100 group-hover:text-electric-cyan/5 transition-colors" size={48} />
                                <p className="text-[11px] text-slate-600 font-medium leading-relaxed mb-3 relative z-10 italic">"{t.text}"</p>
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-black text-slate-900">{t.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{t.school}</p>
                                    </div>
                                    <div className="px-2 py-1 bg-electric-cyan/10 text-electric-cyan text-[9px] font-black rounded-lg">
                                        {t.metric}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Dev Logs */}
                <div className="md:col-span-1 flex flex-col gap-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={12} />
                        Deployment Logs
                    </h4>
                    <div className="space-y-4">
                        {devLogs.map((log, i) => (
                            <div key={i} className="flex gap-4 items-center p-3 bg-white/30 border border-slate-50 rounded-xl">
                                <span className="text-[9px] font-black text-sovereign-gold whitespace-nowrap bg-sovereign-gold/10 px-2 py-1 rounded">{log.date}</span>
                                <span className="text-[10px] text-slate-700 font-bold">{log.ship}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Stats */}
                <div className="md:col-span-1 flex flex-col h-full">
                    <div className="p-6 bg-slate-900 rounded-3xl relative overflow-hidden group h-full flex flex-col justify-center">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={64} className="text-white" />
                        </div>
                        <p className="text-[10px] font-black text-electric-cyan uppercase tracking-[0.2em] mb-2">Global Synthesis</p>
                        <h5 className="text-3xl font-black text-white tracking-tighter mb-4">1,240,582 <span className="text-sm font-bold text-slate-500">TOKENS</span></h5>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-1/3 h-full bg-gradient-to-r from-transparent via-electric-cyan to-transparent"
                            />
                        </div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Real-time across EdIntel Network</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
