'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Send,
    Copy,
    Download,
    Loader2,
    User,
    Bot,
    Clock,
    ArrowLeft,
    Save,
    Share2,
    AlertCircle
} from 'lucide-react';

export default function RealAIGenerator() {
    const [gradeLevel, setGradeLevel] = useState('5th');
    const [subject, setSubject] = useState('math');
    const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);
    const [provider, setProvider] = useState('google');

    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/iep-stream',
        body: {
            gradeLevel,
            subject,
            specialNeeds,
            provider,
        },
    });

    const quickPrompts = [
        'Generate annual IEP goals for reading comprehension',
        'Create transition plan for post-secondary education',
        'Draft accommodations for test-taking',
        'Write present levels of performance',
        'Develop behavior intervention plan',
    ];

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
    };

    const handleQuickPrompt = (prompt: string) => {
        const syntheticEvent = {
            preventDefault: () => { },
        } as React.FormEvent<HTMLFormElement>;

        handleInputChange({
            target: { value: prompt },
        } as React.ChangeEvent<HTMLTextAreaElement>);

        setTimeout(() => handleSubmit(syntheticEvent), 100);
    };

    const toggleSpecialNeed = (need: string) => {
        setSpecialNeeds(prev =>
            prev.includes(need)
                ? prev.filter(n => n !== need)
                : [...prev, need]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            <div className="flex h-screen">
                {/* Left Sidebar - 30% */}
                <div className="w-full lg:w-[30%] border-r border-purple-500/20 bg-black/20 backdrop-blur-xl p-6 overflow-y-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <button className="flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-4">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Dashboard</span>
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">IEP Architect Pro</h1>
                                <p className="text-purple-300 text-sm">Real AI-Powered Generation</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Prompts */}
                    <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            Quick Start
                        </h3>
                        <div className="space-y-2">
                            {quickPrompts.map((prompt, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleQuickPrompt(prompt)}
                                    disabled={isLoading}
                                    className="w-full text-left p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-200 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {prompt}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Input Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-purple-300 text-sm mb-2 block">AI Model</label>
                            <select
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none"
                            >
                                <option value="google">Google Gemini 1.5 Pro</option>
                                <option value="openai">OpenAI GPT-4o</option>
                                <option value="anthropic">Anthropic Claude 3.5 Sonnet</option>
                                <option value="xai">xAI Grok-2</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-purple-300 text-sm mb-2 block">Grade Level</label>
                            <select
                                value={gradeLevel}
                                onChange={(e) => setGradeLevel(e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none"
                            >
                                <option value="K">Kindergarten</option>
                                <option value="1st">1st Grade</option>
                                <option value="2nd">2nd Grade</option>
                                <option value="3rd">3rd Grade</option>
                                <option value="4th">4th Grade</option>
                                <option value="5th">5th Grade</option>
                                <option value="6th">6th Grade</option>
                                <option value="7th">7th Grade</option>
                                <option value="8th">8th Grade</option>
                                <option value="9th">9th Grade</option>
                                <option value="10th">10th Grade</option>
                                <option value="11th">11th Grade</option>
                                <option value="12th">12th Grade</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-purple-300 text-sm mb-2 block">Subject Area</label>
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none"
                            >
                                <option value="math">Mathematics</option>
                                <option value="reading">Reading/ELA</option>
                                <option value="writing">Writing</option>
                                <option value="science">Science</option>
                                <option value="social-studies">Social Studies</option>
                                <option value="behavior">Behavior/Social Skills</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-purple-300 text-sm mb-2 block">Special Needs</label>
                            <div className="space-y-2">
                                {['ADHD', 'Dyslexia', 'Autism', 'Speech/Language'].map((need) => (
                                    <label key={need} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={specialNeeds.includes(need)}
                                            onChange={() => toggleSpecialNeed(need)}
                                            className="w-4 h-4 rounded border-purple-500/20 bg-black/40 text-purple-500 focus:ring-purple-500/40"
                                        />
                                        <span className="text-purple-200 text-sm">{need}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - 70% */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-purple-500/20 bg-black/20 backdrop-blur-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-green-300 text-sm font-medium capitalize">
                                    {provider === 'xai' ? 'xAI Grok' : provider} Ready
                                </span>
                            </div>
                            <div className="text-purple-300 text-sm">
                                {messages.length} messages
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors"
                            >
                                <Save className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center max-w-md">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Create Magic</h3>
                                    <p className="text-purple-300 mb-6">
                                        Choose a quick start prompt or describe what you need below
                                    </p>
                                    <div className="flex items-center gap-2 text-purple-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>All IEPs are IDEA-compliant and FERPA-secure</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                    <div className={`max-w-[70%] ${message.role === 'user' ? 'order-1' : ''}`}>
                                        <div className={`p-4 rounded-2xl ${message.role === 'user'
                                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                                            : 'bg-black/40 backdrop-blur-xl border border-purple-500/20 text-purple-100'
                                            }`}>
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 px-2">
                                            <span className="text-purple-400 text-xs flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
                                            </span>
                                            {message.role === 'assistant' && (
                                                <>
                                                    <button
                                                        onClick={() => handleCopy(message.content)}
                                                        className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                        Copy
                                                    </button>
                                                    <button className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1">
                                                        <Download className="w-3 h-3" />
                                                        Download
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-purple-300" />
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20">
                                    <div className="flex items-center gap-2 text-purple-300">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Generating your IEP...</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
                                <p className="font-semibold mb-1">Error generating IEP</p>
                                <p className="text-sm">{error.message}</p>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-6 border-t border-purple-500/20 bg-black/20 backdrop-blur-xl">
                        <div className="flex gap-3">
                            <textarea
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Describe what you need from IEP Architect..."
                                className="flex-1 p-4 rounded-xl bg-black/40 border border-purple-500/20 text-white placeholder-purple-400/50 focus:border-purple-500/40 outline-none resize-none"
                                rows={3}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-500/50"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                                Generate
                            </motion.button>
                        </div>
                        <div className="mt-2 text-purple-400 text-xs text-center">
                            Press Enter to send • Shift + Enter for new line
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
