'use client';

import React, { useState, useEffect, useRef, Suspense, startTransition } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, Variants, LazyMotion, domAnimation, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Shield, Brain, Globe, Terminal, Mic, Clock, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CORE_AVATARS } from '@/data/avatars';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/context/AuthContext';
const ActivationIntro = dynamic(() => import('./landing/ActivationIntro'), { ssr: false });
const CinematicLogoIntro = dynamic(() => import('./CinematicLogoIntro').then(mod => mod.CinematicLogoIntro), { ssr: false });
const ReadyToActivateCTA = dynamic(() => import('./landing/ReadyToActivateCTA'), { 
    ssr: true, // SSR enabled for content visibility (Phase 14)
    loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl" />
});
const EdIntelHero = dynamic(() => import('./edintel-core/EdIntelHero').then(mod => mod.EdIntelHero), { 
    ssr: true,
    loading: () => <div className="h-screen w-full animate-pulse bg-white/5" />
});
const EdIntelCore = dynamic(() => import('./edintel-core/EdIntelCore'), { 
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-white/10 rounded-3xl border border-white/5" />
});
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import HumanAvatar from './ui/HumanAvatar';
import VisualDefer from './shared/VisualDefer';
import Footer from './Footer';

// Core Components (Safe)
const HolographicBackground = dynamic(() => import('./holographic/HolographicBackground').then(mod => mod.HolographicBackground), { ssr: false });
const NeuralBackground = dynamic(() => import('./ui/NeuralBackground'), { ssr: false });

// New AI Enhancements
const AITwinGenerator = dynamic(() => import('./ai-twin-generator'), { 
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-white/5 rounded-3xl" />
});
const BentoShowcase = dynamic(() => import('./BentoShowcase'), { 
    ssr: false,
    loading: () => <div className="h-screen w-full animate-pulse bg-white/5" />
});
const OnboardingFlow = dynamic(() => import('./OnboardingFlow'), { ssr: false });
const VoiceIdentity = dynamic(() => import('./VoiceIdentity'), { ssr: false });
const HuggingFaceAvatar = dynamic(() => import('./HuggingFaceAvatar'), { ssr: false });

const DistrictIntelligenceScore = dynamic(() => import('./landing/DistrictIntelligenceScore'), { ssr: false });
const PlatformActivity = dynamic(() => import('./landing/PlatformActivity'), { ssr: false });
const FounderDossier = dynamic(() => import('./founder-dossier'), { ssr: false });

/**
 * ⚡ Performance Controller: Background Layer
 * Ensures we only run one heavy background effect at a time.
 */
const SovereignBackground = ({ type = 'neural' }: { type?: 'neural' | 'holographic' }) => {
    return (
        <div className="fixed inset-0 -z-20 pointer-events-none">
            {type === 'neural' ? <NeuralBackground /> : <HolographicBackground />}
        </div>
    );
};

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

/**
 * ⚡ Performance Wrapper: Defer rendering of heavy components until they enter the viewport.
 * Reduces TBT (Total Blocking Time) and initial hydration overhead.
 */
const LazySection = ({ children, className, id, height = "400px", margin = "200px" }: { children: React.ReactNode, className?: string, id?: string, height?: string, margin?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: margin as any });

    return (
        <section ref={ref} id={id} className={cn("relative", className)} style={{ minHeight: height }}>
            {isInView ? children : <div style={{ height }} />}
        </section>
    );
}

// --- COMPONENTS ---

// 1. CINEMATIC INTRO (Replaces BIOS Boot)



