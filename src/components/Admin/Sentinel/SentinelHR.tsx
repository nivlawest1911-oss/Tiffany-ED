'use client';
import { motion } from 'framer-motion';
import { Users, Thermometer, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

export default function SentinelHR() {
  return (
    <div className="relative p-1 bg-gradient-to-br from-indigo-500 via-purple-600 to-black rounded-[3.5rem] shadow-2xl">
      <div className="bg-[#030303] rounded-[3.4rem] p-12 overflow-hidden relative">
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg">
              <Users className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">Sentinel <span className="text-indigo-400">HR</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-2 uppercase">District Retention & Wellness Layer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <TrendingDown size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase italic">Retention Up 4.2%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group hover:border-indigo-500/40 transition-all">
            <div className="flex justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400">DISTRICT BURNOUT INDEX</span>
              <Thermometer className="text-indigo-500" size={16} />
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full mb-6 overflow-hidden">
               <motion.div animate={{ width: '22%' }} className="h-full bg-indigo-500" />
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed italic">
              "System identifies low emotional load across Mobile County North. Suggesting 'Teacher Appreciation Refill' for Site 12."
            </p>
          </div>

          <div className="bg-indigo-950/20 p-8 rounded-[2.5rem] border border-indigo-500/10 flex flex-col justify-between">
            <div className="flex items-start gap-4">
               <ShieldAlert className="text-yellow-500" />
               <h4 className="text-sm font-bold text-white uppercase tracking-widest">Retention Opportunity</h4>
            </div>
            <p className="text-[10px] text-gray-400 my-4 uppercase tracking-tighter">AI identifies 3 High-Performing staff members nearing fatigue threshold.</p>
            <button className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase hover:bg-indigo-400 transition-colors">
              Deploy Retention Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
