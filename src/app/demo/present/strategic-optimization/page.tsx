import React from 'react';
import { cookies } from 'next/headers';
import StrategicOptimizationClient from './StrategicOptimizationClient';

export const dynamic = 'force-dynamic';

export default async function StrategicOptimizationPage() {
    await cookies();
    return <StrategicOptimizationClient />;
}
