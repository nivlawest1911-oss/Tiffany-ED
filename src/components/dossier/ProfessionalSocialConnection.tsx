'use client';

import { Link as LinkIcon, Users, MapPin, Briefcase, GraduationCap, Video, Shield as LucideShield, ExternalLink } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { SOCIAL_HUB_BANNER, SOCIAL_HUB_AVATAR, SOCIAL_HUB_TIKTOK, SOCIAL_HUB_FACEBOOK } from '@/lib/assets';

export default function ProfessionalSocialConnection() {
    return (
        <div className="w-full max-w-4xl mx-auto p-1 bg-gradient-to-br from-amber-900/40 to-zinc-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-600/5 blur-[100px] group-hover:bg-amber-600/10 transition-colors duration-1000" />

            <div className="relative bg-zinc-950 rounded-[2.4rem] overflow-hidden">
                <div
                    className="h-48 w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url('${SOCIAL_HUB_BANNER}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
                    <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-amber-600/90 backdrop-blur-md text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                        <LucideShield size={14} fill="currentColor" /> EdIntel Community Online
                    </div>
                </div>

                <div className="px-8 pb-8 relative z-10 -mt-20">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-amber-500 to-yellow-600 shadow-2xl relative">
                                <Image
                                    src={SOCIAL_HUB_AVATAR}
                                    alt="EdIntel — Intelligence in Education"
                                    fill
                                    className="rounded-full object-cover border-4 border-zinc-950"
                                    priority
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 w-8 h-8 bg-amber-500 rounded-full border-4 border-zinc-950 flex items-center justify-center text-black" title="Verified Platform">
                                <LucideShield size={14} fill="currentColor" />
                            </div>
                        </div>

                        <div className="flex-1 mt-12 md:mt-20 space-y-4">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                    EdIntel
                                    <span className="px-3 py-1 rounded-lg bg-zinc-800 text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">Intelligence in Education</span>
                                </h2>
                                <p className="text-zinc-400 font-medium mt-1 max-w-xl">
                                    Sovereign AI for educators and district leaders. ALCOS-aligned curriculum, FERPA-safe workflows, and Antigravity automation for Mobile County and Alabama K-12.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Briefcase size={16} className="text-amber-500" />
                                        <span>Platform: <span className="text-white font-bold">EdIntel Sovereign OS</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <GraduationCap size={16} className="text-amber-500" />
                                        <span>Standards: <span className="text-white font-bold">Alabama Course of Study</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <MapPin size={16} className="text-amber-500" />
                                        <span>Based in <span className="text-white font-bold">Mobile, Alabama</span></span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Users size={16} className="text-amber-500" />
                                        <span><span className="text-white font-bold">Educators</span> statewide</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <LinkIcon size={16} className="text-amber-500" />
                                        <a href="https://edintelai.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                                            edintelai.vercel.app <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-zinc-900">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Video size={14} /> Professional Media Channels
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-600">Active Community</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="https://www.tiktok.com/@alvinwestii" target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 hover:border-pink-500 transition-all cursor-pointer">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"
                                    style={{ backgroundImage: `url('${SOCIAL_HUB_TIKTOK}')` }}
                                />
                                <div className="absolute flex flex-col justify-end inset-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded bg-black/50 border border-pink-500/50 text-pink-400 text-[9px] font-black uppercase tracking-wider backdrop-blur-md">TikTok</span>
                                    </div>
                                    <p className="text-sm font-bold text-white leading-tight">EdIntel Leadership Stream</p>
                                </div>
                            </a>
                            <a href="https://www.youtube.com/@EdIntel" target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 hover:border-red-600 transition-all cursor-pointer">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"
                                    style={{ backgroundImage: `url('${SOCIAL_HUB_FACEBOOK}')` }}
                                />
                                <div className="absolute flex flex-col justify-end inset-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded bg-red-600 text-[9px] font-bold text-white uppercase">YouTube</span>
                                    </div>
                                    <p className="text-sm font-bold text-white leading-tight">EdIntel Professional Channel</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <a href="https://edintelai.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest shadow-lg shadow-amber-900/20 transition-all">
                            Enter Platform <Users size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
