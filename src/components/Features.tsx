import { motion } from "framer-motion";
import { Brain, Shield, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Gemini Brain",
    description:
      "Superior reasoning for complex IEP narratives and state compliance audits. Next-gen contextual awareness.",
  },
  {
    icon: Shield,
    title: "Sovereign Router",
    description:
      "Proprietary data pathways keeping institutional intelligence within your building. Zero-leak protocol.",
  },
  {
    icon: Zap,
    title: "Energy Economy",
    description:
      "Predictable site-based resource management with real-time depletion forecasting. Title I Optimized.",
  },
  {
    icon: Lock,
    title: "Legal Vault",
    description:
      "FERPA-saturated storage for all strategic narratives and sensitive data logs. AES-256 Hardened.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-widest mb-4 block">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Neural Grid
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multi-Layered Intelligence Stack authorized for Alabama Districts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative"
            >
              <div className="border-gradient rounded-xl p-6 bg-card/50 backdrop-blur-sm h-full transition-all hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};