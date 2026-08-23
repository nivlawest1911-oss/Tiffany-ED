import React from 'react';
import { cookies } from 'next/headers';
import TalentCommandClient from './TalentCommandClient';

export const dynamic = 'force-dynamic';

export default async function TalentCommandPage() {
    await cookies();
    return <TalentCommandClient />;
}
