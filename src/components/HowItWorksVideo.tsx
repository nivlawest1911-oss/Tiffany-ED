'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, CheckCircle, Video, Radio } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import HolographicBriefing from './HolographicBriefing';

export default function HowItWorksVideo() {
    const { playHover, playClick } = useProfessionalSounds();
    const [activeBriefing, setActiveBriefing] = useState<any>(null);

    const steps = [
        {
            number: '01',
            title: 'Initiate Protocol',
            description: 'Select your specialized AI Delegate from the Command Center. Our system offers over 41 specialized roles, each fine-tuned for specific educational administrative tasks.',
            video: '/videos/features/iep-architect-demo.mp4',
            thumbnail: '/images/avatars/executive_leader.png',
            features: ['Browse 41+ specialized tools', 'Filter by Professional Role', 'Instant specific activation'],
            role: "Command Interface",
            avatar: "/images/avatars/executive_leader.png"
        },
        {
            number: '02',
            title: 'Input Parameters',
            description: 'Provide secure context for your request. Our system is built with FERPA-compliance at its core, ensuring all student data remains protected while processing.',
            video: '/videos/features/lesson-planner-demo.mp4',
            thumbnail: '/images/avatars/curriculum_strategist.png',
            features: ['Secure data entry', 'Context-aware suggestions', 'Voice-enabled inputs'],
            role: "Security Officer",
            avatar: "/images/avatars/curriculum_strategist.png"
        },
        {
            number: '03',
            title: 'Execute & Deploy',
            description: 'Receive professional, formatted intelligence instantly. The output is ready for immediate deployment in Pdf or Word formats, styled for executive presentation.',
            video: '/videos/features/data-analysis-demo.mp4',
            thumbnail: '/images/avatars/data_analyst.png',
            features: ['Export to PDF/Word', 'Instant download', 'Professional formatting'],
            role: "Output Specialist",
            avatar: "/images/avatars/data_analyst.png"
        }
    ];

    return (
        <section className="relative py-32 bg-[#0a0a0f] overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-8">
                        <Video size={14} className="text-indigo-400" />
                        <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Professional Workflow</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Architecture</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        A streamlined, three-phase protocol designed to maximize your executive efficiency.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="space-y-32">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Video/Visual Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 w-full"
                                onMouseEnter={playHover}
                            >
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/20 group cursor-pointer"
                                    onClick={() => { playClick(); setActiveBriefing(step); }}
                                >
                                    <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />

                                    {/* Video / Visual Wrapper */}
                                    <div className="relative aspect-video">
                                        <VideoPlayer
                                            src={step.video}
                                            poster={step.thumbnail}
                                            className="w-full h-full object-cover opacity-80"
                                            autoPlay={true}
                                            loop={true}
                                            muted={true}
                                        />

                                        {/* Overlay with CTA */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-20">
                                            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <Radio size={16} className="text-emerald-400 animate-pulse" />
                                                <span>PLAY BRIEFING</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Badge */}
                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-md border border-white/10">
                                        <span className="text-xs font-mono text-emerald-400">PROTOCOL_0{index + 1}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex-1 space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-8xl font-black text-white/5 font-mono select-none">
                                        {step.number}
                                    </span>
                                    <h3 className="text-4xl font-bold text-white">{step.title}</h3>
                                </div>

                                <p className="text-xl text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>

                                <ul className="space-y-4">
                                    {step.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-4 group/item">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover/item:bg-indigo-500 transition-colors duration-300">
                                                <CheckCircle className="w-5 h-5 text-indigo-400 group-hover/item:text-white" />
                                            </div>
                                            <span className="text-zinc-300 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => { playClick(); setActiveBriefing(step); }}
                                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold tracking-wide uppercase text-sm mt-4 group/btn"
                                >
                                    <Play size={14} className="fill-current group-hover/btn:scale-125 transition-transform" />
                                    <span>Detailed Briefing</span>
                                </button>
                            </motion.div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Holographic Briefing Modal */}
            <HolographicBriefing
                isOpen={!!activeBriefing}
                onClose={() => setActiveBriefing(null)}
                title={activeBriefing?.title || ""}
                description={activeBriefing?.description || ""}
                videoSrc={activeBriefing?.video}
                thumbnail={activeBriefing?.thumbnail}
                role={activeBriefing?.role}
                avatarImage={activeBriefing?.avatar}
            />
        </section>
    );
}
