import React from 'react';
import { cookies } from 'next/headers';
import DemoTiffanyClient from './DemoTiffanyClient';

export const dynamic = 'force-dynamic';

export default async function DemoTiffanyPage() {
  await cookies();
  return <DemoTiffanyClient />;
}
