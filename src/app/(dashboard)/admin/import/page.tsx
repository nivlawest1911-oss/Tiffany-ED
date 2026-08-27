import React from 'react';
import { cookies } from 'next/headers';
import DataImportClient from './DataImportClient';

export const dynamic = 'force-dynamic';

export default async function DataImportPage() {
  await cookies();
  return <DataImportClient />;
}
