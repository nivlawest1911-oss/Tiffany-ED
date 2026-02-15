'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Brain,
    Sun,
    Send,
    Bot,
    ChevronRight,
    Shield
} from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

interface Exercise {
    title: string;
    duration: string;
    description: string;
    content: string;
}

const GYM_EXERCISES: Exercise[] = [
    {
        title: 'Coherence Breathing',
        duration: '5 min',
        description: 'Optimize HRV and restore cognitive baseline.',
        content: 'Breathe in for 5 seconds, hold for 5 seconds, breathe out for 5 seconds.'
    },
    {
        title: 'Stress Inoculation',
        duration: '3 min',
        description: 'Mental rehearsal for high-pressure scenarios.',
        content: 'Visualize the stressor. Observe your reaction. Detach and reframe.'
    },
    {
        title: 'Gratitude Protocol',
        duration: '2 min',
        description: 'Shift neurochemistry towards dopamine/serotonin.',
        content: 'Identify three small victories from the last 24 hours.'
    },
    {
        title: 'Vision Casting',
        duration: '5 min',
        description: 'Align subconscious with long-term sovereign goals.',
        content: 'See yourself 5 years from now. What are you building?'
    }
];

interface MoodEntry {
    mood: 'great' | 'good' | 'neutral' | 'low' | 'bad';
    note: string;
    timestamp: Date;
}

