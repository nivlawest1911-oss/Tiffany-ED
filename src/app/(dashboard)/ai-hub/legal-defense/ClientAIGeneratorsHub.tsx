"use client";

import { AIGeneratorsHub } from '@/components/ai-generators-hub';

export function ClientAIGeneratorsHub({ initialGeneratorId }: { initialGeneratorId?: string }) {
    return <AIGeneratorsHub initialGeneratorId={initialGeneratorId} />;
}