// 3. LIVE INTERACTIVE TERMINAL (Mission Control UX)
function InteractiveTerminal({ onCommand }: { onCommand: (cmd: string) => void }) {
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const { isSystemThinking } = useEdIntelVibe();

    useEffect(() => {
        if (!isListening) return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech recognition not supported in this browser.");
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev ? prev + ' ' + transcript : transcript);
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => setIsListening(false);

        try {
            recognition.start();
        } catch (e) {
            console.error("Speech recognition start failed:", e);
            setIsListening(false);
        }

        return () => recognition.stop();
    }, [isListening]);

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
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sovereign-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <form onSubmit={handleSubmit} className="relative group/form">
                {/* Dynamic Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 via-[#C5A02E]/20 to-[#B68F25]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-1000" />

                <div className={cn(
                    "relative bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500",
                    isSystemThinking && "border-sovereign-gold/30 shadow-sovereign-gold/5"
                )}>
                    {/* Interior Scanline */}
                    <div className={cn(
                        "absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20",
                        isSystemThinking && "opacity-40"
                    )} />

                    <div className="flex items-center p-2">
                        <div className="flex items-center gap-3 pl-4">
                            <Terminal size={18} className="text-electric-cyan animate-pulse" />
                            <div className="h-4 w-px bg-white/10" />
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="INITIATE EdIntel PROTOCOL..."
                            aria-label="EdIntel command input"
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
                                aria-label="Execute EdIntel protocol"
                                className="p-3 bg-gradient-to-br from-[#D4AF37] to-[#C5A02E] hover:from-white hover:to-electric-cyan text-black rounded-xl transition-all duration-300 font-black shadow-lg shadow-[#D4AF37]/10 group-hover/form:scale-105 active:scale-95"
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
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white hover:border-white/20 transition-all whitespace-nowrap group/btn active:scale-95"
                    >
                        <action.icon size={12} className="text-electric-cyan group-hover/btn:scale-110 transition-transform" />
                        {action.label}
                    </button>
                ))}
            </div>
        </motion.div >
    );
}



