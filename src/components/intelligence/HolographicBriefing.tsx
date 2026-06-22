'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Activity, Wifi, Zap, Lock, Command, Video, Network, Terminal } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import AbilityAnimation from '@/components/shared/AbilityAnimation';
import AIAgentAvatar from '@/components/shared/AIAgentAvatar';

interface Agent {
    name: string;
    role: string;
    avatar: string;
    videoSrc?: string;
    musicSrc?: string;
    abilityType: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

const AGENTS: Record<string, Agent> = {
    visionary: {
        name: "Dr. Alvin West",
        role: "EdIntel Architect",
        avatar: "/images/avatars/dr_alvin_west_official.png",
        videoSrc: "/videos/briefings/principal_briefing.mp4",
        musicSrc: "/music/The Future of Education - Orchestral.mp3",
        abilityType: 'strategy' as const
    },
    strategic: {
        name: "Keisha Reynolds",
        role: "Strategic Lead",
        avatar: "/images/avatars/keisha_reynolds_premium.png",
        videoSrc: "/videos/briefings/counselor_briefing.mp4",
        abilityType: 'strategy' as const
    },
    tactical: {
        name: "AndrÃ© Patterson",
        role: "Tactical Specialist",
        avatar: "/images/avatars/andre_patterson_premium.png",
        videoSrc: "/videos/Briefing - Andre Patterson (Behavior Specialist).mp4",
        musicSrc: "/music/Cyberpunk High Tension - Cinematic Track.mp3",
        abilityType: 'compliance' as const
    },
    philosopher: {
        name: "Dr. Isaiah Vance",
        role: "Ethics & Governance",
        avatar: "/images/avatars/dr_isaiah_vance_premium.png",
        videoSrc: "/videos/briefings/compliance_briefing.mp4",
        abilityType: 'compliance' as const
    }
};

interface HolographicBriefingProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    agentId?: keyof typeof AGENTS;
    briefingSteps?: string[];
    stats?: { time: string; saved: string; accuracy: string; };
    videoSrc?: string;
    musicSrc?: string;
    audioSrc?: string;
    thumbnail?: string;
    avatarImage?: string;
    role?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

export default function HolographicBriefing({
    isOpen,
    onClose,
    title,
    description,
    agentId,
    briefingSteps,
    stats,
    videoSrc,
    musicSrc,
    audioSrc,
    thumbnail: _thumbnail,
    avatarImage,
    role,
    abilityType
}: HolographicBriefingProps) {
    const agent = agentId ? AGENTS[agentId] : null;
    const finalAvatar = avatarImage || agent?.avatar || "/images/avatars/dr_alvin_west_official.png";
    const finalRole = role || agent?.role || "Executive Lead";
    const finalAbility = abilityType || agent?.abilityType || 'strategy';
    const finalVideo = videoSrc || agent?.videoSrc;
    const finalMusic = musicSrc || agent?.musicSrc;

    const { playClick: _playClick, playHover: _playHover,
        playSuccess,
        playMusic,
        stopMusic,
        playVoice,
        stopVoice
    } = useProfessionalSounds();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showLiveAvatar, setShowLiveAvatar] = useState(false);
    const [progress, setProgress] = useState(0);
    const _humanBehavior = useHumanBehavior(isOpen);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [viewMode, setViewMode] = useState<'video' | 'waveform' | 'nodes' | 'diagnostics'>('waveform');
    const [videoHasError, setVideoHasError] = useState(false);
    const [consoleLines, setConsoleLines] = useState<string[]>([]);
    
    const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
    const nodesCanvasRef = useRef<HTMLCanvasElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const handleVideoError = useCallback(() => {
        console.warn("Video briefing file failed to load. Falling back to Neural Waveform.");
        setVideoHasError(true);
        setViewMode('waveform');
    }, []);

    // Set view mode based on video presence
    useEffect(() => {
        if (finalVideo && !videoHasError) {
            setViewMode('video');
        } else {
            setViewMode('waveform');
        }
    }, [finalVideo, videoHasError]);

