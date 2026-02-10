'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, Zap, Info, Star, Crown, GraduationCap, Briefcase, Building } from "lucide-react";
import { createEdIntelCheckout } from '@/app/actions/professional-stripe';
import { useAuth } from '@/context/AuthContext';
import { useIntelligence } from '@/context/IntelligenceContext';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { EdIntel_TIERS } from '@/lib/pricing-config';

// Icon mapping helper
const IconMap: Record<string, any> = {
    Building: Building,
    Crown: Crown,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    Star: Star,
    Sparkles: Sparkles
};

export default function PremiumPricingTable() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const { user } = useAuth();
    const { generateBriefing } = useIntelligence();
    const { playClick } = useProfessionalSounds();

    const faqs = [
        {
            question: 'How does the 30-day free trial work?',
            answer: 'Start using EdIntel Professional immediately with full access to all features. No credit card required. After 30 days, choose to continue with a paid plan or downgrade to the free tier.',
        },
        {
            question: 'Can I switch plans anytime?',
            answer: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.',
        },
        {
            question: 'Is my data secure and FERPA-compliant?',
            answer: 'Absolutely. All data is encrypted at rest and in transit. We\'re fully FERPA-compliant and never share your data with third parties.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, and can invoice districts for Enterprise plans.',
        },
    ];

    return (
        <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-intel-gold/10 border border-intel-gold/30 text-intel-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        System Protocol // v5.1
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase italic">
                        The <span className="text-gold-gradient">EdIntel</span> Tier
                    </h1>
                    <p className="text-xl text-zinc-500 mb-8 max-w-2xl mx-auto font-light leading-relaxed italic">
                        "Strategic pricing architectures built for educational leadership. Initialize your protocol with a 30-day trial. High-fidelity neural processing included."
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
                    {EdIntel_TIERS.map((tier, idx) => {
                        const Icon = IconMap[tier.icon] || Star;
                        return (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`relative group ${tier.popular ? 'lg:scale-105 z-20' : 'z-10'}`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-intel-gold text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-30">
                                        Strategic Choice
                                    </div>
                                )}

                                <div className={`h-full flex flex-col rounded-[2.5rem] p-12 transition-all duration-500 border ${tier.popular
                                    ? 'bg-intel-gold/5 border-intel-gold/40 shadow-[0_20px_60px_rgba(197,164,126,0.1)]'
                                    : 'bg-white/5 border-white/5 hover:border-intel-gold/30'
                                    } backdrop-blur-3xl overflow-hidden`}>

                                    {/* Kente Accent for Cards */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red opacity-30" />

                                    <div className="mb-10 relative">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-black/60 border ${tier.popular ? 'border-intel-gold/50 text-intel-gold' : 'border-white/10 text-zinc-600'} shadow-2xl`}>
                                            <Icon size={32} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase italic">{tier.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-6xl font-black text-white tracking-tighter">${tier.price}</span>
                                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                                / Mo
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-400 font-light leading-relaxed italic">"{tier.description}"</p>
                                    </div>

                                    <ul className="space-y-5 mb-12 flex-grow">
                                        {tier.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-4 group/item">
                                                <div className={`mt-1 flex-shrink-0 transition-colors ${tier.popular ? 'text-intel-gold' : 'text-zinc-700'}`}>
                                                    <CheckCircle size={16} />
                                                </div>
                                                <span className="text-sm text-zinc-300 font-medium leading-tight group-hover/item:text-white transition-colors">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            playClick();
                                            if (tier.stripeLink && tier.stripeLink.startsWith('http')) {
                                                window.location.href = tier.stripeLink;
                                                return;
                                            }

                                            try {
                                                setLoadingPlan(tier.name);
                                                if (tier.stripeLink) {
                                                    const { url } = await createEdIntelCheckout(tier.stripeLink, tier.name, user?.id);
                                                    if (url) window.location.href = url;
                                                }
                                            } catch (err) {
                                                setLoadingPlan(null);
                                            }
                                        }}
                                        disabled={loadingPlan !== null}
                                        className={`w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${tier.popular
                                            ? 'bg-intel-gold text-black hover:bg-white'
                                            : 'bg-white/5 text-white hover:bg-intel-gold hover:text-black border border-white/10 hover:border-intel-gold'
                                            } ${loadingPlan === tier.name ? 'opacity-50 cursor-wait' : ''}`}>
                                        {loadingPlan === tier.name ? (
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {tier.price === 0 ? 'Start Free' : 'Deploy Node'}
                                                <Zap size={14} className={tier.popular ? 'animate-pulse' : ''} />
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => generateBriefing({
                                            title: `${tier.name} Strategic Briefing`,
                                            description: tier.description + " This plan includes our proprietary high-fidelity neural processing and culturally-responsive interface standards.",
                                            stats: { time: 'Instant', saved: tier.price > 50 ? '100h/mo' : '40h/mo', accuracy: '99.9%' },
                                            role: tier.badge || 'Protocol Initiate',
                                            avatarImage: tier.price > 60 ? '/images/avatars/executive_leader.png' : '/images/avatars/dr_alvin_west_premium.png'
                                        })}
                                        className="mt-6 text-[9px] text-zinc-600 hover:text-intel-gold font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/info"
                                    >
                                        <Info size={10} className="group-hover/info:rotate-12 transition-transform" />
                                        Deep Strategic Briefing // 01
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-intel-gold/10 border border-intel-gold/20 text-intel-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic">
                            Support Protocols
                        </div>
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Common Queries</h2>
                    </div>

                    <div className="grid gap-6">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all hover:border-intel-gold/40 backdrop-blur-xl group"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-12 py-10 flex items-center justify-between text-left"
                                >
                                    <span className="text-2xl font-black text-zinc-400 uppercase tracking-tighter group-hover:text-white transition-colors">{faq.question}</span>
                                    <div className={`p-3 rounded-xl transition-all duration-500 ${openFaq === idx ? 'bg-intel-gold rotate-180' : 'bg-black/40'}`}>
                                        <Zap size={20} className={openFaq === idx ? 'text-black' : 'text-zinc-600'} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-12 pb-12 text-zinc-400 leading-relaxed font-light text-xl italic border-t border-white/5 pt-8">
                                                "{faq.answer}"
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
