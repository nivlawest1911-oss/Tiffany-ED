"use client"

import { GraduationCap, FileText, ShieldCheck, RefreshCw } from "lucide-react"

const LMS_SYSTEMS = ["Canvas", "Clever", "PowerSchool", "Google Classroom"]

export default function EducationPage() {
    return (
        <div className="space-y-6 p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white">Academic Intelligence</h1>

            {/* LMS Status Bar */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {LMS_SYSTEMS.map((lms) => (
                    <div
                        key={lms}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0f1a]/60 p-4 backdrop-blur-xl"
                    >
                        <span className="text-sm font-semibold text-white/70">{lms}</span>
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Synced
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Magic Grader */}
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-white">Magic Grader</h2>
                        </div>
                        <button
                            type="button"
                            suppressHydrationWarning
                            className="flex items-center gap-1 text-[10px] text-white/30 transition-colors hover:text-white/60"
                        >
                            <RefreshCw className="h-3 w-3" /> Clear
                        </button>
                    </div>

                    <div className="space-y-4">
                        <textarea
                            suppressHydrationWarning
                            className="h-44 w-full resize-none rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-white/70 outline-none transition-colors focus:border-amber-500"
                            placeholder="Paste student submission here..."
                        />
                        <div className="flex gap-3">
                            <select
                                suppressHydrationWarning
                                title="Filter academic results"
                                className="bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option>9th Grade</option>
                                <option>10th Grade</option>
                                <option>11th Grade</option>
                                <option>12th Grade</option>
                            </select>
                            <button
                                type="button"
                                suppressHydrationWarning
                                className="flex-1 rounded-lg bg-amber-600 py-2 text-sm font-bold text-white transition-colors hover:bg-amber-500"
                            >
                                Generate Feedback (Glows & Grows)
                            </button>
                        </div>
                    </div>
                </div>

                {/* IEP Generator */}
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06b6d4]/20 text-[#06b6d4]">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">IEP Generator</h2>
                            <p className="flex items-center gap-1 text-[10px] text-emerald-400">
                                <ShieldCheck className="h-3 w-3" /> FERPA Compliant
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                suppressHydrationWarning
                                type="text"
                                placeholder="Student ID (Anonymized)"
                                className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70 outline-none"
                            />
                            <input
                                suppressHydrationWarning
                                type="text"
                                placeholder="Primary Diagnosis"
                                className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70 outline-none"
                            />
                        </div>
                        <textarea
                            suppressHydrationWarning
                            className="h-28 w-full resize-none rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70 outline-none"
                            placeholder="Observed behaviors and current accommodations..."
                        />
                        <button
                            type="button"
                            suppressHydrationWarning
                            className="w-full rounded-lg bg-[#06b6d4]/80 py-3 text-sm font-bold text-white transition-colors hover:bg-[#06b6d4]"
                        >
                            Draft IEP Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
