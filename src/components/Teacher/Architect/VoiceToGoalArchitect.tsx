'use client';
import { motion } from 'framer-motion';
import { Mic, FileText, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export default function VoiceToGoalArchitect() {
  return (
    <div className="relative p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden group">
      <div className="absolute top-0 right-0 p-8">
        <Sparkles className="text-blue-500/20 group-hover:text-blue-500/50 transition-colors" size={48} />
      </div>

      <div className="mb-10">
        <h3 className="text-3xl font-black tracking-tight text-slate-900 italic">Instructional <span className="text-blue-600">Architect</span></h3>
        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] mt-2">Voice-to-Goal Deployment Engine</p>
      </div>

      <div className="space-y-6">
        <div className="p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group-hover:border-blue-300 transition-all cursor-pointer">
          <div className="p-4 bg-blue-600 rounded-full text-white mb-4 shadow-lg shadow-blue-200">
            <Mic size={24} />
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">Tap to Speak Objective</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Rubric', icon: FileText },
            { label: 'Exit Ticket', icon: CheckCircle2 },
            { label: 'Differentiated Text', icon: Layers }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-3">
              <item.icon size={16} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase text-slate-700 tracking-tighter">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 transition-all">
        Deploy Lesson Materials
      </button>
    </div>
  );
}
