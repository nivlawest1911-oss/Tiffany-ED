'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code,
    Sparkles,
    Zap,
    Download,
    Copy,
    Check,
    Cpu,
    Terminal,
    BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { useIntelligence } from '@/context/IntelligenceContext';
import { useEffect } from 'react';

interface CodeSnippetGeneratorProps {
    onGenerate: (params: {
        language: string;
        complexity: string;
        topic: string;
        educationalContext: string;
    }) => Promise<string>;
    isGenerating: boolean;
}

export const CodeSnippetGenerator = ({ onGenerate, isGenerating }: CodeSnippetGeneratorProps) => {
    const { addAction } = useIntelligence();
    const [language, setLanguage] = useState('Python');
    const [complexity, setComplexity] = useState('Beginner');
    const [topic, setTopic] = useState('');
    const [educationalContext, setEducationalContext] = useState('');
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const animationSequence = [
        "Neural Threading Active",
        "Analyzing Logic Patterns",
        "Synthesizing Pedagogical Code",
        "Verifying Logic Integrity"
    ];

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % animationSequence.length);
            }, 2000);
            return () => clearInterval(interval);
        } else {
            setCurrentIndex(0);
        }
    }, [isGenerating, animationSequence.length]);

    const handleGenerate = async () => {
        if (!topic) {
            toast.error("Please enter a code topic or objective.");
            return;
        }

        try {
            const result = await onGenerate({
                language,
                complexity,
                topic,
                educationalContext
            });
            setGeneratedCode(result);
            addAction(`Code Protocol Synthesized: ${topic} (${language})`);
            toast.success("Code Protocol Synthesized!");
        } catch (_error) {
            toast.error("Failed to generate code snippet.");
        }
    };

    const copyToClipboard = () => {
        if (!generatedCode) return;

        // Extract code from markdown block if present
        const codeMatch = generatedCode.match(/```[\w]*\n([\s\S]*?)```/);
        const codeToCopy = codeMatch ? codeMatch[1] : generatedCode;

        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-4 space-y-6"
            >
                <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-cyan-400" />
                            System Parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                Programming Language
                            </label>
                            <select
                                value={language}
                                title="Select Language"
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                            >
                                <option>Python</option>
                                <option>JavaScript</option>
                                <option>HTML/CSS</option>
                                <option>Java</option>
                                <option>Scratch Logic</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                Complexity Level
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                                    <button
                                        key={lvl}
                                        onClick={() => setComplexity(lvl)}
                                        className={`py-2 px-1 rounded-lg border text-[10px] font-bold uppercase transition-all ${complexity === lvl
                                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                            : 'bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10'
                                            }`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                Code Topic / Goal
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. For-loops with animals, Grade calculator..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-sm focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                Educational Context
                            </label>
                            <textarea
                                placeholder="Describe how this will be used in class (e.g. 8th grade math demonstration)..."
                                value={educationalContext}
                                onChange={(e) => setEducationalContext(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none min-h-[100px] resize-none"
                            />
                        </div>

                        <Button
                            className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all group"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <Zap className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            )}
                            {isGenerating ? 'Synthesizing...' : 'Generate Code'}
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Output Panel */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-8"
            >
                <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 h-full flex flex-col min-h-[600px]">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/30">
                                <Terminal className="w-4 h-4 text-cyan-400" />
                            </div>
                            <CardTitle className="text-white text-sm uppercase tracking-widest font-black">
                                Strategic Code Protocol
                            </CardTitle>
                        </div>
                        <div className="flex gap-2">
                            {generatedCode && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-zinc-400 hover:text-white"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            )}
                            <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-zinc-400 hover:text-white"
                                onClick={() => toast.info("Downloading code protocol...")}
                                aria-label="Download Code"
                                title="Download Code"
                            >
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {generatedCode ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full overflow-y-auto p-8 custom-scrollbar"
                                >
                                    <div className="prose prose-invert prose-cyan max-w-none">
                                        {/* Simple rendering for now, can enhance with specialized highlighter */}
                                        <div className="rounded-2xl bg-black/60 border border-white/5 p-6 font-mono text-sm leading-relaxed mb-8 relative group">
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="text-[8px] text-cyan-500 font-black uppercase tracking-tighter bg-cyan-500/10 px-2 py-1 rounded">Verified Logic</div>
                                            </div>
                                            <pre className="text-cyan-50/90 whitespace-pre-wrap">
                                                {generatedCode.includes('```')
                                                    ? generatedCode.split('```')[1].replace(/^[a-z]*\n/, '')
                                                    : generatedCode}
                                            </pre>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-cyan-400">
                                                <BookOpen className="w-4 h-4" />
                                                <h4 className="text-xs font-black uppercase tracking-wider m-0">Educator's Strategic Note</h4>
                                            </div>
                                            <div className="text-zinc-400 text-sm leading-relaxed italic bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                                                {generatedCode.split('```').pop()?.trim()}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-30">
                                    <div className="p-8 rounded-full bg-zinc-800/50 border border-white/5">
                                        <Code className="w-16 h-16 text-zinc-500" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-white font-bold text-lg uppercase tracking-widest">Compiler Standby</h3>
                                        <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                                            Awaiting instructional parameters. Input data to begin neural code synthesis.
                                        </p>
                                    </div>

                                    {isGenerating && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 rounded-2xl transition-all duration-500">
                                            <div className="text-center space-y-8 max-w-md px-6">
                                                <div className="relative">
                                                    <div className="w-24 h-24 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            opacity: [0.3, 0.7, 0.3]
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full"
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <AnimatePresence mode="wait">
                                                        <motion.p
                                                            key={currentIndex}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs h-4"
                                                        >
                                                            {animationSequence[currentIndex]}
                                                        </motion.p>
                                                    </AnimatePresence>

                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                        <motion.div
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 15, ease: "linear" }}
                                                            className="h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                                        {[
                                                            { label: "Logic", val: "Synthesized" },
                                                            { label: "Syntax", val: "Verified" },
                                                            { label: "Pedagogy", val: "Optimized" },
                                                            { label: "Rigor", val: complexity }
                                                        ].map((metric, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: idx * 0.2 }}
                                                                className="p-2 rounded-lg bg-white/5 border border-white/10"
                                                            >
                                                                <div className="text-[8px] text-zinc-500 uppercase font-black">{metric.label}</div>
                                                                <div className="text-[10px] text-white font-mono">{metric.val}</div>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    <p className="text-[10px] text-zinc-500 font-mono animate-pulse">
                                                        Drafting sovereign code structures...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
