'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  FileText, 
  BarChart2, 
  Copy, 
  Check,
  RefreshCw,
  Sliders,
  ShieldCheck
} from 'lucide-react';

interface DemoPreset {
  grade: string;
  subject: string;
  topic: string;
  standard: string;
  scaffold: string[];
  rubric: string[];
  timeSaved: string;
}

const PRESETS: DemoPreset[] = [
  {
    grade: "Grade 3",
    subject: "Literacy & Phonics",
    topic: "Decodable Text Comprehension",
    standard: "ALCOS R.3.2 • Science of Reading",
    scaffold: [
      "Explicit Tier 2 Vocabulary Pre-teach: 'metamorphosis', 'ecosystem'",
      "Visual Anchor Chart: Context Clues & Phonics Rules",
      "Differentiated Small Group Prompt with Sentence Starters",
      "Decodable Exit Ticket aligned to Alabama Literacy Act benchmarks"
    ],
    rubric: [
      "Exemplary (4 pts): Identifies 3+ textual evidence items with accurate phonemic decoding.",
      "Proficient (3 pts): Identifies 2 textual evidence items with teacher prompt support.",
      "Developing (2 pts): Recalls story events with visual cue cards."
    ],
    timeSaved: "45 minutes"
  },
  {
    grade: "Grade 7",
    subject: "Math & Algebra",
    topic: "Proportional Relationships & Ratios",
    standard: "ALCOS 7.PR.1 • STEM Scaffolding",
    scaffold: [
      "Real-world Context Warmup: Unit Rates in Grocery Pricing",
      "Interactive Manipulative Step: Graphing Proportions on Coordinate Planes",
      "AI Formative Assessment Check with Instant Misconception Alerts",
      "Tier 3 Remediation Worksheet for Struggling Learners"
    ],
    rubric: [
      "Exemplary (4 pts): Correctly formulates y = kx equations and interprets slope contextually.",
      "Proficient (3 pts): Graphs proportional relationship accurately with minor scaling guidance."
    ],
    timeSaved: "50 minutes"
  },
  {
    grade: "Grade 10",
    subject: "Biology & Life Sciences",
    topic: "Cellular Respiration & ATP Production",
    standard: "ALCOS Bio.10.4 • High School Science",
    scaffold: [
      "Interactive Diagram Breakdown: Mitochondria Electron Transport Chain",
      "Guided Inquiry Question Set: Aerobic vs. Anaerobic Pathways",
      "Rubric-Aligned Lab Summary Draft Generator",
      "Student Self-Assessment Reflection Protocol"
    ],
    rubric: [
      "Exemplary (4 pts): Connects glucose breakdown to net ATP yields across all 3 metabolic phases."
    ],
    timeSaved: "60 minutes"
  }
];

export default function InteractiveDemo() {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(100);

  const preset = PRESETS[activePresetIndex];

  const handleGenerate = (index: number) => {
    if (index === activePresetIndex && !isGenerating) return;
    setIsGenerating(true);
    setProgress(0);
    setActivePresetIndex(index);
  };

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            return 100;
          }
          return prev + 25;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleCopy = () => {
    const textToCopy = `Topic: ${preset.topic}\nStandard: ${preset.standard}\nScaffold:\n${preset.scaffold.join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl border border-white/15 bg-gradient-to-b from-[#0F172A] to-[#0A0F1C] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C5A46E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE INTERACTIVE ENGINE DEMO
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Experience the EdIntel AI Multiplier
          </h3>
          <p className="text-white/60 text-sm mt-1">
            Select a subject grade to generate a traceable, ALCOS-aligned lesson scaffold in under 2 seconds.
          </p>
        </div>

        {/* Preset selector tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
          {PRESETS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleGenerate(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activePresetIndex === idx
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A46E] text-[#0A0F1C] shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.grade} • {item.subject.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Output Box */}
      <div className="rounded-2xl border border-white/10 bg-[#050811] p-6 relative">
        {/* Output Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest block">TARGET ALCOS STANDARD</span>
              <span className="text-sm font-semibold text-[#D4AF37]">{preset.standard}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono hidden sm:inline-block">
              Saved ~{preset.timeSaved}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-xs flex items-center gap-1.5"
              title="Copy Scaffold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar when generating */}
        {isGenerating && (
          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-xs font-mono text-[#D4AF37]">
              <span>Neural Scaffolding Engine Running...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-emerald-400 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Generated Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Column 1: Scaffolding Steps */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>Multi-Tier Differentiated Scaffold</span>
            </div>
            <ul className="space-y-3">
              {preset.scaffold.map((step, sIdx) => (
                <li 
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/80 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Rubric & FERPA Shield */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <BarChart2 className="w-4 h-4 text-[#D4AF37]" />
              <span>ALCOS Rubric & Compliance Metadata</span>
            </div>
            <div className="space-y-3">
              {preset.rubric.map((rub, rIdx) => (
                <div key={rIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/80 leading-relaxed">
                  {rub}
                </div>
              ))}
            </div>

            {/* Compliance Badge */}
            <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <div className="text-xs font-bold text-white">FERPA & PII Zero Data Retention</div>
                  <div className="text-[11px] text-white/60">Fully encrypted in-transit & at rest</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] px-2 py-1 rounded bg-[#D4AF37]/15">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