export default function WellnessClient() {
    const [activeTab, setActiveTab] = useState<'check-in' | 'gym' | 'chat'>('check-in');
    const [mood, setMood] = useState<MoodEntry['mood'] | null>(null);
    const [wellnessScore] = useState(85); // Mock score
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

    // Mock AI Agent interactions
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Greetings, Sovereign. I am your specialized Wellness Agent. How is your resilience today?" }
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', content: input };
        setMessages([...messages, newMsg]);
        setInput('');

        // Mock response for now
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I acknowledge your input. Based on your recent biometrics and sentiment, I recommend a 5-minute coherence breathing session to optimize your HRV."
            }]);
        }, 1000);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="p-6 flex items-center justify-between border-purple-500/20 bg-purple-950/10">
                    <div>
                        <p className="text-purple-300/60 text-xs font-bold uppercase tracking-widest mb-1">Resilience Score</p>
                        <div className="text-4xl font-black text-white">{wellnessScore}</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Shield className="text-purple-400 w-6 h-6" />
                    </div>
                </GlassCard>

                <GlassCard className="p-6 flex items-center justify-between border-emerald-500/20 bg-emerald-950/10">
                    <div>
                        <p className="text-emerald-300/60 text-xs font-bold uppercase tracking-widest mb-1">Cognitive Load</p>
                        <div className="text-4xl font-black text-white">42%</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Brain className="text-emerald-400 w-6 h-6" />
                    </div>
                </GlassCard>

                <GlassCard className="p-6 flex items-center justify-between border-amber-500/20 bg-amber-950/10">
                    <div>
                        <p className="text-amber-300/60 text-xs font-bold uppercase tracking-widest mb-1">Vitality</p>
                        <div className="text-4xl font-black text-white">Optimal</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Activity className="text-amber-400 w-6 h-6" />
                    </div>
                </GlassCard>
            </div>

            {/* Main Interactive Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Panel: Navigation & Actions */}
                <div className="lg:col-span-1 space-y-4">
                    <button
                        onClick={() => setActiveTab('check-in')}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${activeTab === 'check-in'
                            ? 'bg-purple-600/20 border-purple-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${activeTab === 'check-in' ? 'bg-purple-500' : 'bg-zinc-800'}`}>
                            <Sun size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-sm">Daily Align</h3>
                            <p className="text-xs opacity-60">Log mood & set intention</p>
                        </div>
                        <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeTab === 'check-in' ? 'rotate-90' : ''}`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('gym')}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${activeTab === 'gym'
                            ? 'bg-emerald-600/20 border-emerald-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${activeTab === 'gym' ? 'bg-emerald-500' : 'bg-zinc-800'}`}>
                            <Brain size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-sm">Resilience Gym</h3>
                            <p className="text-xs opacity-60">Mental conditioning exercises</p>
                        </div>
                        <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeTab === 'gym' ? 'rotate-90' : ''}`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${activeTab === 'chat'
                            ? 'bg-amber-600/20 border-amber-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${activeTab === 'chat' ? 'bg-amber-500' : 'bg-zinc-800'}`}>
                            <Bot size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-sm">Wellness Agent</h3>
                            <p className="text-xs opacity-60">Personalized AI support</p>
                        </div>
                        <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeTab === 'chat' ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                {/* Right Panel: Dynamic Content */}
                <div className="lg:col-span-2 relative">
                    <GlassCard className="h-full min-h-[500px] p-6 border-white/10 bg-black/40 backdrop-blur-xl">
                        <AnimatePresence mode="wait">

                            {activeTab === 'check-in' && (
                                <motion.div
                                    key="check-in"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-8"
                                >
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                                            How is your spirit today?
                                        </h2>
                                        <p className="text-zinc-400 text-sm">Track your emotional baseline to optimize performance.</p>
                                    </div>

                                    <div className="flex gap-4">
                                        {['bad', 'low', 'neutral', 'good', 'great'].map((m) => (
                                            <button
                                                key={m}
                                                onClick={() => setMood(m as any)}
                                                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 hover:scale-110 ${mood === m
                                                    ? 'bg-purple-600 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                {m === 'great' && '🤩'}
                                                {m === 'good' && '🙂'}
                                                {m === 'neutral' && '😐'}
                                                {m === 'low' && '😕'}
                                                {m === 'bad' && '😫'}
                                            </button>
                                        ))}
                                    </div>

                                    {mood && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full max-w-md space-y-4"
                                        >
                                            <textarea
                                                placeholder="Any thoughts or context for today? (Optional)"
                                                className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none"
                                            />
                                            <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-purple-50 transition-colors">
                                                Log Reflection
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'gym' && (
                                <motion.div
                                    key="gym"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Brain className="text-emerald-400" /> Resilience Gym
                                    </h2>

                                    {!activeExercise ? (
                                        <div className="grid gap-4">
                                            {GYM_EXERCISES.map((workout) => (
                                                <button
                                                    key={workout.title}
                                                    onClick={() => setActiveExercise(workout)}
                                                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-emerald-900/10 hover:border-emerald-500/30 text-left transition-all group"
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-bold text-emerald-200">{workout.title}</span>
                                                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">{workout.duration}</span>
                                                    </div>
                                                    <p className="text-xs text-zinc-500 group-hover:text-emerald-200/50 transition-colors">
                                                        {workout.description}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                                                <Activity className="w-10 h-10 text-emerald-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{activeExercise.title}</h3>
                                                <p className="text-emerald-300/60 text-sm mt-2">{activeExercise.content}</p>
                                            </div>
                                            <div className="text-4xl font-black text-white font-mono">
                                                04:59
                                            </div>
                                            <button
                                                onClick={() => setActiveExercise(null)}
                                                className="px-6 py-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 text-sm font-bold transition-all"
                                            >
                                                End Session
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'chat' && (
                                <motion.div
                                    key="chat"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col"
                                >
                                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                    ? 'bg-amber-600/20 border border-amber-500/30 text-amber-50 rounded-br-none'
                                                    : 'bg-white/5 border border-white/10 text-zinc-200 rounded-bl-none'
                                                    }`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Consult the Wellness Agent..."
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                        />
                                        <button
                                            title="Send Message"
                                            onClick={handleSendMessage}
                                            className="absolute right-2 top-2 p-1.5 bg-amber-500/20 rounded-lg text-amber-400 hover:bg-amber-500 hover:text-white transition-all"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
