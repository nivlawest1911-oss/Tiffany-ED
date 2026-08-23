import React from 'react';
import { cookies } from 'next/headers';
import SchoolSettingsClient from './SchoolSettingsClient';

export const dynamic = 'force-dynamic';

export default async function SchoolSettingsPage() {
  await cookies();
  return <SchoolSettingsClient />;
}
