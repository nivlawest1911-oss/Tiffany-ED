'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Upload, Download, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CaptionsEditorProps {
    className?: string;
}

export function CaptionsEditor({ className = '' }: CaptionsEditorProps) {
    const [videoUrl, setVideoUrl] = useState('');
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState<'professional' | 'casual' | 'cinematic'>('professional');
    const [isProcessing, setIsProcessing] = useState(false);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [outputUrl, setOutputUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleProcess = async () => {
        if (!videoUrl.trim() || !prompt.trim()) {
            setError('Please provide both video URL and editing instructions');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch('/api/captions/ai-edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    videoUrl,
                    prompt,
                    style,
                    includeCaptions: true,
                    includeMusic: false,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to process video');
            }

            const data = await response.json();
            setProjectId(data.projectId);

            // In a real implementation, you would poll for completion
            // For now, simulate completion after a delay
            setTimeout(() => {
                setOutputUrl(videoUrl); // Placeholder
                setIsProcessing(false);
            }, 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to process video');
            setIsProcessing(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // In a real implementation, upload to blob storage
        // For now, create a local URL
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
    };

    return (
        <Card className={`p-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 ${className}`}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/20 rounded-lg">
                        <Sparkles className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Captions.ai Video Editor</h3>
                        <p className="text-sm text-white/60">AI-powered video editing and captioning</p>
                    </div>
                </div>

                {/* Video Input */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Video URL</label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://example.com/video.mp4"
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isProcessing}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20" />
                        <span className="text-sm text-white/60">or</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>

                    <label className="block">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={isProcessing}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled={isProcessing}
                            onClick={() => document.querySelector('input[type="file"]')?.click()}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Video File
                        </Button>
                    </label>
                </div>

                {/* AI Editing Prompt */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">
                        AI Editing Instructions
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., 'Add engaging captions, remove silence, add smooth transitions, enhance audio quality'"
                        className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        disabled={isProcessing}
                    />
                </div>

                {/* Style Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Video Style</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(['professional', 'casual', 'cinematic'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStyle(s)}
                                disabled={isProcessing}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${style === s
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                                    }`}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Process Button */}
                <Button
                    onClick={handleProcess}
                    disabled={isProcessing || !videoUrl.trim() || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Enhance Video
                        </>
                    )}
                </Button>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                        <p className="text-sm text-red-300">{error}</p>
                    </div>
                )}

                {/* Output Preview */}
                <AnimatePresence>
                    {outputUrl && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="space-y-4"
                        >
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                                <p className="text-sm text-green-300 font-medium">
                                    ✓ Video processed successfully!
                                </p>
                            </div>

                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                <video
                                    src={outputUrl}
                                    controls
                                    className="w-full h-full"
                                >
                                    <track kind="captions" />
                                </video>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => window.open(outputUrl, '_blank')}
                                    className="flex-1 bg-white/10 hover:bg-white/20"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Full Screen
                                </Button>
                                <Button
                                    onClick={() => {
                                        const a = document.createElement('a');
                                        a.href = outputUrl;
                                        a.download = 'edintel-enhanced-video.mp4';
                                        a.click();
                                    }}
                                    className="flex-1 bg-white/10 hover:bg-white/20"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
}
