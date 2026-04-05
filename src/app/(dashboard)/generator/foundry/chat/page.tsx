'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import LiveAvatarChat from '@/components/LiveAvatarChat';
import { getBirthCertificate } from '@/lib/supabase';
import { CompanionCertificate } from '@/types/companion-certificate';
import { useUserSession } from '@/hooks/useUserSession';

function CompanionChatContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { session: user } = useUserSession();
    const companionId = searchParams.get('companionId');
    
    const [companion, setCompanion] = useState<CompanionCertificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCompanion() {
            if (!companionId) {
                setError('No companion ID provided.');
                setLoading(false);
                return;
            }

            try {
                const data = await getBirthCertificate(companionId);
                if (data) {
                    setCompanion(data);
                } else {
                    setError('Companion not found in the EdIntel Vault.');
                }
            } catch (err) {
                console.error('Failed to load companion:', err);
                setError('Neural link failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        loadCompanion();
    }, [companionId]);

    return (
        <div className="h-screen w-full bg-black">
            {loading ? (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                        <Loader2 className="text-noble-gold w-12 h-12" />
                    </motion.div>
                    <p className="text-noble-gold font-black uppercase tracking-[0.4em] text-xs">Synchronizing Neural Uplink...</p>
                </div>
            ) : error || !companion ? (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-black p-8 text-center">
                    <AlertCircle className="text-rose-500 w-16 h-16 mb-6" />
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Neural Link Denied</h1>
                    <p className="text-zinc-500 max-w-md mb-12 italic">{error || 'Unknown Error'}</p>
                    <button
                        onClick={() => router.push('/generator/foundry')}
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white/60 font-black text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all rounded-xl"
                    >
                        Return to Foundry
                    </button>
                </div>
            ) : (
                <LiveAvatarChat
                    avatarName={companion.name}
                    avatarRole={companion.role}
                    avatarImage={companion.avatarId}
                    avatarVoice={companion.voiceId}
                    heygenId={companion.avatarId}
                    companionId={companionId ?? undefined}
                    usageTokens={user?.usageTokens}
                    onClose={() => router.push('/generator/foundry')}
                    onRecharge={() => {}}
                    onAddXP={() => {}}
                />
            )}
        </div>
    );
}

export default function CompanionChatPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
                <Loader2 className="text-noble-gold w-12 h-12 animate-spin" />
            </div>
        }>
            <CompanionChatContent />
        </Suspense>
    );
}
