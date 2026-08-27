import React from 'react';
import { cookies } from 'next/headers';
import StudioClient from './StudioClient';

export const dynamic = 'force-dynamic';

export default async function StudioPage() {
    await cookies();
    return <StudioClient />;
}
