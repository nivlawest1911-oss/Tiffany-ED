import React from 'react';
import { cookies } from 'next/headers';
import AuditLogClient from './AuditLogClient';

export const dynamic = 'force-dynamic';

export default async function AuditLogPage() {
  await cookies();
  return <AuditLogClient />;
}
