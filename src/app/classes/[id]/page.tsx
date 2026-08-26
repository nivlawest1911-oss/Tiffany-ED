import React from 'react';
import { cookies } from 'next/headers';
import ClassDetailClient from './ClassDetailClient';

export const dynamic = 'force-dynamic';

export default async function ClassDetailPage() {
  await cookies();
  return <ClassDetailClient />;
}
