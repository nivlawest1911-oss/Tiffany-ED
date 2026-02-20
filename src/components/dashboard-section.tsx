"use client"


import { TrendingUp, BarChart3, Users, Brain, Mic, MapPin, Activity, Infinity } from "lucide-react"

export function DashboardSection() {


  return (
    <section className="px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="font-black tracking-tighter text-3xl md:text-5xl text-[#00d2ff] mb-2">STRATEGIC SYSTEM</h3>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Professional State Intelligence Matrix</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card-emerald p-6 rounded-2xl col-span-1 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-sm">Revenue Intelligence</h4>
                  <span className="text-xs text-emerald-300">+247%</span>
                </div>
              </div>
            </div>
            <p className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2">$12.8B</p>
            <p className="text-sm text-gray-400 mb-4">Statewide Revenue Achievement Fund</p>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-black/30 rounded-lg mb-4">
              <div className="text-center">
                <p className="text-lg font-black text-emerald-400">$4.2B</p>
                <p className="text-[10px] text-gray-400 uppercase">Allocated</p>
              </div>
              <div className="text-center border-x border-emerald-500/20">
                <p className="text-lg font-black text-amber-400">$3.1B</p>
                <p className="text-[10px] text-gray-400 uppercase">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-[#00d2ff]">$5.5B</p>
                <p className="text-[10px] text-gray-400 uppercase">Projected</p>
              </div>
            </div>

            {/* Mini chart visualization */}
            <div className="h-20 flex items-end gap-1">
              {[40, 65, 45, 80, 55, 90, 70, 95, 85, 100].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-500/50 to-emerald-400 rounded-t transition-all duration-300 hover:from-emerald-500/70 hover:to-emerald-300"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Strategic Grid Capacity */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#00d2ff]" />
              </div>
              <h4 className="font-bold text-[#00d2ff] uppercase tracking-wider text-sm">Strategic Grid Capacity</h4>
            </div>
            {/* Wave visualization */}
            <div className="h-32 flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="w-full h-full">
                <path
                  d="M0,30 Q25,10 50,30 T100,30 T150,30 T200,30"
                  fill="none"
                  stroke="#00d2ff"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <path
                  d="M0,30 Q25,50 50,30 T100,30 T150,30 T200,30"
                  fill="none"
                  stroke="#00d2ff"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-400 uppercase">Optimal Flow</span>
              <div className="flex items-center gap-2">
                <Infinity className="w-4 h-4 text-[#00d2ff]" />
                <span className="text-sm text-[#00d2ff]">Vibe-Meter</span>
              </div>
            </div>
          </div>

          {/* Community Prosperity Portal */}
          <div className="bg-[#f5f5f0] text-gray-900 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,210,255,0.2)]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-600 uppercase tracking-wider text-sm line-through">
                Community Prosperity
              </h4>
              <span className="text-emerald-600 font-bold">+3.2%</span>
            </div>
            <h3 className="font-black tracking-tighter text-2xl mb-4 text-gray-900">Community Fund Portal</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#00d2ff]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#00d2ff]" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-900">92%</p>
                <p className="text-sm text-gray-600">Workforce Readiness</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Battier Key Insight: High Enrollment</p>
          </div>

          {/* Teacher's Strategic Co-Pilot */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-[#00d2ff]" />
              <h4 className="font-bold text-white uppercase tracking-wider text-sm">{"Teacher's Strategic Co-Pilot"}</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <span className="text-xs text-emerald-400">Suggested Lesson: Louisiana State Standards</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#00d2ff]/10 rounded-lg border border-[#00d2ff]/30">
                <span className="text-xs text-[#00d2ff]">Guided Practice: Multiple-step exercise</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                <span className="text-xs text-amber-400">⚠ Intervention Needed</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Suggesting a Restorative Specialty to Bailey High School</p>
          </div>

          {/* Professional Summary */}
          <div className="glass-card p-6 rounded-2xl text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Professional Summary</p>
            <p className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2">$2.8B</p>
            <p className="text-lg text-gray-300 mb-4">Total Lifecycle Value</p>
            <p className="text-xs text-gray-500">
              Detailed Investment Understanding
              <br />
              From related characteristics
              <br />
              Monitor Characteristics
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 3 ? "bg-[#00d2ff]" : "bg-gray-600"}`} />
              ))}
            </div>
          </div>

          {/* Voice Interface */}
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#10b981] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-400">Tap to Speak Objective</p>
            <div className="flex gap-4 mt-4">
              <button className="w-10 h-10 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center hover:bg-[#00d2ff]/30 transition-colors">
                <BarChart3 className="w-5 h-5 text-[#00d2ff]" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center hover:bg-[#00d2ff]/30 transition-colors">
                <MapPin className="w-5 h-5 text-[#00d2ff]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
