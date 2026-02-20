'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, HandCoins, Flame,
    ArrowRight, Globe, Cpu, Network,
    Zap, X, Github, Cloud,
    Terminal, Command, Search,
    Eye, Target,
    ChevronRight, Shield, GraduationCap,
    Dumbbell, Activity, LayoutDashboard, Video
} from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { THE_ROOM_HERO } from '@/lib/assets';
import { GlassCard } from '@/components/ui/Cinematic';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { cn } from '@/lib/utils';
import { PROTOCOL_REGISTRY } from '@/data/unifiedRegistry';
import { SmartHover } from '@/components/ui/SmartHover';

// Extended Command Center Data with Metrics & Actions
const commandCenters = [
    {
        id: "wisdom-archive",
        title: "Wisdom Archive",
        subtitle: "Specialized AI Advisors",
        description: "Access deep-knowledge advisors focused on Philosophy, History, and Future Trends.",
        icon: Brain,
        color: "from-indigo-900 to-purple-900",
        accent: "text-indigo-400",
        link: "/generators?category=wisdom",
        metrics: { activeAgents: 12, queries: "1.2k", load: "Optimal" },
        quickActions: [
            { label: "Consult Historian", action: "consult_history" },
            { label: "Future Scenario", action: "future_cast" }
        ]
    },
    {
        id: "leadership-forge",
        title: "The Leadership Forge",
        subtitle: "Strategy & Economic Growth",
        description: "Tools for district fiscal strategy, capital optimization, and operational excellence.",
        icon: HandCoins,
        color: "from-emerald-900 to-teal-900",
        accent: "text-emerald-400",
        link: "/generators?category=forge",
        metrics: { activeFrameworks: 8, reportGen: "Fast", efficiency: "+15%" },
        quickActions: [
            { label: "Draft Fiscal Strategy", action: "fiscal_draft" },
            { label: "Optimize Capital", action: "cap_opt" }
        ]
    },
    {
        id: "healing-nexus",
        title: "Healing Nexus",
        subtitle: "Wellness & Identity",
        description: "Trauma-informed protocols and identity restoration nodes.",
        icon: Flame,
        color: "from-red-900 to-orange-950",
        accent: "text-rose-400",
        link: "/generators?category=healing",
        metrics: { facilitators: 5, sessions: "Active", sentiment: "Positive" },
        quickActions: [
            { label: "Launch Restoration", action: "restore_protocol" },
            { label: "Staff Wellness Check", action: "wellness_check" }
        ]
    },
    {
        id: "global-academy",
        title: "Global Academy",
        subtitle: "Visual Knowledge explains",
        description: "Original series and story-based curricula. Any topic becomes a high-fidelity video lesson.",
        icon: Globe,
        color: "from-blue-900 to-indigo-950",
        accent: "text-blue-400",
        link: "/generators?category=global",
        metrics: { channels: 8, streaming: "Live", bandwidth: "Ultra" },
        quickActions: [
            { label: "Create Lesson", action: "create_lesson" },
            { label: "Browse Catalog", action: "browse_catalog" }
        ]
    },
    {
        id: "relational-mastery",
        title: "Relational Mastery",
        subtitle: "Tiffany-ED Interface",
        description: "Relational Bank management, predictive scaffolding, and restorative protocol tools.",
        icon: Target,
        color: "from-emerald-900 to-emerald-950",
        accent: "text-emerald-500",
        link: "/tiffany-ed",
        metrics: { deposits: 142, alerts: 2, mood: "Optimal" },
        quickActions: [
            { label: "Log Interaction", action: "log_interaction" },
            { label: "Check Deposits", action: "check_deposits" }
        ]
    }
];

