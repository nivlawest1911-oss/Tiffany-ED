'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, Variants } from 'framer-motion';
import { ArrowRight, Activity, Cpu, Zap, Shield, Brain, Globe, Terminal, MessageSquare, Mic, Clock, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CORE_AVATARS } from '@/data/avatars';
import HumanAvatar from './ui/HumanAvatar';

// Core Components (Safe)

const NeuralBackground = dynamic(() => import('./ui/NeuralBackground'), { ssr: false });

// New AI Enhancements
const AITwinGenerator = dynamic(() => import('./ai-twin-generator'), { ssr: false });
const BentoShowcase = dynamic(() => import('./BentoShowcase'), { ssr: false });
const OnboardingFlow = dynamic(() => import('./OnboardingFlow'), { ssr: false });
const VoiceIdentity = dynamic(() => import('./VoiceIdentity'), { ssr: false });
const HuggingFaceAvatar = dynamic(() => import('./HuggingFaceAvatar'), { ssr: false });
const SovereignCore = dynamic(() => import('./SovereignCore'), { ssr: false });

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

// --- COMPONENTS ---

// 1. CINEMATIC INTRO (Replaces BIOS Boot)
const SystemIntroVideo = dynamic(() => import('./SystemIntroVideo'), { ssr: false });

// 2. PARALLAX BACKGROUND (Follows Mouse)
function ParallaxBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = clientX - (typeof window !== 'undefined' ? window.innerWidth : 1000) / 2;
        const moveY = clientY - (typeof window !== 'undefined' ? window.innerHeight : 1000) / 2;
        mouseX.set(moveX * 0.05); // Sensitivity
        mouseY.set(moveY * 0.05);
    };

    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 bg-[#030303]/90 z-10" />
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                className="absolute inset-[-10%] w-[120%] h-[120%] bg-gradient-to-tr from-indigo-950/40 via-blue-900/10 to-indigo-950/40"
            >
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1s" />
                </div>
            </motion.div>
            <div
                className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 z-20 bg-grid"
            />
        </div>
    );
}

function ParticleField() {
    const [particles, setParticles] = useState<any[]>([]);
    useEffect(() => {
        setParticles(Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 10
        })));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white/20 rounded-full"
                    initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
                    animate={{ top: [`${p.y}%`, `${p.y - 20}%`], opacity: [0.2, 0] }}
                    transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
                    style={{ width: `${p.size}px`, height: `${p.size}px` }}
                />
            ))}
        </div>
    );
}


