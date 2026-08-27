import React from 'react';
import { cookies } from 'next/headers';
import DecisionClient from './DecisionClient';

export const dynamic = 'force-dynamic';

export default async function DecisionPage() {
    await cookies();
    return <DecisionClient />;
}
