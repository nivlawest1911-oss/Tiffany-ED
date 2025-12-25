'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const notifications = [
  { id: 1, message: "Literacy breakthrough: Prichard Preparatory", icon: Sparkles, color: "text-blue-400" },
  { id: 2, message: "Aerospace readiness +0.5% in Mobile North", icon: Zap, color: "text-purple-400" },
  { id: 3, message: "Restorative Pivot successful at Site 12", icon: TrendingUp, color: "text-emerald-400" }
];

export default function SynapticToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = notifications[index];

  return (
    <div className="fixed top-6 right-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="glass-card p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-blue-500 min-w-[300px]"
          >
            <div className={`p-2 bg-white/5 rounded-lg ${current.color}`}>
              <current.icon size={20} className="synaptic-pulse" />
            </div>
            <p className="text-xs font-bold tracking-tight uppercase italic">{current.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
