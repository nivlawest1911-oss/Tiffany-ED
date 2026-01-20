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
    FileText
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
        "Analyzing Standards & Curriculum...",
        "Identifying Engagement Strategies...",
        "Drafting Differentiation Protocols...",
        "Aligning Assessment Metrics...",
        "Finalizing Lesson Plan..."
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
                    message: `Generate a comprehensive, high-engagement lesson plan for:
          Topic: ${topic}
          Subject: ${subject}
          Grade Level: ${gradeLevel}
          Duration: ${duration} minutes

          Include these sections clearly labeled:
          1. OBJECTIVES: Measurable student outcomes.
          2. STANDARDS: Alignment with general academic standards.
          3. MATERIALS: Required resources.
          4. HOOK: A 5-minute high-engagement introductory activity.
          5. DIRECT INSTRUCTION: Core teaching steps.
          6. GUIDED PRACTICE: Collaborative student work.
          7. INDEPENDENT PRACTICE: Individual student work.
          8. ASSESSMENT: How to measure success.
          9. DIFFERENTIATION: Modifications for diverse learners (ELL, SpEd, Gifted).
          `,
                    mode: 'aide'
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
        <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <BookOpen size={120} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg">
                            <PenTool className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Lesson Planner</h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">AI-Powered Curriculogic Center</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Professional Aide</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Subject</label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Math, Science, ELA..."
                                className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Topic</label>
                            <input
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Fractions, Ancient Egypt..."
                                className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Grade Level</label>
                            <select
                                value={gradeLevel}
                                onChange={(e) => setGradeLevel(e.target.value)}
                                className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
                            >
                                <option value="">Select Grade</option>
                                <option value="K">Kindergarten</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => <option key={n} value={n}>Grade {n}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Duration (Min)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                        </div>
                    )}

                    <div className="relative z-10 flex items-center gap-3">
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        <span>{isGenerating ? generationSteps[genStep] : 'Generate High-Impact Lesson Plan'}</span>
                    </div>
                    {isGenerating && (
                        <div className="h-1 w-32 bg-emerald-900/50 rounded-full mt-2 overflow-hidden relative z-10">
                            <div className="h-full bg-white/80 transition-all duration-500" style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }} />
                        </div>
                    )}
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
                                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-emerald-500/10 transition-all"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {generatedPlan.map((section, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-zinc-800">
                                    <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">{section.title}</h4>
                                    <div className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 opacity-60">
                    <div className="flex items-center gap-6">
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
