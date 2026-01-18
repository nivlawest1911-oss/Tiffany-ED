'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Phone, PhoneOff, MessageSquare, Sparkles, Send, X, Minimize2, Brain, Activity, Lock, Share2 } from 'lucide-react';

function MouthBar({ index, eqAura }: { index: number, eqAura: string }) {
    const [heights, setHeights] = useState(['4px', '20px', '4px']);
    const [duration, setDuration] = useState(0.15);

    useEffect(() => {
        setHeights([
            `${Math.random() * 5 + 4}px`,
            `${Math.random() * 35 + 15}px`,
            `${Math.random() * 5 + 4}px`
        ]);
        setDuration(0.12 + (Math.random() * 0.08));
    }, []);

    return (
        <motion.div
            className="w-[3px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            animate={{
                height: heights,
                opacity: [0.6, 1, 0.6],
                backgroundColor: eqAura === 'indigo' ? '#818cf8' :
                    eqAura === 'emerald' ? '#34d399' :
                        eqAura === 'rose' ? '#fb7185' : '#fbbf24'
            }}
            transition={{ duration: duration, repeat: Infinity }}
        />
    );
}

interface LiveAvatarChatProps {
    avatarName: string;
    avatarRole: string;
    avatarVideo?: string;
    avatarImage: string;
    avatarVoice: string;
    avatarVoiceSettings?: {
        pitch: number;
        rate: number;
        lang?: string;
    };
    onClose?: () => void;
}

