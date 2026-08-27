import React from 'react';
import { cookies } from 'next/headers';
import DistrictBrainClient from './DistrictBrainClient';

export const dynamic = 'force-dynamic';

export default async function DistrictBrainPage() {
    await cookies();
    return <DistrictBrainClient />;
}
