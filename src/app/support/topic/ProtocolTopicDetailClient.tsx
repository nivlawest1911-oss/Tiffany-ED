'use client';

import { Search, ChevronRight, Eye, Calendar, AlertCircle } from 'lucide-react';

import React from 'react';

export default function ProtocolTopicDetailClient() {
    const articles = [
        {
            id: 1,
            title: "Optimizing the Strategic Sync Engine for Low-Bandwidth Districts",
            snippet: "Learn how to configure the local caching nodes to ensure 99.9% uptime for AI delegates, even in rural connectivity zones...",
            views: "1.2k",
            date: "Oct 12, 2025",
            category: "Infrastructure"
        },
        {
            id: 2,
            title: "Understanding 'Burnout Metrics' in Administrative Dashboards",
            snippet: "A deep dive into the 14-point scale used to calculate staff vitality scores and how to interpret the red/amber zones...",
            views: "892",
            date: "Nov 04, 2025",
            category: "Analytics"
        },
        {
            id: 3,
            title: "Legal Vault: Configuring 2FA for FERPA Compliance",
            snippet: "Step-by-step guide on enabling multi-factor authentication for all 'Level 4' sensitive documents including IEP drafts...",
            views: "3.4k",
            date: "Dec 01, 2025",
            category: "Compliance"
        },
        {
            id: 4,
            title: "Avatar Delegation: Best Practices for Meeting Minutes",
            snippet: "How to properly prompt your AI delegate to record, transcribe, and summarize board meetings effectively...",
            views: "560",
            date: "Dec 15, 2025",
            category: "Automation"
        }
    ];

    return (
        <main className="content-stage">
            {/* Header / Search Hero */}
            <section className="relative py-16 px-6 bg-zinc-900 border-b border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden rounded-3xl">
                <div
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-transparent"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />

                <div className="relative z-10 w-full max-w-2xl space-y-6">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
                        <span className="opacity-50">Support</span> <ChevronRight size={10} /> <span className="opacity-50">Protocols</span> <ChevronRight size={10} /> <span>Brain Training</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white">
                        Protocol: <span className="text-amber-600">Strategic Training</span>
                    </h1>
                    <div className="relative group w-full">
                        <input
                            type="text"
                            placeholder="Search within this protocol..."
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-black border border-zinc-800 focus:border-amber-600 text-zinc-300 placeholder:text-zinc-600 outline-none transition-all shadow-xl"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-600 transition-colors" size={20} />
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Article Feed */}
                <div className="lg:col-span-8 space-y-6">
                    <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        Knowledge Base Entries
                    </h2>

                    <div className="space-y-6">
                        {articles.map(article => (
                            <article key={article.id} className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 transition-all cursor-pointer">
                                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 group-hover:underline decoration-2 underline-offset-4 mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                    {article.snippet}
                                </p>
                                <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                                    <span className="flex items-center gap-1.5"><Eye size={12} /> {article.views} Views</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                                    <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500">{article.category}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Trending Section */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <AlertCircle size={12} className="text-amber-600" /> Trending Issues
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Professional Token Wallet Config",
                                "IEP Generation Error: Code 401",
                                "Adding Admin Users to Center"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 group cursor-pointer">
                                    <span className="text-amber-600 font-bold text-sm">#{i + 1}</span>
                                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Navigation */}
                    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">
                            Related Protocols
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {["Professional Econ", "Data Vault", "Admin Console", "Avatar Lab"].map(tag => (
                                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-300 hover:text-amber-600 hover:border-amber-600/30 cursor-pointer transition-all">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
