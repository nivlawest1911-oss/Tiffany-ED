'use client';
import { motion } from 'framer-motion';
import { Landmark, FileText, BarChart3, Rocket, Fingerprint } from 'lucide-react';

export default function LegislativeSimulator() {
  return (
    <div className="relative p-12 bg-[#020202] rounded-[4rem] border border-white/10 overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,_rgba(59,130,246,0.1),_transparent)]" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-blue-600 rounded-3xl">
              <Landmark className="text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Legislative <span className="text-blue-500">Oracle</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest">SIMULATING POLICY IMPACT FOR STATE OF ALABAMA</p>
            </div>
          </div>
          <div className="flex gap-2 font-mono text-[10px]">
            <span className="px-3 py-1 bg-white/5 rounded-full text-blue-400 border border-blue-500/20">CONFIDENCE: 98.2%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
              <h4 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} /> Draft Grant Proposal: Literacy Act 2026
              </h4>
              <div className="space-y-3">
                <div className="h-2 w-full bg-blue-500/20 rounded-full overflow-hidden">
                  <motion.div animate={{ width: '90%' }} className="h-full bg-blue-500" />
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                  "AI has identified $4.2M in unclaimed federal restorative funding based on Mobile County's specific suspension reduction metrics."
                </p>
              </div>
            </div>
            <button className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all">
              Execute Grant Fetch
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-10 rounded-[3rem] border border-blue-500/10">
            <div className="flex justify-between mb-8">
               <span className="text-[10px] font-mono text-blue-400">CAUSAL IMPACT PROJECTION</span>
               <BarChart3 size={18} className="text-blue-500" />
            </div>
            <div className="flex items-end gap-2 h-32 mb-8">
               {[40, 60, 45, 90, 85, 100].map((h, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ height: 0 }} 
                   animate={{ height: `${h}%` }} 
                   className="flex-1 bg-blue-500/40 rounded-t-lg border-t border-blue-400" 
                 />
               ))}
            </div>
            <div className="text-center">
               <span className="text-3xl font-black">+$112M</span>
               <p className="text-[10px] text-gray-500 uppercase mt-1">20-Year Alabama GDP Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
