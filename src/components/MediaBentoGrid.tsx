import Image from 'next/image';
import { getEdIntelMedia } from '@/lib/actions/fetchMedia';
import { Play } from 'lucide-react';

export default async function MediaBentoGrid({ query }: { query?: string }) {
    const assets = await getEdIntelMedia(query);

    if (assets.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-zinc-400 text-lg">No media found. Upload your first assets to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {assets.map((item: any, index: number) => (
                <div
                    key={item.id}
                    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-xl group hover:border-purple-500/50 transition-all
            ${index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}
          `}
                >
                    {item.media_type === 'video' ? (
                        <>
                            <video
                                src={item.url}
                                className="h-full w-full object-cover"
                                loop
                                muted
                                playsInline
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <Image
                            src={item.url}
                            alt={item.file_name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    )}

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 backdrop-blur-sm">
                        <p className="text-xs text-white font-medium truncate">{item.file_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                                {item.media_type}
                            </span>
                            {item.size && (
                                <span className="text-[10px] text-zinc-500">
                                    • {(item.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Holographic Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
                </div>
            ))}
        </div>
    );
}
