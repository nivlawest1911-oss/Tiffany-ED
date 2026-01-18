'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Shield as LucideShield, Zap, ArrowRight, Eye, X, BookOpen, Target, Activity, FileText, Globe } from "lucide-react";
import { useState } from 'react';

const CINEMATIC_ASSETS = [
    {
        id: 1,
        title: "The Neural Classroom",
        subtitle: "Alabama Regional Node",
        image: "/images/sovereign_vision_classroom.png",
        description: "A high-fidelity synthesis of instructional space and neural telemetry, where every scholar is architected for success.",
        tag: "Live Synthesis",
        color: "from-blue-500 to-indigo-600",
        briefing: {
            policy: "IDEA Compliance / AL Administrative Code 290-8-9",
            context: "Full-Spectrum IEP Architecture",
            content: "Uplink Secure. We are observing the Synthesis Phase of an Alabama-aligned IEP. Notice the neural mapping of student assessment data directly into measurable SMART goals. The engine doesn't just fill forms; it audits for IDEA fidelity and FAPE compliance in real-time according to Alabama SDE Chapter 290-8-9 guidelines. By leveraging a multi-variate database of 40,000+ instructional strategies, we ensure every scholar has a legally robust and instructionally sound success path.",
            metrics: ["100% Legal Fidelity", "120s Drafting Speed", "98.4% Confidence"],
            links: ["ALSDE Compliance Portal", "IDEA Sec. 300", "FAPE Audit Trail"]
        }
    },
    {
        id: 2,
        title: "Executive Command",
        subtitle: "Global Leadership Node",
        image: "/images/sovereign_leadership_node.png",
        description: "Proactive leadership at the speed of thought. Real-time telemetry visualized for absolute district sovereignty.",
        tag: "Strategic Hub",
        color: "from-amber-500 to-rose-600",
        briefing: {
            policy: "Alabama Quality Teaching Standards (AQTS) / PLP",
            context: "District Intelligence Command",
            content: "Executive Matrix Uplink Active. We are visualizing student performance vectors across 14 data streams. The Sovereign Engine identifies 'Opportunity Nodes'—pockets of potential that are currently underserved. By shifting resources at the speed of data, district leaders can optimize for ROI (Return on Instruction). This protocol is fully aligned with AQTS standard 5 concerning professional leadership and administrative ethics.",
            metrics: ["Live Telemetry", "Predictive Analytics", "Budget Optimization"],
            links: ["ALSDE Data Standards", "AQTS Framework", "Strategic Plan 2026"]
        }
    },
    {
        id: 3,
        title: "Educational Uplink",
        subtitle: "Universal Intelligence",
        image: "/images/global_educational_uplink.png",
        description: "The global network of excellence, linking every district into a unified neural matrix of shared instructional capital.",
        tag: "Quantum Secure",
        color: "from-purple-500 to-fuchsia-600",
        briefing: {
            policy: "ESSER Compliance / Title I Part A Optimization",
            context: "Universal Intelligence Matrix",
            content: "Global Uplink Established. This neural network facilitates the sharing of instructional capital across 48 states. We are currently observing a Title I recovery protocol where high-impact tutoring strategies from high-performing districts are synthesized into actionable tactical briefs for emerging districts. All exchanges are monitored for federal compliance and instructional ROI, ensuring absolute accountability for state and federal funding streams.",
            metrics: ["48 State Sync", "1M+ Daily Nodes", "Zero-Latency Share"],
            links: ["Title I Federal Registry", "ESSER Audit Framework", "Global Peer Connect"]
        }
    }
];

