'use client';
import { motion } from 'framer-motion';
import { Cpu, Repeat, Sparkles, Activity } from 'lucide-react';

export default function ApexLessonEngine() {
  return (
    <div className="relative p-10 bg-black rounded-[4rem] border border-blue-500/20 overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.1)]">
      {/* Background Neural Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/40">
              <Cpu className="text-white animate-spin-slow" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter italic uppercase">Apex <span className="text-blue-500">Autonomous</span> Engine</h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Activity size={14} className="text-green-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Neural Pulse: Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 hover:border-blue-500/50 transition-all group">
            <Sparkles className="text-blue-400 mb-4 group-hover:scale-125 transition-transform" />
            <h4 className="font-bold text-lg mb-2">Self-Generating Content</h4>
            <p className="text-xs text-gray-500">AI builds 3D interactive modules based on real-time student interest spikes.</p>
          </div>
          <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all group">
            <Repeat className="text-purple-400 mb-4 group-hover:rotate-180 transition-transform duration-500" />
            <h4 className="font-bold text-lg mb-2">Recursive Learning</h4>
            <p className="text-xs text-gray-500">The system re-teaches itself based on student success rates, optimizing the "Neural Bridge."</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <span className="font-black uppercase tracking-widest text-sm">Initialize Neural Link</span>
          </div>
        </div>
      </div>
    </div>
  );
}
