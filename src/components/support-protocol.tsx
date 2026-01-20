"use client"

import { useState } from "react"
import { Headphones, MessageCircle, Book, Video, ChevronRight, Search, Clock } from "lucide-react"

const supportCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Book,
    articles: 24,
    description: "New user guides and onboarding",
  },
  {
    id: "strategic-sync",
    name: "Strategic Sync",
    icon: Video,
    articles: 18,
    description: "Training and certification modules",
  },
  {
    id: "compliance",
    name: "Compliance Hub",
    icon: MessageCircle,
    articles: 32,
    description: "FERPA, IDEA, and policy guides",
  },
  {
    id: "technical",
    name: "Technical Support",
    icon: Headphones,
    articles: 15,
    description: "Troubleshooting and API docs",
  },
]

const faqItems = [
  {
    q: "How does EdIntel ensure FERPA compliance?",
    a: "EdIntel uses end-to-end encryption and role-based access controls. All data is processed in SOC 2 compliant environments.",
  },
  {
    q: "Can I integrate EdIntel with existing SIS systems?",
    a: "Yes, EdIntel supports integration with PowerSchool, Infinite Campus, Skyward, and other major SIS platforms via secure API.",
  },
  {
    q: "What training is required for staff?",
    a: "The Strategic Sync certification takes approximately 2 hours and covers all core features. Additional specialized modules are available.",
  },
]

export function SupportProtocol() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <section id="support" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-2">Support Protocol</h2>
          <p className="text-gray-400">{"We're here to help you achieve cognitive leadership"}</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search support articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d2ff]/50"
            />
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                className="glass-card p-6 rounded-2xl text-left hover:border-[#00d2ff]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00d2ff]/20 flex items-center justify-center mb-4 group-hover:bg-[#00d2ff]/30 transition-colors">
                  <Icon className="w-6 h-6 text-[#00d2ff]" />
                </div>
                <h3 className="font-bold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#00d2ff]">{category.articles} articles</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#00d2ff] transition-colors" />
                </div>
              </button>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="font-black tracking-tighter text-xl text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-800 pb-4 last:border-0">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium text-white">{item.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === index ? "rotate-90" : ""}`}
                  />
                </button>
                {expandedFaq === index && <p className="mt-3 text-sm text-gray-400">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">{"Can't find what you're looking for?"}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#00d2ff] text-black font-semibold rounded-xl hover:bg-[#00d2ff]/90 transition-all">
              <Headphones className="w-5 h-5" />
              Contact Support
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-[#00d2ff]/50 text-[#00d2ff] font-semibold rounded-xl hover:bg-[#00d2ff]/10 transition-all">
              <Clock className="w-5 h-5" />
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
