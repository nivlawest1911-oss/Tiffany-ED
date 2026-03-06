'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { HolographicBackground } from "@/components/holographic/HolographicBackground";
import { CodeSnippetGenerator } from '@/components/generators/CodeSnippetGenerator';

export default function CodeSnippetPage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async (params: any) => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate/code-snippet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to generate');
            }

            const data = await response.json();
            return data.content;
        } catch (error: any) {
            console.error("Code Gen Error:", error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            <HolographicBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                            <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/30">
                                <Code className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Educational logic engine</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            AI Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Assistant</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                            Synthesize pedagogically-sound code protocols and instructional scripts for the modern classroom.
                        </p>
                    </motion.div>
                </header>

                <CodeSnippetGenerator
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                />
            </div>
        </div>
    );
}
