'use client';
import { motion } from 'framer-motion';
import { Wind, Zap, Smile, AlertCircle, RefreshCw } from 'lucide-react';

export default function VibeMeter() {
  return (
    <div className="relative p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-slate-800">Classroom <span className="text-emerald-500">Vibe-Meter</span></h3>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Atmospheric Co-Regulation: ACTIVE</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold rounded-full">OPTIMAL FLOW</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Engagement Waveform */}
        <div className="p-6 bg-slate-50 rounded-3xl relative">
          <div className="flex justify-between mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Engagement Waveform</span>
            <Wind size={14} className="text-emerald-500" />
          </div>
          <div className="flex items-end gap-1 h-20">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className="w-full bg-emerald-400/40 rounded-t-sm"
              />
            ))}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="flex flex-col justify-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
          <div className="flex items-center gap-3 mb-3">
            <RefreshCw className="text-emerald-600 animate-spin-slow" size={20} />
            <span className="font-bold text-slate-800 text-sm">Suggested Pivot</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "Group focus is peaking. Suggesting a 2-minute 'Collaborative Whisper' exercise to anchor the current literacy breakthrough."
          </p>
        </div>
      </div>
    </div>
  );
}
