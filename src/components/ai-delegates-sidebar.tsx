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
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-xl bg-[#00d2ff]/20 border border-[#00d2ff]/40 text-[#00d2ff] hover:bg-[#00d2ff]/30 transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] group"
      >
        <div className="absolute inset-0 bg-[#00d2ff] opacity-20 blur-lg rounded-full animate-pulse group-hover:opacity-40 transition-opacity" />
        <Bot className="w-6 h-6 relative z-10" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full animate-bounce" />
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-[#00d2ff]/20 z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 border-b border-[#00d2ff]/20 flex items-center justify-between bg-gradient-to-r from-[#00d2ff]/10 to-transparent">
          <div>
            <p className="text-[10px] text-[#00d2ff] font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              EdIntel Neural Net
            </p>
            <h3 className="font-black tracking-tighter text-lg text-white">Delegate Command</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isInitializing ? (
          <div className="p-10 flex flex-col items-center justify-center h-64 space-y-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-[#00d2ff]/20 border-t-[#00d2ff] rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-[#00d2ff]/20 border-b-[#00d2ff] rounded-full animate-spin-slow" />
              <Bot className="absolute inset-0 m-auto text-[#00d2ff] w-6 h-6 animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-white uppercase tracking-widest">Establishing Link</p>
              <p className="text-[10px] text-[#00d2ff] font-mono">Handshaking with Neural Node...</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Delegate Cards */}
            {delegates.map((delegate) => (
              <button
                key={delegate.id}
                onClick={() => setActiveDelegate(delegate)}
                className={`w-full p-4 rounded-xl text-left transition-all relative overflow-hidden group ${activeDelegate.id === delegate.id
                    ? "glass-card border-l-2 bg-white/5"
                    : "bg-white/5 hover:bg-white/10 border-l-2 border-transparent"
                  }`}
                style={{
                  borderLeftColor: activeDelegate.id === delegate.id ? delegate.color : "transparent",
                }}
              >
                {activeDelegate.id === delegate.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
                )}
                <div className="flex items-start gap-3 relative z-10">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ backgroundColor: `${delegate.color}30`, boxShadow: `0 0 10px ${delegate.color}40` }}
                  >
                    {delegate.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{delegate.name}</h4>
                      {activeDelegate.id === delegate.id && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-2">{delegate.role}</p>
                    <p className="text-xs text-gray-300 italic border-l-2 border-white/10 pl-2">"{delegate.message}"</p>
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
