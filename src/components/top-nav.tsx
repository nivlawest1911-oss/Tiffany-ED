"use client"

import { useState } from "react"
import { Menu, X, User, Zap, Globe, Layers, Shield } from "lucide-react"

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "COMMAND", href: "/#dashboard" },
    { name: "AVATAR LAB", href: "/#avatar-lab" },
    { name: "NEURAL SYNC", href: "/#neural-sync" },
    { name: "SOVEREIGN LABS", href: "/#sovereign-labs" },
    { name: "SOVEREIGN PRICING", href: "/#pricing", highlight: true },
    { name: "NETWORK", href: "/#network-feed" },
  ]

  return (
    <header className="relative z-50">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-4 bg-black/50 backdrop-blur-sm border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] md:text-xs font-semibold tracking-wider">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" />
          SOVEREIGN MATRIX ONLINE
        </div>
        <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] text-xs font-medium tracking-wider">
          <Shield className="w-3 h-3" />
          Official U.S. Government Sovereign Node
        </div>
        <div className="text-[10px] text-gray-500 tracking-widest hidden md:block">FERPA-SECUREID: ED-AL-MCPSS-2025</div>
      </div>

      <nav className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            <Globe className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="font-black tracking-tighter text-xl md:text-3xl">
              <span className="text-white">EDINTEL</span> <span className="text-[#00d2ff]">SOVEREIGN</span>
            </h1>
            <p className="text-[10px] md:text-xs text-gray-400 tracking-widest">DIRECTOR COMMAND NODE // V4.0.2</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 rounded-full ${item.highlight
                ? "bg-[#10b981] text-black hover:bg-[#10b981]/90 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "text-gray-300 hover:text-[#00d2ff] hover:bg-[#00d2ff]/10"
                }`}
            >
              {item.highlight && <Zap className="w-3 h-3 inline mr-1" />}
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#pricing" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/50 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all">
            <Zap className="w-4 h-4" />
            UPGRADE STATUS
          </a>
          <a href="#hero" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:bg-gray-800/50 transition-all">
            <Layers className="w-4 h-4" />
            ACCESS NODE
          </a>
          <a href="#sovereign-identity" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00d2ff]/50 text-[#00d2ff] text-sm font-medium hover:bg-[#00d2ff]/10 transition-all">
            <User className="w-4 h-4" />
            AUTHENTICATE IDENTITY
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 p-4 space-y-2 h-screen overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium tracking-wider ${item.highlight ? "bg-[#10b981] text-black" : "text-gray-300 hover:bg-gray-800"
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="h-px bg-gray-800 my-4" />

          {/* Mobile Actions */}
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-emerald-500/50 text-emerald-400 text-sm font-medium bg-emerald-500/10 mb-2">
            <Zap className="w-4 h-4" />
            UPGRADE STATUS
          </a>
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:bg-gray-800/50 mb-2">
            <Layers className="w-4 h-4" />
            ACCESS NODE
          </a>
          <a href="#sovereign-identity" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#00d2ff]/50 text-[#00d2ff] text-sm font-medium hover:bg-[#00d2ff]/10">
            <User className="w-4 h-4" />
            AUTHENTICATE IDENTITY
          </a>
          <div className="h-20" /> {/* Spacing */}
        </div>
      )}
    </header>
  )
}
