'use client';

import { 
    Globe as Linkedin, 
    Share2, 
    GraduationCap, 
    Award, 
    ChevronRight,
    Shield
} from 'lucide-react';
import { SOCIAL_HUB_AVATAR } from '@/lib/assets';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/Cinematic';
import ProfileShareModal from '@/components/modals/ProfileShareModal';
import { useState } from 'react';

export default function ProfileIdentity() {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    return (
        <div className="group relative">
            <GlassCard className="p-8 border-white/10 overflow-hidden relative">
                {/* Ambient Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/20 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                        <div className="flex gap-6">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-zinc-700 shadow-xl relative group-hover:border-cyan-500 transition-colors shrink-0">
                                <Image
                                    src={SOCIAL_HUB_AVATAR}
                                    alt="Dr. Alvin West II, DBA"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                    Dr. Alvin West II <span className="text-cyan-500 text-sm align-top font-bold">DBA</span>
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50" title="Verified Executive">
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                                    </div>
                                </h2>
                                <p className="text-sm font-mono text-zinc-400 mt-1 uppercase tracking-wider italic">Chief AI Architect & Strategic Superintendent</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['Outlier AI', 'Transcend Wellness', 'FUSE Coordinator', 'Certified Editor'].map(role => (
                                        <span key={role} className="px-2 py-0.5 rounded bg-blue-900/20 text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-800/30">{role}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 self-end md:self-start">
                            <a 
                                href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:border-white/20 transition-all shadow-lg"
                                title="LinkedIn Profile"
                            >
                                <Linkedin size={18} />
                            </a>
                            <button 
                                onClick={() => setIsShareModalOpen(true)}
                                className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-lg"
                                title="Share Professional Identity"
                            >
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Education Section */}
                        <div className="p-5 rounded-3xl bg-zinc-900/50 border border-white/5">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <GraduationCap size={12} className="text-indigo-500" /> Confirmed Academics
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-zinc-200 font-black">Doctor of Business Administration (DBA) - Finance</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">Residencies: Tampa, Orlando, Atlanta. Research: IRB, BCI/AI Twin Protocols.</p>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div>
                                    <p className="text-xs text-zinc-300 font-bold">Master of Business Administration (MBA)</p>
                                    <p className="text-[10px] text-zinc-500 mt-1">Specialization in Corporate Finance & Strategic Leadership.</p>
                                </div>
                            </div>
                        </div>

                        {/* Matrices */}
                        <div className="space-y-4">
                            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-white/5">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <Shield size={12} className="text-cyan-500" /> Teaching Matrix
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Special Ed', 'Gifted', 'Math', 'Biology', 'Business'].map(subject => (
                                        <span key={subject} className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] rounded-lg font-bold border border-indigo-500/20">{subject}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-white/5">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <Award size={12} className="text-intel-gold" /> Leadership
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                                    <div className="flex items-center gap-2">Chair: Special Programs</div>
                                    <div className="flex items-center gap-2">Chair: Mathematics</div>
                                    <div className="flex items-center gap-2">FUSE Coordinator</div>
                                    <div className="flex items-center gap-2">Director of AI Ops</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Sovereign ID // 11A75323</p>
                        </div>
                        <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest flex items-center gap-2 group/dossier">
                            View Verified Dossier <ChevronRight size={14} className="group-hover/dossier:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </GlassCard>

            <ProfileShareModal 
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                context="DOSSIER"
                userName="Dr. Alvin West II"
            />
        </div>
    );
}
