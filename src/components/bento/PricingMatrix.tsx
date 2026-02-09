'use client';
import { Check, Star, ArrowRight, Sparkles, Crown, GraduationCap, Briefcase, Building } from "lucide-react";
import { useTransition } from 'react';
import { motion } from 'framer-motion';
import { createSovereignCheckout } from '@/app/actions/professional-stripe';
import { useAuth } from '@/context/AuthContext';
import { SOVEREIGN_TIERS } from '@/lib/pricing-config';

// Icon mapping helper
const IconMap: Record<string, any> = {
    Building: Building,
    Crown: Crown,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    Star: Star,
    Sparkles: Sparkles
};

export default function PricingMatrix() {
    const [isPending, startTransition] = useTransition();
    const { user } = useAuth();

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            {/* Header Section */}
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-md animate-pulse">
                    <Star size={12} fill="currentColor" /> 30-Day Professional Trial Active
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                    <Sparkles size={12} /> ROI Capture Protocol
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 relative z-10">
                    Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 gold-gradient-text">Value</span>
                </h2>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-12">
                {SOVEREIGN_TIERS.map((tier) => {
                    const Icon = IconMap[tier.icon] || Star;
                    const isRobust = tier.robust;

                    return (
                        <motion.div
                            key={tier.id}
                            whileHover={{ y: -5 }}
                            className={`relative p-0.5 rounded-[2rem] transition-all duration-500 ${tier.name === 'Site Command'
                                    ? 'ring-2 ring-accent shadow-[0_0_30px_rgba(112,0,255,0.3)]'
                                    : isRobust && tier.price >= 79
                                        ? 'ring-2 ring-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                                        : ''
                                }`}
                        >
                            <div className={`relative h-full rounded-[1.9rem] p-6 flex flex-col glass-panel overflow-hidden group`}>
                                {/* Liquid animated background for paid tiers */}
                                {tier.price > 0 && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-noble-gold/5 via-noble-navy/50 to-noble-navy opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                )}

                                <div className="relative z-10 mb-6">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${tier.price > 30 ? 'bg-noble-gold/20 text-noble-gold' : 'bg-white/5 text-slate-400'}`}>
                                            <Icon size={24} />
                                        </div>
                                        {isRobust && tier.price >= 79 && (
                                            <span className="bg-amber-500 text-black px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded">Most Robust</span>
                                        )}
                                        {tier.price === 0 && (
                                            <span className="bg-zinc-700 text-white px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded">Start Here</span>
                                        )}
                                    </div>
                                    <h3 className={`text-xl font-black uppercase italic ${tier.price > 30 ? 'text-noble-gold' : 'text-white'}`}>{tier.name}</h3>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{tier.idealFor}</p>
                                </div>

                                <div className="relative z-10 mb-6 pb-6 border-b border-white/10">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-zinc-500">$</span>
                                        <span className={`text-4xl font-black tracking-tighter text-white`}>
                                            {tier.price}
                                        </span>
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">/ Mo</span>
                                    </div>
                                    <div className="mt-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Sparkles size={10} /> {(tier as any).trialDuration || '30 Days'} Protocol
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1 relative z-10">
                                    {tier.features.slice(0, 4).map((feat, fidx) => (
                                        <li key={fidx} className="flex items-start gap-2 text-xs text-zinc-300 font-medium">
                                            <Check size={14} className={`${tier.price > 30 ? 'text-noble-gold' : 'text-zinc-500'} mt-0.5 shrink-0`} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    disabled={isPending}
                                    onClick={() => {
                                        if (tier.stripeLink && tier.stripeLink.startsWith('http')) {
                                            const separator = tier.stripeLink.includes('?') ? '&' : '?';
                                            window.location.href = `${tier.stripeLink}${separator}client_reference_id=${user?.id}`;
                                            return;
                                        }

                                        startTransition(async () => {
                                            try {
                                                if (tier.stripeLink) {
                                                    const { url } = await createSovereignCheckout(tier.stripeLink, tier.name, user?.id);
                                                    if (url) window.location.href = url;
                                                }
                                            } catch (error) {
                                                console.error("Stripe Connection Error:", error);
                                            }
                                        });
                                    }}
                                    className={`relative w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all overflow-hidden
                                        ${tier.price >= 69 || isRobust
                                            ? `bg-noble-gold text-noble-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]`
                                            : 'bg-white/10 text-white hover:bg-white/20 hover:text-noble-gold'} 
                                        ${isPending ? 'opacity-50' : ''}`}
                                >
                                    {isPending ? 'Processing...' : (tier.price === 0 ? 'Initiate Protocol' : 'Ascend to Command')}
                                    <ArrowRight size={12} />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
