'use client';

import React, { useEffect, useState } from 'react';
import { getSovereignStatus } from '@/lib/actions/status';
import { ShieldCheck, Zap, Building2, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusData {
  userName: string;
  organizationName: string;
  trialDaysRemaining: number;
  tokenBalance: number;
}

export default function SovereignStatus() {
  const [data, setData] = useState<StatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const result = await getSovereignStatus();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch sovereign status:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-20 bg-[#111] animate-pulse border-b border-zinc-800 flex items-center px-8">
        <Loader2 className="animate-spin text-zinc-700" size={20} />
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-[#111] border-b border-zinc-800 px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20" />

      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold leading-none mb-1">Delegate</p>
            <h3 className="text-white font-black text-sm tracking-tight">{data.userName}</h3>
          </div>
        </div>

        <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400">
            <Building2 size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold leading-none mb-1">Domain</p>
            <h3 className="text-white font-black text-sm tracking-tight">{data.organizationName}</h3>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <div className="px-4 py-2 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black leading-none mb-0.5">Trial Protocol</p>
            <p className="text-white text-[11px] font-bold">
              {data.trialDaysRemaining} <span className="text-zinc-500">Days Remaining</span>
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-zinc-900/50 border border-amber-500/20 flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-amber-500/50 font-black leading-none mb-0.5">Neural Tokens</p>
            <p className="text-amber-500 text-[11px] font-black drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
              {data.tokenBalance.toLocaleString()} <span className="text-amber-500/30 font-bold ml-1">Live</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
