import React from 'react';
import { cookies } from 'next/headers';
import StudentsClient from './StudentsClient';

export const dynamic = 'force-dynamic';

export default async function StudentsPage() {
    await cookies();
    return <StudentsClient />;
}
