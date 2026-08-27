import React from 'react';
import { cookies } from 'next/headers';
import RevenueEngineClient from './RevenueEngineClient';

export const dynamic = 'force-dynamic';

export default async function RevenueEnginePage() {
    await cookies();
    return <RevenueEngineClient />;
}
