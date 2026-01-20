"use client"

import { useState } from "react"
import { Beaker, Cpu, Lightbulb, Lock, Rocket, Zap } from "lucide-react"

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
    id: "connection-bridge",
    name: "Connection Bridge",
    icon: Zap,
    description: "Cross-district data integration",
    status: "coming",
    progress: 0,
  },
]

const experiments = [
  { name: "Adaptive IEP Generation", successRate: 94, trials: 12847 },
  { name: "Burnout Prediction Model", successRate: 87, trials: 8934 },
  { name: "Resource Allocation AI", successRate: 91, trials: 5621 },
]

export function InnovationLabs() {
  const [activeModule, setActiveModule] = useState("cognitive-gym")

  return (
    <section id="innovation-labs" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm mb-4">
            <Beaker className="w-4 h-4" />
            EXPERIMENTAL ZONE
          </div>
          <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-2">Innovation Labs</h2>
          <p className="text-gray-400">Where innovation meets educational excellence</p>
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
            <button className="w-full mt-6 py-3 border border-[#00d2ff]/50 text-[#00d2ff] rounded-xl text-sm font-medium hover:bg-[#00d2ff]/10 transition-all">
              View All Experiments
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
