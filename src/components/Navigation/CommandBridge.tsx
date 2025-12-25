'use client';
import { Briefcase, Users, GraduationCap } from 'lucide-react';

export default function CommandBridge({ setView, activeView }: { setView: (view: string) => void, activeView: string }) {
  const views = [
    { id: 'admin', label: 'Executive HUD', icon: Briefcase },
    { id: 'teacher', label: 'Teacher Co-Pilot', icon: Users },
    { id: 'student', label: 'Neural Hub', icon: GraduationCap },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-full flex gap-2 z-50 shadow-2xl transition-all hover:border-blue-500/50">
      {views.map((v) => (
        <button
          key={v.id}
          onClick={() => setView(v.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-black uppercase text-[10px] tracking-widest ${activeView === v.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'hover:bg-white/20 text-gray-400 hover:text-white'}`}
        >
          <v.icon size={16} />
          {v.label}
        </button>
      ))}
    </nav>
  );
}
