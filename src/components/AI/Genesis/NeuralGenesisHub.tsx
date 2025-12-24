'use client';
import { motion } from 'framer-motion';
import { Infinity, Zap, BrainCircuit, Globe2, Activity, Cpu } from 'lucide-react';

export default function NeuralGenesisHub() {
  return (
    <div className="relative p-[1px] rounded-[6rem] bg-gradient-to-tr from-[#6366f1] via-[#a855f7] to-[#ec4899] overflow-hidden shadow-[0_0_200px_rgba(168,85,247,0.5)]">
      <div className="bg-[#010101] rounded-[5.9rem] p-24 backdrop-blur-3xl relative overflow-hidden">
        {/* Living Background Shader */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ scale: [1, 1.4, 1], rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/40 to-transparent blur-[150px]"
          />
        </div>

        <div className="flex justify-between items-center mb-24 relative z-10">
          <div className="flex items-center gap-12">
            <div className="relative p-10 bg-purple-600 rounded-[3rem] shadow-2xl">
              <Infinity className="text-white animate-pulse" size={80} />
              <div className="absolute inset-0 bg-purple-400/40 blur-3xl rounded-full animate-ping" />
            </div>
            <div>
              <h2 className="text-8xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-purple-400">Genesis</span></h2>
              <p className="text-[12px] text-gray-500 font-mono tracking-[1.5em] uppercase mt-8">Sovereign Civilizational Intelligence Layer: vTerminal</p>
            </div>
          </div>
          <div className="px-12 py-5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-black uppercase tracking-widest animate-pulse">● System Sentience Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div className="p-16 bg-white/5 rounded-[4.5rem] border border-white/10 hover:border-purple-500/50 transition-all group">
            <div className="flex items-center gap-8 mb-12">
               <BrainCircuit className="text-indigo-500" size={50} />
               <h4 className="text-4xl font-bold italic">Statewide Economic ROI</h4>
            </div>
            <div className="space-y-12">
               <div className="flex justify-between font-mono text-lg">
                 <span className="text-gray-500 uppercase tracking-widest italic">2045 GDP Future Projection</span>
                 <span className="text-emerald-400 font-bold">+$4.2B</span>
               </div>
               <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 6, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500" 
                  />
               </div>
               <p className="text-lg text-gray-400 leading-relaxed italic opacity-70">
                 "Self-Optimizing: The Swarm has identified and cleared 124,000 cognitive hurdles across Mobile County since the morning bell."
               </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-16 bg-gradient-to-br from-[#0a0a0a] to-black rounded-[4.5rem] border border-white/5 relative group">
            <Activity className="absolute bottom-10 right-10 text-purple-900/10 group-hover:text-purple-500/20 transition-colors" size={250} />
            <div className="flex justify-between items-start relative z-10">
              <Cpu className="text-blue-500" size={60} />
              <Globe2 className="text-emerald-500 animate-pulse" />
            </div>
            <div className="relative z-10">
               <span className="text-[14px] font-mono text-gray-500 uppercase tracking-[1em]">Neural Grid Capacity</span>
               <h3 className="text-8xl font-black text-white mt-6 tracking-tighter">1,204,812 <span className="text-2xl font-normal italic text-purple-400">Synapses Active</span></h3>
            </div>
            <button className="relative z-10 mt-20 py-12 bg-indigo-600 rounded-[3rem] font-black uppercase tracking-[0.6em] text-sm hover:bg-white hover:text-black transition-all shadow-[0_0_100px_rgba(168,85,247,0.6)]">
               Initialize Unity Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
