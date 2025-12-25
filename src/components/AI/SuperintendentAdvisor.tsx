'use client';
'use client';
import { useState } from 'react';
import { Mic, Cpu, Globe, BarChart3 } from 'lucide-react';

export default function SuperintendentAdvisor() {
  const [query, setQuery] = useState("");
  const [thinking, setThinking] = useState(false);

  return (
    <div className="glass-card p-1 bg-gradient-to-br from-blue-600 to-purple-900 rounded-[3rem] shadow-[0_0_80px_rgba(37,99,235,0.2)]">
      <div className="bg-black/95 rounded-[2.9rem] p-10 backdrop-blur-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
            <Cpu className="text-blue-400 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Sovereign Advisor <span className="text-blue-500">v5.0</span></h2>
            <p className="text-[10px] text-gray-500 font-mono">Alabama State Intelligence Layer Connected</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-48 bg-[#050505] rounded-3xl border border-white/5 p-6 overflow-y-auto text-sm font-mono text-blue-300">
             {thinking ? "> ANALYZING MCPSS DISTRICT DATA... MAPPING TO SB 101... CALCULATING ROI..." : "> STANDING BY FOR EXECUTIVE COMMAND, DR. WEST."}
          </div>
          
          <div className="flex gap-4">
            <input 
              className="flex-1 bg-[#111] border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-500 transition"
              placeholder="Ask about District Literacy Trends or Suspension Diversion ROI..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={() => setThinking(true)}
              className="p-5 bg-blue-600 rounded-2xl hover:bg-blue-400 transition shadow-lg shadow-blue-900/40"
            >
              <Mic size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <BarChart3 className="text-green-400" />
              <div className="text-[10px]">
                <span className="block text-gray-500">STATE SAVINGS</span>
                <span className="font-bold text-white">$142,500.00</span>
              </div>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <Globe className="text-blue-400" />
              <div className="text-[10px]">
                <span className="block text-gray-500">NETWORK NODES</span>
                <span className="font-bold text-white">42 SCHOOLS ACTIVE</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
