'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, Download, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface InVideoCreatorProps {
    className?: string;
}

export function InVideoCreator({ className = '' }: InVideoCreatorProps) {
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState<'professional' | 'casual' | 'educational'>('educational');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
    const [duration, setDuration] = useState(60);
    const [isCreating, setIsCreating] = useState(false);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a video description');
            return;
        }

        setIsCreating(true);
        setError(null);
        setProgress(0);

        try {
            const response = await fetch('/api/invideo/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    style,
                    aspectRatio,
                    duration,
                    includeMusic: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create video');
            }

            const data = await response.json();
            setProjectId(data.projectId);

            // Poll for completion
            const pollInterval = setInterval(async () => {
                try {
                    const statusResponse = await fetch(
                        `/api/invideo/create?projectId=${data.projectId}`
                    );
                    const status = await statusResponse.json();

                    if (status.status === 'completed' && status.video_url) {
                        setVideoUrl(status.video_url);
                        setProgress(100);
                        clearInterval(pollInterval);
                        setIsCreating(false);
                    } else if (status.status === 'failed') {
                        throw new Error('Video creation failed');
                    } else {
                        setProgress(status.progress || Math.min(progress + 3, 95));
                    }
                } catch (err) {
                    clearInterval(pollInterval);
                    setError(err instanceof Error ? err.message : 'Unknown error');
                    setIsCreating(false);
                }
            }, 5000);

            setTimeout(() => {
                clearInterval(pollInterval);
                if (isCreating) {
                    setError('Video creation timeout');
                    setIsCreating(false);
                }
            }, 600000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create video');
            setIsCreating(false);
        }
    };

    return (
        <Card className={`p-6 bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 ${className}`}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-pink-500/20 rounded-lg">
                        <Wand2 className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">InVideo AI Creator</h3>
                        <p className="text-sm text-white/60">Generate complete videos from text prompts</p>
                    </div>
                </div>

                {/* Prompt Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Video Description</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the video you want to create... E.g., 'Create an educational video about the water cycle for 5th graders with animations and clear explanations'"
                        className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                        disabled={isCreating}
                    />
                </div>

                {/* Settings */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Style</label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value as any)}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            disabled={isCreating}
                        >
                            <option value="educational">Educational</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Aspect Ratio</label>
                        <select
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value as any)}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            disabled={isCreating}
                        >
                            <option value="16:9">16:9 (Landscape)</option>
                            <option value="9:16">9:16 (Portrait)</option>
                            <option value="1:1">1:1 (Square)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Duration (seconds)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            min={15}
                            max={300}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            disabled={isCreating}
                        />
                    </div>
                </div>

                {/* Create Button */}
                <Button
                    onClick={handleCreate}
                    disabled={isCreating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3"
                >
                    {isCreating ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Creating... {progress}%
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Create Video
                        </>
                    )}
                </Button>

                {/* Progress Bar */}
                <AnimatePresence>
                    {isCreating && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                        >
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <p className="text-xs text-white/60 text-center">
                                AI is generating your video with visuals, voiceover, and music...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                        <p className="text-sm text-red-300">{error}</p>
                    </div>
                )}

                {/* Video Preview */}
                <AnimatePresence>
                    {videoUrl && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="space-y-4"
                        >
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                                <p className="text-sm text-green-300 font-medium">
                                    ✓ Video created successfully!
                                </p>
                            </div>

                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                <video
                                    src={videoUrl}
                                    controls
                                    className="w-full h-full"
                                >
                                    <track kind="captions" />
                                </video>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => window.open(videoUrl, '_blank')}
                                    className="flex-1 bg-white/10 hover:bg-white/20"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Full Screen
                                </Button>
                                <Button
                                    onClick={() => {
                                        const a = document.createElement('a');
                                        a.href = videoUrl;
                                        a.download = 'edintel-ai-video.mp4';
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

                {/* Tips */}
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <p className="text-xs font-semibold text-white/80">💡 Tips for better results:</p>
                    <ul className="text-xs text-white/60 space-y-1 list-disc list-inside">
                        <li>Be specific about the topic and target audience</li>
                        <li>Mention desired visual style (animations, live footage, etc.)</li>
                        <li>Specify tone (formal, casual, energetic, calm)</li>
                        <li>Include key points you want covered</li>
                    </ul>
                </div>
            </div>
        </Card>
    );
}
