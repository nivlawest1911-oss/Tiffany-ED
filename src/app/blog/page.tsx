'use client';

import React from 'react';
import { BLOG_POSTS } from './posts';
import BlogPostCard from '@/components/bento/BlogPostCard';
import { Search } from 'lucide-react';

export default function Blog() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500/30">
            {/* Header / Hero */}
            <section className="relative pt-24 pb-12 px-6 border-b border-zinc-800 bg-zinc-900/50">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                        Sovereign <span className="text-amber-600">Intel</span> Log
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Transmissions regarding Neural Architecture, Ed-Tech Compliance, and the Sovereign Token Economy.
                    </p>

                    <div className="max-w-xl mx-auto relative group mt-8">
                        <input
                            type="text"
                            placeholder="Search intelligence logs..."
                            className="w-full bg-black/50 border border-zinc-800 rounded-full py-4 pl-12 pr-6 text-zinc-300 focus:border-amber-600 transition-colors outline-none backdrop-blur-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-600 transition-colors" size={18} />
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none" />

                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4 relative z-10">Subscribe to the Signal</h2>
                    <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">
                        Receive critical updates on Sovereign Architecture and District Integation protocols directly to your neural feed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <input
                            type="email"
                            placeholder="Enter administrative email"
                            className="px-6 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:border-amber-600 outline-none min-w-[300px]"
                        />
                        <button className="px-8 py-3 rounded-xl bg-amber-600 text-white font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20">
                            Connect
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
