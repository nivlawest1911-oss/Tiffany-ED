'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    Brain, Flame,
    ArrowRight, Cpu, Network,
    Zap,
    Command,
    Target,
    Shield, Activity, LayoutDashboard, Video, BookOpen,
    Database, FileText, Mic
} from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/Cinematic';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { cn } from '@/lib/utils';
import { SmartHover } from '@/components/ui/SmartHover';
import { useSovereignState } from '@/context/SovereignState';

const NexusPalette = dynamic(() => import('@/components/intelligence/NexusPalette'), { ssr: false });

import { ExecutiveBrief } from '@/components/dashboard/zone1-executive-brief';

// AI Core Integrations
const AI_INTEGRATIONS = [
    { id: "vertex", name: "Google Vertex AI", provider: "Gemini 1.5 Pro", status: "PRIMARY CONNECTED", latency: "24ms", color: "from-blue-500/20 to-blue-900/40", accent: "text-blue-400", border: "border-blue-500/30", icon: Cpu, specs: { context: "1M Tokens", tps: "450 t/s", load: "34%" } },
    { id: "openai", name: "OpenAI API", provider: "GPT-4o & o1-mini", status: "STANDBY ACTIVE", latency: "45ms", color: "from-emerald-500/20 to-emerald-900/40", accent: "text-emerald-400", border: "border-emerald-500/30", icon: Brain, specs: { context: "128K Tokens", tps: "120 t/s", load: "12%" } },
    { id: "anthropic", name: "Anthropic API", provider: "Claude 3.5 Sonnet", status: "SYNTHESIS READY", latency: "38ms", color: "from-amber-500/20 to-amber-900/40", accent: "text-amber-400", border: "border-amber-500/30", icon: Network, specs: { context: "200K Tokens", tps: "95 t/s", load: "18%" } },
    { id: "heygen", name: "HeyGen Lab", provider: "Interactive Avatars", status: "STREAMING LIVE", latency: "89ms", color: "from-rose-500/20 to-rose-900/40", accent: "text-rose-400", border: "border-rose-500/30", icon: Video, specs: { context: "Stream", fps: "30fps", load: "RTC" } },
    { id: "xai", name: "xAI API", provider: "Grok-Beta", status: "REAL-TIME SYNC", latency: "12ms", color: "from-zinc-500/20 to-zinc-800/40", accent: "text-white", border: "border-white/30", icon: Zap, specs: { context: "128K Tokens", tps: "Fast", load: "Live" } },
    { id: "deepgram", name: "Deepgram API", provider: "Nova-2 Speech", status: "LISTENING", latency: "18ms", color: "from-cyan-500/20 to-cyan-900/40", accent: "text-cyan-400", border: "border-cyan-500/30", icon: Mic, specs: { context: "Audio", wps: "Live", load: "Nova-2" } },
    { id: "replicate", name: "Replicate", provider: "Flux Vision & Image", status: "GPU PROVISIONED", latency: "250ms", color: "from-purple-500/20 to-purple-900/40", accent: "text-purple-400", border: "border-purple-500/30", icon: Target, specs: { context: "H100 GPU", steps: "30", load: "Idle" } },
    { id: "supabase", name: "Supabase DB", provider: "PgVector + Auth", status: "VECTORS SYNCED", latency: "5ms", color: "from-emerald-600/20 to-emerald-950/40", accent: "text-emerald-500", border: "border-emerald-600/30", icon: Database, specs: { context: "Postgres", ops: "12K/s", load: "2%" } }
];

export const TOP_GENERATORS = [
    { id: "iep-architect", title: "IEP Narrative Architect", link: "/generators/iep-architect", desc: "Generate professional IEP drafts with SMART goals.", icon: FileText, color: "text-[#00d2ff]" },
    { id: "lesson-planner", title: "Lesson Planner Pro", link: "/generators/lesson-planner", desc: "Transform state standards into tiered lesson plans.", icon: BookOpen, color: "text-[#d946ef]" },
    { id: "data-analyzer", title: "Data Insight Analyst", link: "/generators/data-analyzer", desc: "Analyze student metrics to identify achievement gaps.", icon: Activity, color: "text-[#6366f1]" },
    { id: "behavior-coach", title: "Behavior Support Coach", link: "/generators/behavior-coach", desc: "FBA & BIP plans with positive reinforcement protocols.", icon: Brain, color: "text-[#ec4899]" },
    { id: "fiscal", title: "Grant Fiscal Analyst", link: "/generators/grant-compliance-auditor", desc: "Audit Title I spending ledger for compliance.", icon: Target, color: "text-[#8b5cf6]" },
    { id: "wellness", title: "Teacher Wellness", link: "/generators/teacher-wellness-guide", desc: "Strategies for avoiding burnout and restoring balance.", icon: Flame, color: "text-[#059669]" },
    { id: "schedule", title: "Master Schedule Optimizer", link: "/generators/schedule-optimizer", desc: "Optimize prep and intervention block times.", icon: LayoutDashboard, color: "text-[#6366f1]" },
    { id: "restorative", title: "Restorative Voice", link: "/generators/restorative-justice-guide", desc: "Scripts for conflict circles and de-escalation.", icon: Shield, color: "text-[#ea580c]" }
];

