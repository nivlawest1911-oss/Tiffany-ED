import React from 'react';
import { cookies } from 'next/headers';
import ClassesPageClient from './ClassesPageClient';

export const dynamic = 'force-dynamic';

export default async function ClassesPage() {
  await cookies();
  return <ClassesPageClient />;
}
