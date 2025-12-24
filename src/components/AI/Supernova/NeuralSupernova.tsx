'use client';
import { motion } from 'framer-motion';
import { Atom, Zap, BrainCircuit, Waves } from 'lucide-react';

export default function NeuralSupernova() {
  return (
    <div className="relative p-[1px] rounded-[5rem] bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-950 overflow-hidden shadow-[0_0_150px_rgba(6,182,212,0.2)]">
      <div className="bg-[#020202] rounded-[4.9rem] p-16 backdrop-blur-3xl relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        
        <div className="flex justify-between items-center mb-16 relative z-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <Atom className="text-cyan-400 animate-spin-slow" size={64} />
              <div className="absolute inset-0 bg-cyan-400/30 blur-3xl animate-pulse" />
            </div>
            <div>
              <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-cyan-400">Supernova</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.7em] uppercase mt-3">Sub-Atomic Intelligence Tier: ENGAGED</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-8">
            <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 hover:border-cyan-500/50 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <BrainCircuit className="text-cyan-500" />
                <h4 className="text-xl font-bold uppercase tracking-widest italic">Cognitive Velocity</h4>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
                />
              </div>
              <p className="mt-6 text-xs text-gray-500 leading-relaxed">System is auto-calibrating literacy difficulty for MCPSS South Zone. Real-time focus alignment: 98.4%.</p>
            </div>
          </div>

          <div className="relative rounded-[3.5rem] bg-gradient-to-b from-[#0a0a0a] to-black p-10 border border-white/5 overflow-hidden">
             <Waves className="absolute -bottom-10 -right-10 text-cyan-900/10" size={300} />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Neural Acoustic Sync</span>
                   <h3 className="text-3xl font-bold mt-2">Active Focus Frequency: 432Hz</h3>
                </div>
                <button className="mt-12 py-6 bg-cyan-600 rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all shadow-xl shadow-cyan-900/40">
                   Harmonize District
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
