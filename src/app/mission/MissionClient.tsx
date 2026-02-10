'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import React, { useState } from 'react';

export default function MissionClient() {
    const [showBriefing, setShowBriefing] = useState(false);
    return (
        <main className="content-stage">

            {/* Hero Section with Parallax Video */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <video
                        src="/videos/features/lesson-planner-demo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-indigo-400 tracking-tighter mb-8 drop-shadow-2xl">
                            MISSION
                            <br />
                            INNOVATION
                        </h1>
                    </motion.div>

                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        agentId="visionary"
                        title="Mission Protocol"
                        description="Welcome to the core of the EdIntel revolution. We aren't just building software; we are architecting the future of educational leadership."
                        briefingSteps={[
                            "Defeating administrative friction with neural automation.",
                            "Empowering educators to reclaim their strategic vision.",
                            "Scaling institutional impact through EdIntelty.",
                            "Establishing the standard for AI-integrated leadership."
                        ]}
                    />

                    <button
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-2 mb-12 px-8 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-black uppercase tracking-[0.3em] hover:bg-emerald-500/10 transition-all shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    >
                        Initialize Mission Briefing
                    </button>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-3xl text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed"
                    >
                        To liberate educators from administrative fatigue through
                        <span className="text-emerald-400 font-bold italic"> Intelligent Automation</span> and
                        <span className="text-indigo-400 font-bold italic"> Strategic Leadership</span>.
                    </motion.p>
                </div>
            </section>

            {/* Manifesto Section */}
            <section className="py-32 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-indigo-950/20 pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 space-y-24">
                    {[
                        {
                            title: "Reclaim Your Time",
                            text: "We believe time is the most valuable resource in education. Our tools are designed to return hours to your week.",
                            icon: Target,
                            color: "text-emerald-400"
                        },
                        {
                            title: "Elevate Your Impact",
                            text: "Automation shouldn't depersonalize education. It should handle the mundane so you can focus on the miraculous moments of learning.",
                            icon: Lightbulb,
                            color: "text-amber-400"
                        },
                        {
                            title: "Scale Your Leadership",
                            text: "True leadership is about vision, not paperwork. EdIntel empowers you to lead with data, clarity, and authority.",
                            icon: TrendingUp,
                            color: "text-indigo-400"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className={`p-8 rounded-full bg-white/5 border border-white/10 ${item.color} shadow-2xl`}>
                                <item.icon size={48} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-4xl font-bold mb-6 font-sans">{item.title}</h2>
                                <p className="text-xl text-zinc-400 leading-loose">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center bg-zinc-900 border-t border-white/10">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-8">Join the Movement</h2>
                    <p className="text-zinc-400 mb-12 text-lg">Secure your legacy. Optimize your impact. Become Professional.</p>
                    <Link href="/generators">
                        <button className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30 flex items-center gap-3 mx-auto">
                            Launch Protocols <ArrowRight />
                        </button>
                    </Link>
                </div>
            </section>

        </main>
    );
}
