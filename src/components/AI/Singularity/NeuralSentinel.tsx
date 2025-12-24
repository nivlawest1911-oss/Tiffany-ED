'use client';
import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Heart, Zap } from 'lucide-react';

export default function NeuralSentinel() {
  return (
    <div className="relative p-[2px] rounded-[4rem] bg-gradient-to-t from-red-600 via-blue-600 to-purple-600 shadow-[0_0_100px_rgba(220,38,38,0.15)]">
      <div className="bg-[#020202] rounded-[3.9rem] p-12 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Activity className="text-blue-500 animate-pulse" size={48} />
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Neural <span className="text-red-500">Sentinel</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest">MCPSS DISTRICT SAFETY LAYER: ACTIVE</p>
            </div>
          </div>
          <div className="px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
            <span className="text-red-500 text-xs font-bold animate-pulse">● EMOTIONAL LOAD: STABLE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
            <Heart className="text-red-500 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-2">Co-Regulation Mode</h4>
            <p className="text-xs text-gray-500 leading-relaxed">The AI has identified a 12% rise in collective stress. Deploying a "Morphic Reset" to all classroom screens in 3... 2... 1...</p>
          </div>
          
          <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-500/30 bg-blue-950/10 p-8">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono uppercase text-blue-400">Restorative Pivot AI</span>
                <Zap className="text-yellow-500" size={16} />
             </div>
             <div className="space-y-3">
                <div className="h-2 w-full bg-white/5 rounded-full"><motion.div animate={{ width: '85%' }} className="h-full bg-blue-500" /></div>
                <div className="h-2 w-3/4 bg-white/5 rounded-full"><motion.div animate={{ width: '60%' }} className="h-full bg-purple-500" /></div>
                <div className="h-2 w-1/2 bg-white/5 rounded-full"><motion.div animate={{ width: '40%' }} className="h-full bg-emerald-500" /></div>
             </div>
             <button className="mt-8 w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-400 transition">Override Diversion</button>
          </div>
        </div>
      </div>
    </div>
  );
}
