import React from 'react';
import { cookies } from 'next/headers';
import StudentsPageClient from './StudentsPageClient';

export const dynamic = 'force-dynamic';

export default async function StudentsPage() {
  await cookies();
  return <StudentsPageClient />;
}
