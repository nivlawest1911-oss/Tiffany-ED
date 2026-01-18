'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Clock, Users, TrendingUp, CheckCircle, ArrowRight,
    FileText, Brain, MessageSquare, Award, Zap, BarChart3, Play, Mic, Video,
    Camera, Download, Copy, Star, Trophy, Rocket, Target, Lightbulb, Code,
    Bell, Settings, User, Headphones, Wand2, Globe
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Core Layout - Dynamic
const FloatingNavbar = dynamic(() => import('./FloatingNavbar'), { ssr: false });
const UnusualHero = dynamic(() => import('./UnusualHero').then(mod => ({ default: mod.UnusualHero })), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// Feature Components - Dynamic
const FeatureVideos = dynamic(() => import('./FeatureVideos'), { ssr: false });
const VideoTestimonials = dynamic(() => import('./VideoTestimonials'), { ssr: false });
const HowItWorksVideo = dynamic(() => import('./HowItWorksVideo'), { ssr: false });
const PremiumPricingTable = dynamic(() => import('./PremiumPricingTable'), { ssr: false });
const SpotlightCard = dynamic(() => import('./SpotlightCard'), { ssr: false });

// AI Components - Dynamic
const SovereignDelegate = dynamic(() => import('./SovereignDelegate'), { ssr: false });
const SovereignPurpose = dynamic(() => import('./SovereignPurpose'), { ssr: false });
const SovereignNeuralAtlas = dynamic(() => import('./SovereignNeuralAtlas'), { ssr: false });
const ResearchFoundations = dynamic(() => import('./ResearchFoundations'), { ssr: false });
const StrategicAssociations = dynamic(() => import('./StrategicAssociations'), { ssr: false });
const SovereignResourceMatrix = dynamic(() => import('./SovereignResourceMatrix'), { ssr: false });
const SovereignCinematicVault = dynamic(() => import('./SovereignCinematicVault'), { ssr: false });
const AITwinGenerator = dynamic(() => import('./ai-twin-generator').then(mod => ({ default: mod.AITwinGenerator })), { ssr: false });
const VoiceIdentity = dynamic(() => import('./VoiceIdentity'), { ssr: false });
const OnboardingFlow = dynamic(() => import('./OnboardingFlow'), { ssr: false });
const HolographicBriefing = dynamic(() => import('./HolographicBriefing'), { ssr: false });
const LiveBriefingConsole = dynamic(() => import('./LiveBriefingConsole'), { ssr: false });
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });
const NotificationCenter = dynamic(() => import('./NotificationCenter'), { ssr: false });

const AIAvatarGallery = dynamic(() => import('./AIAvatarGallery'), {
    ssr: false,
    loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl" />
});
const AIVideoShowcase = dynamic(() => import('./AIVideoShowcase'), {
    ssr: false,
    loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl" />
});

// Dashboards - Dynamic
const InteractiveDashboard = dynamic(() => import('./InteractiveDashboard'), { ssr: false });
const AnalyticsDashboard = dynamic(() => import('./AnalyticsDashboard'), { ssr: false });

// Showcase - Dynamic
const FeatureShowcaseGrid = dynamic(() => import('./FeatureShowcaseGrid'), { ssr: false });
const SequentialRecallGame = dynamic(() => import('./SequentialRecallGame'), { ssr: false });
const NeuralReferralNode = dynamic(() => import('./NeuralReferralNode'), { ssr: false });
const SubscriberStream = dynamic(() => import('./SubscriberStream'), { ssr: false });
const GlobalReachCounter = dynamic(() => import('./GlobalReachCounter'), { ssr: false });
const NeuralMarketplace = dynamic(() => import('./NeuralMarketplace'), { ssr: false });

