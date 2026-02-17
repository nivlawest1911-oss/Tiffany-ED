import { useState } from 'react';
import { RelationalLog } from './RelationalLog';
import { FortressPlanner } from './FortressPlanner';
import { BurnoutShield } from './BurnoutShield';
import { ParentBridge } from './ParentBridge';
import { RestorativeReset } from './RestorativeReset';
import { DepositNotifier } from './DepositNotifier';

export default function TiffanyDashboard() {
    const [bridgeContext, setBridgeContext] = useState<{ studentName: string; recentWin: string } | null>(null);

    return (
        <div className="min-h-screen bg-zinc-50 p-4 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 md:p-8">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* Header Region */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">
                            Tiffany-ED Command
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Relational Mastery & Predictive Scaffolding
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {/* Future Placeholder for "Deposit Notification" alerts */}
                        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Active Monitoring
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                    {/* Left Column: Input & Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Interaction Logger */}
                        <RelationalLog />

                        {/* Restorative Reset */}
                        <RestorativeReset />

                        {/* Deposit Notifier */}
                        <DepositNotifier onSelectWin={setBridgeContext} />

                        {/* Parent Bridge (Standard) */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <ParentBridge initialContext={bridgeContext} />
                        </div>
                    </div>

                    {/* Right Column: Visualization & Maps */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Relational Bank Map Placeholder */}
                        <div className="min-h-[400px] rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Relational Bank Map</h2>
                                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                    View Full Report
                                </button>
                            </div>

                            {/* Mock Heatmap Grid */}
                            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square rounded-lg border flex items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-105
                                    ${i % 5 === 0 ? 'bg-zinc-100 border-zinc-200 text-zinc-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-300'}
                                    ${i === 2 || i === 7 ? 'ring-2 ring-rose-500 ring-offset-2 dark:ring-offset-zinc-900' : ''}
                                `}
                                    >
                                        {i === 2 || i === 7 ? 'Warning' : 'Student'}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-zinc-500">
                                * Students in <span className="text-rose-600 font-medium">Red</span> have low deposit ratios. Recommended action: 2 min conversation.
                            </p>
                        </div>

                        {/* Fortress Lesson Planner */}
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <FortressPlanner />
                        </div>

                        {/* Tiffany Peer-Review (Burnout Shield) */}
                        <BurnoutShield />

                    </div>
                </div>
            </div>
        </div>
    );
}
