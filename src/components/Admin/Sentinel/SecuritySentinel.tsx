'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Globe, Lock, Cpu } from 'lucide-react';

const securityLogs = [
  { event: "Firebase Auth Handshake", status: "Secure", time: "0.2ms" },
  { event: "Undici Proxy Patch", status: "Active", time: "v6.21.1" },
  { event: "Stripe Webhook Secret", status: "Verified", time: "Encrypted" },
];

export default function SecuritySentinel() {
  return (
    <div className="glass-card p-10 rounded-[3rem] border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Infrastructure <span className="text-emerald-500">Sentinel</span></h2>
          <p className="text-[10px] text-emerald-500/60 font-mono tracking-[0.3em] uppercase mt-1">Zero-Vulnerability State: ACTIVE</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-black rounded-full animate-pulse">SYSTEM NOMINAL</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
          <ShieldCheck className="text-emerald-500 mb-2" size={24} />
          <span className="block text-[10px] text-gray-500 uppercase font-bold">Vulnerability Audit</span>
          <span className="text-3xl font-black text-white">0.00</span>
        </div>
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
          <Activity className="text-blue-500 mb-2" size={24} />
          <span className="block text-[10px] text-gray-500 uppercase font-bold">Synaptic Latency</span>
          <span className="text-3xl font-black text-white">12ms</span>
        </div>
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
          <Globe className="text-purple-500 mb-2" size={24} />
          <span className="block text-[10px] text-gray-500 uppercase font-bold">Node Connectivity</span>
          <span className="text-3xl font-black text-white">100%</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Real-Time Security Logs</h4>
        {securityLogs.map((log, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 text-xs">
            <div className="flex items-center gap-3">
              <Lock size={14} className="text-emerald-500" />
              <span className="text-gray-300">{log.event}</span>
            </div>
            <div className="flex items-center gap-4 text-emerald-500 font-mono">
              <span>{log.status}</span>
              <span className="text-gray-600">[{log.time}]</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
