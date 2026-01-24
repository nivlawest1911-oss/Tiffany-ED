'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Video, Play
} from 'lucide-react';
import LiveAvatarChat from './LiveAvatarChat';
import { CORE_AVATARS } from '@/data/avatars';
import HumanAvatar from './ui/HumanAvatar';

// Comprehensive AI Avatar Team
const AI_AVATARS = CORE_AVATARS;

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
                        The Professional <span className="text-zinc-600 not-italic">Team.</span>
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
                            transition={{ delay: (index + 1) * 0.05 }}
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
                                    <div className="flex items-center gap-2 px-2 py-1 bg-green-950/30 rounded-full border border-green-900/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>

                                {/* Main Avatar UI */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-24 h-24 mb-6 group-hover:scale-105 transition-transform duration-500">
                                        <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#00d2ff]/50 transition-all duration-500" />
                                        {/* Holographic Ring */}
                                        <div className="absolute -inset-2 rounded-full border border-dashed border-white/10 group-hover:border-[#00d2ff]/30 group-hover:rotate-180 transition-all duration-[3000ms]" />

                                        <div className="relative w-full h-full rounded-full overflow-hidden">
                                            <HumanAvatar
                                                src={avatar.avatar}
                                                alt={avatar.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                            {/* Scanline Overlay */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                                            {/* Live Tag */}
                                            <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-black text-[#00d2ff] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                LIVE
                                            </div>
                                        </div>
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
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => startConversation(avatar)}
                                        className="h-10 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105"
                                    >
                                        Start Chat
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Secure Video Archives Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 p-8 md:p-12"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Secure Video Archives</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            <Video size={14} />
                            <span>Encrypted Vault</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Strategic Protocol Alpha", duration: "12:04", color: "bg-amber-600", date: "Yesterday", locked: false },
                            { title: "District Crisis Management", duration: "08:30", color: "bg-red-600", date: "2 days ago", locked: false },
                            { title: "Fiscal Growth Vectors", duration: "15:45", color: "bg-emerald-600", date: "3 days ago", locked: false },
                            { title: "Community Synergy", duration: "09:20", color: "bg-indigo-600", date: "1 week ago", locked: true },
                            { title: "Compliance Audit Walkthrough", duration: "12:44", color: "bg-emerald-500", date: "Yesterday", locked: false },
                            { title: "Strategic Board Protocol", duration: "45:10", color: "bg-indigo-500", date: "2 days ago", locked: true },
                            { title: "Fiscal Solvency Review", duration: "30:00", color: "bg-amber-500", date: "1 week ago", locked: false },
                            { title: "Crisis Communication Drill", duration: "08:15", color: "bg-rose-500", date: "1 month ago", locked: false }
                        ].map((video, i) => (
                            <div key={i} className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer">
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4`}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-2 h-2 rounded-full ${video.color}`} />
                                            <span className="text-[10px] font-bold text-white/70 tracking-wider">RESTRICTED</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">{video.title}</h4>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/80">
                                    {video.duration}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                                        <Play size={16} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    {['BIP COMPLIANT', 'IEP DATA SECURED', 'STANDARDS MAPPED', 'EXECUTIVE AUTHORIZED'].map((label, i) => (
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
                                    {selectedAvatar.video ? (
                                        <video
                                            src={selectedAvatar.video}
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                    ) : (
                                        <HumanAvatar
                                            src={selectedAvatar.avatar}
                                            alt={selectedAvatar.name}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
                                </div>

                                <div className="p-12 md:p-20 flex flex-col justify-center">
                                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">{selectedAvatar.name}</h3>
                                    <p className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em] mb-8">{selectedAvatar.role}</p>

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
                    avatarVoice={activeAvatar.voiceId || ''}
                    avatarImage={activeAvatar.avatar}
                    heygenId={activeAvatar.heygenId}
                    tokensRemaining={10}
                    onDeductTokens={() => { }}
                    onRecharge={() => { }}
                    onAddXP={() => { }}
                    onClose={() => setShowLiveChat(false)}
                />
            )}
        </div>
    );
}
