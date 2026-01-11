"use client"

import { useState } from "react"
import { Beaker, Cpu, Lightbulb, Lock, Rocket, Zap, BrainCircuit, Activity } from "lucide-react"

const labModules = [
  {
    id: "cognitive-gym",
    name: "Cognitive Gym",
    icon: Cpu,
    description: "Executive function training for educators",
    status: "active",
    progress: 78,
  },
  {
    id: "policy-forge",
    name: "Policy Forge",
    icon: Lightbulb,
    description: "AI-powered policy document generation",
    status: "active",
    progress: 92,
  },
  {
    id: "compliance-matrix",
    name: "Compliance Matrix",
    icon: Lock,
    description: "Real-time regulatory tracking",
    status: "beta",
    progress: 65,
  },
  {
    id: "neural-bridge",
    name: "Neural Bridge",
    icon: Zap,
    description: "Cross-district data synchronization",
    status: "coming",
    progress: 0,
  },
]

const experiments = [
  { name: "Adaptive IEP Generation", successRate: 94, trials: 12847 },
  { name: "Burnout Prediction Model", successRate: 87, trials: 8934 },
  { name: "Resource Allocation AI", successRate: 91, trials: 5621 },
]

export function SovereignLabs() {
  const [activeModule, setActiveModule] = useState("cognitive-gym")
  const [exerciseActive, setExerciseActive] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [wearableConnected, setWearableConnected] = useState(false)

  const startExercise = (id: string, duration: number) => {
    if (activeModule !== "cognitive-gym") return
    setExerciseActive(id)
    setTimeLeft(duration * 60)

    // Simulate timer (in a real app, use useInterval or similar)
    // For demo purposes, we won't drain it real-time to avoid re-renders every second,
    // but the UI shows 'Active'.
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <section id="sovereign-labs" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm mb-4">
            <Beaker className="w-4 h-4" />
            EXPERIMENTAL ZONE
          </div>
          <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-2">Sovereign Labs</h2>
          <p className="text-gray-400">Where innovation meets education sovereignty</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lab Modules */}
          <div className="lg:col-span-2 space-y-4">
            {labModules.map((module) => {
              const Icon = module.icon
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full p-6 rounded-2xl text-left transition-all ${activeModule === module.id ? "glass-card-emerald" : "glass-card"
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.status === "active"
                          ? "bg-[#10b981]/20"
                          : module.status === "beta"
                            ? "bg-amber-500/20"
                            : "bg-gray-500/20"
                          }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${module.status === "active"
                            ? "text-[#10b981]"
                            : module.status === "beta"
                              ? "text-amber-400"
                              : "text-gray-400"
                            }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white">{module.name}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${module.status === "active"
                              ? "bg-[#10b981]/20 text-[#10b981]"
                              : module.status === "beta"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-gray-500/20 text-gray-400"
                              }`}
                          >
                            {module.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{module.description}</p>
                      </div>
                    </div>
                    {module.progress > 0 && (
                      <span className="text-2xl font-black text-[#00d2ff]">{module.progress}%</span>
                    )}
                  </div>
                  {module.progress > 0 && (
                    <div className="mt-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00d2ff] to-[#10b981] rounded-full transition-all"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Experiments Panel */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-5 h-5 text-[#00d2ff]" />
              <h3 className="font-bold text-white">Active Experiments</h3>
            </div>
            <div className="space-y-4">
              {experiments.map((exp) => (
                <div key={exp.name} className="p-4 bg-white/5 rounded-xl">
                  <p className="font-medium text-white text-sm mb-2">{exp.name}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#10b981]">{exp.successRate}% success</span>
                    <span className="text-gray-500">{exp.trials.toLocaleString()} trials</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="#research-hub" className="block w-full mt-6 py-3 text-center border border-[#00d2ff]/50 text-[#00d2ff] rounded-xl text-sm font-medium hover:bg-[#00d2ff]/10 transition-all">
              View All Experiments
            </a>
          </div>
        </div>

        {/* ACTIVE MODULE INTERFACE: COGNITIVE GYM */}
        {activeModule === "cognitive-gym" && (
          <div className="mt-8 glass-card-gold p-8 rounded-3xl animate-fadeIn relative overflow-hidden">

            {/* Background Breathing Animation for Focus Mode */}
            {exerciseActive === "focus" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-96 h-96 rounded-full bg-[#00d2ff] animate-ping" style={{ animationDuration: '4s' }} />
              </div>
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Cognitive Gym</h3>
                  <p className="text-[#d4af37]">Executive Function Training Protocol // Session 4.2</p>
                </div>
                <div className="ml-auto flex gap-4">
                  {exerciseActive ? (
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase">Status</p>
                      <p className="text-3xl font-mono font-bold text-white animate-pulse">Running {exerciseActive.toUpperCase()}</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase">Focus Score</p>
                        <p className="text-2xl font-bold text-white">92/100</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase">Streak</p>
                        <p className="text-2xl font-bold text-[#10b981]">14 Days</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Exercise 1: Focus Calibration */}
                <button
                  onClick={() => startExercise("focus", 3)}
                  disabled={!!exerciseActive}
                  className={`p-6 rounded-2xl border text-left transition-all group ${exerciseActive === "focus"
                    ? "bg-[#00d2ff]/20 border-[#00d2ff]"
                    : "bg-black/40 border-white/5 hover:border-[#00d2ff]/30"
                    } hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Activity className={`w-6 h-6 ${exerciseActive === "focus" ? "text-white animate-spin" : "text-[#00d2ff] group-hover:scale-110 transition-transform"}`} />
                    <span className="px-2 py-1 rounded text-xs bg-[#00d2ff]/20 text-[#00d2ff]">3 MIN</span>
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">Focus Calibration</h4>
                  <p className="text-sm text-gray-400 mb-4">Sync your alpha waves with visual breathing patterns.</p>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00d2ff] w-[45%]" />
                  </div>
                </button>

                {/* Exercise 2: Decision Sprint */}
                <button
                  onClick={() => startExercise("decision", 5)}
                  disabled={!!exerciseActive}
                  className="p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-[#10b981]/30 transition-all group hover:scale-[1.02] text-left disabled:opacity-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Zap className="w-6 h-6 text-[#10b981] group-hover:scale-110 transition-transform" />
                    <span className="px-2 py-1 rounded text-xs bg-[#10b981]/20 text-[#10b981]">5 MIN</span>
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">Decision Sprint</h4>
                  <p className="text-sm text-gray-400 mb-4">Rapid-fire administrative scenario sorting.</p>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981] w-[70%]" />
                  </div>
                </button>

                {/* Exercise 3: Memory Matrix */}
                <button
                  onClick={() => startExercise("memory", 8)}
                  disabled={!!exerciseActive}
                  className="p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all group hover:scale-[1.02] text-left disabled:opacity-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Cpu className="w-6 h-6 text-[#d4af37] group-hover:scale-110 transition-transform" />
                    <span className="px-2 py-1 rounded text-xs bg-[#d4af37]/20 text-[#d4af37]">8 MIN</span>
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">Memory Matrix</h4>
                  <p className="text-sm text-gray-400 mb-4">Student name and IEP goal association recall.</p>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d4af37] w-[30%]" />
                  </div>
                </button>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${wearableConnected ? "bg-[#10b981]" : "bg-red-500"} animate-pulse`} />
                  <span className="text-sm text-gray-300">
                    Live Bio-Feedback Link: <span className="text-white font-bold">{wearableConnected ? "Connected (BPM: 72 | HRV: 95)" : "Disconnected"}</span>
                  </span>
                </div>
                <button
                  onClick={() => setWearableConnected(!wearableConnected)}
                  className={`px-4 py-2 ${wearableConnected ? "bg-[#10b981]/20 text-[#10b981]" : "bg-white/10 text-white"} rounded-lg text-sm hover:bg-white/20 transition-all`}
                >
                  {wearableConnected ? "Disconnect Device" : "Connect Wearable"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
