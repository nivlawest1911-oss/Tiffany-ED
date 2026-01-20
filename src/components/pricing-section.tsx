"use client"

import { useState } from "react"
import { Check, Shield as LucideShield, Star, Sparkles, GraduationCap, Building, Crown, Briefcase, Users } from "lucide-react"

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const tiers = [
    {
      name: "PROFESSIONAL INITIATE",
      subtitle: "OBSERVERS & NEW USERS",
      price: "0",
      priceNote: "/mo",
      trial: null,
      icon: LucideShield,
      color: "#00d2ff",
      stripeLink: "#",
      features: [
        "Basic Dashboard Access",
        "Community Resources",
        "5 AI Queries/month",
        "Email Support",
        "Legal Vault Preview",
      ],
      cta: "Start Free",
      highlighted: false,
      badge: "FREE FOREVER",
    },
    {
      name: "STANDARD PACK",
      subtitle: "GETTING STARTED",
      price: billingPeriod === "monthly" ? "9.99" : "7.99",
      priceNote: "/mo",
      trial: "30-day free trial",
      icon: Star,
      color: "#8b5cf6",
      stripeLink: "https://buy.stripe.com/standard",
      features: [
        "25 AI Queries/month",
        "Basic IEP Templates",
        "Email Generator Access",
        "Community Support",
        "Mobile App Access",
      ],
      cta: "Start Free Trial",
      highlighted: false,
      badge: null,
    },
    {
      name: "PROFESSIONAL PACK",
      subtitle: "INDIVIDUAL EDUCATORS",
      price: billingPeriod === "monthly" ? "39.99" : "31.99",
      priceNote: "/mo",
      trial: "30-day free trial",
      icon: Crown,
      color: "#d4af37",
      stripeLink: "https://buy.stripe.com/professional",
      features: [
        "Unlimited AI Generators",
        "Full Legal Vault Access",
        "Personal Burnout Shield",
        "Priority Email Support",
        "Alabama Resource Library",
        "Cognitive Coach Access",
      ],
      cta: "Start Free Trial",
      highlighted: false,
      badge: "BEST VALUE",
    },
    {
      name: "PRACTITIONER",
      subtitle: "CLASSROOM TEACHERS & SPECIALISTS",
      price: billingPeriod === "monthly" ? "49.99" : "39.99",
      priceNote: "/mo",
      trial: "30-day free trial",
      icon: GraduationCap,
      color: "#10b981",
      stripeLink: "https://buy.stripe.com/practitioner",
      features: [
        "Everything in Professional Pack",
        "IEP Architect Full Access",
        "Lesson Plan Generator Pro",
        "Policy Advisor AI",
        "Professional Development Hub",
        "Phone Support Access",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      badge: "MOST POPULAR",
    },
    {
      name: "DIRECTOR PACK",
      subtitle: "DEPARTMENT HEADS & COORDINATORS",
      price: billingPeriod === "monthly" ? "69.99" : "55.99",
      priceNote: "/mo",
      trial: "30-day free trial",
      icon: Briefcase,
      color: "#f59e0b",
      stripeLink: "https://buy.stripe.com/director",
      features: [
        "Everything in Practitioner",
        "Leadership Intelligence Suite",
        "Team Analytics Dashboard",
        "Executive Protocol Generator",
        "Staff Sentiment Tracking",
        "Compliance Audit Tools",
      ],
      cta: "Start Free Trial",
      highlighted: false,
      badge: null,
    },
    {
      name: "SITE COMMAND",
      subtitle: "PRINCIPALS & BUILDING ADMIN",
      price: billingPeriod === "monthly" ? "79.99" : "63.99",
      priceNote: "/mo",
      trial: "30-day free trial",
      icon: Building,
      color: "#ef4444",
      stripeLink: "https://buy.stripe.com/sitecommand",
      features: [
        "Everything in Director Pack",
        "Full School Staff Access",
        "District Integration Ready",
        "Advanced ROI Reporting",
        "Dedicated Account Manager",
        "Custom Training Sessions",
      ],
      cta: "Start Free Trial",
      highlighted: false,
      badge: "ENTERPRISE",
    },
  ]

  return (
    <section id="pricing" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
      {/* Holographic background */}
      <div className="absolute inset-0 holographic opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-sm mb-4">
            <Star className="w-4 h-4 fill-current" />
            30 DAY PROFESSIONAL TRIAL ON ALL PAID PLANS
          </div>
          <h2 className="font-black tracking-tighter text-5xl md:text-7xl mb-4">
            <span className="text-white">PROFESSIONAL</span> <span className="gradient-text">VALUE</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Invest in clarity. Our pricing structure is engineered to recapture lost administrative hours and ensure
            strategic legal protection from day one.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-gray-900/80 border border-gray-800 backdrop-blur-sm">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all touch-target ${billingPeriod === "monthly"
                ? "bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black shadow-lg"
                : "text-gray-400 hover:text-white"
                }`}
            >
              MONTHLY SYNC
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all flex items-center gap-2 touch-target ${billingPeriod === "annual"
                ? "bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black shadow-lg"
                : "text-gray-400 hover:text-white"
                }`}
            >
              ANNUAL NEXUS
              <span className="px-2 py-0.5 bg-[#d4af37] rounded text-xs text-black font-bold">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Comparison Table - Mobile */}
        <div className="md:hidden space-y-4 mb-12">
          {tiers.map((tier) => {
            const Icon = tier.icon
            const isHighlighted = tier.highlighted

            return (
              <div
                key={tier.name}
                className={`relative p-6 rounded-2xl transition-all duration-500 ${isHighlighted ? "glass-card-emerald" : "glass-card"
                  }`}
              >
                {tier.badge && (
                  <div
                    className={`absolute -top-3 left-4 px-3 py-1 text-xs font-bold rounded-full ${tier.badge === "MOST POPULAR"
                      ? "bg-gradient-to-r from-[#10b981] to-[#00d2ff] text-black"
                      : tier.badge === "ENTERPRISE"
                        ? "bg-[#ef4444] text-white"
                        : tier.badge === "BEST VALUE"
                          ? "bg-[#d4af37] text-black"
                          : "bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40"
                      }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tier.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: tier.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{tier.name}</h3>
                      <p className="text-xs text-gray-400">{tier.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-xl">
                      ${tier.price}
                      <span className="text-sm font-normal text-gray-400">{tier.priceNote}</span>
                    </p>
                    {tier.trial && <p className="text-xs text-[#10b981]">{tier.trial}</p>}
                  </div>
                </div>

                <a
                  href={tier.stripeLink}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all flex items-center justify-center gap-2 touch-target ${isHighlighted
                    ? "bg-gradient-to-r from-[#10b981] to-[#00d2ff] text-black"
                    : "border hover:bg-white/5"
                    }`}
                  style={{
                    borderColor: !isHighlighted ? `${tier.color}50` : undefined,
                    color: !isHighlighted ? tier.color : undefined,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  {tier.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* Main Pricing Cards - Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {tiers.map((tier) => {
            const Icon = tier.icon
            const isHighlighted = tier.highlighted

            return (
              <div
                key={tier.name}
                className={`relative p-6 lg:p-8 rounded-3xl transition-all duration-500 ${isHighlighted ? "glass-card-emerald scale-105 z-10" : "glass-card hover:scale-[1.02]"
                  }`}
              >
                {tier.badge && (
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-bold rounded-full shadow-lg whitespace-nowrap ${tier.badge === "MOST POPULAR"
                      ? "bg-gradient-to-r from-[#10b981] to-[#00d2ff] text-black"
                      : tier.badge === "ENTERPRISE"
                        ? "bg-[#ef4444] text-white"
                        : tier.badge === "BEST VALUE"
                          ? "bg-[#d4af37] text-black"
                          : "bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40"
                      }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center pulse-glow`}
                    style={{ backgroundColor: `${tier.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: tier.color }} />
                  </div>
                </div>

                <h3 className="font-black tracking-tighter text-xl text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">{tier.subtitle}</p>

                <div className="mb-6">
                  <p className="text-white">
                    <span className="text-xl align-top">$</span>
                    <span className="text-4xl lg:text-5xl font-black tracking-tighter">{tier.price}</span>
                    <span className="text-gray-400 text-base">{tier.priceNote}</span>
                  </p>
                  {tier.trial && <p className="text-sm text-[#10b981] mt-1">{tier.trial}</p>}
                  {billingPeriod === "annual" && tier.price !== "0" && (
                    <p className="text-xs text-gray-400 mt-1">
                      Save ${(Number.parseFloat(tier.price) * 12 * 0.2).toFixed(0)}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${tier.color}20` }}
                      >
                        <Check className="w-2.5 h-2.5" style={{ color: tier.color }} />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.stripeLink}
                  className={`w-full py-3 lg:py-4 rounded-xl font-bold tracking-wider transition-all flex items-center justify-center gap-2 touch-target text-sm ${isHighlighted
                    ? "bg-gradient-to-r from-[#10b981] to-[#00d2ff] text-black hover:opacity-90 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                    : "border-2 hover:bg-white/5"
                    }`}
                  style={{
                    borderColor: !isHighlighted ? `${tier.color}50` : undefined,
                    color: !isHighlighted ? tier.color : undefined,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  {tier.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* Quick Comparison Table */}
        <div className="glass-card p-6 md:p-8 rounded-3xl mb-16 overflow-x-auto">
          <h3 className="font-black tracking-tighter text-2xl text-white mb-6 text-center">
            Quick <span className="gradient-text">Comparison</span>
          </h3>
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 text-gray-400 font-medium">Plan</th>
                <th className="text-center py-3 text-gray-400 font-medium">Price</th>
                <th className="text-center py-3 text-gray-400 font-medium">AI Queries</th>
                <th className="text-center py-3 text-gray-400 font-medium">Legal Vault</th>
                <th className="text-center py-3 text-gray-400 font-medium">IEP Tools</th>
                <th className="text-center py-3 text-gray-400 font-medium">Support</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 text-white font-medium">Professional Initiate</td>
                <td className="py-3 text-center text-[#00d2ff]">Free</td>
                <td className="py-3 text-center text-gray-400">5/mo</td>
                <td className="py-3 text-center text-gray-400">Preview</td>
                <td className="py-3 text-center text-gray-400">-</td>
                <td className="py-3 text-center text-gray-400">Email</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 text-white font-medium">Standard Pack</td>
                <td className="py-3 text-center text-[#8b5cf6]">$9.99</td>
                <td className="py-3 text-center text-gray-300">25/mo</td>
                <td className="py-3 text-center text-gray-400">Basic</td>
                <td className="py-3 text-center text-gray-300">Templates</td>
                <td className="py-3 text-center text-gray-400">Community</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 text-white font-medium">Professional Pack</td>
                <td className="py-3 text-center text-[#d4af37]">$39.99</td>
                <td className="py-3 text-center text-[#10b981]">Unlimited</td>
                <td className="py-3 text-center text-[#10b981]">Full</td>
                <td className="py-3 text-center text-gray-300">Standard</td>
                <td className="py-3 text-center text-gray-300">Priority Email</td>
              </tr>
              <tr className="border-b border-gray-800/50 bg-[#10b981]/5">
                <td className="py-3 text-white font-bold">Practitioner</td>
                <td className="py-3 text-center text-[#10b981] font-bold">$49.99</td>
                <td className="py-3 text-center text-[#10b981]">Unlimited</td>
                <td className="py-3 text-center text-[#10b981]">Full</td>
                <td className="py-3 text-center text-[#10b981]">Pro</td>
                <td className="py-3 text-center text-[#10b981]">Phone</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 text-white font-medium">Director Pack</td>
                <td className="py-3 text-center text-[#f59e0b]">$69.99</td>
                <td className="py-3 text-center text-[#10b981]">Unlimited</td>
                <td className="py-3 text-center text-[#10b981]">Full</td>
                <td className="py-3 text-center text-[#10b981]">Pro+</td>
                <td className="py-3 text-center text-[#10b981]">Priority</td>
              </tr>
              <tr>
                <td className="py-3 text-white font-medium">Site Command</td>
                <td className="py-3 text-center text-[#ef4444]">$79.99</td>
                <td className="py-3 text-center text-[#10b981]">Unlimited</td>
                <td className="py-3 text-center text-[#10b981]">Full</td>
                <td className="py-3 text-center text-[#10b981]">Enterprise</td>
                <td className="py-3 text-center text-[#10b981]">Dedicated</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* District Enterprise Section */}
        <div className="glass-card-gold p-8 md:p-12 rounded-3xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-[#d4af37]" />
            <h3 className="font-black tracking-tighter text-2xl md:text-3xl text-white">
              District & Enterprise Solutions
            </h3>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6 text-lg">
            Need to equip your entire district? We offer custom enterprise pricing with volume discounts, dedicated
            training, and white-glove onboarding for Mobile County Public Schools and Alabama districts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300">
              <Check className="w-4 h-4 inline mr-2 text-[#10b981]" />
              Alabama Achieves Aligned
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300">
              <Check className="w-4 h-4 inline mr-2 text-[#10b981]" />
              MCPSS Policy Integration
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300">
              <Check className="w-4 h-4 inline mr-2 text-[#10b981]" />
              ALSDE Compliant
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300">
              <Check className="w-4 h-4 inline mr-2 text-[#10b981]" />
              FERPA Secure
            </div>
          </div>
          <a
            href="mailto:enterprise@edintel.ai?subject=District%20Enterprise%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-black font-bold rounded-xl hover:opacity-90 transition-all touch-target"
          >
            <Building className="w-5 h-5" />
            Contact Enterprise Sales
          </a>
        </div>
      </div>
    </section>
  )
}
