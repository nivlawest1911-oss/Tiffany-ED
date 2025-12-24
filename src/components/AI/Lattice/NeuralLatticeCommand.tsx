'use client';
import { motion } from 'framer-motion';
import { Hexagon, Zap, Cpu, TrendingUp, Globe2 } from 'lucide-react';

export default function NeuralLatticeCommand() {
  return (
    <div className="relative p-[1px] rounded-[5rem] bg-gradient-to-br from-blue-400 via-indigo-600 to-black overflow-hidden shadow-[0_0_200px_rgba(37,99,235,0.2)]">
      <div className="bg-[#010101] rounded-[4.9rem] p-16 backdrop-blur-3xl relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="flex justify-between items-center mb-16 relative z-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <Hexagon className="text-blue-500 animate-spin-slow" size={60} />
              <div className="absolute inset-0 bg-blue-500/40 blur-3xl animate-pulse" />
            </div>
            <div>
              <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-blue-500">Lattice</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.6em] uppercase mt-2">Empire Expansion Protocol: ENGAGED</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3">
              <Globe2 size={16} className="text-blue-400" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Global Reach: Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
          <div className="lg:col-span-2 p-10 bg-gradient-to-br from-[#0a0a0a] to-black rounded-[4rem] border border-white/5 relative group cursor-pointer">
            <div className="flex justify-between items-start mb-8">
               <h3 className="text-2xl font-bold italic">Sovereign GDP Projection</h3>
               <TrendingUp className="text-green-400" />
            </div>
            {/* Visualizing the "Lattice" - High End Graphics */}
            <div className="h-64 w-full relative">
               {[...Array(5)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     opacity: [0.1, 0.3, 0.1],
                     scale: [1, 1.1, 1]
                   }}
                   transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                   className="absolute inset-0 border border-blue-500/10 rounded-full"
                   style={{ margin: `${i * 20}px` }}
                 />
               ))}
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-black text-white tracking-tighter">$1.2B<span className="text-xl text-blue-500 italic font-normal">ROI</span></span>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white/5 rounded-[3rem] border border-white/5 hover:border-blue-500/50 transition-all group">
              <Cpu className="text-blue-500 mb-4 group-hover:rotate-180 transition-transform duration-700" />
              <h4 className="font-bold text-lg">Self-Refactoring Code</h4>
              <p className="text-xs text-gray-500 leading-relaxed">The AI has identified 12 UI components for optimization. 0ms latency achieved.</p>
            </div>
            <button className="w-full py-8 bg-blue-600 rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all shadow-2xl shadow-blue-500/40">
              Execute Global Deployment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
