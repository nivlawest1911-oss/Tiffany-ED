import React from 'react';
import { cookies } from 'next/headers';
import ManagementClient from './ManagementClient';

export const dynamic = 'force-dynamic';

export default async function ManagementPage() {
    await cookies();
    return <ManagementClient />;
}
