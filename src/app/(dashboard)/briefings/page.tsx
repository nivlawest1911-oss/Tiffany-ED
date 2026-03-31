import { Metadata } from 'next';
import { EPISODES } from '@/lib/briefing-data';
import BriefingCard from '@/components/intelligence/BriefingCard';
import DrWestAuthority from '@/components/intelligence/DrWestAuthority';
import { Shield, Activity, Wifi, Lock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Intelligence Briefings | EdIntel Podcast for Mobile County Schools',
    description: 'Expert educational intelligence and strategic data for Alabama educators. Hosted by Dr. Alvin West. Real-time insights for Mobile County Public Schools.',
    keywords: ['Mobile County Schools', 'Alabama Education Data', 'EdIntel', 'Dr. Alvin West', 'Educational Podcast', 'Strategy Intelligence'],
};

export default function BriefingsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-noble-gold selection:text-black">
            
            {/* HERO SECTION */}
            <section className="relative py-32 px-4 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-noble-gold/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-8 px-4 py-2 liquid-glass border-noble-gold/30">
                        <Activity size={14} className="text-noble-gold animate-pulse" />
                        <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.5em]">Live Intelligence Feed: Active</span>
                    </div>

                    <h1 className="text-7xl lg:text-9xl font-black italic uppercase tracking-tighter leading-none mb-4">
                        Intelligence <span className="text-noble-gold">Briefings</span>
                    </h1>
                    
                    <p className="text-xl lg:text-2xl text-white/50 font-mono leading-relaxed max-w-3xl mb-12">
                        Professional utility for <span className="text-white">Mobile County</span> educators. Convert raw district data clusters into actionable strategy.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 opacity-40">
                        <div className="flex items-center gap-2">
                            <Wifi size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Neural Uplink</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">End-to-End Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">District Priority</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* BRIEFINGS GRID */}
            <section className="py-24 px-4 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10">
                        <div>
                            <p className="text-noble-gold text-[12px] font-black uppercase tracking-[0.3em] mb-2">Episode Archives</p>
                            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">The Briefing <span className="text-white/20">Collection</span></h2>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
                            <span>Filter: All Regions</span>
                            <span className="h-4 w-px bg-white/10" />
                            <span>Sort: Newest First</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {EPISODES.map((episode) => (
                            <BriefingCard key={episode.id} episode={episode} />
                        ))}
                    </div>
                </div>
            </section>

            {/* DR. WEST AUTHORITY SECTION */}
            <DrWestAuthority />

            {/* Trial Banner */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto liquid-glass border-noble-gold/30 bg-gradient-to-br from-noble-gold/5 via-zinc-950/80 to-black p-12 text-center rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-noble-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                        Ready for Full <span className="text-noble-gold">Sovereignty?</span>
                    </h3>
                    <p className="text-lg text-white/60 font-mono mb-10 max-w-2xl mx-auto">
                        Unlock the complete EdIntel foundry and transform your school district with 12 months (or 14 days trial) of deep-level tactical intelligence.
                    </p>
                    <button className="EdIntel-button bg-noble-gold text-black px-12 py-5 text-[12px]">
                        Initialize 14-Day Tactical Trial
                    </button>
                    {/* Tiny disclaimer */}
                    <p className="mt-6 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">No usage tokens required for initial sync</p>
                </div>
            </section>
        </div>
    );
}
