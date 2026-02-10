'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTrialDaysRemaining } from '@/lib/subscription';
import ProfessionalID from '@/components/dossier/ProfessionalID';

export default function GlobalStatusBar() {
    const { user } = useAuth();
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!user) return null;

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-6 pointer-events-none sm:pointer-events-auto">
            {/* Trial Countdown Ring */}
            {user?.trialEndsAt && (
                <div className="relative w-12 h-12 flex items-center justify-center group cursor-pointer bg-slate-950/40 backdrop-blur-md rounded-full border border-white/5 shadow-lg" title="Trial Days Remaining">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#1e293b" strokeWidth="4" />
                        <circle
                            cx="24" cy="24" r="20" fill="none" stroke="#6366f1" strokeWidth="4"
                            strokeDasharray="125.6"
                            strokeDashoffset={125.6 * (1 - (getTrialDaysRemaining(user.trialEndsAt) / 30))}
                            className="transition-all duration-1000 group-hover:stroke-cyan-400"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="text-[10px] font-black text-white">{getTrialDaysRemaining(user.trialEndsAt)}d</span>
                </div>
            )}

            <div className="text-right hidden sm:block bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Mobile County Time</div>
                <div className="text-lg font-mono text-white tracking-widest">{currentTime}</div>
            </div>

            <div className="pointer-events-auto">
                <ProfessionalID />
            </div>
        </div>
    );
}
