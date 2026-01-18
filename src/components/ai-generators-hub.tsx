"use client"

import { useState } from "react"
import {
  FileText,
  MessageSquare,
  GraduationCap,
  Shield as LucideShield,
  Brain,
  Lightbulb,
  Sparkles,
  Send,
  Copy,
  Check,
  Loader2,
  BookOpen,
  Users,
  Mic,
  Volume2,
  Accessibility,
} from "lucide-react"

const generators = [
  {
    id: "iep-architect",
    name: "IEP Architect",
    description: "Generate compliant IEP drafts with SMART goals",
    icon: FileText,
    color: "#00d2ff",
    prompts: ["Generate annual IEP goals for...", "Create transition plan for...", "Draft accommodations for..."],
  },
  {
    id: "email-composer",
    name: "Email Composer",
    description: "Professional communications for any audience",
    icon: MessageSquare,
    color: "#10b981",
    prompts: ["Parent conference follow-up", "Staff announcement", "District update"],
  },
  {
    id: "lesson-planner",
    name: "Lesson Planner",
    description: "Standards-aligned lesson plans in seconds",
    icon: GraduationCap,
    color: "#d4af37",
    prompts: ["Alabama Course of Study aligned", "Differentiated instruction", "Project-based learning"],
  },
  {
    id: "policy-advisor",
    name: "Policy Advisor",
    description: "Navigate ALSDE regulations with confidence",
    icon: LucideShield,
    color: "#8b5cf6",
    prompts: ["IDEA compliance check", "504 plan requirements", "FERPA guidelines"],
  },
  {
    id: "cognitive-coach",
    name: "Cognitive Coach",
    description: "Executive function strategies and interventions",
    icon: Brain,
    color: "#ec4899",
    prompts: ["Working memory activities", "Self-regulation techniques", "Focus interventions"],
  },
  {
    id: "idea-generator",
    name: "Idea Generator",
    description: "Creative solutions for classroom challenges",
    icon: Lightbulb,
    color: "#f59e0b",
    prompts: ["Engagement strategies", "Behavior interventions", "Parent involvement"],
  },
]

