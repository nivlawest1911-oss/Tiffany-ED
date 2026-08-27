import React from 'react';
import { cookies } from 'next/headers';
import GovernmentClient from './GovernmentClient';

export const dynamic = 'force-dynamic';

export default async function GovernmentPage() {
    await cookies();
    return <GovernmentClient />;
}
