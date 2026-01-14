import { notFound } from 'next/navigation';
import { generators } from '@/data/generators';
import EnhancedGenerator from '@/components/EnhancedGenerator';

// Map Avatar Enums to Real Assets
const AVATAR_MAP: Record<string, { name: string, role: string, image: string }> = {
    'principal': { name: "The Architect", role: "Sovereign Lead", image: "/images/dr_alvin_west.png" },
    'counselor': { name: "The Counselor", role: "Wellbeing Lead", image: "/images/avatars/counselor.png" },
    'data': { name: "The Analyst", role: "Data Strategist", image: "/images/avatars/data_analyst.png" },
    'compliance': { name: "The Auditor", role: "Compliance Lead", image: "/images/avatars/executive_leader.png" },
    'curriculum': { name: "The Strategist", role: "Curriculum Architect", image: "/images/avatars/curriculum_strategist.png" }
};

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
    // @ts-ignore - Avatar field exists in data but might not be in type definition yet
    const avatarKey = generator.avatar || 'principal';
    const delegate = AVATAR_MAP[avatarKey] || AVATAR_MAP['principal'];

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
            delegateName={delegate.name}
            delegateRole={delegate.role}
            delegateImage={delegate.image}
        />
    );
}


