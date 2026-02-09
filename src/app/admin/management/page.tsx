"use client"

import { Shield, Crown, CreditCard } from "lucide-react"
import Image from "next/image"
import { PRICING_TIERS, FOUNDER_BIO, LEGAL_POLICIES } from "@/lib/edintel-config"

export default function AdminPage() {
    return (
        <div className="space-y-10 p-6 lg:p-8">
            {/* Bio / Profile Section */}
            <div className="flex items-center gap-6 rounded-2xl border border-[#7c3aed]/20 p-6 lg:p-8"
                style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(15,23,42,0.4))" }}
            >
                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-amber-500/40 bg-[#0a0f1a]">
                    <img
                        src={FOUNDER_BIO.image || "/placeholder.svg"}
                        alt={FOUNDER_BIO.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-white">{FOUNDER_BIO.name}</h1>
                        <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-[10px] font-bold text-amber-400">
                            <Crown className="h-3 w-3" /> SOVEREIGN
                        </span>
                    </div>
                    <p className="text-sm text-white/40 max-w-xl">{FOUNDER_BIO.role}</p>
                    <div className="mt-2 flex gap-2">
                        {FOUNDER_BIO.credentials.map((c) => (
                            <span key={c} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/30">
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Tiers */}
            <div>
                <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-white">
                    <CreditCard className="h-5 w-5 text-[#06b6d4]" /> Subscription Management
                </h2>

                <div className="flex gap-4 overflow-x-auto pb-6 snap-x">
                    {PRICING_TIERS.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative flex min-w-[280px] shrink-0 snap-center flex-col rounded-2xl border p-5 ${tier.highlight
                                ? "border-[#7c3aed]/40 bg-[#0a0f1a]/80 shadow-2xl shadow-[#7c3aed]/10"
                                : "border-white/10 bg-white/[0.03]"
                                }`}
                        >
                            {tier.badge && (
                                <span
                                    className="absolute -top-2.5 left-5 rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                                    style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
                                >
                                    {tier.badge}
                                </span>
                            )}
                            <h3 className="text-base font-bold text-white">{tier.name}</h3>
                            <div className="mt-1 mb-3">
                                <span className="text-2xl font-bold text-white/90">{tier.price}</span>
                                <span className="text-xs text-white/30">{tier.period}</span>
                            </div>
                            <p className="mb-4 text-xs text-white/35" style={{ minHeight: 32 }}>
                                {tier.description}
                            </p>
                            <ul className="mb-5 flex-1 space-y-2">
                                {tier.features.map((feat) => (
                                    <li key={feat} className="flex items-start gap-2 text-xs text-white/50">
                                        <span className="text-emerald-400">&#x2713;</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={tier.href}
                                className={`block w-full rounded-lg py-2.5 text-center text-sm font-bold transition-all ${tier.highlight
                                    ? "bg-white text-[#0a0f1a] hover:bg-white/90"
                                    : "bg-white/10 text-white hover:bg-white/15"
                                    }`}
                            >
                                {tier.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legal & Compliance */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                        <Shield className="h-4 w-4 text-emerald-400" /> FERPA Compliance
                    </h3>
                    <p className="text-xs leading-relaxed text-white/35">{LEGAL_POLICIES.ferpa}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                        <Shield className="h-4 w-4 text-[#06b6d4]" /> Privacy Policy
                    </h3>
                    <p className="text-xs leading-relaxed text-white/35">{LEGAL_POLICIES.privacy}</p>
                </div>
            </div>
        </div>
    )
}
