import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight } from 'lucide-react';

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
            <article className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:border-noble-gold/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <NextImage src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-noble-gold/20 backdrop-blur-md border border-noble-gold/30 rounded text-[8px] font-black uppercase text-noble-gold tracking-widest">
                            {post.category}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <p className="text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">{post.date}</p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-noble-gold transition-colors leading-tight">{post.title}</h3>
                    <p className="text-sm text-zinc-400 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-noble-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Intel <ArrowRight size={12} />
                    </div>
                </div>
            </article>
        </Link>
    );
}

