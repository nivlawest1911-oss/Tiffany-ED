import React from 'react';
import { cookies } from 'next/headers';
import StudentDetailClient from './StudentDetailClient';

export const dynamic = 'force-dynamic';

export default async function StudentDetailPage() {
  await cookies();
  return <StudentDetailClient />;
}
