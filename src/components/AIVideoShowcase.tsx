'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Sparkles, User, Mic } from 'lucide-react';

interface VideoShowcase {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: string;
    category: string;
    aiGenerated: boolean;
    briefingContent?: string;
    brieferName?: string;
    brieferRole?: string;
    brieferAvatar?: string;
}

const AI_VIDEOS: VideoShowcase[] = [
    {
        id: 1,
        title: 'Full-Spectrum IEP Generation Protocol',
        description: 'Watch the Sovereign Engine architect a 100% compliant, culturally resonant IEP in under 120 seconds.',
        thumbnail: '/images/features/iep_interface.png',
        videoUrl: '/videos/features/iep-architect-demo.mp4',
        duration: '3:45',
        category: 'Special Education',
        aiGenerated: true,
        briefingContent: "Uplink Secure. We are currently observing the Synthesis Phase of an Alabama-aligned IEP. Notice the neural mapping of student assessment data directly into measurable SMART goals. The engine doesn't just fill forms; it audits for IDEA fidelity and FAPE compliance in real-time. By leveraging a multi-variate database of 40,000+ instructional strategies, we ensure every scholar has a legally robust and instructionally sound success path without the 4-hour manual drafting period.",
        brieferName: "Dr. Maya Washington",
        brieferRole: "IEP Compliance Architect",
        brieferAvatar: "/images/avatars/iep_architect.png"
    },
    {
        id: 2,
        title: 'Strategic Lesson Synthesis (ALCOS)',
        description: 'Accelerate instructional design with standards-aligned, high-engagement lesson blueprints.',
        thumbnail: '/images/features/sovereign_educator_planner.png',
        videoUrl: '/videos/features/lesson-planner-demo.mp4',
        duration: '4:20',
        category: 'Curriculum',
        aiGenerated: true,
        briefingContent: "Curriculum Insight initiated. Our engine identifies high-impact ALCOS and CCSS standards and wraps them in a UbD (Understanding by Design) framework. The resulting blueprints prioritize 'Intellectual Sovereignty' and community-building hooks. What you see is the 'Foundry' session, where raw academic concepts are transformed into high-engagement performance tasks. Educators save 80% on planning time while increasing instructional yield by 35% through neural-aligned content delivery.",
        brieferName: "Sarah West",
        brieferRole: "Curriculum Strategist",
        brieferAvatar: "/images/avatars/curriculum_strategist.png"
    },
    {
        id: 3,
        title: 'Neural Presence: Live Conversation',
        description: 'Witness the future of leadership as Dr. Alvin West interacts in real-time with zero latency.',
        thumbnail: '/images/dr_alvin_west.png',
        videoUrl: '/videos/briefings/principal_briefing.mp4',
        duration: '2:30',
        category: 'AI Avatars',
        aiGenerated: false,
        briefingContent: "Identity Sync Active. This demo showcases the 2-way neural uplink between the Sovereign Delegate and a district leader. The avatar is not just a recording; it's a dynamic identity core trained on thousands of hours of executive decision-making. It responds to complex fiscal inquiries, staff morale challenges, and policy shifts with the same authoritativeness and cultural nuance as Dr. West himself. This is the end of leadership bottlenecks.",
        brieferName: "Dr. Alvin West",
        brieferRole: "Executive Principal",
        brieferAvatar: "/images/dr_alvin_west.png"
    },
    {
        id: 4,
        title: 'District Intelligence Command Center',
        description: 'Macro-level data visualization transformed into micro-level tactical directives.',
        thumbnail: '/images/features/collaborative_intelligence_team.png',
        videoUrl: '/videos/briefings/data_briefing.mp4',
        duration: '5:15',
        category: 'Analytics',
        aiGenerated: true,
        briefingContent: "Executive Matrix Uplink. We are visualizing student performance vectors across 14 data streams. The Sovereign Engine identifies 'Opportunity Nodes'—pockets of potential that are currently underserved. By shifting resources at the speed of data, district leaders can optimize for ROI (Return on Instruction). We move beyond lagging indicators like state tests into leading indicators that allow for real-time course correction and instructional capital recovery.",
        brieferName: "Marcus Johnson",
        brieferRole: "Sovereign Stem Lead",
        brieferAvatar: "/images/avatars/stem_coordinator.png"
    },
    {
        id: 5,
        title: 'Behavioral Engineering Protocol',
        description: 'Constructing tiered intervention strategies that prioritize self-regulation over compliance.',
        thumbnail: '/images/features/behavior_intervention_specialist.png',
        videoUrl: '/videos/briefings/counselor_briefing.mp4',
        duration: '3:50',
        category: 'Behavior',
        aiGenerated: true,
        briefingContent: "Behavioral HUD Calibration. We are now generating a Tier 3 Intervention Plan based on frequency-interval observation data. The engine shifts the perspective from 'What is the student doing?' to 'What is the student seeking?' By engineering professional replacement behaviors and reactive reinforcement schedules, we transform classroom climate. This protocol is fully compliant with Alabama SDE behavior standards and PBIS best practices.",
        brieferName: "Andre Patterson",
        brieferRole: "Behavior Intervention Lead",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    {
        id: 10,
        title: 'Literacy Optimization Architecture',
        description: 'Bridging the achievement gap through data-backed reading intervention blueprints.',
        thumbnail: '/images/features/executive_grant_writer.png',
        videoUrl: '/videos/briefings/principal_briefing.mp4',
        duration: '4:40',
        category: 'Literacy',
        aiGenerated: true,
        briefingContent: "Literacy Stream Verified. Dr. Robinson is demonstrating the synthesis of raw reading scores into actionable intervention groups. The Sovereign Engine identifies the specific 'Neural Blockage' in literacy acquisition—be it phonemic awareness or high-level comprehension—and prescribes the exact instructional protocol needed for gap closure. We don't just teach reading; we engineer literacy sovereignty.",
        brieferName: "Dr. Emily Robinson",
        brieferRole: "Literacy & Data Scientist",
        brieferAvatar: "/images/avatars/literacy_coach.png"
    },
];

export default function AIVideoShowcase() {
    const [selectedVideo, setSelectedVideo] = useState<VideoShowcase | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const videoPlayerRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (selectedVideo) {
            setIsPlaying(true);
            // Brief delay before speaking to allow transition
            const timer = setTimeout(() => {
                if (selectedVideo.briefingContent) {
                    speakBriefing(selectedVideo.briefingContent, selectedVideo.brieferName || "Guide");
                }
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [selectedVideo]);

    useEffect(() => {
        if (videoPlayerRef.current) {
            if (isPlaying) videoPlayerRef.current.play().catch(() => { });
            else videoPlayerRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const speakBriefing = (text: string, name: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            const voices = window.speechSynthesis.getVoices();
            const isMale = name.toLowerCase().includes('alvin') || name.toLowerCase().includes('marcus') || name.toLowerCase().includes('david');

            let preferredVoice;
            if (isMale) {
                preferredVoice = voices.find(v =>
                    (v.name.includes('Male') || v.name.includes('Guy') || v.name.includes('David') || v.name.includes('Google US English'))
                    && v.lang.startsWith('en')
                );
            } else {
                preferredVoice = voices.find(v =>
                    (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English'))
                    && v.lang.startsWith('en')
                );
            }

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    function NeuralMouthPulse({ index }: { index: number }) {
        return (
            <motion.div
                className="w-1 rounded-full bg-emerald-400/30 blur-[1px]"
                animate={{
                    height: [2, Math.random() * 24 + 4, 2],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.1 + (Math.random() * 0.15),
                    delay: index * 0.02,
                    ease: "easeInOut"
                }}
            />
        );
    }

    return (
        <div className="relative py-24 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                        <Play size={14} />
                        <span>AI Video Showcase</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                        See AI in Action
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Watch comprehensive demonstrations of our AI-powered tools generating real educational content
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {AI_VIDEOS.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => {
                                setSelectedVideo(video);
                                setIsPlaying(true);
                            }}
                        >
                            <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 transition-all group-hover:shadow-2xl group-hover:shadow-[#d4af37]/20">
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-black overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-16 h-16 rounded-full bg-[#d4af37]/90 flex items-center justify-center shadow-lg shadow-[#d4af37]/50 backdrop-blur-sm"
                                        >
                                            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                                        </motion.div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/80 text-white text-xs font-bold">
                                        {video.duration}
                                    </div>

                                    {/* AI Generated Badge */}
                                    {video.aiGenerated && (
                                        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-900/50">
                                            <Sparkles size={10} />
                                            AI Generated
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="text-xs text-[#d4af37] font-semibold mb-2 uppercase tracking-wider">{video.category}</div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        {video.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        onClick={() => {
                            setSelectedVideo(null);
                            setIsPlaying(false);
                            window.speechSynthesis.cancel();
                            setIsSpeaking(false);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setSelectedVideo(null);
                                    setIsPlaying(false);
                                    window.speechSynthesis.cancel();
                                    setIsSpeaking(false);
                                }}
                                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Video Player & Briefing Panel */}
                            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-emerald-500/10 flex flex-col lg:flex-row">
                                <div className="lg:w-2/3 relative aspect-video bg-black">
                                    <video
                                        ref={videoPlayerRef}
                                        src={selectedVideo.videoUrl}
                                        loop
                                        autoPlay
                                        muted={isMuted}
                                        className="w-full h-full object-cover"
                                        playsInline
                                    />

                                    {/* Video Controls Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                    className="p-3 rounded-full bg-[#d4af37] hover:bg-[#b5952f] text-black transition-all shadow-lg shadow-[#d4af37]/30 transform hover:scale-105"
                                                >
                                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                                                </button>
                                                <button
                                                    onClick={() => setIsMuted(!isMuted)}
                                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                                                >
                                                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                                </button>
                                                <div>
                                                    <h3 className="text-white font-bold">{selectedVideo.title}</h3>
                                                    <p className="text-sm text-emerald-400">{selectedVideo.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30 text-[10px] font-black animate-pulse">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                    LIVE FEED
                                                </div>
                                                <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
                                                    <Maximize className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Briefing Column */}
                                <div className="lg:w-1/3 bg-zinc-950 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col relative overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-5 z-0 pointer-events-none" style={{
                                        backgroundImage: `radial-gradient(circle at center, #10b981 1px, transparent 1px)`,
                                        backgroundSize: '20px 20px'
                                    }} />

                                    {/* Avatar Header - THE TALKING HEAD */}
                                    <div className="p-6 bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/5 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className={`w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg ${isSpeaking ? 'shadow-emerald-500/40 scale-105' : 'grayscale-[0.3]'} transition-all duration-300`}>
                                                    <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-black relative">
                                                        <motion.img
                                                            src={selectedVideo.brieferAvatar || "/images/dr_alvin_west.png"}
                                                            alt={selectedVideo.brieferName}
                                                            className="w-full h-full object-cover"
                                                            animate={isSpeaking ? {
                                                                x: [0, -3, 3, -1, 0],
                                                                y: [0, -1, 1, -0.5, 0],
                                                                rotate: [0, -1, 1, -0.5, 0],
                                                                scale: [1, 1.03, 1.01, 1.03, 1]
                                                            } : {}}
                                                            transition={isSpeaking ? {
                                                                duration: 4,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            } : {
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            }}
                                                            key={selectedVideo.id}
                                                        />
                                                        {isSpeaking && (
                                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-1">
                                                                {[...Array(8)].map((_, i) => (
                                                                    <NeuralMouthPulse key={i} index={i} />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {isSpeaking && (
                                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-zinc-900">
                                                        <Mic size={10} className="text-white animate-pulse" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{selectedVideo.brieferRole}</span>
                                                    {isSpeaking && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
                                                </div>
                                                <h3 className="text-sm font-bold text-white">{selectedVideo.brieferName}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Briefing Text Area */}
                                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative z-10">
                                        <div className="flex items-start gap-3 mb-4 opacity-50">
                                            <Sparkles size={14} className="text-emerald-500 mt-1" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Neural Briefing Decrypted</span>
                                        </div>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                            className="text-zinc-300 text-sm leading-relaxed font-mono whitespace-pre-wrap pl-2 border-l-2 border-emerald-500/20"
                                        >
                                            {selectedVideo.briefingContent || selectedVideo.description}
                                        </motion.p>

                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter mb-2">
                                                <span className="text-zinc-500">Analysis Progress</span>
                                                <span className="text-emerald-400">{isSpeaking ? 'Transmitting...' : 'Complete'}</span>
                                            </div>
                                            {/* Fake Viz Bar */}
                                            <div className="flex gap-0.5 h-4 items-end mb-4 opacity-30">
                                                {[...Array(20)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-full bg-emerald-500 rounded-t-sm"
                                                        animate={{ height: isSpeaking ? [4, Math.random() * 16, 4] : 4 }}
                                                        transition={{ repeat: Infinity, duration: 0.2 + Math.random() * 0.2 }}
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/5 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group"
                                                onClick={() => {
                                                    if (isSpeaking) {
                                                        window.speechSynthesis.cancel();
                                                        setIsSpeaking(false);
                                                    } else {
                                                        speakBriefing(selectedVideo.briefingContent || "", selectedVideo.brieferName || "Guide");
                                                    }
                                                }}
                                            >
                                                {isSpeaking ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-emerald-400" />}
                                                {isSpeaking ? 'Mute Briefer' : 'Replay Briefing'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
