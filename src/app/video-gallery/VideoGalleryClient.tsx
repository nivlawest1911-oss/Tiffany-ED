'use client';

import { motion } from 'framer-motion';
import VideoShowcase from '@/components/VideoShowcase';
import { Sparkles, Video, Zap, Brain } from 'lucide-react';

export default function VideoGalleryClient() {
    const videos = [
        {
            id: 1,
            url: '/videos/African_American_Teacher_Conference_Video.mp4',
            title: 'African American Teacher Conference',
            description: 'Highlights from the EdIntel Professional Development Summit, empowering educators through strategic innovation.',
            thumbnail: '/images/features/collaborative_intelligence_team.png'
        },
        {
            id: 2,
            url: '/videos/Architecting_and_Deploying_Holographic_AI.mp4',
            title: 'Architecting Holographic AI',
            description: 'Deep dive into the architecture and deployment of EdIntel\'s holographic AI intelligence briefing system.',
            thumbnail: '/images/features/strategic_iep_architect.png'
        },
        {
            id: 3,
            url: '/videos/Sovereign_Architect_s_Global_Information_Delivery.mp4',
            title: 'Sovereign Architect\'s Global Delivery',
            description: 'Dr. West presents the global information delivery infrastructure powering EdIntel\'s neural command layer.',
            thumbnail: '/images/features/strategic_educator_planner.png'
        },
        {
            id: 4,
            url: '/videos/AI_Agents_Eliminate_Administrator_Fatigue%20(1).mp4',
            title: 'AI Agents Eliminate Admin Fatigue',
            description: 'See how EdIntel\'s autonomous agents reduce administrator workload by up to 40% through intelligent task orchestration.',
            thumbnail: '/images/features/collaborative_intelligence_team.png'
        },
        {
            id: 5,
            url: '/videos/Edintel_App_Burnout_Suspensions_Fatigue_Solution%20(1).mp4',
            title: 'Burnout & Fatigue Solution',
            description: 'EdIntel\'s comprehensive approach to combating educator burnout, reducing suspensions, and eliminating operational fatigue.',
            thumbnail: '/images/features/strategic_educator_planner.png'
        },
        {
            id: 6,
            url: '/videos/The_Ultimate_Solution_for_Mode_Fixed.mp4',
            title: 'The Ultimate Institutional Solution',
            description: 'A cinematic overview of EdIntel\'s complete operational platform for educational institutions.',
            thumbnail: '/images/features/strategic_iep_architect.png'
        },
        {
            id: 7,
            url: '/videos/Video_Generation_About_Teachers.mp4',
            title: 'AI Video: Teachers',
            description: 'AI-generated content showcasing the teacher empowerment protocols within the EdIntel ecosystem.',
            thumbnail: '/images/features/collaborative_intelligence_team.png'
        },
        {
            id: 8,
            url: '/videos/Video_Generation_for_School_Administrators.mp4',
            title: 'AI Video: Administrators',
            description: 'AI-generated strategic briefing for school administrators leveraging EdIntel\'s command intelligence.',
            thumbnail: '/images/features/strategic_educator_planner.png'
        },
        {
            id: 9,
            url: '/videos/Video_Generation_with_EdIntel.mp4',
            title: 'Video Generation with EdIntel',
            description: 'Demonstrating EdIntel\'s integrated AI video generation capabilities for educational content creation.',
            thumbnail: '/images/features/strategic_iep_architect.png'
        },
        {
            id: 10,
            url: '/videos/Video_Generation_Request_Fulfilled.mp4',
            title: 'AI Generation: Request Fulfilled',
            description: 'Complete lifecycle of an AI video generation request from prompt to polished output.',
            thumbnail: '/images/features/collaborative_intelligence_team.png'
        },
        {
            id: 11,
            url: '/videos/Video_Ready_For_Viewing.mp4',
            title: 'Content Ready for Viewing',
            description: 'The final stage of EdIntel\'s content pipeline — professional-grade AI-generated media ready for deployment.',
            thumbnail: '/images/features/strategic_educator_planner.png'
        },
        {
            id: 12,
            url: '/videos/briefings/counselor_briefing.mp4',
            title: 'Counselor Intelligence Briefing',
            description: 'Strategic guidance briefing for school counselors: mental health analytics, student risk scoring, and intervention protocols.',
            thumbnail: '/images/features/strategic_iep_architect.png'
        },
        {
            id: 13,
            url: '/videos/briefings/data_briefing.mp4',
            title: 'Data Analytics Briefing',
            description: 'Comprehensive data intelligence briefing covering district-wide performance metrics and predictive analytics.',
            thumbnail: '/images/features/collaborative_intelligence_team.png'
        },
        {
            id: 14,
            url: '/videos/briefings/principal_briefing.mp4',
            title: 'Principal Command Briefing',
            description: 'Executive briefing for principals: operational intelligence, staffing analytics, and strategic decision vectors.',
            thumbnail: '/images/features/strategic_educator_planner.png'
        },
        {
            id: 15,
            url: '/videos/features/data-analysis-demo.mp4',
            title: 'Data Analysis Demo',
            description: 'Live demonstration of EdIntel\'s real-time data analysis engine processing district performance vectors.',
            thumbnail: '/images/features/strategic_iep_architect.png'
        },
        {
            id: 16,
            url: '/videos/EdIntel_Noise-Free_Teaching.mp4',
            title: 'Noise-Free Teaching Protocol',
            description: 'Eliminate classroom disruptions with autonomous AI behavioral intervention strategies.',
            thumbnail: '/images/features/strategic_educator_planner.png'
        },
        {
            id: 17,
            url: '/videos/edintel_ad_strategic_engine.mp4',
            title: 'EdIntel Strategic Engine',
            description: 'A comprehensive overview of the institutional autonomy architecture.',
            thumbnail: '/images/features/strategic_iep_architect.png'
        },
    ];

    const features = [
        { icon: Sparkles, title: 'AI-Generated Content', description: 'Powered by Google Labs Flow' },
        { icon: Video, title: 'Professional Quality', description: '4K resolution with smooth playback' },
        { icon: Zap, title: 'Fast Loading', description: 'Optimized for all devices' },
        { icon: Brain, title: 'Smart Integration', description: 'Seamlessly integrated into your workflow' },
    ];

    return (
        <main className="content-stage">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                            <Video className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Video Gallery</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">EdIntel</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                            Explore our AI-powered educational platform through immersive video demonstrations
                        </p>
                    </motion.div>

                    {/* Main Video Showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-20"
                    >
                        <VideoShowcase
                            videoUrl={videos[0].url}
                            title={videos[0].title}
                            description={videos[0].description}
                            thumbnail={videos[0].thumbnail}
                            autoPlay={true}
                            className="max-w-5xl mx-auto"
                        />
                    </motion.div>

                    {/* Secondary Videos Grid */}
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {videos.slice(1).map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.2 }}
                            >
                                <VideoShowcase
                                    videoUrl={video.url}
                                    title={video.title}
                                    description={video.description}
                                    thumbnail={video.thumbnail}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-zinc-950/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black text-white text-center mb-12">
                        Video Platform Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/30 transition-all"
                            >
                                <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-zinc-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-3xl p-12"
                    >
                        <h2 className="text-4xl font-black text-white mb-4">
                            Ready to Transform Your District?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-8">
                            Experience the power of AI-driven educational leadership
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/50">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                                Schedule Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
