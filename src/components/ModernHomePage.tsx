'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, Variants } from 'framer-motion';
import { ArrowRight, Activity, Cpu, Zap, Shield, Brain, Globe, Terminal, MessageSquare, Mic } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CORE_AVATARS } from '@/data/avatars';
import HumanAvatar from './ui/HumanAvatar';

// Core Components (Safe)
const FloatingNavbar = dynamic(() => import('./FloatingNavbar'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });
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
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </motion.div>
            <div
                className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 z-20"
                style={{ backgroundImage: "url('/grid.svg')" }}
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
                    style={{ width: p.size, height: p.size }}
                />
            ))}
        </div>
    );
}


// 3. LIVE INTERACTIVE TERMINAL (Simulates Chat)
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mt-8 relative z-30"
        >
            <form onSubmit={handleSubmit} className="relative group">
                {/* Glowing Border Animation */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 rounded-xl opacity-75 blur group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

                <div className="relative flex items-center bg-black backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                    <div className="pl-4 text-cyan-500 animate-pulse">
                        <Terminal size={20} />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type command to Dr. West..."
                        className="w-full bg-transparent border-none text-white px-4 py-5 focus:outline-none placeholder:text-zinc-600 font-mono text-sm tracking-wide"
                    />
                    <div className="flex items-center gap-2 pr-2">
                        <button
                            type="button"
                            onClick={() => setIsListening(!isListening)}
                            className={`p-2 rounded-lg transition-colors ${isListening ? 'bg-red-500/20 text-red-500' : 'hover:bg-white/10 text-zinc-400'}`}
                        >
                            <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
                        </button>
                        <button
                            type="submit"
                            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </form>
            {/* Typing Suggestions */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {['Generate Budget Report', 'Analyze IEP Compliance', 'Start Crisis Protocol'].map((cmd, i) => (
                    <button
                        key={i}
                        onClick={() => onCommand(cmd)}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap"
                    >
                        {cmd}
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
                className="relative w-full h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden border-2 border-cyan-500/20 shadow-[0_0_80px_rgba(6,182,212,0.15)] group"
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
                        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                        style={{ backgroundImage: "url('/noise.png')" }}
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
                                className="px-3 py-1 bg-black/60 backdrop-blur border border-cyan-500/30 rounded text-cyan-400 text-xs font-mono"
                            >
                                SIGNAL: STRONG
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
                                className="absolute top-1/2 left-8 right-8 md:right-1/3 bg-black/80 backdrop-blur-xl border-l-4 border-cyan-500 p-6 rounded-r-xl shadow-2xl"
                            >
                                <div className="text-xs text-cyan-500 font-bold mb-2 uppercase flex items-center gap-2">
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
                        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">{agent.role}</p>
                    </div>
                </div>

                {/* Scanning Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-[20%] pointer-events-none"
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
                    <FloatingNavbar />

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

                                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.85]">
                                        Animated<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 animate-gradient-x">
                                            Sovereignty
                                        </span>
                                    </motion.h1>

                                    <motion.p variants={fadeInUp} className="text-xl text-zinc-400 mb-8 max-w-lg leading-relaxed border-l-4 border-cyan-500 pl-6">
                                        Engage with the <span className="text-white font-bold">First Live-Action AI Matrix</span>.
                                        Type a command below to initiate a neural link with your autonomous cabinet.
                                    </motion.p>

                                    {/* INTERACTIVE TERMINAL */}
                                    <InteractiveTerminal onCommand={handleCommand} />

                                </motion.div>

                                {/* RIGHT: HOLOGRAPHIC DISPLAY */}
                                <div className="lg:col-span-7 relative">
                                    <HolographicHero activeAgent={activeAgentIndex} agents={CORE_AVATARS} message={agentMessage} />
                                </div>
                            </div>
                        </section>

                        {/* INFINITE MARQUEE */}
                        <section className="py-20 bg-black/50 border-y border-white/5 overflow-hidden backdrop-blur-sm relative z-20">
                            <div className="w-full overflow-hidden">
                                <motion.div
                                    className="flex gap-6 w-max"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                >
                                    {[...CORE_AVATARS, ...CORE_AVATARS].map((agent, i) => (
                                        <div key={i} className="w-[300px] h-[400px] rounded-2xl overflow-hidden relative border border-white/10 group bg-zinc-900">
                                            <HumanAvatar
                                                src={agent.avatar}
                                                alt={agent.name}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${['active', 'online'].includes(agent.status || '') ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                    <span className={`text-[10px] uppercase ${['active', 'online'].includes(agent.status || '') ? 'text-green-500' : 'text-amber-500'}`}>
                                                        {agent.status || 'Live'}
                                                    </span>
                                                </div>
                                                <p className="text-white font-bold text-lg">{agent.name}</p>
                                                <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">{agent.role}</p>
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
                                className="absolute inset-0 opacity-5"
                                style={{ backgroundImage: "url('/grid.svg')" }}
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
                                className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: "url('/grid.svg')" }}
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
                    <Footer />

                </>
            )}
        </div>
    );
}
