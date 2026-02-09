"use client"

import { Phone, Search } from "lucide-react"

const MESSAGES = [
    { from: "Principal Skinner", time: "10:42 AM", preview: "RE: Budget approval for the new science wing...", channel: "Email" },
    { from: "Dr. Rodriguez", time: "10:15 AM", preview: "IEP meeting rescheduled to Thursday at 2pm...", channel: "SMS" },
    { from: "Board Secretary", time: "9:58 AM", preview: "Minutes from last night's board session attached...", channel: "Email" },
    { from: "Parent (Garcia)", time: "9:30 AM", preview: "Question about my child's reading assessment...", channel: "WhatsApp" },
    { from: "Superintendent Office", time: "9:02 AM", preview: "Reminder: Q2 compliance audit due Friday...", channel: "Email" },
]

const CHANNEL_COLORS: Record<string, string> = {
    Email: "bg-blue-500/20 text-blue-400",
    SMS: "bg-emerald-500/20 text-emerald-400",
    WhatsApp: "bg-green-500/20 text-green-400",
}

export default function CommsPage() {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] gap-4 p-4">
            {/* Inbox List */}
            <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a]/60 backdrop-blur-xl">
                <div className="border-b border-white/5 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/30" />
                        <input
                            suppressHydrationWarning
                            type="text"
                            placeholder="Search messages..."
                            className="w-full rounded-lg bg-black/40 py-2 pl-9 pr-4 text-sm text-white/70 outline-none"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MESSAGES.map((msg) => (
                        <div
                            key={`${msg.from}-${msg.time}`}
                            className="cursor-pointer border-b border-white/5 p-4 transition-colors hover:bg-white/5"
                        >
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-semibold text-white/70">{msg.from}</span>
                                <span className="text-[10px] text-white/25">{msg.time}</span>
                            </div>
                            <p className="truncate text-xs text-white/35">{msg.preview}</p>
                            <div className="mt-2">
                                <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-medium ${CHANNEL_COLORS[msg.channel] || "bg-white/10 text-white/40"}`}>
                                    {msg.channel}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 flex-col gap-4">
                {/* Message view */}
                <div className="relative flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0f1a]/60 backdrop-blur-xl">
                    <p className="text-sm text-white/20">Select a conversation to view details</p>
                </div>

                {/* Dialer */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6 backdrop-blur-xl">
                    <div className="flex-1">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                            <Phone className="h-5 w-5 text-green-400" /> Outbound Dialer
                        </h3>
                        <div className="mb-4 font-mono text-3xl tracking-widest text-white/60">
                            (251) 555-0199
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                suppressHydrationWarning
                                className="rounded-full bg-green-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-colors hover:bg-green-500"
                            >
                                Call
                            </button>
                            <button
                                type="button"
                                suppressHydrationWarning
                                className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/15"
                            >
                                Hang Up
                            </button>
                        </div>
                    </div>

                    {/* Keypad */}
                    <div className="grid w-44 grid-cols-3 gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((k) => (
                            <button
                                key={k}
                                type="button"
                                suppressHydrationWarning
                                className="flex aspect-square items-center justify-center rounded-lg bg-white/5 text-base font-bold text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
