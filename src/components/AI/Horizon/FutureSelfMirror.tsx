'use client';
import { motion } from 'framer-motion';
import { User, Rocket, FastForward, Sparkles } from 'lucide-react';

export default function FutureSelfMirror() {
  return (
    <div className="relative p-[1px] rounded-[4rem] bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-900 overflow-hidden shadow-[0_0_150px_rgba(6,182,212,0.2)]">
      <div className="bg-[#020202] rounded-[3.9rem] p-12 backdrop-blur-3xl relative">
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/30">
              <FastForward className="text-cyan-400 animate-pulse" size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Neural <span className="text-cyan-400">Mirror</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.4em] uppercase">Time-Dilated Personalization: ACTIVE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-[3rem] bg-[#050505] border border-white/5 flex items-center justify-center overflow-hidden group">
            <User size={120} className="text-cyan-900/20 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent" />
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-10 flex items-center gap-2 bg-black/60 p-2 px-4 rounded-full border border-cyan-500/30"
            >
              <Sparkles size={12} className="text-cyan-400" />
              <span className="text-[10px] text-cyan-400 font-bold uppercase">Future Self Link</span>
            </motion.div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold leading-tight">"Listen to me, Dr. West. This literacy block is the key to our 2035 expansion."</h3>
            <p className="text-gray-400 text-sm leading-relaxed">The AI has generated a 10-year projection based on current performance. Interaction with Future-Self increases student persistence by 42%.</p>
            
            <div className="flex gap-4">
               <button className="flex-1 py-5 bg-cyan-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-900/30">
                 Sync Career Path
               </button>
               <button className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10">
                 <Rocket className="text-white" size={20} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
