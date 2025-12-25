'use client';
import { Video, Palette, BrainCircuit, Share2 } from 'lucide-react';

export default function HyperMediaHub() {
  return (
    <div className="mt-12 p-1 border border-white/10 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-3xl">
      <div className="p-8 grid md:grid-cols-3 gap-8">
        {/* HEYGEN VIDEO ENGINE */}
        <div className="group cursor-pointer p-6 bg-black/40 rounded-[2rem] border border-blue-500/20 hover:border-blue-400 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <Video className="text-blue-400 w-6 h-6" />
            <h4 className="text-white font-black uppercase text-xs tracking-widest">HeyGen AI Avatar</h4>
          </div>
          <p className="text-white/40 text-[10px] leading-relaxed mb-4">Generate 4K Video Briefings of Dr. West for District Stakeholders.</p>
          <button className="w-full py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase text-white hover:bg-blue-500 transition-colors">Generate Video</button>
        </div>

        {/* CANVA DESIGN SDK */}
        <div className="group cursor-pointer p-6 bg-black/40 rounded-[2rem] border border-[#FFD700]/20 hover:border-[#FFD700] transition-all">
          <div className="flex items-center gap-4 mb-4">
            <Palette className="text-[#FFD700] w-6 h-6" />
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Canva Design Engine</h4>
          </div>
          <p className="text-white/40 text-[10px] leading-relaxed mb-4">Auto-sync District Data to Print-Ready School Board Presentations.</p>
          <button className="w-full py-2 bg-[#FFD700] rounded-xl text-[10px] font-black uppercase text-black hover:bg-yellow-400 transition-colors">Launch Canva</button>
        </div>

        {/* AI AGENT BRAIN */}
        <div className="group cursor-pointer p-6 bg-black/40 rounded-[2rem] border border-green-500/20 hover:border-green-400 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <BrainCircuit className="text-green-400 w-6 h-6" />
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Sovereign Agent</h4>
          </div>
          <p className="text-white/40 text-[10px] leading-relaxed mb-4">nivlawest1911 Logic: Predictive Analytics & Multi-Tier Audit Logic.</p>
          <button className="w-full py-2 bg-green-600 rounded-xl text-[10px] font-black uppercase text-white hover:bg-green-500 transition-colors">Sync Brain</button>
        </div>
      </div>
    </div>
  );
}