// Complete Bento Grid - Dynamic Imports
const ArchitectIdentityNode = dynamic(() => import('./bento/ArchitectIdentityNode'), { ssr: false });
const AutomatedIEPAudit = dynamic(() => import('./bento/AutomatedIEPAudit'), { ssr: false });
const AvatarLaboratory = dynamic(() => import('./bento/AvatarLaboratory'), { ssr: false });
const AvatarMasterclass = dynamic(() => import('./bento/AvatarMasterclass'), { ssr: false });
const EQGenerator = dynamic(() => import('./bento/EQGenerator'), { ssr: false });
const ExecutiveDashboard = dynamic(() => import('./bento/ExecutiveDashboard'), { ssr: false });
const IEPGenerator = dynamic(() => import('./bento/IEPGenerator'), { ssr: false });
const LeadershipGenerator = dynamic(() => import('./bento/LeadershipGenerator'), { ssr: false });
const LessonPlanGenerator = dynamic(() => import('./bento/LessonPlanGenerator'), { ssr: false });
const NeuralSyncGym = dynamic(() => import('./bento/NeuralSyncGym'), { ssr: false });
const NeuralTrainingCommand = dynamic(() => import('./bento/NeuralTrainingCommand'), { ssr: false });
const SovereignBroadcastNode = dynamic(() => import('./bento/SovereignBroadcastNode'), { ssr: false });
const SovereignEnterpriseModule = dynamic(() => import('./bento/SovereignEnterpriseModule'), { ssr: false });
const SovereignFeed = dynamic(() => import('./bento/SovereignFeed'), { ssr: false });
const SovereignIDManager = dynamic(() => import('./bento/SovereignIDManager'), { ssr: false });
const SovereignPrivacyManifesto = dynamic(() => import('./bento/SovereignPrivacyManifesto'), { ssr: false });
const SovereignRankGuide = dynamic(() => import('./bento/SovereignRankGuide'), { ssr: false });
const SovereignSkillMatrix = dynamic(() => import('./bento/SovereignSkillMatrix'), { ssr: false });
const SovereignSocialUplink = dynamic(() => import('./bento/SovereignSocialUplink'), { ssr: false });
const SystemHealthTile = dynamic(() => import('./bento/SystemHealthTile'), { ssr: false });
const DistrictBudgetOptimizer = dynamic(() => import('./bento/DistrictBudgetOptimizer'), { ssr: false });
const LiteracyCoachAI = dynamic(() => import('./bento/LiteracyCoachAI'), { ssr: false });
const SpecialEdLawAuditor = dynamic(() => import('./bento/SpecialEdLawAuditor'), { ssr: false });
const NeuralBackground = dynamic(() => import('./NeuralBackground'), { ssr: false });

