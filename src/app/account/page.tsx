import React from 'react';
import { cookies } from 'next/headers';
import AccountClient from './AccountClient';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
    await cookies();
    return <AccountClient />;
}
