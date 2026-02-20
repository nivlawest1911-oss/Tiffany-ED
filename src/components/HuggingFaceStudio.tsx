'use client';

/**
 * Hugging Face AI Studio
 * Beautiful interface for all Hugging Face capabilities
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import {
    Sparkles,
    Image as ImageIcon,
    Mic,
    FileText,
    Brain,
    Zap,
    Eye,
    Wand2,
    Camera,
    Search,
} from 'lucide-react';

interface AIStudioProps {
    className?: string;
}

type StudioTab = 'text' | 'image-gen' | 'image-analysis' | 'speech' | 'semantic';

export default function HuggingFaceStudio({ className = '' }: AIStudioProps) {
    const [activeTab, setActiveTab] = useState<StudioTab>('text');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const tabs = [
        { id: 'text' as StudioTab, label: 'Text Analysis', icon: FileText, color: 'amber' },
        { id: 'image-gen' as StudioTab, label: 'Image Generation', icon: Wand2, color: 'purple' },
        { id: 'image-analysis' as StudioTab, label: 'Image Analysis', icon: Eye, color: 'blue' },
        { id: 'speech' as StudioTab, label: 'Speech', icon: Mic, color: 'green' },
        { id: 'semantic' as StudioTab, label: 'Semantic Search', icon: Search, color: 'indigo' },
    ];

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${className}`}>
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-purple-500/30">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "url('/grid.svg')" }}
                />
                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                🤗 Hugging Face AI Studio
                            </h1>
                        </div>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            State-of-the-art AI models for education. Analyze text, generate images, process speech, and more.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-wrap gap-4 mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  relative px-6 py-4 rounded-2xl font-semibold transition-all
                  ${isActive
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
                                    }
                `}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl -z-10"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'text' && (
                            <TextAnalysisPanel loading={loading} setLoading={setLoading} result={result} setResult={setResult} />
                        )}
                        {activeTab === 'image-gen' && (
                            <ImageGenerationPanel loading={loading} setLoading={setLoading} result={result} setResult={setResult} />
                        )}
                        {activeTab === 'image-analysis' && (
                            <ImageAnalysisPanel loading={loading} setLoading={setLoading} result={result} setResult={setResult} />
                        )}
                        {activeTab === 'speech' && (
                            <SpeechPanel loading={loading} setLoading={setLoading} result={result} setResult={setResult} />
                        )}
                        {activeTab === 'semantic' && (
                            <SemanticSearchPanel loading={loading} setLoading={setLoading} result={result} setResult={setResult} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

/**
 * Text Analysis Panel
 */
