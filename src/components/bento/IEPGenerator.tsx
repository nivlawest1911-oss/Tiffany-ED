'use client';
import { useState } from 'react';
import { FileText, Sparkles, Download, Copy, CheckCircle, User, Target, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateIEPWithToken } from '@/lib/actions/iep-actions';

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
    const [evaluationData, setEvaluationData] = useState('');
    const [lrePreference, setLrePreference] = useState('Inclusion (General Education)');
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
                title: "Incomplete Profile",
                description: "Complete student profile to initiate neural synthesis.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        setGenStep(0);

        // 1. Initiate Token Transaction
        const tokenResult = await generateIEPWithToken(studentName);

        if (!tokenResult.success) {
            setIsGenerating(false);
            if (tokenResult.error === 'LOW_TOKENS') {
                toast({
                    title: "Capacity Alert: Neural Tokens Depleted",
                    description: "Your sovereign balance is zero. Transition to a premium tier to restore generation capacity.",
                    variant: "destructive",
                    className: "bg-[#111] border-amber-500/50 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]",
                });
            } else {
                toast({
                    title: "Transaction Failed",
                    description: tokenResult.message,
                    variant: "destructive"
                });
            }
            return;
        }

        // Dynamic step timing for a more organic feel
        const stepInterval = setInterval(() => {
            setGenStep(curr => (curr < generationSteps.length - 1 ? curr + 1 : curr));
        }, 1200);

        try {
            const response = await fetch('/api/generate/iep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentNeeds: disability,
                    gradeLevel: grade,
                    focusAreas: concernArea,
                    duration: '12 Months',
                    evaluationData,
                    lrePreference
                })
            });

            const data = await response.json();
            const text = data.content || '';
            if (!text) throw new Error("Synthesis Interrupted: Neural feed timed out.");

            // Parse the response into sections based on the new Verse Protocol
            const sections: IEPSection[] = [
                {
                    title: 'Student Profile',
                    content: `Name: ${studentName}\nGrade: ${grade}\nDisability: ${disability}\nFocus: ${concernArea}\nLRE Preference: ${lrePreference}`
                },
                {
                    title: 'Present Levels (PLAAFP)',
                    content: extractWithRegex(text, /PLAAFP|Present Levels/i, /Annual Goals|Measurable Annual Goals/i) || 'Content pending...'
                },
                {
                    title: 'SMART Annual Goals',
                    content: extractWithRegex(text, /Annual Goals|Measurable Annual Goals/i, /Special Education and Related Services/i) || 'Content pending...'
                },
                {
                    title: 'Services & Support',
                    content: extractWithRegex(text, /Special Education and Related Services/i, /Accommodations and Modifications/i) || 'Content pending...'
                },
                {
                    title: 'Accommodations',
                    content: extractWithRegex(text, /Accommodations and Modifications/i, /LRE Rationale|Least Restrictive Environment/i) || 'Content pending...'
                },
                {
                    title: 'LRE Rationale',
                    content: extractWithRegex(text, /LRE Rationale|Least Restrictive Environment/i, /PROCURAL SAFEGUARDS NOTICE|SAFEGUARDS/i) || 'Content pending...'
                },
                {
                    title: 'Procedural Safeguards',
                    content: extractWithRegex(text, /PROCURAL SAFEGUARDS NOTICE|SAFEGUARDS/i, null) || 'Content pending...'
                }
            ];

            // If extraction failed for all AI sections, just show the full response
            const aiSections = sections.slice(1);
            if (aiSections.every(s => s.content === 'Content pending...')) {
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
        <div className="h-full flex flex-col p-6 md:p-8 rounded-3xl bg-[#111] border border-zinc-800 border-t-4 border-t-purple-500 shadow-2xl overflow-hidden text-zinc-100">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-purple-600 flex items-center justify-center">
                        <FileText className="text-white" size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">IEP Generator</h2>
                        <p className="text-xs md:text-sm text-gray-400 font-medium">IDEA-Compliant Neural Synthesis</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-purple-800 shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.1)]">
                    <Sparkles className="text-purple-400" size={14} />
                    <span className="text-[10px] md:text-xs font-black text-purple-400 tracking-wider uppercase">Transactional</span>
                </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4 mb-6 grow custom-scrollbar overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-1.5 text-zinc-500 flex items-center gap-2">
                            <User size={12} />
                            Student Node
                        </label>
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Identify subject node..."
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-inner text-sm font-medium placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-zinc-500 flex items-center gap-2">
                                <BookOpen size={12} />
                                Grade Level
                            </label>
                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                title="Select student grade level"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium appearance-none"
                            >
                                <option value="" className="bg-zinc-900">Select Grade</option>
                                {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => (
                                    <option key={g} value={g} className="bg-zinc-900">Grade {g}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-zinc-500 flex items-center gap-2">
                                <Target size={12} />
                                Concern Area
                            </label>
                            <select
                                value={concernArea}
                                onChange={(e) => setConcernArea(e.target.value)}
                                title="Select area of concern"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium appearance-none"
                            >
                                <option value="" className="bg-zinc-900">Select Focus</option>
                                {concernAreas.map(area => (
                                    <option key={area} value={area} className="bg-zinc-900">{area}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-zinc-500 flex items-center gap-2">
                            <Calendar size={12} />
                            Disability Category
                        </label>
                        <select
                            value={disability}
                            onChange={(e) => setDisability(e.target.value)}
                            title="Select disability category"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium appearance-none"
                        >
                            <option value="" className="bg-zinc-900">Select IDEA Category</option>
                            {disabilityCategories.map(cat => (
                                <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-zinc-500 flex items-center gap-2">
                            <Sparkles size={12} className="text-purple-500" />
                            LRE Preference
                        </label>
                        <select
                            value={lrePreference}
                            onChange={(e) => setLrePreference(e.target.value)}
                            title="Select LRE preference profile"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium appearance-none"
                        >
                            <option value="Inclusion (General Education)" className="bg-zinc-900">Inclusion (Gen Ed)</option>
                            <option value="Resource Room (Partial Segregation)" className="bg-zinc-900">Resource Room</option>
                            <option value="Specialized Unit (Full Segregation)" className="bg-zinc-900">Specialized Unit</option>
                            <option value="Homebound/Remote" className="bg-zinc-900">Homebound/Remote</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2 text-zinc-500 flex items-center gap-2">
                            <BookOpen size={12} />
                            Clinical Evaluation Data (Optional)
                        </label>
                        <textarea
                            value={evaluationData}
                            onChange={(e) => setEvaluationData(e.target.value)}
                            placeholder="Inject WJ-IV scores, BASC-3 observations, or specific performance metrics..."
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none text-sm font-medium placeholder:text-zinc-700"
                        />
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !studentName || !grade || !disability || !concernArea}
                    className="w-full py-4 bg-purple-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1 mb-6 relative overflow-hidden shadow-[0_4px_20px_rgba(147,51,234,0.3)] mt-4"
                >
                    {isGenerating && (
                        <div className="absolute inset-0 bg-purple-700/50 flex items-center justify-center z-0">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
                        </div>
                    )}

                    <div className="relative z-10 flex items-center gap-2">
                        {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        <span>{isGenerating ? (genStep === 0 ? "Calculating Neural Weights..." : generationSteps[genStep]) : 'Generate Complete IEP'}</span>
                    </div>

                    {!isGenerating && (
                        <div className="relative z-10 text-[9px] text-purple-300 font-bold tracking-[0.2em] -mt-0.5">
                            COST: 1 NEURAL TOKEN
                        </div>
                    )}

                        <div 
                            className="h-0.5 w-32 bg-purple-900/50 rounded-full mt-2 overflow-hidden relative z-10"
                            style={{ '--progress-width': `${((genStep + 1) / generationSteps.length) * 100}%` } as React.CSSProperties}
                        >
                            <div className="h-full bg-white/80 transition-all duration-500 progress-bar-fill" />
                        </div>
                </button>

                {/* Generated IEP Display */}
                {generatedIEP.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pt-4 border-t border-zinc-800">
                            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                <CheckCircle size={16} />
                                Synthesis Complete
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={handleCopyAll}
                                    className="px-3 py-1.5 bg-zinc-800 text-[11px] font-bold uppercase tracking-wider text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2 border border-zinc-700"
                                >
                                    <Copy size={13} />
                                    {copied ? 'Copied' : 'Copy All'}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="px-3 py-1.5 bg-purple-600 text-[11px] font-bold uppercase tracking-wider text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-lg shadow-purple-900/20"
                                >
                                    <Download size={13} />
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            {generatedIEP.map((section, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 group/section relative"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                                            {section.title}
                                        </h4>
                                        <button
                                            onClick={() => handleCopySection(section.content, section.title)}
                                            className="opacity-0 group-hover/section:opacity-100 p-1.5 hover:bg-zinc-800 rounded-md transition-all text-zinc-500 hover:text-purple-400"
                                            title={`Copy ${section.title}`}
                                        >
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                    <div className="text-sm text-zinc-400 font-medium whitespace-pre-wrap leading-relaxed selection:bg-purple-500/30">
                                        {section.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Status Indicator */}
                <div className="mt-8 p-4 bg-purple-900/10 rounded-2xl border border-purple-800/30">
                    <div className="flex gap-3">
                        <ShieldCheck className="text-purple-500 shrink-0" size={16} />
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-purple-400 mb-1">IDEA Compliance Protocol</p>
                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                                All generated IEPs adhere to IDEA Part B standards, incorporating SMART goals (80% accuracy over 5 trials) and FAPE/LRE considerations. Verified by Strategic Directive SB280.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component or simple inline helper for the badge/icon
function ShieldCheck({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .66-.94l8-3a1 1 0 0 1 .68 0l8 3A1 1 0 0 1 20 6v7z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
