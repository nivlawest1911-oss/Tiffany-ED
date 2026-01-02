'use client';

import { Facebook, Link as LinkIcon, Users, MapPin, Briefcase, GraduationCap, Video, Calendar, Shield, ExternalLink } from 'lucide-react';
import React from 'react';

export default function SovereignSocialUplink() {
    return (
        <div className="w-full max-w-4xl mx-auto p-1 bg-gradient-to-br from-blue-900 to-zinc-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Ambient Social Glow */}
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] group-hover:bg-blue-600/10 transition-colors duration-1000" />

            <div className="relative bg-zinc-950 rounded-[2.4rem] overflow-hidden">
                {/* Banner - "Neural Pathway" Aesthetic */}
                <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
                    <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                        <Facebook size={14} fill="currentColor" /> Social Uplink Active
                    </div>
                </div>

                <div className="px-8 pb-8 relative z-10 -mt-20">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Profile Picture Node */}
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-blue-500 to-amber-500 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
                                    alt="Sovereign Architect"
                                    className="w-full h-full rounded-full object-cover border-4 border-zinc-950"
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full border-4 border-zinc-950 flex items-center justify-center text-white" title="Verified Creator">
                                <Shield size={14} fill="currentColor" />
                            </div>
                        </div>

                        {/* Identity Data */}
                        <div className="flex-1 mt-12 md:mt-20 space-y-4">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                    Alvin West Jr.
                                    <span className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">Digital Creator</span>
                                </h2>
                                <p className="text-zinc-400 font-medium mt-1 max-w-xl">
                                    Director of Transcend Academic, Business & Cognitive Solutions. Bridging the gap between neural architecture and holistic community wellness.
                                </p>
                            </div>

                            {/* Meta Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Briefcase size={16} className="text-amber-600" />
                                        <span>Director at <span className="text-white font-bold">Transcend Academic</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <GraduationCap size={16} className="text-amber-600" />
                                        <span>Studies at <span className="text-white font-bold">Walden University</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <MapPin size={16} className="text-amber-600" />
                                        <span>Lives in <span className="text-white font-bold">Mobile, Alabama</span></span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Users size={16} className="text-blue-500" />
                                        <span><span className="text-white font-bold">5.1K</span> Community Nodes</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <LinkIcon size={16} className="text-blue-500" />
                                        <a href="https://www.facebook.com/alvin.west.18" target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                                            facebook.com/alvin.west.18 <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Stream Preview */}
                    <div className="mt-10 pt-8 border-t border-zinc-900">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Video size={14} /> Neural Broadcast Nodes
                            </h3>
                            <span className="text-[10px] font-mono text-zinc-600">Sync Rate: 98%</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="https://www.tiktok.com/@alvinwestii" target="_blank" className="group relative aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 hover:border-pink-500 transition-all cursor-pointer">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" />
                                <div className="absolute flex flex-col justify-end inset-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded bg-black/50 border border-pink-500/50 text-pink-400 text-[9px] font-black uppercase tracking-wider backdrop-blur-md">TikTok Signal</span>
                                    </div>
                                    <p className="text-sm font-bold text-white leading-tight">@alvinwestii • Visual Intelligence Stream</p>
                                </div>
                            </a>
                            <a href="https://www.facebook.com/alvin.west.18" target="_blank" className="group relative aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 hover:border-blue-600 transition-all cursor-pointer">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" />
                                <div className="absolute flex flex-col justify-end inset-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded bg-blue-600 text-[9px] font-bold text-white uppercase">Facebook Uplink</span>
                                    </div>
                                    <p className="text-sm font-bold text-white leading-tight">Transcend Holistic Wellness Community</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Connection Action */}
                    <div className="mt-8 flex justify-end">
                        <a href="https://www.facebook.com/alvin.west.18" target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all">
                            Establish Connection <Users size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
