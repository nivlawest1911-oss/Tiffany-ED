'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Globe, X, Video, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Free-tier capable interaction types
type InteractionState = 'listening' | 'processing' | 'speaking' | 'idle';

export default function ProfessionalPortal() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<InteractionState>('idle');
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);

    // Mock "VAD" (Voice Activity Detection) - in real implementation, use Web Speech API
    const startListening = () => {
        setState('listening');
        // Simulate speech recognition delay
        setTimeout(() => {
            setState('processing');
            setTranscript("EdIntel, record a field observation: John Doe is hitting his reading benchmarks but struggling with peer interaction in the gym.");
            processIntent();
        }, 3000);
    };

    const processIntent = () => {
        setTimeout(() => {
            setAiResponse("I've logged that observation. Updating John Doe's Reading file to 'Benchmark Achieved' and flagging 'Social/Emotional' for peer interaction review. Would you like me to draft a parent update?");
            setState('speaking');
            speakResponse("I've logged that observation. Updating John Doe's Reading file to 'Benchmark Achieved' and flagging 'Social/Emotional' for peer interaction review. Would you like me to draft a parent update?");
        }, 2000);
    };

    const speakResponse = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Use a "Google US English" or similar high-quality free voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v => v.name.includes('Google US English')) || voices[0];
            utterance.voice = preferred;
            utterance.rate = 1.0;
            utterance.onend = () => setState('idle');
            window.speechSynthesis.speak(utterance);
        } else {
            setState('idle');
        }
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-play video "avatar" loop
    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        }
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-36 right-8 z-40 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="pointer-events-auto w-80 md:w-96 bg-black/90 backdrop-blur-xl border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl relative"
                    >
                        {/* Live Avatar Video Feed (Simulated for Free Tier) */}
                        <div className="relative aspect-video bg-zinc-900">
                            {/* Placeholder for "HeyGen" or similar - using a static soothing loop or just a gradient for now if no video asset */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-zinc-900 to-black flex items-center justify-center">
                                <div className="text-center opacity-50">
                                    <Video className="w-12 h-12 mx-auto mb-2 text-amber-500" />
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-amber-500 animate-pulse">Sovereign Uplink Secured</p>
                                    <p className="text-[8px] text-zinc-500 mt-1">ELITE TIER: <span className="text-emerald-500">ACTIVE</span></p>
                                </div>
                            </div>

                            {/* Overlay UI */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75 ${state === 'speaking' ? 'bg-indigo-400' : 'bg-emerald-400'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${state === 'speaking' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></span>
                                </span>
                                <span className="text-[9px] font-mono font-bold text-white/70 uppercase">
                                    {state === 'idle' ? 'Listening...' : state.toUpperCase()}
                                </span>
                            </div>

                            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Conversation Interface */}
                        <div className="p-4 space-y-4">
                            {/* Transcript Area */}
                            <div className="min-h-[60px] max-h-[100px] overflow-y-auto custom-scrollbar">
                                {transcript && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-zinc-400 mb-2 italic">
                                        "{transcript}"
                                    </motion.p>
                                )}
                                {aiResponse && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white font-medium">
                                        {aiResponse}
                                    </motion.p>
                                )}
                            </div>

                            {/* Interaction Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={startListening}
                                    disabled={state !== 'idle'}
                                    className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition-all ${state === 'listening' ? 'bg-red-500/20 text-red-500 border border-red-500/50' :
                                        'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                                        }`}
                                >
                                    <div className={`p-1.5 rounded-full ${state === 'listening' ? 'bg-red-500' : 'bg-zinc-700'}`}>
                                        <Mic size={14} className="text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        {state === 'listening' ? 'Recording...' : 'Hold to Speak'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Data "Push" Context (Simulated) */}
                        <div className="bg-indigo-900/20 border-t border-indigo-500/20 p-2 flex items-center justify-between">
                            <span className="text-[9px] text-indigo-300 font-mono flex items-center gap-1">
                                <Globe size={10} /> CONTEXT: ROOM 304 OBSERVATION
                            </span>
                            <Maximize2 size={10} className="text-indigo-400" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 border border-white/10 group"
                >
                    <Video className="text-white group-hover:scale-110 transition-transform" />
                </motion.button>
            )}
        </div>
    );
}
