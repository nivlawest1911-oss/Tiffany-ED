import React from 'react';
import { cookies } from 'next/headers';
import LTIPlatformsClient from './LTIPlatformsClient';

export const dynamic = 'force-dynamic';

export default async function LTIPlatformsPage() {
  await cookies();
  return <LTIPlatformsClient />;
}
