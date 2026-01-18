'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Briefcase, GraduationCap, Brain, Heart, Target,
    Sparkles, Video, Mic, MessageSquare, Play, Phone, Star, Scale
} from 'lucide-react';
import LiveAvatarChat from './LiveAvatarChat';

// Comprehensive AI Avatar Team
const AI_AVATARS = [
    {
        id: 1,
        name: 'Dr. Alvin West',
        role: 'Executive Principal & Founder',
        specialty: 'Strategic Leadership & District Sovereignty',
        avatar: '/images/dr_alvin_west.png',
        video: '/videos/dr_alvin_talking.mp4',
        voice: '/voice-profiles/principal_voice.mp3',
        color: 'from-indigo-600 to-purple-800',
        icon: Briefcase,
        description: 'Global authority in educational leadership and district-wide strategic optimization. Dr. West specializes in leveraging neural analytics to recover instructional capital.',
        achievements: ['DBA in Educational Finance', '20+ Years Strategic Lead', '142 Districts Served'],
    },
    {
        id: 7,
        name: 'Dr. Isaiah Vance',
        role: 'Associate Superintendent',
        specialty: 'Policy Architecture & Governance',
        avatar: '/images/dr_isaiah_vance_avatar_1768666794472.png',
        video: '/videos/dr_alvin_talking.mp4',
        voice: '/voice-profiles/principal_voice.mp3',
        color: 'from-zinc-600 to-zinc-900',
        icon: Scale,
        description: 'Elite policy architect focused on district governance and legislative compliance. Dr. Vance ensures every administrative move is legally robust and aligned with national standards.',
        achievements: ['Ed.D Policy & Law', 'State Governance Lead', '400+ Policies Authored'],
    },
    {
        id: 8,
        name: 'Keisha Reynolds',
        role: 'Secondary Principal',
        specialty: 'Instructional Leadership & Culture',
        avatar: '/images/keisha_reynolds_avatar_1768666809673.png',
        video: '/videos/sarah_talking.mp4',
        voice: '/voice-profiles/compliance_voice.wav',
        color: 'from-emerald-600 to-emerald-900',
        icon: GraduationCap,
        description: 'Strategic lead for secondary school culture and teacher efficacy. Keisha specializes in high-stakes instructional coaching and building resilient school communities.',
        achievements: ['M.Ed School Leadership', 'National Principal Finalist', '15+ Years Mastery'],
    },
    {
        id: 5,
        name: 'Andre Patterson',
        role: 'Behavior Intervention Lead',
        specialty: 'PBIS & Tiered Support',
        avatar: '/images/andre_patterson_avatar_premium_v2_1768666848273.png',
        video: '/videos/james_talking.mp4',
        voice: '/voice-profiles/principal_voice.mp3',
        color: 'from-orange-600 to-red-800',
        icon: Target,
        description: 'Strategic lead for positive behavior environments. Andre develops functional behavior assessments that transform school climate and increase student retention.',
        achievements: ['Expert PBIS Trainer', 'FBA Specialist', '200+ Schools Transformed'],
    },
    {
        id: 6,
        name: 'Dr. Emily Robinson',
        role: 'Literacy & Data Scientist',
        specialty: 'Literacy Optimization',
        avatar: '/images/dr_emily_robinson_avatar_diverse_1768666864625.png',
        video: '/videos/emily_talking.mp4',
        voice: '/voice-profiles/counselor_voice.wav',
        color: 'from-violet-600 to-purple-800',
        icon: Sparkles,
        description: 'Synthesis lead for literacy and performance analytics. Dr. Robinson bridges the gap between raw reading scores and actionable classroom intervention strategies.',
        achievements: ['PhD English Education', 'Data Science Specialist', 'Literacy Grant Lead'],
    },
    {
        id: 4,
        name: 'Dr. Maya Washington',
        role: 'Special Education Architect',
        specialty: 'IEP Development & Compliance',
        avatar: '/images/avatars/iep_architect.png',
        video: '/videos/maya_talking.mp4',
        voice: '/voice-profiles/compliance_voice.wav',
        color: 'from-pink-600 to-rose-800',
        icon: Heart,
        description: 'Elite specialist in IDEA compliance and inclusive behavioral engineering. Dr. Washington ensures every learner has a legally robust and data-backed success path.',
        achievements: ['BCBA-D Certified', 'PhD Behavioral Science', '5000+ IEP Audits'],
    },
];

