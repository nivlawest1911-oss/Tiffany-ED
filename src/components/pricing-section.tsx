"use client"

import { Check, Shield as LucideShield, Star, Sparkles, GraduationCap, Building, Crown, Briefcase, Users } from "lucide-react"
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

export function PricingSection() {
  const tiers = EdIntel_TIERS;

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
          <h2 className="font-black tracking-tighter text-5xl md:text-7xl mb-4 text-white uppercase italic">
            Professional <span className="text-gold-gradient">Value</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">
            "Invest in clarity. Our pricing structure is engineered to recapture lost administrative hours and ensure
            strategic legal protection from day one."
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier) => {
            const Icon = IconMap[tier.icon] || LucideShield;
            const isHighlighted = tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative p-8 rounded-[2rem] transition-all duration-500 border overflow-hidden flex flex-col ${isHighlighted
                  ? "bg-intel-gold/5 border-intel-gold/40 shadow-2xl scale-105 z-10"
                  : "glass-card border-white/5 hover:border-intel-gold/30 hover:scale-[1.02]"
                  }`}
              >
                {/* Kente Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red opacity-30" />

                {tier.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${isHighlighted ? "bg-intel-gold text-black" : "bg-white/10 text-white"
                    }`}>
                    {tier.badge}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isHighlighted ? 'bg-intel-gold text-black' : 'bg-white/5 text-zinc-500'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-xl uppercase tracking-tighter italic">{tier.name}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{tier.idealFor}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">${tier.price}</span>
                    <span className="text-zinc-500 text-sm uppercase tracking-widest">/mo</span>
                  </div>
                  <p className="text-xs text-[#10b981] font-bold mt-2 uppercase tracking-wide italic">30-day Free Trial Included</p>
                </div>

                <p className="text-sm text-zinc-400 mb-8 italic flex-grow">"{tier.description}"</p>

                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 group/item">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className={`w-3 h-3 ${isHighlighted ? 'text-intel-gold' : 'text-zinc-600'}`} />
                      </div>
                      <span className="text-zinc-300 text-sm leading-tight group-hover/item:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.stripeLink}
                  className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${isHighlighted ? "bg-intel-gold text-black shadow-lg shadow-intel-gold/20" : "bg-white/5 text-white border border-white/10 hover:border-intel-gold hover:text-intel-gold"
                    }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {tier.price === 0 ? "Start Free" : "Deploy Node"}
                </a>
              </div>
            )
          })}
        </div>

        {/* Quick Comparison Table */}
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] mb-16 overflow-hidden border border-white/5">
          <h3 className="font-black tracking-tighter text-3xl text-white mb-10 text-center uppercase italic">
            Strategic <span className="text-gold-gradient">Comparison</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/5 font-black text-[10px] uppercase tracking-widest text-zinc-500">
                  <th className="text-left py-6">Protocol Tier</th>
                  <th className="text-center py-6">Price</th>
                  <th className="text-center py-6">Cognitive Load</th>
                  <th className="text-center py-6">Legal Vault</th>
                  <th className="text-center py-6">IEP Architect</th>
                  <th className="text-center py-6">Support Status</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {tiers.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                    <td className="py-6 text-white uppercase italic font-black text-lg">{t.name}</td>
                    <td className="py-6 text-center text-intel-gold font-black italic text-xl">${t.price}</td>
                    <td className="py-6 text-center text-zinc-400">{t.price > 50 ? 'Unlimited' : t.price > 0 ? 'High' : 'Basic'}</td>
                    <td className="py-6 text-center text-zinc-400">{t.price > 30 ? 'Full Access' : 'Basic'}</td>
                    <td className="py-6 text-center text-zinc-400">{t.price > 40 ? 'Pro' : t.price > 0 ? 'Standard' : '-'}</td>
                    <td className="py-6 text-center text-zinc-400">{t.price > 60 ? 'Dedicated' : t.price > 40 ? 'Phone' : 'Priority Email'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* District Enterprise Section */}
        <div className="relative p-12 rounded-[3rem] text-center overflow-hidden border border-intel-gold/20 bg-intel-gold/5 group">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Users className="w-12 h-12 text-intel-gold" />
              <h3 className="font-black tracking-tighter text-4xl text-white uppercase italic">
                District & Enterprise Solutions
              </h3>
            </div>
            <p className="text-zinc-400 max-w-3xl mx-auto mb-10 text-xl italic leading-relaxed">
              "Need to equip your entire district? We offer custom enterprise pricing with volume discounts, dedicated
              training, and white-glove onboarding for Mobile County Public Schools and Alabama districts."
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {['Alabama Achieves Aligned', 'MCPSS Policy Integration', 'ALSDE Compliant', 'FERPA Secure'].map((pill) => (
                <div key={pill} className="px-6 py-3 bg-black/40 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">
                  <Check className="w-4 h-4 inline mr-2 text-intel-gold" />
                  {pill}
                </div>
              ))}
            </div>
            <a
              href="mailto:enterprise@edintel.ai?subject=District%20Enterprise%20Inquiry"
              className="inline-flex items-center gap-3 px-12 py-5 bg-intel-gold text-black font-black uppercase tracking-[0.2em] text-[12px] rounded-2xl hover:bg-white transition-all shadow-xl shadow-intel-gold/10"
            >
              <Building className="w-5 h-5" />
              Contact Enterprise Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
