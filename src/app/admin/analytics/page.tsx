import React from 'react';
import EdIntelShell from '@/components/layout/EdIntelShell';
import AnalyticsClient from './AnalyticsClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'District Analytics | EdIntel EdIntel',
    description: 'BigQuery Powered School Performance Metrics.',
};

export default function AnalyticsPage() {
    return (
        <EdIntelShell>
            <div className="pb-20">
                <AnalyticsClient />
            </div>
        </EdIntelShell>
    );
}
