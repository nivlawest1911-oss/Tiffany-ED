import React from 'react';
import { cookies } from 'next/headers';
import ComplianceClient from './ComplianceClient';

export const dynamic = 'force-dynamic';

export default async function CompliancePage() {
    await cookies();
    return <ComplianceClient />;
}
