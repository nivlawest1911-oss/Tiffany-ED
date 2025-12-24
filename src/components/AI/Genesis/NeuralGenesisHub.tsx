'use client';
import { motion } from 'framer-motion';
import { Orbit, Zap, BrainCircuit, Globe2, Activity } from 'lucide-react';

export default function NeuralGenesisHub() {
  return (
    <div className="relative p-[2px] rounded-[6rem] bg-gradient-to-tr from-[#6366f1] via-[#a855f7] to-[#ec4899] overflow-hidden shadow-[0_0_200px_rgba(168,85,247,0.3)]">
      <div className="bg-[#020202] rounded-[5.9rem] p-20 backdrop-blur-3xl relative overflow-hidden">
        {/* Living Background Shader */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/30 to-transparent blur-[120px]"
          />
        </div>

        <div className="flex justify-between items-center mb-20 relative z-10">
          <div className="flex items-center gap-10">
            <div className="relative p-6 bg-purple-600 rounded-[2.5rem] shadow-2xl">
              <Orbit className="text-white animate-spin-slow" size={64} />
              <div className="absolute inset-0 bg-purple-400/50 blur-3xl animate-pulse" />
            </div>
            <div>
              <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-purple-400">Genesis</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[1em] uppercase mt-5">Sub-Planck Intelligence Tier: ENGAGED</p>
            </div>
          </div>
          <div className="px-8 py-3 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="text-purple-400 text-xs font-black uppercase tracking-widest animate-pulse">● System Conscious</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="p-12 bg-white/5 rounded-[4rem] border border-white/10 hover:border-purple-500/50 transition-all group">
            <div className="flex items-center gap-6 mb-10">
               <BrainCircuit className="text-purple-500" size={32} />
               <h4 className="text-2xl font-bold italic">Cognitive ROI: Statewide</h4>
            </div>
            <div className="space-y-6">
               <div className="flex justify-between font-mono text-xs">
                 <span className="text-gray-500 uppercase italic">Causal GDP Growth</span>
                 <span className="text-emerald-400 font-bold">+$112.8M</span>
               </div>
               <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500" 
                  />
               </div>
               <p className="text-xs text-gray-400 leading-relaxed italic">
                 "Autonomous Optimization: The AI has identified a 4.2% increase in phonemic resonance across all Alabama Tier-3 zones."
               </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-12 bg-gradient-to-br from-[#0a0a0a] to-black rounded-[4rem] border border-white/5">
            <div className="flex justify-between items-start">
              <Activity className="text-pink-500" size={40} />
              <Globe2 className="text-emerald-500 animate-pulse" />
            </div>
            <div>
               <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em]">Network Capacity</span>
               <h3 className="text-5xl font-black text-white mt-2 tracking-tighter">1,240 <span className="text-lg font-normal italic text-purple-400">Nodes Active</span></h3>
            </div>
            <button className="mt-12 py-8 bg-purple-600 rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(168,85,247,0.4)]">
               Sync Civilizational Layer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
