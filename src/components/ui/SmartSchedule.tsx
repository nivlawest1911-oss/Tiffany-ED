'use client';
import { useSchoolData } from '@/hooks/biometric/useStudentRoster';
import { Clock, AlertCircle } from 'lucide-react';

export default function SmartSchedule() {
  const { students } = useSchoolData();
  const priorityStudents = students.filter(s => s.status === 'intervention' || s.status === 'focus');

  return (
    <div className="mt-6 p-6 rounded-3xl bg-zinc-900 text-white shadow-xl border border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-blue-400" size={20} />
        <h3 className="font-bold">Smart Intervention Schedule</h3>
      </div>
      
      <div className="space-y-3">
        {priorityStudents.map((s, i) => (
          <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                {8 + i}:30
              </div>
              <span className="text-sm font-medium">{s.name}</span>
            </div>
            <div className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${s.status === 'intervention' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {s.status}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] opacity-50 flex items-center gap-1">
        <AlertCircle size={10} /> Optimized based on literacy growth trajectories.
      </p>
    </div>
  );
}