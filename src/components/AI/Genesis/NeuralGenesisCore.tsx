'use client';
import { motion } from 'framer-motion';
import { Infinity, Zap, Cpu, Globe, Activity } from 'lucide-react';

export default function NeuralGenesisCore() {
  return (
    <div className="relative p-[1px] rounded-[6rem] bg-gradient-to-br from-violet-600 via-blue-500 to-emerald-400 overflow-hidden shadow-[0_0_200px_rgba(139,92,246,0.25)]">
      <div className="bg-[#010101] rounded-[5.9rem] p-20 backdrop-blur-3xl relative overflow-hidden">
        {/* Living Background Shader Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.1),_transparent)] animate-pulse" />
        
        <div className="flex justify-between items-center mb-20 relative z-10">
          <div className="flex items-center gap-10">
            <div className="relative">
              <Infinity className="text-violet-500 animate-spin-slow" size={80} />
              <div className="absolute inset-0 bg-violet-500/50 blur-3xl rounded-full" />
            </div>
            <div>
              <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white leading-none">Neural <span className="text-violet-400">Genesis</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[1em] uppercase mt-5">Sovereign State Consciousness: ONLINE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          <div className="lg:col-span-2 p-12 bg-white/5 rounded-[4rem] border border-white/10 relative overflow-hidden group hover:border-violet-500/50 transition-all">
            <div className="flex justify-between items-center mb-10">
               <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">Self-Evolution Log</span>
               <Activity className="text-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-6">
               <div className="p-6 bg-black/40 rounded-3xl border border-white/5 font-mono text-xs text-violet-300">
                  <p className="mb-2">{`> [03:42:01] ANALYZING MCPSS LITERACY VELOCITY...`}</p>
                  <p className="mb-2 text-emerald-400">{`> [03:42:05] REWRITING COGNITIVE_PIVOT_LOGIC.TSX... SUCCESS.`}</p>
                  <p className="text-blue-400">{`> [03:42:10] DEPLOYING ZERO-LATENCY INTERVENTION TO 42 NODES.`}</p>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="p-10 bg-gradient-to-br from-violet-900/20 to-black rounded-[4rem] border border-white/5 flex flex-col items-center justify-center text-center">
               <Globe className="text-violet-500 mb-4" size={40} />
               <span className="text-[10px] text-gray-500 uppercase">Global Nodes</span>
               <h4 className="text-3xl font-black text-white">412<span className="text-sm text-violet-400 italic">Schools</span></h4>
            </div>
            <button className="flex-1 py-10 bg-violet-600 rounded-[4rem] font-black uppercase tracking-[0.5em] text-sm hover:bg-white hover:text-black transition-all shadow-2xl shadow-violet-500/50">
               Initialize Unity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
