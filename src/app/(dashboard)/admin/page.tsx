import React from 'react';
import { cookies } from 'next/headers';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await cookies();
  return <AdminDashboardClient />;
}
