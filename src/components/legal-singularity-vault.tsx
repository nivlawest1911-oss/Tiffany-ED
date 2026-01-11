"use client"

import { useState } from "react"
import { ExternalLink, Shield, BookOpen, GraduationCap, Scale, Brain, Search } from "lucide-react"

const categories = [
  { id: "state", name: "State/Legal", count: 11, icon: Scale },
  { id: "literacy", name: "Literacy", count: 2, icon: BookOpen },
  { id: "research", name: "Research", count: 5, icon: Brain },
  { id: "specialized", name: "Specialized", count: 5, icon: GraduationCap },
]

const resources = [
  // State/Legal
  {
    title: "Alabama Achieves (ALSDE Official)",
    description: 'Central hub for all state initiatives, memos, and the "Alabama Achieves" strategic plan',
    url: "https://www.alabamaachieves.org",
    priority: "critical",
    category: "state",
  },
  {
    title: "AL Admin Code 290-8-9 (Special Education)",
    description: "Explicit legal definitions for IDEA, FAPE, and procedural safeguards",
    url: "https://www.alabamaachieves.org/special-education/",
    priority: "critical",
    category: "state",
  },
  {
    title: "AIM Portal (ALSDE Identity Management)",
    description: "Administrator login for LEAData, ATGP (Teacher Growth), and LEADAlabama",
    url: "https://aim.alsde.edu",
    priority: "critical",
    category: "state",
  },
  {
    title: "MCPSS Official Website",
    description: "Access to board policies, superintendent updates, and school-specific pages",
    url: "https://www.mcpss.com",
    priority: "critical",
    category: "state",
  },
  {
    title: "Academies of Mobile",
    description: "Tracking for Signature Academies at Vigor, Faulkner, and other district high schools",
    url: "https://www.mcpss.com/academies",
    priority: "high",
    category: "state",
  },
  {
    title: "MCPSS Academy of Virtual Learning",
    description: "The node for the district's flexible learning options",
    url: "https://www.mcpssvirtuallearning.com",
    priority: "medium",
    category: "state",
  },
  {
    title: "ALEX (Alabama Learning Exchange)",
    description: 'State\'s official "One-Stop Shop" for standards-aligned lesson plans and multimedia resources',
    url: "https://alex.state.al.us",
    priority: "critical",
    category: "state",
  },
  {
    title: "ALSDE Digital Report Card (Educator Prep)",
    description: "2025 tool tracking teacher shortages, attrition, and program completion rates",
    url: "https://www.alabamaachieves.org",
    priority: "critical",
    category: "state",
  },
  {
    title: "Alabama 2025 Digital Literacy Standards",
    description:
      '2025 "Alabama Course of Study: Digital Literacy and Computer Science" modernizing classroom requirements',
    url: "https://1819news.com/news/item/alabama-state-board-of-education-approves-new-digital-literacy-standards",
    priority: "critical",
    category: "state",
  },
  {
    title: "CHOOSE Act (2025 ESA Legislation)",
    description: "Education Savings Accounts ($7,000/student) for eligible families to attend participating schools",
    url: "https://www.alabamaachieves.org",
    priority: "critical",
    category: "state",
  },
  {
    title: "Cognia eProve (ACIP Login)",
    description: "Where continuous improvement plans (ACIP) are managed and audited",
    url: "https://myjourney.cognia.org",
    priority: "high",
    category: "state",
  },
  // Literacy
  {
    title: "Alabama Reading Initiative (ARI)",
    description: "Resources for the Literacy Act and K-3 reading coaching",
    url: "https://www.alabamaachieves.org/reading-initiative/",
    priority: "high",
    category: "literacy",
  },
  {
    title: "Alabama LETRS Portal (Lexia)",
    description: "Science of Reading professional learning required for all K-3 educators under Alabama Literacy Act",
    url: "https://www.lexialearning.com/alabama-letrs",
    priority: "critical",
    category: "literacy",
  },
  // Research
  {
    title: "AI & Cognitive Load (MDPI 2025)",
    description: "AI-powered adaptive learning automatically manages cognitive load, improving retention",
    url: "https://www.mdpi.com/journal/education",
    priority: "critical",
    category: "research",
  },
  {
    title: "Burnout Neutralization (Frontiers in Psychology 2025)",
    description:
      'High "AI Literacy" significantly enhances teacher autonomy and competence, directly reducing job burnout',
    url: "https://www.frontiersin.org/journals/psychology",
    priority: "critical",
    category: "research",
  },
  {
    title: "Neural Sync & Recidivism (CBI Studies)",
    description: "Cognitive-Behavioral Interventions focused on self-control reduce recidivism by up to 26%",
    url: "https://www.researchgate.net",
    priority: "critical",
    category: "research",
  },
  {
    title: "Montessori Executive Function Research",
    description: "Montessori environments build Working Memory, Inhibitory Control, and Cognitive Flexibility",
    url: "https://www.researchgate.net",
    priority: "high",
    category: "research",
  },
  {
    title: "Charter School Advantage (Center for Learner Equity)",
    description: "Charter autonomy enables Universal Design for Learning (UDL) and co-teaching models",
    url: "https://www.learnerequity.org",
    priority: "high",
    category: "research",
  },
  // Specialized
  {
    title: "Alabama Mastering the Maze (2025 Portal)",
    description: "Definitive procedural manual for Referral through IEP Implementation in Alabama",
    url: "https://www.alabamaachieves.org/special-education/",
    priority: "critical",
    category: "specialized",
  },
  {
    title: "IDEA Part B (Ages 3-21)",
    description: "Federal mandate for Free Appropriate Public Education (FAPE) in the Least Restrictive Environment",
    url: "https://sites.ed.gov/idea/",
    priority: "critical",
    category: "specialized",
  },
  {
    title: "IDEA Part C (Ages 0-2)",
    description: "Early Intervention (EI) services for infants and toddlers with developmental delays",
    url: "https://sites.ed.gov/idea/",
    priority: "high",
    category: "specialized",
  },
  {
    title: "Procedural Safeguards Hub",
    description: 'Live videos and documents: Parent Rights, "Stay Put" protections, 100% audit compliance',
    url: "https://www.alabamaachieves.org/special-education/",
    priority: "critical",
    category: "specialized",
  },
  {
    title: "PACE Program (Gifted Education)",
    description: "Pursuing Academics, Creativity, and Excellence - MCPSS gifted program since 1970",
    url: "https://www.mcpss.com/pace",
    priority: "high",
    category: "specialized",
  },
]

