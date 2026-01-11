'use client';
import { useState, FormEvent } from 'react';
import { Loader2, Copy, Check, Sparkles, Download } from 'lucide-react';

interface EnhancedGeneratorProps {
    generatorId: string;
    generatorName: string;
    generatorColor: string;
    generatorIcon: any;
    prompts: string[];
}

export default function EnhancedGenerator({
    generatorId,
    generatorName,
    generatorColor,
    generatorIcon: Icon,
    prompts
}: EnhancedGeneratorProps) {
    const [input, setInput] = useState('');
    const [completion, setCompletion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setCompletion('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    generatorId,
                    stream: true
                })
            });

            if (!response.ok) throw new Error('Generation failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const text = decoder.decode(value);
                    setCompletion(prev => prev + text);
                }
            }
        } catch (error) {
            console.error('Generation error:', error);
            setCompletion('❌ Generation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (completion) {
            await navigator.clipboard.writeText(completion);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (completion) {
            const blob = new Blob([completion], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${generatorId}-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: generatorColor }}
                    >
                        <Icon size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">{generatorName}</h1>
                        <p className="text-zinc-400 text-sm">Powered by EdIntel Intelligence Engine</p>
                    </div>
                </div>

                {/* Quick Prompts */}
                <div className="space-y-2">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Quick Start</p>
                    <div className="flex flex-wrap gap-2">
                        {prompts.map((prompt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleQuickPrompt(prompt)}
                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-all hover:scale-105"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe what you need..."
                            className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none resize-none"
                            disabled={isLoading}
                        />
                        <div className="absolute bottom-4 right-4 text-xs text-zinc-600">
                            {input.length} characters
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl font-bold text-white hover:shadow-lg hover:shadow-blue-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate
                            </>
                        )}
                    </button>
                </form>

                {/* Output */}
                {(completion || isLoading) && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Generated Content</p>
                            {completion && !isLoading && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
                                    >
                                        <Download size={14} />
                                        Download
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[200px]">
                            {isLoading && !completion && (
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>AI is thinking...</span>
                                </div>
                            )}
                            {completion && (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <pre className="whitespace-pre-wrap font-sans text-zinc-100 leading-relaxed">
                                        {completion}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Info Footer */}
                <div className="text-center text-xs text-zinc-600 space-y-1">
                    <p>✨ Powered by Google Gemini 2.0 Flash</p>
                    <p>🔒 Your data is processed securely and not stored</p>
                </div>
            </div>
        </div>
    );
}
