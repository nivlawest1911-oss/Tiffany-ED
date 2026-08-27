import React from 'react';
import { cookies } from 'next/headers';
import ProgressClient from './ProgressClient';

export const dynamic = 'force-dynamic';

export default async function ProgressPage() {
    await cookies();
    return <ProgressClient />;
}
