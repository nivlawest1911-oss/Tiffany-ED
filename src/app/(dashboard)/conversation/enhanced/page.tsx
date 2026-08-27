import React from 'react';
import { cookies } from 'next/headers';
import EnhancedMultimodalHubClient from './EnhancedMultimodalHubClient';

export const dynamic = 'force-dynamic';

export default async function EnhancedMultimodalHubPage() {
    await cookies();
    return <EnhancedMultimodalHubClient />;
}
