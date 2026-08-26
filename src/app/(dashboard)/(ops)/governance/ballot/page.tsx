import React from 'react';
import { cookies } from 'next/headers';
import GovernanceBallotClient from './GovernanceBallotClient';

export const dynamic = 'force-dynamic';

export default async function GovernanceBallotPage() {
    await cookies();
    return <GovernanceBallotClient />;
}
