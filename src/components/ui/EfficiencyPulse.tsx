'use client';
import { useSchoolData } from '@/hooks/biometric/useSchoolData';
import { Timer, Zap } from 'lucide-react';

export default function EfficiencyPulse() {
  const { totalHoursSaved } = useSchoolData();
  return (
    <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2"><Zap size={14} /><h3 className="text-[10px] font-bold uppercase tracking-widest">Efficiency ROI</h3></div>
        <div className="flex items-end gap-2"><span className="text-4xl font-black">{totalHoursSaved || 0}</span><span className="text-xs font-bold opacity-80 mb-1">Hours Saved</span></div>
      </div>
    </div>
  );
}
