'use client';
import { motion } from 'framer-motion';
import { Radio, Users, Activity, Sparkles } from 'lucide-react';

export default function NeuralSync() {
  return (
    <div className="relative p-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-[4rem] shadow-[0_0_120px_rgba(147,51,234,0.15)]">
      <div className="bg-black/95 rounded-[3.9rem] p-12 backdrop-blur-3xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        
        <div className="flex justify-between items-center mb-12 relative z-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Radio className="text-pink-500 animate-pulse" size={40} />
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-pink-500/30 blur-2xl rounded-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Neural <span className="text-pink-500">Sync</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Classroom Co-Regulation Stream: ACTIVE</p>
            </div>
          </div>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full flex items-center gap-2">
                <Users size={14} className="text-pink-400" />
                <span className="text-[10px] text-pink-400 font-bold">Resonance: 94%</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="col-span-2 p-8 bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden relative">
            <div className="flex justify-between mb-8">
               <span className="text-[10px] uppercase font-mono text-gray-400">Synchrony Waveform</span>
               <Activity size={16} className="text-pink-500" />
            </div>
            <div className="h-40 flex items-end gap-1">
               {[...Array(40)].map((_, i) => (
                 <motion.div 
                   key={i}
                   animate={{ height: [`${20 + Math.random() * 60}%`, `${40 + Math.random() * 50}%`] }}
                   transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                   className="flex-1 bg-gradient-to-t from-pink-600/20 to-pink-400 rounded-t-full"
                 />
               ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[#0a0a0a] rounded-3xl border border-white/5 flex items-center gap-4 group hover:border-pink-500/50 transition-all cursor-pointer">
              <Sparkles className="text-pink-500 group-hover:scale-125 transition-transform" />
              <div>
                <span className="block text-[10px] text-gray-500">NEXT PIVOT</span>
                <span className="font-bold text-sm text-white font-mono">LITERACY BEAT: 4/4</span>
              </div>
            </div>
            <button className="w-full py-6 bg-pink-600 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-pink-400 transition-all shadow-xl shadow-pink-900/30">
              Trigger Global Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
