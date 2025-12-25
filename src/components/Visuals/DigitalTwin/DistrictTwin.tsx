'use client';
import { motion } from 'framer-motion';
import { Box, Globe, Activity, ShieldCheck } from 'lucide-react';

export default function DigitalTwinDistrict() {
  return (
    <div className="relative p-10 bg-[#020202] rounded-[3.5rem] border border-blue-500/10 overflow-hidden group shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">District <span className="text-blue-500">Digital Twin</span></h2>
            <p className="text-gray-500 font-mono text-[10px] tracking-[0.4em]">Alabama MCPSS Node: Active</p>
          </div>
          <div className="p-4 bg-blue-600/10 rounded-3xl border border-blue-500/20">
            <Activity className="text-blue-500 animate-pulse" size={32} />
          </div>
        </div>

        {/* 3D Visualizer Placeholder */}
        <div className="aspect-[21/9] bg-gradient-to-b from-[#080808] to-black rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-blue-500/30 transition-colors">
          <Box size={100} className="text-blue-900/20 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
          </div>

          <div className="absolute bottom-10 left-10 space-y-2">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-2 px-4 rounded-full border border-white/10">
               <ShieldCheck size={12} className="text-green-400" />
               <span className="text-[10px] font-mono">SCHOOL SITE 01: OPTIMIZED</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-2 px-4 rounded-full border border-white/10">
               <Activity size={12} className="text-yellow-400" />
               <span className="text-[10px] font-mono">SCHOOL SITE 02: HIGH NEURAL LOAD</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-4">
           {[1,2,3,4].map(i => (
             <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="h-full w-1/3 bg-blue-500"
                />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
