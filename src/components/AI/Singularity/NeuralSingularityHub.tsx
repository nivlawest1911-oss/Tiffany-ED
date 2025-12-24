'use client';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, ShieldCheck, Share2 } from 'lucide-react';

export default function NeuralSingularityHub() {
  return (
    <div className="relative p-1 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 rounded-[5rem] shadow-[0_0_150px_rgba(99,102,241,0.2)]">
      <div className="bg-[#020202] rounded-[4.9rem] p-16 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="flex justify-between items-center mb-16 relative z-10">
          <div className="flex items-center gap-8">
            <div className="relative p-6 bg-indigo-600 rounded-[2.5rem] shadow-2xl">
              <Cpu className="text-white animate-spin-slow" size={48} />
              <div className="absolute inset-0 bg-indigo-400/40 blur-3xl animate-pulse" />
            </div>
            <div>
              <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-indigo-400">Singularity</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.8em] uppercase mt-4">Autonomous State Intelligence Layer: v9.0</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="p-10 bg-white/5 rounded-[4rem] border border-white/10 hover:border-indigo-500/50 transition-all group">
            <div className="flex items-center gap-4 mb-8">
              <Activity className="text-indigo-400" />
              <h4 className="text-xl font-bold uppercase tracking-widest italic text-white">Statewide Pulse</h4>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500">
                    <span>NODE MCPSS-0{i}</span>
                    <span className="text-indigo-400">SYNCING...</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${60 + Math.random() * 40}%` }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-indigo-500" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-black p-10 rounded-[4rem] border border-white/5 flex flex-col justify-between">
             <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Autonomous ROI Projection</span>
                <h3 className="text-4xl font-black mt-4 text-white">$2.8B <span className="text-sm font-normal text-gray-500 italic">Projected GDP Impact</span></h3>
             </div>
             <div className="flex gap-4 mt-12">
                <button className="flex-1 py-6 bg-indigo-600 rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all">
                   Initialize Swarm
                </button>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                   <Share2 size={24} className="text-white" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
