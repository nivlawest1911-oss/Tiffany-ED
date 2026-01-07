'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BLOG_POSTS } from '../posts';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const post = BLOG_POSTS.find(p => p.id.toString() === id);

    if (!post) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-black mb-4 uppercase italic">Log Node Missing</h1>
                <p className="text-zinc-500 mb-8">The requested intelligence log could not be located in the Sovereign archives.</p>
                <Link href="/blog" className="px-6 py-3 bg-amber-600 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
                    Return to Log
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500/30 pb-24">
            {/* Post Header */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src={post.image}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    alt={post.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-4xl mx-auto px-6 pb-20 w-full">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-8 hover:text-amber-400 transition-colors group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Log
                        </Link>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 rounded-full bg-amber-600/20 border border-amber-600/30 text-[10px] font-bold uppercase text-amber-500 tracking-widest backdrop-blur-md">
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none drop-shadow-2xl">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Post Metadata */}
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                <User size={18} className="text-zinc-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Author</p>
                                <p className="text-sm font-bold">EdIntel Architect</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                <Calendar size={18} className="text-zinc-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date Published</p>
                                <p className="text-sm font-bold">{post.date}</p>
                            </div>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-all text-xs font-bold uppercase tracking-widest">
                        <Share2 size={16} /> Broadcast
                    </button>
                </div>
            </div>

            {/* Post Content */}
            <article className="max-w-4xl mx-auto px-6 mt-20">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-xl text-zinc-300 leading-relaxed font-medium mb-12">
                        {post.excerpt}
                    </p>
                    <div className="space-y-8 text-zinc-400 leading-loose text-lg">
                        <p>
                            The integration of Sovereign AI into the modern district infrastructure represents a fundamental shift in how educational administration operates. By leveraging Neural Sync calibration, we are witnessing a reduction in "decision fatigue" among primary building leaders, allowing for more focused instructional leadership and student-centered growth.
                        </p>
                        <h2 className="text-white text-3xl font-black uppercase tracking-tight mt-16 mb-8 italic">The Burnout Variable</h2>
                        <p>
                            Administrative burnout has historically been an unquantifiable drag on district performance. EdIntel's proprietary algorithms track cognitive load in real-time, suggesting delegated avatar protocols when human decision limits are reached. This isn't just automation; it's administrative sustainability.
                        </p>
                        <div className="my-12 p-10 bg-amber-600/5 border-l-4 border-amber-600 rounded-r-3xl italic text-zinc-200 text-xl font-medium leading-relaxed">
                            "The goal is not to replace the educator, but to insulate them from the legislative and administrative friction that prevents genuine pedagogy."
                        </div>
                        <p>
                            As we look toward the 2026 fiscal cycle, the Sovereign Token Economy will further bridge the gap between fixed budgets and fluctuating compute needs, ensuring that every school, regardless of its size, has access to clinical-grade intelligence nodes.
                        </p>
                    </div>
                </div>

                {/* Tags Section */}
                <div className="mt-20 pt-10 border-t border-zinc-800 flex items-center gap-4">
                    <Tag size={18} className="text-zinc-500" />
                    <div className="flex flex-wrap gap-2">
                        {['Neural Sync', 'Sovereignty', 'Compliance', 'AI Ethics'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 mt-24">
                <div className="p-12 rounded-[3rem] bg-gradient-to-r from-amber-600 to-amber-700 text-center space-y-8 shadow-2xl shadow-amber-900/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter relative z-10">Implement this Protocol</h2>
                    <p className="max-w-md mx-auto relative z-10 font-medium text-amber-50">
                        Ready to deploy these insights to your district architecture? Start your 14-day sovereign pilot today.
                    </p>
                    <div className="flex justify-center gap-4 relative z-10">
                        <Link href="/signup" className="px-10 py-4 bg-white text-amber-700 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-100 transition-all shadow-xl active:scale-95">
                            Initialize Node
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
