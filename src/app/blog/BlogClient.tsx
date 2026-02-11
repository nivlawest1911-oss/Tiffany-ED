'use client';

import React from 'react';
import { BLOG_POSTS } from './posts';
import BlogPostCard from '@/components/bento/BlogPostCard';
import { Search } from 'lucide-react';
import { ParticleBackground } from "@/components/ui/Cinematic";

export default function BlogClient() {
    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-noble-gold/30 relative overflow-hidden">
            {/* EdIntel Background elements */}
            <ParticleBackground count={30} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
            </div>
            {/* Header / Hero */}
            <section className="relative pt-24 pb-12 px-6 border-b border-zinc-800 bg-zinc-900/50">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                        Technical <span className="text-noble-gold italic">Intelligence</span> Log
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Transmissions regarding Strategic Architecture, Ed-Tech Compliance, and the Professional Token Economy.
                    </p>

                    <div className="max-w-xl mx-auto relative group mt-8">
                        <input
                            type="text"
                            placeholder="Search intelligence logs..."
                            className="w-full bg-black/50 border border-zinc-800 rounded-full py-4 pl-12 pr-6 text-zinc-300 focus:border-noble-gold transition-colors outline-none backdrop-blur-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-noble-gold transition-colors" size={18} />
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Newsletter / Signal Catch */}
                <div className="mt-20 p-12 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-noble-gold/10 blur-[100px] rounded-full pointer-events-none" />

                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4 relative z-10">Subscribe to the Signal</h2>
                    <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">
                        Receive critical updates on Professional Architecture and District Integation protocols directly to your neural feed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <input
                            type="email"
                            placeholder="Enter administrative email"
                            className="px-6 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-noble-gold outline-none min-w-[300px]"
                        />
                        <button className="px-8 py-3 rounded-xl bg-noble-gold text-black font-black uppercase tracking-widest hover:bg-gold-600 transition-colors shadow-lg shadow-noble-gold/20">
                            Connect
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
