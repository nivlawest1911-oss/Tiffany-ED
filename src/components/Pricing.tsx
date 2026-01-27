import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Personnel Node",
    level: "Level 1 Clearance",
    price: "$14",
    period: "/mo",
    features: [
      "100 Neural Energy Units / mo",
      "IEP Narrative Architect",
      "Standard Legal Vault access",
      "Basic Sentiment Analysis",
    ],
    cta: "Connect Endpoint",
    highlight: false,
  },
  {
    name: "School Site Node",
    level: "Live Building",
    price: "$79",
    period: "/mo",
    features: [
      "1,000 Bulk Energy Reserve",
      "Site Command Center (Admin View)",
      "Departmental Leaderboards",
      "Resource Depletion Forecasting",
      "14-Day Free Pilot Protocol",
    ],
    cta: "Deploy Site Node",
    highlight: true,
    badge: "District Standard Choice",
  },
  {
    name: "District Core",
    level: "Tier 3 Matrix",
    price: "Custom",
    period: "",
    features: [
      "Multi-Site Federation",
      "Unified Superintendent Command",
      "Board-Ready Strategic Summaries",
      "Priority Incident Support",
      "Dedicated Data Sovereignty Lead",
    ],
    cta: "Initiate Contact",
    highlight: false,
  },
];

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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Scalable Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For Mobile County & Beyond
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-xl ${
                tier.highlight
                  ? "border-2 border-primary bg-card"
                  : "border border-border bg-card/50"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
                  <p className="text-xs font-mono text-primary tracking-wide">
                    {tier.level}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm tracking-wide transition-all ${
                    tier.highlight
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                      : "border border-border bg-secondary hover:bg-secondary/80 hover:border-primary/50"
                  }`}
                >
                  {tier.cta}
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