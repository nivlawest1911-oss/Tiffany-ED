'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserSession } from '@/hooks/useUserSession';
import { StudioVideoSection } from '@/components/StudioVideoSection';
import { Play, Info, ChevronRight, Film, Library, Command } from 'lucide-react';
import { MediaSynthesisStudio } from '@/components/media-synthesis-studio';

const CATEGORIES = [
    {
        name: 'Featured Protocols', items: [
            { id: '1', title: 'The Sovereign Delegate', thumbnail: '/images/gallery/delegate.jpg', type: 'Strategy' },
            { id: '2', title: 'Neural Link Onboarding', thumbnail: '/images/gallery/onboarding.jpg', type: 'Instructional' },
            { id: '3', title: 'Fragility Analysis', thumbnail: '/images/gallery/fragility.jpg', type: 'Admin' }
        ]
    },
    {
        name: 'Instructional Series', items: [
            { id: '4', title: 'IEP Mastery', thumbnail: '/images/gallery/iep.jpg', type: 'Course' },
            { id: '5', title: 'Medicaid Logic', thumbnail: '/images/gallery/medicaid.jpg', type: 'Course' },
            { id: '6', title: 'Data Sovereignty', thumbnail: '/images/gallery/data.jpg', type: 'Course' }
        ]
    },
    {
        name: 'Cultural Archives', items: [
            { id: '7', title: 'The Griot Legacy', thumbnail: '/images/gallery/griot.jpg', type: 'Archive' },
            { id: '8', title: 'Community Pillars', thumbnail: '/images/gallery/community.jpg', type: 'Archive' },
            { id: '9', title: 'Future Horizons', thumbnail: '/images/gallery/future.jpg', type: 'Archive' }
        ]
    }
];

export default function StudioClient() {
    const { session } = useUserSession();
    const [activeHero, setActiveHero] = useState(CATEGORIES[0].items[0]);

    const isCommandLevel = session?.tier === 'unlimited' || session?.tier === 'standard' || session?.tier === 'practitioner';

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Hero Section */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />

                {/* Simulated Backdrop */}
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <Film className="w-20 h-20 text-slate-800 animate-pulse" />
                </div>

                <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <Library className="text-electric-cyan w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-electric-cyan">Studio Griot Preferred</span>
                        </div>
                        <h1 className="text-7xl font-black uppercase tracking-tighter leading-none italic">
                            {activeHero.title}
                        </h1>
                        <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                            A deep dive into the instructional architecture of institutional legacy. Experience the protocols that define the future of EdIntel.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all">
                                <Play size={18} fill="currentColor" />
                                <span>Play Now</span>
                            </button>
                            <button className="flex items-center gap-2 px-8 py-3 bg-zinc-800/80 text-white rounded-lg font-black uppercase text-xs tracking-widest hover:bg-zinc-700 transition-all backdrop-blur-md border border-white/10">
                                <Info size={18} />
                                <span>More Info</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categorized Rows */}
            <div className="px-12 -mt-20 relative z-30 space-y-16">
                {CATEGORIES.map((cat, idx) => (
                    <section key={idx} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">
                                {cat.name}
                            </h2>
                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
                                View All <ChevronRight size={14} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[160px]">
                            {cat.items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.05, zIndex: 50 }}
                                    className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/5 cursor-pointer group"
                                    onClick={() => setActiveHero(item)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                        <div className="p-3 rounded-full bg-white/10 border border-white/20">
                                            <Play size={20} fill="white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <div className="text-[8px] font-black text-electric-cyan uppercase tracking-widest mb-1">{item.type}</div>
                                        <div className="text-xs font-bold text-white uppercase">{item.title}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}
                {/* Creative Command Section */}
                <section className="space-y-6 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Command className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Creative Command Tools</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-12">
                        <MediaSynthesisStudio />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StudioVideoSection
                                userTier={session?.tier || 'free'}
                                isCommandLevel={isCommandLevel}
                            />
                            {/* Placeholder for future tools */}
                            <div className="p-6 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center opacity-40">
                                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Protocol Expansion Pending</p>
                            </div>
                            <div className="p-6 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center opacity-40">
                                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Protocol Expansion Pending</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

