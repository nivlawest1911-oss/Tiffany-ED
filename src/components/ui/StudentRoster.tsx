'use client';
import { useSchoolData } from '@/hooks/biometric/useSchoolData';

export default function StudentRoster() {
  const { students = [] } = useSchoolData();
  return (
    <div className="mt-12 overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-zinc-100/50 dark:bg-zinc-800/50 text-[10px] uppercase tracking-widest opacity-50">
          <tr><th className="p-4">Student</th><th className="p-4">Growth</th><th className="p-4">Status</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="p-4 text-sm font-bold">{s.name}</td>
              <td className="p-4"><div className="w-full h-1 bg-zinc-200 rounded-full"><div className="h-full bg-blue-500" style={{width: `${s.literacyLevel}%`}} /></div></td>
              <td className={`p-4 text-[10px] font-bold uppercase ${s.status === 'optimal' ? 'text-green-500' : 'text-orange-500'}`}>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
