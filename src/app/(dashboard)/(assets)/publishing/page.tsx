'use client';

import { BookOpen, Share2, FilePlus, Layers, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

const PUBLICATIONS = [
    { title: "Sovereign Leadership Manifesto", author: "Dr. Chancellor", status: "Published", date: "Oct 24, 2025" },
    { title: "Neuro-Pedagogy Curriculum Vol 1", author: "Sovereign AI", status: "Review", date: "Oct 22, 2025" },
    { title: "Tactical Empathy Framework", author: "Executive Team", status: "Draft", date: "Oct 20, 2025" },
    { title: "Institutional ROI Strategy", author: "Logic Lab", status: "Published", date: "Oct 18, 2025" },
];

export default function PublishingPage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Publish
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-12 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                        Transcend Publishing
                    </span>
                </div>

                <SmartHover message="Publishing Node: Standardize, synthesize, and disseminate institutional knowledge across the sovereign network.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400">Empire</span>.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    Transcend Publishing is the standardizing engine for your institutional legacy. Convert raw data into regal educational resources with AI-assisted precision.
                </p>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Resource Standardizer */}
                <GlassCard className="lg:col-span-2 p-8 border-indigo-500/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">Resource Standardizer</h3>
                            <p className="text-xs text-slate-500 font-medium">Auto-format institutional documents to EdIntel standards</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-500/30 transition-all">
                            <FilePlus size={14} /> New Protocol
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="border border-dashed border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center group hover:border-indigo-500/30 transition-all cursor-pointer">
                            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Layers className="h-8 w-8 text-slate-500 group-hover:text-indigo-400" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-300 mb-2">Drop local resource to begin standardization</h4>
                            <p className="text-[10px] text-slate-500 font-medium">PDF, DOCX, or MD • MDX Preferred</p>
                        </div>

                        <div className="pt-6">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Recent Publications</h5>
                            <div className="space-y-3">
                                {PUBLICATIONS.map((pub, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-slate-800 rounded-lg text-slate-500 group-hover:text-cyan-400 transition-colors">
                                                <Share2 size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{pub.title}</p>
                                                <p className="text-[10px] text-slate-500 font-medium">{pub.author} • {pub.date}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${pub.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {pub.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Content Distribution Telemetry */}
                <div className="space-y-6">
                    <GlassCard className="p-8 border-cyan-500/10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" /> Synthesis Status
                        </h4>
                        <div className="space-y-6">
                            {[
                                { label: "Standardization Engine", status: "Optimal", val: "100%" },
                                { label: "Cross-Node Distribution", status: "Active", val: "88%" },
                                { label: "Version Control Synthesis", status: "Standby", val: "—" }
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter">
                                        <span className="text-slate-500">{item.label}</span>
                                        <span className="text-white">{item.val}</span>
                                    </div>
                                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: item.val.includes('%') ? item.val : '0%' }}
                                            className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-8 bg-indigo-500/5 border-indigo-500/10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Pending Synthesis</h4>
                        <div className="flex items-center gap-4 mb-4">
                            <Clock className="h-8 w-8 text-indigo-400 animate-pulse" />
                            <div>
                                <p className="text-lg font-black text-white italic">4 Resources</p>
                                <p className="text-[10px] text-slate-500 font-medium">Awaiting final executive seal</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                            Review Queue
                        </button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
