import { notFound } from 'next/navigation';
import { generators } from '@/data/generators';
import EnhancedGenerator from '@/components/EnhancedGenerator';

export async function generateStaticParams() {
    return generators.map((gen) => ({
        id: gen.id,
    }));
}

export default async function GeneratorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const generator = generators.find((g) => g.id === id);

    if (!generator) {
        notFound();
    }

    const Icon = generator.icon;

    return (
        <EnhancedGenerator
            generatorId={generator.id}
            generatorName={generator.name}
            generatorColor={generator.color}
            iconNode={<Icon size={32} className="text-white" />}
            prompts={generator.prompts}
            heroImage={generator.heroImage}
            heroVideo={generator.heroVideo}
            welcomeVideo={generator.welcomeVideo}
            voiceWelcome={generator.voiceWelcome}
        />
    );
}