    useEffect(() => {
        if (videoRef.current) {
            if (isSpeaking && viewMode === 'video') {
                videoRef.current.play().catch(e => console.warn("Briefing video play failed", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isSpeaking, viewMode]);

    const startBriefing = useCallback(() => {
        if (finalMusic) playMusic(finalMusic);

        if (audioSrc) {
            setIsSpeaking(true);
            playVoice(audioSrc, () => setIsSpeaking(false));
            return;
        }

        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);

        const text = `${title}. ${description}`;
        const buildUtterance = (voices: SpeechSynthesisVoice[]) => {
            const utterance = new SpeechSynthesisUtterance(text);
            const isAlvin = finalRole.toLowerCase().includes('executive') || finalRole.toLowerCase().includes('alvin') || title.toLowerCase().includes('finance');

            const preferredVoice = voices.find(v =>
                (isAlvin ? (v.name.includes('Daniel') || v.name.includes('UK English Male')) : v.name.includes('Male')) && v.lang.startsWith('en')
            );

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        };

        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                buildUtterance(window.speechSynthesis.getVoices());
                window.speechSynthesis.onvoiceschanged = null;
            };
        } else {
            buildUtterance(voices);
        }
    }, [title, description, finalRole, finalMusic, playMusic, audioSrc, playVoice]);

    const handleStopSpeaking = useCallback(() => {
        stopVoice();
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        stopMusic();
    }, [stopMusic, stopVoice]);

    useEffect(() => {
        if (isOpen) {
            playSuccess();
            startBriefing();
        } else {
            handleStopSpeaking();
        }
        return () => handleStopSpeaking();
    }, [isOpen, playSuccess, startBriefing, handleStopSpeaking]);

    useEffect(() => {
        if (isSpeaking) {
            const interval = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 0.5 : 100));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isSpeaking]);

