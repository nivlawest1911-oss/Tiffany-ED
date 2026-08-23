import React from 'react';
import { cookies } from 'next/headers';
import SchoolAdminClient from './SchoolAdminClient';

export const dynamic = 'force-dynamic';

export default async function SchoolAdminPage() {
  await cookies();
  return <SchoolAdminClient />;
}
