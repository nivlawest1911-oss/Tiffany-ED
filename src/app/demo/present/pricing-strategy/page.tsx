import React from 'react';
import { cookies } from 'next/headers';
import PricingStrategyClient from './PricingStrategyClient';

export const dynamic = 'force-dynamic';

export default async function PricingStrategyPage() {
    await cookies();
    return <PricingStrategyClient />;
}
