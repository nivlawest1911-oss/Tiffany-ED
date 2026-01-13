
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import VoiceIdentityComponent from '@/components/VoiceIdentity';
import useSovereignSounds from '@/hooks/useSovereignSounds';
import { ArrowRight, Shield, Award, Users, Brain } from 'lucide-react';
import Link from 'next/link';

export default function IdentityPage() {
    const { playHover, playClick } = useSovereignSounds();

    const team = [
        {
            name: "Dr. Alvin West",
            role: "Sovereign Principal & Architect",
            image: "/images/dr_alvin_west.png",
            voice: "/voice-profiles/principal_voice.wav",
            bio: "Visionary leader dedicated to empowering educators through sovereign intelligence.",
            color: "from-indigo-500 to-purple-600"
        },
        {
            name: "The Counselor",
            role: "Student Wellbeing Specialist",
            image: "/images/avatars/counselor.png", // distinct avatar if avail, using generic fallback logic visually
            voice: "/voice-profiles/counselor_voice.wav",
            bio: "Expert in social-emotional learning and behavioral intervention strategies.",
            color: "from-teal-400 to-emerald-600"
        },
        {
            name: "The Analyst",
            role: "Data Systems Commander",
            image: "/images/avatars/analyst.png",
            voice: "/voice-profiles/data_voice.wav",
            bio: "Decrypting complex educational metrics to drive actionable insights.",
            color: "from-blue-500 to-cyan-500"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-indigo-500/30">
            <FloatingNavbar />

            {/* Hero Section with Video Background */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <video
                        src="/videos/features/iep-architect-demo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                    >
                        <Shield className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium text-indigo-200">The Sovereign Council</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6 tracking-tight"
                    >
                        Architects of Intelligence
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Meet the specialized AI personas and human visionaries dedicated to reclaiming educational sovereignty.
                    </motion.p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                            onMouseEnter={playHover}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />

                            <div className="relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300">
                                <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full flex items-center justify-center">
                                        <Award className="w-8 h-8 text-white/20" />
                                    </div>
                                </div>

                                <div className="mb-8 relative">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white/10 group-hover:ring-white/30 transition-all">
                                        {/* Fallback image logic or real image */}
                                        <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                                            <Users className="w-12 h-12 text-white/50" />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-4 -right-4">
                                        <VoiceIdentityComponent src={member.voice} label="Voice Uplink" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4 uppercase tracking-wider`}>
                                    {member.role}
                                </p>
                                <p className="text-zinc-400 leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-zinc-900/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16">The Sovereign Code</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Privacy First", desc: "FERPA, COPPA, and CSPC compliant by design.", icon: Shield },
                            { title: "Empowerment", desc: "Tools that amplify human capability, not replace it.", icon: Award },
                            { title: "Innovation", desc: "Cutting-edge AI tailored for the classroom.", icon: Brain }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                                <item.icon className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-zinc-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
