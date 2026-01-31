'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video, Play, Shield, Zap, Lock, Eye, Star
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
        <div className="relative py-32 bg-black overflow-hidden border-y border-white/5">
            {/* Minimalist Grid Background - Sovereign Style */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0,transparent_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        <Lock size={12} />
                        <span>Executive Intelligence Assets</span>
                    </div>
                    <h2 className="text-5xl sm:text-8xl font-black text-white mb-8 uppercase tracking-tighter italic">
                        Strategic <span className="gold-gradient-text not-italic font-black">Delegates.</span>
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
                        The Professional AI Team. Six specialized nodes of high-fidelity synthetic intelligence, architected for strategic leadership throughput.
                    </p>
                </motion.div>

                {/* Avatar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {AI_AVATARS.map((avatar, index) => {
                        const IconComponent = avatar.icon;
                        return (
                            <motion.div
                                key={avatar.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative h-full liquid-glass border-white/10 p-10 hover:border-noble-gold/40 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] group-hover:-translate-y-2">
                                    {/* Noble Glow */}
                                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-noble-gold opacity-0 group-hover:opacity-10 blur-[96px] transition-opacity duration-1000" />

                                    {/* Header with Icon */}
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white/40 group-hover:text-noble-gold group-hover:border-noble-gold/30 transition-all">
                                            {IconComponent ? <IconComponent size={22} /> : <div className="w-[22px] h-[22px] bg-noble-gold/20 rounded-full" />}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950/20 rounded-full border border-emerald-500/30">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Quantum-Active</span>
                                        </div>
                                    </div>

                                    {/* Main Avatar UI */}
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative w-32 h-32 mb-8 group-hover:scale-110 transition-transform duration-700 ease-out">
                                            <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-noble-gold/50 transition-all duration-700" />

                                            {/* Holographic Spinning Rings */}
                                            <div className="absolute -inset-2 rounded-full border border-dashed border-white/5 group-hover:border-noble-gold/30 group-hover:rotate-180 transition-all duration-[6000ms]" />
                                            <div className="absolute -inset-4 rounded-full border border-dotted border-white/5 group-hover:border-noble-gold/10 group-hover:-rotate-180 transition-all duration-[8000ms]" />

                                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-transparent group-hover:border-noble-gold/20">
                                                <HumanAvatar
                                                    src={avatar.avatar || '/images/placeholders/avatar.png'}
                                                    alt={avatar.name || 'AI Delegate'}
                                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                                />
                                                {/* Scanning Line Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute bottom-2 left-0 right-0 h-[10%] bg-noble-gold/20 blur-md opacity-0 group-hover:opacity-100 animate-scanline" />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1 italic group-hover:gold-gradient-text transition-all">{avatar.name}</h3>
                                        <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{avatar.role}</p>

                                        <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-10 group-hover:text-zinc-300 transition-colors">
                                            {avatar.description}
                                        </p>
                                    </div>

                                    {/* Achievements & Expertise */}
                                    <div className="space-y-4 mb-12">
                                        {avatar.achievements.slice(0, 2).map((achievement, i) => (
                                            <div key={i} className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono italic">
                                                <div className="w-1.5 h-1.5 rounded-full bg-noble-gold/20 group-hover:bg-noble-gold transition-colors" />
                                                <span className="group-hover:text-white/60 transition-colors">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Matrix */}
                                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                                        <button
                                            onClick={() => setSelectedAvatar(avatar)}
                                            title={`View ${avatar.name} Profile`}
                                            className="h-12 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                                        >
                                            <Eye size={14} />
                                            Protocol
                                        </button>
                                        <button
                                            onClick={() => startConversation(avatar)}
                                            title={`Start chat with ${avatar.name}`}
                                            className="h-12 rounded-xl bg-noble-gold text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.05] shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2"
                                        >
                                            <Zap size={14} fill="currentColor" />
                                            Initialize
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Secure Video Archives Section - Refined for Sovereign OS */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 p-12 liquid-glass border-white/5 bg-white/[0.01]"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Video className="text-noble-gold" size={20} />
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Intelligence <span className="text-zinc-600">Archives.</span></h3>
                            </div>
                            <p className="text-sm text-zinc-500 font-medium italic">Encrypted situational briefings and performance audits.</p>
                        </div>
                        <button
                            title="Expand video archives"
                            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all"
                        >
                            Access Full Vault
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Strategic Protocol Alpha", duration: "12:04", color: "bg-noble-gold" },
                            { title: "District Crisis Management", duration: "08:30", color: "bg-rose-600" },
                            { title: "Fiscal Growth Vectors", duration: "15:45", color: "bg-emerald-600" },
                            { title: "Compliance Audit Walkthrough", duration: "12:44", color: "bg-noble-gold" }
                        ].map((video, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="group relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 hover:border-noble-gold/40 transition-all cursor-pointer shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all">
                                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                                        <Play size={20} fill="white" className="ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-5 right-5 z-20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${video.color} shadow-[0_0_8px_currentColor]`} />
                                        <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em]">Classified // E3</span>
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase tracking-tight italic group-hover:text-noble-gold transition-colors">{video.title}</h4>
                                </div>
                                <div className="absolute top-4 right-4 z-20 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/80">
                                    {video.duration}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-16 opacity-10 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                    {['BIP COMPLIANT', 'IEP DATA SECURED', 'STANDARDS MAPPED', 'EXECUTIVE AUTHORIZED'].map((label, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Shield size={14} className="text-noble-gold" />
                            <span className="text-[10px] font-black tracking-[0.5em] text-white underline decoration-noble-gold/30 underline-offset-8 decoration-2">{label}</span>
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
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl"
                        onClick={() => setSelectedAvatar(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            className="relative max-w-6xl w-full liquid-glass border-noble-gold/20 flex flex-col lg:flex-row overflow-hidden shadow-[0_0_150px_rgba(212,175,55,0.1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="lg:w-1/2 relative bg-black border-r border-white/5">
                                {selectedAvatar.video ? (
                                    <video
                                        src={selectedAvatar.video}
                                        autoPlay
                                        loop
                                        muted
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                ) : (
                                    <HumanAvatar
                                        src={selectedAvatar.avatar || ''}
                                        alt={selectedAvatar.name || ''}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
                                <div className="absolute top-10 left-10 p-6 liquid-glass border-noble-gold/30 bg-black/40">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Zap size={16} className="text-noble-gold" />
                                        <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.5em]">System Diagnostics</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-mono text-white/50 lowercase italic">Neural Fidelity: 99.8%</p>
                                        <p className="text-[9px] font-mono text-white/50 lowercase italic">Latency Bias: -12ms</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-16 md:p-24 lg:w-1/2 flex flex-col justify-center bg-zinc-950/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <Star className="text-noble-gold" size={16} fill="currentColor" />
                                    <span className="text-[11px] font-black text-noble-gold uppercase tracking-[0.4em]">Elite Intelligent Asset</span>
                                </div>
                                <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 italic leading-none">{selectedAvatar.name}</h3>
                                <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.5em] mb-10 border-l-2 border-noble-gold pl-6">{selectedAvatar.role}</p>

                                <div className="space-y-8 mb-16">
                                    <p className="text-xl text-zinc-400 leading-relaxed font-medium italic">
                                        {selectedAvatar.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedAvatar.achievements.map((a, i) => (
                                            <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-white/60 uppercase tracking-widest italic">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <button
                                        onClick={() => {
                                            setSelectedAvatar(null);
                                            startConversation(selectedAvatar);
                                        }}
                                        title="Establish connection"
                                        className="px-12 py-6 bg-noble-gold text-black text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.05] transition-transform shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)]"
                                    >
                                        Establish Neural Uplink
                                    </button>
                                    <button
                                        onClick={() => setSelectedAvatar(null)}
                                        title="Close profile"
                                        className="px-8 py-6 liquid-glass border-white/10 text-white/40 text-xs font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
                                    >
                                        Close Terminal
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Live Chat System */}
            {showLiveChat && activeAvatar && (
                <LiveAvatarChat
                    avatarName={activeAvatar.name || 'AI Delegate'}
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

            <style jsx global>{`
                .gold-gradient-text {
                    background: linear-gradient(135deg, #FFF 0%, #D4AF37 50%, #8A6D3B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(1000%); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
