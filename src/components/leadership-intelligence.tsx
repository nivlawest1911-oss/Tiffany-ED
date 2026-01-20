"use client"

import { useState } from "react"
import { Shield as LucideShield } from "lucide-react"

const categories = [
  "EQ Reframing",
  "Touchy Sit",
  "Discipline Comp",
  "Meeting Protocol",
  "Staff Feedback",
  "Crisis Comm",
]
const audiences = ["STAFF", "PARENT", "DISTRICT"]
const urgencies = ["LOW URGENCY", "MEDIUM URGENCY", "HIGH URGENCY"]

export function LeadershipIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState("EQ Reframing")
  const [selectedAudience, setSelectedAudience] = useState("STAFF")
  const [selectedUrgency, setSelectedUrgency] = useState("MEDIUM URGENCY")

  return (
    <section className="px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-black tracking-tighter text-3xl md:text-4xl text-white mb-2">Leadership Intelligence</h2>
          <p className="text-gray-400">Executive Protocol Generator</p>
        </div>

        <div className="glass-card p-6 md:p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center">
              <LucideShield className="w-5 h-5 text-[#00d2ff]" />
            </div>
            <span className="text-sm text-[#00d2ff] font-medium">Professional Center</span>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#00d2ff] text-black"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Audience & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Audience</p>
              <div className="flex flex-wrap gap-2">
                {audiences.map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setSelectedAudience(aud)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedAudience === aud
                        ? "bg-[#10b981] text-black"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Urgency Level</p>
              <div className="flex flex-wrap gap-2">
                {urgencies.map((urg) => (
                  <button
                    key={urg}
                    onClick={() => setSelectedUrgency(urg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedUrgency === urg
                        ? urg.includes("HIGH")
                          ? "bg-red-500 text-white"
                          : urg.includes("MEDIUM")
                            ? "bg-amber-500 text-black"
                            : "bg-emerald-500 text-black"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {urg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            Generate Executive Protocol
          </button>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Frontiers in Psychology (2025) Autonomy Bolstered</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <LucideShield className="w-3 h-3" /> Center Sync: 100% Secure
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
