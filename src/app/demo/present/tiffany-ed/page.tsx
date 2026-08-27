import React from 'react';
import { cookies } from 'next/headers';
import TiffanyEdClient from './TiffanyEdClient';

export const dynamic = 'force-dynamic';

export default async function TiffanyEdPage() {
    await cookies();
    return <TiffanyEdClient />;
}
