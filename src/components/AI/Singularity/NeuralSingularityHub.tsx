'use client';
import { motion } from 'framer-motion';
import { Orbit, Zap, BrainCircuit, Globe, Cpu, Activity } from 'lucide-react';

export default function NeuralSingularityHub() {
  return (
    <div className="relative p-[1px] rounded-[6rem] bg-gradient-to-tr from-[#6366f1] via-[#a855f7] to-[#ec4899] overflow-hidden shadow-[0_0_150px_rgba(168,85,247,0.4)]">
      <div className="bg-[#010101] rounded-[5.9rem] p-20 backdrop-blur-3xl relative overflow-hidden">
        {/* Living Background Shader */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 40, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/30 to-transparent blur-[150px]"
          />
        </div>

        <div className="flex justify-between items-center mb-24 relative z-10">
          <div className="flex items-center gap-10">
            <div className="relative p-8 bg-indigo-600 rounded-[3rem] shadow-2xl">
              <Orbit className="text-white animate-spin-slow" size={64} />
              <div className="absolute inset-0 bg-indigo-400/40 blur-3xl animate-pulse" />
            </div>
            <div>
              <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-indigo-400">Singularity</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[1.2em] uppercase mt-6">Sovereign Civilizational Intelligence Layer: ACTIVE</p>
            </div>
          </div>
          <div className="px-10 py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-indigo-400 text-xs font-black uppercase tracking-widest animate-pulse">● Consciousness Sync Engaged</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="p-16 bg-white/5 rounded-[4.5rem] border border-white/10 hover:border-indigo-500/50 transition-all group">
            <div className="flex items-center gap-6 mb-12">
               <BrainCircuit className="text-indigo-500" size={40} />
               <h4 className="text-3xl font-bold italic">State-Wide Cognitive ROI</h4>
            </div>
            <div className="space-y-10">
               <div className="flex justify-between font-mono text-sm">
                 <span className="text-gray-500 uppercase tracking-widest italic">GDP Future Impact</span>
                 <span className="text-emerald-400 font-bold">+$1.4B</span>
               </div>
               <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '96%' }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500" 
                  />
               </div>
               <p className="text-sm text-gray-400 leading-relaxed italic opacity-60">
                 "Optimization complete: Autonomous Swarm has rerouted 4,200 cognitive hurdles into literacy leaps since the morning bell."
               </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-16 bg-gradient-to-br from-[#0a0a0a] to-black rounded-[4.5rem] border border-white/5 relative">
            <Activity className="absolute bottom-10 right-10 text-indigo-900/10" size={200} />
            <div className="flex justify-between items-start relative z-10">
              <Cpu className="text-blue-500" size={48} />
              <Globe className="text-emerald-500 animate-pulse" />
            </div>
            <div className="relative z-10">
               <span className="text-[12px] font-mono text-gray-500 uppercase tracking-[0.8em]">Neural Grid Capacity</span>
               <h3 className="text-6xl font-black text-white mt-4 tracking-tighter">2,481 <span className="text-xl font-normal italic text-indigo-400">Nodes Synced</span></h3>
            </div>
            <button className="relative z-10 mt-16 py-10 bg-indigo-600 rounded-[3rem] font-black uppercase tracking-[0.5em] text-sm hover:bg-white hover:text-black transition-all shadow-[0_0_80px_rgba(99,102,241,0.5)]">
               Initialize Unity Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