export default function SovereignCinematicVault() {
    const [selectedAsset, setSelectedAsset] = useState<typeof CINEMATIC_ASSETS[0] | null>(null);
    const [isBriefing, setIsBriefing] = useState(false);
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Play size={12} className="text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <span>Sovereign Cinematic Vault</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                        Visions of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-800 italic">
                            Sovereignty.
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed font-light">
                        Experience the high-fidelity future of educational excellence. Our neural media engine architects the visionary aesthetic of the Sovereign leadership movement.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {CINEMATIC_ASSETS.map((asset, i) => (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative"
                        >
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-700 group-hover:border-white/30 group-hover:scale-[1.02]">
                                {/* Image Layer */}
                                <img
                                    src={asset.image}
                                    alt={asset.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                />

                                {/* Overlay Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-transparent opacity-40" />

                                {/* Content Layer */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <div className="mb-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white mb-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`}>
                                            <Sparkles size={10} className="text-amber-400" />
                                            {asset.tag}
                                        </div>
                                        <div className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em] mb-2">{asset.subtitle}</div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4 italic group-hover:text-amber-400 transition-colors duration-500">
                                            {asset.title}
                                        </h3>
                                        <p className="text-sm text-zinc-400 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                                            {asset.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/10 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-200">
                                        <button
                                            onClick={() => setSelectedAsset(asset)}
                                            className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em] group/btn"
                                        >
                                            <span>Expand Vision</span>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300">
                                                <Eye size={14} />
                                            </div>
                                        </button>
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar Simulation */}
                                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-linear" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Media Metadata */}
                <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5 opacity-50">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Renderer</span>
                            <span className="text-xs font-bold text-white uppercase tracking-tighter">Sovereign Engine v4.0</span>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Fidelity</span>
                            <span className="text-xs font-bold text-white uppercase tracking-tighter">8K Cinematic Master</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-zinc-600 text-[10px] font-mono tracking-widest">ENCRYPTED_MEDIA_STREAM // UPLINK_STABLE</div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Neural Briefing Modal */}
            <AnimatePresence>
                {selectedAsset && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedAsset(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl bg-zinc-950 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Visual Panel */}
                            <div className="lg:w-1/2 relative h-full">
                                <img
                                    src={selectedAsset.image}
                                    alt={selectedAsset.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                                <div className="absolute top-8 left-8">
                                    <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Vault Asset #{selectedAsset.id}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Intelligence Panel */}
                            <div className="lg:w-1/2 p-12 overflow-y-auto custom-scrollbar flex flex-col">
                                <button
                                    onClick={() => setSelectedAsset(null)}
                                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all z-10"
                                >
                                    <X size={20} />
                                </button>

                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <LucideShield size={16} className="text-indigo-400" />
                                        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Protocol Alignment: {selectedAsset.briefing.policy}</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4 italic">
                                        {selectedAsset.title}
                                    </h2>
                                    <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-6">
                                        {selectedAsset.briefing.context}
                                    </p>

                                    {/* Briefing Text Box */}
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 relative group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                                <Activity size={12} className="text-emerald-500" />
                                                <span>Live Neural Briefing</span>
                                            </div>
                                            <div className="flex gap-1">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="w-1 h-3 bg-emerald-500/30 rounded-full group-hover:bg-emerald-500 transition-all" style={{ animationDelay: `${i * 0.1}s` }} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-white text-sm leading-relaxed font-mono italic">
                                            "{selectedAsset.briefing.content}"
                                        </p>
                                    </div>

                                    {/* Policy Uplinks */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        {selectedAsset.briefing.links.map((link, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col gap-2 hover:bg-indigo-500/20 transition-all cursor-pointer group">
                                                <div className="flex items-center justify-between">
                                                    <FileText size={14} className="text-indigo-400" />
                                                    <ArrowRight size={12} className="text-indigo-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </div>
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{link}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="flex gap-8 border-t border-white/5 pt-8 mt-auto">
                                        {selectedAsset.briefing.metrics.map((metric, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Index_{i + 1}</span>
                                                <span className="text-sm font-black text-white uppercase tracking-tighter italic">{metric}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className="mt-auto w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                    onClick={() => {
                                        // Trigger Global Neural Broadcast Simulation
                                        alert(`🚨 POLICY UPLINK ESTABLISHED. Deploying ${selectedAsset.title} Protocol.`);
                                    }}
                                >
                                    <Zap size={16} />
                                    <span>Deploy Protocol</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
