"use client"

import { Vote, Gavel, TrendingUp, AlertTriangle } from "lucide-react"
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
} from "recharts"

const GRANT_DATA = [
    { subject: "Funding Match", A: 120, fullMark: 150 },
    { subject: "Impact", A: 98, fullMark: 150 },
    { subject: "Innovation", A: 86, fullMark: 150 },
    { subject: "Team", A: 99, fullMark: 150 },
    { subject: "Budget", A: 85, fullMark: 150 },
    { subject: "Timeline", A: 65, fullMark: 150 },
]

export default function CommandPage() {
    return (
        <div className="space-y-6 p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white">Command & Strategy</h1>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Grant Radar */}
                <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Grant Probability</h2>
                    </div>
                    <div className="flex-1" style={{ minHeight: 280 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={GRANT_DATA}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Dept of Energy" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <button
                        type="button"
                        suppressHydrationWarning
                        className="mt-4 w-full rounded-lg border border-emerald-500/30 bg-emerald-700/40 py-2 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-600/40"
                    >
                        Resume Application
                    </button>
                </div>

                {/* The Boardroom */}
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6 backdrop-blur-xl lg:col-span-2">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                            <Gavel className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">The Room: Governance</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Active Vote */}
                        <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-white/80">
                                    Resolution 2026-A: AI Infrastructure Budget
                                </h3>
                                <span className="rounded-md bg-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-yellow-400">
                                    Voting Open
                                </span>
                            </div>
                            <p className="mb-4 text-xs text-white/40">
                                Approval of $1.2M allocation for district-wide AI implementation via EdIntel.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    suppressHydrationWarning
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-500/40 bg-green-600/15 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-600/30"
                                >
                                    <Vote className="h-4 w-4" /> Approve
                                </button>
                                <button
                                    type="button"
                                    suppressHydrationWarning
                                    className="flex-1 rounded-lg border border-red-500/40 bg-red-600/15 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>

                        {/* Risk Alert */}
                        <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-black/20 p-4">
                            <AlertTriangle className="h-7 w-7 shrink-0 text-orange-500" />
                            <div>
                                <h3 className="text-sm font-semibold text-white/80">Risk Alert: Data Retention Policy</h3>
                                <p className="text-xs text-white/40">
                                    Current policy expires in 14 days. Recommend automated renewal via EdIntel Agent.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
