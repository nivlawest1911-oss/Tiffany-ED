import React from 'react';
import { cookies } from 'next/headers';
import CommsClient from './CommsClient';

export const dynamic = 'force-dynamic';

export default async function CommsPage() {
    await cookies();
    return <CommsClient />;
}
