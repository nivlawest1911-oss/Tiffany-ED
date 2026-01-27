'use client';

import { Users, UserPlus, Settings, MessageSquare, BarChart3, Database, Shield as LucideShield, FileText, ChevronRight, Search } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function EducatorHubClient() {
    const articles = [
        {
            id: 1,
            title: "Integrate New Learner Centers",
            desc: "Protocol for observing managing student accounts and assigning neural profiles.",
            views: "12.4k",
            date: "Dec 10, 2025",
            icon: <UserPlus size={20} className="text-blue-500" />
        },
        {
            id: 2,
            title: "Assign Cognitive Interventions",
            desc: "Deploying specific training vectors and assessment modules to student groups.",
            views: "9.8k",
            date: "Dec 11, 2025",
            icon: <Database size={20} className="text-zinc-500" />
        },
        {
            id: 3,
            title: "Secure Communication Channels",
            desc: "Establishing direct, encrypted feedback loops with learners.",
            views: "5.5k",
            date: "Dec 9, 2025",
            icon: <MessageSquare size={20} className="text-zinc-500" />
        },
        {
            id: 4,
            title: "Deactivate Compromised Centers",
            desc: "Safely archiving or removing student accounts from the district grid.",
            views: "4.2k",
            date: "Dec 12, 2025",
            icon: <LucideShield size={20} className="text-red-500" />
        },
        {
            id: 5,
            title: "Classroom Cluster Management",
            desc: "Creating and managing neural groups for efficient bulk deployment.",
            views: "8.1k",
            date: "Dec 8, 2025",
            icon: <Users size={20} className="text-amber-600" />
        },
        {
            id: 6,
            title: "Export Biometric Data",
            desc: "Generating CSV/PDF reports of student cognitive progress for administrative review.",
            views: "15.3k",
            date: "Dec 13, 2025",
            icon: <BarChart3 size={20} className="text-green-500" />
        },
        {
            id: 7,
            title: "Learner Interface Preview",
            desc: "Understanding what the student sees: A guide to the Initiate UI.",
            views: "3.7k",
            date: "Dec 7, 2025",
            icon: <FileText size={20} className="text-zinc-500" />
        },
        {
            id: 8,
            title: "Professional Subscription FAQs",
            desc: "Details on district-wide licenses and Educator Professional Access tiers.",
            views: "11.2k",
            date: "Dec 14, 2025",
            icon: <Settings size={20} className="text-zinc-500" />
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans">
            {/* Hero Section */}
            <section className="relative py-16 px-6 bg-zinc-900 border-b border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent pointer-events-none" />

                <div className="relative z-10 w-full max-w-3xl space-y-6">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 opacity-90">
                        <Link href="/support" className="hover:text-white transition-colors">Support</Link>
                        <ChevronRight size={10} />
                        <span>Educator Hub</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                        Professional Educator Protocols
                    </h1>
                    <p className="text-lg text-zinc-400 font-medium max-w-xl mx-auto">
                        Command center documentation for managing learner nodes, interventions, and district analytics.
                    </p>

                    <div className="relative group w-full mt-8 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search educator protocols..."
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-black border border-zinc-800 focus:border-blue-500 text-zinc-300 placeholder:text-zinc-600 outline-none transition-all shadow-xl"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                    </div>
                </div>
            </section>

            {/* Content Layout */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main List */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        <h2 className="text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-white flex items-center gap-2">
                            <Users size={18} className="text-blue-500" /> Management Modules
                        </h2>
                        <span className="text-xs font-mono text-zinc-500">{articles.length} Protocols Active</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {articles.map((article) => (
                            <div key={article.id} className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-lg hover:shadow-blue-900/10 cursor-pointer flex gap-5 items-start">
                                <div className="mt-1 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors shrink-0">
                                    {article.icon}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                            {article.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                                        {article.desc}
                                    </p>
                                    <div className="flex items-center gap-3 pt-3">
                                        <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                            Admin Level 2
                                        </span>
                                        <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                                            <BarChart3 size={10} /> {article.views}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 sticky top-8">
                        <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            Critical Actions
                        </h3>

                        <div className="space-y-3">
                            <button className="w-full p-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20">
                                <UserPlus size={16} /> Deploy New Learner
                            </button>
                            <button className="w-full p-4 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                                <BarChart3 size={16} /> Generate Compliance Report
                            </button>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Related Intelligence</h4>
                            <ul className="space-y-3">
                                {["Protocol: IEP Automation", "Protocol: 504 Compliance", "System Health: Green"].map((item, i) => (
                                    <li key={i} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-500 cursor-pointer flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
