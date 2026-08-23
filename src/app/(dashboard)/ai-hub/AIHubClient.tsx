'use client';

import dynamic from 'next/dynamic';

const AIGeneratorsHub = dynamic(
    () => import('@/components/ai-generators-hub').then((mod) => mod.AIGeneratorsHub),
    {
        ssr: false,
        loading: () => <div className="min-h-screen w-full bg-slate-950 p-6 flex items-center justify-center" />,
    }
);

export default function AIHubClient() {
    return <AIGeneratorsHub />;
}
