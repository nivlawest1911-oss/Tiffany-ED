'use client';

import { Search, ChevronRight, Eye, ThumbsUp, ThumbsDown, User, Printer } from 'lucide-react';
import React from 'react';

export default function ProtocolArticleDetailClient() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans">
            {/* Header / Search Hero */}
            <section className="relative py-12 px-6 bg-zinc-900 border-b border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />

                <div className="relative z-10 w-full max-w-2xl space-y-6">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2 opacity-80">
                        <span>Support</span> <ChevronRight size={10} /> <span>Protocols</span> <ChevronRight size={10} /> <span>Brain Training</span>
                    </div>

                    <div className="relative group w-full">
                        <input
                            type="text"
                            placeholder="Search knowledge protocols..."
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-black border border-zinc-800 focus:border-amber-600 text-zinc-300 placeholder:text-zinc-600 outline-none transition-all shadow-xl"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-600 transition-colors" size={20} />
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Article Body */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Article Header */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-4">
                            How many tasks per training session?
                        </h1>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                            <span className="flex items-center gap-2"><User size={14} /> EdIntel Architect</span>
                            <span>•</span>
                            <span>Updated: Dec 12, 2025</span>
                            <span>•</span>
                            <span className="flex items-center gap-2"><Eye size={14} /> 1.4k Views</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-loose">
                        <p className="text-lg font-medium text-zinc-900 dark:text-white mb-6">
                            When initiating a Strategic Sync session, the EdIntel engine dynamically calibrates the workload based on the educator&apos;s current circadian rhythm and the localized district compliance requirements.
                        </p>

                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Standard Protocol Load</h3>
                        <ul className="space-y-2 list-disc pl-5 marker:text-amber-600">
                            <li><strong>Individual Training:</strong> Consists of 3 high-intensity cognitive tasks followed by a localized EQ assessment.</li>
                            <li><strong>District Audit:</strong> Running a compliance scan processes 142 discrete file nodes per session.</li>
                            <li><strong>Professional Token Usage:</strong> Each standard session consumes approximately 0.4 tokens from the district wallet.</li>
                        </ul>

                        <div className="my-8 p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-200 italic">
                                "Note: The number of tasks may fluctuate if 'High-Stakes Mode' is enabled in the Admin Console. This ensures maximum cognitive load calibration during standardized testing windows."
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Duration & Frequency</h3>
                        <p>
                            A standard training session lasts approximately <strong>12-15 minutes</strong>. EdIntel recommends 2-3 sessions per week to maintain optimal administrative vitality and prevent burnout. Unlike CogniFit&apos;s clinical approach, our protocol is designed specifically for the <strong>educational ecosystem</strong>.
                        </p>
                    </div>

                    {/* Feedback Center */}
                    <div className="mt-16 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Was this protocol effective?</h3>
                        <div className="flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-bold text-zinc-600 dark:text-zinc-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 hover:border-green-200 transition-all">
                                <ThumbsUp size={16} /> Yes, confirmed
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-bold text-zinc-600 dark:text-zinc-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 transition-all">
                                <ThumbsDown size={16} /> No, flawed logic
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Intelligence */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Actions */}
                    <div className="flex gap-4">
                        <button className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase text-xs tracking-widest transition-colors shadow-lg shadow-amber-900/20">
                            Open Ticket
                        </button>
                        <button className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            <Printer size={20} />
                        </button>
                    </div>

                    {/* Related Protocols */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            Related Protocols
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { title: "Training task vs Assessment task", views: "5.98K" },
                                { title: "Cognitive Score Calculation Matrix", views: "3.2K" },
                                { title: "Burnout Prevention: The 40% Rule", views: "8.1K" },
                                { title: "Professional Token Allocation Guide", views: "2.5K" }
                            ].map((item, i) => (
                                <li key={i} className="group cursor-pointer">
                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:underline decoration-2 underline-offset-2 mb-1">
                                        {item.title}
                                    </p>
                                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{item.views} Views</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {['Brain Training', 'Knowledge', 'Leadership', 'EdIntel V2'].map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
