import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

interface BlogPost {
    id: number | string;
    title: string;
    image: string;
    excerpt: string;
    date: string;
    category: string;
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.id}`}>
            <GlassCard className="h-full group">
                <article className="h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                        <NextImage src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6">
                            <span className="px-3 py-1.5 bg-noble-gold/20 backdrop-blur-md border border-noble-gold/30 rounded-full text-[9px] font-black uppercase text-noble-gold tracking-[0.2em]">
                                {post.category}
                            </span>
                        </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <p className="text-[10px] font-mono text-zinc-500 mb-3 uppercase tracking-[0.3em] font-black">{post.date}</p>
                        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-noble-gold transition-colors leading-tight italic">{post.title}</h3>
                        <p className="text-sm text-zinc-400 mb-8 line-clamp-3 leading-relaxed font-medium">{post.excerpt}</p>
                        <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-noble-gold group-hover:translate-x-2 transition-transform duration-500">
                            Access Intel <ArrowRight size={14} />
                        </div>
                    </div>
                </article>
            </GlassCard>
        </Link>
    );
}

