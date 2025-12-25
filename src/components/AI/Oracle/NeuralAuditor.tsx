'use client';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function NeuralAuditor() {
  return (
    <div className="relative p-12 bg-[#020202] rounded-[4rem] border border-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.05)] overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-600 rounded-3xl shadow-lg shadow-emerald-900/40">
              <Eye className="text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Sovereign <span className="text-emerald-500">Auditor</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Autonomous Alignment Monitoring: ACTIVE</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-emerald-400">99.9% ACCURACY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-700" />
              <ShieldCheck className="text-emerald-500 mb-4" />
              <h4 className="text-xl font-bold mb-2">Legislative Compliance</h4>
              <p className="text-xs text-gray-500">Auditing 4,200 real-time interactions against Alabama SB 101 standards.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/20 to-transparent p-8 rounded-3xl border border-emerald-500/10">
             <div className="flex justify-between mb-4">
                <span className="text-[10px] uppercase font-mono text-emerald-500">Neural Health Monitor</span>
                <Globe size={14} className="text-emerald-500" />
             </div>
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 100}%` }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-emerald-500/50"
                    />
                  </div>
                ))}
             </div>
             <p className="mt-6 text-[10px] text-gray-600 leading-relaxed italic">
               "The Recursive Auditor has optimized the 'Restorative Pivot' logic for Mobile County South. Success rate increased by 4.2%."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
