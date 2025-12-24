'use client';
import { useState } from 'react';
import { Volume2, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function SEABriefing() {
  const [playing, setPlaying] = useState(false);

  const stats = [
    { label: 'Daily Revenue', value: '$12,402', trend: '+15%' },
    { label: 'Active Learners', value: '45,281', trend: '+2,100' },
    { label: 'Suspension Diversions', value: '1,042', trend: 'State Record' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-[#050505] to-[#111] rounded-[3rem] border border-blue-500/20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <Volume2 size={120} className="text-blue-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
            <Volume2 className="text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Executive <span className="text-blue-500">Briefing</span></h2>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest">PERSONAL ASSISTANT: ONLINE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map(s => (
            <div key={s.label} className="p-6 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-[10px] text-gray-500 uppercase">{s.label}</span>
              <h4 className="text-2xl font-bold text-white">{s.value}</h4>
              <span className="text-blue-400 text-[10px] font-bold">{s.trend}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setPlaying(!playing)}
          className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-blue-400 transition-all flex items-center justify-center gap-4"
        >
          {playing ? "GENESTATING VOICE FEED..." : "PLAY MORNING BRIEFING"}
        </button>
      </div>
    </div>
  );
}
