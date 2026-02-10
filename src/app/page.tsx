'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LandingPageClient from './LandingPageClient';
import DashboardClient from './DashboardClient';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 flex items-center justify-center mb-6">
            {/* Use a placeholder div or check if EdIntelLogo is importable here. Since it's a client component, careful. 
                 Using a simple branded spinner is safer if EdIntelLogo isn't imported. 
                 Let's Import EdIntelLogo dynamically or just use the same styled divs but gold. */ }
            <div className="absolute inset-0 rounded-full border-t-2 border-noble-gold animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-r-2 border-amber-600 animate-spin animation-delay-200"></div>
            <div className="absolute inset-4 rounded-full border-b-2 border-white animate-spin animation-delay-500"></div>
          </div>
          <p className="text-noble-gold text-xs uppercase tracking-[0.3em] font-black animate-pulse">Initializing EdIntel Core</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {user ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DashboardClient />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPageClient />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