export default function LiveAvatarChat({
    avatarName,
    avatarRole,
    avatarVideo,
    avatarImage,
    avatarVoice,
    avatarVoiceSettings = { pitch: 1.0, rate: 1.0 },
    onClose
}: LiveAvatarChatProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [transcript, setTranscript] = useState('');
    const [conversation, setConversation] = useState<Array<{ role: 'user' | 'avatar', text: string }>>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [showTextInput, setShowTextInput] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [isBlinking, setIsBlinking] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const [isArchitecting, setIsArchitecting] = useState(false);
    const [draftedStrategy, setDraftedStrategy] = useState<string | null>(null);
    const [cognitiveState, setCognitiveState] = useState<'idle' | 'listening' | 'processing' | 'architecting' | 'speaking'>('idle');
    const [tacticalSuggestions, setTacticalSuggestions] = useState<Array<{ id: string, label: string, protocol: string }>>([]);
    const [personalityMode, setPersonalityMode] = useState<'strategic' | 'empathetic' | 'analytical' | 'direct'>('strategic');
    const [eqAura, setEqAura] = useState<'indigo' | 'emerald' | 'rose' | 'amber'>('indigo');
    const [curiosityNode, setCuriosityNode] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Advanced "Presence" Animation Hooks
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const [presenceX, setPresenceX] = useState(0);
    const [presenceY, setPresenceY] = useState(0);

    // Neural Blink System
    useEffect(() => {
        const triggerBlink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
            setTimeout(triggerBlink, Math.random() * 4000 + 2000);
        };
        const timer = setTimeout(triggerBlink, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Track mouse for "Look At" effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.current = x;
            mouseY.current = y;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth physics loop for organic movement
    useEffect(() => {
        let frameId: number;
        const updatePresence = () => {
            setPresenceX(prev => prev + (mouseX.current - prev) * 0.05);
            setPresenceY(prev => prev + (mouseY.current - prev) * 0.05);
            frameId = requestAnimationFrame(updatePresence);
        };
        frameId = requestAnimationFrame(updatePresence);
        return () => cancelAnimationFrame(frameId);
    }, []);

    // Auto-scroll to bottom of conversation
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [conversation]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            setIsSpeechSupported(true);
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);

                if (event.results[current].isFinal) {
                    handleUserSpeech(transcriptText);
                    setTranscript('');
                }
            };

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setCognitiveState('listening');
            };
            recognitionRef.current.onend = () => {
                setIsListening(false);
                if (!isProcessing) setCognitiveState('idle');
            };
            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                setCognitiveState('idle');
            };
        }
    }, []);

    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStage, setProcessingStage] = useState('');

    const handleUserSpeech = async (text: string) => {
        window.speechSynthesis.cancel();
        setConversation(prev => [...prev, { role: 'user', text }]);

        setIsSpeaking(true);
        setIsProcessing(true);
        setCognitiveState('processing');

        setProcessingStage("Uplink Established...");
        await new Promise(r => setTimeout(r, 400));
        setProcessingStage("Neural Node Search...");
        await new Promise(r => setTimeout(r, 600));
        setProcessingStage("Optimizing Strategy...");
        await new Promise(r => setTimeout(r, 400));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...conversation, { role: 'user', content: text }],
                    avatarName,
                    avatarRole,
                    generatorId: 'default'
                })
            });

            setIsProcessing(false);
            if (!response.body) return;

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';
            setConversation(prev => [...prev, { role: 'avatar', text: '' }]);
            setIsSpeaking(true);

            let sentenceBuffer = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedResponse += chunk;
                sentenceBuffer += chunk;

                setConversation(prev => {
                    const newConv = [...prev];
                    newConv[newConv.length - 1].text = accumulatedResponse;
                    return newConv;
                });

                // PROACTIVE INTELLIGENCE: Auto-architect if specific keywords are detected
                if (accumulatedResponse.length > 50 && !isArchitecting) {
                    if (accumulatedResponse.includes('IEP')) {
                        addTacticalSuggestion('IEP', 'Optimize IEP Goal', 'Neural drafting of legally-defensible IEP benchmarks.');
                        setEqAura('emerald');
                    }
                    if (accumulatedResponse.includes('budget')) {
                        addTacticalSuggestion('BUDGET', 'Audit LEA Finance', 'Scanning ALSDE budget protocols for Title I recovery.');
                        setEqAura('amber');
                    }
                    if (accumulatedResponse.includes('burnout') || accumulatedResponse.includes('stress')) {
                        setPersonalityMode('empathetic');
                        setEqAura('rose');
                        setCuriosityNode("How are you managing your administrative workload today?");
                    }
                }

                // Improved Sentence Detection (triggers on punctuation even without space)
                if (sentenceBuffer.match(/[.!?](\s|$)/)) {
                    speakResponse(sentenceBuffer.trim());
                    sentenceBuffer = '';
                }
            }

            if (sentenceBuffer.trim()) {
                speakResponse(sentenceBuffer.trim());
            }

        } catch (error) {
            console.error('Error getting AI response:', error);
            setIsSpeaking(false);
            setIsProcessing(false);
            setCognitiveState('idle');
        }
    };

    const addTacticalSuggestion = (id: string, label: string, protocol: string) => {
        setTacticalSuggestions(prev => {
            if (prev.find(s => s.id === id)) return prev;
            return [...prev, { id, label, protocol }];
        });
    };

    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

    const handleNeuralDrafting = async (text: string) => {
        setIsArchitecting(true);
        setDraftedStrategy("ARCHITECTING PROTOCOL...");
        await new Promise(r => setTimeout(r, 2000));
        setDraftedStrategy(text.substring(0, 500) + "...");
    };

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);
        };
        loadVoices();
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const speakResponse = (text: string) => {
        if ('speechSynthesis' in window && isAudioEnabled) {
            window.speechSynthesis.cancel(); // Clear queue for immediate response
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = avatarVoiceSettings.rate || 0.95;
            utterance.pitch = avatarVoiceSettings.pitch || 1.0;
            utterance.volume = 1.0;

            const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
            // Sovereign Voice Protocol: Prioritize Authoritative & Deep Tones
            const isMale = avatarName.toLowerCase().includes('alvin') || avatarName.toLowerCase().includes('marcus') || avatarName.toLowerCase().includes('andre') || avatarName.toLowerCase().includes('james');

            let preferredVoice;
            if (isMale) {
                // Targeted selection for deep, executive male resonance
                preferredVoice = voices.find(v => (v.name.includes('Google US English') || v.name.includes('Daniel')) && v.lang.startsWith('en'));
            } else {
                // Targeted selection for clear, professional female resonance
                preferredVoice = voices.find(v => (v.name.includes('Google US English') || v.name.includes('Samantha')) && v.lang.startsWith('en'));
            }

            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.onstart = () => {
                setIsSpeaking(true);
                setCognitiveState('speaking');
                // Auto-clear curiosity after speaking it
                if (curiosityNode) {
                    setTimeout(() => setCuriosityNode(null), 5000);
                }
            };
            utterance.onend = () => {
                if (!window.speechSynthesis.pending) {
                    setIsSpeaking(false);
                    if (!isProcessing) setCognitiveState('idle');
                }
            };

            synthesisRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Toggle logic functions (Microphone, Video, Audio, Connection)
    const toggleMicrophone = () => {
        if (!isSpeechSupported) return;
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const toggleVideo = () => {
        setIsVideoEnabled(!isVideoEnabled);
        if (videoRef.current) {
            if (isVideoEnabled) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const toggleAudio = () => {
        setIsAudioEnabled(!isAudioEnabled);
        if (!isAudioEnabled && isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const toggleConnection = () => {
        if (isConnected) {
            // Disconnect
            recognitionRef.current?.stop();
            window.speechSynthesis.cancel();
            setIsListening(false);
            setIsSpeaking(false);
            setIsConnected(false);
        } else {
            // Connect
            setIsConnected(true);

            // Auto-start greeting
            // FEATURE: Use Real Human Voice Sample if available for maximum realism
            const greetingText = `Hello. I am ${avatarName}, your ${avatarRole}. I am ready to assist you.`;
            setConversation([{ role: 'avatar', text: greetingText }]);

            if (avatarVoice && (avatarVoice.endsWith('.mp3') || avatarVoice.endsWith('.wav')) && !avatarVoice.includes('default')) {
                // Play Real Audio
                const audio = new Audio(avatarVoice);
                audio.volume = 1.0;

                audio.onplay = () => setIsSpeaking(true);
                audio.onended = () => setIsSpeaking(false);
                audio.onerror = (e) => {
                    console.error("Audio Greeting Failed", e);
                    speakResponse(greetingText); // Fallback to TTS
                };

                audio.play().catch(e => {
                    console.warn("Autoplay blocked or failed", e);
                    speakResponse(greetingText);
                });
            } else {
                // Fallback to Neural TTS
                speakResponse(greetingText);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-6xl h-[90vh] bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <div>
                                <h2 className="text-2xl font-bold text-white">{avatarName}</h2>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-zinc-400">{avatarRole}</p>
                                    <div className="h-3 w-px bg-white/10" />
                                    <div className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                        <div className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
                                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{personalityMode} Mode</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-md"
                            >
                                Terminate Session
                            </button>
                        )}
                    </div>
                </div>

                {/* Video Avatar / Image Fallback with Sovereign Presence Animation */}
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                        scale: 1.15,
                        x: presenceX * -25,
                        y: presenceY * -15,
                    }}
                >
                    {isVideoEnabled ? (
                        <div className="relative w-full h-full bg-black">
                            {/* Live TV Show Background Atmosphere */}
                            <div className="absolute inset-0 bg-[#020202]">
                                <motion.div
                                    animate={{
                                        opacity: [0.05, 0.1, 0.05],
                                        background: eqAura === 'indigo' ? 'radial-gradient(circle, #6366f1 0%, transparent 70%)' :
                                            eqAura === 'emerald' ? 'radial-gradient(circle, #10b981 0%, transparent 70%)' :
                                                eqAura === 'rose' ? 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' :
                                                    'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
                                    }}
                                    className="absolute inset-0 transition-colors duration-1000"
                                />
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent animate-pulse" />
                            </div>

                            {/* Base Image with Neural Parallax & Breathing */}
                            <motion.div
                                className="w-full h-full relative"
                                animate={{
                                    scale: isSpeaking ? [1, 1.02, 1] : [1, 1.01, 1],
                                    rotateZ: isListening ? (presenceX * 1.5) : (isSpeaking ? [0, 0.3, -0.3, 0] : 0),
                                    y: isSpeaking ? [0, -4, 0] : [0, -2, 0],
                                    x: isSpeaking ? [0, 2, -2, 0] : 0,
                                }}
                                transition={{
                                    duration: isSpeaking ? 0.4 : 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <motion.img
                                    src={avatarImage}
                                    alt={avatarName}
                                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                                    style={{
                                        x: presenceX * 15, // Subtle parallax
                                        y: presenceY * 10,
                                    }}
                                />

                                {/* Synaptic Pulse Scanner (Active when Thinking/Processing) */}
                                {(cognitiveState === 'processing' || cognitiveState === 'architecting') && (
                                    <motion.div
                                        initial={{ top: "-10%" }}
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-40 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                                    />
                                )}

                                {/* High-Fidelity Organic Mouth Matrix (Lip-Sync) */}
                                {isSpeaking && (
                                    <div className="absolute inset-x-0 bottom-[15%] flex items-center justify-center pointer-events-none z-30">
                                        <div className="relative w-[150px] h-[40px] flex items-center justify-center gap-[4px]">
                                            {[...Array(12)].map((_, i) => (
                                                <MouthBar key={i} index={i} eqAura={eqAura} />
                                            ))}
                                            <motion.div
                                                className="absolute inset-0 bg-white/10 blur-[40px] rounded-full scale-150"
                                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 0.3, repeat: Infinity }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Neural Blink Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-zinc-900/60 pointer-events-none z-40"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        height: isBlinking ? "100%" : "0%",
                                        opacity: isBlinking ? 0.8 : 0
                                    }}
                                    transition={{ duration: 0.12 }}
                                    style={{ transformOrigin: "top" }}
                                />
                            </motion.div>

                            {/* Intelligent Video Switching */}
                            {avatarVideo && !avatarVideo.includes('default_avatar.mp4') && (
                                <video
                                    ref={videoRef}
                                    src={avatarVideo}
                                    autoPlay
                                    loop
                                    muted={!isAudioEnabled}
                                    className="absolute inset-0 w-full h-full object-cover z-10 opacity-90"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                            <div className="text-center">
                                <VideoOff className="w-24 h-24 text-white/50 mx-auto mb-4" />
                                <p className="text-white/70">Video Disabled</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* LIVE BROADCAST OVERLAYS (HeyGen/TV Show Style) */}
                <div className="absolute inset-0 pointer-events-none z-40">
                    {/* Live Badge */}
                    <div className="absolute top-24 left-8">
                        <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-tighter">LIVE BROADCAST</span>
                        </div>
                    </div>

                    {/* Neural Status Ticker */}
                    <div className="absolute bottom-32 inset-x-0 h-8 bg-black/40 backdrop-blur-md border-y border-white/5 flex items-center overflow-hidden">
                        <div className="flex gap-12 whitespace-nowrap animate-marquee">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-12 text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">
                                    <span>FIDELITY: 99.8% NDS</span>
                                    <span className="text-indigo-400">ENCRYPTION: QUANTUM_SECURE</span>
                                    <span>LATENCY: 14MS</span>
                                    <span className="text-emerald-400">SYNAPSE_COUNT: 1.2M</span>
                                    <span>PROTOCOL: ALCOS_V5</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Corner Diagnostic Data */}
                    <div className="absolute top-24 right-8 text-right font-mono text-[8px] text-white/20">
                        HD_STREAM_V4.0<br />
                        COG_STATE: {cognitiveState.toUpperCase()}<br />
                        BUFF_SIZE: 1024KB<br />
                        X_COORD: {presenceX.toFixed(2)}<br />
                        Y_COORD: {presenceY.toFixed(2)}
                    </div>
                </div>

                {/* High-Impact Visualizer & Circular Waveform */}
                {isSpeaking && !isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                        {/* Circular Neural Pulse */}
                        <motion.div
                            className="absolute w-96 h-96 border border-emerald-500/20 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute w-[420px] h-[420px] border border-blue-500/10 rounded-full"
                            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Top Suggestions Overlay */}
                        <div className="absolute top-32 left-8 flex flex-col gap-3 pointer-events-auto">
                            <AnimatePresence>
                                {curiosityNode && (
                                    <motion.div
                                        key="curiosity-node"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/50 backdrop-blur-3xl mb-4 max-w-xs"
                                    >
                                        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Sparkles size={12} />
                                            <span>Neural Curiosity Node</span>
                                        </div>
                                        <p className="text-xs text-white font-medium leading-relaxed italic">"{curiosityNode}"</p>
                                    </motion.div>
                                )}
                                {tacticalSuggestions.map((s, i) => (
                                    <motion.button
                                        key={s.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        onClick={() => {
                                            handleNeuralDrafting(`Initiating ${s.label}: ${s.protocol}`);
                                            setTacticalSuggestions(prev => prev.filter(item => item.id !== s.id));
                                        }}
                                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl hover:border-indigo-500/50 transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{s.label}</span>
                                        </div>
                                        <p className="text-[9px] text-zinc-400 font-medium group-hover:text-white transition-colors">{s.protocol}</p>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Bar Visualizer */}
                        <div className="absolute bottom-40 inset-x-0 flex justify-center">
                            <div className="flex gap-0.5 h-16 items-center">
                                {[...Array(40)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-indigo-500/50 rounded-full"
                                        animate={{
                                            height: [
                                                `${Math.random() * 10 + 5}px`,
                                                `${Math.random() * 50 + 10}px`,
                                                `${Math.random() * 10 + 5}px`
                                            ],
                                            backgroundColor: i % 5 === 0 ? '#4ade80' : '#6366f1'
                                        }}
                                        transition={{ duration: 0.1 + (Math.random() * 0.15), repeat: Infinity }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* PROTOCOL VERIFICATION HUD */}
                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/40 backdrop-blur-[2px]"
                        >
                            <div className="relative w-64 h-64 border border-indigo-500/30 rounded-full flex items-center justify-center">
                                {/* Rotating Rings */}
                                <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin" />
                                <div className="absolute inset-4 border-r-2 border-purple-500 rounded-full animate-spin-reverse" />

                                {/* Lock Icon / Shield */}
                                <div className="text-center">
                                    <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
                                    <motion.p
                                        key={processingStage} // Animate text change
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-indigo-300 font-mono text-xs uppercase tracking-widest font-bold"
                                    >
                                        {processingStage}
                                    </motion.p>
                                </div>
                            </div>
                            <p className="mt-8 text-white/50 text-[10px] uppercase tracking-[0.2em]">Secure Sovereign Enclave</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status Indicator Pill */}
                {isSpeaking && (
                    <div className="absolute top-24 right-8">
                        <motion.div
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Voice Active</span>
                        </motion.div>
                    </div>
                )}

                {/* Listening Indicator */}
                {isListening && (
                    <div className="absolute top-24 left-1/2 -translate-x-1/2">
                        <motion.div
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/50 backdrop-blur-md"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            <Mic className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-400 font-medium">Listening...</span>
                            {transcript && (
                                <span className="text-white/80 ml-2">"{transcript}"</span>
                            )}
                        </motion.div>
                    </div>
                )}

                <div
                    ref={scrollRef}
                    className={`absolute bottom-32 left-0 ${isArchitecting ? 'right-1/3' : 'right-0'} max-h-64 overflow-y-auto px-6 space-y-3 custom-scrollbar transition-all duration-500`}
                >
                    <AnimatePresence>
                        {conversation.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-md px-4 py-3 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* NEURAL DRAFTING SIDEBAR (HeyGen+ Capability) */}
                <AnimatePresence>
                    {isArchitecting && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="absolute right-0 top-24 bottom-32 w-1/3 bg-black/60 border-l border-white/10 backdrop-blur-2xl p-6 z-40 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Neural Strategy Architect</h3>
                                <button onClick={() => setIsArchitecting(false)} className="text-white/40 hover:text-white"><X size={14} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 font-mono text-[11px] leading-relaxed text-zinc-300">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse">
                                    <div className="flex items-center gap-2 mb-2 text-indigo-400">
                                        <Sparkles size={12} />
                                        <span>LIVE DRAFTING: {avatarRole} Strategy</span>
                                    </div>
                                    {draftedStrategy}
                                </div>
                                <div className="space-y-4 opacity-50 grayscale">
                                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                                    <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse delay-75" />
                                    <div className="h-4 w-5/6 bg-zinc-800 rounded animate-pulse delay-150" />
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest mt-4">
                                Deploy to Dashboard
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Text Input Overlay */}
                <AnimatePresence>
                    {showTextInput && isConnected && (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (textInput.trim()) {
                                    handleUserSpeech(textInput);
                                    setTextInput('');
                                }
                            }}
                            className="absolute bottom-32 left-0 right-0 px-6 py-4 flex gap-2 z-40 bg-gradient-to-t from-black/80 to-transparent"
                        >
                            <input
                                autoFocus
                                type="text"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-500 shadow-xl"
                                placeholder="Type a message to the avatar..."
                            />
                            <button
                                type="submit"
                                className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white shadow-lg transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <div className="flex items-center justify-center gap-4">
                        {/* Microphone */}
                        <motion.button
                            whileHover={isSpeechSupported ? { scale: 1.1 } : {}}
                            whileTap={isSpeechSupported ? { scale: 0.9 } : {}}
                            onClick={toggleMicrophone}
                            disabled={!isConnected || !isSpeechSupported}
                            title={!isSpeechSupported ? "Voice input not supported in this browser (Chrome/Edge recommended)" : "Toggle Microphone"}
                            className={`p-4 rounded-full ${!isSpeechSupported
                                ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                                : isListening
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                } transition-all disabled:opacity-50 disabled:cursor-not-allowed relative group`}
                        >
                            {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                            {!isSpeechSupported && (
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 bg-black/90 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                                    Browser not supported
                                </div>
                            )}
                        </motion.button>

                        {/* Video */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleVideo}
                            className={`p-4 rounded-full ${isVideoEnabled
                                ? 'bg-white/10 text-white hover:bg-white/20'
                                : 'bg-red-500 text-white'
                                } transition-all`}
                        >
                            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                        </motion.button>

                        {/* Connect/Disconnect */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleConnection}
                            className={`p-6 rounded-full ${isConnected
                                ? 'bg-red-500 text-white'
                                : 'bg-green-500 text-white'
                                } transition-all shadow-lg`}
                        >
                            {isConnected ? <PhoneOff className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
                        </motion.button>

                        {/* Audio */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleAudio}
                            className={`p-4 rounded-full ${isAudioEnabled
                                ? 'bg-white/10 text-white hover:bg-white/20'
                                : 'bg-red-500 text-white'
                                } transition-all`}
                        >
                            {isAudioEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                        </motion.button>

                        {/* Text Chat Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowTextInput(!showTextInput)}
                            disabled={!isConnected}
                            className={`p-4 rounded-full ${showTextInput ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <MessageSquare className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Status Text */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-white/60">
                            {!isConnected && 'Click the green button to start conversation'}
                            {isConnected && !isListening && !isSpeechSupported && 'Use text chat or switch to Chrome for voice'}
                            {isConnected && !isListening && isSpeechSupported && 'Click microphone to speak'}
                            {isConnected && isListening && 'Speak now...'}
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.7);
                }
            `}</style>
        </motion.div >
    );
}
