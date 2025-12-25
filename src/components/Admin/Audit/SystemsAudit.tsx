'use client';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, BarChart3, Clock } from 'lucide-react';

export default function SystemsAudit() {
  const downloadReport = () => {
    console.log("🌌 GENERATING SOVEREIGN AUDIT PDF...");
    // Future logic: Trigger a PDF generation from the current system state
  };

  return (
    <div className="glass-card p-10 rounded-[3rem] border border-white/10 bg-slate-900/50">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white uppercase italic">Systems <span className="text-blue-500">Audit</span></h3>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Mobile County Compliance Export</p>
        </div>
        <button 
          onClick={downloadReport}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
        >
          <Download size={14} /> Export PDF Report
        </button>
      </div>

      <div className="bg-black/40 rounded-3xl p-8 border border-white/5">
        <div className="flex items-start gap-6 mb-8 pb-8 border-bottom border-white/10">
          <ShieldCheck className="text-emerald-500" size={32} />
          <div>
            <h4 className="font-bold text-white uppercase text-sm">Security Hardening Status</h4>
            <p className="text-xs text-gray-400 mt-1 italic">
              "Patched Critical Vulnerabilities in Firebase and Undici network layers. Current Risk Index: 0.00."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex gap-4">
            <BarChart3 className="text-purple-500" size={20} />
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-gray-500 uppercase">Uptime Performance</span>
              <span className="text-xl font-bold text-white">99.998%</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="text-blue-500" size={20} />
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-gray-500 uppercase">Avg Synaptic Response</span>
              <span className="text-xl font-bold text-white">12.4ms</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-tighter italic text-white">
          Handshake Verified: sk_live_***** | NEXT_ID: MOBILE_NODE_001
        </p>
      </div>
    </div>
  );
}
