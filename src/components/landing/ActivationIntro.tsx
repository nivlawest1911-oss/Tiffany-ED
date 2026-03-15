'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EdIntelCore from '../edintel-core/EdIntelCore';
import ActivationNarrative from './ActivationNarrative';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';

// Grand Entrance Video URL
const ENTRANCE_VIDEO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Educators_using_edintel_app_44bfcfe528-4bcSevHv9NVPi7nYdhR9pkPjQdel7X.mp4';

const BIOS_LINES = [
    "EDINTEL(R) SOVEREIGN BIOS V5.0.0",
    "COPYRIGHT (C) 2026 EDINTEL ADAPTIVE SYSTEMS",
    "INITIALIZING COGNITIVE HOLOGRAM MATRIX...",
    "CHECKING NEURAL NETWORKS... [OK]",
    "INITIALIZING QUANTUM UPLINK... [OK]",
    "ESTABLISHING SOVEREIGN GATEKEEPER... [OK]",
    "WARNING: FRAGMENTED DATA DETECTED.",
    "COMMENCING RECONSTRUCTION PROTOCOL...",
    "ACTIVATING RESCUE ONE OVERRIDE... [READY]",
    "SYSTEM STABILIZATION: INITIALIZED",
];

// Holographic Humanoid Wireframe Component
function HolographicHumanoid({ phase }: { phase: string }) {
    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'scene1' ? 0.6 : 0.3 }}
            transition={{ duration: 2 }}
        >
            <svg
                viewBox="0 0 200 400"
                className="w-48 h-96 md:w-64 md:h-[500px] holographic-drop-shadow"
            >
                <defs>
                    <linearGradient id="humanoidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="humanoidGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#humanoidGlow)" stroke="url(#humanoidGrad)" strokeWidth="1.5" fill="none">
                    {/* Head */}
                    <motion.ellipse
                        cx="100" cy="40" rx="25" ry="30"
                        animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Neck */}
                    <line x1="100" y1="70" x2="100" y2="90" />
                    {/* Torso */}
                    <motion.path
                        d="M 60 90 L 100 100 L 140 90 L 135 180 L 100 190 L 65 180 Z"
                        animate={{ pathLength: [0, 1] }}
                        transition={{ duration: 2, delay: 0.5 }}
                    />
                    {/* Arms */}
                    <motion.path
                        d="M 60 95 L 30 150 L 25 200"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.path
                        d="M 140 95 L 170 150 L 175 200"
                        animate={{ x: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    {/* Legs */}
                    <path d="M 80 190 L 70 280 L 60 370" />
                    <path d="M 120 190 L 130 280 L 140 370" />
                    {/* Core energy */}
                    <motion.circle
                        cx="100" cy="140" r="15"
                        fill="#D4AF37"
                        fillOpacity="0.3"
                        animate={{ r: [15, 20, 15], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {/* Data streams */}
                    {[...Array(8)].map((_, i) => (
                        <motion.line
                            key={i}
                            x1={100 + Math.cos(i * 45 * Math.PI / 180) * 20}
                            y1={140 + Math.sin(i * 45 * Math.PI / 180) * 20}
                            x2={100 + Math.cos(i * 45 * Math.PI / 180) * 60}
                            y2={140 + Math.sin(i * 45 * Math.PI / 180) * 60}
                            stroke="#00E5FF"
                            strokeWidth="0.5"
                            animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </g>
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
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#D4AF37" strokeWidth="0.3" />
                        <circle cx="0" cy="0" r="2" fill="#00E5FF" opacity="0.5" />
                        <circle cx="80" cy="80" r="2" fill="#D4AF37" opacity="0.5" />
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
                    className={`absolute rounded-full star-p-${(i % 20) + 1} ${i % 2 === 0 ? 'bg-sovereign-gold' : 'bg-electric-cyan opacity-40 blur-[1px]'}`}
                    animate={{
                        y: [0, -50 - (i * 2), 0],
                        x: [0, (i % 2 === 0 ? 20 : -20), 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 5 + (i % 5),
                        repeat: Infinity,
                        delay: (i % 10) * 0.3,
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
    const progressRef = useRef<HTMLDivElement>(null);

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
            if (progressRef.current) {
                progressRef.current.style.width = `${progress}%`;
            }
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
                        <div className="absolute inset-0 pointer-events-none opacity-10 bento-scan-lines" />
                        
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
                                <div
                                    ref={progressRef}
                                    className="h-full bg-gradient-to-r from-sovereign-gold to-electric-cyan progress-bar-fill"
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
                                    <span className={line && (line.includes('[OK]') || line.includes('[ACTIVE]') || line.includes('[LOADED]') || line.includes('[READY]') || line.includes('INITIALIZED')) ? 'text-emerald-400' : (line && line.includes('WARNING') ? 'text-rose-400' : '')}>
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
                                className="relative px-12 py-4 bg-gradient-to-r from-[#D4AF37] via-[#C5A02E] to-[#D4AF37] text-black font-black uppercase tracking-widest rounded-xl hover:scale-110 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.4)] overflow-hidden group"
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
