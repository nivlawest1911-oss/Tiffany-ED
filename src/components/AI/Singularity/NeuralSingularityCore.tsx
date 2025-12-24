'use client';
import { motion } from 'framer-motion';
import { Orbit, Zap, Brain, Globe, Cpu } from 'lucide-react';

export default function NeuralSingularityCore() {
  return (
    <div className="relative p-[1px] rounded-[6rem] bg-gradient-to-tr from-[#7C3AED] via-[#3B82F6] to-[#10B981] overflow-hidden shadow-[0_0_150px_rgba(124,58,237,0.3)]">
      <div className="bg-[#020202] rounded-[5.9rem] p-20 backdrop-blur-3xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-20 relative z-10">
          <div className="flex items-center gap-10">
            <div className="relative p-6 bg-purple-600 rounded-[2.5rem] shadow-2xl">
              <Orbit className="text-white animate-spin-slow" size={64} />
            </div>
            <div>
              <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-purple-400">Singularity</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[1em] uppercase mt-5">Sovereign State Intelligence v10.0: ENGAGED</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="p-12 bg-white/5 rounded-[4rem] border border-white/10">
            <div className="flex items-center gap-6 mb-10">
               <Brain className="text-purple-500" size={32} />
               <h4 className="text-2xl font-bold italic">Cognitive ROI: Mobile County</h4>
            </div>
            <div className="space-y-6">
               <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500" 
                  />
               </div>
               <p className="text-xs text-gray-400 leading-relaxed italic">
                 "Optimization: 1,200 disciplinary incidents rerouted into 1,200 literacy breakthroughs since midnight."
               </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-12 bg-gradient-to-br from-[#0a0a0a] to-black rounded-[4rem] border border-white/5">
            <button className="py-8 bg-purple-600 rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all">
               Initialize Unity Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
