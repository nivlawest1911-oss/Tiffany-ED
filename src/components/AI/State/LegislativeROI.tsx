'use client';
import { motion } from 'framer-motion';
import { Database, ShieldAlert, TrendingDown, PlayCircle } from 'lucide-react';

export default function LegislativeROI() {
  return (
    <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 overflow-hidden shadow-2xl">
      <div className="bg-black/95 rounded-[2.9rem] p-12 backdrop-blur-3xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter text-white">ALABAMA <span className="text-emerald-400">ROI</span></h2>
            <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-[0.3em]">Autonomous Legislative Auditor v8.1</p>
          </div>
          <div className="h-16 w-16 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/10">
            <Database className="text-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-6 bg-[#0a0a0a] rounded-3xl border border-white/5">
              <span className="text-xs text-gray-500 uppercase">Suspension Deflection</span>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-4xl font-bold">1,402</span>
                <span className="text-emerald-400 text-sm font-bold mb-1">▼ 92%</span>
              </div>
            </div>
            <div className="p-6 bg-[#0a0a0a] rounded-3xl border border-white/5">
              <span className="text-xs text-gray-500 uppercase">Taxpayer Savings (Est.)</span>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-4xl font-bold text-white">$2.4M</span>
                <TrendingDown className="text-emerald-400 mb-1" />
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#050505]">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <PlayCircle size={60} className="text-white opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-8 mt-24">
              <span className="text-[10px] bg-emerald-500 text-black font-black px-2 py-1 rounded">AI BRIEFING</span>
              <h4 className="text-xl font-bold mt-4 leading-tight">Senator Briefing: Mobile County Literacy Gains</h4>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
