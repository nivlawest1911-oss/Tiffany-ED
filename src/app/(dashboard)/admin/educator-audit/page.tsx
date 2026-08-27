import React from 'react';
import { cookies } from 'next/headers';
import EducatorAuditClient from './EducatorAuditClient';

export const dynamic = 'force-dynamic';

export default async function EducatorAuditPage() {
  await cookies();
  return <EducatorAuditClient />;
}
