'use client';

import { Play, Heart, MessageCircle, Share2, Radio, Signal, Wifi, Disc, Video, ExternalLink } from 'lucide-react';
import React from 'react';

export default function SovereignBroadcastNode() {
    const recentBroadcasts = [
        {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
            views: "2.5k",
            desc: "Teacher Burnout Protocols // Mental Resilience",
            duration: "0:59"
        },
        {
            id: 2,
            thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
            views: "1.2k",
            desc: "Holistic Synergy: Mind, Academia, Finance",
            duration: "1:15"
        },
        {
            id: 3,
            thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            views: "3.4k",
            desc: "Neural Uplink: Community Milestones",
            duration: "0:15"
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-1 bg-gradient-to-br from-purple-900 to-zinc-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Background FX */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 border border-white/5">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-[1px] shadow-lg shadow-purple-900/40">
                            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                <Radio size={24} className="text-white animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                                Neural <span className="text-purple-500">Broadcast</span>
                                <span className="px-2 py-0.5 rounded text-[9px] bg-red-600 text-white animate-pulse">LIVE</span>
                            </h2>
                            <p className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                                <Signal size={10} className="text-green-500" /> Signal Strength: Strong (576 Nodes)
                            </p>
                        </div>
                    </div>

                    <a href="https://www.tiktok.com/@alvinwest0" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-zinc-700">
                        @alvinwest0 <ExternalLink size={10} />
                    </a>
                </div>

                {/* Identity Block */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">Architect's Daily Transmission</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-purple-500 pl-4 py-1 mb-4">
                            "Transcend Holistic Wellness synergizes the mind, academia, and finances."
                        </p>

                        <div className="flex gap-4">
                            <div className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <span className="block text-2xl font-black text-white">5.2K</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Resonance</span>
                            </div>
                            <div className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <span className="block text-2xl font-black text-white">576</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Subscribers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feed Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recentBroadcasts.map((video) => (
                        <div key={video.id} className="group/card relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-purple-500 transition-all cursor-pointer shadow-xl">
                            <img src={video.thumbnail} alt={video.desc} className="w-full h-full object-cover opacity-60 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-700" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <Play size={20} className="text-white fill-white ml-1" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <span className="inline-block px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white mb-2 border border-white/10">
                                    {video.views} Views
                                </span>
                                <p className="text-xs font-bold text-white leading-tight line-clamp-2 mb-2">
                                    {video.desc}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center animate-spin-slow">
                                        <Disc size={12} className="text-white" />
                                    </div>
                                    <div className="h-0.5 flex-1 bg-zinc-700/50 overflow-hidden rounded-full">
                                        <div className="h-full w-2/3 bg-purple-500 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <a href="https://www.tiktok.com/@alvinwest0" target="_blank" className="flex items-center gap-2 group text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                        Tune In To Global Frequency <Share2 size={12} className="group-hover:text-purple-500 transition-colors" />
                    </a>
                </div>
            </div>
        </div>
    );
}
