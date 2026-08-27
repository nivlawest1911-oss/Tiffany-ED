import React from 'react';
import { cookies } from 'next/headers';
import RosterClient from './RosterClient';

export const dynamic = 'force-dynamic';

export default async function RosterPage() {
    await cookies();
    return <RosterClient />;
}
