'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    RefreshCcw,
    Brain,
    Wind,
    Bluetooth,
    Info,
    X
} from 'lucide-react';
import { wearableService, BioFeedback } from '@/lib/wearable-service';
import { mockPodcasts } from '@/lib/data/podcasts';
import { toast } from 'sonner';
import WellnessWrapper from '@/components/WellnessWrapper';
import { BiometricVisualizer } from '@/components/wellness/BiometricVisualizer';
import { BurnoutShield } from '@/components/wellness/BurnoutShield';

export default function WellnessPage() {
    const [biometrics, setBiometrics] = useState<BioFeedback | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [activeReset, setActiveReset] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [wellnessAgent, setWellnessAgent] = useState<any>(null);
    const chartDataRef = useRef<number[]>([]);
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Update biometric bars imperatively to satisfy strict linting
    useEffect(() => {
        barsRef.current.forEach((bar, i) => {
            if (bar) {
                const data = chartDataRef.current.slice(-10);
                if (data[i] !== undefined) {
                    bar.style.setProperty('--bar-height', `${(data[i] / 180) * 100}%`);
                }
            }
        });
    }, [biometrics]);

    useEffect(() => {
        // Fetch Wellness Architect persona
        import('@/lib/intelligence-engine').then(({ getIntelligenceFor }) => {
            const agent = getIntelligenceFor('Wellness Architect');
            setWellnessAgent(agent);
        });
    }, []);

    const handleExecuteReset = useCallback(async (type: string) => {
        setActiveReset(type);
        setAiResponse(null);
        setIsGenerating(true);

        try {
            const res = await fetch('/api/generate/cognitive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentState: `Stress: ${biometrics?.stressLevel || 'Unknown'}%, HR: ${biometrics?.heartRate || 'Unknown'}bpm. Requested Reset: ${type}`,
                    timeAvailable: "5 minutes",
                    focus: "Immediate Stress Reduction",
                    stressLevel: biometrics?.stressLevel
                })
            });

            const data = await res.json();
            if (data.content) {
                setAiResponse(data.content);
            }
        } catch (error) {
            console.error(error);
            toast.error("Protocol Sync Failed", {
                description: "AI Neural Link interrupted."
            });
        } finally {
            setIsGenerating(false);
        }
    }, [biometrics?.heartRate, biometrics?.stressLevel]);

    useEffect(() => {
        const unsubscribe = wearableService.subscribe((data) => {
            setBiometrics(data);
            chartDataRef.current = [...chartDataRef.current, data.heartRate].slice(-20);

            // Auto-trigger Burnout Shield alert for high stress
            if (data.stressLevel > 85 && !activeReset) {
                toast.error("BURN_SHIELD: CRITICAL STRESS", {
                    description: "Physiological markers indicate high cognitive saturation. Immediate reset recommended.",
                    duration: 10000,
                    action: {
                        label: "EXECUTE RESET",
                        onClick: () => handleExecuteReset("Neural Detox")
                    }
                });
            }
        });

        return () => {
            unsubscribe();
            wearableService.disconnect();
        };
    }, [activeReset, handleExecuteReset]);

    const [showBriefing, setShowBriefing] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            await wearableService.requestConnection();
            setIsConnected(true);
            setShowBriefing(true);
            toast.success("Neural Link Established", {
                description: "Sovereign biometric uplink verified.",
            });
        } catch (err) {
            toast.error("Uplink Failed", {
                description: "Ensure wearable device is in range and active.",
            });
        } finally {
            setIsConnecting(false);
        }
    };

    const startMockMode = () => {
        setIsConnected(true);
        wearableService.startMockStream();
        setShowBriefing(true);
        toast.info("Simulated Uplink Active", {
            description: "Operating on virtual biometric telemetry.",
        });
    };

    const wellnessPodcasts = mockPodcasts.filter(p => p.category === "Wellness");

    return (
        <WellnessWrapper isWellnessMode={isConnected}>
            <div className="text-white space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
                    <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-noble-gold/10 border border-noble-gold/20 text-left">
                                <ShieldCheck className="text-noble-gold w-6 h-6" />
                            </div>
                            <span className="text-noble-gold font-black uppercase tracking-[0.4em] text-xs">Transcend Wellness</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic text-left">
                                Burnout <span className="text-zinc-500">Shield</span>
                            </h1>
                            {isConnected && (
                                <div className="flex items-center gap-1 h-8 px-4 bg-zinc-900 border border-white/5 rounded-full">
                                    {chartDataRef.current.slice(-10).map((v, i) => (
                                        <div
                                            key={i}
                                            ref={el => { barsRef.current[i] = el; }}
                                            className="w-1 bg-rose-500/40 rounded-full biometric-bar-fill"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-zinc-500 max-w-xl font-medium text-left">
                            Real-time biometric monitoring and cognitive de-escalation for the high-fidelity educator.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {!isConnected ? (
                            <>
                                <button
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-noble-gold transition-colors flex items-center gap-3 rounded-full"
                                >
                                    {isConnecting ? <RefreshCcw className="animate-spin" /> : <Bluetooth />}
                                    Connect Wearable
                                </button>
                                <button
                                    onClick={startMockMode}
                                    className="px-8 py-4 bg-zinc-900 text-white font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors border border-white/10 rounded-full"
                                >
                                    Simulated Uplink
                                </button>
                            </>
                        ) : (
                            <div className="px-8 py-4 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                <span className="text-cyan-400 font-black uppercase tracking-widest text-xs">Neural Link Active</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Biometric Telemetry */}
                    <div className="lg:col-span-2 space-y-8">
                        <BiometricVisualizer biometrics={biometrics} chartData={chartDataRef.current} />

                        {/* Simulation/Analysis Row */}
                        <div className="p-12 rounded-[50px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden group text-left">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className="w-48 h-48 relative shrink-0">
                                    <div className="absolute inset-0 bg-noble-gold/20 blur-3xl rounded-full" />
                                    <div className="absolute inset-4 border-2 border-noble-gold/40 rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-8 border-2 border-dashed border-noble-gold/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Brain className="w-16 h-16 text-noble-gold" />
                                    </div>
                                </div>
                                <div className="space-y-6 text-left">
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-left">Neural State Analysis</h3>
                                    <p className="text-zinc-400 text-lg leading-relaxed text-left">
                                        Our sovereign algorithm analyzes heart-rate variability and peak stress indicators to predict cognitive saturation before it impacts your performance.
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-left">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold text-left">Trend</div>
                                            <div className="text-sm font-bold text-green-400 text-left">Stabilizing</div>
                                        </div>
                                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-left">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold text-left">Resiliency</div>
                                            <div className="text-sm font-bold text-noble-gold text-left">High</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resets & Audio Hub */}
                    <div className="space-y-8 text-left">
                        <BurnoutShield 
                            wellnessAgentRole={wellnessAgent?.role || 'Tactical Specialist'} 
                            stressLevel={biometrics?.stressLevel}
                            onExecuteReset={handleExecuteReset} 
                        />

                        <div className="space-y-4 text-left">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 ml-2 text-left">Wellness Audio Hub</h3>
                            {wellnessPodcasts.map((podcast) => (
                                <div
                                    key={podcast.id}
                                    className="p-6 rounded-[32px] bg-white/5 border border-white/10 hover:border-noble-gold/30 transition-all cursor-pointer group text-left"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-noble-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Wind className="text-noble-gold group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-sm text-white group-hover:text-noble-gold transition-colors text-left font-bold">{podcast.title}</h4>
                                            <p className="text-xs text-zinc-500 mt-1 text-left">{podcast.duration} • Sovereignty Guided</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ethics & Privacy Alert */}
                        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 flex gap-4 items-start text-left">
                            <Info className="text-zinc-500 shrink-0" size={18} />
                            <p className="text-[10px] text-zinc-500 leading-relaxed italic text-left">
                                Biometric data is processed at the edge. EdIntel Sovereign does not persist biometric history beyond your active session to ensure absolute administrative privacy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wellness Architect Briefing */}
                <AnimatePresence>
                    {showBriefing && wellnessAgent && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="fixed bottom-8 right-8 z-[60] w-96 glass-card p-6 rounded-[32px] border-[#00d2ff]/30 shadow-2xl shadow-[#00d2ff]/20 text-left"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00d2ff]/50">
                                        <img src={wellnessAgent.avatar} alt={wellnessAgent.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black text-white text-sm uppercase tracking-wider">{wellnessAgent.name}</h4>
                                    <p className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-widest">{wellnessAgent.role}</p>
                                </div>
                                <button 
                                    onClick={() => setShowBriefing(false)} 
                                    className="ml-auto text-zinc-500 hover:text-white transition-colors"
                                    aria-label="Dismiss Briefing"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="text-xs text-zinc-300 leading-relaxed font-medium mb-4 text-left">
                                "Neural link confirmed. Your current biometrics indicate a cognitive load of {biometrics?.stressLevel || 0}%. I've prepared a suite of rapid detox protocols to optimize your resilience. Let's maintain equilibrium."
                            </div>
                            <button 
                                onClick={() => setShowBriefing(false)}
                                className="w-full py-3 bg-[#00d2ff] text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#00d2ff]/90 transition-all shadow-lg shadow-[#00d2ff]/20"
                            >
                                Acknowledge Protocol
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reset Modal Overlay */}
                <AnimatePresence>
                    {activeReset && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 overflow-y-auto"
                        >
                            <div className="text-center space-y-12 max-w-4xl w-full py-12">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="space-y-4 text-center"
                                >
                                    <span className="text-noble-gold font-black uppercase tracking-[0.5em] text-xs">Active Protocol</span>
                                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-center">{activeReset}</h2>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div className="relative w-64 h-64 mx-auto md:mx-0">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.3, 0.6, 0.3]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute inset-0 bg-noble-gold/20 rounded-full blur-[100px]"
                                        />
                                        <motion.div
                                            animate={{
                                                rotate: 360,
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{
                                                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                            }}
                                            className="absolute inset-0 border-4 border-noble-gold/50 rounded-full flex items-center justify-center"
                                        >
                                            <div className="w-8 h-8 bg-noble-gold rounded-full" />
                                        </motion.div>
                                    </div>

                                    <div className="text-left space-y-6 min-h-[300px] flex flex-col justify-center">
                                        {isGenerating ? (
                                            <div className="space-y-4 animate-pulse">
                                                <div className="h-4 w-3/4 bg-white/10 rounded" />
                                                <div className="h-4 w-full bg-white/10 rounded" />
                                                <div className="h-4 w-5/6 bg-white/10 rounded" />
                                                <p className="text-noble-gold font-black uppercase tracking-widest text-xs animate-pulse">Synchronizing Neural Assets...</p>
                                            </div>
                                        ) : aiResponse ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="prose prose-invert prose-noble max-w-none text-left"
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br/>') }} className="text-zinc-300 font-medium leading-relaxed" />
                                            </motion.div>
                                        ) : (
                                            <p className="text-2xl text-zinc-400 font-medium italic text-left">
                                                Breathe in synchrony with the pulse of sovereignty...
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveReset(null)}
                                    className="px-12 py-5 border-2 border-white/20 hover:border-white text-white font-black uppercase tracking-widest rounded-full transition-all"
                                >
                                    Terminate Protocol
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </WellnessWrapper>
    );
}
