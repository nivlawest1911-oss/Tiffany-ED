import React from 'react';
import { cookies } from 'next/headers';
import ModalitiesClient from './ModalitiesClient';

export const dynamic = 'force-dynamic';

export default async function ModalitiesPage() {
    await cookies();
    return <ModalitiesClient />;
}
