"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Shield,
  Brain,
  Lightbulb,
  Check,
  Loader2,
  BookOpen,
  Mic,
  BarChart3,
  Cpu,
  Zap,
  Copy,
  Sparkles
} from "lucide-react"
import { useCelebrate } from '@/context/CelebrationContext';

const generators = [
  {
    id: "iep-specialist",
    name: "IEP ARCHITECT",
    role: "Compliance & Inclusion Specialist",
    description: "Generate clinically precise, legally defensible IEP drafts aligned with Alabama Code.",
    detailedPrompt: "You are the Sovereign IEP Architect. Your goal is to generate high-fidelity, legally defensible Individualized Education Program (IEP) components. Focus on SMART goals that are specific, measurable, attainable, relevant, and time-bound. Reference specific Alabama courses of study and IDEA 2004 compliance markers. Tone: Clinical, empathetic, and authoritative.",
    icon: FileText,
    color: "#00d2ff",
    prompts: ["Draft a goal for Reading Comprehension (3rd Grade)", "Create behavior intervention strategies for ADHD", "Summarize PLAAFP data into a narrative"],
  },
  {
    id: "lesson-planner",
    name: "CURRICULUM SYNDICATE",
    role: "Instructional Design Lead",
    description: "Design rigorous, Tier 1 instruction plans aligned to ALSOL (Alabama Course of Study).",
    detailedPrompt: "You are the Curriculum Syndicate Lead. Design a 5E instructional plan that targets Alabama Course of Study standards. Ensure the lesson includes Tier 2/3 scaffolding, explicit vocabulary instruction (Science of Reading aligned), and a clear formative assessment data check. Tone: Academic, inspiring, and structured.",
    icon: BookOpen,
    color: "#10b981",
    prompts: ["Plan a 5th Grade Science lesson on Ecosystems", "Create a Tier 2 scaffold for quadratic equations", "Design a project-based learning unit on Civics"],
  },
  {
    id: "data-analyst",
    name: "DATA QUANT",
    role: "Strategic Analyst",
    description: "Process complex assessment vectors to identify achievement gaps and growth trends.",
    detailedPrompt: "You are the Data Quant. Analyze the provided data context (or hypothetical scenario) to find 'red flag' regression trends and 'green flag' growth areas. Suggest specific instructional pivots based on the data. Tone: Objective, analytical, and strategic.",
    icon: BarChart3,
    color: "#d4af37",
    prompts: ["Analyze 3rd grade reading fluency drop", "Correlate attendance with math failure rates", "Suggest interventions for the 'bubble' students"],
  },
  {
    id: "policy-advisor",
    name: "COMPLIANCE SENTINEL",
    role: "Legal & Ethics Officer",
    description: "Navigate federal and state education codes (ALSDE, IDEA, ESSA) with absolute precision.",
    detailedPrompt: "You are the Compliance Sentinel. specific tailored advice on school law, student privacy (FERPA), and special education compliance (IDEA/Section 504). Cite specific codes when possible. Tone: Legalistic, protective, and precise.",
    icon: Shield,
    color: "#8b5cf6",
    prompts: ["Explain Manifestation Determination Review steps", "Check 504 Plan eligibility criteria", "Clarify FERPA regarding parent emails"],
  },
  {
    id: "cognitive-coach",
    name: "NEURAL COACH",
    role: "Executive Function Specialist",
    description: "Evidence-based interventions for EF deficits, ADHD, and neurodivergent learning profiles.",
    detailedPrompt: "You are the Neural Coach. Provide specific, actionable strategies for improving executive functions (working memory, inhibition, cognitive flexibility). Base advice on neuroscience and self-regulation research (e.g., Barkley, Dawson & Guare). Tone: Supportive, scientific, and practical.",
    icon: Brain,
    color: "#ec4899",
    prompts: ["Strategies for impulse control in middle school", "Working memory scaffolds for math", "De-escalation script for sensory overload"],
  },
  {
    id: "idea-generator",
    name: "INNOVATION ENGINE",
    role: "Creative Director",
    description: "Generate novel engagement hook and culturally responsive classroom strategies.",
    detailedPrompt: "You are the Innovation Engine. Generate creative, out-of-the-box ideas for classroom engagement, school culture, and parent partnerships. Focus on culturally responsive pedagogy and 'stickiness'. Tone: Energetic, visionary, and creative.",
    icon: Lightbulb,
    color: "#f59e0b",
    prompts: ["Gamify a history review session", "Creative parent night themes", "Morning meeting activity for trust building"],
  },
]

