'use client';
import { Shield, MapPin, Flag } from 'lucide-react';

export default function GlobalSovereignHeader() {
  return (
    <div className="w-full">
      {/* TIER 1: FEDERAL (ED.GOV) */}
      <div className="bg-[#003865] text-white py-2 px-6 flex justify-between items-center text-[10px] tracking-widest uppercase border-b border-white/10">
        <div className="flex items-center gap-2">
          <Flag className="w-3 h-3 text-blue-300" />
          <span>Official U.S. Government Node</span>
        </div>
        <span className="hidden md:block">Department of Education Standards</span>
      </div>

      {/* TIER 2: STATE (ALABAMA ACHIEVES) */}
      <div className="bg-[#E83713] text-white py-1.5 px-6 text-center text-[9px] tracking-[0.4em] uppercase font-black">
        Every child. Every chance. Every day. | Alabama Achieves
      </div>

      {/* TIER 3: DISTRICT (MCPSS / CLC RAMS) */}
      <div className="bg-[#002147] text-white py-4 px-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tighter">MOBILE COUNTY</h1>
          <span className="text-[10px] text-blue-300 tracking-widest uppercase">Learning Today. Leading Tomorrow.</span>
        </div>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
          <span className="hover:text-[#FFD700] cursor-pointer">#teammcpss</span>
          <span className="hover:text-white cursor-pointer">RAMSway</span>
        </div>
      </div>
    </div>
  );
}
