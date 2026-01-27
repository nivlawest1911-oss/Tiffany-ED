import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-32 relative">
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
            ESTABLISH CONNECTION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Request Deployment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Initiate your district's pilot protocol. Our integration specialists are standing by.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Operator Designation
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Dr. Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Secure Channel (Email)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="jsmith@mobilecounty.k12.al.us"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  District / Organization
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Mobile County Public Schools"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mission Brief
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Describe your district's needs and deployment timeline..."
                />
              </div>

              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                TRANSMIT REQUEST
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="border-gradient rounded-xl p-8 bg-card/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6">Command Coordinates</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Headquarters</p>
                    <p className="text-sm text-muted-foreground">
                      Mobile, Alabama<br />
                      Gulf Coast Command Region
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Secure Channel</p>
                    <p className="text-sm text-muted-foreground">
                      command@edintel.ai
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Direct Line</p>
                    <p className="text-sm text-muted-foreground">
                      (251) EDU-INTEL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-accent/30 bg-accent/5">
              <p className="text-sm text-accent font-medium mb-2">
                ⚡ RAPID DEPLOYMENT AVAILABLE
              </p>
              <p className="text-sm text-muted-foreground">
                Qualified districts can begin pilot integration within 48 hours of authorization.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};