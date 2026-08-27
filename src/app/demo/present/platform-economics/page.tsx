import React from 'react';
import { cookies } from 'next/headers';
import PlatformEconomicsClient from './PlatformEconomicsClient';

export const dynamic = 'force-dynamic';

export default async function PlatformEconomicsPage() {
    await cookies();
    return <PlatformEconomicsClient />;
}
