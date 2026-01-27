import { motion } from "framer-motion";
import { FileText, Scale, Users, Clock } from "lucide-react";

const policies = [
  {
    icon: FileText,
    title: "Data Sovereignty",
    description: "All district data remains within your institutional boundaries. No third-party training or external access without explicit authorization.",
  },
  {
    icon: Scale,
    title: "Compliance Matrix",
    description: "Pre-mapped to FERPA, COPPA, and Alabama Education Code. Automated audit trails for every interaction.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular permissions from classroom teachers to district superintendents. Every action logged and attributable.",
  },
  {
    icon: Clock,
    title: "Retention Protocol",
    description: "Configurable data lifecycle management. Automatic purging aligned with district retention schedules.",
  },
];

export const Governance = () => {
  return (
    <section id="governance" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 via-transparent to-transparent" />
      
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
            INSTITUTIONAL PROTOCOLS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Governance Framework
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade controls for public education accountability.
          </p>
        </motion.div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex gap-4 p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <policy.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};