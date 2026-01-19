'use client';
import { Play, BookOpen, Film, Video, UserCheck, Sparkles, MonitorPlay } from 'lucide-react';

export default function AvatarMasterclass() {
    const tutorials = [
        {
            title: "Cinematic Twin Synthesis",
            duration: "4:20",
            category: "Hyperrealism",
            icon: <Film size={18} className="text-purple-400" />,
            description: "Learn how to clone your physical twin with 4K cinematic lighting and natural micros-expressions."
        },
        {
            title: "Voice Cloning & Synchronicity",
            duration: "3:45",
            category: "Audio AI",
            icon: <Sparkles size={18} className="text-blue-400" />,
            description: "Master the art of neural voice synthesis for your delegate to ensure 100% stakeholder trust."
        },
        {
            title: "Rapid Sovereign Export",
            duration: "5:12",
            category: "Workflow",
            icon: <Video size={18} className="text-emerald-400" />,
            description: "Automate your video announcements by feeding your avatar a simple district memo."
        },
        {
            title: "Interactive AI Agents",
            duration: "6:30",
            category: "Deployment",
            icon: <UserCheck size={18} className="text-rose-400" />,
            description: "How to deploy your cinematic twin as a live 24/7 assistant on your school's portal."
        }
    ];

    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-950 text-white border border-zinc-900 shadow-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
                            <MonitorPlay className="text-purple-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter">Avatar Masterclass</h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Cinematic Training Hub</p>
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2">
                        View All Tutorials <BookOpen size={12} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tutorials.map((t, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-purple-500/50 transition-all group/card cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-zinc-800 group-hover/card:bg-purple-950 transition-colors">
                                    {t.icon}
                                </div>
                                <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[8px] font-black uppercase tracking-widest">
                                    {t.duration} MIN
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover/card:text-purple-400 transition-colors">{t.title}</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed mb-4">{t.description}</p>
                            <div className="flex items-center gap-2 text-[9px] font-black text-purple-500 uppercase tracking-widest">
                                <Play size={10} fill="currentColor" /> Watch Blueprint
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center animate-pulse">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest">Sovereign Certification</p>
                            <p className="text-xs text-zinc-400">Complete all nodes to unlock Hyperrealistic Sync Alpha.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2 bg-purple-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40">
                        Start Learning
                    </button>
                </div>
            </div>
        </div>
    );
}
