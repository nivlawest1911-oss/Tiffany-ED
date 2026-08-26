import React from 'react';
import { cookies } from 'next/headers';
import DemoComplianceClient from './DemoComplianceClient';

export const dynamic = 'force-dynamic';

export default async function DemoCompliancePage() {
  await cookies();
  return <DemoComplianceClient />;
}
