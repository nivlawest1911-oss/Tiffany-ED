import React from 'react';
import { cookies } from 'next/headers';
import DemoPageClient from './DemoPageClient';

export const dynamic = 'force-dynamic';

export default async function DemoPage() {
  await cookies();
  return <DemoPageClient />;
}
