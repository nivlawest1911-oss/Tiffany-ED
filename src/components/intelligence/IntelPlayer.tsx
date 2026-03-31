'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Clock, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { Episode, Chapter } from '@/lib/briefing-data';

interface IntelPlayerProps {
    episode: Episode;
}

const formats = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
};

export default function IntelPlayer({ episode }: IntelPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activeChapter, setActiveChapter] = useState<Chapter | null>(episode.chapters[0] || null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const updateActiveChapter = useCallback((time: number) => {
        const currentChapter = [...episode.chapters].reverse().find(c => {
            const [min, sec] = c.timestamp.split(':').map(Number);
            return time >= min * 60 + sec;
        });
        if (currentChapter && currentChapter.title !== activeChapter?.title) {
            setActiveChapter(currentChapter);
        }
    }, [episode.chapters, activeChapter]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            updateActiveChapter(audio.currentTime);
        };
        const onLoadedMetadata = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, [updateActiveChapter]);

    const seekTo = (timestamp: string) => {
        const [min, sec] = timestamp.split(':').map(Number);
        const time = min * 60 + sec;
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            if (!isPlaying) togglePlay();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto p-4 lg:p-12">
            <audio ref={audioRef} src={episode.audioUrl} />

            {/* MAIN PLAYER NODE */}
            <div className="lg:w-2/3 h-full flex flex-col liquid-glass border-noble-gold/20 bg-zinc-950/60 p-8 lg:p-12 overflow-hidden relative">
                
                {/* Neural HUD Labels */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em]">Signal Node: Mobile County</span>
                        <h1 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight max-w-lg">
                            {episode.title}
                        </h1>
                    </div>
                </div>

                {/* Progress Visualizer */}
                <div className="relative mt-12 mb-8">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        title="Playback Position"
                        aria-label="Seek Briefing"
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-noble-gold relative z-10"
                    />
                    {/* Chapter Tick Marks */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {episode.chapters.map((chapter, idx) => {
                            const [m, s] = chapter.timestamp.split(':').map(Number);
                            const left = ((m * 60 + s) / duration) * 100;
                            return (
                                <div key={idx} className="absolute top-[-4px] w-0.5 h-3 bg-noble-gold/40" style={{ left: `${left}%` }} />
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center mt-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        <span>{formats(currentTime)}</span>
                        <span>{formats(duration)}</span>
                    </div>
                </div>

                {/* Transport Controls */}
                <div className="flex items-center justify-center gap-8 mt-4">
                    <button className="text-white/40 hover:text-white transition-colors" title="Rewind 15s">
                        <SkipBack size={24} onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 15; }} />
                    </button>
                    
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </motion.button>
                    
                    <button className="text-white/40 hover:text-white transition-colors" title="Fast Forward 15s">
                        <SkipForward size={24} onClick={() => { if (audioRef.current) audioRef.current.currentTime += 15; }} />
                    </button>
                </div>

                {/* Chapters List */}
                <div className="mt-16 space-y-4">
                    <h5 className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-4">Intelligence Milestones</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {episode.chapters.map((chapter, i) => (
                            <button
                                key={i}
                                onClick={() => seekTo(chapter.timestamp)}
                                className={`flex items-center gap-4 p-4 text-left transition-all rounded-xl border ${
                                    activeChapter?.title === chapter.title 
                                    ? 'bg-noble-gold/10 border-noble-gold/30 ring-1 ring-noble-gold/20' 
                                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                                }`}
                            >
                                <span className={`text-[10px] font-mono font-black ${activeChapter?.title === chapter.title ? 'text-noble-gold' : 'text-white/40'}`}>
                                    {chapter.timestamp}
                                </span>
                                <span className={`text-xs font-black uppercase tracking-widest leading-none ${activeChapter?.title === chapter.title ? 'text-white' : 'text-white/60'}`}>
                                    {chapter.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* SIDE Context Window */}
            <div className="lg:w-1/3 flex flex-col gap-6">
                <AnimatePresence mode="wait">
                    {activeChapter && (
                        <motion.div
                            key={activeChapter.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="liquid-glass border-white/10 bg-zinc-900/60 p-8 flex flex-col h-full"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Clock size={12} className="text-noble-gold" />
                                <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.3em]">Currently Syncing</span>
                            </div>

                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                                {activeChapter.title}
                            </h3>
                            
                            <p className="text-sm text-white/60 leading-relaxed font-mono">
                                <span className="text-noble-gold mr-2">{">>>"}</span>
                                {activeChapter.context}
                            </p>

                            {activeChapter.links && (
                                <div className="mt-8 space-y-3">
                                    <h6 className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Tactical Links</h6>
                                    {activeChapter.links.map((link, j) => (
                                        <motion.a
                                            key={j}
                                            href={link.url}
                                            whileHover={{ x: 5 }}
                                            className="flex items-center justify-between p-4 bg-noble-gold/5 border border-noble-gold/20 rounded-xl group transition-all"
                                        >
                                            <span className="text-[10px] font-black text-noble-gold uppercase tracking-widest">{link.label}</span>
                                            <ExternalLink size={12} className="text-noble-gold group-hover:scale-125 transition-transform" />
                                        </motion.a>
                                    ))}
                                </div>
                            )}

                            {/* Data Snapshot Placeholder */}
                            <div className="mt-auto pt-12">
                                <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin size={12} className="text-emerald-500" />
                                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Regional Intel: Verified</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="h-12 w-full flex items-end gap-1 px-2">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="flex-1 bg-noble-gold/20 rounded-t-sm" style={{ height: `${Math.random() * 100}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dr. West Bio Shortcut */}
                <div className="liquid-glass border-white/10 bg-zinc-950 p-8 flex flex-col items-center text-center">
                    <img src="/images/avatars/dr_alvin_west_official.png" className="w-16 h-16 rounded-full border border-noble-gold/30 mb-4 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Dr. Alvin West" />
                    <h4 className="text-white font-black uppercase text-xs tracking-widest">Dr. Alvin West</h4>
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-[0.2em]">Lead Intelligence Architect</p>
                    <button className="mt-6 w-full py-3 liquid-glass border-white/10 text-[9px] font-black uppercase text-white/60 hover:text-white transition-all flex items-center justify-center gap-2">
                        Profile Briefing <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
}
