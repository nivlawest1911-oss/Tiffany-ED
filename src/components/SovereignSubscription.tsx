'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, Info, CircleDollarSign } from "lucide-react";
import { createEdIntelCheckout } from '@/app/actions/professional-stripe';
import { useAuth } from '@/context/AuthContext';
import { useIntelligence } from '@/context/IntelligenceContext';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { EdIntel_TIERS } from '@/lib/pricing-config';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import UniversalPaymentHub from '@/components/UniversalPaymentHub';

interface SovereignSubscriptionProps {
    showBriefingButton?: boolean;
}

export default function SovereignSubscription({ showBriefingButton = true }: SovereignSubscriptionProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [showBriefing, setShowBriefing] = useState(false);
    const [showPaymentHub, setShowPaymentHub] = useState<{ amount: number, name: string } | null>(null);

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
            question: 'What is "District Collective Intelligence"?',
            answer: 'Our strategic protocol for multi-user synchronization. It allows department heads and principals to oversee AI implementation across their entire site while maintaining individual teacher sovereignty.',
        }
    ];

    return (
        <div className="relative z-10">
            {/* Briefing Modal */}
            <HolographicBriefing
                isOpen={showBriefing}
                onClose={() => setShowBriefing(false)}
                agentId="strategic"
                title="Value Capture Protocol"
                description="I am Keisha Reynolds. We are reviewing the EdIntel capital deployment model. Our initiative is designed to provide maximum strategic yield for modern educational districts."
                briefingSteps={[
                    "Audit existing SaaS expenditure for redundancy.",
                    "Provision site-specific tokens across the administrative cluster.",
                    "Activate the 14-day Professional Pilot with zero friction.",
                    "Scale administrative intelligence as district fidelity increases."
                ]}
            />

            {/* Payment Hub Modal */}
            <AnimatePresence>
                {showPaymentHub && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
                    >
                        <div className="relative w-full max-w-4xl bg-zinc-950 border border-noble-gold/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)]">
                            <button
                                onClick={() => setShowPaymentHub(null)}
                                className="absolute top-8 right-8 text-white/40 hover:text-white font-black uppercase tracking-widest text-[10px]"
                            >
                                Close Protocol [x]
                            </button>
                            <div className="p-12 overflow-y-auto max-h-[85vh]">
                                <UniversalPaymentHub
                                    amount={showPaymentHub.amount}
                                    description={`${showPaymentHub.name} Node Deployment`}
                                    userId={user?.id || 'anonymous'}
                                    customerEmail={user?.email || ''}
                                    onSuccess={() => {
                                        setShowPaymentHub(null);
                                        // Trigger success handling
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    {showBriefingButton && (
                        <button
                            onClick={() => { playClick(); setShowBriefing(true); }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-noble-gold/20 bg-noble-gold/5 text-noble-gold text-[9px] font-black uppercase tracking-[0.3em] hover:bg-noble-gold/10 transition-all mb-8 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        >
                            <CircleDollarSign size={14} className="animate-pulse" />
                            Initialize Value Briefing
                        </button>
                    )}

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-gold/10 border border-noble-gold/30 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        System Protocol // Sovereign Suite
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                        Strategic <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#B8860B] bg-clip-text text-transparent">Value</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-light italic leading-relaxed">
                        "Invest in clarity. Our pricing structure is engineered to recapture lost administrative hours and ensure strategic legal protection."
                    </p>
                </motion.div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
                    {EdIntel_TIERS.map((tier, idx) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`relative group ${tier.popular ? 'lg:scale-105 z-20' : 'z-10'}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-noble-gold text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-30">
                                    Strategic Choice
                                </div>
                            )}

                            <div className={`h-full flex flex-col rounded-[3rem] p-12 transition-all duration-500 border ${tier.popular
                                ? 'bg-noble-gold/5 border-noble-gold/40 shadow-[0_20px_60px_rgba(197,164,126,0.1)]'
                                : 'bg-white/5 border-white/5 hover:border-noble-gold/30 shadow-2xl'
                                } backdrop-blur-3xl overflow-hidden relative group/card`}>

                                {/* Animated background accent */}
                                <div className="absolute inset-0 bg-gradient-to-br from-noble-gold/0 via-noble-gold/0 to-noble-gold/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                                <div className="mb-10 relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">{tier.name}</h3>
                                        {tier.badge && (
                                            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                                {tier.badge}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-7xl font-black text-white tracking-tighter">${tier.price}</span>
                                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">/ Mo</span>
                                    </div>
                                    <p className="text-base text-zinc-400 font-light leading-relaxed italic border-l-2 border-noble-gold/20 pl-4 py-1">
                                        "{tier.description}"
                                    </p>
                                </div>

                                <ul className="space-y-5 mb-12 flex-grow relative z-10">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-4 group/item">
                                            <div className={`mt-1.5 w-4 h-4 rounded-full flex items-center justify-center border ${tier.popular ? 'border-noble-gold/50' : 'border-zinc-800'} transition-colors group-hover/item:border-noble-gold`}>
                                                <CheckCircle size={10} className={`${tier.popular ? 'text-noble-gold' : 'text-zinc-700'} group-hover/item:text-noble-gold transition-colors`} />
                                            </div>
                                            <span className="text-base text-zinc-300 font-medium leading-tight group-hover/item:text-white transition-colors">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={async (_e) => {
                                        playClick();

                                        // Handle direct Stripe Payment Links
                                        if (tier.stripeLink && tier.stripeLink.startsWith('http')) {
                                            window.location.href = tier.stripeLink;
                                            return;
                                        }

                                        // Fallback to internal payment hub or checkout session
                                        if (tier.price > 100) {
                                            setShowPaymentHub({ amount: tier.price, name: tier.name });
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
                                    className={`w-full py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 relative z-10 overflow-hidden ${tier.popular
                                        ? 'bg-noble-gold text-black hover:shadow-noble-gold/20'
                                        : 'bg-white/5 text-white hover:bg-noble-gold hover:text-black border border-white/10 hover:border-noble-gold'
                                        }`}>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                                    {loadingPlan === tier.name ? 'Processing...' : tier.price === 0 ? 'Start Free' : 'Deploy Node'}
                                    <Zap size={16} className={tier.popular ? 'animate-pulse' : ''} />
                                </button>

                                <button
                                    onClick={() => generateBriefing({
                                        title: `${tier.name} Strategic Briefing`,
                                        description: tier.description,
                                        stats: { time: 'Instant', saved: tier.price > 50 ? '100h/mo' : '40h/mo', accuracy: '99.9%' },
                                        role: tier.badge || 'Protocol Initiate'
                                    })}
                                    className="mt-6 text-[10px] text-zinc-600 hover:text-noble-gold font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/briefing relative z-10"
                                >
                                    <Info size={12} className="group-hover/briefing:rotate-12 transition-transform" />
                                    Review Strategic Briefing
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Cluster */}
                <div className="max-w-4xl mx-auto pb-32 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic">
                            Verification Protocols
                        </div>
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Strategic Queries</h2>
                    </div>
                    <div className="grid gap-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden transition-all hover:border-noble-gold/40 backdrop-blur-xl group">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-12 py-10 flex items-center justify-between text-left"
                                >
                                    <span className="text-2xl font-black text-zinc-400 uppercase tracking-tighter group-hover:text-white transition-colors">{faq.question}</span>
                                    <div className={`p-4 rounded-xl transition-all duration-500 ${openFaq === idx ? 'bg-noble-gold rotate-180' : 'bg-black/40'}`}>
                                        <Zap size={24} className={openFaq === idx ? 'text-black' : 'text-zinc-600'} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="px-12 pb-12 text-zinc-400 text-xl italic border-t border-white/5 pt-8 leading-relaxed">
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
