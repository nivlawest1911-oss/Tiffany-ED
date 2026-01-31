import React from 'react';
import SovereignShell from '@/components/layout/SovereignShell';
import GrantWriterClient from './GrantWriterClient';

export const metadata = {
    title: 'Grant Center | EdIntel Sovereign',
    description: 'AI-Powered Grant Proposal Generation for Mobile County.',
};

export default function GrantsPage() {
    return (
        <SovereignShell>
            <div className="space-y-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">AI Grant Studio</h2>
                    <p className="text-white/60 max-w-2xl">
                        Harness the power of Sovereign Intelligence to draft high-impact educational grants tailored to Alabama state standards and district-specific requirements.
                    </p>
                </div>

                <GrantWriterClient />
            </div>
        </SovereignShell>
    );
}
