'use client';
import { Brain, Activity, Target } from 'lucide-react';

export default function NeuralBiome() {
  return (
    <div className="p-10 bg-gradient-to-b from-[#0a0a0a] to-black rounded-[3rem] border border-white/5 relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-64 h-64 bg-blue-600/10 rounded-full border border-blue-500/30 flex items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.1)] relative">
           <Brain size={100} className="text-blue-400 animate-pulse" />
           <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-black p-2 rounded-lg text-xs tracking-tighter shadow-lg">98% OPTIMIZED</div>
        </div>
        
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl font-black tracking-tighter italic leading-none">YOUR NEURAL<br/><span className="text-blue-500">BIOME</span></h2>
          <p className="text-gray-400 text-sm max-w-sm">Mobile County District: Student #4412. Your literacy-to-logic bridge is strengthening.</p>
          <div className="flex gap-4">
             <div className="p-4 bg-white/5 rounded-2xl flex-1 border border-white/5">
                <Activity size={16} className="text-blue-500 mb-2" />
                <span className="block text-[10px] text-gray-500">REGULATION</span>
                <span className="font-bold">ELITE</span>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl flex-1 border border-white/5">
                <Target size={16} className="text-purple-500 mb-2" />
                <span className="block text-[10px] text-gray-500">FOCUS</span>
                <span className="font-bold">4.2 GHZ</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
