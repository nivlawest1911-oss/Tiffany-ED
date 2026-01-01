'use client';
import { Check, Zap, Shield, Crown, Rocket, Star, ArrowRight, Sparkles, Database, Infinity } from 'lucide-react';
import { useState } from 'react';

export default function PricingMatrix() {
    const [isAnnual, setIsAnnual] = useState(false);

    const tiers = [
        {
            name: "Practitioner",
            price: 49,
            icon: <Rocket className="text-cyan-400" size={24} />,
            color: "cyan",
            accent: "from-cyan-500 to-blue-600",
            idealFor: "Classroom teachers & Specialists",
            value: "Personal burnout neutralization",
            features: [
                "IEP Narrative Smart-Draft",
                "Sovereign Legal Vault Access",
                "1,000 Monthly Neural Tokens",
                "Science of Reading Tutor"
            ]
        },
        {
            name: "Site Command",
            subtitle: "Most Popular",
            price: 79,
            icon: <Zap className="text-violet-400" size={24} />,
            color: "violet",
            accent: "from-violet-500 to-fuchsia-600",
            highlight: true,
            idealFor: "Principals & Building Admin",
            value: "Total building stability oversight",
            features: [
                "Classroom Obs Synthesizer",
                "Staff Retention Analytics",
                "Automated SPED Compliance",
                "Building ROI Dashboard"
            ]
        },
        {
            name: "Sovereign District",
            price: "Custom",
            icon: <Crown className="text-amber-400" size={24} />,
            color: "amber",
            accent: "from-amber-500 to-orange-600",
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
        { service: "Onsite Full-Day", price: "$6,500", deliverable: "Implementation & Staff Overhaul" },
        { service: "Virtual Masterclass", price: "$1,500", deliverable: "90-min Rapid Tool Deployment" },
        { service: "Keynote Address", price: "$10,000", deliverable: "High-Impact Visionary Address" }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {tiers.map((tier, idx) => (
                    <div
                        key={idx}
                        className={`relative p-1 rounded-[2.5rem] transition-all duration-500 group ${tier.highlight ? 'scale-105 z-10' : 'hover:-translate-y-2'}`}
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
                                <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-${tier.color}-900/20`}>
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
                                        {typeof tier.price === 'number' ? (isAnnual ? Math.round(tier.price * 0.8) : tier.price) : tier.price}
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
                                        <Check size={16} className={`text-${tier.color}-400 mt-0.5 shrink-0`} />
                                        <span className="leading-tight">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button */}
                            <button
                                onClick={() => {
                                    if (tier.price === 'Custom') {
                                        window.location.href = 'mailto:sales@edintel.ai?subject=Sovereign%20District%20Inquiry';
                                    } else {
                                        // TEMPORARY: Direct Purchase Inquiry to ensure payment capture until Stripe links are provided.
                                        // User: Replace these with your actual Stripe Payment Links (e.g., https://buy.stripe.com/...)
                                        const subject = `Purchase Inquiry: ${tier.name} (${isAnnual ? 'Annual' : 'Monthly'})`;
                                        const body = `I am interested in subscribing to the ${tier.name} plan. Please send me a secure payment invoice.`;
                                        window.location.href = `mailto:sales@edintel.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                    }
                                }}
                                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 ${tier.highlight
                                    ? `bg-gradient-to-r ${tier.accent} text-white shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60`
                                    : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700'}`}>
                                {tier.price === 'Custom' ? 'Contact Protocol' : 'Initialize Pilot'} <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Grid: Tokens & Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
                {/* Token Economy */}
                <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                        <Infinity size={120} className="text-amber-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Database size={20} /></div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Token Economy</h3>
                        </div>
                        <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                            Fuel high-compute operations like bulk audits and avatar synthesis. Tokens never expire.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="px-5 py-3 rounded-xl bg-black border border-zinc-800 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-white">$9.99</span>
                                <span className="text-[10px] font-bold text-zinc-600 uppercase">/ 1k Tokens</span>
                            </div>
                            <button className="text-xs font-black text-amber-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                                Access Fuel <ArrowRight size={12} />
                            </button>
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
