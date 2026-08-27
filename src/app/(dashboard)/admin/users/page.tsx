import React from 'react';
import { cookies } from 'next/headers';
import ManageUsersClient from './ManageUsersClient';

export const dynamic = 'force-dynamic';

export default async function ManageUsersPage() {
  await cookies();
  return <ManageUsersClient />;
}
