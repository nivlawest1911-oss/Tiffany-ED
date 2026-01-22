'use client';
import { useSchoolData } from '@/hooks/biometric/useSchoolData';
import { BookOpen, ExternalLink, Box } from 'lucide-react';

export default function ResourceLibrary() {
  const { resources = [], students = [] } = useSchoolData();
  const activeNeeds = new Set(students.map(s => s.status));

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-blue-500">
        <BookOpen size={20} />
        <h3 className="font-bold text-zinc-900 dark:text-white">Active Resource Library</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res) => (
          <div key={res.id} className={`p-4 rounded-2xl border transition-all ${activeNeeds.has(res.target) ? 'border-blue-500/50 bg-blue-500/5' : 'border-zinc-100 dark:border-zinc-800'}`}>
            <h4 className="text-sm font-bold mb-1">{res.title}</h4>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">{res.target} Support</p>
          </div>
        ))}
      </div>
    </div>
  );
}