    // Canvas Waveform Effect
    useEffect(() => {
        const canvas = waveformCanvasRef.current;
        if (!canvas || viewMode !== 'waveform') return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let phase = 0;
        
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * (window.devicePixelRatio || 1);
            canvas.height = rect.height * (window.devicePixelRatio || 1);
        };
        resize();
        window.addEventListener('resize', resize);
        
        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            
            // Draw background grid lines (subtle dark blue/gold)
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.03)';
            ctx.lineWidth = 1;
            const gridSpacing = 40;
            for (let x = 0; x < width; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            
            // Draw wave frequency lines
            const baseAmplitude = isSpeaking ? height * 0.12 : height * 0.04;
            const speed = isSpeaking ? 0.08 : 0.02;
            const frequency = isSpeaking ? 0.015 : 0.008;
            
            phase += speed;
            
            // Draw 4 distinct waves with different offsets and styles
            const waves = [
                { color: 'rgba(212, 175, 55, 0.6)', ampMult: 1.0, freqMult: 1.0, offset: 0 },
                { color: 'rgba(59, 130, 246, 0.35)', ampMult: 0.8, freqMult: 1.4, offset: Math.PI / 3 },
                { color: 'rgba(99, 102, 241, 0.25)', ampMult: 1.1, freqMult: 0.7, offset: Math.PI * 2 / 3 },
                { color: 'rgba(255, 255, 255, 0.12)', ampMult: 0.4, freqMult: 1.8, offset: Math.PI }
            ];
            
            waves.forEach(wave => {
                ctx.beginPath();
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = wave.ampMult * 1.5;
                
                for (let x = 0; x < width; x++) {
                    const progressVal = x / width;
                    // Fade out waves near edges
                    const edgeFade = Math.sin(progressVal * Math.PI);
                    
                    // Add micro-noise if speaking
                    const speechNoise = isSpeaking ? Math.sin(phase * 4 + x * 0.06) * 3 : 0;
                    
                    const y = height / 2 + 
                        Math.sin(x * frequency * wave.freqMult + phase + wave.offset) * 
                        baseAmplitude * wave.ampMult * edgeFade + speechNoise;
                        
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            });
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        render();
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [viewMode, isSpeaking]);

    // Canvas Neural Nodes Effect
    useEffect(() => {
        const canvas = nodesCanvasRef.current;
        if (!canvas || viewMode !== 'nodes') return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * (window.devicePixelRatio || 1);
            canvas.height = rect.height * (window.devicePixelRatio || 1);
        };
        resize();
        window.addEventListener('resize', resize);
        
        // Initialize particles
        const numParticles = 40;
        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            pulse: number;
            pulseSpeed: number;
        }> = [];
        
        const colorPalette = [
            'rgba(212, 175, 55, 0.65)',  // Noble Gold
            'rgba(59, 130, 246, 0.65)',  // Blue
            'rgba(99, 102, 241, 0.55)',  // Indigo
            'rgba(255, 255, 255, 0.45)'  // White
        ];
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                radius: Math.random() * 2 + 1,
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                pulse: Math.random(),
                pulseSpeed: 0.01 + Math.random() * 0.02
            });
        }
        
        let mouseX = -9999;
        let mouseY = -9999;
        let ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; speed: number; alpha: number }> = [];
        
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
            mouseY = (e.clientY - rect.top) * (window.devicePixelRatio || 1);
        };
        
        const handleMouseLeave = () => {
            mouseX = -9999;
            mouseY = -9999;
        };
        
        const handleCanvasClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
            const clickY = (e.clientY - rect.top) * (window.devicePixelRatio || 1);
            
            // Push particles away
            particles.forEach(p => {
                const dx = p.x - clickX;
                const dy = p.y - clickY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const force = (180 - dist) / 12;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }
            });
            
            // Create ripple
            ripples.push({
                x: clickX,
                y: clickY,
                radius: 0,
                maxRadius: 120,
                speed: 3,
                alpha: 0.8
            });
        };
        
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('click', handleCanvasClick);
        
        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            
            // Render grid
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.02)';
            ctx.lineWidth = 1;
            const gridSpacing = 50;
            for (let x = 0; x < width; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            
            // Update and draw ripples
            ripples.forEach((r) => {
                r.radius += r.speed;
                r.alpha -= 0.02;
                if (r.alpha > 0) {
                    ctx.strokeStyle = `rgba(212, 175, 55, ${r.alpha})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
            ripples = ripples.filter(r => r.alpha > 0);
            
            // Draw connections
            const maxDistance = 100;
            for (let i = 0; i < numParticles; i++) {
                const p1 = particles[i];
                
                // Draw line to mouse
                if (mouseX > 0) {
                    const dx = p1.x - mouseX;
                    const dy = p1.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDistance * 1.4) {
                        ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / (maxDistance * 1.4)) * 0.2})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouseX, mouseY);
                        ctx.stroke();
                    }
                }
                
                for (let j = i + 1; j < numParticles; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.12;
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Update and draw particles
            particles.forEach(p => {
                // Friction
                p.vx *= 0.97;
                p.vy *= 0.97;
                
                // Minimum ambient speed
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed < 0.25) {
                    p.vx += (Math.random() - 0.5) * 0.08;
                    p.vy += (Math.random() - 0.5) * 0.08;
                }
                
                p.x += p.vx;
                p.y += p.vy;
                
                // Bounces
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));
                
                // Pulsate size
                p.pulse += p.pulseSpeed;
                const sizeMult = 1 + Math.sin(p.pulse) * 0.25;
                
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * sizeMult, 0, Math.PI * 2);
                ctx.fill();
            });
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        render();
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            if (canvas) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
                canvas.removeEventListener('click', handleCanvasClick);
            }
        };
    }, [viewMode]);

    // Diagnostics Console Logs Effect
    useEffect(() => {
        if (!isOpen || viewMode !== 'diagnostics') return;
        
        const initialLogs = [
            '>>> SECURE UPLINK INITIATED - COGNITIVE LINK READY',
            '>>> SECURITY LEVEL: EXECUTIVE COMMAND DELEGATE',
            '>>> TARGET AGENT: ' + (finalRole || 'EDINTEL ARCHITECT'),
            '>>> AUTHENTICATING DELEGATE PROTOCOLS...',
            '>>> CERTIFICATE STATUS: VERIFIED S-1 CLEARANCE',
            '>>> LINK STATE: ESTABLISHING STABLE SYNERGY...'
        ];
        setConsoleLines(initialLogs);
        
        const phrasePool = [
            'ROTATING TEMPORARY SYMMETRIC SESSION KEYS',
            'PARSING NEURAL MATRICES FOR ALABAMA STANDARDS',
            'STABILIZING AUDIO SIGNAL FIDELITY [99.8%]',
            'EVALUATING STRATEGIC PATHWAY CONTEXT MAPS',
            'SUPPRESSING AUDITORY INTERACTIVE HARMONICS',
            'UPDATING CENTRAL LEDGER SECURE SYSTEM BLOCKS',
            'UPLINK HEARTBEAT STEADY - RESPONSE TIMEOUT: OK',
            'COMPRESSING TRANSLATION VECTORS FOR LOCAL ENGINE',
            'CHECKING COMPLIANCE REGULATION POLICY HASHES',
            'DECRYPTING ATTACHED SYLLABUS CORRELATIONS'
        ];
        
        const interval = setInterval(() => {
            const randomPhrase = phrasePool[Math.floor(Math.random() * phrasePool.length)];
            const timestamp = new Date().toLocaleTimeString();
            setConsoleLines(prev => [...prev, `[${timestamp}] >>> ${randomPhrase}`].slice(-25));
        }, 1500);
        
        return () => clearInterval(interval);
    }, [isOpen, viewMode, finalRole]);

    // Auto-scroll terminal
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [consoleLines]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        className="relative w-full max-w-7xl aspect-video bg-zinc-950 border border-noble-gold/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col md:flex-row"
                    >
                        {/* Interactive UI Layers */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

                        {/* LEFT: Neural Context Stream */}
                        <div className="md:w-[65%] h-64 md:h-full relative overflow-hidden border-r border-white/5 bg-black">
                            
                            {/* Toolbar selector */}
                            <div className="absolute top-28 md:top-10 left-1/2 -translate-x-1/2 z-30 flex">
                                <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 shadow-lg">
                                    {finalVideo && (
                                        <button
                                            onClick={() => {
                                                if (!videoHasError) setViewMode('video');
                                            }}
                                            disabled={videoHasError}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                                                videoHasError ? 'opacity-30 cursor-not-allowed' : ''
                                            } ${
                                                viewMode === 'video'
                                                    ? 'bg-noble-gold text-black shadow-md font-bold'
                                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            <Video size={10} />
                                            <span className="hidden sm:inline">Feed</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setViewMode('waveform')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                                            viewMode === 'waveform'
                                                ? 'bg-noble-gold text-black shadow-md font-bold'
                                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <Activity size={10} />
                                        <span className="hidden sm:inline">Waveform</span>
                                        <span className="sm:hidden">Wave</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('nodes')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                                            viewMode === 'nodes'
                                                ? 'bg-noble-gold text-black shadow-md font-bold'
                                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <Network size={10} />
                                        <span>Nodes</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('diagnostics')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                                            viewMode === 'diagnostics'
                                                ? 'bg-noble-gold text-black shadow-md font-bold'
                                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <Terminal size={10} />
                                        <span className="hidden sm:inline">Diagnostics</span>
                                        <span className="sm:hidden">Logs</span>
                                    </button>
                                </div>
                            </div>

                            {/* View Switcher content */}
                            {viewMode === 'video' && finalVideo && (
                                <div className="w-full h-full relative bg-zinc-950 flex items-center justify-center">
                                    <video
                                        ref={videoRef}
                                        src={finalVideo}
                                        className="w-full h-full object-cover opacity-70"
                                        autoPlay loop muted playsInline
                                        onError={handleVideoError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                                </div>
                            )}

                            {viewMode === 'waveform' && (
                                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                                    <canvas ref={waveformCanvasRef} className="w-full h-full block" />
                                    <div className="absolute bottom-28 md:bottom-24 left-10 right-10 flex items-center justify-between text-[8px] font-mono text-noble-gold/40 pointer-events-none">
                                        <span>FREQUENCY SPECTRUM SYNAPSE FLOW</span>
                                        <span>{isSpeaking ? 'VOICE LINK ACTIVE' : 'VOICE STREAM IDLE'}</span>
                                    </div>
                                </div>
                            )}

                            {viewMode === 'nodes' && (
                                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                                    <canvas ref={nodesCanvasRef} className="w-full h-full block cursor-crosshair" />
                                    <div className="absolute bottom-28 md:bottom-24 left-10 text-[8px] font-mono text-noble-gold/40 pointer-events-none">
                                        <span>INTERACTIVE SYNAPTIC GRAPH: CLICK CANVAS FOR DISCHARGE RIPPLE</span>
                                    </div>
                                </div>
                            )}

                            {viewMode === 'diagnostics' && (
                                <div className="absolute inset-0 bg-zinc-950 p-8 pt-40 md:pt-24 pb-28 md:pb-24 flex flex-col font-mono text-[9px] text-emerald-500 overflow-y-auto edintel-scrollbar">
                                    <div className="flex-1 space-y-1">
                                        {consoleLines.map((line, idx) => (
                                            <div 
                                                key={idx} 
                                                className={
                                                    line.includes('VERIFIED') || line.includes('READY') || line.includes('VALID') || line.includes('SECURITY')
                                                        ? 'text-noble-gold' 
                                                        : 'text-emerald-500/80'
                                                }
                                            >
                                                {line}
                                            </div>
                                        ))}
                                        <div ref={terminalEndRef} />
                                    </div>
                                </div>
                            )}


                            {/* HUD Overlays */}
                            <div className="absolute top-10 left-10 z-20 flex flex-col gap-4">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-3 px-4 py-2 liquid-glass border-noble-gold/30"
                                >
                                    <Wifi size={14} className="text-noble-gold animate-pulse" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Uplink: Stable</span>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex items-center gap-3 px-4 py-2 liquid-glass border-emerald-500/30"
                                >
                                    <Lock size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">EdIntel Encryption</span>
                                </motion.div>
                            </div>

                            {/* Neural Data Stream */}
                            <div className="absolute top-10 right-10 z-20 hidden md:flex flex-col items-end gap-1 opacity-20 pointer-events-none font-mono text-[8px] text-noble-gold">
                                {['SYNCHRONIZING...', 'ENCRYPTING...', 'DECODING PACKETS...', 'STABILIZING NODES...'].map((text, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                    >
                                        {text}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-20">
                                {stats && (
                                    <div className="flex gap-6">
                                        {[
                                            { label: 'Latency', value: stats.time, icon: Activity },
                                            { label: 'Throughput', value: stats.saved, icon: Zap },
                                            { label: 'Fidelity', value: stats.accuracy, icon: Shield }
                                        ].map((s, i) => (
                                            <div key={i} className="liquid-glass p-4 min-w-[120px] border-white/10">
                                                <div className="flex items-center gap-2 mb-2 opacity-40">
                                                    <s.icon size={12} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">{s.label}</span>
                                                </div>
                                                <div className="text-xl font-black text-white">{s.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Visual Synthesis Overlay */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-20">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
                                <motion.div
                                    animate={{ y: ['0%', '100%'] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-px bg-noble-gold shadow-[0_0_10px_#D4AF37]"
                                />
                            </div>

                            {/* Scanning Line */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-noble-gold/5 to-transparent h-px w-full z-10"
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* LIVE AVATAR OVERLAY */}
                            <AnimatePresence>
                                {showLiveAvatar && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute inset-0 z-50 bg-black"
                                    >
                                        <AIAgentAvatar
                                            textToSpeak={description}
                                        />
                                        <button
                                            onClick={() => setShowLiveAvatar(false)}
                                            className="absolute top-6 right-6 z-[60] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
                                            title="Close Live Sync"
                                        >
                                            <X size={20} className="text-white" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: EdIntel Delegate */}
                        <div className="md:w-[35%] flex flex-col bg-zinc-950/80 backdrop-blur-3xl relative overflow-y-auto edintel-scrollbar">
                            {/* Header */}
                            <div className="p-10 border-b border-white/5 flex justify-between items-start gap-6 shrink-0">
                                <div>
                                    <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-2">Protocol Analysis</p>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{title}</h3>
                                </div>
                                <button onClick={onClose} aria-label="Close" className="shrink-0 p-3 mt-1 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Speaker Node */}
                            <div className="flex-1 flex flex-col items-center justify-center p-10 relative shrink-0">
                                <div className="relative group shrink-0">
                                    <div className={`w-40 h-40 rounded-full p-1 bg-gradient-to-br from-noble-gold via-white/20 to-zinc-900 shadow-[0_0_50px_rgba(212,175,55,0.2)] ${isSpeaking ? 'animate-pulse' : ''}`}>
                                        <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                                            <motion.img
                                                src={finalAvatar}
                                                alt={finalRole}
                                                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700"
                                                animate={isSpeaking ? {
                                                    scale: [1, 1.05, 1],
                                                    filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
                                                    rotate: [0, 1, -1, 0]
                                                } : {}}
                                            />

                                            {isSpeaking && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-1.5">
                                                    {[...Array(6)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="w-1 bg-noble-gold rounded-full"
                                                            animate={{ height: [4, 32, 4] }}
                                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isSpeaking && <div className="absolute -inset-4 border border-noble-gold/30 rounded-full animate-ping opacity-20" />}
                                </div>

                                <div className="mt-8 text-center">
                                    <h4 className="text-white font-black uppercase text-sm tracking-widest">{finalRole}</h4>
                                    <p className="text-noble-gold/50 text-[10px] font-black uppercase tracking-[0.3em] mt-1">EdIntel Asset Node</p>
                                </div>

                            </div>

                            {/* Transcript / Action Area */}
                            <div className="p-10 bg-black/40 border-t border-white/5 space-y-6 shrink-0">
                                <div className="space-y-4">
                                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                                        <span className="text-noble-gold mr-3">{">>>"}</span>
                                        {description}
                                    </p>

                                    {briefingSteps && briefingSteps.length > 0 && (
                                        <div className="space-y-3 mt-6">
                                            {briefingSteps.map((step, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="text-noble-gold text-[10px] mt-1 font-black">0{idx + 1}</span>
                                                    <span className="text-[11px] text-zinc-400 uppercase tracking-widest leading-relaxed">{step}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-6">
                                        <motion.div
                                            className="h-full bg-noble-gold shadow-[0_0_10px_#D4AF37]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>

                                </div>

                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startBriefing()}
                                        className="flex-1 EdIntel-button bg-white text-black py-4 text-[10px]"
                                    >
                                        <Command size={14} className="mr-2" />
                                        Relay Audio
                                    </motion.button>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-4 liquid-glass border-white/10 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
