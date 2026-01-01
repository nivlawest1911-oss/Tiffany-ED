'use client';
import { useState } from 'react';
import { useSchoolData } from '@/hooks/biometric/useStudentRoster';
import { ShieldCheck, Zap, Loader2, FileText } from 'lucide-react';

export default function AdminDirectory() {
  const { staff, students } = useSchoolData();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    const metrics = {
      totalStudents: students.length,
      interventionCount: students.filter(s => s.status === 'intervention').length,
      focusCount: students.filter(s => s.status === 'focus').length,
      staffCount: staff.length
    };

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics),
      });
      const data = await res.json();
      setSummary(data.output);
    } catch (err) {
      setSummary('Failed to generate report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-purple-500">
            <ShieldCheck size={20} />
            <h3 className="font-bold text-zinc-900 dark:text-white">Admin Directory</h3>
          </div>
          <button 
            onClick={generateReport}
            disabled={loading}
            className="p-2 bg-purple-500/10 text-purple-500 rounded-lg hover:bg-purple-500/20 transition-all"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
          </button>
        </div>
        <div className="space-y-4">
          {staff.map((person) => (
            <div key={person.id} className="flex items-center justify-between group">
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{person.name}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50">{person.role}</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
          ))}
        </div>
      </div>

      {summary && (
        <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
            <FileText size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">Executive Pulse</span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
            "{summary}"
          </p>
        </div>
      )}
    </div>
  );
}