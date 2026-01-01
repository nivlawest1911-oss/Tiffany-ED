'use client';
import { useState, useEffect } from 'react';
import { Shield, Brain, Zap, LogIn, LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

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
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [delegates, setDelegates] = useState<Delegate[]>([
        {
            id: 'super-1',
            name: 'Nexus-01',
            role: 'Superintendent Delegate',
            color: 'purple',
            icon: <Shield size={14} />,
            message: "District data sync is optimal today.",
            position: { x: 85, y: 15 }
        },
        {
            id: 'teacher-1',
            name: 'Aura',
            role: 'Educational Assistant',
            color: 'blue',
            icon: <Brain size={14} />,
            message: "I've drafted 3 new lesson plan hooks for you.",
            position: { x: 10, y: 70 }
        },
        {
            id: 'admin-1',
            name: 'Sentinel',
            role: 'Compliance Delegate',
            color: 'orange',
            icon: <Zap size={14} />,
            message: "IEP audit complete. 0 high-risk nodes detected.",
            position: { x: 90, y: 80 }
        }
    ]);

    const [activeId, setActiveId] = useState<string | null>(null);

    const messages = [
        "Sovereign protocols engaged.",
        "Analyzing stakeholder sentiment...",
        "Decision velocity is up 12%.",
        "How can I assist your leadership today?",
        "Manifestation determination pending for Sector 7.",
        "Neural Sync Gym is ready for calibration.",
        "IEP Architect node is operational.",
        "Cross-referencing IDEA Part B requirements.",
    ];

    useEffect(() => {
        // Auth Listener
        const unsubscribe = auth?.onAuthStateChanged((u) => {
            setUser(u);
            setIsAuthLoading(false);
        });

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
            if (unsubscribe) unsubscribe();
            clearInterval(interval);
        };
    }, []);

    const handleLogin = async () => {
        if (!auth) return;
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login Failed", error);
        }
    };

    const handleLogout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Failed", error);
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {/* User Identity Node (Top Right) */}
            <div className="absolute top-6 right-6 pointer-events-auto">
                {isAuthLoading ? (
                    <div className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full flex items-center gap-2">
                        <Loader2 className="animate-spin text-zinc-500" size={12} />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Initializing Identity...</span>
                    </div>
                ) : user ? (
                    <div className="group relative">
                        <div className="flex items-center gap-3 pl-4 pr-2 py-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl hover:border-emerald-500/50 transition-colors cursor-pointer">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-white uppercase tracking-wider">{user.displayName || 'Sovereign User'}</span>
                                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Status: Initiate
                                </span>
                            </div>
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-emerald-500 transition-colors">
                                <img src={user.photoURL || '/images/default-avatar.png'} alt="User" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        {/* Logout Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-56 bg-zinc-950 border border-zinc-800 rounded-2xl p-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0 shadow-xl">
                            <div className="px-3 py-2 mb-2 border-b border-zinc-900">
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Current Protocol</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-white">Free Tier</span>
                                    <span className="text-[9px] text-amber-500 font-mono">UNVERIFIED</span>
                                </div>
                            </div>

                            <a href="/pricing" className="flex items-center justify-center gap-2 w-full py-3 mb-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl font-black text-[10px] uppercase tracking-widest text-white hover:shadow-lg hover:shadow-blue-900/50 transition-all">
                                <Zap size={12} fill="currentColor" /> Activate Command
                            </a>

                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-zinc-500 transition-colors text-xs font-bold uppercase tracking-widest">
                                <LogOut size={12} /> Disconnect Node
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="group flex items-center gap-3 px-6 py-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300"
                    >
                        <div className="p-1 rounded bg-zinc-800 group-hover:bg-white/20 transition-colors">
                            <LogIn size={12} className="text-zinc-400 group-hover:text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">Authenticate Identity</span>
                    </button>
                )}
            </div>

            {delegates.map((d) => (
                <div
                    key={d.id}
                    className="absolute transition-all duration-1000 ease-in-out pointer-events-auto group"
                    style={{ left: `${d.position.x}%`, top: `${d.position.y}%` }}
                    onMouseEnter={() => setActiveId(d.id)}
                    onMouseLeave={() => setActiveId(null)}
                >
                    {/* Delegate Avatar Node */}
                    <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl bg-zinc-950 border border-${d.color}-500/50 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 cursor-pointer overflow-hidden`}>
                            <div className={`absolute inset-0 bg-${d.color}-500/10 opacity-20 group-hover:opacity-40 animate-pulse`} />
                            <div className={`text-${d.color}-400 relative z-10`}>
                                {d.icon}
                            </div>
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
