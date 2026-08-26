import React from 'react';
import { cookies } from 'next/headers';
import GovernanceHubClient from './GovernanceHubClient';

export const dynamic = 'force-dynamic';

export default async function GovernanceHubPage() {
    await cookies();
    return <GovernanceHubClient />;
}
