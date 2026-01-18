'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Zap, Crown, ArrowRight, Info, User, Shield as LucideShield } from "lucide-react";
import Link from 'next/link';
import HolographicBriefing from './HolographicBriefing';

export default function PremiumPricingTable() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [showBriefing, setShowBriefing] = useState(false);

    const plans = [
        {
            name: 'Initiate',
            price: { monthly: 0, annual: 0 },
            description: 'Entry-level protocol access',
            features: [
                '5 AI generations per month',
                'Basic templates',
                'Community support',
            ],
            cta: 'Initialize Node',
            link: '/signup',
            popular: false,
            icon: Sparkles,
        },
        {
            name: 'Practitioner',
            price: { monthly: 29.00, annual: 24.00 },
            description: 'For individual educators',
            features: [
                'Unlimited AI generations',
                'All 41 specialized tools',
                'Priority email support',
                'Export to PDF/Word',
                'FERPA-compliant storage',
            ],
            cta: 'Start Free Trial',
            link: `/signup?plan=pro${billingCycle === 'annual' ? '&billing=annual' : ''}`,
            popular: true,
            icon: User,
        },
        {
            name: 'Enterprise Hub',
            price: { monthly: 499.00, annual: 399.00 },
            description: 'For Schools & Teams',
            features: [
                'Everything in Practitioner',
                '10 User Licenses',
                'Staff Retention Analytics',
                'Classroom Obs Synthesizer',
                'Building ROI Dashboard',
            ],
            cta: 'Deploy Hub',
            link: `/signup?plan=enterprise${billingCycle === 'annual' ? '&billing=annual' : ''}`,
            popular: false,
            icon: LucideShield,
        },
        {
            name: 'Sovereign Vault',
            price: { monthly: 2997.00, annual: 2997.00 },
            description: 'Lifetime Executive Access',
            features: [
                'Lifetime Platform Access',
                'Private Neural Model',
                'Direct Founder Uplink',
                'Legal Defense Fund Access',
                'VIP In-Person Summit',
            ],
            cta: 'Secure Vault',
            link: '/vault-access',
            popular: false,
            icon: Crown,
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

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-purple-300 mb-8">
                        30-day free trial on all paid plans • No credit card required
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center gap-4 p-2 rounded-xl bg-black/40 backdrop-blur-xl border border-purple-500/20">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === 'monthly'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'text-purple-300 hover:text-white'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${billingCycle === 'annual'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'text-purple-300 hover:text-white'
                                    }`}
                            >
                                Annual
                                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs">
                                    Save 20%
                                </span>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowBriefing(true)}
                            className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 hover:border-indigo-500/50"
                        >
                            <Sparkles size={14} />
                            <span>Financial Protocol Analysis</span>
                        </button>
                    </div>
                </motion.div>

                <HolographicBriefing
                    isOpen={showBriefing}
                    onClose={() => setShowBriefing(false)}
                    title="Investment Protocol"
                    description="Principal, selecting the correct tier is critical for maximizing ROI. The Practitioner tier offers the highest individual value, unlocking all 41 generative tools. However, for building-wide transformation, the Site Command protocol provides necessary administrative oversight and compliance automation."
                    role="Chief Financial Architect"
                    avatarImage="/images/avatars/executive_leader.png"
                    thumbnail="/images/features/data-analysis-demo.mp4"
                    // No videoSrc means it falls back to thumbnail which is fine, or we can reuse a video
                    stats={{ time: "ROI", saved: "10x", accuracy: "100%" }}
                />

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg z-10">
                                    Most Popular
                                </div>
                            )}

                            <div className={`relative h-full p-8 rounded-2xl backdrop-blur-xl border-2 transition-all ${plan.popular
                                ? 'bg-purple-500/10 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                                : 'bg-black/40 border-purple-500/20 hover:border-purple-500/40'
                                }`}>
                                {/* Icon */}
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.popular ? 'from-purple-500 to-pink-500' : 'from-purple-500/20 to-pink-500/20'
                                    } mb-4`}>
                                    <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-purple-400'}`} />
                                </div>

                                {/* Plan Name */}
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                                {/* Price */}
                                <div className="mb-4">
                                    {plan.price.monthly === null ? (
                                        <div className="text-4xl font-bold text-white">Custom</div>
                                    ) : (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">
                                                ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                                            </span>
                                            {plan.price.monthly > 0 && (
                                                <span className="text-purple-300">/month</span>
                                            )}
                                        </div>
                                    )}
                                    {billingCycle === 'annual' && plan.price.monthly > 0 && (
                                        <div className="text-sm text-green-400 mt-1">
                                            ${(plan.price.annual * 12).toFixed(2)}/year (save ${((plan.price.monthly - plan.price.annual) * 12).toFixed(2)})
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-purple-300 mb-6">{plan.description}</p>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-purple-200">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link href={plan.link}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${plan.popular
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                                            }`}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>

                                {plan.price.monthly > 0 && (
                                    <p className="text-center text-purple-400 text-xs mt-3">
                                        30-day free trial • Cancel anytime
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16 p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">
                        Compare Plans
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-purple-500/20">
                                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Feature</th>
                                    <th className="text-center py-4 px-4 text-purple-300 font-semibold">Initiate</th>
                                    <th className="text-center py-4 px-4 text-purple-300 font-semibold">Practitioner</th>
                                    <th className="text-center py-4 px-4 text-purple-300 font-semibold">Enterprise Hub</th>
                                    <th className="text-center py-4 px-4 text-purple-300 font-semibold">Sovereign Vault</th>
                                </tr>
                            </thead>
                            <tbody className="text-purple-200">
                                <tr className="border-b border-purple-500/10">
                                    <td className="py-4 px-4">AI Generations</td>
                                    <td className="text-center py-4 px-4">5/month</td>
                                    <td className="text-center py-4 px-4">Unlimited</td>
                                    <td className="text-center py-4 px-4">Unlimited</td>
                                    <td className="text-center py-4 px-4">Unlimited</td>
                                </tr>
                                <tr className="border-b border-purple-500/10">
                                    <td className="py-4 px-4">Tools Access</td>
                                    <td className="text-center py-4 px-4">Basic</td>
                                    <td className="text-center py-4 px-4">All 41</td>
                                    <td className="text-center py-4 px-4">All 41 + Admin</td>
                                    <td className="text-center py-4 px-4">All 41 + Admin</td>
                                </tr>
                                <tr className="border-b border-purple-500/10">
                                    <td className="py-4 px-4">Support</td>
                                    <td className="text-center py-4 px-4">Email</td>
                                    <td className="text-center py-4 px-4">Priority</td>
                                    <td className="text-center py-4 px-4">Priority</td>
                                    <td className="text-center py-4 px-4">Dedicated</td>
                                </tr>
                                <tr className="border-b border-purple-500/10">
                                    <td className="py-4 px-4">Custom Training</td>
                                    <td className="text-center py-4 px-4">-</td>
                                    <td className="text-center py-4 px-4">-</td>
                                    <td className="text-center py-4 px-4">-</td>
                                    <td className="text-center py-4 px-4"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-start justify-between gap-4 text-left"
                                >
                                    <span className="text-white font-semibold">{faq.question}</span>
                                    <Info className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''
                                        }`} />
                                </button>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 text-purple-300"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