export default function ModernHomePage() {
    const [mounted, setMounted] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeDelegate, setActiveDelegate] = useState(0);
    const [showLiveDemo, setShowLiveDemo] = useState(false);

    // Prevent SSR issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Check if first visit for onboarding
    useEffect(() => {
        if (!mounted) return;
        const hasVisited = localStorage.getItem('edintel_visited');
        if (!hasVisited) {
            setTimeout(() => setShowOnboarding(true), 2000);
            localStorage.setItem('edintel_visited', 'true');
        }
    }, [mounted]);

    // Keyboard shortcut for command palette
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowCommandPalette(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const stats = [
        { value: '47K+', label: 'Educators', icon: Users, color: 'from-blue-500 to-cyan-500' },
        { value: '1.5M+', label: 'Hours Saved', icon: Clock, color: 'from-emerald-500 to-teal-500' },
        { value: '$38M+', label: 'Capital Recovered', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
        { value: '1,400+', label: 'AL Districts', icon: Award, color: 'from-orange-500 to-red-500' },
        { value: '48', label: 'US States', icon: Globe, color: 'from-indigo-500 to-blue-500' },
    ];

    const features = [
        {
            icon: Brain,
            title: "IEP Architect",
            description: "Legally defensible goals in minutes.",
            color: "from-violet-500 to-purple-600",
            link: "/generators/iep-architect",
            image: "/images/iep_architect_mockup.png",
            badge: "Top Rated"
        },
        {
            icon: Sparkles,
            title: "Lesson Planner",
            description: "Adaptive standards-aligned plans.",
            color: "from-fuchsia-500 to-pink-600",
            link: "/generators/lesson-planner",
            image: "/images/lesson_planner_mockup.png",
            badge: "New"
        },
        {
            icon: FileText,
            title: "Grant Writer",
            description: "Persuasive funding engine.",
            color: "from-blue-500 to-cyan-600",
            link: "/generators/grant-compliance-auditor",
            image: "/images/grant_writer_mockup.png"
        }
    ];

    const delegates = [
        {
            name: "Dr. Alvin West",
            role: "Executive Principal",
            avatar: "/images/dr_alvin_west.png",
            color: "from-indigo-600 to-purple-800",
            voiceSettings: { pitch: 0.9, rate: 0.85, lang: 'en-US' }
        },
        {
            name: "Sarah West",
            role: "Curriculum Strategist",
            avatar: "/images/avatars/curriculum_strategist.png",
            color: "from-emerald-600 to-teal-800",
            voiceSettings: { pitch: 1.1, rate: 0.95, lang: 'en-US' }
        },
        {
            name: "Marcus Johnson",
            role: "Stem Coordinator",
            avatar: "/images/avatars/stem_coordinator.png",
            color: "from-blue-600 to-cyan-800",
            voiceSettings: { pitch: 1.0, rate: 1.0, lang: 'en-US' }
        },
    ];

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#050507] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                    <p className="font-mono text-sm tracking-widest text-indigo-400">INITIALIZING NEURAL INTERFACE...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-indigo-500/30 relative overflow-hidden font-sans">
            <NeuralBackground />

            <FloatingNavbar />

            <AnimatePresence>{showCommandPalette && <CommandPalette onClose={() => setShowCommandPalette(false)} />}</AnimatePresence>
            <AnimatePresence>{showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}</AnimatePresence>
            <AnimatePresence>{showOnboarding && <OnboardingFlow onComplete={() => setShowOnboarding(false)} />}</AnimatePresence>

            <main className="relative z-10">
                <UnusualHero />

                {/* CONSOLIDATED TRUST BAR */}
                <section className="relative -mt-20 mb-32 max-w-6xl mx-auto px-4">
                    <div className="bg-zinc-900/20 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 shadow-3xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-10 pt-10 border-t border-white/5 opacity-40">
                            <SubscriberStream />
                        </div>
                    </div>
                </section>

                <SovereignNeuralAtlas />

                {/* THE CORE INTELLIGENCE */}
                <section className="py-24 max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-16">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                <BarChart3 size={12} />
                                <span>Command Intelligence</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-8">
                                Leadership at the <br />
                                <span className="text-zinc-600 italic">Speed of Thought.</span>
                            </h2>
                            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10">
                                Transforming fragmented data into actionable leadership grids. Real-time analytics, automated audits, and sovereign local intelligence.
                            </p>
                            <Link href="/dashboard" className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black hover:scale-105 transition-all text-sm font-black uppercase tracking-widest">
                                <span>Launch Executive Matrix</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <InteractiveDashboard />
                        </div>
                    </div>
                </section>

                {/* THE WORKSPACE - Top 8 Sovereign Tools */}
                <section className="py-32 bg-[#080808]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Sovereign Workspace</h2>
                            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                                Access the most powerful AI infrastructure in education. Grouped for efficiency, designed for results.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                            {/* Flagship Flagships (Span 6/12 on LG) */}
                            <div className="lg:col-span-6"><IEPGenerator /></div>
                            <div className="lg:col-span-6"><DistrictBudgetOptimizer /></div>

                            {/* Standard Tools (Span 4/12 on LG) */}
                            <div className="lg:col-span-4"><LessonPlanGenerator /></div>
                            <div className="lg:col-span-4"><SpecialEdLawAuditor /></div>
                            <div className="lg:col-span-4"><LiteracyCoachAI /></div>

                            {/* Secondary Support (Span 3/12 on LG) */}
                            <div className="lg:col-span-3"><AutomatedIEPAudit /></div>
                            <div className="lg:col-span-3"><ExecutiveDashboard /></div>
                            <div className="lg:col-span-3"><LeadershipGenerator /></div>
                            <div className="lg:col-span-3"><AvatarLaboratory /></div>

                            {/* Identity/EQ (Span 6/12) */}
                            <div className="lg:col-span-6"><EQGenerator /></div>
                            <div className="lg:col-span-6"><ArchitectIdentityNode /></div>
                        </div>

                        <div className="mt-16 flex justify-center">
                            <Link href="/generators">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20"
                                >
                                    Explore All 70+ Tools
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* THE DELEGATES - AI Avatar Gallery */}
                <section className="py-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            <Users size={12} />
                            <span>Neural Presence</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            Global Team, <span className="text-zinc-600">Local Impact.</span>
                        </h2>
                        <p className="text-zinc-500 max-w-xl mx-auto">
                            Deploy high-fidelity AI avatars as virtual assistants, specialized coaches, or departmental leads.
                        </p>
                    </div>
                    <AIAvatarGallery />
                </section>

                {/* INNOVATION SHOWCASE - Demos & Videos */}
                <section className="py-32 bg-zinc-950/50">
                    <SovereignCinematicVault />
                </section>

                {/* THE AI TWIN EXPERIENCE */}
                <AITwinGenerator />

                <ResearchFoundations />

                <SovereignPurpose />
                <StrategicAssociations />
                <SovereignResourceMatrix />

                {/* PRICING & FINAL CALL */}
                <section id="pricing" className="py-32 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Invest in Excellence.</h2>
                            <p className="text-zinc-500">Transparent pricing for every leadership vector.</p>
                        </div>
                        <PremiumPricingTable />
                    </div>

                    {/* Final CTA Strip */}
                    <div className="px-4">
                        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20 group">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:4px_4px] opacity-20 mix-blend-overlay" />
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                                <Sparkles size={200} />
                            </div>
                            <h2 className="relative text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                                ARCHITECT YOUR <br /> FUTURE TODAY.
                            </h2>
                            <Link href="/signup">
                                <button className="relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform shadow-xl">
                                    Start 30-Day Protocol
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />

            {/* FLOATING DELEGATE SYSTEM - Sleeked */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                    {delegates.map((delegate, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setActiveDelegate(index)}
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-10 h-10 rounded-full overflow-hidden border-2 shadow-xl ${activeDelegate === index ? 'border-white scale-110' : 'border-white/10 opacity-60'
                                } transition-all`}
                        >
                            <img src={delegate.avatar} alt={delegate.name} className="w-full h-full object-cover" />
                        </motion.button>
                    ))}
                </div>

                <div className="pointer-events-auto">
                    <SovereignDelegate
                        name={delegates[activeDelegate].name}
                        role={delegates[activeDelegate].role}
                        avatarImage={delegates[activeDelegate].avatar}
                        color={delegates[activeDelegate].color}
                        greetingText={`Awaiting directives, Executive. I am ${delegates[activeDelegate].name}. Output fidelity is currently 99.8%.`}
                        theme="sovereign"
                        voiceSettings={delegates[activeDelegate].voiceSettings}
                    />
                </div>
            </div>

            {/* Quick Briefing Trigger */}
            <motion.button
                onClick={() => setShowBriefing(true)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 left-8 z-50 p-4 rounded-2xl bg-white text-black shadow-2xl transition-all"
                title="Sovereign Briefing"
            >
                <Target className="w-6 h-6" />
            </motion.button>

            {/* Global Modals */}
            <AnimatePresence>
                {showBriefing && (
                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        title="Strategic Briefing"
                        description="Accessing the current platform vector and operational status. All systems are operating within peak cognitive parameters."
                        avatarImage={delegates[activeDelegate].avatar}
                        role={delegates[activeDelegate].role}
                        theme="sovereign"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
