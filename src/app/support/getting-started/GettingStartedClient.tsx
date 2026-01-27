'use client';

import { Search, ChevronRight, FileText, Zap, Shield as LucideShield, HelpCircle, Terminal, Cpu, Clock, Key } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function GettingStartedClient() {
    const articles = [
        {
            id: 1,
            title: "Strategic Center Requirements",
            desc: "Minimum hardware and cyber-link specifications for optimal Professional Sync.",
            views: "9.3k",
            date: "Dec 11, 2025",
            icon: <Cpu size={20} className="text-zinc-500" />
        },
        {
            id: 2,
            title: "Sever Strategic Link",
            desc: "Protocol for safely terminating your session and securing local data nodes.",
            views: "2.2k",
            date: "Dec 9, 2025",
            icon: <Key size={20} className="text-zinc-500" /> // Using Key as metaphor for access/logout
        },
        {
            id: 3,
            title: "Initiate Strategic Sync",
            desc: "Step-by-step guide for Architects to begin their first cognitive calibration.",
            views: "8.1k",
            date: "Dec 9, 2025",
            icon: <Zap size={20} className="text-amber-600" />
        },
        {
            id: 4,
            title: "Architect Registration",
            desc: "Creating your Professional Identity via secure channels or Federated Login.",
            views: "8.8k",
            date: "Dec 9, 2025",
            icon: <LucideShield size={20} className="text-zinc-500" />
        },
        {
            id: 5,
            title: "Professional Intelligence Modules",
            desc: "Overview of available neural assessment and training vectors.",
            views: "4.5k",
            date: "Dec 12, 2025",
            icon: <Terminal size={20} className="text-zinc-500" />
        },
        {
            id: 6,
            title: "Professional Codex FAQ",
            desc: "Common queries regarding the EdIntel neural architecture.",
            views: "6.7k",
            date: "Dec 8, 2025",
            icon: <HelpCircle size={20} className="text-zinc-500" />
        },
        {
            id: 7,
            title: "Initiate vs Professional Access",
            desc: "Understanding the difference between restricted and full protocol access.",
            views: "3.1k",
            date: "Dec 10, 2025",
            icon: <FileText size={20} className="text-zinc-500" />
        },
        {
            id: 8,
            title: "Bio-Chronology Requirements",
            desc: "Age and cognitive maturity guidelines for Professional protocols.",
            views: "1.2k",
            date: "Dec 7, 2025",
            icon: <Clock size={20} className="text-zinc-500" />
        },
        {
            id: 9,
            title: "Optimal Sync Frequency",
            desc: "Recommended session density for maximum administrative vitality.",
            views: "5.4k",
            date: "Dec 12, 2025",
            icon: <Zap size={20} className="text-zinc-500" />
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans">
            {/* Header / Search Hero */}
            <section className="relative py-16 px-6 bg-zinc-900 border-b border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-600/10 to-transparent pointer-events-none" />

                <div className="relative z-10 w-full max-w-2xl space-y-8">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 opacity-80">
                        <Link href="/support" className="hover:text-white transition-colors">Support</Link>
                        <ChevronRight size={10} />
                        <span>Initiation Protocols</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                        Getting Started with EdIntel
                    </h1>
                    <p className="text-lg text-zinc-400 font-medium max-w-lg mx-auto">
                        Essential guides for establishing your secure strategic connection.
                    </p>

                    <div className="relative group w-full mt-8">
                        <input
                            type="text"
                            placeholder="Search initiation protocols..."
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-black border border-zinc-800 focus:border-amber-600 text-zinc-300 placeholder:text-zinc-600 outline-none transition-all shadow-xl"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-600 transition-colors" size={20} />
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Article Feed */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8">
                        <h2 className="text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-white">Active Protocols</h2>
                        <span className="text-xs font-mono text-zinc-500">{articles.length} Items Found</span>
                    </div>

                    {articles.map((article) => (
                        <div key={article.id} className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-600 dark:hover:border-amber-600 transition-all shadow-sm hover:shadow-lg hover:shadow-amber-900/10 cursor-pointer flex gap-6">
                            <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                                {article.icon}
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                    {article.desc}
                                </p>
                                <div className="flex items-center gap-4 pt-2">
                                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                                        <FileText size={10} /> Knowledge Center
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <span className="text-[10px] font-mono text-zinc-400">{article.views} Views</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <span className="text-[10px] font-mono text-zinc-400">{article.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Intelligence */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Trending Box */}
                    <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 sticky top-8">
                        <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            Trending Initiation
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Initiate Strategic Sync",
                                "Architect Registration",
                                "Strategic Center Requirements",
                                "Optimal Sync Frequency"
                            ].map((item, i) => (
                                <li key={i} className="group cursor-pointer flex items-start gap-3">
                                    <span className="text-xs font-bold text-amber-600 mt-0.5">0{i + 1}</span>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                            <button className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                                View All Topics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
