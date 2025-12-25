'use client';
import { Map, Users, TrendingUp, ShieldCheck } from 'lucide-react';

export default function FeederAnalytics() {
  const patterns = [
    { name: 'Williamson Pattern', school: 'CLC / Prichard', status: 'High Engagement', color: 'bg-blue-500' },
    { name: 'Vigor Pattern', school: 'Vigor High', status: 'Scaling', color: 'bg-cyan-500' },
    { name: 'MGM Pattern', school: 'Mary G. Montgomery', status: 'Active', color: 'bg-indigo-500' }
  ];

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#001A33] border border-white/10 p-8 rounded-3xl">
        <h3 className="text-white font-black uppercase tracking-tighter text-xl mb-6 flex items-center gap-2">
          <Map className="w-5 h-5 text-[#FFD700]" /> Regional Command Map
        </h3>
        <div className="space-y-4">
          {patterns.map((p) => (
            <div key={p.name} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${p.color} shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
                <div>
                  <p className="text-white font-bold text-sm">{p.name}</p>
                  <p className="text-white/40 text-[10px] uppercase">{p.school}</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{p.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#003865] to-[#161D4B] border border-white/10 p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-white font-black uppercase tracking-tighter text-xl mb-2">Dr. Alvin West’s Sovereign Seal</h3>
          <p className="text-white/60 text-xs mb-6 italic">Tactical Integrity Standard: nivlawest1911</p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-black text-white">100%</p>
              <p className="text-[9px] text-blue-300 uppercase font-bold mt-1">FERPA Privacy</p>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-4xl font-black text-[#FFD700]">A+</p>
              <p className="text-[9px] text-blue-300 uppercase font-bold mt-1">Audit Readiness</p>
            </div>
          </div>
          <div className="mt-8 p-3 bg-black/20 rounded-lg border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-[10px] text-white/80 font-mono tracking-tighter">SECURED BY EdIntel | DB: FIREBASE-SOVEREIGN-NODE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
