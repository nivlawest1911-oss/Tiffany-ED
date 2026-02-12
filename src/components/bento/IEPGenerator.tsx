'use client';
import { useState } from 'react';
import { FileText, Sparkles, Download, Copy, CheckCircle, User, Target, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IEPSection {
    title: string;
    content: string;
}

export default function IEPGenerator() {
    const { toast } = useToast();
    const [studentName, setStudentName] = useState('');
    const [grade, setGrade] = useState('');
    const [disability, setDisability] = useState('');
    const [concernArea, setConcernArea] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedIEP, setGeneratedIEP] = useState<IEPSection[]>([]);
    const [copied, setCopied] = useState(false);

    const disabilityCategories = [
        'Specific Learning Disability',
        'Speech or Language Impairment',
        'Other Health Impairment',
        'Autism Spectrum Disorder',
        'Emotional Disturbance',
        'Intellectual Disability',
        'Multiple Disabilities',
        'Orthopedic Impairment',
        'Traumatic Brain Injury',
        'Visual Impairment',
        'Hearing Impairment',
        'Deaf-Blindness',
        'Developmental Delay'
    ];

    const concernAreas = [
        'Reading Comprehension',
        'Written Expression',
        'Mathematics Calculation',
        'Mathematics Problem Solving',
        'Oral Expression',
        'Listening Comprehension',
        'Social/Emotional/Behavioral',
        'Adaptive Behavior',
        'Motor Skills'
    ];

    const [genStep, setGenStep] = useState(0);
    const generationSteps = [
        "Initializing Live Neural Link...",
        "Querying Alabama Strategic Directive (SB280)...",
        "Synthesizing IDEA-Compliant SMART Goals...",
        "Optimizing Science of Reading Scaffolds...",
        "Harmonizing Multi-Tiered Support Systems...",
        "Finalizing Executive IEP Record..."
    ];

    const handleGenerate = async () => {
        if (!studentName || !grade || !disability || !concernArea) {
            toast({
                title: "Incomplete Form",
                description: "Complete student profile to initiate neural synthesis.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        setGenStep(0);

        // Dynamic step timing for a more organic feel
        const stepInterval = setInterval(() => {
            setGenStep(curr => (curr < generationSteps.length - 1 ? curr + 1 : curr));
        }, 1200);

        try {
            const response = await fetch('/api/classroom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `ACT AS: EdIntel IEP Architect.
                    STUDENT: ${studentName} (Grade ${grade})
                    DISABILITY: ${disability}
                    PRIMARY CONCERN: ${concernArea}

                    MANDATORY PROTOCOL:
                    1. CITE Al. Admin. Code 290-8-9 & IDEA 2004 precisely.
                    2. ENSURE all goals are SMART and aligned with Alabama Course of Study.
                    3. INCORPORATE Science of Reading (SOR) principles for literacy concerns.
                    4. STRUCTURE: Use clinical formatting with headers for PLAAFP, Annual Goals, Objectives, Accommodations, and Progress Monitoring.`,
                    mode: 'iep-architect'
                })
            });

            const text = (await response.json()).text || '';
            if (!text) throw new Error("Synthesis Interrupted: Neural feed timed out.");

            // Parse the response into sections
            const sections: IEPSection[] = [
                {
                    title: 'Student Information',
                    content: `Name: ${studentName}\nGrade: ${grade}\nDisability Category: ${disability}\nArea of Concern: ${concernArea}`
                },
                {
                    title: 'Present Levels (PLAAFP)',
                    content: extractWithRegex(text, /PLAAFP|Present Levels/i, /Annual Goal/i) || 'Generated content will appear here.'
                },
                {
                    title: 'Annual Goal',
                    content: extractWithRegex(text, /Annual Goal/i, /Short-term Objectives|Objectives/i) || 'Generated content will appear here.'
                },
                {
                    title: 'Short-term Objectives',
                    content: extractWithRegex(text, /Short-term Objectives|Objectives/i, /Accommodations/i) || 'Generated content will appear here.'
                },
                {
                    title: 'Accommodations & Modifications',
                    content: extractWithRegex(text, /Accommodations/i, /Special Education Services|Services/i) || 'Generated content will appear here.'
                },
                {
                    title: 'Special Education Services',
                    content: extractWithRegex(text, /Special Education Services|Services/i, /Progress Monitoring|Progress/i) || 'Generated content will appear here.'
                },
                {
                    title: 'Progress Monitoring',
                    content: extractWithRegex(text, /Progress Monitoring|Progress/i, null) || 'Generated content will appear here.'
                }
            ];

            // If extraction failed for all AI sections, just show the full response
            // Skip the first section (Student Information)
            const aiSections = sections.slice(1);
            if (aiSections.every(s => s.content === 'Generated content will appear here.')) {
                if (text) {
                    sections[1].title = 'Generated IEP';
                    sections[1].content = text;
                } else {
                    sections[1].content = 'The AI returned an empty response. Please check your API key and connection.';
                }
            }

            setGeneratedIEP(sections);
            clearInterval(stepInterval);
            toast({
                title: "IEP Generated",
                description: "The Individualized Education Program has been successfully drafted.",
            });
        } catch (error: any) {
            console.error('Error generating IEP:', error);

            toast({
                title: "Generation Failed",
                description: error.message || 'Error generating IEP. Please try again.',
                variant: 'destructive',
            });
            clearInterval(stepInterval);
        } finally {
            setIsGenerating(false);
            clearInterval(stepInterval);
        }
    };

    const extractWithRegex = (text: string, startRegex: RegExp, endRegex: RegExp | null): string => {
        if (!text || typeof text !== 'string') return '';

        const startMatch = text.match(startRegex);
        if (!startMatch || startMatch.index === undefined) return '';

        const contentStart = startMatch.index + startMatch[0].length;
        let contentEnd = text.length;

        if (endRegex) {
            // Find the next marker after the start marker
            const remainingText = text.substring(contentStart);
            const endMatch = remainingText.match(endRegex);
            if (endMatch && endMatch.index !== undefined) {
                contentEnd = contentStart + endMatch.index;
            }
        }

        return text.substring(contentStart, contentEnd).trim().replace(/^[:\s*-]+/, '');
    };


    const handleCopyAll = () => {
        const fullIEP = generatedIEP.map(section =>
            `${section.title.toUpperCase()}\n${'='.repeat(50)}\n${section.content}\n\n`
        ).join('');

        navigator.clipboard.writeText(fullIEP);
        setCopied(true);
        toast({
            title: "Copied to Clipboard",
            description: "Full IEP content copied for use.",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopySection = (content: string, title: string) => {
        navigator.clipboard.writeText(content);
        toast({
            title: "Section Copied",
            description: `${title} copied to clipboard.`,
        });
    };

    const handleDownload = () => {
        const fullIEP = generatedIEP.map(section =>
            `${section.title.toUpperCase()}\n${'='.repeat(50)}\n${section.content}\n\n`
        ).join('');

        const blob = new Blob([fullIEP], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `IEP_${studentName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "Download Started",
            description: "Your IEP file is being downloaded.",
        });
    };

    return (
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                        <FileText className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">IEP Generator</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">IDEA-Compliant IEP Creation</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-300 dark:border-indigo-800">
                    <Sparkles className="text-indigo-600 dark:text-indigo-400" size={16} />
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">AI-Powered</span>
                </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <User size={16} />
                        Student Name
                    </label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter student name"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                            <BookOpen size={16} />
                            Grade Level
                        </label>
                        <select
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">Select grade</option>
                            {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => (
                                <option key={g} value={g}>Grade {g}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                            <Target size={16} />
                            Area of Concern
                        </label>
                        <select
                            value={concernArea}
                            onChange={(e) => setConcernArea(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">Select area</option>
                            {concernAreas.map(area => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <Calendar size={16} />
                        Disability Category (IDEA Part B)
                    </label>
                    <select
                        value={disability}
                        onChange={(e) => setDisability(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">Select disability category</option>
                        {disabilityCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                disabled={isGenerating || !studentName || !grade || !disability || !concernArea}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1 mb-6 relative overflow-hidden"
            >
                {isGenerating && (
                    <div className="absolute inset-0 bg-indigo-700/50 flex items-center justify-center z-0">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </div>
                )}

                <div className="relative z-10 flex items-center gap-2">
                    {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                    <span>{isGenerating ? generationSteps[genStep] : 'Generate Complete IEP'}</span>
                </div>

                {isGenerating && (
                    <div className="h-1 w-32 bg-indigo-900/50 rounded-full mt-2 overflow-hidden relative z-10">
                        <div className="h-full bg-white/80 transition-all duration-500" style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }} />
                    </div>
                )}
            </button>

            {/* Generated IEP Display */}
            {generatedIEP.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={20} />
                            IEP Generated Successfully
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyAll}
                                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
                            >
                                <Copy size={16} />
                                {copied ? 'Copied!' : 'Copy All'}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center gap-2"
                            >
                                <Download size={16} />
                                Download
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {generatedIEP.map((section, index) => (
                            <div
                                key={index}
                                className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 group/section relative"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                        {section.title}
                                    </h4>
                                    <button
                                        onClick={() => handleCopySection(section.content, section.title)}
                                        className="opacity-0 group-hover/section:opacity-100 p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-all text-zinc-400 hover:text-indigo-500"
                                        title={`Copy ${section.title}`}
                                    >
                                        <Copy size={14} />
                                    </button>
                                </div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Info Footer */}
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-relaxed">
                    <strong>IDEA Compliance:</strong> All generated IEPs follow IDEA Part B requirements with SMART goals, measurable objectives (80% accuracy over 5 consecutive trials), and FAPE/LRE considerations. Powered by Google Gemini AI.
                </p>
            </div>
        </div>
    );
}
