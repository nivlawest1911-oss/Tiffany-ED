import React from 'react';
import SovereignShell from '@/components/layout/SovereignShell';
import AnalyticsClient from './AnalyticsClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'District Analytics | EdIntel Sovereign',
    description: 'BigQuery Powered School Performance Metrics.',
};

export default function AnalyticsPage() {
    return (
        <SovereignShell>
            <div className="pb-20">
                <AnalyticsClient />
            </div>
        </SovereignShell>
    );
}
