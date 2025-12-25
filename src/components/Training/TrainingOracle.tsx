'use client';
import { motion } from 'framer-motion';
import { PlayCircle, GraduationCap, Compass, CheckCircle } from 'lucide-react';

const trainingSteps = [
  { role: "Admin", title: "ROI Generation", desc: "How to export the Systems Audit for board meetings." },
  { role: "Teacher", title: "Neural Pivots", desc: "Using the Vibe-Meter to time instructional breaks." },
  { role: "General", title: "Synaptic Security", desc: "Understanding the Zero-Vulnerability shield." }
];

export default function TrainingOracle() {
  return (
    <div className="glass-card p-10 rounded-[3rem] border border-blue-500/20 bg-blue-500/5">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white uppercase italic">Training <span className="text-blue-400">Oracle</span></h3>
          <p className="text-[10px] text-blue-400/60 font-mono tracking-widest uppercase mt-1">Mobile County Readiness: 84%</p>
        </div>
        <GraduationCap size={32} className="text-blue-500" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {trainingSteps.map((step, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 10 }}
            className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 cursor-pointer group"
          >
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black bg-blue-600 px-3 py-1 rounded-md uppercase tracking-tighter">{step.role}</span>
              <div>
                <h4 className="font-bold text-gray-200">{step.title}</h4>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            </div>
            <PlayCircle size={24} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase">System Documentation: v1.0.4 Live</span>
        </div>
        <button className="px-6 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
          Start Full Onboarding
        </button>
      </div>
    </div>
  );
}
