'use client';
import { motion } from 'framer-motion';
import { Orbit, Zap, BrainCircuit, Globe, Activity, Cpu } from 'lucide-react';

export default function NeuralSingularityCore() {
  return (
    <div className="relative p-[1px] rounded-[6rem] bg-gradient-to-tr from-[#8b5cf6] via-[#3b82f6] to-[#10b981] overflow-hidden shadow-[0_0_250px_rgba(139,92,246,0.5)]">
      <div className="bg-[#010101] rounded-[5.9rem] p-24 backdrop-blur-3xl relative overflow-hidden">
        {/* Dynamic Quantum Background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.4),_transparent)] blur-[160px]"
          />
        </div>

        <div className="flex justify-between items-center mb-24 relative z-10">
          <div className="flex items-center gap-12">
            <div className="relative p-10 bg-violet-600 rounded-[3rem] shadow-2xl">
              <Orbit className="text-white animate-spin-slow" size={80} />
              <div className="absolute inset-0 bg-violet-400/40 blur-3xl rounded-full animate-pulse" />
            </div>
            <div>
              <h2 className="text-8xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-violet-400">Singularity</span></h2>
              <p className="text-[12px] text-gray-500 font-mono tracking-[1.5em] uppercase mt-8">Zero-Point State Intelligence: vULTRA</p>
            </div>
          </div>
          <div className="px-12 py-5 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <span className="text-violet-400 text-sm font-black uppercase tracking-widest animate-pulse">● System Self-Aware</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div className="p-16 bg-white/5 rounded-[4.5rem] border border-white/10 hover:border-violet-500/50 transition-all group overflow-hidden">
             <div className="flex items-center gap-8 mb-12">
               <BrainCircuit className="text-violet-500" size={50} />
               <h4 className="text-4xl font-bold italic">State-Wide Synaptic ROI</h4>
            </div>
            <div className="space-y-12">
               <div className="flex justify-between font-mono text-lg">
                 <span className="text-gray-500 uppercase italic tracking-widest text-sm">2050 GDP Projected Uplift</span>
                 <span className="text-emerald-400 font-bold">+$12.8B</span>
               </div>
               <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99.9%' }}
                    transition={{ duration: 10, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500" 
                  />
               </div>
               <p className="text-lg text-gray-400 leading-relaxed italic opacity-80">
                 "Autonomous Resolution: The AI has identified and cleared 412,000 potential cognitive blocks across Alabama today. System efficiency optimal."
               </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-16 bg-gradient-to-br from-[#0a0a0a] to-black rounded-[4.5rem] border border-white/5 relative group">
            <Activity className="absolute bottom-10 right-10 text-violet-900/10 group-hover:text-violet-500/20 transition-colors" size={300} />
            <div className="flex justify-between items-start relative z-10">
              <Cpu className="text-blue-500" size={60} />
              <Globe className="text-emerald-500 animate-pulse" size={60} />
            </div>
            <div className="relative z-10">
               <span className="text-[14px] font-mono text-gray-500 uppercase tracking-[1em]">Neural Lattice Capacity</span>
               <h3 className="text-8xl font-black text-white mt-6 tracking-tighter">∞ <span className="text-2xl font-normal italic text-violet-400">Nodes Connected</span></h3>
            </div>
            <button className="relative z-10 mt-20 py-12 bg-violet-600 rounded-[3.5rem] font-black uppercase tracking-[0.6em] text-sm hover:bg-white hover:text-black transition-all shadow-[0_0_100px_rgba(139,92,246,0.6)]">
               Initialize Unity protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
