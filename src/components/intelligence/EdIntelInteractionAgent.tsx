'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HumanAvatar from '@/components/ui/HumanAvatar';
import { Volume2 } from 'lucide-react';

interface InteractionAgentProps {
    children: React.ReactNode;
    title: string;
    description: string;
    agentId?: 'visionary' | 'strategic' | 'tactical' | 'philosopher';
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

const AGENTS = {
    visionary: {
        name: "Dr. Alvin West",
        role: "EdIntel Architect",
        avatar: "/images/avatars/Dr._alvin_west.png",
        color: "text-noble-gold",
        borderColor: "border-noble-gold/30",
        bgColor: "bg-noble-gold/5"
    },
    strategic: {
        name: "Keisha Reynolds",
        role: "Strategic Lead",
        avatar: "/images/avatars/keisha_reynolds_premium.png",
        color: "text-emerald-400",
        borderColor: "border-emerald-500/30",
        bgColor: "bg-emerald-500/5"
    },
    tactical: {
        name: "André Patterson",
        role: "Tactical Specialist",
        avatar: "/images/avatars/andre_patterson_premium.png",
        color: "text-blue-400",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5"
    },
    philosopher: {
        name: "Dr. Isaiah Vance",
        role: "Ethics & Governance",
        avatar: "/images/avatars/dr_isaiah_vance_premium.png",
        color: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/5"
    }
};

export default function EdIntelInteractionAgent({
    children,
    title,
    description,
    agentId = 'visionary',
    position = 'bottom',
    className = ""
}: InteractionAgentProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const agent = AGENTS[agentId];

    const stopSpeaking = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
            speechTimeoutRef.current = null;
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        stopSpeaking();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        // Try to find a nice voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            v.name.includes('Google US English') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel')
        );
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [stopSpeaking]);

    useEffect(() => {
        if (isHovered) {
            // Delay speech slightly to avoid accidental triggers
            speechTimeoutRef.current = setTimeout(() => {
                speak(`${title}. ${description}`);
            }, 500);
        } else {
            stopSpeaking();
        }
        return () => stopSpeaking();
    }, [isHovered, title, description, speak, stopSpeaking]);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
        left: "right-full top-1/2 -translate-y-1/2 mr-4 hidden sm:block",
        right: "left-full top-1/2 -translate-y-1/2 ml-4 hidden sm:block"
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: position === 'bottom' ? 10 : -10, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, y: position === 'bottom' ? 10 : -10, filter: 'blur(10px)' }}
                        className={`absolute z-[100] w-[85vw] sm:w-80 pointer-events-none ${positionClasses[position]}`}
                    >
                        <div className={`liquid-glass p-6 rounded-[2rem] border ${agent.borderColor} ${agent.bgColor} backdrop-blur-3xl shadow-2xl`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`relative w-14 h-14 rounded-2xl overflow-hidden border-2 ${agent.borderColor}`}>
                                    <HumanAvatar
                                        src={agent.avatar}
                                        alt={agent.name}
                                        className="w-full h-full object-cover"
                                        isActive={isHovered}
                                    />
                                    {isSpeaking && (
                                        <div className="absolute inset-0 bg-noble-gold/10 flex items-center justify-center">
                                            <div className="flex gap-1">
                                                <motion.div
                                                    animate={{ height: [4, 12, 4] }}
                                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                                    className="w-1 bg-noble-gold rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ height: [4, 12, 4] }}
                                                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                                                    className="w-1 bg-noble-gold rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ height: [4, 12, 4] }}
                                                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                                                    className="w-1 bg-noble-gold rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase text-white tracking-widest">{agent.name}</h4>
                                    <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${agent.color} italic`}>{agent.role}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${agent.color} animate-pulse`} />
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{title}</span>
                                </div>
                                <p className="text-[11px] text-white/70 font-bold leading-relaxed italic border-l-2 border-white/10 pl-3">
                                    "{description}"
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">
                                <div className="flex items-center gap-2">
                                    <Volume2 size={10} className={isSpeaking ? 'text-noble-gold' : ''} />
                                    <span>{isSpeaking ? 'Transmitting Audio' : 'Audio Ready'}</span>
                                </div>
                                <span>Agent ID: {agentId.toUpperCase()}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
