import React from 'react';
import { cookies } from 'next/headers';
import CompanionChatClient from './CompanionChatClient';

export const dynamic = 'force-dynamic';

export default async function CompanionChatPage() {
    await cookies();
    return <CompanionChatClient />;
}
