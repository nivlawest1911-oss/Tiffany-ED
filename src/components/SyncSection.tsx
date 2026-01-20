"use client"

import { useState } from "react"
import { Settings, Activity, Cpu, Zap, Play, Rocket, Brain, Shield as LucideShield, Heart, Target } from "lucide-react"

const skillPillars = [
  { name: "Pedagogical Nuance", icon: Brain },
  { name: "Compliance Logic", icon: LucideShield },
  { name: "Admin Authority", icon: Target },
  { name: "Sentiment Alignment", icon: Heart },
]

export function SyncSection() {
  const [activeTab, setActiveTab] = useState<"programs" | "diagnostics" | "simulators">("programs")

  return (
    <section id="sync-center" className="py-16 md:py-24">
      {/* Off-white section with heavy italic typography */}
      <div className="bg-[#f5f5f0] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-black tracking-tighter text-3xl md:text-4xl text-gray-900 mb-2">Leadership Sync</h2>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Professional Training Center // v4.0</p>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
            {["programs", "diagnostics", "simulators"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 md:px-6 py-2 rounded-lg text-sm font-bold tracking-wider transition-all ${activeTab === tab ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">
            Strategic Resource // Session 1
          </p>

          <div className="text-center mb-12">
            <h2 className="font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-4">
              {activeTab === "programs"
                ? "Personalized Career Pathway"
                : activeTab === "diagnostics"
                  ? "SYSTEM DIAGNOSTICS"
                  : "STRATEGIC SIMULATORS"}
            </h2>
            <p className="text-xl md:text-2xl italic text-gray-700 font-medium max-w-3xl mx-auto">
              {activeTab === "programs" ? (
                <>
                  <span className="font-black not-italic text-[#00d2ff]">Strategic Sync</span> v4.0
                </>
              ) : activeTab === "diagnostics" ? (
                <>
                  {"Real-time monitoring and "}
                  <span className="font-black not-italic text-gray-900">performance analytics</span>
                  {" for your professional infrastructure."}
                </>
              ) : (
                <>
                  {"Interactive training simulations for "}
                  <span className="font-black not-italic text-gray-900">cognitive excellence</span>.
                </>
              )}
            </p>
          </div>

          {activeTab === "programs" && (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {skillPillars.map((pillar) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.name}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm"
                    >
                      <Icon className="w-4 h-4 text-[#00d2ff]" />
                      {pillar.name}
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col items-center gap-4">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-lg">
                  <Rocket className="w-5 h-5" />
                  Start Sync
                </button>
                <p className="text-sm text-gray-500">Estimated Time: 15min</p>
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 mb-2">Goal: 404 Leadership Points</p>
                <p className="text-lg font-bold text-gray-900">Next Up:</p>
                <div className="inline-flex items-center gap-3 mt-2 px-6 py-3 bg-white rounded-xl shadow-md">
                  <span className="text-gray-900 font-medium">Professional Proficiency Index</span>
                  <span className="px-3 py-1 bg-[#00d2ff]/20 text-[#00d2ff] rounded-full text-sm font-bold">
                    84% Synced
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === "diagnostics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Cpu className="w-8 h-8 text-[#00d2ff] mx-auto mb-3" />
                <p className="text-3xl font-black text-gray-900">98.7%</p>
                <p className="text-sm text-gray-500">CPU Efficiency</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Activity className="w-8 h-8 text-[#10b981] mx-auto mb-3" />
                <p className="text-3xl font-black text-gray-900">12.4TB</p>
                <p className="text-sm text-gray-500">Data Processed</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Zap className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <p className="text-3xl font-black text-gray-900">847K</p>
                <p className="text-sm text-gray-500">Active Centers</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Settings className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-3xl font-black text-gray-900">100%</p>
                <p className="text-sm text-gray-500">System Health</p>
              </div>
            </div>
          )}

          {activeTab === "simulators" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { name: "IEP Meeting Sim", difficulty: "Intermediate", time: "20 min" },
                { name: "Crisis Response", difficulty: "Advanced", time: "15 min" },
                { name: "Parent Conference", difficulty: "Beginner", time: "10 min" },
              ].map((sim) => (
                <div key={sim.name} className="bg-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-2">{sim.name}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{sim.difficulty}</span>
                    <span>{sim.time}</span>
                  </div>
                  <button className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Simulation
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-2xl md:text-3xl italic text-gray-700 mb-8">
              {"\"The future of education isn't about technology—"}
              <br className="hidden md:block" />
              {"it's about "}
              <span className="font-black not-italic text-gray-900">professional excellence</span>.\"
            </p>
            <p className="text-sm uppercase tracking-widest text-gray-500">— Dr. Alvin West, Founder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
