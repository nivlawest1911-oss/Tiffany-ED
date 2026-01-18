"use client"

import { Calendar, ExternalLink, Clock } from "lucide-react"

const legislativeItems = [
  {
    id: "sb101",
    name: "SB 101",
    status: "active",
    title: "Special Education Funding Reform",
    deadline: "2025-02-15",
  },
  {
    id: "raise",
    name: "The RAISE Act",
    status: "pending",
    title: "Revenue Achievement & Investment in School Excellence",
    deadline: "2025-03-01",
  },
  {
    id: "alcode",
    name: "AL Code 290-8-9",
    status: "active",
    title: "Administrative Compliance Standards",
    deadline: "2025-01-30",
  },
]

import { useState, useEffect } from "react"

function CurrentDate() {
  const [date, setDate] = useState("")
  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }))
  }, [])
  return <span>{date}</span>
}

export function MorningIntel() {

  return (
    <section className="px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black tracking-tighter text-xl text-white">Morning Intel</h3>
              <p className="text-sm text-gray-400"><CurrentDate /></p>
            </div>
            <Calendar className="w-5 h-5 text-[#00d2ff]" />
          </div>

          <div className="space-y-4">
            {legislativeItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#00d2ff]/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{item.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${item.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                          }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{item.title}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Deadline: {item.deadline}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://alison.legislature.state.al.us/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-[#00d2ff] hover:text-[#00d2ff]/80 transition-colors"
          >
            View Full Legislative Calendar
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
