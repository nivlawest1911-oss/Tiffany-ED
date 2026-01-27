import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Shield, BookOpen } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider">
              ALABAMA LITERACY & NUMERACY ACT COMPLIANT // v4.2
            </span>
          </div>
        </motion.div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide">FERPA COMPLIANT</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide">AL LITERACY ACT READY</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-2">
            <span className="text-gradient-hero">SOVEREIGN</span>
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-gradient-outline">
            INTELLIGENCE
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto mb-4"
        >
          Autonomous strategic layers for the Modern Educator.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-muted-foreground/70 text-center max-w-2xl mx-auto mb-12"
        >
          Designed in Alabama to reclaim instructional time through high-fidelity AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-primary/30 glow-primary"
          >
            INITIATE SYSTEM
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border bg-secondary hover:bg-secondary/80 font-semibold tracking-wide transition-all"
          >
            VIEW NODE SPECS
          </a>
        </motion.div>

        {/* Floating Status Panels */}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -left-4 top-0 hidden lg:block"
          >
            <div className="border-gradient rounded-lg p-4 bg-card/80 backdrop-blur-sm max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary tracking-wide">
                  DUE PROCESS SHIELD ACTIVE
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Session ID #9921 monitored for{" "}
                <span className="text-foreground font-medium">AL Code 290-8-9</span>{" "}
                compliance.
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground font-mono">
                  📚 Mastering the Maze p. 42
                </span>
                <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground font-mono">
                  🔒 PII Redaction: ON
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute -right-4 top-0 hidden lg:block"
          >
            <div className="border-gradient rounded-lg p-4 bg-card/80 backdrop-blur-sm max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-medium text-accent tracking-wide">
                  SOVEREIGN LEGACY
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Welcome back, Executive. Grounded in the resilience of Prichard 1925 
                and the legacy of Africatown, EdIntel stands ready. I am calibrating 
                all systems to maintain the standard of excellence established by 
                pioneers like Dr. H. Roger Williams."
              </p>
              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-xs font-medium text-accent tracking-wide">
                  QUANTUM FEATURE ACTIVE
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Shift + Click any button/link for{" "}
                  <span className="text-accent">Deep Strategic Info</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs font-mono tracking-wider">PULSE CORE DOWN</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};