export default function AIAvatarGallery() {
    const [selectedAvatar, setSelectedAvatar] = useState<typeof AI_AVATARS[0] | null>(null);
    const [showLiveChat, setShowLiveChat] = useState(false);
    const [activeAvatar, setActiveAvatar] = useState<typeof AI_AVATARS[0] | null>(null);

    const startConversation = (avatar: typeof AI_AVATARS[0]) => {
        setActiveAvatar(avatar);
        setShowLiveChat(true);
    };

    return (
        <div className="relative py-32 bg-[#050505] overflow-hidden border-y border-white/5">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                        <User size={12} />
                        <span>Executive Intelligence Assets</span>
                    </div>
                    <h2 className="text-4xl sm:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
                        The Sovereign <span className="text-zinc-600 not-italic">Team.</span>
                    </h2>
                    <p className="text-base text-zinc-500 max-w-2xl mx-auto font-medium">
                        Six specialized nodes of high-fidelity synthetic intelligence. <br className="hidden md:block" />
                        Accessible instantly for strategic leadership and administrative throughput.
                    </p>
                </motion.div>

                {/* Avatar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {AI_AVATARS.map((avatar, index) => (
                        <motion.div
                            key={avatar.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative"
                        >
                            <div className="relative h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black">
                                {/* Subtle Glow */}
                                <div className={`absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br ${avatar.color} opacity-0 group-hover:opacity-10 blur-[64px] transition-opacity duration-700`} />

                                {/* Header with Icon */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors`}>
                                        <avatar.icon size={20} />
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                </div>

                                {/* Main Avatar UI */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-24 h-24 mb-6">
                                        <div className="absolute inset-0 rounded-full border border-white/10 group-hover:scale-110 group-hover:border-white/30 transition-all duration-500" />
                                        <img
                                            src={avatar.avatar}
                                            alt={avatar.name}
                                            className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>

                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{avatar.name}</h3>
                                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">{avatar.role}</p>

                                    <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8">
                                        {avatar.description}
                                    </p>
                                </div>

                                {/* Achievements & Expertise */}
                                <div className="space-y-3 mb-10">
                                    {avatar.achievements.slice(0, 2).map((achievement, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                                            <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                            <span>{achievement}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Matrix */}
                                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                                    <button
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className="h-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all"
                                    >
                                        Inspect
                                    </button>
                                    <button
                                        onClick={() => startConversation(avatar)}
                                        className="h-10 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105"
                                    >
                                        Engage
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    {['BIP COMPLIANT', 'IEP DATA SECURED', 'ALCOS STANDARDS MAPPED', 'EXECUTIVE AUTHORIZED'].map((label, i) => (
                        <div key={i} className="text-[10px] font-black tracking-[0.4em] text-white">
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Inspect Modal */}
            <AnimatePresence>
                {selectedAvatar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedAvatar(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative max-w-5xl w-full bg-zinc-950 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-square lg:aspect-auto bg-black border-r border-white/5">
                                    <video
                                        src={selectedAvatar.video}
                                        autoPlay
                                        loop
                                        muted
                                        className="w-full h-full object-cover opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
                                </div>

                                <div className="p-12 md:p-20 flex flex-col justify-center">
                                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">{selectedAvatar.name}</h3>
                                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mb-8">{selectedAvatar.role}</p>

                                    <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-12">
                                        {selectedAvatar.description}
                                    </p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                setSelectedAvatar(null);
                                                startConversation(selectedAvatar);
                                            }}
                                            className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                                        >
                                            Engage Virtual Presence
                                        </button>
                                        <button
                                            onClick={() => setSelectedAvatar(null)}
                                            className="px-6 py-5 bg-white/5 text-white/50 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Live Chat System */}
            {showLiveChat && activeAvatar && (
                <LiveAvatarChat
                    avatarName={activeAvatar.name}
                    avatarRole={activeAvatar.role}
                    avatarVideo={activeAvatar.video}
                    avatarVoice={activeAvatar.voice}
                    avatarImage={activeAvatar.avatar}
                    onClose={() => setShowLiveChat(false)}
                />
            )}
        </div>
    );
}
