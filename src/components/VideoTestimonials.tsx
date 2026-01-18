'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Play, Pause, Volume2, Mic } from 'lucide-react';

// Waveform Bar Component
function AudioWaveformBar({ index, theme }: { index: number, theme: 'default' | 'sovereign' }) {
    const [heights, setHeights] = useState([5, 15, 5]);

    useEffect(() => {
        setHeights([5, Math.random() * 20 + 10, 5]);
    }, []);

    return (
        <motion.div
            className={`w-1.5 rounded-full ${theme === 'sovereign' ? 'bg-amber-400' : 'bg-indigo-400'}`}
            animate={{ height: heights }}
            transition={{ repeat: Infinity, duration: 0.2, delay: index * 0.05 }}
        />
    );
}

// --- Talking Avatar Component ---
function TalkingAvatarTestimonial({ testimonial, theme = 'sovereign' }: { testimonial: any, theme?: 'default' | 'sovereign' }) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0); // For simulated lip sync

    // Voice Configuration
    const speak = () => {
        if ('speechSynthesis' in window) {
            // Stop any current speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(testimonial.quote);

            // Voice Selection Strategy
            const voices = window.speechSynthesis.getVoices();
            // Try to match gender/tone based on name roughly (heuristic)
            const isFemale = testimonial.name.includes("Sarah") || testimonial.name.includes("Angela");

            const preferredVoice = voices.find(v =>
                v.lang.startsWith('en') &&
                (isFemale ? v.name.includes('Female') || v.name.includes('Samantha') : v.name.includes('Male') || v.name.includes('David'))
            ) || voices[0];

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    // Simulated Lip Sync Animation Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isSpeaking) {
            interval = setInterval(() => {
                // Randomize "mouth" openness/audio level
                setAudioLevel(Math.random() * 100);
            }, 100);
        } else {
            setAudioLevel(0);
        }
        return () => clearInterval(interval);
    }, [isSpeaking]);

    // Theme Colors
    const borderColor = theme === 'sovereign' ? 'border-amber-500/30' : 'border-indigo-500/30';
    const glowColor = theme === 'sovereign' ? 'shadow-amber-500/20' : 'shadow-indigo-500/20';
    const accentColor = theme === 'sovereign' ? 'text-amber-400' : 'text-indigo-400';

    return (
        <motion.div
            className={`relative bg-zinc-900/50 backdrop-blur-sm border ${borderColor} rounded-2xl p-6 hover:${borderColor.replace('/30', '/60')} transition-all flex flex-col h-full group`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Avatar Visualizer */}
            <div className="relative aspect-video mb-6 rounded-xl overflow-hidden bg-black border border-white/5 group-hover:border-white/10 transition-colors">
                {/* Background Image/Avatar */}
                <div className="absolute inset-0">
                    <img
                        src={testimonial.thumbnail}
                        alt={testimonial.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isSpeaking ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Lip Sync / Speaking Visualization Overlay */}
                <AnimatePresence>
                    {isSpeaking && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* Pulsing Rings */}
                            <div className={`absolute w-32 h-32 rounded-full border border-white/20 animate-ping`} />

                            {/* Simulated Waveform at bottom */}
                            <div className="absolute bottom-4 left-0 right-0 h-12 flex items-end justify-center gap-1 px-8">
                                {[...Array(8)].map((_, i) => (
                                    <AudioWaveformBar key={i} index={i} theme={theme} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Play/Stop Controls */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {!isSpeaking ? (
                        <button
                            onClick={speak}
                            className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all shadow-2xl group-hover:border-amber-500/50"
                        >
                            <Play size={24} className="ml-1 fill-white" />
                        </button>
                    ) : (
                        <button
                            onClick={stop}
                            className={`w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center ${accentColor} hover:bg-white/20 hover:scale-110 transition-all shadow-2xl animate-pulse`}
                        >
                            <Pause size={24} className="fill-current" />
                        </button>
                    )}
                </div>

                {/* Status Indicator */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isSpeaking ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-black/40 text-zinc-400 border border-white/10'}`}>
                    {isSpeaking ? (
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Speaking
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <Mic size={10} />
                            Voice Ready
                        </div>
                    )}
                </div>
            </div>

            {/* Quote Content */}
            <div className="flex flex-col flex-grow">
                <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                </div>

                <blockquote className={`text-lg font-medium text-white mb-6 italic leading-relaxed relative`}>
                    <Quote className={`absolute -top-3 -left-2 w-6 h-6 ${theme === 'sovereign' ? 'text-amber-500/20' : 'text-indigo-500/20'} transform -scale-x-100`} />
                    "{testimonial.quote}"
                </blockquote>

                <div className="mt-auto border-t border-white/10 pt-4 flex items-center justify-between">
                    <div>
                        <p className={`font-bold ${theme === 'sovereign' ? 'text-amber-100' : 'text-white'}`}>{testimonial.name}</p>
                        <p className={`text-sm ${accentColor}`}>{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function VideoTestimonials() {
    // Testimonial Data (Updated names/roles)
    const testimonials = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Special Education Director',
            district: 'Mobile County Schools',
            thumbnail: '/images/avatars/iep_architect.png',
            quote: 'EdIntel has transformed how we create IEPs. What used to take hours now takes minutes.',
            rating: 5
        },
        {
            name: 'Marcus Williams',
            role: 'STEM Coordinator',
            district: 'Birmingham City Schools',
            thumbnail: '/images/avatars/data_analyst.png',
            quote: 'The AI delegates understand our students and help us create truly personalized learning experiences.',
            rating: 5
        },
        {
            name: 'Dr. Algernon Davis',
            role: 'Literacy Coach',
            district: 'Montgomery Public Schools',
            thumbnail: '/images/avatars/curriculum_strategist.png',
            quote: 'Finally, an AI tool built by educators who understand the real challenges we face every day.',
            rating: 5
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-br from-zinc-950 to-indigo-950/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/10">
                        <Quote size={14} />
                        <span>Educator Voices</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        Hear From Our{' '}
                        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Sovereign Educators
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Real stories from Alabama educators. Click to listen to their experience.
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TalkingAvatarTestimonial key={index} testimonial={testimonial} theme="sovereign" />
                    ))}
                </div>
            </div>
        </section>
    );
}
