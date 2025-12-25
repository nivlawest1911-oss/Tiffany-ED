'use client';
import { Cpu, Zap, Link, Box, Layers } from 'lucide-react';

export default function HolographicMatrix() {
  return (
    <div className="relative mt-12 p-10 bg-black rounded-[3.5rem] overflow-hidden border border-blue-500/30 shadow-[0_0_100px_rgba(0,112,243,0.2)]">
      {/* Holographic Refraction Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-cyan-900/10 to-transparent animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-light.svg')] opacity-5" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 tracking-tighter">
              AI TWIN MATRIX
            </h2>
            <p className="text-[#FFD700] font-bold tracking-[0.5em] text-[10px] mt-2 italic">
              MULTI-ENGINE SOVEREIGNTY: GEMINI | META | EdIntel
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-full animate-bounce">
            <Box className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI AGENT PORTALS */}
          <div className="group p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-500/10 transition-all cursor-pointer">
             <Layers className="w-6 h-6 text-blue-400 mb-4" />
             <h4 className="text-white font-black text-xs uppercase mb-2">Neural Linkage</h4>
             <div className="space-y-2">
               <a href="https://gemini.google.com" target="_blank" className="block text-[9px] text-blue-300 underline">Gemini 1.5 Integration</a>
               <a href="https://ai.meta.com" target="_blank" className="block text-[9px] text-blue-300 underline">Meta Llama 3 Node</a>
               <a href="https://heygen.com" target="_blank" className="block text-[9px] text-blue-300 underline">HeyGen Avatar Link</a>
             </div>
          </div>

          <div className="lg:col-span-2 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/20 flex flex-col justify-center">
            <p className="text-2xl font-light text-white italic leading-relaxed">
              "Dr. West, the 1911-Standard is active. Holographic projection of the Mobile County ROI is currently visible to 1 Magnum Pass."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
