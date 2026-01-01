import React from 'react';

interface BlogPost {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    category: string;
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
    return (
        <article className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2">{post.title}</h3>
                <p className="text-sm text-white/70 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{post.date}</span>
                    <span>{post.category}</span>
                </div>
            </div>
        </article>
    );
}
