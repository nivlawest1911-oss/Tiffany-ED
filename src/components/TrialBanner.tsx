import { getTrialStatus } from '@/actions/trial';

export default async function TrialBanner({ userId }: { userId: string }) {
    // 1. Ask the Server Action for the pre-calculated data
    const trial = await getTrialStatus(userId);

    // 2. Render the UI based purely on the simple boolean and number returned
    if (!trial.isActive) {
        return (
            <div className="bg-red-900/20 backdrop-blur-md border border-red-500/50 p-6 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <h2 className="text-red-400 font-black uppercase tracking-widest text-xs mb-2">Security Alert</h2>
                <p className="text-white font-bold text-lg mb-4">Your Sovereign trial has expired.</p>
                <button className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Upgrade EdIntel Tier
                </button>
            </div>
        );
    }

    return (
        <div className="bg-blue-900/20 backdrop-blur-md border border-blue-500/50 p-6 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <h2 className="text-blue-400 font-black uppercase tracking-widest text-xs mb-2">System Status</h2>
            <p className="text-white font-bold text-lg">Trial Active</p>
            <div className="flex items-center gap-3 mt-3">
                <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] progress-bar-fill"
                        style={{ '--progress-width': `${Math.min(100, (trial.daysLeft / 30) * 100)}%` } as React.CSSProperties}
                    />
                </div>
                <span className="text-blue-400 font-mono text-sm">{trial.daysLeft}d left</span>
            </div>
        </div>
    );
}
