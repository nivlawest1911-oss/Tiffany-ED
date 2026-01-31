import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SOVEREIGN_TIERS } from '@/lib/pricing-config';

export const Pricing = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest mb-4 block">
            SITE PROVISIONING
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Scalable Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
            "Direct neural integration for district-wide sovereignty."
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SOVEREIGN_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 border ${tier.popular
                ? "border-2 border-primary bg-card shadow-2xl shadow-primary/20 scale-105 z-10"
                : "border border-border bg-card/50 hover:border-primary/50"
                }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black mb-1 uppercase italic tracking-tighter text-white">{tier.name}</h3>
                  <p className="text-[10px] font-mono text-primary tracking-[0.2em] uppercase">
                    {tier.idealFor}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">${tier.price}</span>
                  <span className="text-muted-foreground text-xs uppercase tracking-widest">/mo</span>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 mb-8 italic leading-relaxed">"{tier.description}"</p>

                {/* Features */}
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.stripeLink}
                  className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${tier.popular
                    ? "bg-primary text-primary-foreground hover:shadow-xl hover:bg-white hover:text-black"
                    : "border border-border bg-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    }`}
                >
                  {tier.price === 0 ? "Start Free" : "Deploy Node"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};