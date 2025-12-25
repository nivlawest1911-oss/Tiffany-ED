'use client';
import { motion } from 'framer-motion';
import { FileCheck, Download, Award, ShieldAlert, BarChart } from 'lucide-react';

export default function SovereignSummary() {
  return (
    <div className="p-16 bg-[#0a0a0a] rounded-[5rem] border border-blue-500/10 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-20">
          <div className="flex items-center gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl shadow-blue-900/40">
              <FileCheck className="text-white" size={40} />
            </div>
            <div>
              <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white">Sovereign <span className="text-blue-500">Summary</span></h2>
              <p className="text-[12px] text-gray-500 font-mono tracking-[0.5em] uppercase mt-2">Executive Decision Support Layer</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            <Download size={16} /> Export to Governor.pdf
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="flex items-start gap-6">
              <Award className="text-yellow-500 shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">The "Alabama Standard" achieved</h4>
                <p className="text-sm text-gray-400 leading-relaxed">The system has successfully transitioned MCPSS into the first "Neural State" in the nation. Every literacy breakthrough is now a recorded economic asset.</p>
              </div>
            </div>
            
            <div className="p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3.5rem] relative overflow-hidden group">
              <BarChart className="absolute -bottom-4 -right-4 text-blue-500/10" size={150} />
              <div className="relative z-10">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Autonomous ROI Analysis</span>
                <h3 className="text-5xl font-black text-white mt-4">$2.8B <span className="text-lg font-normal italic text-blue-400">Total Lifecycle Value</span></h3>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed uppercase font-bold tracking-tighter">Confidence Score: 99.1% | Based on SB 101 Compliance Logic</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShieldAlert className="text-emerald-500" />
                <span className="text-sm font-bold uppercase tracking-widest">Restorative Pivot Impact</span>
              </div>
              <span className="text-2xl font-black text-emerald-500">+14,200 Hrs</span>
            </div>
            <div className="p-12 bg-gradient-to-br from-slate-900 to-black rounded-[3rem] border border-white/5 italic text-gray-400 text-lg leading-relaxed">
              "This platform represents a generational leap in educational sovereignty. We have moved from managing schools to engineering human capital for the future of Alabama."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
