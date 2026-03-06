import React from 'react';
import EdIntelShell from '@/components/layout/EdIntelShell';
import ToolsClient from './ToolsClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Intelligence Tools | EdIntel EdIntel',
    description: 'AI-Powered Executive Generators and Analysis Modules',
};

export default function ToolsPage() {
    return (
        <EdIntelShell>
            <ToolsClient />
        </EdIntelShell>
    );
}
