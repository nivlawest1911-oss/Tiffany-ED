'use client';
import { Suspense } from 'react';
import MediaBentoGrid from '@/components/MediaBentoGrid';
import MediaSkeleton from '@/components/MediaSkeleton';
import MediaSearch from '@/components/MediaSearch';
import { Sparkles, Image as ImageIcon, Video } from 'lucide-react';

export default function GalleryClient({ query }: { query: string }) {
    return (
        <main className="content-stage">
            {/* Header */}
            <header className="border-b border-white/10 glass-panel-premium sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <h1 className="text-4xl font-black text-white">Evidence Gallery</h1>
                    </div>
                    <p className="text-purple-300">
                        Reviewing classroom logs for Prichard & Mobile County Schools
                    </p>

                    {/* Stats */}
                    <div className="flex gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-zinc-400">Images</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-pink-400" />
                            <span className="text-sm text-zinc-400">Videos</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Suspense fallback={<div className="h-16" />}>
                    <MediaSearch />
                </Suspense>

                <Suspense key={query} fallback={<MediaSkeleton />}>
                    <MediaBentoGrid query={query} />
                </Suspense>
            </div>

            {/* Kente Pattern Footer */}
            <div className="max-w-7xl mx-auto px-6 pb-8">
                <div className="h-2 rounded-full overflow-hidden flex">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 ${i % 4 === 0 ? 'bg-amber-500' :
                                i % 4 === 1 ? 'bg-emerald-600' :
                                    i % 4 === 2 ? 'bg-rose-600' :
                                        'bg-black'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
