'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuccessBadge() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('session_id')) {
      setShow(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShow(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="fixed top-5 right-5 z-[100] bg-gradient-to-br from-emerald-500 to-green-700 text-white p-4 pr-6 rounded-2xl shadow-xl shadow-emerald-900/20 border border-white/20 flex items-center gap-3"
      >
        <span className="text-2xl">⚡</span>
        <div>
          <div className="font-bold text-sm">Professional Tier Active</div>
          <div className="text-[10px] opacity-90 font-mono tracking-tight uppercase">Global Strategic Suite Enabled</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
