import React from 'react';
import { cookies } from 'next/headers';
import PresentDashboardClient from './PresentDashboardClient';

export const dynamic = 'force-dynamic';

export default async function PresentDashboard() {
  await cookies();
  return <PresentDashboardClient />;
}
