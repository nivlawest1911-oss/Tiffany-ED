import React from 'react';
import { cookies } from 'next/headers';
import AcademicClient from './AcademicClient';

export const dynamic = 'force-dynamic';

export default async function AcademicPage() {
    await cookies();
    return <AcademicClient />;
}
