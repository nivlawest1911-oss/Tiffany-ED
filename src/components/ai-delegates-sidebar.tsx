"use client"

import { useState, useEffect } from "react"
import { Bot, FileText, Users, X } from "lucide-react"

const delegates = [
  {
    id: "nexus",
    name: "Nexus-01",
    role: "Superintendent Delegate",
    avatar: "N",
    color: "#00d2ff",
    message: "District data sync is optimal today.",
  },
  {
    id: "aura",
    name: "Aura",
    role: "Educational Assistant",
    avatar: "A",
    color: "#10b981",
    message: "I've drafted 3 new lesson plan hooks for you.",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    role: "Compliance Delegate",
    avatar: "S",
    color: "#f59e0b",
    message: "IEP audit complete. 0 high-risk nodes detected.",
  },
]

export function AIDelegatesSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDelegate, setActiveDelegate] = useState(delegates[0])
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-xl bg-[#00d2ff]/20 border border-[#00d2ff]/40 text-[#00d2ff] hover:bg-[#00d2ff]/30 transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)]"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-[#00d2ff]/20 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-[#00d2ff]/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">EdIntel Sovereign</p>
            <h3 className="font-black tracking-tighter text-lg text-white">Administrative Intelligence</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isInitializing ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#00d2ff]/30 border-t-[#00d2ff] animate-spin" />
            <p className="text-sm text-gray-400">Initializing Identity...</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Delegate Cards */}
            {delegates.map((delegate) => (
              <button
                key={delegate.id}
                onClick={() => setActiveDelegate(delegate)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  activeDelegate.id === delegate.id
                    ? "glass-card border-l-2"
                    : "bg-white/5 hover:bg-white/10 border-l-2 border-transparent"
                }`}
                style={{
                  borderLeftColor: activeDelegate.id === delegate.id ? delegate.color : "transparent",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: `${delegate.color}30` }}
                  >
                    {delegate.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{delegate.name}</h4>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-gray-400">{delegate.role}</p>
                    <p className="text-xs text-gray-300 mt-2 italic">"{delegate.message}"</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-lg bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] text-xs font-medium hover:bg-[#00d2ff]/20 transition-all flex flex-col items-center gap-2">
                  <FileText className="w-4 h-4" />
                  IEP Architect
                </button>
                <button className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-xs font-medium hover:bg-[#10b981]/20 transition-all flex flex-col items-center gap-2">
                  <Users className="w-4 h-4" />
                  Classroom Aide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}
    </>
  )
}
