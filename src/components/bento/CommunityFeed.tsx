'use client';
import { useState } from 'react';
import { Image, Video, FileText, ThumbsUp, MessageSquare, Repeat, Share2, MoreHorizontal, Globe, Bookmark, Users, Calendar } from 'lucide-react';
import { useLeadershipFeed, FeedPost } from '@/hooks/useLeadershipFeed';
import { SOCIAL_HUB_AVATAR } from '@/lib/assets';

export default function CommunityFeed() {
    // Integrated Leadership Feed Hook
    const { posts: feed } = useLeadershipFeed();

    const [input, setInput] = useState('');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto py-8">
            {/* Left Sidebar: Profile Summary */}
            <div className="lg:col-span-3 space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative">
                    <div className="h-20 bg-gradient-to-r from-cyan-900 to-blue-900" />
                    <div className="px-4 pb-4 relative">
                        <img
                            src={SOCIAL_HUB_AVATAR}
                            alt="Alvin West II"
                            className="w-16 h-16 rounded-2xl border-4 border-zinc-900 absolute -top-8 object-cover shadow-xl"
                        />
                        <div className="mt-10">
                            <h3 className="text-sm font-bold text-white">Alvin West II, DBA</h3>
                            <p className="text-[10px] text-zinc-500">Educational Consultant</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Profile views</span>
                                <span className="text-cyan-500 font-bold">142</span>
                            </div>
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Post impressions</span>
                                <span className="text-cyan-500 font-bold">1.2k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors">
                        <Bookmark size={14} /> Saved Resources
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors">
                        <Users size={14} /> District Groups
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors">
                        <Calendar size={14} /> Professional Events
                    </div>
                </div>
            </div>

            {/* Middle: Activity Feed */}
            <div className="lg:col-span-6 space-y-4">
                {/* Posting Tool */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                    <div className="flex gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex-shrink-0" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Share an update with your network..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white focus:border-amber-600 outline-none transition-colors"
                        />
                    </div>
                    <div className="flex justify-between px-4 pt-2">
                        <button className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-blue-400 transition-colors">
                            <Image size={16} className="text-blue-500" /> Media
                        </button>
                        <button className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-purple-400 transition-colors">
                            <Video size={16} className="text-purple-500" /> Video
                        </button>
                        <button className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors">
                            <FileText size={16} className="text-amber-600" /> Article
                        </button>
                    </div>
                </div>

                {/* Feed Cards */}
                {feed.map((post: FeedPost) => (
                    <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="p-4 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex-shrink-0 flex items-center justify-center text-xs font-black text-zinc-500">
                                {post.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-bold text-white">{post.author}</h3>
                                        <p className="text-[10px] text-zinc-400">{post.role}</p>
                                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-0.5">
                                            <span>{post.time}</span>
                                            <span>•</span>
                                            <Globe size={10} />
                                        </div>
                                    </div>
                                    <button className="text-zinc-500 hover:text-white"><MoreHorizontal size={16} /></button>
                                </div>
                                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{post.content}</p>

                                <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-zinc-400">
                                    <button className="flex items-center gap-2 text-xs font-bold hover:bg-zinc-800 px-3 py-2 rounded-lg transition-colors">
                                        <ThumbsUp size={14} /> Like
                                    </button>
                                    <button className="flex items-center gap-2 text-xs font-bold hover:bg-zinc-800 px-3 py-2 rounded-lg transition-colors">
                                        <MessageSquare size={14} /> Comment
                                    </button>
                                    <button className="flex items-center gap-2 text-xs font-bold hover:bg-zinc-800 px-3 py-2 rounded-lg transition-colors">
                                        <Repeat size={14} /> Repost
                                    </button>
                                    <button className="flex items-center gap-2 text-xs font-bold hover:bg-zinc-800 px-3 py-2 rounded-lg transition-colors">
                                        <Share2 size={14} /> Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Sidebar: News & Insights */}
            <div className="lg:col-span-3 space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Leadership News</h3>
                        <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                    </div>
                    <ul className="space-y-4">
                        <li className="group cursor-pointer">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-white transition-colors" />
                                <p className="text-xs font-bold text-zinc-300 group-hover:text-white truncate">Professional Burnout Prevention</p>
                            </div>
                            <p className="text-[10px] text-zinc-500 pl-3.5">Education Daily • 4,102 readers</p>
                        </li>
                        <li className="group cursor-pointer">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-white transition-colors" />
                                <p className="text-xs font-bold text-zinc-300 group-hover:text-white truncate">New State Regulations</p>
                            </div>
                            <p className="text-[10px] text-zinc-500 pl-3.5">Policy Review • 2h ago</p>
                        </li>
                        <li className="group cursor-pointer">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-white transition-colors" />
                                <p className="text-xs font-bold text-zinc-300 group-hover:text-white truncate">Professional Development Grants</p>
                            </div>
                            <p className="text-[10px] text-zinc-500 pl-3.5">Career Growth • 1d ago</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

