import { cookies } from 'next/headers';
import HuggingFaceStudio from '@/components/HuggingFaceStudio';

export const metadata = {
    title: '🤗 Hugging Face AI Studio | EdIntel Professional',
    description: 'State-of-the-art AI models for education. Text analysis, image generation, speech processing, and more.',
};

export const dynamic = 'force-dynamic';

export default async function HuggingFacePage() {
    await cookies(); // Force dynamic rendering
    return <HuggingFaceStudio />;
}
