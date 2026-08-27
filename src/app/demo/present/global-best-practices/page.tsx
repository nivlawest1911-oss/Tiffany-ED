import React from 'react';
import { cookies } from 'next/headers';
import GlobalBestPracticesClient from './GlobalBestPracticesClient';

export const dynamic = 'force-dynamic';

export default async function GlobalBestPracticesPage() {
    await cookies();
    return <GlobalBestPracticesClient />;
}
