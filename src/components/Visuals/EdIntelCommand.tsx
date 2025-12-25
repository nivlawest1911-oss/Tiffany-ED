'use client';
import { Shield, BarChart3, Globe, Truck } from 'lucide-react';

export default function EdIntelCommand() {
  return (
    <div className="relative group overflow-hidden rounded-3xl bg-[#001A33] border border-white/10 shadow-2xl">
      {/* Background Graphic Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50" />
      
      <div className="relative p-10 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">EdIntel</h2>
            <p className="text-blue-400 font-bold tracking-[0.4em] uppercase text-xs">Mobile County Regional Node</p>
          </div>
          <div className="text-right">
            <span className="block text-[#FFD700] text-xs font-black uppercase tracking-widest">Sovereign Certified</span>
            <span className="block text-white/40 text-[10px] uppercase tracking-tighter mt-1">ID: nivlawest1911</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ROI Metric */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Alabama Achievement Value</h4>
            <p className="text-3xl font-light text-white mt-1">$52,500,000+</p>
            <p className="text-blue-300 text-[10px] mt-2 italic">ROI: $1,250 per student</p>
          </div>

          {/* Logistics Metric */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <Truck className="w-8 h-8 text-[#FFD700] mb-4" />
            <h4 className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Feeder Pattern Logistics</h4>
            <p className="text-3xl font-light text-white mt-1">Active Patterns</p>
            <p className="text-blue-300 text-[10px] mt-2 italic">Williamson | Vigor | MGM</p>
          </div>

          {/* Compliance Metric */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <Shield className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Federal Security</h4>
            <p className="text-3xl font-light text-white mt-1">FERPA Secure</p>
            <p className="text-blue-300 text-[10px] mt-2 italic">ED.GOV Compliance Tier 1</p>
          </div>
# 1. Create the EdIntel Command Visual Component
$commandCenter = @'
'use client';
import { Shield, BarChart3, Globe, Truck } from 'lucide-react';

export default function EdIntelCommand() {
  return (
    <div className="relative group overflow-hidden rounded-3xl bg-[#001A33] border border-white/10 shadow-2xl">
      {/* Background Graphic Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50" />
      
      <div className="relative p-10 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">EdIntel</h2>
            <p className="text-blue-400 font-bold tracking-[0.4em] uppercase text-xs">Mobile County Regional Node</p>
          </div>
          <div className="text-right">
            <span className="block text-[#FFD700] text-xs font-black uppercase tracking-widest">Sovereign Certified</span>
            <span className="block text-white/40 text-[10px] uppercase tracking-tighter mt-1">ID: nivlawest1911</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ROI Metric */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Alabama Achievement Value</h4>
            <p className="text-3xl font-light text-white mt-1">$52,500,000+</p>
            <p className="text-blue-300 text-[10px] mt-2 italic">ROI: $1,250 per student</p>
          </div>

          {/* Logistics Metric */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <Truck className="w-8 h-8 text-[#FFD700] mb-4" />
            <h4 className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Feeder Pattern Logistics</h4>
            <p className="text-3xl font-light text-white mt-1">Active Patterns</p>
            <p className="text-blue-300 text-[10px] mt-2 italic">Williamson | Vigor | MGM</p>
          </div>

          {/* Compliance Metric */}
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <Shield className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Federal Security</h4>
            <p className="text-3xl font-light text-white mt-1">FERPA Secure</p>
            <p className="text-blue-300 text-[10px] mt-2 italic">ED.GOV Compliance Tier 1</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
          <span>Dr. Alvin West, DBA, MBA, MS, MS, BS</span>
          <span className="italic">Class A CDL Certified Logistics Oversight</span>
        </div>
      </div>
    </div>
  );
}
