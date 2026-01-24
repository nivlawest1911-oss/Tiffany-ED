'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Video, Wand2, Download, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface VideoGeneratorProps {
    className?: string;
}

export function HeyGenVideoGenerator({ className = '' }: VideoGeneratorProps) {
    const [script, setScript] = useState('');
    const [avatarId, setAvatarId] = useState('default');
    const [voiceId, setVoiceId] = useState('en-US-JennyNeural');
    const [isGenerating, setIsGenerating] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!script.trim()) {
            setError('Please enter a script');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setProgress(0);

        try {
            // Generate video
            const response = await fetch('/api/heygen/generate-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    script,
                    avatarId,
                    voiceId,
                    title: 'EdIntel Educational Content',
                    aspectRatio: '16:9',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate video');
            }

            const data = await response.json();
            setVideoId(data.videoId);

            // Poll for completion
            const pollInterval = setInterval(async () => {
                try {
                    const statusResponse = await fetch(
                        `/api/heygen/generate-video?videoId=${data.videoId}`
                    );
                    const status = await statusResponse.json();

                    if (status.status === 'completed' && status.video_url) {
                        setVideoUrl(status.video_url);
                        setProgress(100);
                        clearInterval(pollInterval);
                        setIsGenerating(false);
                    } else if (status.status === 'failed') {
                        throw new Error('Video generation failed');
                    } else {
                        // Estimate progress
                        setProgress(prev => Math.min(prev + 5, 90));
                    }
                } catch (err) {
                    clearInterval(pollInterval);
                    setError(err instanceof Error ? err.message : 'Unknown error');
                    setIsGenerating(false);
                }
            }, 5000);

            // Timeout after 10 minutes
            setTimeout(() => {
                clearInterval(pollInterval);
                if (isGenerating) {
                    setError('Video generation timeout');
                    setIsGenerating(false);
                }
            }, 600000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate video');
            setIsGenerating(false);
        }
    };

    return (
        <Card className={`p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${className}`}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="p-4 bg-purple-500/10 border border-white/10 rounded-2xl relative">
                                <Video className="w-8 h-8 text-purple-400" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Avatar Forge</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Generative Neural Broadcasts</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end opacity-40">
                        <div className="text-[8px] font-mono text-white/50 uppercase tracking-[0.3em]">HFD: ENABLED</div>
                        <div className="text-[8px] font-mono text-purple-400/50 uppercase tracking-[0.3em]">HeyGen_Core_v2</div>
                    </div>
                </div>

                {/* Script Input */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">Strategic Script</label>
                        <span className="text-[10px] text-zinc-600 font-mono italic">{script.length}/2000 chars</span>
                    </div>
                    <textarea
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        placeholder="INPUT DIRECTIVE FOR NEURAL SYNTHESIS..."
                        className="w-full h-40 px-6 py-4 bg-black/50 border border-white/10 rounded-[1.5rem] text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-all font-medium text-sm leading-relaxed scrollbar-hide resize-none shadow-inner"
                        disabled={isGenerating}
                    />
                </div>

                {/* Selection Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-2">Executive Delegate</label>
                        <select
                            value={avatarId}
                            onChange={(e) => setAvatarId(e.target.value)}
                            className="w-full px-5 py-4 bg-black border border-white/10 rounded-2xl text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-purple-500/50 cursor-pointer hover:bg-zinc-900 transition-all"
                            disabled={isGenerating}
                        >
                            <option value="josh_lite3_20230714">Dr. Alvin West (Executive)</option>
                            <option value="36506d33758b4563a948259b37a4e57d">Keisha Reynolds (Principal)</option>
                            <option value="135ea5597b4f4c8c83e02c637a7b9868">Dr. Isaiah Vance (Policy)</option>
                            <option value="josh_lite3_20230714">Andre Patterson (Behavior)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-2">Vocal Signature</label>
                        <select
                            value={voiceId}
                            onChange={(e) => setVoiceId(e.target.value)}
                            className="w-full px-5 py-4 bg-black border border-white/10 rounded-2xl text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-purple-500/50 cursor-pointer hover:bg-zinc-900 transition-all"
                            disabled={isGenerating}
                        >
                            <option value="21m00Tcm4TlvDq8ikWAM">Professional Female (Rachel)</option>
                            <option value="TxGEqnSArWdgf43uNMcG">Authoritative Male (Josh)</option>
                            <option value="ErXw9S197X3R3mTSST9C">Consultant Male (Antoni)</option>
                            <option value="EXAVITQu4vr4xnSDxMaL">Strategic Female (Bella)</option>
                        </select>
                    </div>
                </div>

                {/* Action Trigger */}
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !script.trim()}
                    className="w-full py-8 bg-white text-black hover:bg-purple-600 hover:text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {isGenerating ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Synthesizing: {progress}%</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Generate Sovereign Video</span>
                        </div>
                    )}
                </Button>

                {/* Progress Bar */}
                <AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                        >
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <p className="text-xs text-white/60 text-center">
                                Creating your avatar video...
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
                                        a.download = 'edintel-avatar-video.mp4';
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
