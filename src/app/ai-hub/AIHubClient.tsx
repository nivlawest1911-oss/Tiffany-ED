'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
    Brain, Video, Sparkles, Wand2, MessageSquare,
    Zap, Star, Globe, BookOpen,
    GraduationCap, Users
} from 'lucide-react';

// Import all AI components
import { HeyGenStreamingAvatar } from '@/components/heygen/StreamingAvatar';
import { HeyGenVideoGenerator } from '@/components/heygen/VideoGenerator';
import { CaptionsEditor } from '@/components/captions/VideoEditor';
import { InVideoCreator } from '@/components/invideo/VideoCreator';
import { MetaAIChat } from '@/components/meta-ai/Chat';

export default function AIHubClient() {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats] = useState({
        aiModels: 7,
        videoTools: 3,
        totalFeatures: 50,
        activeUsers: 1247,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [-50, 50, -50],
                        y: [-50, 50, -50],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 py-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        className="inline-block"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-50 animate-pulse" />
                            <h1 className="relative text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                EdIntel AI Hub
                            </h1>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl text-white/80 max-w-3xl mx-auto"
                    >
                        The Ultimate AI-Powered Educational Platform
                    </motion.p>

                    {/* Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8"
                    >
                        {[
                            { icon: Brain, label: 'AI Models', value: stats.aiModels, color: 'purple' },
                            { icon: Video, label: 'Video Tools', value: stats.videoTools, color: 'pink' },
                            { icon: Sparkles, label: 'Features', value: stats.totalFeatures, color: 'blue' },
                            { icon: Users, label: 'Educators', value: stats.activeUsers, color: 'indigo' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                                <Card className="relative bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center hover:bg-white/10 transition-all">
                                    <stat.icon className={`w-8 h-8 mx-auto mb-2 text-${stat.color}-400`} />
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}+</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Main Content */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white/5 p-2 gap-2">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                                <Star className="w-4 h-4 mr-2" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="meta-ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600">
                                <Brain className="w-4 h-4 mr-2" />
                                Meta AI
                            </TabsTrigger>
                            <TabsTrigger value="streaming" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Live Avatar
                            </TabsTrigger>
                            <TabsTrigger value="avatar-video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                                <Video className="w-4 h-4 mr-2" />
                                Avatar Video
                            </TabsTrigger>
                            <TabsTrigger value="video-editor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Video Editor
                            </TabsTrigger>
                            <TabsTrigger value="ai-creator" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600">
                                <Wand2 className="w-4 h-4 mr-2" />
                                AI Creator
                            </TabsTrigger>
                        </TabsList>

                        <div className="p-6">
                            {/* Overview Tab */}
                            <TabsContent value="overview" className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-8"
                                >
                                    {/* Platform Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            {
                                                title: 'Meta AI (Llama)',
                                                icon: Brain,
                                                color: 'blue',
                                                description: 'Chat with Llama 3.3 70B for educational content, quizzes, and analysis',
                                                features: ['Educational Content', 'Quiz Generation', 'Student Analysis', 'Code Generation'],
                                                status: 'Active',
                                            },
                                            {
                                                title: 'HeyGen Avatars',
                                                icon: Video,
                                                color: 'purple',
                                                description: 'Create realistic AI avatar videos with 100+ avatars and 300+ voices',
                                                features: ['Streaming Avatars', 'Video Generation', 'Translation', 'Photo Avatars'],
                                                status: 'Ready',
                                            },
                                            {
                                                title: 'Captions.ai',
                                                icon: Sparkles,
                                                color: 'indigo',
                                                description: 'AI-powered video editing with auto-captions and smart enhancements',
                                                features: ['Auto Captions', 'Smart Trimming', 'AI Editing', 'Effects'],
                                                status: 'Ready',
                                            },
                                            {
                                                title: 'InVideo AI',
                                                icon: Wand2,
                                                color: 'pink',
                                                description: 'Generate complete videos from text prompts with AI',
                                                features: ['Text-to-Video', 'AI Scripts', 'Voiceover', 'Stock Footage'],
                                                status: 'Ready',
                                            },
                                            {
                                                title: 'X.AI (Grok)',
                                                icon: Zap,
                                                color: 'yellow',
                                                description: 'Advanced reasoning and real-time information',
                                                features: ['Real-time Data', 'Advanced Reasoning', 'Code Analysis', 'Research'],
                                                status: 'Active',
                                            },
                                            {
                                                title: 'Google Gemini',
                                                icon: Globe,
                                                color: 'green',
                                                description: 'Multimodal AI for text, images, and code',
                                                features: ['Multimodal', 'Long Context', 'Code Generation', 'Vision'],
                                                status: 'Active',
                                            },
                                        ].map((platform, index) => (
                                            <motion.div
                                                key={platform.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                className="relative group"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br from-${platform.color}-500/20 to-${platform.color}-600/10 rounded-xl blur-xl group-hover:blur-2xl transition-all`} />
                                                <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/10 p-6 h-full hover:bg-white/15 transition-all">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className={`p-3 bg-${platform.color}-500/20 rounded-lg`}>
                                                            <platform.icon className={`w-6 h-6 text-${platform.color}-400`} />
                                                        </div>
                                                        <span className={`px-3 py-1 bg-${platform.color}-500/20 text-${platform.color}-300 text-xs font-semibold rounded-full`}>
                                                            {platform.status}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-white mb-2">{platform.title}</h3>
                                                    <p className="text-sm text-white/70 mb-4">{platform.description}</p>

                                                    <div className="space-y-2">
                                                        {platform.features.map((feature, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                                                                <div className={`w-1.5 h-1.5 rounded-full bg-${platform.color}-400`} />
                                                                {feature}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { icon: BookOpen, title: 'Create Lesson', desc: 'AI-powered lesson planning', action: 'meta-ai' },
                                            { icon: Video, title: 'Generate Video', desc: 'Create avatar videos instantly', action: 'avatar-video' },
                                            { icon: GraduationCap, title: 'Analyze Work', desc: 'AI student work analysis', action: 'meta-ai' },
                                        ].map((action, index) => (
                                            <motion.button
                                                key={action.title}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setActiveTab(action.action)}
                                                className="relative group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                                                <Card className="relative bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border-white/10 p-6 text-left hover:from-purple-600/20 hover:to-pink-600/20 transition-all">
                                                    <action.icon className="w-8 h-8 text-purple-400 mb-3" />
                                                    <h4 className="text-lg font-bold text-white mb-1">{action.title}</h4>
                                                    <p className="text-sm text-white/60">{action.desc}</p>
                                                </Card>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            </TabsContent>

                            {/* Meta AI Tab */}
                            <TabsContent value="meta-ai" className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <Brain className="w-5 h-5 text-blue-400" />
                                            Meta AI (Llama 3.3 70B)
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Chat with Meta's most powerful open-source AI model. Generate educational content, quizzes, analyze student work, and more.
                                        </p>
                                    </div>
                                    <MetaAIChat />
                                </motion.div>
                            </TabsContent>

                            {/* Streaming Avatar Tab */}
                            <TabsContent value="streaming" className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <MessageSquare className="w-5 h-5 text-purple-400" />
                                            Interactive Streaming Avatar
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Real-time avatar communication with WebRTC streaming. Chat with AI avatars instantly.
                                        </p>
                                    </div>
                                    <HeyGenStreamingAvatar />
                                </motion.div>
                            </TabsContent>

                            {/* Avatar Video Tab */}
                            <TabsContent value="avatar-video" className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <Video className="w-5 h-5 text-purple-400" />
                                            Avatar Video Generator
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Create professional avatar videos from scripts. Perfect for educational content and presentations.
                                        </p>
                                    </div>
                                    <HeyGenVideoGenerator />
                                </motion.div>
                            </TabsContent>

                            {/* Video Editor Tab */}
                            <TabsContent value="video-editor" className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-indigo-400" />
                                            AI Video Editor
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Enhance videos with AI-powered editing, automatic captions, and professional effects.
                                        </p>
                                    </div>
                                    <CaptionsEditor />
                                </motion.div>
                            </TabsContent>

                            {/* AI Creator Tab */}
                            <TabsContent value="ai-creator" className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <Wand2 className="w-5 h-5 text-pink-400" />
                                            AI Video Creator
                                        </h3>
                                        <p className="text-white/70 text-sm">
                                            Generate complete videos from text prompts. AI handles script, visuals, voiceover, and music.
                                        </p>
                                    </div>
                                    <InVideoCreator />
                                </motion.div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </Card>

                {/* Footer Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-white/40 text-sm"
                >
                    <p>Powered by 7 AI platforms • 50+ features • Enterprise-grade infrastructure</p>
                </motion.div>
            </div>
        </div>
    );
}
