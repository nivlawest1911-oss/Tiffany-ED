'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Sparkles, Star, Crown, GraduationCap, Briefcase, Building } from 'lucide-react';
import { EdIntel_TIERS } from '@/lib/pricing-config';

// Icon mapping
const IconMap: Record<string, any> = {
    Building: Building,
    Crown: Crown,
    Briefcase: Briefcase,
    GraduationCap: GraduationCap,
    Star: Star,
    Sparkles: Sparkles
};

export default function PricingSection() {
    return (
        <section id="pricing" className="px-4 py-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
                    Institutional <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#B8860B] bg-clip-text text-transparent">Tiers</span>
                </h2>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em] max-w-2xl mx-auto">
                    Strategic Investment for Global Educational Intelligence
                </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EdIntel_TIERS.map((tier, index) => {
                    const Icon = IconMap[tier.icon] || Star;
                    const isSiteCommand = tier.name === 'Site Command';

                    return (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`glass-panel rounded-3xl p-8 flex flex-col relative overflow-hidden transition-all duration-300 border border-white/10 ${tier.popular
                                ? 'border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37]/30'
                                : 'hover:border-white/20'
                                }`}
                        >
                            {/* Glow effect for Site Command */}
                            {isSiteCommand && (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                            )}

                            {/* Badge */}
                            <div className="relative z-10 mb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isSiteCommand
                                        ? 'bg-primary/20 text-primary'
                                        : 'bg-muted/50 text-foreground'
                                        }`}>
                                        <Icon size={28} />
                                    </div>
                                    {tier.popular && (
                                        <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full">
                                            Most Robust
                                        </span>
                                    )}
                                </div>

                                {/* Tier Name */}
                                <h3 className={`text-2xl font-black uppercase mb-2 ${isSiteCommand ? 'text-noble-gold' : 'text-white'
                                    }`}>
                                    {tier.name}
                                </h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                                    {tier.idealFor}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="relative z-10 mb-6 pb-6 border-b border-white/10">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-muted-foreground">$</span>
                                    <span className="text-5xl font-black tracking-tighter">
                                        {tier.price}
                                    </span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                                        / mo
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-accent font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles size={12} />
                                    {tier.trialDuration} Protocol
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1 relative z-10">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                        <Check
                                            size={16}
                                            className={`mt-0.5 shrink-0 ${isSiteCommand ? 'text-noble-gold' : 'text-noble-gold/60'
                                                }`}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link href="/signup" className="block relative z-10 w-full">
                                <button
                                    className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${tier.popular
                                        ? 'bg-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'
                                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {tier.price === 0 ? 'Initialize Trial' : 'Ascend to Command'}
                                </button>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
