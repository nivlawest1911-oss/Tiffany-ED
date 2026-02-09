'use client';

import { Search, ArrowRight, Wallet, Zap, ShieldCheck, Lock, BarChart3, Users } from 'lucide-react';

import Link from 'next/link';
import SupportCategoryCard from '@/components/bento/SupportCategoryCard';
import { CATEGORIES, POPULAR_ARTICLES } from '@/app/support/data';

// Helper to map icon names to components 
const iconMap: any = {
    Wallet: <Wallet className="text-noble-gold" size={32} />,
    Zap: <Zap className="text-noble-gold" size={32} />,
    ShieldCheck: <ShieldCheck className="text-noble-gold" size={32} />,
    Lock: <Lock className="text-noble-gold" size={32} />,
    BarChart3: <BarChart3 className="text-noble-gold" size={32} />,
    Users: <Users className="text-noble-gold" size={32} />,
};

export default function SupportClient() {
    return (
        <main className="content-stage min-h-screen bg-black relative overflow-hidden">
            {/* Sovereign Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
                <div className="w-full h-px bg-white animate-scanline shadow-[0_0_10px_white]" />
            </div>

            {/* Search Hero */}
            <section className="relative py-24 px-6 bg-zinc-900/50 border-b border-zinc-800 flex flex-col items-center justify-center text-center overflow-hidden rounded-[3rem] mt-6 mx-6">
                <div
                    className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-noble-gold/10 to-transparent"
                />

                <div className="relative z-10 max-w-3xl w-full space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 mb-4">
                        <ShieldCheck className="w-4 h-4 text-noble-gold" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-noble-gold">Secure Communications Node</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
                        Sovereign <span className="text-noble-gold italic">Support</span>
                    </h1>

                    <div className="relative group max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search protocol error codes, deployment guides, or node policies..."
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-black border border-zinc-800 focus:border-noble-gold text-zinc-300 placeholder:text-zinc-600 outline-none transition-all shadow-2xl group-hover:shadow-noble-gold/20"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-noble-gold transition-colors" size={24} />
                    </div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Category Grid */}
                <div className="lg:col-span-8 order-2 lg:order-1">
                    <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Knowledge Base</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CATEGORIES.map((cat) => (
                            <SupportCategoryCard
                                key={cat.id}
                                title={cat.title}
                                articleCount={cat.count}
                                icon={iconMap[cat.iconName]}
                                href={cat.id === 'start' ? '/support/getting-started' : cat.id === 'community' ? '/support/educator' : `/support/topic/${cat.id}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar: Trending & Contact */}
                <div className="lg:col-span-4 order-1 lg:order-2 space-y-12">
                    {/* Trending Articles */}
                    <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                        <h3 className="text-xs font-black text-noble-gold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap size={14} /> Network Trends
                        </h3>
                        <div className="space-y-4">
                            {POPULAR_ARTICLES.map((article) => (
                                <Link key={article.id} href={`/support/article/${article.id}`} className="block p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
                                    <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors line-clamp-2">{article.title}</p>
                                </Link>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                            View All 142 Articles
                        </button>
                    </div>

                    {/* Premium Contact Card */}
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-noble-gold to-noble-gold-dark shadow-2xl shadow-noble-gold/20 text-center relative overflow-hidden group">
                        <div
                            className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 to-transparent"
                        />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Need Priority Aid?</h3>
                            <p className="text-white/80 text-xs font-medium mb-8 leading-relaxed">
                                Direct line to Professional Architects for district-critical blockers and Strategic Sync failures.
                            </p>
                            <button className="w-full py-4 bg-white text-noble-gold font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2 rounded-xl">
                                Open Sub-Space Channel <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
