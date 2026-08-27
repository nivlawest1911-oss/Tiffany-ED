import React from 'react';
import { cookies } from 'next/headers';
import LTIDeepLinksClient from './LTIDeepLinksClient';

export const dynamic = 'force-dynamic';

export default async function LTIDeepLinksPage() {
  await cookies();
  return <LTIDeepLinksClient />;
}
