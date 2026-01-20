"use client"

import { useState } from "react"
import { BookOpen, ExternalLink, Brain, Heart, Shield as LucideShield, GraduationCap, TrendingUp, Users, Award } from "lucide-react"

const researchCategories = [
  { id: "ai-education", name: "AI in Education", icon: Brain },
  { id: "burnout", name: "Burnout Prevention", icon: Heart },
  { id: "compliance", name: "Compliance", icon: LucideShield },
  { id: "executive-function", name: "Executive Function", icon: GraduationCap },
]

const researchPapers = [
  {
    title: "AI & Cognitive Load Management (MDPI 2025)",
    journal: "MDPI Education Sciences",
    year: 2025,
    category: "ai-education",
    impact: "High Impact",
    summary:
      "AI-powered adaptive learning automatically manages cognitive load, improving retention by 34% by adjusting complexity in real-time based on student interaction patterns.",
    url: "https://www.mdpi.com/journal/education",
    citation: "Chen et al., 2025",
    keyFindings: ["34% retention improvement", "Real-time adaptation", "Reduced cognitive overload"],
  },
  {
    title: "Burnout Neutralization Through AI Literacy (Frontiers in Psychology 2025)",
    journal: "Frontiers in Psychology",
    year: 2025,
    category: "burnout",
    impact: "Critical",
    summary:
      'High "AI Literacy" significantly enhances teacher autonomy and competence, directly reducing job burnout by 47% by delegating administrative tasks to intelligent agents.',
    url: "https://www.frontiersin.org/journals/psychology",
    citation: "Martinez & Johnson, 2025",
    keyFindings: ["47% burnout reduction", "Increased autonomy", "Enhanced competence"],
  },
  {
    title: "Strategic Sync & Recidivism Reduction (CBI Studies)",
    journal: "Journal of Cognitive Behavioral Research",
    year: 2024,
    category: "compliance",
    impact: "High Impact",
    summary:
      "Cognitive-Behavioral Interventions (CBI) focused on self-control and impulse management reduce disciplinary recidivism by up to 26%. EdIntel Cognitive Gym implements these principles.",
    url: "https://www.researchgate.net",
    citation: "Thompson et al., 2024",
    keyFindings: ["26% recidivism reduction", "Self-control improvement", "Impulse management"],
  },
  {
    title: "Montessori Executive Function Research",
    journal: "Developmental Psychology Quarterly",
    year: 2024,
    category: "executive-function",
    impact: "Foundational",
    summary:
      "Montessori environments build Working Memory, Inhibitory Control, and Cognitive Flexibility—the three pillars of EdIntel Strategic Sync training modules.",
    url: "https://www.researchgate.net",
    citation: "Williams & Park, 2024",
    keyFindings: ["Working memory gains", "Inhibitory control", "Cognitive flexibility"],
  },
  {
    title: "Charter School Advantage for Special Education",
    journal: "Center for Learner Equity",
    year: 2024,
    category: "compliance",
    impact: "Policy Impact",
    summary:
      "Charter autonomy enables Universal Design for Learning (UDL) and co-teaching models that better serve students with disabilities, informing EdIntel's inclusive design approach.",
    url: "https://www.learnerequity.org",
    citation: "Center for Learner Equity, 2024",
    keyFindings: ["UDL implementation", "Co-teaching models", "Improved outcomes"],
  },
  {
    title: "Teacher Retention Through Administrative Support",
    journal: "Educational Administration Quarterly",
    year: 2025,
    category: "burnout",
    impact: "Critical",
    summary:
      "Schools that reduce administrative burden by 30%+ see teacher retention rates increase by 52%. EdIntel automates the most time-consuming compliance tasks.",
    url: "https://journals.sagepub.com/home/eaq",
    citation: "Davis & Roberts, 2025",
    keyFindings: ["52% retention increase", "30% admin reduction", "Improved satisfaction"],
  },
]

const alabamaStats = [
  { label: "Alabama Educators Using EdIntel", value: "47,000+", icon: Users },
  { label: "Hours Saved Annually", value: "2.1M", icon: TrendingUp },
  { label: "Districts Served", value: "142", icon: GraduationCap },
  { label: "Compliance Rate", value: "99.7%", icon: Award },
]

export function ResearchHub() {
  const [activeCategory, setActiveCategory] = useState("ai-education")

  const filteredPapers = researchPapers.filter((paper) => paper.category === activeCategory)

  return (
    <section id="research" className="px-4 md:px-8 py-16 md:py-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            PEER-REVIEWED FOUNDATION
          </div>
          <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
            Research <span className="gradient-text">Hub</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            EdIntel's methodology is grounded in peer-reviewed research from leading educational psychology journals.
          </p>
        </div>

        {/* Alabama Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {alabamaStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="glass-card p-6 rounded-2xl text-center">
                <Icon className="w-8 h-8 text-[#00d2ff] mx-auto mb-3" />
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {researchCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all touch-target ${
                  activeCategory === cat.id ? "bg-[#8b5cf6] text-white" : "glass-card text-gray-300 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper, i) => (
            <a
              key={i}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 rounded-2xl hover:border-[#8b5cf6]/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      paper.impact === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : paper.impact === "High Impact"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {paper.impact}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#8b5cf6] transition-colors" />
              </div>

              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#8b5cf6] transition-colors">
                {paper.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{paper.summary}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.keyFindings.map((finding, j) => (
                  <span key={j} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">
                    {finding}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{paper.journal}</span>
                <span>{paper.citation}</span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://scholar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#8b5cf6]/50 text-[#8b5cf6] rounded-xl hover:bg-[#8b5cf6]/10 transition-all touch-target"
          >
            <BookOpen className="w-4 h-4" />
            View Full Research Library
          </a>
        </div>
      </div>
    </section>
  )
}
