import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EPISODES } from '@/lib/briefing-data';
import IntelPlayer from '@/components/intelligence/IntelPlayer';
import Link from 'next/link';
import { ChevronLeft, ShieldAlert, Lock } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const episode = EPISODES.find(e => e.slug === slug);
    if (!episode) return { title: 'Briefing Not Found' };

    return {
        title: `${episode.title} | EdIntel Intelligence Briefing`,
        description: `Strategy & Data for Mobile County Educators: ${episode.summary}`,
        openGraph: {
            title: episode.title,
            description: episode.summary,
            type: 'article',
            publishedTime: episode.date,
        }
    };
}

export default async function BriefingDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const episode = EPISODES.find(e => e.slug === slug);

    if (!episode) notFound();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-noble-gold selection:text-black pt-20">
            
            {/* Header Navigation */}
            <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
                <Link 
                    href="/briefings"
                    className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] hover:text-noble-gold transition-colors"
                >
                    <ChevronLeft size={14} />
                    Back to Archives
                </Link>
                <div className="flex items-center gap-3 px-4 py-2 liquid-glass border-emerald-500/30">
                    <ShieldAlert size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.4em]">Secure Node 001: Connected</span>
                </div>
            </div>

            {/* INTEL PLAYER COMPONENT */}
            <section className="py-8">
                <IntelPlayer episode={episode} />
            </section>

            {/* EPISODE DETAILS / INFO FOOTER */}
            <section className="max-w-7xl mx-auto px-4 lg:px-12 py-24 border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div className="space-y-12">
                        <div>
                            <h4 className="text-noble-gold text-[12px] font-black uppercase tracking-[0.3em] mb-4">Briefing Overview</h4>
                            <p className="text-2xl font-black text-white italic uppercase tracking-tighter leading-relaxed">
                                {episode.summary}
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Strategic Highlights</h5>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {episode.chapters.map((chapter, i) => (
                                    <li key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 text-[10px] text-white/60 font-black uppercase tracking-widest">
                                        <span className="text-noble-gold">0{i+1}</span>
                                        {chapter.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="liquid-glass border-white/10 bg-zinc-950 p-12 flex flex-col items-center justify-center text-center">
                        <Lock className="text-noble-gold mb-8" size={64} />
                        <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Deep Dive Data</h4>
                        <p className="text-sm text-white/40 font-mono mb-12 max-w-sm tracking-loose">
                            To unlock the full strategic data report, Alabaman trends, and actionable district checklists for this briefing, use 1 EdIntel Usage Token.
                        </p>
                        <Link 
                            href={`/briefings/${episode.slug}/data`}
                            className="EdIntel-button bg-white text-black px-12 py-5 text-[10px]"
                        >
                            Unlock Deep Dive Node
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
