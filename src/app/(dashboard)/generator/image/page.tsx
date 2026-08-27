import React from 'react';
import { cookies } from 'next/headers';
import ImageClient from './ImageClient';

export const dynamic = 'force-dynamic';

export default async function ImagePage() {
    await cookies();
    return <ImageClient />;
}
