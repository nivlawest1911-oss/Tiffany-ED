'use client';

import { useEffect, useState, useRef } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Globe, X } from "lucide-react";
import { generateProfessionalResponse } from '../lib/leadership-ai';
import GenerativeLogStream from './GenerativeLogStream';
import AIAgentAvatar from './AIAgentAvatar';

interface LiveBriefingConsoleProps {
    name: string;
    description: string;
    role: string;
    color: string;
    prompts: string[];
    onComplete?: () => void;
    videoSrc?: string;
    avatarImage?: string;
}

export default function LiveBriefingConsole({ name, description, role, color, prompts, onComplete, videoSrc, avatarImage }: LiveBriefingConsoleProps) {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const userVideoRef = useRef<HTMLVideoElement>(null);
    const [currentScript, setCurrentScript] = useState(`Briefing Started. Target: ${name}. \n\nObjective: ${description} \n\nI am here to assist as your ${role}. Ready to help you lead effectively.`);
    const [logType, setLogType] = useState<'IEP' | 'GRANT' | 'DATA' | 'POLICY' | 'DEFAULT'>('DEFAULT');
    const [showLiveAvatar, setShowLiveAvatar] = useState(false);

    // 1. Initialize User Webcam (Secure Connection)
    useEffect(() => {
        const currentVideo = userVideoRef.current;
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (currentVideo) {
                    currentVideo.srcObject = stream;
                }
            } catch (err) {
                console.error("Secure Connection Failed:", err);
            }
        };
        startWebcam();

        return () => {
            // Cleanup stream using the captured video element
            if (currentVideo && currentVideo.srcObject) {
                const tracks = (currentVideo.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    // 2. Typing & Speaking Logic
    useEffect(() => {
        // Reset state for new script
        let charIndex = 0;
        setIsSpeaking(true);
        setText('');

        window.speechSynthesis.cancel();

        if (videoRef.current) videoRef.current.currentTime = 0;
        if (videoRef.current) videoRef.current.play().catch(e => console.log("Autoplay blocked", e));

        // Text Typing Effect
        const typeInterval = setInterval(() => {
            if (charIndex < currentScript.length) {
                setText(currentScript.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsSpeaking(false);
                if (videoRef.current) videoRef.current.pause();
                if (onComplete) onComplete();
            }
        }, 30);

        // Speech Synthesis
        const utterance = new SpeechSynthesisUtterance(currentScript);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
            setIsSpeaking(false);
            if (videoRef.current) videoRef.current.pause();
        };

        // Small delay to sync with text start
        const speechTimeout = setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 500);

        return () => {
            window.speechSynthesis.cancel();
            clearInterval(typeInterval);
            clearTimeout(speechTimeout);
        };
    }, [currentScript]);

    const handlePromptClick = async (prompt: string) => {
        setIsSpeaking(true);
        setText("Analyzing Request...");

        // Determine Log Type
        if (prompt.includes("Data")) setLogType('DATA');
        else if (prompt.includes("Policy")) setLogType('POLICY');
        else if (prompt.includes("Protocol") || prompt.includes("IEP")) setLogType('IEP');
        else if (prompt.includes("Grant") || prompt.includes("Funding")) setLogType('GRANT');
        else setLogType('DEFAULT');

        window.speechSynthesis.cancel();

        try {
            const response = await generateProfessionalResponse(prompt, 'live-demo');
            setCurrentScript(response);
        } catch (error) {
            console.error("Generation failed", error);
            setIsSpeaking(false);
        }
    };

    // 3. Sync Video Playback with Speaking State
    useEffect(() => {
        if (videoRef.current) {
            if (isSpeaking) videoRef.current.play().catch(() => { });
            else videoRef.current.pause();
        }
    }, [isSpeaking]);

    const themeColor = color.replace('text-', '').replace('bg-', '').replace('-500', '').replace('from-', '');

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center border-r border-white/10 group">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

            {/* MAIN AVATAR FEED (Full Height) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-zinc-950">
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <div className="relative w-64 h-64">
                        <NextImage
                            src={avatarImage || "/images/avatars/executive_leader.png"}
                            alt="Avatar"
                            width={256}
                            height={256}
                            className={`w-full h-full object-cover rounded-full border-4 border-${themeColor}-500/30 transition-transform duration-500 ${isSpeaking ? 'scale-105' : 'scale-100'}`}
                            priority
                        />
                        {isSpeaking && (
                            <div className={`absolute inset-0 rounded-full border-2 border-${themeColor}-400 animate-ping`} />
                        )}
                    </div>
                )}
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

                {/* LIVE AVATAR OVERLAY */}
                <AnimatePresence>
                    {showLiveAvatar && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black"
                        >
                            <AIAgentAvatar
                                textToSpeak={currentScript}
                            />
                            <button
                                onClick={() => setShowLiveAvatar(false)}
                                className="absolute top-6 right-6 z-[60] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 font-black"
                                title="Close Live Link"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* USER WEBCAM (Secure Connection PIP) */}
            <div className="absolute bottom-6 right-6 z-30 w-32 h-24 md:w-48 md:h-36 bg-black rounded-xl overflow-hidden border border-white/20 shadow-2xl shadow-indigo-500/20 transform hover:scale-105 transition-transform cursor-pointer group/cam">
                <video
                    ref={userVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover transform scale-x-[-1] opacity-80"
                />
                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay" />
                <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent animate-scan" style={{ backgroundSize: '100% 200%' }} />

                {/* Face Detection Reticle */}
                <div className="absolute inset-0 border-2 border-transparent group-hover/cam:border-indigo-500/30 transition-all rounded-xl">
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-indigo-400" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-indigo-400" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-indigo-400" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-indigo-400" />
                </div>

                <div className="absolute top-2 left-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-wider backdrop-blur-md bg-black/30 px-1 rounded">Live Feed</span>
                </div>
                <div className="absolute bottom-2 right-2">
                    <span className="text-[6px] font-mono text-indigo-300 bg-black/50 px-1 rounded">ID-VERIFIED</span>
                </div>
            </div>

            {/* Generative Log Stream - HUD Left */}
            <div className="absolute top-24 left-8 z-20 w-64 md:w-80 hidden md:block">
                <GenerativeLogStream type={logType} isActive={isSpeaking} />
            </div>

            {/* Terminal Output Overlay */}
            <div className="absolute bottom-8 left-8 right-8 md:right-64 z-20">
                <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl border-l-4 border-l-indigo-500">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Activity className={`w-4 h-4 ${isSpeaking ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'}`} />
                            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest">Incoming Transmission</span>
                        </div>
                    </div>
                    <p className="font-mono text-sm md:text-lg text-white leading-relaxed drop-shadow-md">
                        {text}
                        <span className="animate-pulse inline-block w-2 h-5 bg-indigo-500 ml-1 align-middle" />
                    </p>
                </div>
            </div>

            {/* Header Status */}
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-30">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Executive Connection Active</span>
                </div>
                {isSpeaking && (
                    <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md w-fit">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider animate-pulse">Analyzing Directives</span>
                    </div>
                )}
            </div>

            {/* Quick Directives */}
            <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Quick Actions</span>
                {prompts && prompts.map((prompt, i) => (
                    <button
                        key={i}
                        onClick={() => handlePromptClick(prompt)}
                        className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 text-xs text-white rounded-lg transition-all hover:bg-white/10 text-right max-w-[200px]"
                    >
                        {prompt}
                    </button>
                ))}

                {/* Viral Broadcast Button */}
                <button
                    onClick={() => setShowLiveAvatar(true)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/50 hover:bg-indigo-500/40 text-xs text-indigo-200 rounded-lg transition-all group/broadcast"
                >
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span className="font-bold uppercase tracking-widest">Neural strategic link</span>
                </button>

                <button
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setText("Link copied to clipboard. Shared access enabled.");
                        setIsSpeaking(true);
                        setTimeout(() => setIsSpeaking(false), 3000);
                    }}
                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-xl border border-red-500/50 hover:bg-red-500/40 text-xs text-red-200 rounded-lg transition-all group/broadcast"
                >
                    <Globe className="w-3 h-3 animate-pulse" />
                    <span className="font-bold uppercase tracking-widest">Share Stream</span>
                </button>
            </div>
        </div>
    );
}
