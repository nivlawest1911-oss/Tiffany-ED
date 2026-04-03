import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { EPISODES } from '@/lib/briefing-data';
import { isBriefingUnlocked } from '../../actions';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Download, Printer, Share2 } from 'lucide-react';
import UnlockBriefingButton from './UnlockBriefingButton';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const episode = EPISODES.find(e => e.slug === slug);
    if (!episode) return { title: 'Report Not Found' };

    return {
        title: `Intelligence Report: ${episode.title} | EdIntel`,
        description: `Strategic deep dive data for ${episode.title}.`,
    };
}

export default async function BriefingDataPage({ params }: PageProps) {
    const { slug } = await params;
    const episode = EPISODES.find(e => e.slug === slug);
    if (!episode) notFound();

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
        redirect('/login?returnTo=/briefings/' + slug + '/data');
    }

    // Identify user
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/me`, {
        headers: { Cookie: `session=${sessionCookie.value}` }
    });
    const { user } = await res.json();
    
    if (!user) redirect('/login');

    const unlocked = await isBriefingUnlocked(user.id, slug);

    if (!unlocked) {
        return (
            <div className="min-h-screen bg-black text-white pt-32 px-4">
                <Link 
                    href={`/briefings/${slug}`}
                    className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-12 hover:text-noble-gold transition-colors"
                >
                    <ChevronLeft size={14} />
                    Return to Briefing Player
                </Link>
                <UnlockBriefingButton slug={slug} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-noble-gold selection:text-black pt-32 pb-64 px-4 overflow-hidden">
            
            {/* Design accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[600px] bg-noble-gold/5 blur-[150px] rounded-full opacity-30 pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-10 border-b border-white/5">
                    <div className="flex flex-col items-start text-left">
                        <Link 
                            href={`/briefings/${slug}`}
                            className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 hover:text-noble-gold transition-colors"
                        >
                            <ChevronLeft size={14} />
                            Briefing Player Node
                        </Link>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck size={16} className="text-noble-gold" />
                            <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.3em]">Access Status: Authorized</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                            Deep Dive <span className="text-noble-gold">Report</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <button className="p-4 liquid-glass border-white/10 text-white/50 hover:text-white transition-all rounded-full" title="Download Offline Report" aria-label="Download Offline Report">
                            <Download size={20} />
                        </button>
                        <button className="p-4 liquid-glass border-white/10 text-white/50 hover:text-white transition-all rounded-full" title="Print Tactical View" aria-label="Print Tactical View">
                            <Printer size={20} />
                        </button>
                        <button className="p-4 liquid-glass border-white/10 text-white/50 hover:text-white transition-all rounded-full" aria-label="Share Report">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* THE REPORT CONTENT */}
                <div className="liquid-glass border-white/10 bg-zinc-950/80 p-12 lg:p-20 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                    <article className="prose prose-invert prose-noble-gold max-w-none font-mono">
                        {/* Simple markdown-like rendering for the POC */}
                        <div className="whitespace-pre-wrap leading-relaxed text-white/70 space-y-8">
                            {episode.fullReport.split('\n').map((line, idx) => {
                                if (line.startsWith('# ')) return <h1 key={idx} className="text-4xl font-black text-noble-gold uppercase italic tracking-tighter border-b border-noble-gold/20 pb-4 mb-12">{line.replace('# ', '')}</h1>;
                                if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-black text-white uppercase italic tracking-tight mb-8 mt-16">{line.replace('## ', '')}</h2>;
                                if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold text-noble-gold/80 uppercase tracking-widest mt-12 mb-6">{line.replace('### ', '')}</h3>;
                                if (line.startsWith('- ')) return <div key={idx} className="flex gap-4 items-start pl-4 py-1 border-l border-noble-gold/20 mb-2 group"><span className="text-noble-gold">▶</span><span>{line.replace('- ', '')}</span></div>;
                                if (line.match(/^\[( |x)\]/)) {
                                    const checked = line.includes('[x]');
                                    return (
                                        <div key={idx} className="flex gap-4 items-center pl-8 py-3 bg-white/5 border border-white/5 rounded-xl mb-3 hover:bg-white/10 transition-all cursor-pointer">
                                            <div className={`w-4 h-4 rounded border ${checked ? 'bg-noble-gold border-noble-gold' : 'border-white/20'}`} />
                                            <span className={`text-[11px] font-black uppercase tracking-widest ${checked ? 'text-white/40 line-through' : 'text-white/80'}`}>{line.replace(/\[( |x)\] /, '')}</span>
                                        </div>
                                    );
                                }
                                return <p key={idx}>{line}</p>;
                            })}
                        </div>
                    </article>
                </div>

                <div className="mt-24 p-12 border border-noble-gold/20 bg-noble-gold/[0.03] text-center rounded-[3rem]">
                    <h4 className="text-noble-gold font-black uppercase text-sm tracking-[0.2em] mb-4 italic">Operational Protocol</h4>
                    <p className="text-xs text-white/40 font-mono max-w-xl mx-auto leading-relaxed">
                        Intelligence nodes are provided for Mobile County strategic alignment. Data leakage from the EdIntel Strategic Vault is a direct compliance breach of FERPA and Alabama privacy mandates.
                    </p>
                </div>
            </div>
        </div>
    );
}
