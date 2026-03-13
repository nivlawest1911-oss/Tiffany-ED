'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EdIntelCore from '../edintel-core/EdIntelCore';
import ActivationNarrative from './ActivationNarrative';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';

// Grand Entrance Video URL - EdIntel Opening Cinematic
const ENTRANCE_VIDEO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Generation_For_Edintel-YclNpKS4YtfngAn4YBNdgyyDQDzvJV.mp4';

const BIOS_LINES = [
    "EDINTEL(R) SOVEREIGN BIOS V5.0.0",
    "COPYRIGHT (C) 2026 EDINTEL ADAPTIVE SYSTEMS",
    "INITIALIZING COGNITIVE HOLOGRAM MATRIX...",
    "CHECKING NEURAL NETWORKS... [OK]",
    "INITIALIZING QUANTUM UPLINK... [OK]",
    "ESTABLISHING SOVEREIGN GATEKEEPER... [OK]",
    "HUMANOID INTEGRATION PROTOCOL... [ACTIVE]",
    "GLASSMORPHIC ARCHITECTURE... [LOADED]",
    "COMMENCING SYSTEM ACTIVATION...",
];

// Futuristic Humanoid Robot Component - Sleek black body with cyan accents
function HolographicHumanoid({ phase }: { phase: string }) {
    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'scene1' ? 0.9 : 0.6 }}
            transition={{ duration: 2 }}
        >
            <svg
                viewBox="0 0 200 400"
                className="w-48 h-96 md:w-64 md:h-[500px]"
                style={{ filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.6))' }}
            >
                <defs>
                    {/* Glossy black body gradient */}
                    <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="30%" stopColor="#2d2d2d" />
                        <stop offset="50%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </linearGradient>
                    {/* White accent panels */}
                    <linearGradient id="robotAccentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#e0e0e0" />
                    </linearGradient>
                    {/* Cyan glow visor */}
                    <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" />
                        <stop offset="50%" stopColor="#00B8D4" />
                        <stop offset="100%" stopColor="#0097A7" />
                    </linearGradient>
                    <filter id="robotGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="cyanGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feFlood floodColor="#00E5FF" floodOpacity="0.8" />
                        <feComposite in2="blur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* ROBOT HEAD - Sleek helmet design */}
                <g filter="url(#robotGlow)">
                    {/* Main helmet shell */}
                    <motion.path
                        d="M 100 10 C 140 10 160 35 160 60 C 160 85 140 100 100 100 C 60 100 40 85 40 60 C 40 35 60 10 100 10"
                        fill="url(#robotBodyGrad)"
                        stroke="#333"
                        strokeWidth="1"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    {/* White accent panel on forehead */}
                    <path
                        d="M 80 20 Q 100 15 120 20 L 115 35 Q 100 30 85 35 Z"
                        fill="url(#robotAccentGrad)"
                        opacity="0.9"
                    />
                    {/* Visor - glowing cyan */}
                    <motion.path
                        d="M 55 50 Q 100 40 145 50 Q 145 70 100 75 Q 55 70 55 50"
                        fill="url(#visorGrad)"
                        filter="url(#cyanGlow)"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Ear panels */}
                    <ellipse cx="45" cy="55" rx="8" ry="15" fill="url(#robotAccentGrad)" />
                    <ellipse cx="155" cy="55" rx="8" ry="15" fill="url(#robotAccentGrad)" />
                </g>

                {/* NECK */}
                <rect x="85" y="100" width="30" height="20" fill="url(#robotBodyGrad)" rx="5" />

                {/* TORSO - Sleek robotic body */}
                <g filter="url(#robotGlow)">
                    <motion.path
                        d="M 55 120 L 145 120 L 140 200 Q 100 210 60 200 Z"
                        fill="url(#robotBodyGrad)"
                        stroke="#333"
                        strokeWidth="1"
                        animate={{ scale: [1, 1.01, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    {/* Chest display panel */}
                    <rect x="75" y="135" width="50" height="40" rx="5" fill="#1a1a1a" stroke="#00E5FF" strokeWidth="1" />
                    <motion.rect
                        x="80" y="140" width="40" height="30" rx="3"
                        fill="#00E5FF"
                        opacity="0.3"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {/* White accent strips */}
                    <rect x="55" y="125" width="15" height="60" fill="url(#robotAccentGrad)" rx="3" />
                    <rect x="130" y="125" width="15" height="60" fill="url(#robotAccentGrad)" rx="3" />
                </g>

                {/* ARMS - Robotic segmented */}
                <g filter="url(#robotGlow)">
                    {/* Left arm */}
                    <motion.path
                        d="M 55 125 L 35 160 L 30 200 L 25 240"
                        stroke="url(#robotBodyGrad)"
                        strokeWidth="18"
                        fill="none"
                        strokeLinecap="round"
                        animate={{ rotate: [0, 2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <circle cx="35" cy="160" r="8" fill="url(#robotAccentGrad)" />
                    <circle cx="25" cy="240" r="10" fill="url(#robotBodyGrad)" stroke="#00E5FF" strokeWidth="2" />

                    {/* Right arm */}
                    <motion.path
                        d="M 145 125 L 165 160 L 170 200 L 175 240"
                        stroke="url(#robotBodyGrad)"
                        strokeWidth="18"
                        fill="none"
                        strokeLinecap="round"
                        animate={{ rotate: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    <circle cx="165" cy="160" r="8" fill="url(#robotAccentGrad)" />
                    <circle cx="175" cy="240" r="10" fill="url(#robotBodyGrad)" stroke="#00E5FF" strokeWidth="2" />
                </g>

                {/* LOWER BODY */}
                <path
                    d="M 60 200 Q 100 220 140 200 L 135 260 Q 100 270 65 260 Z"
                    fill="url(#robotBodyGrad)"
                />

                {/* LEGS */}
                <g filter="url(#robotGlow)">
                    <path d="M 75 260 L 70 320 L 65 370" stroke="url(#robotBodyGrad)" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <path d="M 125 260 L 130 320 L 135 370" stroke="url(#robotBodyGrad)" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <circle cx="70" cy="320" r="6" fill="url(#robotAccentGrad)" />
                    <circle cx="130" cy="320" r="6" fill="url(#robotAccentGrad)" />
                    {/* Feet */}
                    <ellipse cx="65" cy="375" rx="15" ry="8" fill="url(#robotBodyGrad)" />
                    <ellipse cx="135" cy="375" rx="15" ry="8" fill="url(#robotBodyGrad)" />
                </g>

                {/* GLOWING ACCENTS */}
                <motion.circle
                    cx="100" cy="155" r="8"
                    fill="#00E5FF"
                    filter="url(#cyanGlow)"
                    animate={{ r: [6, 10, 6], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Shoulder lights */}
                <motion.circle cx="55" cy="125" r="4" fill="#00E5FF" filter="url(#cyanGlow)"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="145" cy="125" r="4" fill="#00E5FF" filter="url(#cyanGlow)"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />

                {/* Data connection lines */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.line
                        key={i}
                        x1={100 + Math.cos(angle * Math.PI / 180) * 25}
                        y1={155 + Math.sin(angle * Math.PI / 180) * 25}
                        x2={100 + Math.cos(angle * Math.PI / 180) * 70}
                        y2={155 + Math.sin(angle * Math.PI / 180) * 70}
                        stroke="#00E5FF"
                        strokeWidth="1"
                        opacity="0.4"
                        animate={{ opacity: [0, 0.8, 0], pathLength: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
            </svg>
        </motion.div>
    );
}

// Cognitive Hologram Grid
function CognitiveGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                    <pattern id="cogGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFB300" strokeWidth="0.3" />
                        <circle cx="0" cy="0" r="2" fill="#00E5FF" opacity="0.5" />
                        <circle cx="80" cy="80" r="2" fill="#FFB300" opacity="0.5" />
                    </pattern>
                </defs>
                <motion.rect
                    width="100%" height="100%"
                    fill="url(#cogGrid)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                />
            </svg>
            {/* Scanning line */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

// Fluid Particles
function FluidParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: Math.random() * 4 + 2,
                        height: Math.random() * 4 + 2,
                        background: i % 2 === 0 ? '#FFB300' : '#00E5FF',
                        boxShadow: `0 0 ${8 + Math.random() * 8}px ${i % 2 === 0 ? '#FFB300' : '#00E5FF'}`,
                    }}
                    animate={{
                        y: [0, -50 - Math.random() * 100, 0],
                        x: [0, Math.random() * 40 - 20, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export default function ActivationIntro({ onCompleteAction }: { onCompleteAction: () => void }) {
    const [step, setStep] = useState<'entrance' | 'boot' | 'scene1' | 'scene2' | 'complete'>('entrance');
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [isMuted, setIsMuted] = useState(true);
    const [videoProgress, setVideoProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Handle entrance video
    useEffect(() => {
        if (step === 'entrance' && videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked, skip to boot
                setStep('boot');
            });
        }
    }, [step]);

    const handleVideoEnd = () => {
        setStep('boot');
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setVideoProgress(progress);
        }
    };

    useEffect(() => {
        if (step === 'boot') {
            let lineIdx = 0;
            const interval = setInterval(() => {
                if (lineIdx < BIOS_LINES.length) {
                    setBootLines(prev => [...prev, BIOS_LINES[lineIdx]]);
                    lineIdx++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setStep('scene1'), 600);
                }
            }, 80);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-[#020617] overflow-hidden select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
        >
            {/* Cognitive Grid Background */}
            <CognitiveGrid />
            
            {/* Fluid Particles */}
            <FluidParticles />

            <AnimatePresence mode="wait">
                {/* GRAND ENTRANCE VIDEO */}
                {step === 'entrance' && (
                    <motion.div
                        key="entrance"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full"
                    >
                        {/* Full-screen cinematic video */}
                        <video
                            ref={videoRef}
                            src={ENTRANCE_VIDEO_URL}
                            className="absolute inset-0 w-full h-full object-cover"
                            muted={isMuted}
                            playsInline
                            onEnded={handleVideoEnd}
                            onTimeUpdate={handleTimeUpdate}
                        />
                        
                        {/* Cinematic letterbox overlay */}
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
                        
                        {/* Holographic scan lines overlay */}
                        <div 
                            className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.1) 2px, rgba(0, 229, 255, 0.1) 4px)',
                            }}
                        />
                        
                        {/* EdIntel branding overlay */}
                        <motion.div
                            className="absolute top-8 left-8 flex items-center gap-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-sovereign-gold/30 shadow-[0_0_20px_rgba(255,179,0,0.3)]">
                                <Image
                                    src="/images/edintel-logo.jpg"
                                    alt="EdIntel"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-sovereign-gold font-black text-2xl tracking-wider drop-shadow-[0_0_10px_rgba(255,179,0,0.5)]">
                                    EDINTEL
                                </h1>
                                <p className="text-electric-cyan text-xs tracking-[0.3em] uppercase">
                                    Educator Intelligence
                                </p>
                            </div>
                        </motion.div>

                        {/* Mute/Unmute button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            onClick={() => setIsMuted(!isMuted)}
                            className="absolute top-8 right-8 p-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-sovereign-gold/50 transition-all"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </motion.button>

                        {/* Progress bar */}
                        <div className="absolute bottom-6 left-8 right-8">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-sovereign-gold to-electric-cyan"
                                    style={{ width: `${videoProgress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                                    Initializing EdIntel Experience
                                </span>
                                <span className="text-[10px] text-sovereign-gold font-mono">
                                    {Math.round(videoProgress)}%
                                </span>
                            </div>
                        </div>

                        {/* Corner frame accents */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-sovereign-gold/40 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-electric-cyan/40 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-electric-cyan/40 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-sovereign-gold/40 rounded-br-lg" />
                    </motion.div>
                )}

                {/* BOOT SEQUENCE */}
                {step === 'boot' && (
                    <motion.div
                        key="boot"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative h-full"
                    >
                        {/* EdIntel Logo */}
                        <motion.div
                            className="absolute top-8 left-8 flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/images/edintel-logo.jpg"
                                    alt="EdIntel"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <div>
                                <h2 className="text-sovereign-gold font-black text-lg tracking-wider">EDINTEL</h2>
                                <p className="text-electric-cyan text-[10px] tracking-[0.2em] uppercase">Educator Intelligence</p>
                            </div>
                        </motion.div>

                        <div className="p-12 pt-28 font-mono text-electric-cyan text-xs md:text-sm leading-relaxed">
                            {bootLines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mb-2 tracking-widest uppercase"
                                >
                                    <span className="mr-3 text-sovereign-gold">::</span>
                                    <span className={line && (line.includes('[OK]') || line.includes('[ACTIVE]') || line.includes('[LOADED]')) ? 'text-emerald-400' : ''}>
                                        {line || ''}
                                    </span>
                                </motion.div>
                            ))}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-2.5 h-5 bg-sovereign-gold ml-2 translate-y-1 shadow-[0_0_10px_#FFB300]"
                            />
                        </div>

                        {/* Holographic Humanoid during boot */}
                        <HolographicHumanoid phase="boot" />
                    </motion.div>
                )}

                {/* SCENE 1: THE GRID */}
                {step === 'scene1' && (
                    <motion.div
                        key="scene1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full"
                    >
                        <EdIntelCore phase="grid" className="w-full h-full" />
                        <HolographicHumanoid phase="scene1" />
                        <ActivationNarrative onCompleteAction={() => setStep('scene2')} />
                    </motion.div>
                )}

                {/* SCENE 2: THE ACTIVATION */}
                {step === 'scene2' && (
                    <motion.div
                        key="scene2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full"
                    >
                        <EdIntelCore phase="activation" className="w-full h-full" />
                        <HolographicHumanoid phase="scene2" />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3 }}
                            className="absolute bottom-16 left-1/2 -translate-x-1/2"
                        >
                            <button
                                onClick={onCompleteAction}
                                className="relative px-12 py-4 bg-gradient-to-r from-sovereign-gold via-amber-500 to-sovereign-gold text-black font-black uppercase tracking-widest rounded-xl hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,179,0,0.4)] overflow-hidden group"
                            >
                                <span className="relative z-10">Enter System</span>
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Skip Button */}
            {step !== 'complete' && (
                <button
                    onClick={step === 'entrance' ? () => setStep('boot') : onCompleteAction}
                    className="fixed bottom-8 right-8 z-[250] px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md text-zinc-500 hover:text-white hover:border-sovereign-gold/40 transition-all rounded-lg text-[10px] uppercase tracking-widest font-mono"
                >
                    {step === 'entrance' ? 'Skip Intro' : 'Skip Initialization'}
                </button>
            )}
        </motion.div>
    );
}
