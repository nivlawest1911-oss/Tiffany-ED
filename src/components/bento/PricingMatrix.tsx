'use client';
import { Check, Zap, Shield, Crown, Rocket, Star, ArrowRight, Sparkles, Database, Infinity as InfinityIcon } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createCheckoutSession } from '@/app/actions/stripe';
import { firestore } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function PricingMatrix() {
    const [priceData, setPriceData] = useState<Record<string, { monthly: number; annual: number; monthlyId?: string; annualId?: string }>>({});
    const [isAnnual, setIsAnnual] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchStripePrices = async () => {
            try {
                const q = query(collection(firestore, 'products'), where('active', '==', true));
                const snapshot = await getDocs(q);

                const newPriceData: Record<string, any> = {};

                await Promise.all(snapshot.docs.map(async (doc) => {
                    const productData = doc.data();
                    const pricesCollection = collection(doc.ref, 'prices');
                    const pricesSnapshot = await getDocs(query(pricesCollection, where('active', '==', true)));

                    const prices: any = {};
                    pricesSnapshot.forEach(priceDoc => {
                        const priceData = priceDoc.data();
                        if (priceData.interval === 'month') {
                            prices.monthly = priceData.unit_amount ? priceData.unit_amount / 100 : 0;
                            prices.monthlyId = priceDoc.id; // Stripe Price ID
                        } else if (priceData.interval === 'year') {
                            prices.annual = priceData.unit_amount ? priceData.unit_amount / 100 : 0;
                            prices.annualId = priceDoc.id;
                        }
                    });

                    if (productData.name) {
                        newPriceData[productData.name] = prices;
                    }
                }));

                if (Object.keys(newPriceData).length > 0) {
                    setPriceData(newPriceData);
                }
            } catch (e) {
                console.log("EdIntel Integration: Extension check skipped (permissions)", e);
            }
        };
        fetchStripePrices();
    }, []);

    const tiers = [
        {
            name: "Sovereign Initiate",
            price: "Free",
            priceId: null,
            icon: <Shield className="text-zinc-400" size={24} />,
            color: "zinc",
            accent: "from-zinc-500 to-zinc-600",
            shadowColor: "shadow-zinc-900/20",
            iconColor: "text-zinc-400",
            idealFor: "Observers & New Users",
            value: "Zero-cost entry to the Sovereign Network",
            features: [
                "Basic Protocol Access",
                "Community Intelligence Feed",
                "Limited AI Generations (5/day)",
                "Read-Only Sovereign Vault"
            ]
        },
        {
            name: "Practitioner",
            price: isAnnual
                ? (priceData['Practitioner']?.annual || 39)
                : (priceData['Practitioner']?.monthly || 49),
            priceId: isAnnual
                ? priceData['Practitioner']?.annualId
                : priceData['Practitioner']?.monthlyId,
            icon: <Rocket className="text-cyan-400" size={24} />,
            color: "cyan",
            accent: "from-cyan-500 to-blue-600",
            shadowColor: "shadow-cyan-900/20",
            iconColor: "text-cyan-400",
            idealFor: "Classroom teachers & Specialists",
            value: "Personal burnout neutralization",
            features: [
                "14-Day Free Trial Included",
                "IEP Narrative Smart-Draft",
                "Sovereign Legal Vault Access",
                "1,000 Monthly Neural Tokens",
                "Science of Reading Tutor"
            ]
        },
        {
            name: "Site Command",
            subtitle: "Most Popular",
            price: isAnnual
                ? (priceData['Site Command']?.annual || 69)
                : (priceData['Site Command']?.monthly || 79),
            priceId: isAnnual
                ? priceData['Site Command']?.annualId
                : priceData['Site Command']?.monthlyId,
            icon: <Zap className="text-violet-400" size={24} />,
            color: "violet",
            accent: "from-violet-500 to-fuchsia-600",
            shadowColor: "shadow-violet-900/20",
            iconColor: "text-violet-400",
            highlight: true,
            idealFor: "Principals & Building Admin",
            value: "Total building stability oversight",
            features: [
                "14-Day Free Trial Included",
                "Classroom Obs Synthesizer",
                "Staff Retention Analytics",
                "Automated SPED Compliance",
                "Building ROI Dashboard"
            ]
        },
        {
            name: "Sovereign District",
            price: "Custom",
            priceId: null,
            icon: <Crown className="text-amber-400" size={24} />,
            color: "amber",
            accent: "from-amber-500 to-orange-600",
            shadowColor: "shadow-amber-900/20",
            iconColor: "text-amber-400",
            idealFor: "Superintendents & Boards",
            value: "System-wide data sovereignty",
            features: [
                "Board Transparency Portal",
                "Custom Policy Ingestion",
                "Direct API Access",
                "Full SSO/Active Directory"
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
        <div className="w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-md animate-pulse">
                    <Star size={12} fill="currentColor" /> 14-Day Sovereign Trial Active
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                    <Sparkles size={12} /> ROI Capture Protocol
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 relative z-10">
                    Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Value</span>
                </h2>

                <p className="text-zinc-400 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed relative z-10">
                    Invest in clarity. Our pricing structure is engineered to recapture lost administrative hours and ensure sovereign legal protection from day one.
                </p>

                {/* Toggle */}
                <div className="mt-10 inline-flex p-1.5 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl relative z-10 shadow-2xl">
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${!isAnnual ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Monthly Sync
                    </button>
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${isAnnual ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Annual Nexus <span className="ml-2 text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white">-20%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
            >
                {tiers.map((tier, idx) => (
                    <motion.div
                        key={idx}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "backOut" } }
                        }}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className={`relative p-1 rounded-[2.5rem] transition-all duration-500 group ${tier.highlight ? 'z-10' : ''}`}
                    >
                        {/* Card Glow/Border Gradient */}
                        <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-b ${tier.highlight ? tier.accent : 'from-zinc-800 to-zinc-950'} opacity-100`} />

                        {/* Inner Card Content */}
                        <div className="relative h-full bg-zinc-950 rounded-[2.4rem] p-8 flex flex-col overflow-hidden">
                            {/* Top Highlight Badge */}
                            {tier.highlight && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
                            )}

                            {/* Header */}
                            <div className="mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl ${tier.shadowColor}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">{tier.name}</h3>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2">{tier.idealFor}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-8 pb-8 border-b border-zinc-900">
                                <div className="flex items-baseline gap-1">
                                    {typeof tier.price === 'number' && <span className="text-2xl font-bold text-zinc-500">$</span>}
                                    <span className={`text-6xl font-black tracking-tighter text-white`}>
                                        {typeof tier.price === 'number' ? tier.price : tier.price}
                                    </span>
                                    {typeof tier.price === 'number' && <span className="text-sm font-bold text-zinc-600 uppercase tracking-widest">/ Mo</span>}
                                </div>
                                <p className="mt-4 text-[11px] text-zinc-400 font-medium leading-relaxed border-l-2 border-zinc-800 pl-3">
                                    "{tier.value}"
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.features.map((feat, fidx) => (
                                    <li key={fidx} className="flex items-start gap-3 text-sm text-zinc-300 font-medium">
                                        <Check size={16} className={`${tier.iconColor} mt-0.5 shrink-0`} />
                                        <span className="leading-tight">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button */}
                            <button
                                disabled={isPending}
                                onClick={() => {
                                    if (tier.price === 'Custom') {
                                        window.location.href = 'mailto:sales@edintel.ai?subject=Sovereign%20District%20Inquiry';
                                    } else if (tier.price === 'Free') {
                                        window.location.href = '/signup';
                                    } else {
                                        startTransition(() => {
                                            // Use priceId if matched from Firestore, otherwise fallback to name lookup
                                            createCheckoutSession(tier.priceId || tier.name, isAnnual);
                                        });
                                    }
                                }}
                                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] ${tier.highlight
                                    ? `bg-gradient-to-r ${tier.accent} text-white shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60`
                                    : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700'} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {tier.price === 'Custom' ? 'Contact Protocol' : tier.price === 'Free' ? 'Initialize Node' : (
                                    <span className="flex items-center gap-2">
                                        {isPending ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Initializing...
                                            </>
                                        ) : (
                                            <>
                                                <Shield size={12} className="text-emerald-400" /> Secure Invoice
                                            </>
                                        )}
                                    </span>
                                )} {tier.price !== 'Custom' && !isPending && <ArrowRight size={14} />}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Grid: Tokens & Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
                {/* Token Economy */}
                <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                        <InfinityIcon size={120} className="text-amber-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Database size={20} /></div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Token Economy</h3>
                        </div>
                        <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                            Fuel high-compute operations like bulk audits and avatar synthesis. Tokens never expire.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-500 font-bold text-xs">1K</div>
                                    <div>
                                        <div className="text-sm font-bold text-white uppercase">Standard Pack</div>
                                        <div className="text-[10px] text-zinc-500">Starter Fuel</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-black text-white">$9.99</span>
                                    <button
                                        disabled={isPending}
                                        onClick={() => startTransition(() => createCheckoutSession('STRIPE_PRICE_TOKEN_1K', false, 'payment'))}
                                        className="p-2 bg-amber-600 rounded-lg text-white hover:bg-amber-500 transition-colors disabled:opacity-50"
                                    >
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-zinc-800/50 relative">
                                <div className="absolute -top-2 left-6 px-2 py-0.5 bg-amber-500 text-black text-[9px] font-black uppercase rounded-full">Best Value</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xs">5K</div>
                                    <div>
                                        <div className="text-sm font-bold text-white uppercase">Sovereign Pack</div>
                                        <div className="text-[10px] text-zinc-500">Bulk Operations</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-black text-white">$39.99</span>
                                    <button
                                        disabled={isPending}
                                        onClick={() => startTransition(() => createCheckoutSession('STRIPE_PRICE_TOKEN_5K', false, 'payment'))}
                                        className="p-2 bg-amber-600 rounded-lg text-white hover:bg-amber-500 transition-colors disabled:opacity-50"
                                    >
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">10K</div>
                                    <div>
                                        <div className="text-sm font-bold text-white uppercase">Director Pack</div>
                                        <div className="text-[10px] text-zinc-500">District Scale</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-black text-white">$69.99</span>
                                    <button
                                        disabled={isPending}
                                        onClick={() => startTransition(() => createCheckoutSession('STRIPE_PRICE_TOKEN_10K', false, 'payment'))}
                                        className="p-2 bg-amber-600 rounded-lg text-white hover:bg-amber-500 transition-colors disabled:opacity-50"
                                    >
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Professional Services */}
                <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Crown size={20} /></div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Strategic Services</h3>
                    </div>
                    <div className="space-y-3">
                        {additionalRates.map((rate, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-zinc-800 cursor-default">
                                <div>
                                    <p className="text-xs font-bold text-zinc-300 uppercase">{rate.service}</p>
                                    <p className="text-[10px] text-zinc-600 font-mono">{rate.deliverable}</p>
                                </div>
                                <span className="text-sm font-black text-blue-400">{rate.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
