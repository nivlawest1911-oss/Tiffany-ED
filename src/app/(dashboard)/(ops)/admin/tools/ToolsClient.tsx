'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import IEPGenerator from '@/components/bento/IEPGenerator';
import LeadershipGenerator from '@/components/bento/LeadershipGenerator';
import LessonPlanGenerator from '@/components/bento/LessonPlanGenerator';
import AutomatedIEPAudit from '@/components/bento/AutomatedIEPAudit';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { useState } from 'react';


export default function ToolsClient() {
    const [showBriefing, setShowBriefing] = useState(false);

    return (
        <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[3rem] p-12 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-intel-gold/5 blur-[120px] -z-10" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-intel-gold/10 border border-intel-gold/20 backdrop-blur-md">
                            <BrainCircuit className="w-4 h-4 text-intel-gold animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-intel-gold">
                                Neural Command Center
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 drop-shadow-2xl">
                            Intelligence <span className="text-intel-gold">Tools</span>
                        </h1>
                        <p className="max-w-xl text-zinc-400 text-sm font-medium leading-relaxed tracking-wide">
                            Deploy autonomous agents for executive protocols, compliance auditing, and curriculum synthesis.
                        </p>

                        <div className="pt-4">
                            <HolographicBriefing
                                isOpen={showBriefing}
                                onClose={() => setShowBriefing(false)}
                                agentId="visionary"
                                title="Neural Command Center Overview"
                                description="I am Dr. Alvin West. You have reached the core cognitive layer of the EdIntel OS. Here, you manage the high-stakes intelligence nodes that power your district."
                                briefingSteps={[
                                    "Select an Intelligence Node for specialized protocol generation.",
                                    "Monitor real-time system load and node activity telemetry.",
                                    "Configure executive-level parameters for targeted interventions.",
                                    "Deploy generated protocols directly to your professional network."
                                ]}
                            />

                            <button
                                onClick={() => setShowBriefing(true)}
                                className="px-6 py-3 liquid-glass border-intel-gold/20 text-intel-gold hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] group"
                            >
                                <Zap size={14} className="inline mr-3 group-hover:scale-125 transition-transform" />
                                Initialize Command Briefing
                            </button>
                        </div>
                    </div>


                    <div className="flex items-center gap-4">
                        <div className="px-6 py-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col items-end">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Active Nodes</span>
                            <span className="text-xl font-black text-white italic">4</span>
                        </div>
                        <div className="px-6 py-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col items-end">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-black">System Load</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                <span className="text-xl font-black text-white italic">Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* 1. Leadership Generator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group relative rounded-[2.5rem] border border-white/10 bg-zinc-950/50 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-intel-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-intel-gold/10 border border-intel-gold/20 text-intel-gold">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Leadership Protocols</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Executive EQ Engine</p>
                            </div>
                        </div>
                        <Zap className="w-5 h-5 text-white/10 group-hover:text-intel-gold transition-colors" />
                    </div>

                    <div className="p-2 bg-black/20">
                        <LeadershipGenerator />
                    </div>
                </motion.div>

                {/* 2. IEP Generator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group relative rounded-[2.5rem] border border-white/10 bg-zinc-950/50 overflow-hidden xl:col-span-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">IEP Architect</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Compliance & Accommodations</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-black/20">
                        <IEPGenerator />
                    </div>
                </motion.div>

                {/* 3. Lesson Plan Generator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group relative rounded-[2.5rem] border border-white/10 bg-zinc-950/50 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Curriculum Synthesis</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Lesson Planning Node</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-black/20 h-full min-h-[400px]">
                        <LessonPlanGenerator />
                    </div>
                </motion.div>

                {/* 4. Automated Audit */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="group relative rounded-[2.5rem] border border-white/10 bg-zinc-950/50 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Compliance Audit</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Automated Review System</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-black/20 h-full min-h-[400px]">
                        <AutomatedIEPAudit />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
