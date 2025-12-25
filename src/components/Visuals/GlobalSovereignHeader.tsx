'use client';
import { Flag, Shield } from 'lucide-react';

export default function GlobalSovereignHeader() {
  return (
    <div className="w-full select-none">
      {/* TIER 1: FEDERAL COMPLIANCE */}
      <div className="bg-[#003865] text-white py-2 px-6 flex justify-between items-center text-[9px] tracking-[0.2em] uppercase font-bold border-b border-white/10">
        <div className="flex items-center gap-2">
          <Flag className="w-3 h-3 text-blue-400" />
          <span>Official U.S. Government Sovereign Node</span>
        </div>
        <div className="flex items-center gap-4">
          <span>FERPA-SECURE</span>
          <span className="text-blue-400">ID: ED-AL-MCPSS-2025</span>
        </div>
      </div>

      {/* TIER 2: EdIntel BRANDING & DISTRICT COMMAND */}
      <div className="bg-[#001A33] text-white py-6 px-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-6">
          {/* EdIntel LOGO ENGINE */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-20 h-20 bg-[#001A33] rounded-full flex items-center justify-center border border-white/20 overflow-hidden">
               <img src="/logo.png" alt="EdIntel" className="w-full h-full object-cover scale-110" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              EdIntel
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="w-3 h-3 text-[#FFD700]" />
              <span className="text-[10px] text-[#FFD700] tracking-[0.2em] uppercase font-black">
                Dr. Alvin West | Chief Architect
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-xs font-bold text-white/80">MOBILE COUNTY PUBLIC SCHOOLS</span>
          <span className="text-[9px] text-white/40 tracking-widest uppercase mt-1 italic">Learning Today. Leading Tomorrow.</span>
        </div>
      </div>
      
      {/* TIER 3: STATE MISSION (ALABAMA ACHIEVES) */}
      <div className="bg-[#E83713] text-white py-2 px-6 text-center text-[10px] tracking-[0.5em] uppercase font-black">
        Every child. Every chance. Every day.
      </div>
    </div>
  );
}
