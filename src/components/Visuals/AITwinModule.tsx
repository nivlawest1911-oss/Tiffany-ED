'use client';
import { Cpu, UserCheck, FastForward, Activity } from 'lucide-react';

export default function AITwinModule() {
  return (
    <div className="relative group bg-black/40 backdrop-blur-3xl border border-blue-500/20 rounded-[3rem] p-12 overflow-hidden shadow-[0_0_50px_rgba(0,112,243,0.1)]">
      {/* Neural Background Sweep */}
      <div className="absolute inset-0 bg-[url('/neural-grid.svg')] opacity-10 animate-pulse" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-ping" />
          <img src="/dr-west-avatar.png" alt="AI Twin" className="relative w-48 h-48 rounded-full border-4 border-[#FFD700] object-cover" />
          <div className="absolute top-2 right-2 p-2 bg-black rounded-full border border-green-500">
             <UserCheck className="w-5 h-5 text-green-500" />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic">Dr. West AI Twin <span className="text-blue-500 underline">Generated</span></h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-6">Status: Autonomous Governance Active (nivlawest1911)</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <Cpu className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-[10px] text-white/60 uppercase font-bold">Logic Engine</p>
              <p className="text-xs text-white">DBA/MBA Strategic Forecaster</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <Activity className="w-5 h-5 text-[#FFD700] mb-2" />
              <p className="text-[10px] text-white/60 uppercase font-bold">Logistics</p>
              <p className="text-xs text-white">CDL Pattern Optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
