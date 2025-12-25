'use client';
import { Activity, ShieldCheck, Zap, Database, Globe } from 'lucide-react';

export default function StatusPage() {
  const systems = [
    { name: "Gemini 1.5 Pro Neural Link", status: "Operational", latency: "142ms", load: "12%" },
    { name: "Meta Llama 3 Logistics Node", status: "Operational", latency: "88ms", load: "24%" },
    { name: "Sovereign FERPA Shield", status: "Active", latency: "0ms", load: "100% Secure" },
    { name: "Mobile County ROI Engine", status: "Processing", latency: "210ms", load: "v2.0.26" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-6xl font-black tracking-tighter italic uppercase text-blue-500">System Health</h1>
            <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-xs mt-4">Architect: Dr. Alvin West | ID: nivlawest1911</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-green-500 font-mono text-xs mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              LIVE_NODE_CONNECTED
            </div>
            <p className="text-white/20 text-[10px] font-mono">TIMESTAMP: 2025.12.25.0609</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {systems.map((s) => (
            <div key={s.name} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl group hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-[10px] font-black px-3 py-1 bg-green-500/10 text-green-500 rounded-full uppercase">{s.status}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{s.name}</h3>
              <div className="flex gap-6 text-[10px] font-mono text-white/40">
                <span>LATENCY: {s.latency}</span>
                <span>LOAD: {s.load}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-12 bg-gradient-to-br from-[#001A33] to-black border border-white/10 rounded-[3rem] text-center">
          <Globe className="w-12 h-12 text-blue-500 mx-auto mb-6 animate-spin-slow" />
          <h2 className="text-3xl font-black tracking-tighter mb-4 italic">Mobile County Regional Sync</h2>
          <p className="max-w-lg mx-auto text-white/40 text-sm leading-relaxed">
            All Feeder Patterns (Williamson, Vigor, MGM) are currently synchronized with the State Mission Tier. 
          </p>
        </div>
      </div>
    </div>
  );
}