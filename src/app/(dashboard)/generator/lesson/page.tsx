import React from 'react';
import { cookies } from 'next/headers';
import LessonClient from './LessonClient';

export const dynamic = 'force-dynamic';

export default async function LessonPage() {
    await cookies();
    return <LessonClient />;
}
