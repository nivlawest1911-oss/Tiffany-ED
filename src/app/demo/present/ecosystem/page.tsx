import React from 'react';
import { cookies } from 'next/headers';
import EcosystemClient from './EcosystemClient';

export const dynamic = 'force-dynamic';

export default async function EcosystemPage() {
    await cookies();
    return <EcosystemClient />;
}
