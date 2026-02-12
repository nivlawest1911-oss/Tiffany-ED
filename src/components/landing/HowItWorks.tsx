'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Power, BarChart3, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const STEPS = [
    {
        id: "01",
        title: "Create Account",
        desc: "Secure your district's dedicated EdIntel node.",
        icon: UserPlus,
        color: "blue",
        video: "/videos/how_edintel_works1.mp4"
    },
    {
        id: "02",
        title: "Activate AI Tools",
        desc: "Deploy autonomous agents for grant writing, IEPs, and more.",
        icon: Power,
        color: "purple",
        video: "/videos/how_edintel_works2.mp4"
    },
    {
        id: "03",
        title: "Track Progress",
        desc: "Monitor district-wide intelligence and efficiency in real-time.",
        icon: BarChart3,
        color: "emerald",
        video: "/videos/how_edintel_works3.mp4"
    }
];

function StepVideoCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(() => { });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }, [isMuted]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative z-10 group"
        >
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-noble-gold/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="absolute -top-4 bg-slate-950 border border-white/10 px-4 py-1 rounded-full text-xs font-bold text-slate-500 shadow-xl">
                    STEP {step.id}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-noble-gold/10 text-noble-gold group-hover:scale-110 transition-transform duration-300">
                    <step.icon size={32} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{step.desc}</p>

                {/* Video with Controls */}
                <div className="w-full h-40 bg-black/40 rounded-xl border border-white/5 overflow-hidden relative group-hover:border-noble-gold/30 transition-colors">
                    <video
                        ref={videoRef}
                        src={step.video}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Controls Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <button
                            onClick={togglePlay}
                            className="p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white" />}
                        </button>
                        <button
                            onClick={toggleMute}
                            className="p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? <VolumeX size={14} className="text-white/60" /> : <Volume2 size={14} className="text-emerald-400" />}
                        </button>
                    </div>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="w-full h-[1px] bg-white/50 animate-scanline shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                        How <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#B8860B] bg-clip-text text-transparent">EdIntel</span> Works
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Three steps to total institutional autonomy and operational superiority.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 border-t border-dashed border-white/20 z-0" />

                    {STEPS.map((step, i) => (
                        <StepVideoCard key={step.id} step={step} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
