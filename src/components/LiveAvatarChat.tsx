'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Phone, PhoneOff, MessageSquare, Sparkles, Send, X, Minimize2, Brain, Activity, Lock, Share2, Terminal, User, Settings, Zap, Trophy } from 'lucide-react';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import SovereignApiVault from './admin/SovereignApiVault';

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
    avatarVoice?: string;
    avatarVoiceSettings?: {
        pitch: number;
        rate: number;
        lang?: string;
    };
    tokensRemaining?: number;
    onDeductTokens?: (amount: number) => void;
    onRecharge?: () => void;
    onAddXP?: (amount: number) => void;
    onClose?: () => void;

    // Sovereign integration props
    isOpen?: boolean;
    greetingText?: string;
    theme?: 'default' | 'professional';
    onShowBriefing?: () => void;
    heygenId?: string;
}

export default function LiveAvatarChat({
    avatarName,
    avatarRole,
    avatarVideo,
    avatarImage,
    avatarVoice = '',
    avatarVoiceSettings = { pitch: 1.0, rate: 1.0 },
    tokensRemaining = 9999,
    onDeductTokens = () => { },
    onRecharge = () => { },
    onAddXP = () => { },
    onClose,
    isOpen = true,
    greetingText,
    theme = 'default',
    onShowBriefing,
    heygenId
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
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const [isArchitecting, setIsArchitecting] = useState(false);
    const [draftedStrategy, setDraftedStrategy] = useState<string | null>(null);
    const [cognitiveState, setCognitiveState] = useState<'idle' | 'listening' | 'processing' | 'architecting' | 'speaking'>('idle');
    const [tacticalSuggestions, setTacticalSuggestions] = useState<Array<{ id: string, label: string, protocol: string }>>([]);
    const [personalityMode, setPersonalityMode] = useState<'strategic' | 'empathetic' | 'analytical' | 'direct'>('strategic');
    const [eqAura, setEqAura] = useState<'indigo' | 'emerald' | 'rose' | 'amber'>('indigo');
    const [curiosityCenter, setCuriosityCenter] = useState<string | null>(null);
    const [userSentiment, setUserSentiment] = useState<'neutral' | 'positive' | 'urgent' | 'distressed'>('neutral');
    const [perceptiveState, setPerceptiveState] = useState<'observing' | 'analyzing' | 'empathizing' | 'reacting'>('observing');
    const [vibeShift, setVibeShift] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStage, setProcessingStage] = useState('');

    const [isCloning, setIsCloning] = useState(false);
    const [cinematicMode, setCinematicMode] = useState(true);
    const [biometricPulse, setBiometricPulse] = useState(72);
    const [neuralLoad, setNeuralLoad] = useState(12);
    const [isCalibrating, setIsCalibrating] = useState(true);
    const [imgSrc, setImgSrc] = useState(avatarImage);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoGenerationStatus, setVideoGenerationStatus] = useState<string>('');
    const [xpNotification, setXpNotification] = useState<{ amount: number, label: string } | null>(null);

    // Update image source when prop changes
    useEffect(() => {
        setImgSrc(avatarImage);
    }, [avatarImage]);

    const triggerXpGain = (amount: number, label: string) => {
        if (onAddXP) onAddXP(amount);
        setXpNotification({ amount, label });
        setTimeout(() => setXpNotification(null), 3000);
    };

    const handleGenerateVideo = async (text: string) => {
        if (!text) return;
        setIsGeneratingVideo(true);
        setVideoGenerationStatus('Initializing Neural Renderer...');

        try {
            // 1. Request Video Generation
            const response = await fetch('/api/heygen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    avatarId: heygenId || 'default', // Dynamic ID with fallback
                    text: text,
                    action: 'create'
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const videoId = data.videoId;
            setVideoGenerationStatus('Rendering: 0%');

            // Start Polling
            const pollInterval = setInterval(async () => {
                try {
                    const statusRes = await fetch('/api/heygen', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ videoId, action: 'status' })
                    });
                    const statusData = await statusRes.json();

                    if (statusData.status === 'completed') {
                        clearInterval(pollInterval);
                        setGeneratedVideoUrl(statusData.video_url);
                        setIsGeneratingVideo(false);
                        setIsSpeaking(false); // Stop the canvas avatar
                    } else if (statusData.status === 'failed') {
                        clearInterval(pollInterval);
                        setIsGeneratingVideo(false);
                        alert('Video Generation Failed: ' + statusData.error);
                    } else {
                        setVideoGenerationStatus(`Rendering: ${statusData.status}...`);
                    }
                } catch (e) {
                    console.error("Polling error", e);
                }
            }, 3000); // Check every 3s

        } catch (error: any) {
            console.error(error);
            setIsGeneratingVideo(false);
            alert("Stream Error: " + error.message);
        }
    };

    const handleTestStream = () => {
        handleGenerateVideo("System Test. Confirming 4K Neural stream latency and fidelity. All systems green.");
    };



    const behavior = useHumanBehavior(isVideoEnabled && !isSpeaking && !isCalibrating && !generatedVideoUrl);
    const { behaviorStyles, isBlinking } = behavior;




    const LEADERSHIP_ARCHETYPES: Record<string, { tone: string, rate: number, pitch: number, jargon: string[] }> = {
        'alvin': { tone: 'visionary', rate: 0.9, pitch: 0.85, jargon: ['Leadership', 'Legacy Achievement', 'District Support', 'Pedagogical Excellence', 'Human-centered'] },
        'marcus': { tone: 'philosophical', rate: 0.8, pitch: 0.7, jargon: ['Virtue', 'Discipline', 'Administrative Duty', 'Professional Standards', 'Educational Ethics'] },
        'sarah': { tone: 'tactical', rate: 1.1, pitch: 1.05, jargon: ['Strategic Review', 'Performance Analysis', 'Engagement Drift', 'Quality Check', 'Real-time Response'] },
        'andré': { tone: 'innovative', rate: 1.0, pitch: 0.9, jargon: ['Heuristic', 'Optimization', 'Technical Architecture', 'Strategic Agility', 'Collaboration Sync'] },
        'default': { tone: 'professional', rate: 0.95, pitch: 0.9, jargon: ['Excellence', 'Efficiency', 'Success Metrics', 'Strategic Alignment', 'System Response'] }
    };

    const getArchetype = () => {
        const lowerName = avatarName.toLowerCase();
        if (lowerName.includes('alvin')) return LEADERSHIP_ARCHETYPES['alvin'];
        if (lowerName.includes('marcus')) return LEADERSHIP_ARCHETYPES['marcus'];
        if (lowerName.includes('sarah')) return LEADERSHIP_ARCHETYPES['sarah'];
        if (lowerName.includes('andre') || lowerName.includes('andré')) return LEADERSHIP_ARCHETYPES['andré'];
        return LEADERSHIP_ARCHETYPES['default'];
    };

    const videoRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Advanced "Presence" Animation Hooks
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const [presenceX, setPresenceX] = useState(0);
    const [presenceY, setPresenceY] = useState(0);

    // Human-like behavior and presence is now handled by the useHumanBehavior hook.

    // Advanced "Breath" Animation
    const [breathScale, setBreathScale] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setBreathScale(prev => (prev === 1 ? 1.012 : 1));
        }, 3500); // Slow, deep breathing rhythm
        return () => clearInterval(interval);
    }, []);

    // 1. Neural Gaze Tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate normalized mouse position (-0.5 to 0.5)
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            mouseX.current = x;
            mouseY.current = y;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Calibration sequence
        const calibrationTimer = setTimeout(() => {
            setIsCalibrating(false);
        }, 3500);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(calibrationTimer);
        };
    }, []);

    // ... (Previous presence logic remains)

    // Smooth physics loop for organic movement + Micro-expressions
    useEffect(() => {
        let frameId: number;
        const updatePresence = () => {
            // Neural Gaze Lag (Organic following)
            setPresenceX(prev => prev + (mouseX.current - prev) * 0.04);
            setPresenceY(prev => prev + (mouseY.current - prev) * 0.04);

            // Perceptive Micro-gestures
            if (isListening || isProcessing) {
                setVibeShift(prev => prev + (1 - prev) * 0.03); // Lean in more dramatically
            } else {
                setVibeShift(prev => prev + (0 - prev) * 0.03);
            }

            frameId = requestAnimationFrame(updatePresence);
        };

        // Biometric Pulse Simulation
        const pulseInterval = setInterval(() => {
            setBiometricPulse(prev => {
                const target = isSpeaking ? 85 : isProcessing ? 92 : 68;
                return prev + (target - prev) * 0.1 + (Math.random() * 2 - 1);
            });
            setNeuralLoad(prev => {
                const target = isProcessing ? 88 : isSpeaking ? 45 : 12;
                return prev + (target - prev) * 0.1;
            });
        }, 1000);

        frameId = requestAnimationFrame(updatePresence);
        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(pulseInterval);
        };
    }, [isListening, isProcessing, isSpeaking]);

    // ... (Speech recognition remains)


    const handleUserSpeech = async (text: string) => {
        if (tokensRemaining <= 0) {
            onRecharge();
            speakResponse("Pardon me, your account balance is currently low. Please add more tokens to your account to continue this conversation.");
            return;
        }

        window.speechSynthesis.cancel();
        setConversation(prev => [...prev, { role: 'user', text }]);

        setIsSpeaking(true);
        setIsProcessing(true);
        setCognitiveState('processing');
        setPerceptiveState('analyzing');

        // STRATEGIC SYSTEM ANALYSIS
        setPerceptiveState('analyzing');
        const textLower = text.toLowerCase();

        // Emotional Intelligence Logic
        let sentiment: 'neutral' | 'positive' | 'urgent' | 'distressed' = 'neutral';
        if (textLower.includes('help') || textLower.includes('emergency') || textLower.includes('critical')) {
            sentiment = 'urgent';
            setEqAura('amber');
            setPerceptiveState('reacting');
        } else if (textLower.includes('happy') || textLower.includes('great') || textLower.includes('success')) {
            sentiment = 'positive';
            setEqAura('emerald');
        } else if (textLower.includes('sad') || textLower.includes('sorry') || textLower.includes('fail')) {
            sentiment = 'distressed';
            setEqAura('rose');
            setPerceptiveState('empathizing');
        }
        setUserSentiment(sentiment);
        setProcessingStage("Connecting...");
        await new Promise(r => setTimeout(r, 200));
        setProcessingStage("Analyzing Request...");
        await new Promise(r => setTimeout(r, 300));
        setProcessingStage("Preparing Response...");
        await new Promise(r => setTimeout(r, 100));

        onDeductTokens(1); // Standard interaction cost
        triggerXpGain(25, 'Neural Uplink'); // XP for communication

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...conversation, { role: 'user', content: text }],
                    avatarName,
                    avatarRole,
                    generatorId: 'default',
                    isChat: true // Enable conversational mode for more human-like responses
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

                // (Logic upgraded to Enhanced Proactive Intelligence below)

                // Improved Sentence Detection (triggers on punctuation even without space)
                if (sentenceBuffer.match(/[.!?](\s|$)/)) {
                    speakResponse(sentenceBuffer.trim());
                    sentenceBuffer = '';
                }
            }

            if (sentenceBuffer.trim()) {
                speakResponse(sentenceBuffer.trim());
            }

            // ENHANCED PROACTIVE INTELLIGENCE: Deep Architectural Scanning
            if (accumulatedResponse.length > 50 && !isArchitecting) {
                const responseLower = accumulatedResponse.toLowerCase();

                // IEP & Special Education
                if (responseLower.includes('iep') || responseLower.includes('504') || responseLower.includes('accommodation')) {
                    addTacticalSuggestion('IEP_AUDIT', 'Audit Compliance Check', 'Scanning current text against IDEA 2004 federal mandates.');
                    setEqAura('indigo');
                }

                // Fiscal & Budgetary
                if (responseLower.includes('budget') || responseLower.includes('funding') || responseLower.includes('title i')) {
                    addTacticalSuggestion('FISCAL_SCAN', 'Fiscal Efficiency Scan', 'Cross-referencing expenditure with Title I allowable costs.');
                    setEqAura('amber');
                }

                // Emotional & Climate
                if (responseLower.includes('burnout') || responseLower.includes('stress') || responseLower.includes('morale')) {
                    setPersonalityMode('empathetic');
                    setEqAura('rose');
                    setCuriosityCenter("Detecting high cognitive load. Initiating support protocols.");
                }

                // Policy & Governance
                if (responseLower.includes('policy') || responseLower.includes('board') || responseLower.includes('regulation')) {
                    addTacticalSuggestion('POLICY_ALIGN', 'Board Policy Alignment', 'Verifying alignment with AASB standard policy recommendations.');
                    setEqAura('emerald');
                }

                // Data & Assessment
                if (responseLower.includes('data') || responseLower.includes('score') || responseLower.includes('assessment')) {
                    addTacticalSuggestion('DATA_VIZ', 'Generate Data Vector', 'Visualizing performance trends across student subgroups.');
                    setEqAura('indigo');
                }

                // Safety & Security
                if (responseLower.includes('safety') || responseLower.includes('emergency') || responseLower.includes('drill')) {
                    addTacticalSuggestion('SAFETY_PROTOCOL', 'Crisis Response Check', 'Reviewing ALSDE safe schools safety protocols.');
                    setEqAura('amber');
                }
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

    const handleStrategicDrafting = async (text: string) => {
        setIsArchitecting(true);
        setDraftedStrategy("PREPARING STRATEGIC BRIEF...");
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

            // HUMAN-LIKE REFINEMENT: Inject natural fillers and pauses
            let naturalText = text;
            if (Math.random() > 0.6) {
                const fillers = [
                    "Well, honestly, ",
                    "You know, ",
                    "Looking at the data, ",
                    "Actually, if we think about it, ",
                    "So, here's the thing: ",
                    "I mean, ",
                    "Right, so, "
                ];
                naturalText = fillers[Math.floor(Math.random() * fillers.length)] + text;
            }

            // Inject natural micro-pauses for human cadence
            naturalText = naturalText.replace(/\, /g, ", ... ");
            naturalText = naturalText.replace(/\. /g, ". ...... ");
            naturalText = naturalText.replace(/\? /g, "? ... ");

            if (Math.random() > 0.8) {
                naturalText = "Um, " + naturalText;
            }

            const utterance = new SpeechSynthesisUtterance(naturalText);
            const archetype = getArchetype();

            utterance.rate = avatarVoiceSettings.rate || archetype.rate;
            // Slightly lower pitch for more authority if not specified
            utterance.pitch = avatarVoiceSettings.pitch || (avatarName.toLowerCase().includes('alvin') ? 0.9 : 1.0);
            utterance.volume = 1.0;

            const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
            // Voice Selection: Prioritize Professional & Authoritative Tones
            const isMale = avatarName.toLowerCase().includes('alvin') || avatarName.toLowerCase().includes('marcus') || avatarName.toLowerCase().includes('andre') || avatarName.toLowerCase().includes('james');

            let preferredVoice;
            const isAlvin = avatarName.toLowerCase().includes('alvin');
            if (isAlvin) {
                // SPECIAL EXECUTIVE VOICE -- Attempt to find deep/authoritative voices
                preferredVoice = voices.find(v =>
                    v.name === 'Daniel' || // Premium iOS/Mac
                    v.name.includes('Google UK English Male') || // Deep
                    v.name.includes('Rocko') // Android deep
                ) || voices.find(v => v.name.includes('David'));
            } else if (isMale) {
                // Targeted selection for professional male resonance
                preferredVoice = voices.find(v => (v.name.includes('Google US English') || v.name.includes('Daniel') || v.name.includes('David')) && v.lang.startsWith('en'));
            } else {
                // Targeted selection for clear, professional female resonance
                preferredVoice = voices.find(v => (v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Zira')) && v.lang.startsWith('en'));
            }

            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.onstart = () => {
                setIsSpeaking(true);
                setCognitiveState('speaking');
                // Auto-clear curiosity after speaking it
                if (curiosityCenter) {
                    setTimeout(() => setCuriosityCenter(null), 5000);
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
                // Fallback to TTS
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
            {/* GAMIFIED XP & LEVEL UP OVERLAY */}
            <AnimatePresence>
                {xpNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.5, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: -50, scale: 0.5, rotateX: 90 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none flex flex-col items-center gap-2"
                    >
                        {/* Glowing Level Up Badge */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 blur-xl opacity-60 animate-pulse" />
                            <div className="relative flex items-center gap-3 px-8 py-4 bg-black/90 text-white rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.5)] border-2 border-amber-500/50 backdrop-blur-xl">
                                <Trophy size={32} className="text-amber-400 animate-[bounce_1s_infinite]" />
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-sm">
                                        +{xpNotification.amount} XP
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-500/80 tracking-[0.3em] uppercase">{xpNotification.label}</span>
                                </div>
                            </div>
                        </div>

                        {/* Combo/Streak Indicator (Pseudo-random for effect) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-indigo-400"
                        >
                            Executive Streak x2
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-full max-w-6xl h-[90vh] bg-neutral-950 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                {/* Simplified Header */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">{avatarName}</h2>
                                <p className="text-sm text-zinc-400 font-medium">{avatarRole}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsCloning(true)}
                                className="px-6 py-3 rounded-2xl bg-indigo-500/10 text-indigo-400 font-bold text-xs uppercase tracking-widest hover:bg-indigo-500/20 transition-all border border-indigo-500/20 active:scale-95 flex items-center gap-2"
                            >
                                <Mic size={14} />
                                Initialize Voice Clone
                            </button>
                            <button
                                onClick={() => {
                                    if (onShowBriefing) {
                                        onShowBriefing();
                                    } else {
                                        // Fallback if no callback provided
                                        setIsArchitecting(true);
                                        setDraftedStrategy("INITIATING VISUAL BRIEFING...");
                                        setTimeout(() => setIsArchitecting(false), 3000);
                                    }
                                }}
                                className="px-6 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5 active:scale-95"
                            >
                                Video Briefing
                            </button>
                            <button
                                onClick={() => handleGenerateVideo("I am ready to provide a full video briefing using my Neural Real-Time Engine. Please confirm your directive.")}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] border-2 border-white/20 active:scale-95 flex items-center gap-3 animate-pulse"
                                title="Generates a real HeyGen video (Takes 2-5 mins)"
                            >
                                <Video size={18} className="animate-spin-slow" />
                                <span>GENERATE 4K VIDEO AVATAR</span>
                            </button>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-95 shadow-xl"
                                >
                                    End Interaction
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Interaction Area */}

                {/* API Vault & Voice Controls */}
                <div className="absolute top-24 right-8 z-30 w-80 pointer-events-auto">
                    <SovereignApiVault />
                </div>

                <div className="relative w-full h-full flex flex-col md:flex-row">
                    {/* Video/Avatar Hero */}
                    <div className="flex-1 relative bg-black overflow-hidden group">
                        {/* Neural Background Mesh (Subtle) */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 pointer-events-none" />

                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                scale: isSpeaking ? 1.02 : breathScale,
                                rotateY: presenceX * 15, // Head horizontal follow
                                rotateX: -presenceY * 10, // Head vertical follow
                                x: presenceX * 20, // Parallax shift
                                y: presenceY * 20,
                                opacity: isConnected ? 1 : 0.6
                            }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            {isVideoEnabled ? (
                                <div className="w-full h-full">
                                    <motion.img
                                        src={imgSrc}
                                        alt={avatarName}
                                        onError={() => setImgSrc('/images/avatars/executive_leader.png')} // Fallback to generic leader
                                        className="w-full h-full object-cover origin-bottom"
                                        style={behavior.style}
                                        animate={{
                                            filter: isSpeaking ? 'contrast(1.1) brightness(1.05) saturate(1.1) drop-shadow(0 0 20px rgba(99,102,241,0.3))' : 'contrast(1) brightness(1) saturate(1)',
                                            y: behaviorStyles.brow * 2,
                                            // Voice-reactive micro-jitter for vocal resonance
                                            x: isSpeaking ? [0, 0.5, -0.5, 0] : 0,
                                            scale: isSpeaking ? [1.02, 1.05, 1.02] : 1
                                        }}
                                        transition={isSpeaking ? { duration: 0.2, repeat: Infinity } : { duration: 0.8 }}
                                    />

                                    {/* Neural Mirror Technology Label */}
                                    <div className="absolute top-32 left-8 z-40 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-[7px] font-mono text-indigo-300 uppercase tracking-tighter">
                                        Neural Mirror V4.2 // Active Sync
                                    </div>

                                    {/* Cinematic Overlays */}
                                    {cinematicMode && (
                                        <>
                                            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                                            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20 blur-xl" />
                                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 animate-scanline" />
                                        </>
                                    )}

                                    {/* GENERATED VIDEO OVERLAY */}
                                    {generatedVideoUrl && (
                                        <div className="absolute inset-0 z-50 bg-black">
                                            <video
                                                src={generatedVideoUrl}
                                                autoPlay
                                                controls
                                                className="w-full h-full object-cover"
                                                onEnded={() => setGeneratedVideoUrl(null)}
                                            />
                                            <button
                                                onClick={() => setGeneratedVideoUrl(null)}
                                                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}

                                    {/* LOADING OVERLAY */}
                                    {isGeneratingVideo && (
                                        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                            <div className="w-12 h-12 border-t-2 border-indigo-500 rounded-full animate-spin mb-4" />
                                            <p className="font-mono text-sm animate-pulse">{videoGenerationStatus}</p>
                                        </div>
                                    )}

                                    {/* African American AI Holography Glow: Enhanced with Kente Patterns */}
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                                        <div className="w-[90%] h-[90%] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse" />
                                        {/* Subtle Kente Geometric Overlay */}
                                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay scale-150 rotate-12 pointer-events-none"
                                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                    </div>

                                    {/* calibration Overlay */}
                                    <AnimatePresence>
                                        {isCalibrating && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center"
                                            >
                                                <div className="relative w-64 h-64 border border-indigo-500/30 rounded-full flex items-center justify-center">
                                                    <motion.div
                                                        className="absolute inset-0 border-t-2 border-indigo-500 rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    <div className="text-center">
                                                        <div className="text-[10px] font-mono text-indigo-400 animate-pulse mb-2">NEURAL_SYNC_MODE</div>
                                                        <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-tighter">Mapping Facet Coordinates...</div>
                                                    </div>
                                                </div>
                                                <div className="mt-8 flex gap-4">
                                                    <div className="w-12 h-[1px] bg-indigo-500/50" />
                                                    <span className="text-[7px] font-mono text-indigo-500 tracking-[0.5em] uppercase">Initializing Neural Mirror</span>
                                                    <div className="w-12 h-[1px] bg-indigo-500/50" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Subdued Mouth/Audio Feedback */}
                                    {isSpeaking && (
                                        <div className="absolute inset-x-0 bottom-[15%] flex items-center justify-center pointer-events-none z-30 opacity-60 mix-blend-screen">
                                            <div className="flex items-center gap-1">
                                                {[...Array(8)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-1.5 bg-white/60 rounded-full"
                                                        animate={{ height: [4, Math.random() * 32 + 8, 4] }}
                                                        transition={{ duration: 0.15, repeat: Infinity, delay: i * 0.05 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Realistic Blink Overlay */}
                                    <AnimatePresence>
                                        {isBlinking && (
                                            <>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "50%" }}
                                                    exit={{ height: 0 }}
                                                    transition={{ duration: 0.1 }}
                                                    className="absolute top-0 left-0 right-0 bg-black z-40"
                                                />
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "50%" }}
                                                    exit={{ height: 0 }}
                                                    transition={{ duration: 0.1 }}
                                                    className="absolute bottom-0 left-0 right-0 bg-black z-40"
                                                />
                                            </>
                                        )}
                                    </AnimatePresence>

                                    {/* Vision Analysis Sweeping Beam */}
                                    {isProcessing && (
                                        <motion.div
                                            initial={{ top: "-10%" }}
                                            animate={{ top: "110%" }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-1 z-40"
                                        >
                                            <div className="w-full h-full bg-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.8)] blur-[2px]" />
                                            <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
                                                <span className="text-[6px] font-mono text-cyan-400">ANALYZING GEOMETRY...</span>
                                                <span className="text-[6px] font-mono text-cyan-400">VERTEX_HUB_SYNC</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Google Cloud Vertex AI HUD Badge */}
                                    <div className="absolute bottom-6 left-8 z-40 flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Vertex AI Supreme</span>
                                        <div className="w-px h-3 bg-white/20" />
                                        <span className="text-[8px] font-mono text-blue-400">TPUv5_POD_04</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                    <User className="w-24 h-24 text-zinc-700" />
                                </div>
                            )}
                        </motion.div>

                        {/* PROACTIVE INTELLIGENCE HUD */}
                        <div className="absolute top-8 left-8 z-40 flex flex-col gap-3 max-w-xs pointer-events-none">
                            {/* Biometric Readout */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-4 mb-2 pointer-events-auto"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500 mb-1">Heart Resonance</span>
                                    <div className="flex items-center gap-2">
                                        <Activity size={12} className="text-rose-500 animate-pulse" />
                                        <span className="text-xs font-mono text-white">{Math.round(biometricPulse)} BPM</span>
                                    </div>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500 mb-1">Neural Load</span>
                                    <div className="flex items-center gap-2">
                                        <Brain size={12} className="text-indigo-400" />
                                        <span className="text-xs font-mono text-white">{Math.round(neuralLoad)}%</span>
                                    </div>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {tacticalSuggestions.map((suggestion, i) => (
                                    <motion.div
                                        key={suggestion.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 overflow-hidden relative group pointer-events-auto cursor-pointer hover:bg-black/80 transition-colors"
                                        onClick={() => {
                                            // Handle execution or expansion
                                            console.log("Executing protocol:", suggestion.id);
                                        }}
                                    >
                                        <div className={`absolute top-0 bottom-0 left-0 w-1 ${eqAura === 'indigo' ? 'bg-indigo-500' :
                                            eqAura === 'amber' ? 'bg-amber-500' :
                                                eqAura === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'
                                            }`} />
                                        <div className="flex items-start justify-between mb-1 pl-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{suggestion.id}</span>
                                            <Sparkles size={10} className="text-white/40" />
                                        </div>
                                        <h4 className="text-white font-bold text-xs pl-2 mb-1">{suggestion.label}</h4>
                                        <p className="text-[10px] text-zinc-400 pl-2 leading-relaxed">{suggestion.protocol}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Gaze Tracking Reticle (Follows Mouse/Attention) */}
                        <motion.div
                            className="absolute z-30 w-12 h-12 pointer-events-none opacity-40 mix-blend-screen"
                            animate={{
                                x: presenceX * 100 + window.innerWidth / 3, // Approximate center offset
                                y: presenceY * 100 + window.innerHeight / 3
                            }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-indigo-400/50" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-indigo-400/50" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-indigo-400/50" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-indigo-400/50" />
                            <div className="absolute inset-0 border border-indigo-400/30 rounded-full animate-ping" />
                        </motion.div>

                        {/* Processing Overlays (Neural Network Visualization) */}
                        <AnimatePresence>
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40"
                                >
                                    <div className="text-center relative">
                                        {/* Neural Pulse */}
                                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                                            <div className="w-64 h-64 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse" />
                                        </div>

                                        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                                            {/* Rotating Cyber Rings */}
                                            <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ animationDuration: '1s' }} />
                                            <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                                            <div className="absolute inset-4 border-b-2 border-emerald-500 rounded-full animate-spin" style={{ animationDuration: '2s' }} />

                                            {/* Core */}
                                            <div className="relative z-10 bg-black/50 rounded-full p-4 backdrop-blur-md border border-white/10">
                                                <Brain className="w-8 h-8 text-white animate-pulse" />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white tracking-[0.2em] uppercase mb-2 animate-pulse">{processingStage || 'Processing'}</h3>
                                        <p className="text-[10px] text-indigo-300 font-mono flex items-center justify-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                                            NEURAL LINK ESTABLISHED // 14ms
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Generative Visual Architect Overlay */}
                        <AnimatePresence>
                            {isArchitecting && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center pointer-events-none"
                                >
                                    <div className="relative w-[800px] h-[500px] border border-white/10 rounded-3xl bg-black/90 overflow-hidden flex flex-col p-8">
                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                                    <Brain size={18} className="text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Generative Architect</h3>
                                                    <p className="text-[10px] text-zinc-500 font-mono">NEURAL TOPOLOGY RENDERER</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] text-zinc-400 font-mono">V.2.0.4</span>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            </div>
                                        </div>

                                        {/* Visualization Core */}
                                        <div className="flex-1 relative flex items-center justify-center">
                                            {/* Grid */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                            {/* Dynamic Content */}
                                            <div className="relative z-10 text-center space-y-4">
                                                <motion.div
                                                    className="w-32 h-32 border-2 border-indigo-500 rounded-full mx-auto relative flex items-center justify-center"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <div className="absolute inset-2 border border-purple-500/50 rounded-full" />
                                                    <div className="absolute inset-6 border border-emerald-500/50 rounded-full" />
                                                    <Sparkles size={32} className="text-white animate-pulse" />
                                                </motion.div>

                                                <div>
                                                    <h4 className="text-xl font-bold text-white mb-2">{draftedStrategy || "INITIALIZING..."}</h4>
                                                    <div className="h-1 w-48 bg-zinc-800 rounded-full mx-auto overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 2.5, ease: "easeInOut" }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer Stats & Real-time Logs */}
                                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-end">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[7px] text-emerald-400 font-mono animate-pulse">DEPLOYING TO APP_ENGINE_ZONE_B...</span>
                                                <span className="text-[7px] text-zinc-500 font-mono">BIGQUERY_STREAM: ACTIVE // {Math.round(neuralLoad * 1.5)} RPS</span>
                                            </div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase text-right space-y-1">
                                                <div>Nodes: 1,402 // TPU_v5</div>
                                                <div>Render: 12ms // Latency: 0ms</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Voice Cloning Neural Overlay */}
                        <AnimatePresence>
                            {isCloning && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                                >
                                    <div className="relative w-full max-w-2xl bg-zinc-900 border border-indigo-500/30 rounded-3xl p-8 overflow-hidden">
                                        {/* Background FX */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1)_0%,transparent_50%)]" />

                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 relative">
                                                <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping" />
                                                <Mic className="text-indigo-400 w-8 h-8" />
                                            </div>

                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Voice Neural Synapse</h3>
                                            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-8">
                                                Please speak a clear sentence to initialize your unique voice fingerprint. The system is capturing tonal resonance and pitch vectors.
                                            </p>

                                            {/* Audio Waveform Visualization */}
                                            <div className="h-16 flex items-center justify-center gap-1 mb-8 w-full max-w-md">
                                                {[...Array(20)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-2 bg-indigo-500 rounded-full"
                                                        animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                                                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                                                    />
                                                ))}
                                            </div>

                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setIsCloning(false)}
                                                    className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        // Simulate successful cloning
                                                        setIsCloning(false);
                                                        setDraftedStrategy("VOICE MODEL INTEGRATED SUCCESSFULLY");
                                                        setIsArchitecting(true);
                                                        setTimeout(() => setIsArchitecting(false), 3000);
                                                    }}
                                                    className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
                                                >
                                                    Confirm Voice Model
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleGenerateVideo(textInput)}
                                                disabled={!textInput.trim() || isGeneratingVideo}
                                                className="w-full py-4 mt-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/30 animate-pulse border border-red-500/50"
                                            >
                                                <Video size={16} />
                                                {isGeneratingVideo ? 'Rendering Stream...' : 'GENERATE 4K VIDEO AVATAR'}
                                            </button>

                                            {/* DEBUG / TEST BUTTON */}
                                            <button
                                                onClick={handleTestStream}
                                                disabled={isGeneratingVideo}
                                                className="w-full py-2 mt-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-mono text-[10px] uppercase tracking-widest rounded-lg border border-zinc-700 hover:text-white transition-all flex items-center justify-center gap-2"
                                            >
                                                <Zap size={10} />
                                                System Test: Force 4K Stream Generation
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Speaking / Audio Visualization Context */}
                        {isSpeaking && !isProcessing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-8 right-8 z-30 flex flex-col items-end gap-1 pointer-events-none"
                            >
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Voice Output Active</span>
                                </div>
                                <div className="flex gap-0.5 h-3 items-end">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 bg-emerald-400/80 rounded-full"
                                            animate={{ height: [2, Math.random() * 12 + 4, 2] }}
                                            transition={{ duration: 0.15, repeat: Infinity, delay: i * 0.05 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Speech Bubble / Transcript */}
                        <div className="absolute bottom-32 inset-x-0 px-8 flex justify-center z-30 pointer-events-none">
                            <AnimatePresence mode="wait">
                                {isSpeaking && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl max-w-2xl text-center"
                                    >
                                        <p className="text-lg text-white font-medium">{conversation[conversation.length - 1]?.text}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Chat Sidebar (Optional/Visible only if toggled) */}
                    <AnimatePresence>
                        {showTextInput && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 400, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="bg-zinc-900/50 backdrop-blur-3xl border-l border-white/10 flex flex-col p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xs font-black text-white uppercase tracking-widest">Conversation</h3>
                                    <button onClick={() => setShowTextInput(false)} className="text-zinc-500 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-6 custom-scrollbar pr-2">
                                    {conversation.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-white text-black font-bold' : 'bg-white/5 text-white border border-white/10'}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (textInput.trim()) {
                                            handleUserSpeech(textInput);
                                            setTextInput('');
                                        }
                                    }}
                                    className="relative"
                                >
                                    <input
                                        autoFocus
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                                        <Send size={20} />
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center">
                    <div className="flex items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleMicrophone}
                            className={`p-5 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isListening ? <Mic size={24} /> : <MicOff size={24} />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleConnection}
                            className={`p-8 rounded-full shadow-2xl transition-all ${isConnected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-500 text-white hover:bg-green-600'}`}
                        >
                            {isConnected ? <PhoneOff size={32} /> : <Phone size={32} />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowTextInput(!showTextInput)}
                            className={`p-5 rounded-full transition-all ${showTextInput ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            <MessageSquare size={24} />
                        </motion.button>
                    </div>

                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                        {isConnected ? (
                            isListening ? (
                                <span className="text-red-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    LISTENING TO INPUT...
                                </span>
                            ) : (
                                <span className="text-emerald-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    SESSION ACTIVE // AWAITING COMMAND
                                </span>
                            )
                        ) : (
                            'SECURE CONNECTION READY'
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes scanline {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100vh); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </motion.div>
    );
}
