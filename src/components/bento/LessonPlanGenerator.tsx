'use client';
import { useState } from 'react';
import {
    BookOpen,
    Sparkles,
    Download,
    Copy,
    CheckCircle,
    Clock,
    Target,
    Layers,
    PenTool,
    Loader2,
    FileText,
    User
} from 'lucide-react';

interface LessonPlanSection {
    title: string;
    content: string;
}

export default function LessonPlanGenerator() {
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [duration, setDuration] = useState('60');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<LessonPlanSection[]>([]);
    const [copied, setCopied] = useState(false);

    const [genStep, setGenStep] = useState(0);
    const generationSteps = [
        "Initiating Secure Neural Link...",
        "Querying Alabama Course of Study (ALCOS)...",
        "Calibrating SOR & Literacy Scaffolds...",
        "Synthesizing High-Impact Instruction...",
        "Finalizing Lesson Architecture..."
    ];

    const handleGenerate = async () => {
        if (!topic || !subject || !gradeLevel) return;

        setIsGenerating(true);
        setGeneratedPlan([]);
        setGenStep(0);

        // Simulate thinking steps
        const stepInterval = setInterval(() => {
            setGenStep(curr => (curr < generationSteps.length - 1 ? curr + 1 : curr));
        }, 1200);

        try {
            const response = await fetch('/api/classroom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Act as the EdIntel Lesson Architect. Generate a COMPREHENSIVE and CLINICALLY PRECISE lesson plan based on this data:
          Topic: ${topic}
          Subject: ${subject}
          Grade Level: ${gradeLevel}
          Duration: ${duration} minutes

          MANDATORY REQUIREMENTS:
          1. ALABAMA ALIGNMENT: Must specifically cite Alabama Course of Study (ALCOS) standards.
          2. PEDAGOGICAL FIDELITY: Incorporate Science of Reading (SOR) principles and the Alabama Literacy/Numeracy Acts where applicable.
          3. ENGAGEMENT: All activities must be high-impact and evidence-based.

          Include these sections clearly labeled:
          1. OBJECTIVES: Measurable student outcomes (Webb's DOK 2-4).
          2. STANDARDS: Specific ALCOS citations.
          3. MATERIALS: Required resources.
          4. HOOK: A 5-minute high-engagement introductory activity.
          5. DIRECT INSTRUCTION: Core teaching steps.
          6. GUIDED PRACTICE: Collaborative student work.
          7. INDEPENDENT PRACTICE: Individual student work.
          8. ASSESSMENT: How to measure success.
          9. DIFFERENTIATION: Modifications for diverse learners (ELL, SpEd, Gifted).
          `,
                    mode: 'lesson-architect'
                })
            });

            const responseText = await response.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("API Response was not JSON:", responseText);
                throw new Error("Strategic Link Unstable: Server returned invalid format.");
            }

            if (!response.ok || data.error) {
                throw new Error(data?.error || 'Professional Aide Offline');
            }

            const text = data.text || '';

            const sections: LessonPlanSection[] = [
                { title: 'Objectives', content: extractSection(text, 'OBJECTIVES', 'STANDARDS') },
                { title: 'Standards', content: extractSection(text, 'STANDARDS', 'MATERIALS') },
                { title: 'Materials', content: extractSection(text, 'MATERIALS', 'HOOK') },
                { title: 'The Hook', content: extractSection(text, 'HOOK', 'DIRECT INSTRUCTION') },
                { title: 'Direct Instruction', content: extractSection(text, 'DIRECT INSTRUCTION', 'GUIDED PRACTICE') },
                { title: 'Guided Practice', content: extractSection(text, 'GUIDED PRACTICE', 'INDEPENDENT PRACTICE') },
                { title: 'Independent Practice', content: extractSection(text, 'INDEPENDENT PRACTICE', 'ASSESSMENT') },
                { title: 'Assessment', content: extractSection(text, 'ASSESSMENT', 'DIFFERENTIATION') },
                { title: 'Differentiation', content: extractSection(text, 'DIFFERENTIATION', null) },
            ];

            // If parsing fails for any reason, put the full text in the first section
            if (sections.every(s => !s.content.trim())) {
                setGeneratedPlan([{ title: 'Full Lesson Plan', content: text }]);
            } else {
                setGeneratedPlan(sections.filter(s => s.content.trim()));
            }

            clearInterval(stepInterval);
        } catch (error) {
            console.error('Error generating lesson plan:', error);
            setGeneratedPlan([{ title: 'Error', content: 'The Professional Aide encountered a strategic link interruption. Please try again or contact command.' }]);
            clearInterval(stepInterval);
        } finally {
            setIsGenerating(false);
            clearInterval(stepInterval);
        }
    };

    const extractSection = (text: string, start: string, end: string | null): string => {
        const regex = new RegExp(`${start}`, 'i');
        const match = text.match(regex);
        if (!match || match.index === undefined) return '';

        const startPos = match.index + match[0].length;
        let endMatch = null;

        if (end) {
            const endRegex = new RegExp(`${end}`, 'i');
            endMatch = text.substring(startPos).match(endRegex);
        }

        const endIndex = endMatch && endMatch.index !== undefined
            ? startPos + endMatch.index
            : text.length;

        return text.substring(startPos, endIndex).trim().replace(/^[:\s*-]+/, '');
    };

    const handleDownload = () => {
        const fullText = generatedPlan.map(s => `${s.title.toUpperCase()}\n${'='.repeat(20)}\n${s.content}\n\n`).join('');
        const blob = new Blob([fullText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LessonPlan_${topic.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        const fullText = generatedPlan.map(s => `${s.title.toUpperCase()}\n${s.content}\n\n`).join('');
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-8 rounded-3xl bg-[#111] border border-zinc-800 border-t-4 border-t-emerald-500 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <BookOpen size={120} />
            </div>

            <div className="relative z-10 flex-grow flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg">
                            <PenTool className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white">Lesson Planner</h2>
                            <p className="text-xs md:text-sm text-gray-300">AI-Powered Curriculogic Center</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full shrink-0">
                        <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest whitespace-nowrap">Professional Aide</span>
                    </div>
                </div>

                <div className="flex-grow space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                <BookOpen size={14} />
                                Subject
                            </label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Math, Science, ELA..."
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                <PenTool size={14} />
                                Topic
                            </label>
                            <input
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Fractions, Ancient Egypt..."
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                <User size={14} />
                                Grade Level
                            </label>
                            <select
                                value={gradeLevel}
                                onChange={(e) => setGradeLevel(e.target.value)}
                                title="Select Grade Level"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner text-sm appearance-none cursor-pointer"
                            >
                                <option value="">Select Grade</option>
                                <option value="K">Kindergarten</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={n}>Grade {n}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1.5 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                <Clock size={14} />
                                Duration (Min)
                            </label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                title="Lesson Duration in Minutes"
                                placeholder="Min"
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner text-sm"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic || !subject || !gradeLevel}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex flex-col items-center justify-center gap-1 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 relative overflow-hidden"
                >
                    {isGenerating && (
                        <div className="absolute inset-0 bg-emerald-700/50 flex items-center justify-center z-0">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
                        </div>
                    )}

                    <div className="relative z-10 flex items-center gap-3">
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        <span>{isGenerating ? generationSteps[genStep] : 'Generate High-Impact Lesson Plan'}</span>
                    </div>
                    <div className="h-1 w-32 bg-emerald-900/50 rounded-full mt-2 overflow-hidden relative z-10">
                        <div className={`h-full bg-white/80 transition-all duration-500 progress-bar-fill w-prog-${Math.round(((genStep + 1) / generationSteps.length) * 100)}`} />
                    </div>
                </button>

                {generatedPlan.length > 0 && (
                    <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <FileText size={18} className="text-emerald-600" />
                                Lesson Architecture
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-emerald-500/10 transition-all"
                                >
                                    {copied ? <CheckCircle size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    title="Download Lesson Plan"
                                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-emerald-500/10 transition-all"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {generatedPlan.map((section, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-black/20 border border-zinc-800">
                                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">{section.title}</h4>
                                    <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 opacity-60">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <Layers size={14} />
                            <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Scaffolded Design</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Target size={14} />
                            <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Outcome Oriented</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <Clock size={14} />
                            <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Time Optimized</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
