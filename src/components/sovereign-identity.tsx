"use client"

import { useState } from "react"
import { Shield, Fingerprint, Key, CheckCircle, Lock, Unlock } from "lucide-react"

export function SovereignIdentity() {
  const [securityLevel, setSecurityLevel] = useState(3)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  const securityFeatures = [
    { name: "Password Strength", status: "strong", icon: Key },
    { name: "Two-Factor Auth", status: twoFactorEnabled ? "enabled" : "disabled", icon: Fingerprint },
    { name: "Session Security", status: "active", icon: Lock },
    { name: "API Access", status: "restricted", icon: Shield },
  ]

  return (
    <section id="sovereign-identity" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-2">Sovereign Identity</h2>
          <p className="text-gray-400">Secure your digital command presence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Score */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white">Security Score</h3>
              <span className="text-4xl font-black text-[#10b981]">{securityLevel * 25}%</span>
            </div>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`flex-1 h-3 rounded-full transition-colors ${
                    level <= securityLevel ? (level <= 2 ? "bg-amber-500" : "bg-[#10b981]") : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400 mb-6">
              {securityLevel >= 3
                ? "Your identity is well protected. Consider enabling additional security features."
                : "Your security could be improved. Enable two-factor authentication for better protection."}
            </p>
            <div className="space-y-3">
              {securityFeatures.map((feature) => {
                const Icon = feature.icon
                const isGood =
                  feature.status === "strong" || feature.status === "enabled" || feature.status === "active"
                return (
                  <div key={feature.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isGood ? "text-[#10b981]" : "text-amber-400"}`} />
                      <span className="text-sm text-gray-300">{feature.name}</span>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        isGood ? "bg-[#10b981]/20 text-[#10b981]" : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {feature.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Identity Card */}
          <div className="glass-card-emerald p-8 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#00d2ff]/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#00d2ff]" />
              </div>
              <div>
                <h3 className="font-black tracking-tighter text-xl text-white">SOVEREIGN NODE</h3>
                <p className="text-sm text-[#00d2ff]">Verified Identity</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-black/30 rounded-xl">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Node ID</p>
                <p className="font-mono text-[#00d2ff]">ED-AL-MCPSS-2025</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Access Level</p>
                <p className="font-bold text-white">District Administrator</p>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Certification</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10b981]" />
                  <p className="text-[#10b981]">Neural Sync Certified</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
              <div className="flex items-center gap-2">
                {twoFactorEnabled ? (
                  <Lock className="w-5 h-5 text-[#10b981]" />
                ) : (
                  <Unlock className="w-5 h-5 text-amber-400" />
                )}
                <span className="text-sm text-gray-300">Two-Factor Authentication</span>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${twoFactorEnabled ? "bg-[#10b981]" : "bg-gray-700"}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
