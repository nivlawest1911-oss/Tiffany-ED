import { Brain, Shield as LucideShield, Zap, Users, Target, Award } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Strategic Intelligence",
    description: "AI-powered cognitive assistance that learns your administrative patterns and anticipates your needs.",
  },
  {
    icon: LucideShield,
    title: "Leadership Protection",
    description: "FERPA-compliant security with military-grade encryption protecting your district's sensitive data.",
  },
  {
    icon: Zap,
    title: "Instant Compliance",
    description: "Real-time policy tracking and automated documentation that keeps you ahead of regulatory changes.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with 47,000+ educators sharing best practices and strategic insights.",
  },
  {
    icon: Target,
    title: "ROI Precision",
    description: "Track every hour saved and dollar recovered with our advanced analytics dashboard.",
  },
  {
    icon: Award,
    title: "Certification Path",
    description: "Earn recognized credentials that validate your leadership capabilities.",
  },
]

export function WhatIsEdIntel() {
  return (
    <section id="what-is-edintel" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-4">
            What is <span className="text-[#00d2ff]">EdIntel</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            EdIntel is the leadership command center for education leaders. We transform administrative burden
            into strategic advantage through AI-powered intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="glass-card p-6 rounded-2xl hover:border-[#00d2ff]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d2ff]/20 to-[#10b981]/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#00d2ff]" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 glass-card-emerald p-8 md:p-12 rounded-3xl text-center">
          <h3 className="font-black tracking-tighter text-2xl md:text-3xl text-white mb-4">
            The Future of Educational Leadership is Here
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of forward-thinking educators who have already claimed their cognitive leadership. Stop
            drowning in paperwork. Start leading with intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[#10b981] text-black font-bold rounded-xl hover:bg-[#10b981]/90 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
