'use client';
import { Clock, TrendingUp, DollarSign, Shield } from 'lucide-react';
import { useLeadershipRank } from '@/hooks/useLeadershipRank';
import { useAuth } from '@/context/AuthContext';

export default function TrialStatus() {
    const { isSovereign, currentRank } = useLeadershipRank();
    const { user } = useAuth();

    // In a real app, this would be calculated from user.createdAt
    const daysLeft = 24;
    const hoursSaved = 12.5;
    const moneySaved = hoursSaved * 50; // Approximating $50/hr admin cost

    const isPro = isSovereign || (user?.tier && user.tier !== 'free');

    return (
        <div className="mb-8 p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl animate-gradient-x">
            <div className="bg-[#0A0A0B] rounded-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${isPro ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                        {isPro ? <Shield size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">
                            {isPro ? `${currentRank.title} Status Active` : 'Professional Trial Active'}
                        </h3>
                        <p className="text-zinc-400 text-xs">
                            {isPro ? 'Your executive credentials are fully synchronized with the Global Strategic Suite.' : `${daysLeft} days remaining in your evaluation period.`}
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex h-8 w-px bg-zinc-800" />

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <TrendingUp size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Time Saved</p>
                            <p className="text-white font-mono font-bold">{hoursSaved} Hrs</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                            <DollarSign size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Value Realized</p>
                            <p className="text-white font-mono font-bold">${moneySaved}</p>
                        </div>
                    </div>
                </div>

                {!isPro && (
                    <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-zinc-200 transition-colors">
                        Upgrade Now
                    </button>
                )}
                {isPro && (
                    <div className="px-4 py-2 border border-amber-500/30 rounded-lg bg-amber-500/5">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none">Verified Executive</span>
                    </div>
                )}
            </div>
        </div>
    );
}