export default function TheRoomClient() {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { playClick } = useProfessionalSounds();
    const { onboardingData } = useSovereignState();
    const [showHandshake, setShowHandshake] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasHandshaken = localStorage.getItem('edintel_handshake_complete');
            if (onboardingData && !hasHandshaken) {
                setShowHandshake(true);
            }
        }
    }, [onboardingData]);

    const completeHandshake = () => {
        setShowHandshake(false);
        localStorage.setItem('edintel_handshake_complete', 'true');
        playClick();
    };

    const runOptimization = () => {
        setIsOptimizing(true);
        playClick();
        let step = 0;
        const interval = setInterval(() => {
            step += 25;
            setCurrentStep(step);
            if (step >= 100) {
                clearInterval(interval);
                setTimeout(() => setIsOptimizing(false), 1000);
            }
        }, 400);
    };

    return (
        <div className="content-stage relative min-h-screen pb-32 bg-[#020617] selection:bg-electric-cyan/30">
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,176,255,0.05)_0%,_transparent_50%)]" />

            <AnimatePresence>
                {isOptimizing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4"
                    >
                        <div className="max-w-md w-full p-8 border border-electric-cyan/30 rounded-[2rem] bg-[#020617] shadow-[0_0_100px_rgba(0,176,255,0.2)] text-center relative overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-1 bg-electric-cyan transition-all duration-300 w-[var(--progress-width)]" 
                                style={{ '--progress-width': `${currentStep}%` } as React.CSSProperties}
                            />
                            <Cpu className="w-16 h-16 text-electric-cyan mx-auto mb-6 animate-pulse" />
                            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Optimizing Sovereign Nodes</h3>
                            <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest leading-relaxed">Re-aligning AI cores and minimizing latency paths...</p>
                            <div className="mt-8 text-4xl font-black text-electric-cyan">{currentStep}%</div>
                        </div>
                    </motion.div>
                )}

                {/* Tactical Handshake Overlay - Phase 20 */}
                {showHandshake && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                    >
                        <div className="max-w-md w-full p-10 border border-noble-gold/30 rounded-[3rem] bg-[#020617] shadow-[0_0_100px_rgba(212,175,55,0.15)] text-center relative overflow-hidden">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-20 h-20 rounded-2xl bg-noble-gold/10 border border-noble-gold/20 flex items-center justify-center text-noble-gold mx-auto mb-8"
                            >
                                <Zap size={40} className="animate-pulse" />
                            </motion.div>

                            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Tactical Handshake</h2>
                            <p className="text-zinc-400 font-mono text-[8px] uppercase tracking-[0.2em] mb-8 leading-relaxed">
                                Universal Core Synchronization for <span className="text-noble-gold">{onboardingData?.districtName.toUpperCase() || 'SOVEREIGN USER'}</span> confirmed. AI Delegates standing by for mission initialization.
                            </p>

                            <button
                                onClick={completeHandshake}
                                className="w-full py-5 rounded-2xl bg-noble-gold text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                            >
                                Access Command Center
                            </button>

                            <div className="mt-8 flex justify-center gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">Neural Status: Synchronized</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <NexusCommandManager />

            <div className="max-w-[1600px] mx-auto px-6 pt-12 relative z-10">
                <div className="mb-12 min-h-[420px]">
                    <ExecutiveBrief />
                </div>

                {/* HEADER SECTION */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-electric-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                        >
                            <Network size={14} /> Sovereign Control Interface
                        </motion.div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-600">ROOM.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col gap-4 items-end">
                        <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            <button
                                onClick={runOptimization}
                                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                System: Optimal
                            </button>
                            <div>Latency: 9ms</div>
                            <div className="text-electric-cyan">Token Vol: 1.2M/hr</div>
                        </div>
                        <button
                            onClick={() => { window.dispatchEvent(new CustomEvent('open-nexus')); playClick(); }}
                            className="px-6 py-2 rounded-xl bg-electric-cyan text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,176,255,0.3)]"
                        >
                            <Command size={14} /> Nexus Command Hub
                        </button>
                    </div>
                </div>

                {/* --- AI CORE SYSTEM MANIFEST --- */}
                <div className="mb-8 flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">Active Intelligence Cores</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {AI_INTEGRATIONS.map((ai, i) => (
                        <motion.div
                            key={ai.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <button
                                onClick={() => { setActiveNode(ai.id); playClick(); setTimeout(() => setActiveNode(null), 1000); }}
                                className="w-full text-left h-full focus:outline-none"
                            >
                                <GlassCard className={cn("h-full min-h-[260px] p-6 relative overflow-hidden group border transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,176,255,0.15)]", ai.border, activeNode === ai.id && "scale-95 border-emerald-500 bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.3)]")}>
                                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity", ai.color)} />
                                    <div className="flex items-start justify-between mb-6 relative z-10">
                                        <div className={cn("p-3 rounded-xl bg-black/40", ai.accent)}>
                                            <ai.icon size={24} />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Latency</div>
                                            <div className="text-xs font-mono text-white">{ai.latency}</div>
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">{ai.name}</h3>
                                        <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", ai.accent)}>{ai.provider}</p>
                                    </div>

                                    {/* Data Output Matrix */}
                                    <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 relative z-10">
                                        {Object.entries(ai.specs).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">{key}</div>
                                                <div className="text-[10px] font-mono text-zinc-300">{val}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 relative z-10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">{ai.status}</span>
                                    </div>
                                </GlassCard>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* --- STRATEGIC GENERATORS DEPLOYMENT --- */}
                <div className="mb-8 flex items-center gap-4 mt-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">Rapid Tool Deployment</h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                    <Link href="/generators" className="text-[10px] font-black uppercase tracking-widest text-electric-cyan hover:text-white transition-colors flex items-center gap-2">
                        View All Tools <ArrowRight size={12} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
                    {TOP_GENERATORS.map((tool, i) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={tool.link} className="block h-full">
                                <GlassCard className="h-full min-h-[160px] p-6 border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group hover:scale-[1.02] active:scale-[0.98]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={cn("p-2.5 rounded-xl bg-black/40", tool.color)}>
                                            <tool.icon size={20} />
                                        </div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-electric-cyan transition-colors line-clamp-2">{tool.title}</h3>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed line-clamp-2">
                                        {tool.desc}
                                    </p>
                                    <div className="mt-6 flex justify-end">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-electric-cyan transition-colors flex items-center gap-1">
                                            Initialize <ArrowRight size={10} />
                                        </span>
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* FLOATING ACTION PALETTE TRIGGER */}
            <footer className="fixed bottom-12 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none">
                <SmartHover message="Nexus Command Hub: Press CMD+K to search all nodes.">
                    <motion.button
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        onClick={() => { window.dispatchEvent(new CustomEvent('open-nexus')); playClick(); }}
                        className="pointer-events-auto px-10 py-5 bg-[#020617]/90 backdrop-blur-lg border border-electric-cyan/20 rounded-2xl flex items-center gap-6 text-white hover:border-electric-cyan transition-all shadow-2xl group"
                    >
                        <div className="p-2.5 rounded-xl bg-electric-cyan text-black group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,176,255,0.4)]">
                            <Command size={20} />
                        </div>
                        <div className="text-left">
                            <span className="text-[10px] font-black text-electric-cyan uppercase tracking-[0.3em] block mb-1">Command Hub</span>
                            <span className="text-sm font-black uppercase tracking-widest block">Execute Protocol</span>
                        </div>
                        <div className="ml-4 px-2 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-600">
                            CMD + K
                        </div>
                    </motion.button>
                </SmartHover>
            </footer>
        </div>
    );
}

// --- SUB COMPONENTS ---

function NexusCommandManager() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        window.addEventListener('open-nexus', handleOpen);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('open-nexus', handleOpen);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && <NexusPalette onClose={() => setIsOpen(false)} />}
        </AnimatePresence>
    );
}

