import React from 'react';
import { cookies } from 'next/headers';
import CodeSnippetClient from './CodeSnippetClient';

export const dynamic = 'force-dynamic';

export default async function CodeSnippetPage() {
    await cookies();
    return <CodeSnippetClient />;
}
