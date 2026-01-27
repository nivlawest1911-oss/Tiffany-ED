'use client';

import { Play, Share2, Radio, Signal, Disc, ExternalLink } from 'lucide-react';
import { CARBON_FIBRE_BG } from '@/lib/constants';
import React from 'react';
import { BROADCAST_THUMB_1, BROADCAST_THUMB_2, BROADCAST_THUMB_3 } from '@/lib/images';

export default function LeadershipStream() {
    const recentBroadcasts = [
        {
            id: 1,
            thumbnail: BROADCAST_THUMB_1,
            views: "2.5k",
            desc: "Teacher Burnout Tools // Mental Resilience",
            duration: "0:59"
        },
        {
            id: 2,
            thumbnail: BROADCAST_THUMB_2,
            views: "1.2k",
            desc: "Holistic Synergy: Mind, Academia, Finance",
            duration: "1:15"
        },
        {
            id: 3,
            thumbnail: BROADCAST_THUMB_3,
            views: "3.4k",
            desc: "Network Update: Community Milestones",
            duration: "0:15"
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-1 bg-gradient-to-br from-purple-900 to-zinc-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Background FX */}
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: CARBON_FIBRE_BG }}
            />
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
                                Leadership <span className="text-purple-500">Stream</span>
                                <span className="px-2 py-0.5 rounded text-[9px] bg-red-600 text-white animate-pulse">LIVE</span>
                            </h2>
                            <p className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                                <Signal size={10} className="text-green-500" /> Connection: Active
                            </p>
                        </div>
                    </div>

                    <a href="https://www.tiktok.com/@alvinwest0" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-zinc-800 transition-all border border-zinc-800 hover:border-zinc-700">
                        @alvinwest0 <ExternalLink size={10} />
                    </a>
                </div>

                {/* Profile Block */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">Director's Daily Insight</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-purple-500 pl-4 py-1 mb-4">
                            "Transcend Holistic Wellness synergizes the mind, academia, and finances."
                        </p>

                        <div className="flex gap-4">
                            <div className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <span className="block text-2xl font-black text-white">5.2K</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Views</span>
                            </div>
                            <div className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <span className="block text-2xl font-black text-white">576</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Followers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feed Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recentBroadcasts.map((video) => (
                        <a
                            key={video.id}
                            href="https://www.tiktok.com/@alvinwest0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/card relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-purple-500 transition-all cursor-pointer shadow-xl block"
                        >
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
                        </a>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <a href="https://www.tiktok.com/@alvinwest0" target="_blank" className="flex items-center gap-2 group text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                        Join the Global Community <Share2 size={12} className="group-hover:text-purple-500 transition-colors" />
                    </a>
                </div>
            </div>
        </div>
    );
}
