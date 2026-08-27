import React from 'react';
import { cookies } from 'next/headers';
import EdIntelShell from '@/components/layout/EdIntelShell';
import ToolsClient from './ToolsClient';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Intelligence Tools | EdIntel EdIntel',
    description: 'AI-Powered Executive Generators and Analysis Modules',
};

export default async function ToolsPage() {
    await cookies();
    return (
        <EdIntelShell>
            <ToolsClient />
        </EdIntelShell>
    );
}
