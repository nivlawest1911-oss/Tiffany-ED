'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Activity, Globe, Shield, Cpu, Lock } from 'lucide-react';

interface LiveBriefingConsoleProps {
    name: string;
    description: string;
    role: string;
    color: string;
    prompts: string[];
    onComplete?: () => void;
}

export default function LiveBriefingConsole({ name, description, role, color, prompts, onComplete }: LiveBriefingConsoleProps) {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const hasStartedRef = useRef(false);

    // Dynamic Script Generation
    const fullScript = `Sovereign Protocol Initiated. Target: ${name}. 
    
    Objective: ${description} 
    
    I am configured as your ${role}. My neural pathways are optimized to assist you with ${prompts[0]}, ${prompts[1]}, and other high-level tasks. 
    
    Systems are nominal. Secure connection established. Awaiting your directives, Executive.`;

    useEffect(() => {
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;

        let charIndex = 0;
        setIsSpeaking(true);

        // Text Typing Effect
        const typeInterval = setInterval(() => {
            if (charIndex < fullScript.length) {
                setText(fullScript.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsSpeaking(false);
                if (onComplete) onComplete();
            }
        }, 40); // Typing speed

        // Speech Synthesis
        const utterance = new SpeechSynthesisUtterance(fullScript);
        utterance.rate = 1.0;
        utterance.pitch = 1.05; // Slightly robotic/formal

        // Select a preferred voice if available (Google US English or similar)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
        if (preferredVoice) utterance.voice = preferredVoice;

        // Visual sync
        utterance.onend = () => {
            setIsSpeaking(false);
        };

        window.speechSynthesis.cancel(); // Clear previous
        // Small delay to allow UI to settle
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 500);

        return () => {
            window.speechSynthesis.cancel();
            clearInterval(typeInterval);
        };
    }, [fullScript, name, description, role, prompts, onComplete]);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center p-8 border-r border-white/10">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-repeat" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

            {/* Central Visual - The "Eye" of the AI */}
            <div className="relative z-10 mb-12">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Pulsing Rings */}
                    <div className={`absolute inset-0 rounded-full border-2 border-${color.split('-')[1] || 'indigo'}-500/30 animate-[ping_3s_ease-in-out_infinite]`} />
                    <div className={`absolute inset-4 rounded-full border border-${color.split('-')[1] || 'indigo'}-400/50 animate-[spin_10s_linear_infinite]`} />
                    <div className={`absolute inset-0 rounded-full bg-${color.split('-')[1] || 'indigo'}-500/10 blur-xl`} />

                    {/* Core Icon */}
                    <div className="relative z-20 bg-black/50 backdrop-blur-sm p-4 rounded-full border border-white/10">
                        <Cpu className={`w-12 h-12 text-${color.split('-')[1] || 'indigo'}-400`} />
                    </div>
                </div>

                {/* Audio Waveform Visualization (Simulated) */}
                <div className="flex justify-center gap-1 mt-8 h-8 items-center">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: isSpeaking ? [10, 32, 10] : 4,
                                opacity: isSpeaking ? 1 : 0.3
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                            }}
                            className={`w-1.5 rounded-full bg-${color.split('-')[1] || 'indigo'}-500`}
                        />
                    ))}
                </div>
            </div>

            {/* Terminal Output */}
            <div className="relative z-10 w-full max-w-2xl bg-zinc-950/80 backdrop-blur-md rounded-xl border border-white/10 p-6 min-h-[160px] shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Live Transcript_Stream</span>
                    </div>
                    <Lock className="w-3 h-3 text-zinc-600" />
                </div>

                {/* Text Stream */}
                <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {text}
                    <span className="animate-pulse inline-block w-2 h-4 bg-indigo-500 ml-1 align-middle" />
                </p>
            </div>

            {/* Footer Status Indicators */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-60">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest">{new Date().toISOString()}</span>
                    <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest">ENCRYPTED::AES-256</span>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-zinc-600" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Net: Global</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-zinc-600" />
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Sec: High</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