export default function TheRoomClient() {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [quickActionModal, setQuickActionModal] = useState<{ title: string, action: string } | null>(null);
    const [isNexusOpen, setIsNexusOpen] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { playClick } = useProfessionalSounds();

    // Mission Control Data
    const agents = [
        { id: 'observer', name: 'The Observer', role: 'Vision Analysis', status: 'running', icon: Eye, color: 'text-blue-400', message: 'Scanning engagement patterns...' },
        { id: 'analyst', name: 'The Analyst', role: 'Pattern Recognition', status: 'running', icon: Brain, color: 'text-purple-400', message: 'Detecting student history trends...' },
        { id: 'strategist', name: 'The Strategist', role: 'Strategic Planning', status: 'waiting', icon: Target, color: 'text-emerald-400', message: 'Awaiting findings...' }
    ];

    // Infrastructure Data
    const infra = [
        { icon: Github, label: "GitHub Ent.", status: "Connected", accent: "text-white" },
        { icon: Cloud, label: "Vertex AI", status: "Optimized", accent: "text-blue-400" },
        { icon: Zap, label: "Vercel Edge", status: "Live", accent: "text-amber-500" }
    ];

    const runOptimization = () => {
        setIsOptimizing(true);
        playClick();
        let step = 0;
        const interval = setInterval(() => {
            step += 20;
            setCurrentStep(step);
            if (step >= 100) {
                clearInterval(interval);
                setTimeout(() => setIsOptimizing(false), 1000);
            }
        }, 300);
    };

    return (
        <main className="content-stage relative min-h-screen pb-32 selection:bg-indigo-500/30">
            {/* Global Nexus Command Palette Overlay */}
            <AnimatePresence>
                {isNexusOpen && (
                    <NexusPalette onClose={() => setIsNexusOpen(false)} />
                )}
            </AnimatePresence>

            {/* Context Modal for Quick Actions */}
            <AnimatePresence>
                {quickActionModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-lg"
                        >
                            <GlassCard className="p-8 relative">
                                <button
                                    title="Close Modal"
                                    onClick={() => setQuickActionModal(null)}
                                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                                        <Zap size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                        Initialize: {quickActionModal.title}
                                    </h3>
                                </div>
                                <p className="text-zinc-400 mb-8">
                                    Confirm initialization of this executive protocol. This will deploy specialized agents to draft your request.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setQuickActionModal(null)}
                                        className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button className="flex-1 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all">
                                        Execute
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        <Network size={14} /> Executive Insight Interface
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <SmartHover message="Access the global command palette for system-wide operations.">
                            <button
                                onClick={() => { setIsNexusOpen(true); playClick(); }}
                                className="px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all"
                            >
                                <Command size={12} /> Nexus Command Hub
                            </button>
                        </SmartHover>
                        {/* Live Ticker */}
                        <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                System Optimal
                            </div>
                            <div>Threads: 42</div>
                            <div>Latency: 12ms</div>
                        </div>
                    </div>
                </div>

                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                    The EdIntel<br />
                    <span className="text-indigo-500">Room.</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-7">
                        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                            Thought becoming form. You are inside the next-generation learning network where strategic intelligence generates its own systems.
                        </p>
                    </div>

                    {/* INFRASTRUCTURE MATRIX - Unified from CloudCommandCenter */}
                    <div className="lg:col-span-5 grid grid-cols-3 gap-4">
                        {infra.map((item, i) => (
                            <div key={i} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                                <item.icon size={16} className={`${item.accent} mb-2`} />
                                <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">{item.label}</div>
                                <div className="text-[10px] font-bold text-white uppercase tracking-tight">{item.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MISSION CONTROL SWARM - Unified from MissionControl */}
            <section className="py-12 border-y border-white/5 bg-black/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em]">Multi-Agent Swarm Monitor</h2>
                        <div className="text-zinc-500 font-mono text-[10px] uppercase">Mainnet v4.2</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {agents.map((agent) => (
                            <div key={agent.id} className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/20 transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white group-hover:scale-110 transition-transform">
                                            <agent.icon size={20} className={agent.color} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white tracking-tight">{agent.name}</div>
                                            <div className="text-[9px] text-zinc-500 uppercase tracking-widest">{agent.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-tighter">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        {agent.status}
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[9px] text-zinc-400 overflow-hidden">
                                    <span className="text-indigo-400"># neural_ops &gt;</span> {agent.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divine Strategic Map - Interactive Grid */}
            <section className="py-12 px-6 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {commandCenters.map((node, i) => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                            onMouseEnter={() => setActiveNode(node.id)}
                            onMouseLeave={() => setActiveNode(null)}
                        >
                            {/* Card Container */}
                            <div className={`glass-panel-premium relative h-full p-10 rounded-[3rem] transition-all duration-500 overflow-hidden ${activeNode === node.id ? 'border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.1)]' : 'hover:border-white/20'
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${node.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Node Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 text-white transition-transform duration-500 ${activeNode === node.id ? 'scale-110 rotate-3' : ''}`}>
                                        <node.icon size={32} className={activeNode === node.id ? node.accent : 'text-white'} />
                                    </div>

                                    {/* Real-time Metrics on Hover */}
                                    <div className={`flex flex-col items-end gap-1 text-[10px] font-mono tracking-widest uppercase transition-all duration-500 ${activeNode === node.id ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-2'}`}>
                                        {Object.entries(node.metrics).map(([key, value]) => (
                                            <div key={key} className="flex gap-2 text-zinc-400">
                                                <span>{key}:</span>
                                                <span className={node.accent}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Node Content */}
                                <div>
                                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 transition-colors ${activeNode === node.id ? node.accent : 'text-zinc-500'}`}>{node.subtitle}</h3>
                                    <h2 className="text-4xl font-black text-white mb-6 tracking-tight uppercase group-hover:text-white transition-colors">
                                        {node.title}
                                    </h2>
                                    <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors mb-8">
                                        {node.description}
                                    </p>
                                </div>

                                {/* Quick Actions Overlay */}
                                <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ${activeNode === node.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    {node.quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setQuickActionModal({ title: action.label, action: action.action });
                                            }}
                                            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all"
                                        >
                                            <Zap size={12} className={node.accent} /> {action.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Navigate Action */}
                                <Link href={node.link} className={`absolute bottom-10 right-10 flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-all ${activeNode === node.id ? 'opacity-0 translate-y-4' : 'opacity-100 text-white'}`}>
                                    Enter Node <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Creation Engine Section */}
            <section className="py-32 px-6 border-y border-white/5 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
                            <Cpu size={14} /> Media Synthesis Studio
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            Thought becoming <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Form.</span>
                        </h2>
                        <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
                            Our Synthesis Studio transforms abstract strategy into high-fidelity visual media. Every advisor and system is synthesized to ensure your district's vision and identity are amplified.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="text-3xl font-black text-white mb-1">∞</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Capacity</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">ZERO</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Stock Media</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full aspect-square relative rounded-[3rem] overflow-hidden border border-white/5 group">
                        <NextImage
                            src={THE_ROOM_HERO}
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt="Strategic Creation"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="text-xs font-mono text-white tracking-widest uppercase">Engine Operational</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SYSTEM OPTIMIZATION TERMINAL - NEW Integration */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-xs font-black uppercase tracking-widest mb-8">
                            <Zap size={14} /> Production Efficiency
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none italic font-serif">
                            Optimization <br />
                            <span className="text-zinc-600">Protocol.</span>
                        </h2>
                        <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10 italic">
                            Automate the calibration of institutional resources. Our engine synchronizes BigQuery data vectors and Vertex AI TPU-v5 pods to ensure sub-10ms strategic delivery.
                        </p>
                        <button
                            onClick={runOptimization}
                            disabled={isOptimizing}
                            className="group relative px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-all disabled:opacity-50"
                        >
                            {isOptimizing ? 'Calibrating...' : 'Trigger Global Audit'}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="bg-black border border-white/10 rounded-3xl p-8 h-[400px] overflow-hidden relative shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <Terminal size={16} className="text-emerald-500" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">EdIntel CLI Terminal</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                </div>
                            </div>

                            <div className="space-y-4 font-mono text-[10px] text-zinc-500">
                                <div className="flex gap-4">
                                    <span className="text-zinc-700">01</span>
                                    <span className="text-emerald-500">edintel init --production</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-zinc-700">02</span>
                                    <span>[SYSTEM] Calibrating VPC routes... OK</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-zinc-700">03</span>
                                    <span>[GCP] Mounting TPU Pods (us-central1)... OK</span>
                                </div>
                                {isOptimizing && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                        <span className="text-zinc-700">04</span>
                                        <span className="text-white animate-pulse">OPTIMIZING_NEURAL_WEIGHTS... {currentStep}%</span>
                                    </motion.div>
                                )}
                                {currentStep === 100 && (
                                    <div className="text-emerald-400 font-black mt-4">SYSTEM READY: MISSION DEPLOYED.</div>
                                )}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                                <motion.div
                                    className="h-full bg-indigo-500"
                                    animate={{ width: `${currentStep}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEXUS PALETTE COMPONENT - NEW Inner Component */}
            <footer className="fixed bottom-12 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none">
                <SmartHover message="Nexus Command Hub: The central nervous system for platform navigation. Query any tool or node with lightning speed.">
                    <motion.button
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        onClick={() => { setIsNexusOpen(true); playClick(); }}
                        className="pointer-events-auto px-8 py-4 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4 text-white hover:border-indigo-500 transition-all shadow-2xl group"
                    >
                        <div className="p-2 rounded-lg bg-indigo-600 text-white group-hover:scale-110 transition-transform">
                            <Command size={20} />
                        </div>
                        <div className="text-left">
                            <div className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Nexus Command Hub</div>
                            <div className="text-xs font-bold uppercase tracking-widest">Execute Protocol</div>
                        </div>
                        <div className="ml-4 px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-500">
                            CMD + K
                        </div>
                    </motion.button>
                </SmartHover>
            </footer>
        </main>
    );
}

// --- SUB COMPONENTS ---

function NexusPalette({ onClose }: { onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const { playClick, playHover } = useProfessionalSounds();
    const router = useRouter();

    const staticActions = [
        { id: 'vault', title: 'Open Sovereign Vault', icon: Shield, color: 'text-cyan-400', link: '/vault' },
        { id: 'academy', title: 'Cognitive Academy', icon: GraduationCap, color: 'text-indigo-500', link: '/academy' },
        { id: 'gym', title: 'Cognitive Gym', icon: Dumbbell, color: 'text-emerald-500', link: '/gym' },
        { id: 'insights', title: 'Professional Insights', icon: Activity, color: 'text-rose-500', link: '/ledger' },
        { id: 'admin', title: 'Site Command', icon: LayoutDashboard, color: 'text-amber-500', link: '/admin' },
        { id: 'studio', title: 'Studio Griot', icon: Video, color: 'text-purple-500', link: '/studio' },
        { id: 'relational', title: 'Relational Mastery CMD', icon: Target, color: 'text-emerald-500', link: '/the-room' },
        { id: 'dashboard', title: 'Mission Control Dashboard', icon: LayoutDashboard, color: 'text-white', link: '/the-room' },
    ];

    const registryActions = PROTOCOL_REGISTRY.map(p => ({
        id: p.id,
        title: `Launch: ${p.name}`,
        icon: p.icon,
        color: 'text-noble-gold',
        link: (p as any).link || `/generators/${p.id}`
    }));

    const actions = [...staticActions, ...registryActions];
    const filtered = actions.filter((a: any) => a.title.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
                <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-zinc-950/50">
                    <Search size={20} className="text-indigo-500" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="ENTER STRATEGIC COMMAND..."
                        className="w-full bg-transparent border-none text-white font-black uppercase tracking-widest text-sm outline-none placeholder:text-zinc-700"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] text-zinc-500 font-mono">ESC</div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-1">
                    {filtered.map((action: any, i: number) => (
                        <button
                            key={action.id}
                            className={cn(
                                "w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all group",
                                i === activeIndex ? "bg-indigo-600 text-white" : "hover:bg-white/5 text-zinc-500"
                            )}
                            onMouseEnter={() => { setActiveIndex(i); playHover(); }}
                            onClick={() => { playClick(); router.push(action.link); onClose(); }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn("p-2 rounded-lg bg-black/40", i === activeIndex ? "text-white" : action.color)}>
                                    <action.icon size={18} />
                                </div>
                                <div className="font-bold text-sm tracking-tight">{action.title}</div>
                            </div>
                            {i === activeIndex && <ChevronRight size={14} className="opacity-50" />}
                        </button>
                    ))}
                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                            No matching protocols detected.
                        </div>
                    )}
                </div>
                <div className="p-4 bg-zinc-950/50 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                    <div>↑↓ To Navigate | Enter to Execute</div>
                    <div className="text-indigo-500 animate-pulse">Sovereign Link Verified</div>
                </div>
            </motion.div>
        </div>
    );
}

