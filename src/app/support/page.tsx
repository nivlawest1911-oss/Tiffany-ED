'use client';

import { Search, ArrowRight, Wallet, Zap, ShieldCheck, Lock, BarChart3, Users } from 'lucide-react';
import Link from 'next/link';
import SupportCategoryCard from '@/components/bento/SupportCategoryCard';
import { CATEGORIES, POPULAR_ARTICLES } from '@/app/support/data';

// Helper to map icon names to components since we can't pass components in simple data files easily in this structure
const iconMap: any = {
    Wallet: <Wallet className="text-amber-600" size={32} />,
    Zap: <Zap className="text-amber-600" size={32} />,
    ShieldCheck: <ShieldCheck className="text-amber-600" size={32} />,
    Lock: <Lock className="text-amber-600" size={32} />,
    BarChart3: <BarChart3 className="text-amber-600" size={32} />,
    Users: <Users className="text-amber-600" size={32} />,
};

export default function Support() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
            {/* Search Hero */}
            <section className="relative py-24 px-6 bg-zinc-900 border-b border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Abstract Neural Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-3xl w-full space-y-8">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                        Sovereign <span className="text-amber-600">Support</span>
                    </h1>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search for error codes, guides, or token policies..."
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-black border border-zinc-800 focus:border-amber-600 text-zinc-300 placeholder:text-zinc-600 outline-none transition-all shadow-2xl group-hover:shadow-amber-900/20"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-600 transition-colors" size={24} />
                    </div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Category Grid */}
                <div className="lg:col-span-8 order-2 lg:order-1">
                    <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Knowledge Base</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CATEGORIES.map((cat) => {
                            const Card = (
                                <SupportCategoryCard
                                    key={cat.id}
                                    title={cat.title}
                                    articleCount={cat.count}
                                    icon={iconMap[cat.iconName]}
                                />
                            );

                            if (cat.id === 'start') {
                                return (
                                    <Link key={cat.id} href="/support/getting-started">
                                        {Card}
                                    </Link>
                                );
                            }

                            if (cat.id === 'community') {
                                return (
                                    <Link key={cat.id} href="/support/educator">
                                        {Card}
                                    </Link>
                                );
                            }

                            return <div key={cat.id}>{Card}</div>;
                        })}
                    </div>
                </div>

                {/* Sidebar: Trending & Contact */}
                <div className="lg:col-span-4 order-1 lg:order-2 space-y-12">
                    {/* Trending Articles */}
                    <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                        <h3 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap size={14} /> Network Trends
                        </h3>
                        <div className="space-y-4">
                            {POPULAR_ARTICLES.map((article) => (
                                <a key={article.id} href={`/support/article/${article.id}`} className="block p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
                                    <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors line-clamp-2">{article.title}</p>
                                </a>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            View All 142 Articles
                        </button>
                    </div>

                    {/* Premium Contact Card */}
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-amber-600 to-amber-700 shadow-2xl shadow-amber-900/50 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Need Priority Aid?</h3>
                            <p className="text-amber-100/80 text-xs font-medium mb-8 leading-relaxed">
                                Direct line to Sovereign Architects for district-critical blockers and Neural Sync failures.
                            </p>
                            <button className="w-full py-4 bg-white text-amber-700 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                Open Sub-Space Channel <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