// 3. LIVE INTERACTIVE TERMINAL (Mission Control UX)
function InteractiveTerminal({ onCommand }: { onCommand: (cmd: string) => void }) {
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onCommand(input);
        setInput('');
    };

    return (
        <motion.div
            variants={fadeInUp}
            className="w-full max-w-xl mt-8 relative z-30 group"
        >
            {/* Scanline & Glow Overlay */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <form onSubmit={handleSubmit} className="relative group/form">
                {/* Dynamic Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />

                <div className="relative bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Interior Scanline */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />

                    <div className="flex items-center p-2">
                        <div className="flex items-center gap-3 pl-4">
                            <Terminal size={18} className="text-cyan-400 animate-pulse" />
                            <div className="h-4 w-px bg-white/10" />
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="INITIATE SOVEREIGN PROTOCOL..."
                            className="w-full bg-transparent border-none text-white px-4 py-5 focus:outline-none placeholder:text-zinc-600 font-mono text-sm tracking-[0.1em] uppercase transition-all"
                        />

                        <div className="flex items-center gap-2 pr-2">
                            <button
                                type="button"
                                title="Voice Input"
                                aria-label="Activate voice command"
                                onClick={() => setIsListening(!isListening)}
                                className={`p-3 rounded-xl transition-all duration-300 ${isListening
                                    ? 'bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
                                    : 'hover:bg-white/5 text-zinc-500 hover:text-white'
                                    }`}
                            >
                                <Mic size={20} />
                            </button>
                            <button
                                type="submit"
                                title="Execute Protocol"
                                aria-label="Execute sovereign protocol"
                                className="p-3 bg-gradient-to-br from-intel-gold to-amber-700 hover:from-white hover:to-zinc-300 text-black rounded-xl transition-all duration-300 font-black shadow-lg shadow-intel-gold/10 group-hover/form:scale-105 active:scale-95"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Tactical Suggestions */}
            <div className="flex gap-3 mt-5 overflow-x-auto pb-4 no-scrollbar scrollbar-hide">
                {[
                    { label: 'Fiscal Optimization', icon: Zap },
                    { label: 'Compliance Audit', icon: Shield },
                    { label: 'Strategy Matrix', icon: LayoutGrid }
                ].map((action, i) => (
                    <button
                        key={i}
                        onClick={() => onCommand(action.label)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white hover:border-white/20 transition-all whitespace-nowrap group/btn"
                    >
                        <action.icon size={12} className="text-intel-gold group-hover/btn:scale-110 transition-transform" />
                        {action.label}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

// 4. HOLOGRAPHIC HERO (Interactive)
function HolographicHero({ activeAgent, agents, message }: { activeAgent: number, agents: any[], message: string | null }) {
    const agent = agents[activeAgent];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeAgent}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden border-2 border-intel-gold/20 shadow-[0_0_80px_rgba(197,164,126,0.1)] group"
            >
                {/* VIDEO FEED */}
                <div className="absolute inset-0 bg-zinc-900">
                    {agent.video && agent.video !== '' && (
                        <video
                            autoPlay loop muted playsInline
                            key={agent.video}
                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[10s]"
                        >
                            <source src={agent.video} type="video/mp4" />
                        </video>
                    )}
                    {/* Fallback Image if Video Missing */}
                    {(!agent.video || agent.video === '') && (
                        <HumanAvatar
                            src={agent.avatar}
                            alt={agent.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                    )}
                    {/* Digital Noise Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* HOLOGRAPHIC UI OVERLAY */}
                <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                className="px-3 py-1 bg-black/60 backdrop-blur border border-intel-gold/30 rounded text-intel-gold text-xs font-mono"
                            >
                                SIGNAL: STABLE
                            </motion.div>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                                className="px-3 py-1 bg-black/60 backdrop-blur border border-purple-500/30 rounded text-purple-400 text-xs font-mono"
                            >
                                ENCRYPTION: AES-256
                            </motion.div>
                        </div>
                        <Activity className="text-cyan-500 animate-pulse" />
                    </div>

                    {/* Chat Response Overlay */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-1/2 left-8 right-8 md:right-1/3 bg-black/80 backdrop-blur-xl border-l-4 border-intel-gold p-6 rounded-r-xl shadow-2xl"
                            >
                                <div className="text-xs text-intel-gold font-bold mb-2 uppercase flex items-center gap-2">
                                    <MessageSquare size={12} /> Response from {agent.name.split(' ')[1]}
                                </div>
                                <p className="text-white text-lg md:text-xl font-light leading-relaxed">
                                    "{message}"
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Info */}
                    <div className="space-y-2">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
                        >
                            {agent.name}
                        </motion.h2>
                        <p className="text-intel-gold font-mono text-sm tracking-widest uppercase">{agent.role}</p>
                    </div>
                </div>

                {/* Scanning Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(197,164,126,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-intel-gold/10 to-transparent h-[20%] pointer-events-none"
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </AnimatePresence>
    );
}

// 5. MAIN PAGE
export default function ModernHomePage() {
    const [mounted, setMounted] = useState(false);
    const [booted, setBooted] = useState(false);
    const [activeAgentIndex, setActiveAgentIndex] = useState(0);
    const [agentMessage, setAgentMessage] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check for first-time visitor
        const onboarded = localStorage.getItem('onboarding_complete');
        if (!onboarded) {
            // Delay onboarding until after boot sequence usually, or just check here
            // We'll trigger it after a short delay
            setTimeout(() => setShowOnboarding(true), 3000);
        }
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => setMounted(true), []);

    // Auto-rotate unless interacting
    useEffect(() => {
        if (agentMessage) return; // Don't rotate if reading message
        const timer = setInterval(() => { setActiveAgentIndex(prev => (prev + 1) % CORE_AVATARS.length); }, 8000);
        return () => clearInterval(timer);
    }, [agentMessage]);

    const handleCommand = (cmd: string) => {
        setAgentMessage(`Accessing ${cmd} protocol...`);

        // Immediate routing
        if (cmd.toLowerCase().includes('budget')) router.push('/generators/fiscal-strategist');
        else if (cmd.toLowerCase().includes('iep')) router.push('/generators/iep-architect');
        else router.push('/generators');
    };



    if (!mounted) return null;

    return (
        <>
            <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans overflow-auto selection:bg-cyan-500/30">
                <AnimatePresence>
                    {!booted && <SystemIntroVideo onComplete={() => setBooted(true)} />}
                </AnimatePresence>

                {booted && (
                    <>
                        <ParallaxBackground />
                        <motion.div style={{ opacity: scaleX }}>
                            <NeuralBackground />
                        </motion.div>
                        <ParticleField />
                        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 z-[100] origin-left" style={{ scaleX }} />


                        <main className="relative z-10 pt-24 pb-24">
                            {/* HERO SECTION */}
                            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 max-w-[1700px] mx-auto">
                                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                    {/* LEFT: CONTROL INTERFACE */}
                                    <motion.div
                                        className="lg:col-span-5 relative z-20"
                                        initial="hidden" animate="visible" variants={staggerContainer}
                                    >
                                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                                            <div className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 text-xs font-mono flex items-center gap-2">
                                                <Globe size={12} className="animate-spin-slow" />
                                                CONNECTED TO MAINNET
                                            </div>
                                        </motion.div>

                                        <motion.h1 variants={fadeInUp} className="text-7xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.8] italic text-gold-gradient">
                                            Sovereign OS
                                        </motion.h1>

                                        <motion.div variants={fadeInUp} className="relative mb-10">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-intel-gold to-transparent" />
                                            <p className="text-2xl text-white/90 font-light leading-relaxed pl-8 italic max-w-xl">
                                                "Strategic architectures for the modern educator. Empowering leadership through superior intelligence and executive automation."
                                            </p>
                                        </motion.div>

                                        <motion.p variants={fadeInUp} className="text-zinc-500 mb-10 max-w-md leading-relaxed pl-8 text-sm uppercase tracking-widest font-bold">
                                            Reclaiming instructional time through <span className="text-intel-gold">spatial logistics</span> & high-fidelity AI components.
                                        </motion.p>

                                        {/* INTERACTIVE TERMINAL */}
                                        <InteractiveTerminal onCommand={handleCommand} />

                                        {/* Neural Metric Grid - NEW Addictive Element */}
                                        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {[
                                                { label: 'Neural Throughput', value: '4.2 TB/s', icon: Zap, color: 'text-cyan-400' },
                                                { label: 'Strategic Accuracy', value: '99.98%', icon: Brain, color: 'text-indigo-400' },
                                                { label: 'Labor Hours Saved', value: '14,204+', icon: Clock, color: 'text-emerald-400' },
                                            ].map((stat, i) => (
                                                <motion.div
                                                    key={i}
                                                    variants={fadeInUp}
                                                    className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md group hover:border-intel-gold/20 transition-all"
                                                >
                                                    <stat.icon size={16} className={`${stat.color} mb-2 animate-pulse`} />
                                                    <div className="text-xl font-black text-white">{stat.value}</div>
                                                    <div className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">{stat.label}</div>
                                                </motion.div>
                                            ))}
                                        </div>

                                    </motion.div>

                                    {/* RIGHT: HOLOGRAPHIC DISPLAY */}
                                    <div className="lg:col-span-7 relative">
                                        <HolographicHero activeAgent={activeAgentIndex} agents={CORE_AVATARS} message={agentMessage} />
                                    </div>
                                </div>
                            </section>

                            {/* GLOBAL NEURAL FEED - NEW High-Engagement Marquee */}
                            <section className="bg-black/80 border-y border-intel-gold/10 py-4 relative z-30 overflow-hidden">
                                <div className="flex gap-12 animate-marquee whitespace-nowrap whitespace-nowrap">
                                    {[
                                        "IEP AGENT-7: GENERATING COMPLIANCE ARCHITECTURE...",
                                        "FISCAL CORE: DETECTING REVENUE OPTIMIZATION OPPORTUNITIES...",
                                        "CRISIS MODULE-4: MONITORING DISTRICT SENTIMENT TRENDS...",
                                        "SOVEREIGN SYNC: UPDATING ALABAMA LEGISLATIVE ALERTS...",
                                        "NEURAL CORE: 1.5 PB OF EDUCATIONAL DATA INDEXED",
                                        "EXECUTIVE OVERRIDE: READY FOR STRATEGIC DEPLOYMENT",
                                    ].map((protocol, i) => (
                                        <div key={i} className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-intel-gold/40">
                                            <div className="w-1.5 h-1.5 rounded-full bg-intel-gold animate-ping" />
                                            {protocol}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* INFINITE MARQUEE */}
                            <section className="py-20 bg-black/50 border-b border-white/5 overflow-hidden backdrop-blur-sm relative z-20">
                                <div className="w-full overflow-hidden">
                                    <motion.div
                                        className="flex gap-6 w-max"
                                        animate={{ x: ["0%", "-50%"] }}
                                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                    >
                                        {[...CORE_AVATARS, ...CORE_AVATARS].map((agent, i) => (
                                            <div key={i} className="w-[300px] h-[400px] rounded-3xl overflow-hidden relative border border-white/10 group bg-zinc-900 shadow-2xl">
                                                <HumanAvatar
                                                    src={agent.avatar}
                                                    alt={agent.name || 'AI Avatar'}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                                <div className="absolute bottom-6 left-6">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className={`w-2 h-2 rounded-full animate-pulse ${['active', 'online'].includes(agent.status || '') ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                        <span className={`text-[10px] font-black uppercase tracking-wider ${['active', 'online'].includes(agent.status || '') ? 'text-green-500' : 'text-amber-500'}`}>
                                                            {agent.status || 'Live'}
                                                        </span>
                                                    </div>
                                                    <p className="text-white font-black text-2xl uppercase tracking-tighter italic gold-gradient-text">{agent.name}</p>
                                                    <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-[0.3em] font-black">{agent.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </section>

                            {/* AI TWIN GENERATOR SECTION */}
                            <AITwinGenerator />

                            {/* VOICE IDENTITY SHOWCASE */}
                            <section className="py-24 bg-zinc-900 border-y border-white/5 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 opacity-5 bg-grid"
                                />
                                <div className="max-w-7xl mx-auto px-6 relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="mb-12 text-center"
                                    >
                                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                            Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Identity</span> Matrix
                                        </h2>
                                        <p className="text-zinc-400">Secure biometric voice authentication and synthesis.</p>
                                    </motion.div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <VoiceIdentity src="/voice-profiles/principal_voice.wav" label="Dr. West - Executive" />
                                        <VoiceIdentity src="/voice-profiles/counselor_voice.wav" label="Sarah - Analytics" />
                                        <VoiceIdentity src="/voice-profiles/compliance_voice.wav" label="Patrice - Compliance" />
                                    </div>
                                </div>
                            </section>

                            {/* HUGGING FACE AVATAR SHOWCASE */}
                            <section className="py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"
                                />
                                <div className="max-w-7xl mx-auto px-6 relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="mb-12 text-center"
                                    >
                                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                            Neural <span className="text-indigo-500">Voice Synthesis</span>
                                        </h2>
                                        <p className="text-zinc-400">Powered by Hugging Face Inference API</p>
                                    </motion.div>

                                    <div className="grid md:grid-cols-3 gap-8">
                                        <HuggingFaceAvatar
                                            textToSpeak="Welcome to EdIntel, Superintendent. All systems are operational."
                                            name="Dr. Alvin West"
                                            role="Superintendent"
                                            className="aspect-[4/5]"
                                        />
                                        <HuggingFaceAvatar
                                            textToSpeak="Compliance protocols have been updated for the 2026 fiscal year."
                                            avatarUrl="/images/avatars/executive_leader.png"
                                            name="Patrice"
                                            role="Compliance Officer"
                                            className="aspect-[4/5]"
                                        />
                                        <HuggingFaceAvatar
                                            textToSpeak="Student performance data indicates a 15% increase in STEM engagement."
                                            avatarUrl="/images/avatars/sarah_connors_premium.png"
                                            name="Sarah"
                                            role="Data Analyst"
                                            className="aspect-[4/5]"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* BENTO SHOWCASE */}
                            <section id="features">
                                <BentoShowcase />
                            </section>

                            {/* ONBOARDING MODAL */}
                            <AnimatePresence>
                                {showOnboarding && (
                                    <div className="fixed inset-0 z-[200]">
                                        <OnboardingFlow onCompleteAction={() => setShowOnboarding(false)} />
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* SOVEREIGN CORE SHOWCASE */}
                            <section id="sovereign" className="py-24 relative overflow-hidden bg-black/90">
                                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-black to-black opacity-50" />
                                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="mb-16"
                                    >
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
                                            <Zap size={14} className="text-amber-400 fill-amber-400" />
                                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Powered by SOVEREIGN AI</span>
                                        </div>
                                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Sovereign</span> Core
                                        </h2>
                                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12">
                                            The absolute nexus of educational intelligence. Transforming raw institutional data into a crystalline matrix of actionable protocols.
                                        </p>
                                    </motion.div>

                                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="h-[500px] relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/50 backdrop-blur-3xl shadow-2xl shadow-amber-500/5"
                                        >
                                            <SovereignCore />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="text-left space-y-8"
                                        >
                                            {[
                                                { title: "Universal Ledger", desc: "Every administrative decision tracked in a secure, immutable data architecture.", icon: Shield },
                                                { title: "Neural Synthesis", desc: "Cross-departmental data merged into a single, cohesive institutional intelligence.", icon: Brain },
                                                { title: "Autonomous Protocols", desc: "Auto-generating compliance reports and budget projections in real-time.", icon: Cpu },
                                            ].map((feature, i) => (
                                                <div key={i} className="flex gap-6 group">
                                                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 group-hover:rotate-6">
                                                        <feature.icon size={28} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                                                        <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="pt-8">
                                                <Link href="/sovereign">
                                                    <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-black uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-3">
                                                        Enter the Matrix
                                                        <ArrowRight size={20} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </section>

                            {/* CTA / PRICING ANCHOR */}
                            <section id="pricing" className="relative py-40 overflow-hidden flex items-center justify-center">
                                <div className="relative z-10 text-center max-w-4xl px-4">
                                    <Link href="/signup">
                                        <button className="relative px-16 py-8 bg-white text-black font-black uppercase tracking-widest text-xl hover:bg-cyan-400 transition-all shadow-[0_0_50px_rgba(255,255,255,0.4)] group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            <span className="relative">Initiate Protocol Omega</span>
                                        </button>
                                    </Link>
                                </div>
                            </section>
                        </main>

                    </>
                )}
            </div>
            <style jsx global>{`
            @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
            }
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
            .italic {
                font-style: italic;
            }
            .gold-gradient-text {
                background: linear-gradient(to bottom, #E5C158 0%, #D4AF37 50%, #B8860B 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            }
            @keyframes tilt {
                0%, 50%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(0.5deg); }
                75% { transform: rotate(-0.5deg); }
            }
            .animate-tilt {
                animation: tilt 10s infinite linear;
            }
            @keyframes scanline {
                0% { top: 0; }
                100% { top: 100%; }
            }
            .animate-scanline {
                animation: scanline 4s linear infinite;
            }
        `}</style>
        </>
    );
}
