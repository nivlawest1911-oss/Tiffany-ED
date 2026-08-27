import React from 'react';
import { cookies } from 'next/headers';
import AgentFleetClient from './AgentFleetClient';

export const dynamic = 'force-dynamic';

export default async function AgentFleetPage() {
    await cookies();
    return <AgentFleetClient />;
}