function TextAnalysisPanel({ loading, setLoading, result, setResult }: any) {
    const [text, setText] = useState('');
    const [operation, setOperation] = useState('sentiment');

    const operations = [
        { id: 'sentiment', label: 'Sentiment Analysis', icon: '😊' },
        { id: 'emotions', label: 'Emotion Detection', icon: '🎭' },
        { id: 'toxicity', label: 'Toxicity Check', icon: '🛡️' },
        { id: 'summarize', label: 'Summarization', icon: '📝' },
        { id: 'analyze-writing', label: 'Writing Analysis', icon: '✍️' },
    ];

    // Ref for cleanup
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const handleAnalyze = async () => {
        if (!text.trim()) return;

        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/huggingface/text-analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, operation }),
                signal: controller.signal
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            if (!controller.signal.aborted) {
                setResult(data.result);
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error('Analysis error:', error);
            }
        } finally {
            if (abortControllerRef.current === controller) {
                setLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                    <h3 className="text-2xl font-bold text-white mb-6">Input Text</h3>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to analyze..."
                        className="w-full h-64 bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />

                    <div className="mt-6 space-y-4">
                        <label className="text-sm font-semibold text-slate-300">Analysis Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {operations.map((op) => (
                                <button
                                    key={op.id}
                                    onClick={() => setOperation(op.id)}
                                    className={`
                    p-4 rounded-xl font-medium transition-all
                    ${operation === op.id
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                            : 'bg-slate-900/50 text-slate-300 hover:bg-slate-900 border border-slate-700'
                                        }
                  `}
                                >
                                    <span className="mr-2">{op.icon}</span>
                                    {op.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !text.trim()}
                        className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Brain className="w-5 h-5 animate-pulse" />
                                Analyzing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5" />
                                Analyze Text
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Results</h3>

                {result ? (
                    <div className="space-y-4">
                        <pre className="bg-slate-900/50 rounded-2xl p-6 text-slate-300 overflow-auto max-h-96">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <Brain className="w-16 h-16 mb-4 opacity-50" />
                        <p>Results will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Image Generation Panel
 */
function ImageGenerationPanel({ loading, setLoading, result, setResult }: any) {
    const [prompt, setPrompt] = useState('');
    const [type, setType] = useState('classroom-visual');

    // Ref for cleanup
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/huggingface/image-generation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, type }),
                signal: controller.signal
            });

            const data = await response.json();
            if (!controller.signal.aborted) {
                setResult(data);
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error('Generation error:', error);
            }
        } finally {
            if (abortControllerRef.current === controller) {
                setLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Generate Image</h3>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-slate-300 mb-2 block">Prompt</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the image you want to generate..."
                            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="image-gen-type" className="text-sm font-semibold text-slate-300 mb-2 block">Type</label>
                        <select
                            id="image-gen-type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="classroom-visual">Classroom Visual</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Wand2 className="w-5 h-5 animate-pulse" />
                                Generating...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Wand2 className="w-5 h-5" />
                                Generate Image
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Generated Image</h3>

                {result?.image ? (
                    <div className="space-y-4">
                        <div className="relative w-full rounded-2xl border border-slate-700 overflow-hidden" style={{ minHeight: '200px' }}>
                            <NextImage
                                src={result.image}
                                alt="Generated"
                                fill
                                unoptimized
                                className="object-contain rounded-2xl"
                            />
                        </div>
                        <p className="text-sm text-slate-400">Prompt: {result.prompt}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p>Generated image will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Image Analysis Panel
 */
function ImageAnalysisPanel({ loading, setLoading, result, setResult }: any) {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [operation, setOperation] = useState('analyze-engagement');

    const operations = [
        { id: 'classify', label: 'Classify', icon: '🏷️' },
        { id: 'detect-objects', label: 'Detect Objects', icon: '🎯' },
        { id: 'caption', label: 'Caption', icon: '💬' },
        { id: 'analyze-engagement', label: 'Analyze Engagement', icon: '📊' },
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Ref for cleanup
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const handleAnalyze = async () => {
        if (!image) return;

        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('operation', operation);

            const response = await fetch('/api/huggingface/image-analysis', {
                method: 'POST',
                body: formData,
                signal: controller.signal
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            if (!controller.signal.aborted) {
                setResult(data.result);
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error('Analysis error:', error);
            }
        } finally {
            if (abortControllerRef.current === controller) {
                setLoading(false);
                abortControllerRef.current = null;
            }
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Upload Image</h3>

                <div className="space-y-6">
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="block w-full p-8 border-2 border-dashed border-slate-700 rounded-2xl text-center cursor-pointer hover:border-purple-500 transition-colors"
                        >
                            {preview ? (
                                <NextImage
                                    src={preview}
                                    alt="Preview"
                                    width={600}
                                    height={256}
                                    unoptimized
                                    className="max-h-64 mx-auto rounded-xl object-contain"
                                />
                            ) : (
                                <div className="text-slate-500">
                                    <Camera className="w-12 h-12 mx-auto mb-2" />
                                    <p>Click to upload image</p>
                                </div>
                            )}
                        </label>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-300 mb-2 block">Analysis Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {operations.map((op) => (
                                <button
                                    key={op.id}
                                    onClick={() => setOperation(op.id)}
                                    className={`
                    p-3 rounded-xl font-medium transition-all text-sm
                    ${operation === op.id
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                            : 'bg-slate-900/50 text-slate-300 hover:bg-slate-900 border border-slate-700'
                                        }
                  `}
                                >
                                    <span className="mr-1">{op.icon}</span>
                                    {op.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !image}
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Eye className="w-5 h-5 animate-pulse" />
                                Analyzing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Eye className="w-5 h-5" />
                                Analyze Image
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Analysis Results</h3>

                {result ? (
                    <div className="space-y-4">
                        <pre className="bg-slate-900/50 rounded-2xl p-6 text-slate-300 overflow-auto max-h-96">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <Eye className="w-16 h-16 mb-4 opacity-50" />
                        <p>Analysis results will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Speech Panel
 */
function SpeechPanel({ loading: _loading, setLoading: _setLoading, result: _result, setResult: _setResult }: any) {
    return (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 text-center">
            <Mic className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-2xl font-bold text-white mb-2">Speech Processing</h3>
            <p className="text-slate-400">Coming soon: Speech-to-text and text-to-speech</p>
        </div>
    );
}

/**
 * Semantic Search Panel
 */
function SemanticSearchPanel({ loading: _loading, setLoading: _setLoading, result: _result, setResult: _setResult }: any) {
    return (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-2xl font-bold text-white mb-2">Semantic Search</h3>
            <p className="text-slate-400">Coming soon: Semantic search and similarity</p>
        </div>
    );
}
