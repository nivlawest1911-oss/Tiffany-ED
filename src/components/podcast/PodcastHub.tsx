'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Headphones, Sparkles, Cpu, RotateCcw } from 'lucide-react';
import PodcastPlayer from './PodcastPlayer';
import InteractivePodcastPlayer from './InteractivePodcastPlayer';
import PodcastList from './PodcastList';
import { mockPodcasts as initialPodcasts, PodcastEpisode } from '@/lib/data/podcasts';
import { MediaSynthesisEngine } from '@/lib/MediaSynthesisEngine';
import { toast } from 'sonner';

import MediaAnalytics from './MediaAnalytics';
import { GlassPanel, HolographicText, NeonBadge, AuroraBackground, ParticleField, LaserLine, NeonButton } from '@/components/ui/HolographicUI';

export default function PodcastHub() {
    const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(initialPodcasts);
    const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(initialPodcasts[0]);
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);


    const handleSynthesizeSpecial = async () => {
        setIsSynthesizing(true);
        toast.info("Initializing Neural Synthesis Protocol...");

        try {
            const engine = MediaSynthesisEngine.getInstance();
            const synthesis = await engine.synthesizePodcast({
                id: `synth-${Date.now()}`,
                title: 'Pedagogical Swarm Intelligence',
                description: 'Autonomous coordination of AI agents for classroom support.',
                rigor: 8,
                scaffolding: ['Multi-Agent Systems', 'Collaborative Learning', 'Real-time Intervention'],
                objectives: ['Master swarm orchestration protocols'],
                standards: ['ALSDE Technology Course of Study']
            });

            const newEpisode: PodcastEpisode = {
                id: synthesis.id,
                title: synthesis.title,
                description: synthesis.script.substring(0, 150) + '...',
                host: "Verse (Sovereign Synthesizer)",
                duration: `${Math.floor(synthesis.durationEstimate / 60)}:00`,
                publishDate: new Date().toISOString().split('T')[0],
                category: 'Technology',
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                imageUrl: "/images/podcasts/synth.jpg",
                isInteractive: false
            };

            setPodcasts(prev => [newEpisode, ...prev]);
            setCurrentEpisode(newEpisode);
            toast.success("Media Synthesis Complete: Strategic Insight generated.");
        } catch (error) {
            console.error("Synthesis failed:", error);
            toast.error("Synthesis failed: Intelligence layer timeout.");
        } finally {
            setIsSynthesizing(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#050505] text-white relative overflow-hidden pb-24">

            {/* Cinematic Background Elements */}
            <AuroraBackground variant="mixed" intensity="low" />
            <ParticleField count={20} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 lg:pt-20">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div>
                        <div className="mb-6">
                            <NeonBadge variant="gold" pulse>
                                <Radio size={14} aria-hidden="true" />
                                EdIntel Sovereign Broadcast
                            </NeonBadge>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                            <HolographicText variant="gradient" as="span">Strategic Insights</HolographicText>
                        </h1>

                        <p className="text-zinc-300 text-sm md:text-base max-w-2xl uppercase tracking-widest font-medium flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#FFB300]" aria-hidden="true" />
                            Curated audio intelligence for elite educators and administrators.
                        </p>
                    </div>

                    <NeonButton
                        onClick={handleSynthesizeSpecial}
                        disabled={isSynthesizing}
                        variant="gold"
                        size="lg"
                        aria-label={isSynthesizing ? "Synthesizing new insight" : "Synthesize new strategic insight"}
                        className={isSynthesizing ? 'animate-pulse' : ''}
                    >
                        <div className="flex items-center gap-3">
                            {isSynthesizing ? <RotateCcw className="w-5 h-5 animate-spin" aria-hidden="true" /> : <Cpu className="w-5 h-5" aria-hidden="true" />}
                            <div className="text-left">
                                <div className="text-[10px] font-black uppercase tracking-widest mb-0.5">Neural Mode</div>
                                <div className="text-xs font-bold uppercase tracking-tight">{isSynthesizing ? 'Processing' : 'Synthesize'}</div>
                            </div>
                        </div>
                    </NeonButton>
                </motion.div>

                <LaserLine color="#FFB300" className="mb-12 opacity-30" />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column: Player & Featured Content */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Player Container */}
                        <motion.div
                            key={currentEpisode.id} // Re-animate on change
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <GlassPanel variant="gold" glow hover={false} className="p-2">
                                {currentEpisode.isInteractive ? (
                                    <InteractivePodcastPlayer episode={currentEpisode} />
                                ) : (
                                    <PodcastPlayer episode={currentEpisode} />
                                )}
                            </GlassPanel>
                        </motion.div>

                        {/* Additional Info / Transcript Placeholder */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlassPanel variant="default" className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Headphones className="text-[#FFB300]" size={20} aria-hidden="true" />
                                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Episode Directive</h3>
                                </div>
                                <p className="text-zinc-300 text-sm leading-relaxed font-serif italic mb-6">
                                    &ldquo;{currentEpisode.description}&rdquo;
                                </p>
                                <div className="flex gap-4 border-t border-white/5 pt-6">
                                    <NeonButton variant="ghost" size="sm" aria-label="View show notes for this episode">
                                        Show Notes
                                    </NeonButton>
                                    <NeonButton variant="ghost" size="sm" aria-label="View transcript for this episode">
                                        Transcript
                                    </NeonButton>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    </div>

                    {/* Right Column: Episode List */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">Available Episodes</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowAnalytics(!showAnalytics)}
                                        aria-label={showAnalytics ? "Hide telemetry dashboard" : "Show telemetry dashboard"}
                                        className={`text-[10px] font-black uppercase tracking-widest transition-colors ${showAnalytics ? 'text-[#FFB300]' : 'text-zinc-300 hover:text-white'}`}
                                    >
                                        {showAnalytics ? 'Hide Telemetry' : 'Show Telemetry'}
                                    </button>
                                    <span className="text-[10px] font-mono text-[#00E5FF] uppercase">{podcasts.length} Briefings</span>
                                </div>
                            </div>

                            <GlassPanel variant="default" className="p-4" hover={false}>
                                <PodcastList
                                    episodes={podcasts}
                                    onSelectEpisode={setCurrentEpisode}
                                    currentEpisodeId={currentEpisode.id}
                                />
                            </GlassPanel>
                        </div>

                        {showAnalytics && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <GlassPanel variant="cyan" glow className="p-6">
                                    <MediaAnalytics />
                                </GlassPanel>
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
