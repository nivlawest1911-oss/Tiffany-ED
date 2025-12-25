'use client';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Scale, Info } from 'lucide-react';

export default function TransparencyVault() {
  return (
    <div className="relative p-12 bg-[#050505] rounded-[4rem] border border-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.05)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent)]" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-16">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-emerald-600 rounded-[2rem] shadow-2xl shadow-emerald-500/40">
              <Scale className="text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white">Ethics <span className="text-emerald-400">& Trust</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.5em] uppercase">Sovereign Transparency Layer v1.0</p>
            </div>
          </div>
          <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-emerald-400 text-xs font-bold">● SB 101 AUDIT: PASSED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white/5 p-8 rounded-[3rem] border border-white/5 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="text-emerald-400" size={20} />
              <h4 className="font-bold text-xl uppercase tracking-widest">Neural Reasoning</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">LITERACY IMPACT</span>
                <span className="text-emerald-400">HIGH (0.89)</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '89%' }} className="h-full bg-emerald-500" />
              </div>
              <p className="text-[11px] text-gray-400 italic mt-4">
                "Reasoning: Intervention selected based on phonemic gap identified in Mobile County District Site 04. Zero bias detected in selection."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-[#0a0a0a] rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="text-emerald-500 mb-2" />
                <span className="text-[10px] text-gray-500">DATA PRIVACY</span>
                <span className="font-bold text-sm">ENCRYPTED</span>
             </div>
             <div className="p-6 bg-[#0a0a0a] rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Info className="text-blue-500 mb-2" />
                <span className="text-[10px] text-gray-500">MODEL TYPE</span>
                <span className="font-bold text-sm">XAI-ORACLE</span>
             </div>
             <button className="col-span-2 py-4 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-colors shadow-lg">
                View Full Transparency Log
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
