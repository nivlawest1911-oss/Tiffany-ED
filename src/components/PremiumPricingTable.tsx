'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, Zap, Crown, Info, User, Shield as LucideShield } from "lucide-react";
import Link from 'next/link';
import { getStripeHandshake, StripeHandshake, createSovereignCheckout } from '@/app/actions/professional-stripe';
import { useAuth } from '@/context/AuthContext';
import { useIntelligence } from '@/context/IntelligenceContext';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

export default function PremiumPricingTable() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [showBriefing, setShowBriefing] = useState(false);
    const [pricing, setPricing] = useState<StripeHandshake | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const { user } = useAuth();
    const { generateBriefing } = useIntelligence();
    const { playClick, playHover, playSuccess } = useProfessionalSounds();

    useEffect(() => {
        async function loadPricing() {
            try {
                const data = await getStripeHandshake();
                setPricing(data);
            } catch (error) {
                console.error("Failed to handshake with Stripe:", error);
            }
        }
        loadPricing();
    }, []);

    const plans = [
        {
            name: 'Initiate',
            price: { monthly: 0, annual: 0 },
            description: 'Professional Initiate: Essential educational AI protocols.',
            features: [
                '5 AI generations per month',
                'Basic templates',
                'Community support',
            ],
            cta: 'Initialize Center',
            link: '/signup',
            popular: false,
            icon: Sparkles,
        },
        {
            name: 'Practitioner',
            price: {
                monthly: pricing?.practitioner.monthly || 49.99,
                annual: pricing?.practitioner.annual || 44.99
            },
            description: 'For specialized educators. Includes 30-day trial.',
            features: [
                'Unlimited AI generations',
                'All 70+ specialized tools',
                'Priority email support',
                'Export to PDF/Word',
                'FERPA-compliant storage',
            ],
            cta: 'Start 30-Day Trial',
            link: `/signup?plan=pro${billingCycle === 'annual' ? '&billing=annual' : ''}`,
            priceId: billingCycle === 'monthly' ? pricing?.practitioner.id : pricing?.practitioner.annualId,
            popular: true,
            icon: User,
        },
        {
            name: 'Director Pack',
            price: {
                monthly: pricing?.director.monthly || 69.99,
                annual: pricing?.director.annual || 59.99
            },
            description: 'For leadership and administration. Includes 30-day trial.',
            features: [
                'Everything in Practitioner',
                'Advanced Leadership Modules',
                'Staff Retention Analytics',
                'Classroom Obs Synthesizer',
                'Strategic Briefing Console',
            ],
            cta: 'Deploy Director Center',
            link: `/signup?plan=director${billingCycle === 'annual' ? '&billing=annual' : ''}`,
            priceId: billingCycle === 'monthly' ? pricing?.director.id : pricing?.director.annualId,
            popular: false,
            icon: Crown,
        },
        {
            name: 'Site Command',
            price: {
                monthly: pricing?.siteCommand.monthly || 79.99,
                annual: pricing?.siteCommand.annual || 69.99
            },
            description: 'Full Building Command. Includes 30-day trial.',
            features: [
                'Everything in Director Pack',
                '10 User Licenses',
                'Building ROI Dashboard',
                'Priority Implementation Support',
                'Strategic Link API Access',
            ],
            cta: 'Deploy Site Command',
            link: `/signup?plan=enterprise${billingCycle === 'annual' ? '&billing=annual' : ''}`,
            priceId: billingCycle === 'monthly' ? pricing?.siteCommand.id : pricing?.siteCommand.annualId,
            popular: false,
            icon: LucideShield,
        },
    ];

    const faqs = [
        {
            question: 'How does the 30-day free trial work?',
            answer: 'Start using EdIntel Professional immediately with full access to all features. No credit card required. After 30 days, choose to continue with a paid plan or downgrade to the free tier.',
        },
        {
            question: 'Can I switch plans anytime?',
            answer: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges.',
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
        <div className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden">
            {/* Kente Pattern Header */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red z-50" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase">
                        The <span className="text-noble-gold">Professional</span> Standard
                    </h1>
                    <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto font-medium">
                        Strategic pricing architectures built for educational leadership. Initialize your protocol with a 30-day trial. All plans include Kente-inspired Executive Holography and Vertex AI Supreme processing.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center gap-4 p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-8 py-3 rounded-xl font-bold transition-all uppercase text-xs tracking-widest ${billingCycle === 'monthly'
                                    ? 'bg-white text-black shadow-2xl'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 uppercase text-xs tracking-widest ${billingCycle === 'annual'
                                    ? 'bg-noble-gold text-black shadow-2xl'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                Annual
                                <span className="px-2 py-0.5 rounded-md bg-black/20 text-black text-[10px] font-black">
                                    -20%
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`relative group ${plan.popular ? 'lg:scale-105 z-20' : 'z-10'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-noble-gold text-black text-[10px] font-black uppercase tracking-widest shadow-2xl z-30">
                                    Strategic Choice
                                </div>
                            )}

                            {/* Kente Ribbon for Popular Plan */}
                            {plan.popular && (
                                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red [mask-image:linear-gradient(white,white)_padding-box,linear-gradient(white,white)] transition-all duration-500 opacity-20" />
                            )}

                            <div className={`h-full flex flex-col rounded-[2.5rem] p-10 transition-all duration-500 border ${plan.popular
                                ? 'bg-white/10 border-noble-gold/50 shadow-2xl shadow-noble-gold/10'
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                } backdrop-blur-3xl group-hover:bg-white/[0.07]`}>

                                <div className="mb-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${plan.popular ? 'from-noble-gold to-kente-red' : 'from-zinc-800 to-zinc-900'} border border-white/10 shadow-xl`}>
                                        <plan.icon size={28} className={plan.popular ? 'text-black' : 'text-zinc-400'} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-5xl font-black text-white tracking-tighter">${plan.price[billingCycle]}</span>
                                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                            {plan.name === 'Professional Vault' ? '/ Lifetime' : billingCycle === 'monthly' ? '/ Mo' : '/ Mo, Annual'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-400 font-medium leading-relaxed">{plan.description}</p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-4">
                                            <div className={`mt-1 flex-shrink-0 ${plan.popular ? 'text-noble-gold' : 'text-zinc-600'}`}>
                                                <CheckCircle size={18} />
                                            </div>
                                            <span className="text-sm text-zinc-300 font-medium leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        playClick();
                                        if (plan.name === 'Initiate') {
                                            window.location.href = plan.link;
                                            return;
                                        }

                                        try {
                                            setLoadingPlan(plan.name);
                                            const priceId = billingCycle === 'monthly' ? (pricing as any)[idx === 1 ? 'practitioner' : idx === 2 ? 'director' : 'siteCommand'].id : (pricing as any)[idx === 1 ? 'practitioner' : idx === 2 ? 'director' : 'siteCommand'].annualId;
                                            const { url } = await createSovereignCheckout(priceId, plan.name, user?.id);
                                            if (url) window.location.href = url;
                                        } catch (err) {
                                            console.error("Checkout failed", err);
                                            setLoadingPlan(null);
                                        }
                                    }}
                                    disabled={loadingPlan !== null}
                                    className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${plan.popular
                                        ? 'bg-noble-gold text-black hover:bg-white shadow-noble-gold/40'
                                        : 'bg-white/10 text-white hover:bg-white border border-white/10 hover:text-black'
                                        } ${loadingPlan === plan.name ? 'opacity-50 cursor-wait' : ''}`}>
                                    {loadingPlan === plan.name ? (
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {plan.cta}
                                            <Zap size={14} className={plan.popular ? 'animate-pulse' : ''} />
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => generateBriefing({
                                        title: `${plan.name} Strategic Briefing`,
                                        description: plan.description + " This plan includes our proprietary high-fidelity neural processing and culturally-responsive interface standards.",
                                        stats: { time: 'Instant', saved: idx === 1 ? '40h/mo' : idx === 2 ? '100h/mo' : 'Building Wide', accuracy: '99.9%' },
                                        role: idx === 0 ? 'Protocol Initiate' : idx === 1 ? 'Practitioner' : idx === 2 ? 'Executive' : 'Sovereign Command',
                                        avatarImage: idx === 3 ? '/images/avatars/executive_leader.png' : '/images/avatars/dr_alvin_west_premium.png'
                                    })}
                                    className="mt-4 text-[9px] text-zinc-500 hover:text-noble-gold font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group/info"
                                >
                                    <Info size={10} className="group-hover/info:rotate-12 transition-transform" />
                                    Deep Strategic Briefing
                                </button>

                                {plan.price.monthly > 0 && (
                                    <Link
                                        href={`/payment?plan=${plan.name === 'Director Pack' ? 'director' :
                                            plan.name === 'Site Command' ? 'site_command' :
                                                'practitioner'
                                            }&amount=${plan.price[billingCycle]}`}
                                        className="block mt-3 text-center"
                                    >
                                        <span className="text-[10px] text-zinc-500 hover:text-noble-gold transition-colors font-bold uppercase tracking-wider border-b border-transparent hover:border-noble-gold">
                                            Pay with Crypto / Universal Hub
                                        </span>
                                    </Link>
                                )}

                                <p className="text-center text-[9px] text-zinc-600 uppercase font-black tracking-widest mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Secure Encrypted Protocol // KENTE_SYNC_ACTIVE
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-widest mb-4">
                            Support Protocols
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tight">Frequently Asked Protocols</h2>
                    </div>

                    <div className="grid gap-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="rounded-[2rem] bg-white/[0.03] border border-white/5 overflow-hidden transition-all hover:border-white/10"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-10 py-8 flex items-center justify-between text-left group"
                                >
                                    <span className="text-xl font-black text-zinc-200 uppercase tracking-tighter group-hover:text-white transition-colors">{faq.question}</span>
                                    <div className={`p-2 rounded-full transition-all duration-500 ${openFaq === idx ? 'bg-noble-gold rotate-180' : 'bg-white/5'}`}>
                                        <Zap size={18} className={openFaq === idx ? 'text-black' : 'text-zinc-600'} />
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
                                            <div className="px-10 pb-10 text-zinc-400 leading-relaxed font-medium text-lg border-t border-white/5 pt-6">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-screen bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-screen bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,0,0,0.05)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        </div>
    );
}
