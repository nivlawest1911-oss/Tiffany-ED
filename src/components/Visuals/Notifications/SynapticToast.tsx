'use client';
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  message?: string;
  type?: 'success' | 'info' | 'alert';
  duration?: number;
}

export default function SynapticToast({ message = "", type = "success", duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-blue-500/30 px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]"
      >
        <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
        <span className="text-sm font-light tracking-wider text-blue-100 uppercase">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
