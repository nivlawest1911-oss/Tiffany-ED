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
        title: 'Full-Spectrum IEP Generation System',
        description: 'Watch the Professional Engine architect a 100% compliant, culturally resonant IEP in under 120 seconds.',
        thumbnail: '/images/features/iep_interface.png',
        videoUrl: '/videos/features/iep-architect-demo.mp4',
        duration: '3:45',
        category: 'Special Education',
        aiGenerated: true,
        briefingContent: "Connection Secure. We are currently observing the Synthesis Phase of an Alabama-aligned IEP. Notice the strategic mapping of student assessment data directly into measurable SMART goals. The system doesn't just fill forms; it audits for IDEA compliance and FAPE fidelity in real-time. By leveraging a multi-variate database of 40,000+ instructional strategies, we ensure every scholar has a legally robust and instructionally sound success path without the 4-hour manual drafting period.",
        brieferName: "Dr. Maya Washington",
        brieferRole: "IEP Compliance Architect",
        brieferAvatar: "/images/avatars/iep_architect.png"
    },
    {
        id: 2,
        title: 'Strategic Lesson Synthesis (ALCOS)',
        description: 'Accelerate instructional design with standards-aligned, high-engagement lesson blueprints.',
        thumbnail: '/images/features/strategic_educator_planner.png',
        videoUrl: '/videos/features/lesson-planner-demo.mp4',
        duration: '4:20',
        category: 'Curriculum',
        aiGenerated: true,
        briefingContent: "Curriculum Insight initiated. Our system identifies high-impact ALCOS and CCSS standards and wraps them in a UbD (Understanding by Design) framework. The resulting blueprints prioritize 'Intellectual Leadership' and community-building hooks. What you see is the 'Foundry' session, where raw academic concepts are transformed into high-engagement performance tasks. Educators save 80% on planning time while increasing instructional yield by 35% through strategically-aligned content delivery.",
        brieferName: "Sarah West",
        brieferRole: "Curriculum Strategist",
        brieferAvatar: "/images/avatars/curriculum_strategist.png"
    },
    {
        id: 3,
        title: 'Strategic Presence: Live Conversation',
        description: 'Witness the future of leadership as Dr. Alvin West interacts in real-time with zero latency.',
        thumbnail: '/images/dr_alvin_west.png',
        videoUrl: '/videos/briefings/principal_briefing.mp4',
        duration: '2:30',
        category: 'AI Avatars',
        aiGenerated: false,
        briefingContent: "Strategic Sync Active. This demo showcases the 2-way connection between the Professional Assistant and a district leader. The avatar is not just a recording; it's a dynamic identity core trained on thousands of hours of executive decision-making. It responds to complex fiscal inquiries, staff morale challenges, and policy shifts with the same authoritativeness and cultural nuance as Dr. West himself. This is the end of leadership bottlenecks.",
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
        briefingContent: "Executive Connection established. We are visualizing student performance vectors across 14 data streams. The Strategic System identifies 'Opportunity Centers'—pockets of potential that are currently underserved. By shifting resources at the speed of data, district leaders can optimize for ROI (Return on Instruction). We move beyond lagging indicators like state tests into leading indicators that allow for real-time course correction and instructional capital recovery.",
        brieferName: "Marcus Johnson",
        brieferRole: "Professional Stem Lead",
        brieferAvatar: "/images/avatars/stem_coordinator.png"
    },
    {
        id: 5,
        title: 'Behavioral Support System',
        description: 'Constructing tiered intervention strategies that prioritize self-regulation over compliance.',
        thumbnail: '/images/features/behavior_intervention_specialist.png',
        videoUrl: '/videos/briefings/counselor_briefing.mp4',
        duration: '3:50',
        category: 'Behavior',
        aiGenerated: true,
        briefingContent: "Behavioral Status Calibration. We are now generating a Tier 3 Intervention Plan based on frequency-interval observation data. The system shifts the perspective from 'What is the student doing?' to 'What is the student seeking?' By implementing professional replacement behaviors and reinforcement schedules, we transform classroom climate. This process is fully compliant with Alabama SDE behavior standards and PBIS best practices.",
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
        briefingContent: "Literacy Stream Verified. Dr. Robinson is demonstrating the synthesis of raw reading scores into actionable intervention groups. The Strategic System identifies the specific 'Strategic Blockage' in literacy acquisition—be it phonemic awareness or high-level comprehension—and prescribes the exact instructional approach needed for gap closure. We don't just teach reading; we empower literacy leadership.",
        brieferName: "Dr. Emily Robinson",
        brieferRole: "Literacy & Data Scientist",
        brieferAvatar: "/images/avatars/literacy_coach.png"
    },
    {
        id: 11,
        title: 'Sovereign Identity Synchronicity',
        description: 'Observe the zero-latency synchronization between the user and their digital twin.',
        thumbnail: '/images/avatars/user_placeholder.png',
        videoUrl: '/videos/features/twin-sync-demo.mp4',
        duration: '2:15',
        category: 'Identity',
        aiGenerated: true,
        briefingContent: "Identity Link Confirmed. We are witnessing the bilateral transfer of leadership heuristics. The Sovereign Twin doesn't just mimic voice; it inherits the user's specific policy preferences and cultural context. This allows for 'Delegate Without Deployment'—the ability to be in 10 school buildings simultaneously through a unified executive mirror.",
        brieferName: "Your Sovereign Twin",
        brieferRole: "Executive Mirror",
        brieferAvatar: "/images/avatars/user_placeholder.png"
    },
    {
        id: 12,
        title: 'Quantum Edge Architecture',
        description: 'A deep dive into the triple-redundant cloud infrastructure powering the EdIntel ecosystem.',
        thumbnail: '/images/features/data_dashboard.png',
        videoUrl: '/videos/features/cloud-infra-briefing.mp4',
        duration: '6:30',
        category: 'Infrastructure',
        aiGenerated: true,
        briefingContent: "System Topology Update. Our infrastructure leverages a Vercel Edge Mesh, Google Cloud TPU clusters, and a Github-driven CI/CD pulse. This triple-layered redundancy ensures 99.999% uptime for your strategic protocols. By processing neural requests at the edge, we eliminate the latency bottleneck, allowing for real-time human-avatar interaction without the 'AI lag' common in consumer tools.",
        brieferName: "Cloud System Architect",
        brieferRole: "Infrastructure Lead",
        brieferAvatar: "/images/avatars/stem_coordinator.png"
    },
    // --- INTEGRATION: HEYGEN ---
    {
        id: 101,
        title: 'Global Parent Communication (HeyGen)',
        description: 'Instant translation of administrative updates into 40+ languages with perfect lip-sync.',
        thumbnail: '/images/integrations/heygen_thumb.png',
        videoUrl: '/videos/briefings/principal_briefing.mp4', // Simulating HeyGen Output
        duration: '2:15',
        category: 'Communications',
        aiGenerated: true,
        briefingContent: "Communication Protocol: Global Reach. This module utilizes HeyGen's advanced video translation engine. Notice the seamless lip-synchronization as the Superintendent's message is converted from English to Spanish, then Vietnamese, in real-time. This ensures 100% equity in information access for all district families, regardless of primary language.",
        brieferName: "System",
        brieferRole: "Translation Engine",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    // --- INTEGRATION: INVIDEO ---
    {
        id: 102,
        title: 'Daily District News (InVideo)',
        description: 'Automated synthesis of daily bulletins into engaging, broadcast-quality video updates.',
        thumbnail: '/images/integrations/invideo_thumb.png',
        videoUrl: '/videos/features/data-analysis-demo.mp4', // Simulating InVideo Output
        duration: '3:00',
        category: 'Broadcast',
        aiGenerated: true,
        briefingContent: "Broadcast Sequence Initiated. Utilizing InVideo's generative AI, the morning bulletin text was transformed into this dynamic visual presentation in under 60 seconds. The system automatically selects relevant stock footage, adds kinetic typography, and synchronizes a professional voiceover, turning static memos into must-watch content.",
        brieferName: "System",
        brieferRole: "Media Director",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    // --- INTEGRATION: CAPTIONS ---
    {
        id: 103,
        title: 'Accessible Learning Materials (Captions)',
        description: 'Automatic high-fidelity captioning and dubbing for universal design compliance.',
        thumbnail: '/images/integrations/captions_thumb.png',
        videoUrl: '/videos/briefings/counselor_briefing.mp4', // Simulating Captions Output
        duration: '1:45',
        category: 'Accessibility',
        aiGenerated: true,
        briefingContent: "Accessibility Audit: Passed. This demonstration highlights the 'Captions' integration. We are watching raw lecture footage being automatically processed for ADA compliance. The AI not only generates 99% accurate subtitles but also highlights key terms for emphasis, aiding cognitive retention for diverse learners.",
        brieferName: "System",
        brieferRole: "Compliance Bot",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    // --- INTEGRATION: OPUS ---
    {
        id: 104,
        title: 'Micro-PD Generation (Opus)',
        description: 'Intelligent extraction of viral moments from long-form professional development sessions.',
        thumbnail: '/images/integrations/opus_thumb.png',
        videoUrl: '/videos/briefings/data_briefing.mp4', // Simulating Opus Output
        duration: '0:58',
        category: 'Professional Dev',
        aiGenerated: true,
        briefingContent: "Content Distillation Active. The Opus engine has scanned a 60-minute board meeting and extracted this critical 1-minute segment on budget reallocation. It automatically reframes the video for mobile consumption and adds engaging captions, ensuring high-priority information reaches staff on the go.",
        brieferName: "System",
        brieferRole: "Content Curator",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    // --- INTEGRATION: GEMINI ---
    {
        id: 105,
        title: 'Multimodal Assessment (Gemini)',
        description: 'Analyzing student work samples (video, audio, text) for deep competency evidence.',
        thumbnail: '/images/integrations/gemini_thumb.png',
        videoUrl: '/videos/features/iep-architect-demo.mp4', // Simulating Gemini Output
        duration: '4:10',
        category: 'Assessment',
        aiGenerated: true,
        briefingContent: "Multimodal Analysis in progress. Powered by Google Gemini, the system is watching a student's science project video presentation. It extracts evidence of critical thinking, communication standards, and scientific accuracy, cross-referencing against the rubric to generate a draft score and personalized feedback instantly.",
        brieferName: "System",
        brieferRole: "Assessment AI",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    // --- SOVEREIGN EXECUTIVE ---
    {
        id: 999,
        title: 'Sovereign Directive: CEO Update',
        description: 'Direct neural uplink from the Executive Sovereign regarding Q1 strategic alignment.',
        thumbnail: '/images/avatars/executive_leader.png',
        videoUrl: '/videos/briefings/executive_directive.mp4',
        duration: '1:15',
        category: 'Internal - Executive',
        aiGenerated: true, // It's an AI avatar of the human
        briefingContent: "Command Authority Recognized. I am sharing this directive from the Executive Sovereign console. Our current trajectory indicates a 14% increase in instructional efficacy across the pilot districts. Accessing the Neural Archives... visualization complete. We are now deploying the 'Titan' protocol for district-wide fiscal optimization. as we move forward, ensure all delegates are aligned with the new compliance vectors.",
        brieferName: "Dr. Alvin West",
        brieferRole: "Executive Sovereign",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    {
        id: 1000,
        title: 'Parent Engagement Protocol',
        description: 'Simulated interaction with a concerned parent using conflict resolution vectors.',
        thumbnail: '/images/avatars/parent_simulation.png',
        videoUrl: '/videos/briefings/counselor_briefing.mp4',
        duration: '2:45',
        category: 'Simulation',
        aiGenerated: true,
        briefingContent: "Scenario Loaded: High-Conflict Parent Meeting. In this simulation, the avatar anticipates emotional escalation points and preemptively deploys de-escalation rhetoric. Notice the tone shift at 0:45—the system detects elevated stress in the user's voice and instantly modulates its pitch and pacing to induce calm.",
        brieferName: "Keisha Reynolds",
        brieferRole: "Community Relations",
        brieferAvatar: "/images/avatars/curriculum_strategist.png"
    },
    {
        id: 1001,
        title: 'Fiscal Audit Walkthrough',
        description: 'Automated breakdown of the annual budget audit for board presentation.',
        thumbnail: '/images/features/fiscal_audit.png',
        videoUrl: '/videos/features/data-analysis-demo.mp4',
        duration: '5:30',
        category: 'Finance',
        aiGenerated: true,
        briefingContent: "Financial Forensics Complete. This video generates a narrative for the Board of Education meeting. It translates complex ledger data into a clear 'Story of Solvency', highlighting the 12% savings in operational costs due to recent energy efficiency upgrades. The AI automatically generates the accompanying slide deck.",
        brieferName: "Dr. Isaiah Vance",
        brieferRole: "Compliance Lead",
        brieferAvatar: "/images/avatars/special_ed_director.png"
    },
    {
        id: 2001,
        title: 'Neural Strategy Framework',
        description: 'Watch the AI architect a 5-year district growth plan using predictive modeling.',
        thumbnail: '/images/features/strategic_educator_planner.png',
        videoUrl: '/videos/features/strategy-demo.mp4',
        duration: '5:20',
        category: 'Strategy',
        aiGenerated: true,
        briefingContent: "Initiating Strategy Heuristics. We are currently observing a 5-year predictive model for district expansion. By analyzing demographic shifts and funding vectors, we ensure long-term solvency. This isn't just a plan; it's a dynamic architectural blueprint for educational legacy.",
        brieferName: "Dr. Alvin West (Core)",
        brieferRole: "Executive Sovereign",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    {
        id: 2002,
        title: 'Human Fidelity Calibration',
        description: 'Observe the zero-latency synchronization between human voice and synthetic avatar.',
        thumbnail: '/images/avatars/dr_alvin_west_premium.png',
        videoUrl: '/videos/features/fidelity-demo.mp4',
        duration: '3:15',
        category: 'Technology',
        aiGenerated: true,
        briefingContent: "Calibrating Human Fidelity. This demo showcases our proprietary 'Neural Mirror' technology. Notice how the avatar's micro-expressions and speech patterns perfectly align with the user's biometric data. This is how we eliminate the 'uncanny valley' and create true leadership presence.",
        brieferName: "Dr. Alvin West (Core)",
        brieferRole: "Executive Sovereign",
        brieferAvatar: "/images/avatars/executive_leader.png"
    },
    {
        id: 2003,
        title: 'Quantum Budget Audit',
        description: 'Real-time fiscal analysis of multi-million dollar district budgets.',
        thumbnail: '/images/features/fiscal_audit.png',
        videoUrl: '/videos/features/budget-demo.mp4',
        duration: '4:45',
        category: 'Finance',
        aiGenerated: true,
        briefingContent: "Executing Quantum Audit. We are scanning 14,000 line items across state and federal funding streams. The system identifies potential misallocations and recovers operational capital in micro-seconds. Your budget is no longer a static document; it's an optimized engine for district growth.",
        brieferName: "Dr. Alvin West (Core)",
        brieferRole: "Executive Sovereign",
        brieferAvatar: "/images/avatars/executive_leader.png"
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

            const isAlvin = name.toLowerCase().includes('alvin');
            const isMale = name.toLowerCase().includes('marcus') || name.toLowerCase().includes('david') || name.toLowerCase().includes('andre');

            let preferredVoice;

            if (isAlvin) {
                // SPECIAL EXECUTIVE VOICE -- Attempt to find deep/authoritative voices
                preferredVoice = voices.find(v =>
                    v.name === 'Daniel' || // Premium iOS/Mac
                    v.name.includes('Google UK English Male') || // Deep
                    v.name.includes('Rocko') // Android deep
                ) || voices.find(v => v.name.includes('David'));
            } else if (isMale) {
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

    function SyncMouthPulse({ index }: { index: number }) {
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
                                                                    <SyncMouthPulse key={i} index={i} />
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
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Strategic Briefing Decrypted</span>
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
