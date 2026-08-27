import React from 'react';
import { cookies } from 'next/headers';
import ManualClient from './ManualClient';

export const dynamic = 'force-dynamic';

export default async function ManualPage() {
    await cookies();
    return <ManualClient />;
}
