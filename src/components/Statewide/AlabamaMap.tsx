'use client';
import { Map as MapIcon, ShieldCheck, TrendingUp } from 'lucide-react';

export default function AlabamaStateMap() {
  const regions = [
    { name: 'Mobile County', fitness: '88%', status: 'Optimal', color: '#00d1b2' },
    { name: 'Montgomery', fitness: '74%', status: 'Gaining', color: '#d4af37' },
    { name: 'Birmingham', fitness: '81%', status: 'Stable', color: '#0070f3' }
  ];

  return (
    <div className="glass-card p-8 bg-black border border-white/10 rounded-[2rem] shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">Statewide Sovereignty HUD</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] rounded-full border border-green-500/30 font-bold">LIVE: SB 101 COMPLIANT</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {regions.map(r => (
          <div key={r.name} className="p-6 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer group">
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">{r.name}</p>
            <h4 className="text-2xl font-bold mb-2">{r.fitness} <span className="text-sm text-gray-400 font-normal italic">Fitness</span></h4>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500" style={{ width: r.fitness }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="aspect-[16/9] bg-[#050505] rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
         {/* Placeholder for Alabama SVG Map */}
         <MapIcon size={120} className="text-white/10" />
         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
         <p className="absolute bottom-6 text-xs text-gray-500 font-mono">Alabama Regional Intelligence Layer v1.02</p>
      </div>
    </div>
  );
}