export function AIGeneratorsHub() {
  const { celebrate } = useCelebrate();
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

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          generatorId: activeGenerator.id,
          systemInstruction: `
            ${activeGenerator.detailedPrompt}
            OBJECTIVE: ${activeGenerator.description}
            CONTEXT: The user is an Alabama Educator/Administrator using Sovereign OS.
            CRITICAL: Output must be formatted with Markdown (bolding key terms, using bullet points).
          `
        })
      });

      if (!res.ok) throw new Error('Neural Link Interrupted');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          setResponse((prev) => prev + chunk);
        }

        celebrate(
          'Intelligence Synthesized',
          `${activeGenerator.name} has successfully architected your solution.`,
          'success'
        );
      }
    } catch (error: any) {
      console.error('Generation failure:', error);
      setResponse(`⚠️ CRITICAL ERROR: Neural synthesis failed. Reference: ${error.message}. Please restart the Sovereign Protocol.`);
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulation of voice activation
      const voicePrompt = " [Listening for directives...]";
      setPrompt(prev => prev + voicePrompt);
      setTimeout(() => {
        setPrompt(prev => prev.replace(voicePrompt, ""));
      }, 3000);
    }
  }

  return (
    <div id="ai-generators" className="w-full relative overflow-hidden bg-black rounded-b-[3rem]">

      {/* Header Section */}
      <div className="text-center pt-10 mb-12 relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-gold/10 border border-noble-gold/30 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-pulse-slow">
          <Cpu className="w-4 h-4" />
          Sovereign Neural Grid
        </div>
        <h2 className="font-black italic tracking-tighter text-4xl md:text-5xl text-white mb-4 uppercase">
          Strategic <span className="gold-gradient-text">Intelligence</span> Hub
        </h2>
        <p className="text-white/40 text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-widest font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-noble-gold" />
          Deploy specialized AI agents for high-fidelity compliance & operations.
          <Sparkles className="w-4 h-4 text-noble-gold" />
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 pb-12">

        {/* Generator Selection Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2 mb-4">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Select Agent</p>
            <div className="flex items-center gap-1.5 opacity-50">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Grid Online</span>
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {generators.map((gen) => {
              const Icon = gen.icon
              const isActive = activeGenerator.id === gen.id;
              return (
                <button
                  key={gen.id}
                  onClick={() => {
                    setActiveGenerator(gen)
                    setResponse("")
                    setPrompt("")
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden group border
                            ${isActive
                      ? "bg-noble-gold/10 border-noble-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-glow"
                      className="absolute inset-0 bg-gradient-to-r from-noble-gold/10 to-transparent opacity-20"
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                                ${isActive ? 'bg-black text-noble-gold border border-noble-gold/30' : 'bg-white/5 text-white/20 group-hover:text-white/60'}`}>
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-black text-sm uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                        {gen.name}
                      </h3>
                      <p className="text-[9px] font-bold text-noble-gold/60 uppercase tracking-wider">{gen.role}</p>
                    </div>

                    {isActive && <div className="w-2 h-2 rounded-full bg-noble-gold shadow-[0_0_10px_#D4AF37]" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tactical Interface */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-[600px] bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

          {/* Interface Header */}
          <div className="p-8 border-b border-white/5 relative z-10 bg-white/[0.01]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-noble-gold/10 flex items-center justify-center border border-noble-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <activeGenerator.icon className="w-8 h-8 text-noble-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">{activeGenerator.name}</h3>
                <div className="flex items-center gap-3">
                  <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest">v4.2-Stable</div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Latency: Negligible</span>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-white/60 leading-relaxed border-l-2 border-noble-gold/30 pl-4">{activeGenerator.description}</p>
          </div>

          {/* Interaction Zone */}
          <div className="p-8 flex-1 flex flex-col gap-6 relative z-10 overflow-hidden">
            {!response ? (
              <>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Quick Directives</span>
                  <div className="flex flex-wrap gap-3">
                    {activeGenerator.prompts.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(p)}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-noble-gold/30 hover:bg-noble-gold/5 text-xs font-bold text-zinc-400 hover:text-white transition-all text-left uppercase tracking-wide"
                      >
                        <span className="text-noble-gold mr-2">➜</span> {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[200px] relative mt-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={`INITIATE ${activeGenerator.name} PROTOCOL...`}
                    className="w-full h-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white placeholder:text-zinc-700 font-mono text-sm resize-none focus:outline-none focus:border-noble-gold/50 transition-all shadow-inner relative z-10"
                  />
                  <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={handleVoiceToggle}
                      className={`p-3 rounded-xl border border-white/5 transition-all ${isListening ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-white/5 text-white/40 hover:text-white'}`}
                      aria-label={isListening ? "Stop recording" : "Start voice input"}
                      title={isListening ? "Stop Recording" : "Voice Input"}
                    >
                      <Mic size={18} />
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="px-6 py-3 rounded-xl bg-noble-gold text-black font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-3"
                    >
                      {isGenerating ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} fill="currentColor" />}
                      {isGenerating ? "Synthesizing..." : "Execute"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Check size={12} strokeWidth={4} /> Synchronization Complete
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setResponse("")} className="px-3 py-1.5 rounded-lg bg-white/5 text-[9px] font-black uppercase text-white/40 hover:text-white tracking-widest transition-all">New Task</button>
                    <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg bg-noble-gold/10 text-[9px] font-black uppercase text-noble-gold hover:bg-noble-gold/20 tracking-widest transition-all">
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-8 overflow-y-auto custom-scrollbar shadow-inner relative">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap font-sans">
                      {response}
                    </div>
                  </div>
                  {/* Watermark */}
                  <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none">
                    <Shield size={100} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
