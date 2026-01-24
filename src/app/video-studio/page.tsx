'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeyGenStreamingAvatar } from '@/components/heygen/StreamingAvatar';
import { HeyGenVideoGenerator } from '@/components/heygen/VideoGenerator';
import { CaptionsEditor } from '@/components/captions/VideoEditor';
import { InVideoCreator } from '@/components/invideo/VideoCreator';
import { motion } from 'framer-motion';
import { Video, Sparkles, Wand2, MessageSquare } from 'lucide-react';

export default function VideoStudioPage() {
    const [activeTab, setActiveTab] = useState('heygen-streaming');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                        EdIntel Video Studio
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Professional AI-powered video creation suite powered by HeyGen, Captions.ai, and InVideo AI
                    </p>
                </motion.div>

                {/* Main Content */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-white/5 p-1">
                            <TabsTrigger
                                value="heygen-streaming"
                                className="data-[state=active]:bg-purple-600"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Live Avatar
                            </TabsTrigger>
                            <TabsTrigger
                                value="heygen-video"
                                className="data-[state=active]:bg-purple-600"
                            >
                                <Video className="w-4 h-4 mr-2" />
                                Avatar Video
                            </TabsTrigger>
                            <TabsTrigger
                                value="captions"
                                className="data-[state=active]:bg-indigo-600"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Video Editor
                            </TabsTrigger>
                            <TabsTrigger
                                value="invideo"
                                className="data-[state=active]:bg-pink-600"
                            >
                                <Wand2 className="w-4 h-4 mr-2" />
                                AI Creator
                            </TabsTrigger>
                        </TabsList>

                        <div className="p-6">
                            <TabsContent value="heygen-streaming" className="mt-0">
                                <div className="space-y-4">
                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            Interactive Streaming Avatar
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Real-time avatar communication with WebRTC streaming. Chat with AI avatars instantly.
                                        </p>
                                    </div>
                                    <HeyGenStreamingAvatar />
                                </div>
                            </TabsContent>

                            <TabsContent value="heygen-video" className="mt-0">
                                <div className="space-y-4">
                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            Avatar Video Generator
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Create professional avatar videos from scripts. Perfect for educational content and presentations.
                                        </p>
                                    </div>
                                    <HeyGenVideoGenerator />
                                </div>
                            </TabsContent>

                            <TabsContent value="captions" className="mt-0">
                                <div className="space-y-4">
                                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            AI Video Editor
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Enhance videos with AI-powered editing, automatic captions, and professional effects.
                                        </p>
                                    </div>
                                    <CaptionsEditor />
                                </div>
                            </TabsContent>

                            <TabsContent value="invideo" className="mt-0">
                                <div className="space-y-4">
                                    <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            AI Video Creator
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Generate complete videos from text prompts. AI handles script, visuals, voiceover, and music.
                                        </p>
                                    </div>
                                    <InVideoCreator />
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </Card>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30">
                        <Video className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">HeyGen Avatars</h3>
                        <p className="text-white/70 text-sm">
                            Realistic AI avatars with natural speech and gestures for engaging educational content.
                        </p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 border-indigo-500/30">
                        <Sparkles className="w-12 h-12 text-indigo-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Captions.ai</h3>
                        <p className="text-white/70 text-sm">
                            Professional video editing with automatic captions, smart trimming, and AI enhancements.
                        </p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-pink-900/50 to-pink-800/30 border-pink-500/30">
                        <Wand2 className="w-12 h-12 text-pink-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">InVideo AI</h3>
                        <p className="text-white/70 text-sm">
                            Complete video creation from text prompts with AI-generated visuals, voiceover, and music.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
