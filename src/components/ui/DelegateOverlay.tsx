'use client';
import { useState, useEffect } from 'react';
import { Crown, Brain, Zap } from 'lucide-react';
import React from 'react';

interface Delegate {
    id: string;
    name: string;
    role: string;
    color: string;
    icon: React.ReactNode;
    message: string;
    position: { x: number; y: number };
}

export default function DelegateOverlay() {
    const [delegates, setDelegates] = useState<Delegate[]>([
        {
            id: 'super-1',
            name: 'Dr. Alvin West',
            role: 'Executive Twin',
            color: 'emerald',
            icon: <img src="/images/avatars/executive_leader.png" alt="Dr. West" className="w-full h-full object-cover" />,
            message: "Strategic directives align with district goals.",
            position: { x: 85, y: 15 }
        },
        {
            id: 'teacher-1',
            name: 'Keisha Reynolds',
            role: 'Instructional Lead',
            color: 'blue',
            icon: <img src="/images/avatars/curriculum_strategist.png" alt="Keisha" className="w-full h-full object-cover" />,
            message: "I've drafted 3 new lesson plan hooks for you.",
            position: { x: 10, y: 70 }
        },
        {
            id: 'admin-1',
            name: 'Dr. Isaiah Vance',
            role: 'Compliance Lead',
            color: 'orange',
            icon: <img src="/images/avatars/special_ed_director.png" alt="Isaiah" className="w-full h-full object-cover" />,
            message: "IEP audit complete. 0 high-risk nodes detected.",
            position: { x: 90, y: 80 }
        }
    ]);

    const [activeId, setActiveId] = useState<string | null>(null);

    const messages = [
        "Professional protocols engaged.",
        "Analyzing stakeholder sentiment...",
        "Decision velocity is up 12%.",
        "How can I assist your leadership today?",
        "Manifestation determination pending for Sector 7.",
        "Strategic Sync Gym is ready for calibration.",
        "IEP Architect node is operational.",
        "Cross-referencing IDEA Part B requirements.",
        "Financial solvency trajectory: Optimistic.",
        "Board of Education brief: 95% complete.",
        "Community feedback loop: Active."
    ];

    useEffect(() => {
        // Delegate chatter
        const interval = setInterval(() => {
            setDelegates(prev => prev.map(d => {
                if (Math.random() > 0.7) {
                    return { ...d, message: messages[Math.floor(Math.random() * messages.length)] };
                }
                return d;
            }));
        }, 8000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {/* Professional Identity Center (Top Right) - Replaced Firebase Auth */}
            <div className="absolute top-6 right-6 pointer-events-auto">
                <div className="flex items-center gap-3 pl-4 pr-3 py-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">Professional Center</span>
                        <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Status: Active
                        </span>
                    </div>
                </div>
            </div>

            {delegates.map((d) => (
                <div
                    key={d.id}
                    className="absolute transition-all duration-1000 ease-in-out pointer-events-auto group"
                    style={{ left: `${d.position.x}%`, top: `${d.position.y}%` }}
                    onMouseEnter={() => setActiveId(d.id)}
                    onMouseLeave={() => setActiveId(null)}
                >
                    {/* Delegate Avatar Center */}
                    <div className="relative">
                        <div className={`w-16 h-16 rounded-full border-2 border-${d.color}-500/50 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 cursor-pointer overflow-hidden bg-black`}>
                            {/* Breathing/Pulse Effect */}
                            <div className={`absolute inset-0 bg-${d.color}-500/0 group-hover:bg-${d.color}-500/10 transition-colors duration-500`} />

                            {/* Avatar Image */}
                            <div className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity">
                                {d.icon}
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full animate-pulse z-20" />
                        </div>

                        {/* Talk Bubble */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 transition-all duration-500 ${activeId === d.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
                            }`}>
                            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl shadow-3xl relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[8px] font-black text-${d.color}-400 uppercase tracking-widest`}>{d.name}</span>
                                    <div className={`w-1 h-1 rounded-full bg-green-500 animate-pulse`} />
                                </div>
                                <p className="text-[10px] text-zinc-300 leading-tight">"{d.message}"</p>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 border-r border-b border-zinc-800 rotate-45 -mt-1" />
                            </div>
                        </div>

                        {/* Ambient Label (Always visible but faint) */}
                        <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">{d.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
