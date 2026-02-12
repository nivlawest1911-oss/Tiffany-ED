import React from 'react';
import { VibeController } from './VibeController';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import { useAuth } from '@/context/AuthContext';
import { getTrialDaysRemaining } from '@/lib/subscription';
import ProfessionalID from '@/components/dossier/ProfessionalID';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Shield, Clock } from 'lucide-react';
import EdIntelLogo from '@/components/EdIntelLogo';

export const TacticalHeader = () => {
    const { toggleCommandConsole, isCommandConsoleOpen } = useEdIntelVibe();
    const { user } = useAuth();

    // Fix: Pass trialEndsAt to getTrialDaysRemaining, not the user object
    const daysRemaining = user?.trialEndsAt ? getTrialDaysRemaining(user.trialEndsAt) : 0;

    return (
        <header className="h-20 border-b border-white/10 bg-zinc-950/50 backdrop-blur-xl px-10 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
            {/* Left: Vibe Controller & Logo Context */}
            <div className="flex items-center gap-6">
                <VibeController />
                <div className="flex items-center gap-4">
                    <EdIntelLogo variant="fidelity" className="scale-100 origin-left" />
                    <div className="hidden lg:flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                                Mobile County <span className="text-zinc-600">|</span> District_049
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Actions & Bio Dossier */}
            <div className="flex items-center gap-3">
                {user && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] font-mono text-slate-400">
                            TRIAL: <span className="text-amber-500">{daysRemaining} DAYS</span>
                        </span>
                    </div>
                )}

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all group">
                            <Shield className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider group-hover:text-indigo-200">
                                Bio Dossier
                            </span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-transparent border-none p-0 overflow-hidden text-white">
                        <ProfessionalID />
                    </DialogContent>
                </Dialog>

                <div className="w-px h-8 bg-zinc-800/50 mx-1" />

                <button
                    onClick={toggleCommandConsole}
                    className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all active:scale-95 border ${isCommandConsoleOpen
                        ? 'bg-amber-500 border-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                >
                    {isCommandConsoleOpen ? 'Close Console' : 'Command Deck'}
                </button>
            </div>
        </header>
    );
};
