"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clapperboard, Mic, ImageIcon, Wand2, Play, Download } from "lucide-react"

const TABS = [
    { id: "avatar", label: "Avatar", icon: Clapperboard },
    { id: "voice", label: "Voice", icon: Mic },
    { id: "assets", label: "Assets", icon: ImageIcon },
] as const

type TabId = (typeof TABS)[number]["id"]

export default function MediaStudioPage() {
    const [activeTab, setActiveTab] = useState<TabId>("avatar")

    return (
        <div className="space-y-6 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white text-balance">Media Production Studio</h1>
                    <p className="text-sm text-white/40 mt-1">Manage Avatars, Voice Synthesis, and Creative Assets.</p>
                </div>
                <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            suppressHydrationWarning
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "text-white"
                                    : "text-white/40 hover:text-white/70"
                                }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="studio-tab"
                                    className="absolute inset-0 rounded-lg bg-[#7c3aed] shadow-lg shadow-[#7c3aed]/20"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <tab.icon className="relative z-10 h-4 w-4" />
                            <span className="relative z-10 capitalize">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3" style={{ minHeight: "550px" }}>
                {/* Left: Controls */}
                <div className="rounded-2xl border border-white/10 bg-[#0a0f1a]/60 p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed]/20 text-[#a855f7]">
                            {activeTab === "avatar" && <Clapperboard className="h-5 w-5" />}
                            {activeTab === "voice" && <Mic className="h-5 w-5" />}
                            {activeTab === "assets" && <ImageIcon className="h-5 w-5" />}
                        </div>
                        <h2 className="text-lg font-semibold text-white">
                            {activeTab === "avatar"
                                ? "Avatar Director"
                                : activeTab === "voice"
                                    ? "Voice Lab"
                                    : "Asset Vault"}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                                Select Model
                            </label>
                            <select
                                suppressHydrationWarning
                                title="Select Model"
                                className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70 outline-none transition-colors focus:border-[#7c3aed]"
                            >
                                <option>Dr. West (Digital Twin)</option>
                                <option>Professional News Anchor</option>
                                <option>Friendly Educator</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                                Script / Prompt
                            </label>
                            <textarea
                                suppressHydrationWarning
                                title="Script / Prompt"
                                className="mt-2 h-40 w-full resize-none rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70 outline-none transition-colors focus:border-[#7c3aed]"
                                placeholder="Enter the text you want the AI to speak..."
                            />
                        </div>
                        <motion.button
                            type="button"
                            suppressHydrationWarning
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all"
                            style={{
                                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                                boxShadow: "0 0 20px rgba(124,58,237,0.25), 0 0 40px rgba(6,182,212,0.1)",
                            }}
                        >
                            <Wand2 className="h-4 w-4" /> Generate Output
                        </motion.button>
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/20 lg:col-span-2 group">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-110">
                            <Play className="h-8 w-8 text-white/50" />
                        </div>
                        <p className="text-sm font-medium text-white/30">Preview Area</p>
                        <p className="mt-1 text-xs text-white/15">Render times approx. 30s</p>
                    </div>
                    <button
                        type="button"
                        suppressHydrationWarning
                        aria-label="Download Output"
                        className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <Download className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