// 5. MAIN PAGE
export default function ModernHomePage() {
    const [isMounted, setMounted] = useState(false);
    const [booted, setBooted] = useState(false);
    const [isLowPowerMode, setIsLowPowerMode] = useState(false);
    const [showCinematicIntro, setShowCinematicIntro] = useState(true);
    const [activeAgentIndex, setActiveAgentIndex] = useState(0);
    const [agentMessage, setAgentMessage] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { isSystemThinking, setSystemThinking } = useEdIntelVibe();
    const router = useRouter();
    const { user } = useAuth();
    const isSignedIn = !!user;

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // Detect mobile or reduced motion preference
        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setIsLowPowerMode(isMobile || prefersReducedMotion);
    }, []);

    useEffect(() => {
        // Check for first-time visitor (only on client)
        if (typeof window === 'undefined') return;
        
        try {
            // PERFORMANCE MODE: Instant bypass (Phase 14)
            const params = new URLSearchParams(window.location.search);
            if (params.get('nosplash') === 'true' || params.get('perf') === 'true') {
                setShowCinematicIntro(false);
                setBooted(true);
                setMounted(true);
                return;
            }

            // RADICAL PERFORMANCE: Skip intros for returning visitors (Phase 14)
            const introSeen = localStorage.getItem('edintel_intro_seen');
            if (introSeen === 'true') {
                setShowCinematicIntro(false);
                setBooted(true);
            }

            // Check for first-time visitor
            const onboarded = localStorage.getItem('onboarding_complete');
            if (!onboarded) {
                // Delay onboarding until after boot sequence completes (Phase 14 Optimization)
                setTimeout(() => setShowOnboarding(true), 5.0 * 1000); 
            }
        } catch (e) {
            // localStorage may not be available
            console.error("Storage error:", e);
        }
    }, []);

    const handleIntroComplete = () => {
        localStorage.setItem('edintel_intro_seen', 'true');
        setShowCinematicIntro(false);
    };

    const handleBootComplete = () => {
        localStorage.setItem('edintel_intro_seen', 'true');
        startTransition(() => setBooted(true));
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => setMounted(true), []);

    // Auto-rotate unless interacting
    useEffect(() => {
        if (agentMessage || isSystemThinking) return; // Don't rotate if reading message or thinking
        const timer = setInterval(() => { setActiveAgentIndex(prev => (prev + 1) % CORE_AVATARS.length); }, 8000);
        return () => clearInterval(timer);
    }, [agentMessage, isSystemThinking]);

    const handleCommand = async (cmd: string) => {
        setSystemThinking(true);
        setAgentMessage(`Accessing ${cmd} protocol...`);

        // Check for quick routing commands
        if (cmd.toLowerCase().includes('budget') || cmd.toLowerCase().includes('fiscal') || cmd.toLowerCase().includes('optimization')) {
            setTimeout(() => {
                setSystemThinking(false);
                router.push('/ai-hub/fiscal-strategist');
            }, 1000);
            return;
        }

        if (cmd.toLowerCase().includes('iep')) {
            setTimeout(() => {
                setSystemThinking(false);
                router.push('/dashboard/iep-architect');
            }, 1000);
            return;
        }

        if (cmd.toLowerCase().includes('audit') || cmd.toLowerCase().includes('compliance')) {
            setTimeout(() => {
                setSystemThinking(false);
                router.push('/ai-hub/legal-defense');
            }, 1000);
            return;
        }

        if (cmd.toLowerCase().includes('matrix')) {
            setTimeout(() => {
                setSystemThinking(false);
                router.push('/dashboard');
            }, 1000);
            return;
        }

        // Generic AI Chat via existing /api/chat route
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: cmd }],
                    avatarName: CORE_AVATARS[activeAgentIndex].name,
                    avatarRole: CORE_AVATARS[activeAgentIndex].role,
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            if (!response.body) throw new Error('No body in response');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedMessage = '';

            setAgentMessage(''); // Clear loading text to start streaming

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedMessage += chunk;
                setAgentMessage(accumulatedMessage);
            }
        } catch (error) {
            console.error('[Terminal AI Error]:', error);
            setAgentMessage("I encountered an error connecting to the neural network. Please try again.");
        } finally {
            setSystemThinking(false);
            // Keep the message visible for a short time before auto-clearing
            setTimeout(() => {
                setAgentMessage(null);
            }, 8000);
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className={cn(
                "min-h-screen bg-[#020617] text-zinc-100 font-sans overflow-auto selection:bg-electric-cyan/30 transition-colors duration-1000",
                isSystemThinking && "bg-[#05060f]"
            )}>
                <AnimatePresence>
                    {showCinematicIntro && (
                        <CinematicLogoIntro 
                            onComplete={handleIntroComplete}
                            autoClose={true}
                            autoCloseDuration={3000}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!booted && <ActivationIntro onCompleteAction={handleBootComplete} />}
                </AnimatePresence>

                {/* CONSOLIDATED BACKGROUND ARCHITECTURE (Phase 14 Optimization) */}
                {isMounted && booted && !isLowPowerMode && (
                    <Suspense fallback={null}>
                        <SovereignBackground type={isSystemThinking ? 'holographic' : 'neural'} />
                    </Suspense>
                )}
                {isMounted && booted && isLowPowerMode && (
                    <div className="fixed inset-0 -z-20 bg-gradient-to-b from-slate-950 to-black opacity-50" />
                )}

                {booted && (
                    <>
                        <motion.div style={{ opacity: scaleX }}>
                             {/* Neural background removed from here as it's now in SovereignBackground */}
                        </motion.div>
                        <motion.div
                            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-cyan via-blue-500 to-sovereign-gold z-[100] origin-left"
                            style={{
                                scaleX,
                                boxShadow: isSystemThinking ? '0 0 20px rgba(0, 176, 255, 0.5)' : 'none'
                            }}
                        />


                        <div className="relative z-10 pt-20 md:pt-24 pb-24">
                            {/* HERO SECTION */}
                            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 max-w-[1700px] mx-auto">
                                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                    {/* LEFT: CONTROL INTERFACE */}
                                    <motion.div
                                        className="lg:col-span-5 relative z-20"
                                        initial="hidden" animate="visible" variants={staggerContainer}
                                    >
                                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                                            <div className={cn(
                                                "px-3 py-1 bg-black/40 backdrop-blur-md border border-white/5 rounded text-zinc-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-500",
                                                isSystemThinking && "border-electric-cyan/40 text-electric-cyan bg-electric-cyan/5"
                                            )}>
                                                <Globe size={12} className={cn("transition-transform duration-500", isSystemThinking ? "animate-spin" : "animate-spin-slow")} />
                                                {isSystemThinking ? "EXECUTING PROTOCOLS..." : "CONNECTED TO MAINNET"}
                                            </div>
                                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className={cn(
                                "text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter leading-[0.9] md:leading-[0.8] italic transition-all duration-1000 break-words w-full",
                                isSystemThinking ? "opacity-40 scale-95 blur-[2px]" : "cyan-gradient-text"
                            )}
                        >
                                            EdIntel Professional
                                        </motion.h1>


                                        <motion.div variants={fadeInUp} className="relative mb-10">
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-cyan to-transparent"
                                                animate={isSystemThinking ? { height: ["0%", "100%", "0%"] } : { height: "100%" }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed pl-6 md:pl-8 italic max-w-xl">
                                                "Strategic architectures for the modern educator. Empowering leadership through superior intelligence and executive automation."
                                            </p>

                                        </motion.div>

                                        <motion.p variants={fadeInUp} className="text-zinc-500 mb-10 max-w-md leading-relaxed pl-6 md:pl-8 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black">
                                            Reclaiming instructional time through <span className="text-electric-cyan">spatial logistics</span> & high-fidelity AI components.
                                        </motion.p>


                                        {/* Thinking Feedback for Hero Content */}
                                        {isSystemThinking && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-electric-cyan shadow-[0_0_20px_rgba(0,176,255,0.8)]"
                                            />
                                        )}

                                         {/* INTERACTIVE TERMINAL - DEFERRED (Phase 14) */}
                                         <Suspense fallback={<div className="h-32 w-full animate-pulse bg-white/5 rounded-2xl mt-8" />}>
                                            <InteractiveTerminal onCommand={handleCommand} />
                                         </Suspense>

                                         {/* Neural Metric Grid - NEW Addictive Element */}
                                         <VisualDefer height="150px">
                                             <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                                                 {React.useMemo(() => [
                                                     { label: 'Neural Throughput', value: '4.2 TB/s', icon: Zap, color: 'text-cyan-400' },
                                                     { label: 'Strategic Accuracy', value: '99.98%', icon: Brain, color: 'text-indigo-400' },
                                                     { label: 'Labor Hours Saved', value: '14,204+', icon: Clock, color: 'text-emerald-400' },
                                                 ].map((stat, i) => (
                                                     <motion.div
                                                         key={i}
                                                         variants={fadeInUp}
                                                         className="p-4 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md group hover:border-electric-cyan/20 transition-all shadow-xl"
                                                     >
                                                         <stat.icon size={16} className="text-electric-cyan mb-2 animate-pulse" />
                                                         <div className="text-xl font-black text-white italic">{stat.value}</div>
                                                         <div className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">{stat.label}</div>
                                                     </motion.div>
                                                 )), [])}
                                             </div>
                                         </VisualDefer>

                                    </motion.div>

                                    {/* RIGHT: HOLOGRAPHIC DISPLAY */}
                                    <div className="lg:col-span-7 relative">
                                        <EdIntelHero variant="holographic" activeAgent={activeAgentIndex} agents={CORE_AVATARS} message={agentMessage} />
                                    </div>
                                </div>
                            </section>

                            {/* GLOBAL NEURAL FEED - NEW High-Engagement Marquee */}
                            <LazySection id="neural-feed" height="60px">
                                <section className={cn(
                                    "bg-black/80 border-y border-electric-cyan/10 py-4 relative z-30 overflow-hidden transition-all duration-700",
                                    isSystemThinking && "border-electric-cyan/40 shadow-[0_0_30px_rgba(0,176,255,0.15)]"
                                )}>
                                    <div className={cn(
                                        "flex gap-12 animate-marquee whitespace-nowrap transform-gpu",
                                        isSystemThinking && "animate-marquee-fast"
                                    )}>
                                        {[
                                            "IEP AGENT-7: GENERATING COMPLIANCE ARCHITECTURE...",
                                            "FISCAL CORE: DETECTING REVENUE OPTIMIZATION OPPORTUNITIES...",
                                            "CRISIS MODULE-4: MONITORING DISTRICT SENTIMENT TRENDS...",
                                            "Edintel SYNC: UPDATING ALABAMA LEGISLATIVE ALERTS...",
                                            "NEURAL CORE: 1.5 PB OF EDUCATIONAL DATA INDEXED",
                                            "EXECUTIVE OVERRIDE: READY FOR STRATEGIC DEPLOYMENT",
                                        ].map((protocol, i) => (
                                            <div key={i} className={cn(
                                                "flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] transition-colors duration-500",
                                                isSystemThinking ? "text-electric-cyan" : "text-electric-cyan/40"
                                            )}>
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full bg-electric-cyan",
                                                    isSystemThinking ? "animate-pulse" : "animate-ping"
                                                )} />
                                                {protocol}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </LazySection>

                            {/* INFINITE MARQUEE - OPTIMIZED */}
                            <LazySection id="infinite-marquee" height="400px">
                                <section className="py-20 bg-black/50 border-b border-white/5 overflow-hidden backdrop-blur-sm relative z-20">
                                    <div className="w-full overflow-hidden">
                                        <motion.div
                                            className="flex gap-6 w-max transform-gpu"
                                            animate={{ x: ["0%", "-50%"] }}
                                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                        >
                                            {/* Reduced redundant instances for performance (Phase 14) */}
                                            {CORE_AVATARS.slice(0, isLowPowerMode ? 4 : 8).concat(CORE_AVATARS.slice(0, isLowPowerMode ? 4 : 8)).map((agent, i) => (
                                                <div key={i} className="w-[200px] h-[280px] sm:w-[260px] sm:h-[360px] md:w-[300px] md:h-[400px] rounded-3xl overflow-hidden relative border border-white/10 group bg-zinc-900 shadow-2xl flex-shrink-0">
                                                    <HumanAvatar
                                                        src={agent.avatar}
                                                        alt={agent.name || 'AI Avatar'}
                                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                                    <div className="absolute bottom-6 left-6">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className={`w-2 h-2 rounded-full animate-pulse ${['active', 'online'].includes(agent.status || '') ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                            <span className={`text-[10px] font-black uppercase tracking-wider ${['active', 'online'].includes(agent.status || '') ? 'text-green-500' : 'bg-amber-500'}`}>
                                                                {agent.status || 'Live'}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-white font-black text-2xl uppercase tracking-tighter italic cyan-gradient-text">{agent.name}</h3>
                                                        <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-[0.3em] font-black">{agent.role}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                </section>
                            </LazySection>

                            {/* AI TWIN GENERATOR SECTION */}
                            <LazySection id="twin-generator" height="500px">
                                <AITwinGenerator />
                            </LazySection>

                            {/* VOICE IDENTITY SHOWCASE */}
                            <LazySection id="voice-matrix" className="py-24 bg-zinc-900 border-y border-white/5 overflow-hidden">
                                <div className="absolute inset-0 opacity-5 bg-grid" />
                                <div className="max-w-7xl mx-auto px-6 relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="mb-12 text-center"
                                    >
                                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                            Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Identity</span> Matrix
                                        </h2>
                                        <p className="text-zinc-400 font-medium tracking-wide">Secure biometric voice authentication and synthesis.</p>
                                    </motion.div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <VoiceIdentity src="/voice-profiles/principal_voice.wav" label="Dr. West - Executive" />
                                        <VoiceIdentity src="/voice-profiles/counselor_voice.wav" label="Sarah - Analytics" />
                                        <VoiceIdentity src="/voice-profiles/compliance_voice.wav" label="Patrice - Compliance" />
                                    </div>
                                </div>
                            </LazySection>

                            {/* HUGGING FACE AVATAR SHOWCASE */}
                            <LazySection id="neural-speech" className="py-24 bg-zinc-950 border-y border-white/5 overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-opacity%3D%22.05%22%2F%3E%3C%2Fsvg%3E')]" />
                                <div className="max-w-7xl mx-auto px-6 relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="mb-12 text-center"
                                    >
                                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                            Neural <span className="text-indigo-500">Voice Synthesis</span>
                                        </h2>
                                        <p className="text-zinc-400 font-medium tracking-wide">Powered by Hugging Face Inference API</p>
                                    </motion.div>

                                    <div className="grid md:grid-cols-3 gap-8">
                                        <HuggingFaceAvatar
                                            textToSpeak="Welcome to Edintel, Superintendent. All systems are operational."
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
                            </LazySection>

                            {/* BENTO SHOWCASE */}
                            <LazySection id="features" height="100vh">
                                <BentoShowcase />
                            </LazySection>

                            {/* SYSTEM PERFORMANCE */}
                            <LazySection id="performance-matrix" className="py-24 px-6 max-w-7xl mx-auto">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                                        System <span className="text-electric-cyan">Performance</span> Matrix
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <DistrictIntelligenceScore />
                                    <PlatformActivity />
                                </div>
                            </LazySection>

                            {/* FOUNDER DOSSIER */}
                            <LazySection id="founder" className="py-24 bg-zinc-950/50 border-y border-white/5 overflow-hidden">
                                <div className="max-w-7xl mx-auto px-6 relative z-10">
                                    <div className="text-center mb-16">
                                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                            Architect of <span className="text-sovereign-gold">EdIntel Protocol</span>
                                        </h2>
                                    </div>
                                    <FounderDossier />
                                </div>
                            </LazySection>

                            {/* ONBOARDING MODAL */}
                            <AnimatePresence>
                                {showOnboarding && (
                                    <div className="fixed inset-0 z-[200]">
                                        <OnboardingFlow onCompleteAction={() => setShowOnboarding(false)} />
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* EdIntel CORE SHOWCASE */}
                            <LazySection id="EdIntel" height="800px">
                                <section className="py-24 relative overflow-hidden bg-black/90">
                                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-black to-black opacity-50" />
                                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="mb-16"
                                        >
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
                                                <Zap size={14} className="text-electric-cyan fill-electric-cyan" />
                                                <span className="text-[10px] font-bold text-electric-cyan uppercase tracking-widest">Powered by EdIntel AI</span>
                                            </div>
                                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-600">EdIntel Professional</span> Core
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
                                                className="h-[600px] relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/50 backdrop-blur-md shadow-2xl shadow-amber-500/5"
                                            >
                                                <EdIntelCore phase="ready" />
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
                                                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-electric-cyan group-hover:bg-electric-cyan group-hover:text-black transition-all duration-500 group-hover:rotate-6">
                                                            <feature.icon size={28} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-cyan transition-colors">{feature.title}</h3>
                                                            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="pt-8">
                                                    {isSignedIn ? (
                                                        <Link 
                                                            href="/the-room"
                                                            className="inline-flex items-center justify-center font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 holographic-button shadow-holographic px-6 py-3 text-lg uppercase tracking-wider gap-3"
                                                        >
                                                            Return to Control
                                                            <ArrowRight size={20} />
                                                        </Link>
                                                    ) : (
                                                        <Link 
                                                            href={`${ROUTES.LOGIN}?mode=signup`}
                                                            className="inline-flex items-center justify-center font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 holographic-button shadow-holographic px-6 py-3 text-lg uppercase tracking-wider gap-3"
                                                        >
                                                            Activate Core
                                                            <ArrowRight size={20} />
                                                        </Link>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </section>
                            </LazySection>

                            {/* READY TO ACTIVATE CTA */}
                            <ReadyToActivateCTA />
                        </div>
                        <Footer />
                    </>
                )}
            </div>
        </LazyMotion>
    );
}
