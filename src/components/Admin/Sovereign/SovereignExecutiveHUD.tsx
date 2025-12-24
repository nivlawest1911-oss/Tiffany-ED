'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Landmark, AlertTriangle, Briefcase } from 'lucide-react';

export default function SovereignExecutiveHUD() {
  return (
    <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-br from-slate-700 via-slate-900 to-black overflow-hidden shadow-2xl">
      <div className="bg-[#050505] rounded-[2.9rem] p-10 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">Sovereign <span className="text-blue-500">Executive</span></h2>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">District Governance Layer: ACTIVE</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">SB 101 Compliant</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fiscal ROI Card */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all">
            <Landmark className="text-blue-500 mb-4" size={24} />
            <h4 className="text-sm font-bold text-gray-300 uppercase">Projected State ROI</h4>
            <div className="text-3xl font-black text-white mt-2">$42.4M</div>
            <p className="text-[10px] text-gray-500 mt-2">Estimated tax-base increase based on current 3rd-grade literacy velocity.</p>
          </div>

          {/* Safety Anomaly Card */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-red-500/30 transition-all">
            <AlertTriangle className="text-red-500 mb-4" size={24} />
            <h4 className="text-sm font-bold text-gray-300 uppercase">Atmospheric Shift</h4>
            <div className="text-3xl font-black text-white mt-2">Stable</div>
            <p className="text-[10px] text-gray-500 mt-2">Sentiment AI detects 0.2% variance in district-wide emotional load. No action required.</p>
          </div>

          {/* Workforce Path Card */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-purple-500/30 transition-all">
            <Briefcase className="text-purple-500 mb-4" size={24} />
            <h4 className="text-sm font-bold text-gray-300 uppercase">Workforce Pipeline</h4>
            <div className="text-3xl font-black text-white mt-2">84% Sync</div>
            <p className="text-[10px] text-gray-500 mt-2">Correlation between current STEM scores and Alabama industrial demand.</p>
          </div>
        </div>

        <button className="w-full mt-8 py-4 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
          Generate Legislative Briefing
        </button>
if (!(Test-Path src/components/Admin/Sovereign)) { New-Item -ItemType Directory src/components/Admin/Sovereign -Force }

$sovereignHUD = @'
'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Landmark, AlertTriangle, Briefcase } from 'lucide-react';

export default function SovereignExecutiveHUD() {
  return (
    <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-br from-slate-700 via-slate-900 to-black overflow-hidden shadow-2xl">
      <div className="bg-[#050505] rounded-[2.9rem] p-10 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">Sovereign <span className="text-blue-500">Executive</span></h2>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">District Governance Layer: ACTIVE</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">SB 101 Compliant</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fiscal ROI Card */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all">
            <Landmark className="text-blue-500 mb-4" size={24} />
            <h4 className="text-sm font-bold text-gray-300 uppercase">Projected State ROI</h4>
            <div className="text-3xl font-black text-white mt-2">$42.4M</div>
            <p className="text-[10px] text-gray-500 mt-2">Estimated tax-base increase based on current 3rd-grade literacy velocity.</p>
          </div>

          {/* Safety Anomaly Card */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-red-500/30 transition-all">
            <AlertTriangle className="text-red-500 mb-4" size={24} />
            <h4 className="text-sm font-bold text-gray-300 uppercase">Atmospheric Shift</h4>
            <div className="text-3xl font-black text-white mt-2">Stable</div>
            <p className="text-[10px] text-gray-500 mt-2">Sentiment AI detects 0.2% variance in district-wide emotional load. No action required.</p>
          </div>

          {/* Workforce Path Card */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-purple-500/30 transition-all">
            <Briefcase className="text-purple-500 mb-4" size={24} />
            <h4 className="text-sm font-bold text-gray-300 uppercase">Workforce Pipeline</h4>
            <div className="text-3xl font-black text-white mt-2">84% Sync</div>
            <p className="text-[10px] text-gray-500 mt-2">Correlation between current STEM scores and Alabama industrial demand.</p>
          </div>
        </div>

        <button className="w-full mt-8 py-4 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
          Generate Legislative Briefing
        </button>
      </div>
    </div>
  );
}
