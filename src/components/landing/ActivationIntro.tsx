'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EdIntelCore from '../edintel-core/EdIntelCore';
import ActivationNarrative from './ActivationNarrative';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';

// Grand Entrance Video URL
const ENTRANCE_VIDEO_URL = '/videos/edintel-intro.mp4';

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

// Enhanced Holographic Humanoid Component with Professional Executive Design
function HolographicHumanoid({ phase }: { phase: string }) {
    const isActive = phase === 'scene1' || phase === 'scene2';
    
    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
                opacity: isActive ? 0.85 : 0.4, 
                scale: isActive ? 1 : 0.95 
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Ambient glow backdrop */}
            <motion.div 
                className="absolute w-72 h-[420px] md:w-96 md:h-[560px] rounded-full"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,179,0,0.15) 0%, rgba(0,229,255,0.08) 40%, transparent 70%)',
                }}
                animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Holographic platform base */}
            <motion.div
                className="absolute bottom-[15%] md:bottom-[10%] w-40 md:w-56 h-2"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)',
                    boxShadow: '0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(255,179,0,0.2)',
                    borderRadius: '50%',
                }}
                animate={{ 
                    scaleX: [0.8, 1, 0.8],
                    opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            
            <svg
                viewBox="0 0 200 400"
                className="w-56 h-[420px] md:w-72 md:h-[540px] relative z-10"
                style={{ filter: 'drop-shadow(0 0 25px rgba(0, 229, 255, 0.6))' }}
            >
                <defs>
                    {/* Premium gradient for the humanoid */}
                    <linearGradient id="humanoidGradPremium" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
                        <stop offset="30%" stopColor="#FFB300" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#FFB300" stopOpacity="0.5" />
                    </linearGradient>
                    
                    {/* Body fill gradient */}
                    <linearGradient id="bodyFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1a2a3a" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#0d1b2a" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0a1628" stopOpacity="0.8" />
                    </linearGradient>
                    
                    {/* Enhanced glow filter */}
                    <filter id="humanoidGlowPremium" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur1" />
                        <feGaussianBlur stdDeviation="6" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    
                    {/* Pulse animation filter */}
                    <filter id="pulseGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                
                {/* Outer holographic rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.ellipse
                        key={`ring-${i}`}
                        cx="100"
                        cy="380"
                        rx={60 + i * 20}
                        ry={8 + i * 3}
                        fill="none"
                        stroke="url(#humanoidGradPremium)"
                        strokeWidth="0.5"
                        opacity={0.3 - i * 0.08}
                        animate={{ 
                            opacity: [0.1, 0.4, 0.1],
                            ry: [8 + i * 3, 10 + i * 3, 8 + i * 3]
                        }}
                        transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
                
                <g filter="url(#humanoidGlowPremium)">
                    {/* Professional Executive Body - Business Suit Silhouette */}
                    
                    {/* Head with refined shape */}
                    <motion.ellipse
                        cx="100" cy="45" rx="22" ry="28"
                        fill="#c9a87c"
                        stroke="url(#humanoidGradPremium)"
                        strokeWidth="1"
                        animate={{ 
                            scale: [1, 1.015, 1],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    {/* Neck */}
                    <rect x="92" y="70" width="16" height="18" fill="#c9a87c" opacity="0.9" />
                    
                    {/* Professional Suit Jacket */}
                    <motion.path
                        d="M 55 88 
                           Q 60 85 75 85 
                           L 85 88 L 100 92 L 115 88
                           Q 140 85 145 88
                           L 150 95
                           Q 155 130 150 180
                           L 145 220 L 130 280
                           L 100 285
                           L 70 280 L 55 220
                           Q 50 180 45 130
                           L 50 95 Z"
                        fill="url(#bodyFillGrad)"
                        stroke="url(#humanoidGradPremium)"
                        strokeWidth="1.5"
                        animate={{ 
                            scale: [1, 1.01, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Dress Shirt */}
                    <path
                        d="M 88 92 L 100 100 L 112 92 L 112 180 L 88 180 Z"
                        fill="#f5f5f5"
                        opacity="0.85"
                    />
                    
                    {/* Executive Tie */}
                    <motion.path
                        d="M 96 100 L 104 100 L 105 110 L 100 180 L 95 110 Z"
                        fill="#FFB300"
                        opacity="0.9"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Suit Lapels */}
                    <path d="M 85 88 L 88 140 L 75 95 Z" fill="#0d1b2a" opacity="0.8" />
                    <path d="M 115 88 L 112 140 L 125 95 Z" fill="#0d1b2a" opacity="0.8" />
                    
                    {/* Left Arm */}
                    <motion.path
                        d="M 55 95 Q 40 120 35 160 Q 32 200 38 240"
                        stroke="url(#humanoidGradPremium)"
                        strokeWidth="16"
                        fill="none"
                        strokeLinecap="round"
                        animate={{ x: [0, 3, 0], rotate: [0, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Right Arm */}
                    <motion.path
                        d="M 145 95 Q 160 120 165 160 Q 168 200 162 240"
                        stroke="url(#humanoidGradPremium)"
                        strokeWidth="16"
                        fill="none"
                        strokeLinecap="round"
                        animate={{ x: [0, -3, 0], rotate: [0, -1, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                    
                    {/* Hands */}
                    <motion.circle cx="38" cy="245" r="8" fill="#c9a87c" opacity="0.9"
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.circle cx="162" cy="245" r="8" fill="#c9a87c" opacity="0.9"
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                    
                    {/* Legs */}
                    <path d="M 75 280 L 70 340 L 65 375" stroke="#0d1b2a" strokeWidth="22" fill="none" strokeLinecap="round" />
                    <path d="M 125 280 L 130 340 L 135 375" stroke="#0d1b2a" strokeWidth="22" fill="none" strokeLinecap="round" />
                    
                    {/* Core Energy - Heart of AI */}
                    <motion.circle
                        cx="100" cy="140" r="12"
                        fill="#FFB300"
                        fillOpacity="0.6"
                        filter="url(#pulseGlow)"
                        animate={{ 
                            r: [12, 18, 12], 
                            opacity: [0.4, 0.9, 0.4],
                            fillOpacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle
                        cx="100" cy="140" r="6"
                        fill="#00E5FF"
                        animate={{ 
                            r: [6, 8, 6], 
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    {/* Neural Data Streams radiating from core */}
                    {[...Array(12)].map((_, i) => (
                        <motion.line
                            key={`stream-${i}`}
                            x1={100 + Math.cos(i * 30 * Math.PI / 180) * 20}
                            y1={140 + Math.sin(i * 30 * Math.PI / 180) * 20}
                            x2={100 + Math.cos(i * 30 * Math.PI / 180) * 55}
                            y2={140 + Math.sin(i * 30 * Math.PI / 180) * 55}
                            stroke={i % 2 === 0 ? "#00E5FF" : "#FFB300"}
                            strokeWidth="1"
                            strokeLinecap="round"
                            animate={{ 
                                opacity: [0, 0.8, 0], 
                                pathLength: [0, 1, 0],
                                strokeWidth: [0.5, 1.5, 0.5]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                        />
                    ))}
                    
                    {/* Floating data nodes around the figure */}
                    {[...Array(6)].map((_, i) => (
                        <motion.circle
                            key={`node-${i}`}
                            cx={100 + Math.cos(i * 60 * Math.PI / 180) * 80}
                            cy={180 + Math.sin(i * 60 * Math.PI / 180) * 60}
                            r="4"
                            fill={i % 2 === 0 ? "#FFB300" : "#00E5FF"}
                            animate={{ 
                                opacity: [0.2, 1, 0.2],
                                scale: [0.8, 1.2, 0.8],
                                y: [0, -10, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                        />
                    ))}
                    
                    {/* Status indicators on shoulders */}
                    <motion.circle cx="55" cy="95" r="4" fill="#00E5FF"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.circle cx="145" cy="95" r="4" fill="#FFB300"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                    />
                </g>
                
                {/* Holographic scan line effect */}
                <motion.line
                    x1="30" y1="0" x2="170" y2="0"
                    stroke="url(#humanoidGradPremium)"
                    strokeWidth="2"
                    opacity="0.6"
                    animate={{ y: [0, 400, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
            </svg>
            
            {/* Status text below humanoid */}
            <motion.div
                className="absolute bottom-[8%] md:bottom-[5%] text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <p className="text-[10px] md:text-xs font-mono text-electric-cyan/60 tracking-[0.3em] uppercase">
                    EdIntel AI Companion
                </p>
                <motion.p 
                    className="text-[8px] md:text-[10px] font-mono text-sovereign-gold/50 tracking-widest mt-1"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {isActive ? 'ONLINE' : 'INITIALIZING...'}
                </motion.p>
            </motion.div>
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
