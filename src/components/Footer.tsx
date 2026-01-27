import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">
              E
            </div>
            <span className="text-sm font-medium">EDINTEL SOVEREIGN</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Protocol
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Data Governance
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-mono">
            © 2024 EdIntel Systems. Mobile, AL.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-xs text-muted-foreground/60 font-mono">
            LATENCY_SYNCED // NODE_STATUS: OPERATIONAL // ENCRYPTION: AES-256
          </p>
        </motion.div>
      </div>
    </footer>
  );
};