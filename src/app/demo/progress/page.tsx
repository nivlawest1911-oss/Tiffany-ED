import React from 'react';
import { cookies } from 'next/headers';
import DemoProgressClient from './DemoProgressClient';

export const dynamic = 'force-dynamic';

export default async function DemoProgressPage() {
  await cookies();
  return <DemoProgressClient />;
}
