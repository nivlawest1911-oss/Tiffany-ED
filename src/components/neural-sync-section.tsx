"use client"

import { useState, useRef } from "react"
import { Settings, Activity, Cpu, Zap, Play, Rocket, Brain, Shield, Heart, Target, CheckCircle2, RefreshCw } from "lucide-react"

const skillPillars = [
  { name: "Pedagogical Nuance", icon: Brain, id: "pedagogy" },
  { name: "Compliance Logic", icon: Shield, id: "compliance" },
  { name: "Admin Authority", icon: Target, id: "authority" },
  { name: "Sentiment Alignment", icon: Heart, id: "sentiment" },
]

export function NeuralSyncSection() {
  const [activeTab, setActiveTab] = useState<"programs" | "diagnostics" | "simulators">("programs")
  const [selectedPillars, setSelectedPillars] = useState<string[]>(["pedagogy", "compliance", "authority", "sentiment"])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProtocol, setGeneratedProtocol] = useState("")
  const [syncPercentage, setSyncPercentage] = useState(84)
  const protocolRef = useRef<HTMLDivElement>(null)

  const togglePillar = (id: string) => {
    setSelectedPillars(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const simulateStreaming = (fullText: string) => {
    let i = 0
    setGeneratedProtocol("")
    const stream = setInterval(() => {
      setGeneratedProtocol(fullText.slice(0, i))
      i += 8 // Slightly faster typing
      if (i > fullText.length) {
        clearInterval(stream)
        setGeneratedProtocol(fullText)
        setSyncPercentage(100)
        // Scroll to result
        setTimeout(() => {
          protocolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 100)
      }
    }, 10)
  }

  const handleGenerate = async () => {
    if (selectedPillars.length === 0) return
    setIsGenerating(true)
    setGeneratedProtocol("")

    // UI Drift Simulation
    let drift = 0
    const driftInterval = setInterval(() => {
      drift += 1
      setSyncPercentage(prev => Math.min(prev + 0.5, 99))
      if (drift > 30) clearInterval(driftInterval)
    }, 100)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          generatorId: 'neural-sync',
          prompt: `Generate a protocol covering: ${selectedPillars.join(', ')}.`,
          context: `User is an educational leader using the Sovereign Neural Sync system. Current Sync Level: ${syncPercentage}%.`
        })
      });

      if (!res.ok) throw new Error("Sync Interrupted");

      const data = await res.json()
      // Use API Response or Fallback from API
      simulateStreaming(data.text || getClientFallbackProtocol())

    } catch (error) {
      console.error("API Failure, using client fallback", error)
      // CLIENT-SIDE FALLBACK (Nuclear Option)
      simulateStreaming(getClientFallbackProtocol())
    } finally {
      setIsGenerating(false)
      clearInterval(driftInterval)
    }
  }

  const getClientFallbackProtocol = () => {
    return `## PERSONALIZED AI PROTOCOL: NEURAL SYNC v4.0

### 1. PEDAGOGICAL NUANCE
*   **Cognitive Load Optimization**: Reduce extraneous cognitive load by 15% through streamlined instructional design.
*   **Socratic AI Integration**: Deploy Socratic questioning modules to deepen student critical thinking.

### 2. COMPLIANCE LOGIC
*   **Automated Audit Trails**: Ensure all IEP and 504 documentation is timestamped and immutable.
*   **Policy Shielding**: Proactively align campus policies with the latest ALSDE administrative code updates (A.C. 290-8-9).

### 3. ADMIN AUTHORITY
*   **Decisive Communication**: Implement a "Brief & Debrief" protocol for all faculty meetings to enhance command presence.
*   **Resource Sovereignty**: Reallocate discretionary funds to high-impact autonomous learning zones.

### 4. SENTIMENT ALIGNMENT
*   **Proactive Narrative Control**: Publish weekly "Sovereign Success" stories to align parent perception with school goals.
*   **Feedback Loop Closure**: Respond to 95% of stakeholder inquiries within 24 hours using AI-drafted templates.

>> PROTOCOL STATUS: READY FOR EXECUTION.`
  }

  return (
    <section id="neural-sync" className="py-16 md:py-24">
      {/* Off-white section with heavy italic typography */}
      <div className="bg-[#f5f5f0] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-black tracking-tighter text-3xl md:text-4xl text-gray-900 mb-2">NeuralSync Command</h2>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Sovereign Training Node // v4.0</p>
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
            Global Protocol // Session 1
          </p>

          <div className="text-center mb-12">
            <h2 className="font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-4">
              {activeTab === "programs"
                ? "Personalized AI Protocol"
                : activeTab === "diagnostics"
                  ? "SYSTEM DIAGNOSTICS"
                  : "NEURAL SIMULATORS"}
            </h2>
            <p className="text-xl md:text-2xl italic text-gray-700 font-medium max-w-3xl mx-auto">
              {activeTab === "programs" ? (
                <>
                  <span className="font-black not-italic text-[#00d2ff]">Neural Sync</span> v4.0
                </>
              ) : activeTab === "diagnostics" ? (
                <>
                  {"Real-time monitoring and "}
                  <span className="font-black not-italic text-gray-900">performance analytics</span>
                  {" for your sovereign infrastructure."}
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
                  const isSelected = selectedPillars.includes(pillar.id)
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => togglePillar(pillar.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all border-2 cursor-pointer ${isSelected
                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                        : "bg-transparent text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900"
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? "text-[#00d2ff]" : "text-gray-400"}`} />
                      {pillar.name}
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || selectedPillars.length === 0}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-lg transform active:scale-95 disabled:opacity-50 disabled:transform-none select-none"
                >
                  {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                  {isGenerating ? "Synthesizing Protocol..." : "Launch Protocol"}
                </button>
                <p className="text-sm text-gray-500">Estimated Drift: 15sec</p>
              </div>

              {generatedProtocol && (
                <div ref={protocolRef} className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeIn relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00d2ff] via-[#10b981] to-[#d4af37] rounded-t-2xl" />
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                    <h3 className="font-bold text-lg text-gray-900">Protocol Generated Successfully</h3>
                  </div>
                  <div className="prose prose-sm max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
                    <pre className="whitespace-pre-wrap font-sans bg-gray-50 p-6 rounded-xl border border-gray-100 text-sm leading-relaxed">{generatedProtocol}</pre>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button className="flex-1 py-3 border border-gray-300 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 transition-all">
                      Archive to Dossier
                    </button>
                    <button className="flex-1 py-3 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-all shadow-lg">
                      Execute Actions
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 mb-2">Goal: 400 Sovereignty Points</p>
                <p className="text-lg font-bold text-gray-900">Next Up:</p>
                <div className="inline-flex items-center gap-3 mt-2 px-6 py-3 bg-white rounded-xl shadow-md transition-all">
                  <span className="text-gray-900 font-medium">Sovereign Proficiency Index</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${syncPercentage >= 100
                    ? "bg-[#10b981]/20 text-[#10b981]"
                    : "bg-[#00d2ff]/20 text-[#00d2ff]"
                    }`}>
                    {Math.floor(syncPercentage)}% Synced
                  </span>
                </div>
              </div>
            </>
          )}
          {/* ... Diagnostics and Simulators tabs preserved ... */}
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
                <p className="text-sm text-gray-500">Active Nodes</p>
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
              <span className="font-black not-italic text-gray-900">cognitive sovereignty</span>.\"
            </p>
            <p className="text-sm uppercase tracking-widest text-gray-500">— Dr. Alvin West, Founder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
