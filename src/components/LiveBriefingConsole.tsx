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

export default function LiveBriefingConsole({ name, description, role, color, prompts, onComplete, videoSrc, avatarImage }: LiveBriefingConsoleProps & { videoSrc?: string, avatarImage?: string }) {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const hasStartedRef = useRef(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const userVideoRef = useRef<HTMLVideoElement>(null);

    // Dynamic Script Generation
    const fullScript = `Sovereign Protocol Initiated. Target: ${name}. 
    
    Objective: ${description} 
    
    I am configured as your ${role}. My neural pathways are optimized to assist you. Awaiting your directives, Executive.`;

    // 1. Initialize User Webcam (Secure Uplink)
    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (userVideoRef.current) {
                    userVideoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Secure Uplink Failed:", err);
            }
        };
        startWebcam();

        return () => {
            // Cleanup stream
            if (userVideoRef.current && userVideoRef.current.srcObject) {
                const tracks = (userVideoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    // 2. Typing & Speaking Logic
    useEffect(() => {
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;

        let charIndex = 0;
        setIsSpeaking(true);
        if (videoRef.current) videoRef.current.currentTime = 0; // Reset video
        if (videoRef.current) videoRef.current.play().catch(e => console.log("Autoplay blocked", e));

        // Text Typing Effect
        const typeInterval = setInterval(() => {
            if (charIndex < fullScript.length) {
                setText(fullScript.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsSpeaking(false);
                if (videoRef.current) videoRef.current.pause(); // Stop moving when done speaking
                if (onComplete) onComplete();
            }
        }, 40);

        // Speech Synthesis
        const utterance = new SpeechSynthesisUtterance(fullScript);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
            setIsSpeaking(false);
            if (videoRef.current) videoRef.current.pause(); // Ensure stop
        };

        window.speechSynthesis.cancel();
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 500);

        return () => {
            window.speechSynthesis.cancel();
            clearInterval(typeInterval);
        };
    }, [fullScript, onComplete]);

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
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-repeat" />

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
                        <img
                            src={avatarImage || "/images/avatars/executive_leader.png"}
                            alt="Avatar"
                            className={`w-full h-full object-cover rounded-full border-4 border-${themeColor}-500/30 transition-transform duration-500 ${isSpeaking ? 'scale-105' : 'scale-100'}`}
                        />
                        {isSpeaking && (
                            <div className={`absolute inset-0 rounded-full border-2 border-${themeColor}-400 animate-ping`} />
                        )}
                    </div>
                )}
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>

            {/* USER WEBCAM (Secure Uplink PIP) */}
            <div className="absolute bottom-6 right-6 z-30 w-32 h-24 md:w-48 md:h-36 bg-black rounded-xl overflow-hidden border border-white/20 shadow-2xl shadow-indigo-500/20 transform hover:scale-105 transition-transform cursor-pointer">
                <video
                    ref={userVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover transform scale-x-[-1]"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-wider backdrop-blur-md bg-black/30 px-1 rounded">Live Feed</span>
                </div>
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
            <div className="absolute top-6 left-6 flex items-center gap-3 z-30">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Secure Connected</span>
                </div>
                {isSpeaking && (
                    <div className="px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider animate-pulse">Voice Active</span>
                    </div>
                )}
            </div>
        </div>
    );
}