export function AIGeneratorsHub() {
  const [activeGenerator, setActiveGenerator] = useState(generators[0])
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [response, setResponse] = useState("")
  const [copied, setCopied] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setResponse("")

    // Simulate AI generation with streaming effect
    const sampleResponses: Record<string, string> = {
      "iep-architect": `## Annual IEP Goals - Generated Draft

**Student:** [Name] | **Grade:** [Grade] | **Date:** ${new Date().toLocaleDateString()}

### Goal 1: Reading Comprehension
By the end of the IEP period, the student will improve reading comprehension skills from a 2nd grade level to a 3rd grade level as measured by curriculum-based assessments with 80% accuracy across 3 consecutive trials.

**Objectives:**
1. Student will identify main idea in grade-level passages with 75% accuracy
2. Student will make inferences using text evidence with 70% accuracy
3. Student will summarize key details in sequential order with 80% accuracy

**Accommodations:**
- Extended time on reading assignments (1.5x)
- Text-to-speech technology access
- Graphic organizers for comprehension tasks
- Preferential seating near instruction

*Generated based on Alabama Course of Study Standards and IDEA compliance requirements.*`,
      "email-composer": `## Professional Email Draft

**Subject:** Follow-Up: Parent-Teacher Conference - [Student Name]

Dear [Parent/Guardian Name],

Thank you for taking the time to meet with me during our recent parent-teacher conference. I truly appreciate your partnership in supporting [Student's] educational journey.

As discussed, here are the key action items we agreed upon:

1. **Reading Practice:** 20 minutes of daily reading at home
2. **Homework Check-in:** Review completed assignments each evening
3. **Communication:** Weekly progress updates via email

I'm excited about the strategies we've outlined and confident that with our collaborative efforts, [Student] will continue to make meaningful progress.

Please don't hesitate to reach out if you have any questions or concerns.

Warm regards,
[Your Name]
[Title] | [School Name]
[Contact Information]`,
      "lesson-planner": `## Lesson Plan: Alabama Course of Study Aligned

**Subject:** [Subject] | **Grade:** [Grade] | **Duration:** 45 minutes

### Learning Objectives
Students will be able to:
- Demonstrate understanding of [concept]
- Apply [skill] in real-world scenarios
- Collaborate effectively in group settings

### Alabama Standards Addressed
- [Standard Code]: [Description]

### Materials Needed
- Interactive whiteboard
- Student devices (1:1)
- Manipulatives/handouts

### Lesson Sequence

**Hook (5 min):** Engaging opening question or demonstration

**Direct Instruction (10 min):** Teacher-led explanation with visual supports

**Guided Practice (15 min):** Collaborative group activity

**Independent Practice (10 min):** Individual application

**Closure (5 min):** Exit ticket and reflection

### Differentiation
- **Tier 1:** Standard instruction with visual supports
- **Tier 2:** Small group re-teaching with manipulatives
- **Tier 3:** 1:1 support with modified expectations`,
    }

    // Simulate streaming response
    const fullResponse =
      sampleResponses[activeGenerator.id] ||
      `## ${activeGenerator.name} Response

Your request has been processed. Here's a tailored response based on Alabama education standards and best practices...

[Generated content would appear here based on your specific prompt]

*Powered by EdIntel Sovereign AI - Peer-reviewed methodology from Frontiers in Psychology (2025)*`

    for (let i = 0; i <= fullResponse.length; i += 3) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      setResponse(fullResponse.slice(0, i))
    }
    setResponse(fullResponse)
    setIsGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  return (
    <section id="ai-generators" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
      {/* Holographic background effect */}
      <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] text-sm mb-4 float-animation">
            <Sparkles className="w-4 h-4" />
            AI-POWERED GENERATORS
          </div>
          <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
            Neural <span className="gradient-text">Intelligence</span> Hub
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Six specialized AI assistants designed for Alabama educators. Generate IEPs, emails, lesson plans, and more
            in seconds.
          </p>
        </div>

        {/* Accessibility notice */}
        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-400">
          <Accessibility className="w-4 h-4" />
          <span>Fully accessible with voice input, screen reader support, and keyboard navigation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generator Selection */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">Select AI Generator</p>
            {generators.map((gen) => {
              const Icon = gen.icon
              return (
                <button
                  key={gen.id}
                  onClick={() => {
                    setActiveGenerator(gen)
                    setResponse("")
                    setPrompt("")
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all touch-target ${
                    activeGenerator.id === gen.id ? "glass-card-emerald scale-[1.02]" : "glass-card hover:scale-[1.01]"
                  }`}
                  style={{
                    borderColor: activeGenerator.id === gen.id ? gen.color : undefined,
                  }}
                  aria-pressed={activeGenerator.id === gen.id}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center pulse-glow"
                      style={{ backgroundColor: `${gen.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: gen.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{gen.name}</h3>
                      <p className="text-sm text-gray-400">{gen.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Generator Interface */}
          <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = activeGenerator.icon
                    return (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${activeGenerator.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: activeGenerator.color }} />
                      </div>
                    )
                  })()}
                  <div>
                    <h3 className="font-black tracking-tighter text-xl text-white">{activeGenerator.name}</h3>
                    <p className="text-xs text-gray-400">Sovereign AI v4.0</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">Online</span>
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Quick Prompts</p>
                <div className="flex flex-wrap gap-2">
                  {activeGenerator.prompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(p)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all touch-target"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="relative mb-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe what you need from ${activeGenerator.name}...`}
                  className="w-full h-32 p-4 pr-12 bg-black/30 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-[#00d2ff]/50 text-lg"
                  aria-label="AI prompt input"
                />
                <button
                  onClick={handleVoiceInput}
                  className={`absolute right-4 top-4 p-2 rounded-lg transition-all ${
                    isListening ? "bg-red-500 text-white" : "bg-white/10 text-gray-400 hover:text-white"
                  }`}
                  aria-label="Voice input"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-4 bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg touch-target"
                aria-busy={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Response...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate with Sovereign AI
                  </>
                )}
              </button>

              {/* Response Area */}
              {response && (
                <div className="mt-6 p-6 bg-black/30 border border-white/10 rounded-2xl relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00d2ff]" />
                      <span className="text-sm text-gray-400">AI Response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          /* Text to speech */
                        }}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all"
                        aria-label="Read aloud"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-200 text-base leading-relaxed">
                      {response}
                    </pre>
                  </div>
                </div>
              )}

              {/* Research Citation */}
              <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Peer-reviewed: Frontiers in Psychology (2025)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>47,000+ Alabama educators served</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
