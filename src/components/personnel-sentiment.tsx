"use client"

import { useState } from "react"
import { AlertTriangle, Brain, Clock, Heart } from "lucide-react"

const adminDirectory = [
  { name: "Dr. Aris Thorne", role: "Principal", avatar: "AT" },
  { name: "Sarah Vance", role: "Counselor", avatar: "SV" },
  { name: "Marcus Flint", role: "Specialist", avatar: "MF" },
]

export function PersonnelSentiment() {
  const [aiLinkStatus, setAiLinkStatus] = useState(false)

  return (
    <section className="px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Strategic Link */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">AI Strategic Link</h3>
              <Brain className="w-5 h-5 text-[#00d2ff]" />
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${aiLinkStatus ? "text-emerald-400" : "text-red-400"}`}>
                {aiLinkStatus ? "Link Active" : "Link Severed"}
              </span>
              <button
                onClick={() => setAiLinkStatus(!aiLinkStatus)}
                className={`w-12 h-6 rounded-full transition-all ${aiLinkStatus ? "bg-emerald-500" : "bg-gray-700"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    aiLinkStatus ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Efficiency ROI */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Efficiency ROI</h3>
              <Clock className="w-5 h-5 text-[#10b981]" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-black tracking-tighter text-[#10b981]">34</p>
              <span className="text-sm text-gray-400">Hours Saved</span>
            </div>
          </div>

          {/* Personnel Sentiment */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Personnel Sentiment</h3>
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
            <button className="w-full py-2 rounded-lg border border-amber-500/50 text-amber-400 text-sm hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Check Burnout Risk
            </button>
          </div>
        </div>

        {/* Admin Directory */}
        <div className="glass-card p-6 rounded-2xl mt-6">
          <h3 className="font-bold text-white mb-4">Admin Directory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {adminDirectory.map((admin) => (
              <div key={admin.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff] font-bold text-sm">
                  {admin.avatar}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{admin.name}</p>
                  <p className="text-xs text-gray-400">{admin.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
