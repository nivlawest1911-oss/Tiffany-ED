'use client';
import { motion } from 'framer-motion';
import { Home, ShieldCheck, GraduationCap, TrendingUp, Heart } from 'lucide-react';

export default function ProsperityPortal() {
  const metrics = [
    { label: 'Instructional Hours Gained', value: '14,200', icon: Heart, color: 'text-rose-500' },
    { label: 'Property Value Correlation', value: '+3.2%', icon: Home, color: 'text-blue-500' },
    { label: 'Workforce Readiness', value: '92%', icon: GraduationCap, color: 'text-purple-500' }
  ];

  return (
    <div className="p-12 bg-white rounded-[4rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)] overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">Mobile County Public Trust</span>
            <h2 className="text-5xl font-black tracking-tighter text-slate-900">Community <span className="text-blue-600">Prosperity</span></h2>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end text-emerald-600 font-bold italic">
              <ShieldCheck size={18} /> <span>Audited by AI Sentinel</span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono">LIVE UPDATE: DEC 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 transition-all"
            >
              <m.icon className={`${m.color} mb-6`} size={32} />
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{m.label}</h4>
              <div className="text-4xl font-black text-slate-900 mt-2">{m.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-600 rounded-[3rem] text-white flex justify-between items-center relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold italic">The "Alabama Advantage"</h3>
            <p className="text-sm opacity-80 mt-1 uppercase tracking-widest font-bold">See how literacy is building a safer, wealthier state.</p>
          </div>
          <TrendingUp size={48} className="opacity-20 group-hover:scale-125 transition-transform" />
        </div>
      </div>
    </div>
  );
}
