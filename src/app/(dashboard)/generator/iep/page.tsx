import React from 'react';
import { cookies } from 'next/headers';
import IepClient from './IepClient';

export const dynamic = 'force-dynamic';

export default async function IepPage() {
    await cookies();
    return <IepClient />;
}
