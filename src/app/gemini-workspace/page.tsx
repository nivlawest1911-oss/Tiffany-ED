import GeminiWorkspaceHub from '@/components/GeminiWorkspaceHub';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '✨ Gemini Workspace | EdIntel Professional',
    description: 'Import and integrate your Google Gemini content into EdIntel Professional',
};

export default function GeminiWorkspacePage() {
    return <GeminiWorkspaceHub />;
}
