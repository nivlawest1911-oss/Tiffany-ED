import React from 'react';
import { cookies } from 'next/headers';
import EcosystemGravityClient from './EcosystemGravityClient';

export const dynamic = 'force-dynamic';

export default async function EcosystemGravityPage() {
    await cookies();
    return <EcosystemGravityClient />;
}
