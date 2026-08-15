'use client';

import React from 'react';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { EdIntelVibeProvider } from '@/context/EdIntelVibeContext';
import { CelebrationProvider } from '@/context/CelebrationContext';
import { SovereignProvider } from '@/context/SovereignState';
import { GlobalSynapseProvider } from '@/context/GlobalSynapseContext';

export default function AuthenticatedProviders({ children }: { children: React.ReactNode }) {
    return (
        <CelebrationProvider>
            <IntelligenceProvider>
                <SovereignProvider>
                    <EdIntelVibeProvider>
                        <GlobalSynapseProvider>
                            {children}
                        </GlobalSynapseProvider>
                    </EdIntelVibeProvider>
                </SovereignProvider>
            </IntelligenceProvider>
        </CelebrationProvider>
    );
}
