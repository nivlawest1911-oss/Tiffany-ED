"use client";

import { AuthProvider } from '@/context/AuthContext';
import { IntelligenceProvider } from '@/context/IntelligenceContext';
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext";
import { CelebrationProvider } from '@/context/CelebrationContext';
import { SovereignProvider } from '@/context/SovereignState';
import { GlobalSynapseProvider } from '@/context/GlobalSynapseContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CelebrationProvider>
      <AuthProvider>
        <IntelligenceProvider>
          <SovereignProvider>
            <EdIntelVibeProvider>
              <GlobalSynapseProvider>
                {children}
              </GlobalSynapseProvider>
            </EdIntelVibeProvider>
          </SovereignProvider>
        </IntelligenceProvider>
      </AuthProvider>
    </CelebrationProvider>
  );
}
