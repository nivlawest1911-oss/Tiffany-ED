import { cookies } from 'next/headers';
import GeminiWorkspaceHub from '@/components/GeminiWorkspaceHub';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: '✨ Gemini Workspace | EdIntel Professional',
    description: 'Import and integrate your Google Gemini content into EdIntel Professional',
};

export default async function GeminiWorkspacePage() {
    await cookies(); // Force dynamic rendering
    return <GeminiWorkspaceHub />;
}
