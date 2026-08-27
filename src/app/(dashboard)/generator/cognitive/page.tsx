import React from 'react';
import { cookies } from 'next/headers';
import CognitiveClient from './CognitiveClient';

export const dynamic = 'force-dynamic';

export default async function CognitivePage() {
    await cookies();
    return <CognitiveClient />;
}
