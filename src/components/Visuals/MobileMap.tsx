'use client';
import { motion } from 'framer-motion';
import { Compass, Shield, Zap } from 'lucide-react';

export default function MobileCountyCommand() {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-900 via-black to-blue-950 p-[2px]">
      <div className="rounded-[2.4rem] bg-black/90 p-8 backdrop-blur-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Mobile County <span className="text-blue-500">MCPSS</span></h2>
            <p className="text-blue-400 font-mono text-xs tracking-widest mt-1">SOVEREIGN INTELLIGENCE LAYER 4.0</p>
          </div>
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="h-10 w-10 rounded-full border-2 border-black bg-gradient-to-tr from-blue-500 to-purple-500 shadow-xl" />
             ))}
          </div>
        </div>

        {/* 3D MAP PLACEHOLDER */}
        <div className="mt-8 h-80 w-full rounded-3xl bg-[#050505] border border-white/5 relative flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
             className="absolute h-96 w-96 rounded-full border border-blue-500/10"
           />
           <Compass size={120} className="text-blue-500/20 animate-pulse" />
           
           {/* Dynamic Data Overlays */}
           <div className="absolute top-10 left-10 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
              <span className="text-[10px] text-gray-500 block uppercase">District Literacy</span>
              <span className="text-xl font-bold text-green-400">89.4%</span>
           </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
           <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-blue-500/10 transition">
              <Shield size={20} className="text-blue-500 mb-2" />
              <p className="text-xs font-bold">SB 101 SECURE</p>
           </div>
           <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-yellow-500/10 transition">
              <Zap size={20} className="text-yellow-500 mb-2" />
              <p className="text-xs font-bold">AI ACTIVE</p>
           </div>
           <button className="bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-400 transition">
              Launch Briefing
           </button>
        </div>
      </div>
    </div>
  );
}
