'use client';
import { Check, Zap, Rocket, Star, ArrowRight, Sparkles } from "lucide-react";
import { useState, useTransition, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStripeHandshake, StripeHandshake, createSovereignCheckout } from '@/app/actions/professional-stripe';
import { useAuth } from '@/context/AuthContext';

export default function PricingMatrix() {
    const [pricing, setPricing] = useState<StripeHandshake | null>(null);
    const [isAnnual, setIsAnnual] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { user } = useAuth();

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

    const tiers = [
        {
            name: "Basic",
            price: "Free",
            priceId: null,
            icon: <Sparkles className="text-zinc-400" size={24} />,
            color: "zinc",
            accent: "from-zinc-500 to-zinc-600",
            shadowColor: "shadow-zinc-900/20",
            iconColor: "text-zinc-400",
            idealFor: "Observers & New Users",
            value: "Getting started with professional growth.",
            features: [
                "Basic Resource Access",
                "Community Feed Access",
                "Daily Usage Credits (5 per day)",
                "Grant Writing Templates",
                "Professional Resource Vault"
            ]
        },
        {
            name: "Professional",
            price: isAnnual
                ? (pricing?.practitioner.annual || 44.99)
                : (pricing?.practitioner.monthly || 49.99),
            priceId: isAnnual
                ? pricing?.practitioner.annualId
                : pricing?.practitioner.id,
            icon: <Rocket className="text-cyan-400" size={24} />,
            color: "cyan",
            accent: "from-cyan-500 to-blue-600",
            shadowColor: "shadow-cyan-900/20",
            iconColor: "text-cyan-400",
            idealFor: "Classroom Teachers & Specialists",
            value: "Enhance your classroom efficiency. Includes 30-Day Trial.",
            recommended: true,
            subtitle: "Most Popular",
            features: [
                "30-Day Free Trial Included",
                "IEP Narrative Smart-Drafting",
                "Full Legal Resource Access",
                "Unlimited AI Generations",
                "Advanced Literacy Support",
                "Priority Support Access"
            ]
        },
        {
            name: "Building Leader",
            price: isAnnual
                ? (pricing?.siteCommand.annual || 69.99)
                : (pricing?.siteCommand.monthly || 79.99),
            priceId: isAnnual
                ? pricing?.siteCommand.annualId
                : pricing?.siteCommand.id,
            icon: <Zap className="text-violet-400" size={24} />,
            color: "violet",
            accent: "from-violet-500 to-fuchsia-600",
            shadowColor: "shadow-violet-900/20",
            iconColor: "text-violet-400",
            highlight: true,
            idealFor: "Principals & Building Admin",
            value: "Building-wide efficiency and stability. Includes 30-Day Trial.",
            features: [
                "30-Day Free Trial Included",
                "Classroom Review Synthesizer",
                "Staff Retention Analytics",
                "Automated SPED Compliance",
                "Building Performance Dashboard",
                "School-Level Grant Support"
            ]
        }
    ];

    const additionalRates = [
        { service: "Onsite Full-Day Protocol", price: "$6,500", deliverable: "Staff Overhaul & Implementation" },
        { service: "Keynote Address", price: "$10,000", deliverable: "Visionary Leadership Speech" },
        { service: "Virtual Masterclass", price: "$3,500", deliverable: "90-min Rapid Tool Deployment" },
        { service: "Executive Coaching", price: "$2,500", deliverable: "Monthly 1:1 Strategic Alignment" }
    ];

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
                    Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 text-noble-gold">Value</span>
                </h2>

                {/* Toggle */}
                <div className="mt-10 inline-flex p-1 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl relative z-10">
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${!isAnnual ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isAnnual ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Annual
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {tiers.map((tier, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className={`relative p-0.5 rounded-[2rem] transition-all bg-zinc-900 border border-white/5`}
                    >
                        <div className="relative h-full bg-zinc-950 rounded-[1.9rem] p-6 flex flex-col">
                            <div className="mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 ${tier.shadowColor}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-xl font-black text-white uppercase italic">{tier.name}</h3>
                                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{tier.idealFor}</p>
                            </div>

                            <div className="mb-6 pb-6 border-b border-zinc-900">
                                <div className="flex items-baseline gap-1">
                                    {typeof tier.price === 'number' && <span className="text-xl font-bold text-zinc-500">$</span>}
                                    <span className={`text-4xl font-black tracking-tighter text-white`}>
                                        {tier.price}
                                    </span>
                                    {typeof tier.price === 'number' && <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">/ Mo</span>}
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.slice(0, 4).map((feat, fidx) => (
                                    <li key={fidx} className="flex items-start gap-2 text-xs text-zinc-400 font-medium">
                                        <Check size={14} className={`${tier.iconColor} mt-0.5 shrink-0`} />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                disabled={isPending}
                                onClick={() => {
                                    if (tier.price === 'Free') {
                                        window.location.href = '/signup';
                                    } else {
                                        startTransition(async () => {
                                            try {
                                                if (tier.priceId) {
                                                    const { url } = await createSovereignCheckout(tier.priceId, tier.name, user?.id);
                                                    if (url) window.location.href = url;
                                                }
                                            } catch (error) {
                                                console.error("Stripe Connection Error:", error);
                                            }
                                        });
                                    }
                                }}
                                className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${tier.highlight
                                    ? `bg-noble-gold text-black`
                                    : 'bg-zinc-800 text-white hover:bg-zinc-700'} ${isPending ? 'opacity-50' : ''}`}>
                                {isPending ? 'Processing...' : (tier.price === 'Free' ? 'Initialize' : 'Authorize Protocol')}
                                <ArrowRight size={12} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
