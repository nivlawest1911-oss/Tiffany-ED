import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Cpu, Zap, MessageSquare, Send, X, Terminal, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AIAgentAvatar from '@/components/shared/AIAgentAvatar';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import { cn } from '@/lib/utils';
import { INTELLIGENCE_MAP, getIntelligenceFor } from '@/lib/intelligence-engine';
import { useRouter } from 'next/navigation';

// ONBOARDING DATA (State Machine)
const ONBOARDING_SEQUENCE: Record<string, { content: string, chips: { id: string, label: string, next?: string }[] }> = {
    'welcome': {
        content: 'Executive Onboarding initiated. I am the EdIntel Professional Delegate, your neural interface for district transformation. Which objective shall we prioritize?',
        chips: [
            { id: 'IEP Architect', label: 'Compliance Audit', next: 'compliance' },
            { id: 'Lesson Planner', label: 'Curriculum Foundry', next: 'curriculum' },
            { id: 'Video Studio', label: 'Leadership Media', next: 'media' }
        ]
    },
    'compliance': {
        content: 'Compliance Protocol: The IEP Architect synthesizes student data into legally robust signatures. Shall we calibrate a draft student profile?',
        chips: [
            { id: 'IEP Architect', label: 'Execute IEP' },
            { id: 'risk-analyzer', label: 'Risk Audit', next: 'welcome' }
        ]
    },
    'curriculum': {
        content: 'Curriculum Strategy: The Lesson Planner leverages swarm-intelligence to generate ALSDE-compliant trajectories. Ready to build?',
        chips: [
            { id: 'Lesson Planner', label: 'Open Foundry' },
            { id: 'Video Studio', label: 'Media Export', next: 'media' }
        ]
    },
    'media': {
        content: 'Leadership Media: Video Studio captures the district vision. Would you like to check the AI Avatar gallery first?',
        chips: [
            { id: 'Video Studio', label: 'Launch Studio' },
            { id: 'dashboard', label: 'Avatar Gallery' }
        ]
    }
};

