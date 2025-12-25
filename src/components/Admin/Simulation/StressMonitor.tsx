'use client';
'use client';
import { useState } from 'react';
import { runStressTest } from '@/utils/simulation/stressTest';
import { Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';

export default function StressMonitor() {
  const [metrics, setMetrics] = useState({ activeNodes: 0, systemStability: "1.000", currentLatency: "0ms" });
  const [isTesting, setIsTesting] = useState(false);

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-red-500/20 bg-red-500/5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-black text-white uppercase italic">Stress <span className="text-red-500">Simulator</span></h3>
          <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Load Capacity: 10,000 Nodes</p>
        </div>
        <button 
          onClick={() => { setIsTesting(true); runStressTest(setMetrics); }}
          disabled={isTesting}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {isTesting ? "Testing Active..." : "Run Stress Test"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
          <Activity className="text-red-500 mb-2" size={20} />
          <span className="block text-[10px] text-gray-500 uppercase font-bold">Concurrent Nodes</span>
          <span className="text-3xl font-black text-white">{metrics.activeNodes}</span>
        </div>
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
          <Cpu className="text-blue-500 mb-2" size={20} />
          <span className="block text-[10px] text-gray-500 uppercase font-bold">Stability Index</span>
          <span className="text-3xl font-black text-white">{metrics.systemStability}</span>
        </div>
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
          <Zap className="text-yellow-500 mb-2" size={20} />
          <span className="block text-[10px] text-gray-500 uppercase font-bold">Network Latency</span>
          <span className="text-3xl font-black text-white">{metrics.currentLatency}</span>
        </div>
      </div>
    </div>
  );
}
