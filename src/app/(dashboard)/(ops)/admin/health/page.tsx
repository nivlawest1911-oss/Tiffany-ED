import React from 'react';
import { cookies } from 'next/headers';
import HealthClient from './HealthClient';

export const dynamic = 'force-dynamic';

export default async function HealthPage() {
    await cookies();
    return <HealthClient />;
}
