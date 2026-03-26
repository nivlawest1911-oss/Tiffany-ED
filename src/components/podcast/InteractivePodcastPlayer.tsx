'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Loader2, Send, Bot, User, BookOpen } from 'lucide-react';
import { PodcastEpisode } from '@/lib/data/podcasts';
import Image from 'next/image';

interface InteractivePodcastPlayerProps {
    episode: PodcastEpisode;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default function InteractivePodcastPlayer({ episode }: InteractivePodcastPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Media State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Chat State
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'sys-1',
            role: 'system',
            content: 'Live session connected. Analyzing Federal ESSA Guidelines, Alabama State Teaching Standards, Mobile County Policy, and "Mastering the Maze".'
        },
        {
            id: 'ass-1',
            role: 'assistant',
            content: "Welcome to the Sovereign Broadcast. I'm Verse. We're live and ready to take your questions regarding instruction, compliance, and pedagogical strategy. What's on your mind today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Synchronize play state
    useEffect(() => {
        setIsPlaying(true); // Auto-start the ambient live loop feeling
        setCurrentTime(0);
        setIsLoaded(false);
        if (audioRef.current) {
            audioRef.current.src = episode.audioUrl;
            audioRef.current.loop = true; // Loop the atmospheric bed track
            audioRef.current.load();
            audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
        }
    }, [episode]);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setIsLoaded(true);
        }
    };

    const togglePlayPause = () => {
        if (!audioRef.current || !isLoaded) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Chat Submission Handler
    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isGenerating) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsGenerating(true);

        try {
            const res = await fetch('/api/podcast/interact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    history: messages.filter(m => m.role !== 'system'),
                    episodeId: episode.id
                })
            });

            if (!res.ok) throw new Error('Failed to generate response');

            const data = await res.json();

            // Simulate typing/streaming for a "live broadcast" feel
            const fullResponse = data.response;
            setIsGenerating(false);
            setIsTyping(true);

            let currentText = "";
            const assistantId = (Date.now() + 1).toString();

            // Initial empty assistant message
            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: "" }]);

            const words = fullResponse.split(' ');
            for (let i = 0; i < words.length; i++) {
                currentText += words[i] + " ";
                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: currentText } : m));
                // Variable delay for human-like typing
                await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40));
            }
            setIsTyping(false);

        } catch (error) {
            console.error("Chat Error:", error);
            setIsGenerating(false);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'system',
                content: 'Connection instability detected. We are currently utilizing fallback heuristic protocols.'
            }]);
        }
    };

    return (
        <div 
            className="relative bg-black/80 backdrop-blur-3xl border border-noble-gold/20 rounded-[2rem] p-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row gap-6 h-[600px] overflow-hidden"
            aria-label="Interactive Podcast Player and AI Chat"
        >

            {/* Visualizer Background Matrix */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                preload="metadata"
            />

            {/* Left Panel: Media & Status */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 border-r border-white/5 relative z-10 shrink-0">
                {/* Live Indicator */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-red-500 font-black text-[10px] uppercase tracking-widest">Live</span>
                    </div>
                    {(isGenerating || isTyping) && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)] overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full animate-shimmer" />
                            <div className="w-2 h-2 rounded-full bg-cyan-400 relative">
                                <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-40" />
                            </div>
                            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-widest">Neural Link</span>
                        </motion.div>
                    )}
                </div>

                {/* Avatar Graphic */}
                <div className="relative w-40 h-40 mt-6 mb-8 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-noble-gold/20 blur-2xl rounded-full"
                        animate={{
                            scale: (isPlaying || isTyping) ? [1, 1.4, 1.2, 1.5, 1] : 1,
                            opacity: (isPlaying || isTyping) ? [0.3, 0.7, 0.5, 0.8, 0.3] : 0.2
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"
                        animate={{
                            scale: isTyping ? [1, 2.2, 1.8, 2.5, 1] : 1,
                            opacity: isTyping ? [0.2, 0.6, 0.4, 0.8, 0.2] : 0,
                            rotate: isTyping ? [0, 90, 180, 270, 360] : 0
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="absolute inset-0 rounded-[2.5rem] bg-black/60 border border-noble-gold/30 overflow-hidden flex items-center justify-center p-4 backdrop-blur-md">
                        <Image
                            src={episode.imageUrl}
                            alt={episode.host}
                            width={120}
                            height={120}
                            className="object-contain filter contrast-125 saturate-150 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                        />
                    </div>
                </div>

                <div className="text-center space-y-1 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white">
                        {episode.host}
                    </h2>
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] flex items-center justify-center gap-1">
                        <BookOpen size={10} /> Policy Knowledgebase Active
                    </p>
                </div>

                {/* Minimal Media Controls */}
                <div className="w-full max-w-[200px] flex items-center justify-between mt-auto">
                    <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} title={isMuted ? "Unmute" : "Mute"} className="text-white/40 hover:text-white transition-colors">
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <div className="text-xs font-mono text-zinc-400">{formatTime(currentTime)}</div>
                    <button
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        title={isPlaying ? "Pause" : "Play"}
                        className="w-12 h-12 rounded-full bg-noble-gold/20 flex items-center justify-center text-noble-gold border border-noble-gold/40 hover:bg-noble-gold hover:text-black transition-all"
                    >
                        {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
                    </button>
                </div>
            </div>

            {/* Right Panel: Interactive Transcript / Chat */}
            <div className="w-full flex-1 flex flex-col relative z-10 bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <h3 className="text-xs font-black text-white/60 uppercase tracking-widest">Live Transcript & Q&A</h3>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-1">
                        <Bot size={12} /> {messages.length - 1} Exchanges
                    </span>
                </div>

                {/* Transcript Deep Dive (Conditional) */}
                {episode.transcript && (
                    <div className="bg-noble-gold/5 border-b border-noble-gold/10 p-3 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-3">
                        {episode.transcript.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(prev => prev ? `${prev} Tell me more about: ${item.text}` : `What does "${item.text}" mean in this context?`)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 hover:text-noble-gold hover:border-noble-gold/30 hover:bg-noble-gold/10 transition-all shrink-0 uppercase tracking-widest"
                            >
                                <span className="text-noble-gold/60 font-mono">{item.time}</span>
                                {item.text.length > 25 ? item.text.substring(0, 25) + "..." : item.text}
                            </button>
                        ))}
                    </div>
                )}

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                            >
                                {msg.role !== 'system' && (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'assistant'
                                        ? 'bg-noble-gold/20 border-noble-gold/40 text-noble-gold'
                                        : 'bg-white/10 border-white/20 text-white/50'
                                        }`}>
                                        {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                                    </div>
                                )}

                                <div className={`p-4 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-white/10 text-white rounded-tr-sm border border-white/10'
                                    : msg.role === 'assistant'
                                        ? 'bg-white/[0.03] text-zinc-300 rounded-tl-sm border border-noble-gold/20 font-serif leading-relaxed'
                                        : 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 text-[10px] w-full text-center uppercase tracking-widest mx-auto'
                                    }`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {isGenerating && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full bg-noble-gold/20 border-noble-gold/40 text-noble-gold flex items-center justify-center shrink-0">
                                    <Bot size={16} />
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-noble-gold/20 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 text-noble-gold animate-spin" />
                                    <span className="text-xs text-noble-gold animate-pulse tracking-widest uppercase">Formulating Protocol...</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black/40 border-t border-white/5">
                    <form onSubmit={handleChatSubmit} className="relative">
                        <input
                            type="text"
                            id="podcast-chat-input"
                            aria-label="Ask a question about this podcast"
                            placeholder="Call in: Ask a question about policy, IEPs, or instruction..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isGenerating}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-noble-gold focus:bg-white/10 transition-all font-mono disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            aria-label="Send message"
                            title="Send message"
                            disabled={!input.trim() || isGenerating}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-noble-gold/20 text-noble-gold flex items-center justify-center hover:bg-noble-gold hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-noble-gold/20 disabled:hover:text-noble-gold"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
