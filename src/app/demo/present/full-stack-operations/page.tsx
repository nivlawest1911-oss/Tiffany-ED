import React from 'react';
import { cookies } from 'next/headers';
import FullStackOperationsClient from './FullStackOperationsClient';

export const dynamic = 'force-dynamic';

export default async function FullStackOperationsPage() {
    await cookies();
    return <FullStackOperationsClient />;
}
