'use client';
import { Box, Glasses, Maximize2, Cpu } from 'lucide-react';

export default function SpatialCommandBridge() {
  return (
    <div className="relative group mt-16 p-1 border-2 border-cyan-500/20 rounded-[4rem] bg-black shadow-[0_0_150px_rgba(6,182,212,0.15)] overflow-hidden">
      {/* 3D Render Canvas Slot */}
      <div className="h-[600px] w-full bg-[#000510] rounded-[3.8rem] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/nebula-effect.webp')] opacity-20 mix-blend-screen" />
        
        {/* HOLOGRAPHIC OVERLAY */}
        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center mb-8">
             <div className="w-40 h-40 rounded-full border-4 border-cyan-400 p-2 animate-[spin_10s_linear_infinite] shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <img src="/logo.png" alt="EdIntel" className="w-full h-full object-contain" />
             </div>
          </div>
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 tracking-tighter">
            XR COMMAND ACTIVE
          </h2>
          <p className="text-cyan-400 font-bold tracking-[1em] text-[10px] uppercase">
            Dr. Alvin West | Sovereign Neural Link
          </p>
        </div>

        {/* AI ENGINE HUD */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-white/40 font-mono text-[8px] tracking-widest uppercase">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Cpu className="w-3 h-3"/> Gemini 1.5 Pro</span>
            <span className="flex items-center gap-2"><Cpu className="w-3 h-3"/> Meta Llama 3</span>
            <span className="flex items-center gap-2"><Cpu className="w-3 h-3"/> OpenAI o1-Preview</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 border border-cyan-500/30 rounded-full text-cyan-400">Tactical ID: nivlawest1911</span>
            <Glasses className="w-4 h-4 text-cyan-400 cursor-pointer hover:scale-125 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
