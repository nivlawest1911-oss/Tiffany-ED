import React from 'react';
import SovereignShell from '@/components/layout/SovereignShell';
import ToolsClient from './ToolsClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Intelligence Tools | EdIntel Sovereign',
    description: 'AI-Powered Executive Generators and Analysis Modules',
};

export default function ToolsPage() {
    return (
        <SovereignShell>
            <ToolsClient />
        </SovereignShell>
    );
}