export function LegalSingularityVault() {
  const [activeCategory, setActiveCategory] = useState("state")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = resources.filter(
    (r) =>
      r.category === activeCategory &&
      (searchQuery === "" || r.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <section id="compliance" className="px-4 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-black tracking-tighter text-3xl md:text-4xl text-white mb-2">Legal Singularity Vault</h2>
          <p className="text-gray-400">ALSDE & MCPSS Compliance Hub</p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            LIVE SYNC
          </div>
        </div>

        {/* Regional Gateway */}
        <div className="glass-card-emerald p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00d2ff]/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#00d2ff]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Regional Gateway</p>
                <h3 className="font-black tracking-tighter text-xl text-white">Alabama Command Node</h3>
              </div>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs text-[#00d2ff]">2025 Updates Available</span>
              <p className="text-xs text-gray-400">6 new resources including Digital Literacy Standards</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d2ff]/50"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeCategory === cat.id
                    ? "bg-[#00d2ff] text-black"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.name}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs ${activeCategory === cat.id ? "bg-black/20" : "bg-[#00d2ff]/20 text-[#00d2ff]"
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-xl hover:border-[#00d2ff]/40 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h4 className="font-bold text-white group-hover:text-[#00d2ff] transition-colors">
                      {resource.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${resource.priority === "critical"
                          ? "bg-red-500/20 text-red-400"
                          : resource.priority === "high"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                    >
                      {resource.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00d2ff] transition-colors flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-black text-[#00d2ff]">11</p>
            <p className="text-xs text-gray-400">State Links</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-[#10b981]">5</p>
            <p className="text-xs text-gray-400">District Links</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white">100%</p>
            <p className="text-xs text-gray-400">Compliance</p>
          </div>
        </div>
      </div>
    </section>
  )
}
