import React from 'react';
import { cookies } from 'next/headers';
import ResearchClient from './ResearchClient';

export const dynamic = 'force-dynamic';

export default async function ResearchPage() {
    await cookies();
    return <ResearchClient />;
}
