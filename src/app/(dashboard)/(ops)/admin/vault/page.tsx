import React from 'react';
import { cookies } from 'next/headers';
import VaultClient from './VaultClient';

export const dynamic = 'force-dynamic';

export default async function VaultPage() {
    await cookies();
    return <VaultClient />;
}
