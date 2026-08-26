import React from 'react';
import { cookies } from 'next/headers';
import AIHubClient from './AIHubClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Neural Grid Hub | EdIntel Sovereign',
    description: 'Unified AI command center and professional generators.',
};

export default async function AIHubPage() {
    await cookies();
    return <AIHubClient />;
}