export function EdIntelDelegate() {
    const router = useRouter();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [activeProtocolChip, setActiveProtocolChip] = useState<{ id: string, title: string, role: string, payload?: any, nextStep?: string } | null>(null);
    const [onboardingStep, setOnboardingStep] = useState<string | null>(null);
    const [predictedActions, setPredictedActions] = useState<{ id: string, title: string }[]>([]);
    const abortControllerRef = useRef<AbortController | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { isSystemThinking, setSystemThinking } = useEdIntelVibe();

    // Memoize the last assistant message to avoid O(N) findLast on every render
    const lastAssistantMessage = React.useMemo(() => {
        return messages.findLast(m => m.role === 'assistant')?.content || "";
    }, [messages]);

    // Constant stats avoid recreation on every render
    const STATS = React.useMemo(() => [
        { icon: Shield, title: 'Compliance', val: '99.9%', color: 'text-noble-gold' },
        { icon: Zap, title: 'Latency', val: '12ms', color: 'text-amber-400' },
        { icon: Globe, title: 'Network', val: 'Secure', color: 'text-noble-gold/80' },
        { icon: Cpu, title: 'Neural Core', val: 'v1.5-Pro', color: 'text-amber-500' }
    ], []);

    // Sync local thinking state to global system pulse
    useEffect(() => {
        setSystemThinking(isThinking);
    }, [isThinking, setSystemThinking]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isThinking, activeProtocolChip]);

    // Cancel in-flight requests if component unmounts
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            setSystemThinking(false);
        };
    }, [setSystemThinking]);

    const handleSend = useCallback(async () => {
        if (!chatInput.trim()) return;

        const input = chatInput.trim();

        // 1. QUICK COMMAND PARSER (Bypasses LLM for instant system functions)
        if (input.startsWith('/')) {
            const command = input.slice(1).toLowerCase();
            setMessages(prev => [...prev, { role: 'user', content: input }]);
            setChatInput('');

            let systemResponse = '';
            if (command === 'vault') systemResponse = 'EdIntel Vault: Accessing encrypted logs... Compliance check: 100%.';
            else if (command === 'audit') systemResponse = 'System Audit: Neural core v1.5-Pro stable. Latency: 12ms.';
            else if (command === 'wellness') systemResponse = 'Wellness Check: Biometrics stable. Decision fatigue markers: Low.';
            else if (command === 'help') {
                systemResponse = `EdIntel Executive Protocols:
/vault - Security & Access Logs
/audit - Neural Performance Metrics
/wellness - Executive Biometrics
/features - Intelligence Node Catalog
/sync - Global Neural Calibration
/onboard - Executive Workflow Initiation

Intelligence Coverage:
- Compliance Architect: [SYNCED]
- Curriculum Strategist: [SYNCED]
- Institutional Memory: [SYNCED]`;
            }
            else if (command === 'features') {
                const nodes = Object.keys(INTELLIGENCE_MAP).slice(0, 5).join(', ');
                systemResponse = `EdIntel Swarm Nodes discovered: ${nodes}... and 12+ others. Use the Command Deck for full access.`;
            }
            else if (command === 'sync') {
                systemResponse = 'Global Neural Sync initiated... Calibrating all Swarm nodes to current leadership vibe.';
                setSystemThinking(true);
                setTimeout(() => setSystemThinking(false), 3000);
            }
            else if (command === 'onboard') {
                const step = ONBOARDING_SEQUENCE['welcome'];
                setOnboardingStep('welcome');
                setMessages(prev => [...prev, { role: 'assistant', content: step.content }]);
                setActiveProtocolChip({
                    id: step.chips[0].id,
                    title: step.chips[0].label,
                    role: 'Protocol Guide',
                    nextStep: step.chips[0].next
                });
                return;
            }
            else systemResponse = `Unknown Protocol: ${command}. Type /help for available options.`;

            setMessages(prev => [...prev, { role: 'assistant', content: systemResponse }]);
            return;
        }

        // Standard AI Processing
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setChatInput('');
        setIsThinking(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    protocolContext: 'EdIntel Professional Delegate Dashboard Interface'
                }),
                signal: controller.signal
            });

            if (!response.ok) throw new Error('Neural Link Severed');

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No stream');

            const decoder = new TextDecoder();
            let assistantContent = '';

            // OPTIMIZED STREAMING: Single state update to add the empty assistant message
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                assistantContent += chunk;

                // OPTIMIZED STREAMING: Update only the last message content
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastIndex = newMessages.length - 1;
                    if (newMessages[lastIndex].role === 'assistant') {
                        newMessages[lastIndex] = { ...newMessages[lastIndex], content: assistantContent };
                    }
                    return newMessages;
                });
            }

            // INTELLIGENCE FUSION: Protocol Auto-Detection with Payload Support
            const protocolMatch = assistantContent.match(/\[PROTOCOL:\s*([^{]+)(?:\s*({.*}))?\]/);
            if (protocolMatch) {
                const protocolId = protocolMatch[1].trim();
                const payloadStr = protocolMatch[2];
                let payload = null;

                if (payloadStr) {
                    try {
                        payload = JSON.parse(payloadStr);
                    } catch (e) {
                        console.error('Failed to parse protocol payload:', e);
                    }
                }

                const intelligence = getIntelligenceFor(protocolId);
                if (intelligence) {
                    setActiveProtocolChip({
                        id: protocolId,
                        title: intelligence.title,
                        role: intelligence.role,
                        payload: payload || undefined
                    });

                    // PREDICTIVE INTELLIGENCE: Suggest next steps
                    if (intelligence.suggestedNext) {
                        setPredictedActions(intelligence.suggestedNext.map(id => ({
                            id,
                            title: getIntelligenceFor(id)?.title || id
                        })));
                    }
                }
            } else {
                setActiveProtocolChip(null);
                setPredictedActions([]);
            }

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Neural Link Aborted');
                return;
            }
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection Interrupted. Neural safeguards active.' }]);
        } finally {
            setIsThinking(false);
            abortControllerRef.current = null;
        }
    }, [chatInput, messages, setSystemThinking]);

    return (
        <section className={cn(
            "py-12 md:py-24 relative overflow-hidden transition-colors duration-1000",
            isSystemThinking ? "bg-zinc-950" : "bg-slate-950"
        )}>
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className={cn(
                    "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] transition-colors duration-1000",
                    isSystemThinking
                        ? "from-noble-gold/10 via-zinc-950 to-black"
                        : "from-blue-900/10 via-slate-950 to-slate-950"
                )} />
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03]" />
                <div className={cn(
                    "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-noble-gold/30 to-transparent",
                    isSystemThinking && "animate-pulse"
                )} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Avatar Viewport */}
                    <div className="lg:col-span-5 relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <motion.div
                            animate={{
                                scale: [1, 1.01, 1],
                                transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black"
                        >
                            <AIAgentAvatar
                                textToSpeak={lastAssistantMessage}
                                className="w-full h-full"
                            />

                            {/* HUD CORNER BRACKETS */}
                            <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                                {/* Top Left */}
                                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-noble-gold/30" />
                                {/* Top Right */}
                                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-noble-gold/30" />
                                {/* Bottom Left */}
                                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-noble-gold/30" />
                                {/* Bottom Right */}
                                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-noble-gold/30" />

                                {/* COORDINATE READOUTS */}
                                <div className="absolute bottom-20 left-8 flex flex-col gap-1">
                                    <motion.span
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="text-[8px] font-mono text-noble-gold/60 tracking-tighter"
                                    >
                                        LAT: 30.6954° N
                                    </motion.span>
                                    <motion.span
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                        className="text-[8px] font-mono text-noble-gold/60 tracking-tighter"
                                    >
                                        LONG: 88.0431° W
                                    </motion.span>
                                </div>
                            </div>

                            {/* Overlay UI */}
                            <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-noble-gold animate-pulse shadow-[0_0_8px_rgba(197,164,126,0.8)]" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">EdIntel Node #001</span>
                            </div>

                            <button
                                onClick={() => setIsChatOpen(!isChatOpen)}
                                title="Open Intelligence Interface"
                                aria-label="Open Intelligence Interface"
                                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-noble-gold text-black shadow-[0_0_30px_rgba(197,164,126,0.2)] hover:scale-110 hover:shadow-noble-gold/40 active:scale-95 transition-all group/btn"
                            >
                                <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Interface & Stats */}
                    <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
                        <div>
                            <Badge className="mb-4 bg-noble-gold/10 text-noble-gold border-noble-gold/20 px-3 py-1 uppercase tracking-widest">GENESIS PROTOCOL ACTIVE</Badge>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6 uppercase">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-amber-200">EdIntel Professional</span> Delegate
                            </h2>
                            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                                Your autonomous executive extension. Trained on district policy, legislative statutes, and your unique leadership rhetoric.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((stat, i) => (
                                <div key={i} className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <stat.icon className={cn("w-5 h-5 mb-3", stat.color)} />
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.title}</div>
                                    <div className="text-lg md:text-xl font-bold text-white mt-1">{stat.val}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button
                                onClick={() => setIsChatOpen(true)}
                                size="lg"
                                className="w-full md:w-auto rounded-full px-10 bg-noble-gold text-black hover:bg-amber-100 font-black uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(197,164,126,0.2)]"
                            >
                                Initiate Tactical Uplink
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide-out Chat Panel */}
            <AnimatePresence>
                {isChatOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsChatOpen(false);
                                setMessages([]);
                                setActiveProtocolChip(null);
                            }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: 400 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 400 }}
                            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 z-[101] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* HUD Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/40 relative overflow-hidden">
                                <div className="scanline animate-scan opacity-20" />
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-noble-gold/10 border border-noble-gold/30 flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-noble-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold tracking-tight text-lg">EdIntel Professional Delegate</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-[0.2em]">Neural Link: Active</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setIsChatOpen(false);
                                        setActiveProtocolChip(null);
                                    }}
                                    className="text-zinc-500 hover:text-white"
                                >
                                    <X size={20} />
                                </Button>
                            </div>

                            {/* Status Bar */}
                            <div className="px-6 py-3 bg-zinc-950/50 border-b border-white/5 grid grid-cols-4 gap-2">
                                {STATS.map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex items-center gap-1">
                                            <stat.icon size={10} className={stat.color} />
                                            <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-widest">{stat.title}</span>
                                        </div>
                                        <div className="text-[10px] text-zinc-400 font-bold">{stat.val}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Chat Feed */}
                            <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
                            >
                                {messages.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-4 px-8">
                                        <Terminal size={48} className="text-noble-gold" />
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-1">Awaiting Command Input</p>
                                            <p className="text-xs font-mono">System initialized. Neural nodes standing by for executive directive.</p>
                                        </div>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={i}
                                        className={cn(
                                            "flex flex-col max-w-[85%]",
                                            msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                        )}
                                    >
                                        <span className="text-[9px] text-zinc-600 font-mono mb-1 uppercase tracking-widest">
                                            {msg.role === 'user' ? 'Executive' : 'EdIntel Professional Delegate'}
                                        </span>
                                        <div className={cn(
                                            "p-4 rounded-2xl text-sm leading-relaxed relative overflow-hidden",
                                            msg.role === 'user'
                                                ? "bg-noble-gold text-black rounded-tr-none font-medium"
                                                : "bg-noble-gold/5 border border-noble-gold/10 text-zinc-300 rounded-tl-none"
                                        )}>
                                            {msg.role === 'assistant' && <div className="scanline animate-scan opacity-10" />}
                                            {msg.content.replace(/\[PROTOCOL:\s*[^\]]+\]/, '').trim()}
                                        </div>
                                    </motion.div>
                                ))}
                                {isThinking && (
                                    <div className="flex justify-start">
                                        <div className="bg-noble-gold/5 border border-noble-gold/10 p-4 rounded-2xl rounded-tl-none flex gap-1 relative overflow-hidden">
                                            <div className="scanline animate-scan opacity-20" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-noble-gold" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-noble-gold" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-noble-gold" />
                                        </div>
                                    </div>
                                )}

                                {/* Protocol Recommendation Chip */}
                                <AnimatePresence>
                                    {activeProtocolChip && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="mt-4 p-4 rounded-xl bg-gradient-to-r from-noble-gold/20 to-amber-900/20 border border-noble-gold/40 shadow-2xl relative overflow-hidden group cursor-pointer"
                                            onClick={() => {
                                                if (activeProtocolChip.nextStep) {
                                                    const nextStepId = activeProtocolChip.nextStep;
                                                    const step = ONBOARDING_SEQUENCE[nextStepId];
                                                    if (step) {
                                                        setOnboardingStep(nextStepId);
                                                        setMessages(prev => [...prev, { role: 'assistant', content: step.content }]);
                                                        setActiveProtocolChip({
                                                            id: step.chips[0].id,
                                                            title: step.chips[0].label,
                                                            role: 'Protocol Guide',
                                                            nextStep: step.chips[0].next
                                                        });
                                                        return;
                                                    }
                                                }

                                                const intelligence = getIntelligenceFor(activeProtocolChip.id);
                                                if (intelligence) {
                                                    // Build query params from payload
                                                    let query = '';
                                                    if (activeProtocolChip.payload) {
                                                        const params = new URLSearchParams();
                                                        Object.entries(activeProtocolChip.payload).forEach(([key, val]) => {
                                                            params.append(key, String(val));
                                                        });
                                                        query = `?${params.toString()}`;
                                                    }

                                                    // Auto-route to the feature page if it matches a path
                                                    if (activeProtocolChip.id.toLowerCase().includes('iep')) router.push(`/dashboard/iep-architect${query}`);
                                                    else if (activeProtocolChip.id.toLowerCase().includes('lesson')) router.push(`/generators/lesson-planner${query}`);
                                                    else if (activeProtocolChip.id.toLowerCase().includes('video') || activeProtocolChip.id.toLowerCase().includes('media')) router.push('/video-studio');
                                                    else router.push(`/dashboard${query}`);
                                                }
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-noble-gold flex items-center justify-center text-black">
                                                    <Zap size={16} fill="black" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-[10px] text-noble-gold font-mono uppercase tracking-widest mb-0.5 opacity-70">Protocol Recommended</div>
                                                    <div className="text-xs font-black text-white uppercase tracking-wider">{activeProtocolChip.title}</div>
                                                </div>
                                                <div className="text-[9px] text-zinc-400 font-mono tracking-tighter group-hover:text-noble-gold transition-colors">
                                                    EXECUTE &rarr;
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-100 transition-opacity">
                                                <Brain size={40} className="text-noble-gold -rotate-12 translate-x-4 translate-y-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="p-6 bg-zinc-950/80 backdrop-blur-2xl border-t border-white/5 shrink-0 mb-safe space-y-4">
                                {/* Predictive Actions Bar */}
                                <AnimatePresence>
                                    {predictedActions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="flex flex-wrap gap-2 pt-2"
                                        >
                                            <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest w-full mb-1">Probable Next Steps:</span>
                                            {predictedActions.map((action, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setChatInput(`Tell me more about ${action.title}`);
                                                        setPredictedActions([]);
                                                    }}
                                                    className="text-[10px] h-7 px-3 bg-white/5 hover:bg-noble-gold/20 hover:text-noble-gold border border-white/10 rounded-full transition-all"
                                                >
                                                    {action.title}
                                                </Button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="relative mt-2"
                                >
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder={onboardingStep ? "Select a protocol or type command..." : "Execute EdIntel Command..."}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-noble-gold/50 transition-all font-mono"
                                    />
                                    <button
                                        type="submit"
                                        title="Send Command"
                                        aria-label="Send Command"
                                        disabled={!chatInput.trim() || isThinking}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-noble-gold text-black disabled:opacity-50 hover:bg-amber-100 transition-colors shadow-[0_0_15px_rgba(197,164,126,0.2)]"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                                <p className="text-[9px] text-center text-zinc-600 font-mono uppercase tracking-[0.3em]">
                                    EdIntel Tactical Interface v5.1.0 {onboardingStep && `| ONBOARDING: ${onboardingStep.toUpperCase()}`}
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
