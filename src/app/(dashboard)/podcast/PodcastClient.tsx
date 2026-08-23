'use client';

import dynamic from 'next/dynamic';

const PodcastHub = dynamic(
    () => import('@/components/podcast/PodcastHub'),
    {
        ssr: false,
        loading: () => <div className="min-h-screen w-full bg-slate-950 p-6 flex items-center justify-center" />,
    }
);

export default function PodcastClient() {
    return <PodcastHub />;
}
