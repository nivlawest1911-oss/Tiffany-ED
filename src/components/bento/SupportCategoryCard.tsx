import React, { ReactCenter } from 'react';
import Link from 'next/link';

interface Props {
    icon: ReactCenter;
    title: string;
    articleCount: number | string;
    href?: string;
}

export default function SupportCategoryCard({ icon, title, articleCount, href }: Props) {
    const CardContent = (
        <article className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-600 transition-colors duration-300 relative cursor-pointer h-full">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-600/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    {icon}
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-amber-500 transition-colors">{title}</h3>
                <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">{articleCount} Articles</p>
            </div>
        </article>
    );

    if (href) {
        return <Link href={href}>{CardContent}</Link>;
    }

    return CardContent;
}
