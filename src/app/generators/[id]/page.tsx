import { notFound } from 'next/navigation';
import { generators } from '@/data/generators';
import EnhancedGenerator from '@/components/EnhancedGenerator';

export async function generateStaticParams() {
    return generators.map((gen) => ({
        id: gen.id,
    }));
}

export default function GeneratorPage({ params }: { params: { id: string } }) {
    const generator = generators.find((g) => g.id === params.id);

    if (!generator) {
        notFound();
    }

    return (
        <EnhancedGenerator
            generatorId={generator.id}
            generatorName={generator.name}
            generatorColor={generator.color}
            generatorIcon={generator.icon}
            prompts={generator.prompts}
        />
    );
}
