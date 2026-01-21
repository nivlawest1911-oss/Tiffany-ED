import { notFound } from 'next/navigation';
import { generators } from '@/data/generators';
import EnhancedGenerator from '@/components/EnhancedGenerator';

// Map Avatar Enums to Real Assets
const AVATAR_MAP: Record<string, { name: string, role: string, image: string }> = {
    'principal': { name: "Dr. Alvin West", role: "Executive Principal", image: "/images/avatars/dr_alvin_west_premium.png" },
    'counselor': { name: "Andre Patterson", role: "Behavior Intervention Lead", image: "/images/avatars/behavior_specialist.png" },
    'data': { name: "Marcus Johnson", role: "Professional Stem Lead", image: "/images/avatars/stem_coordinator.png" },
    'compliance': { name: "Dr. Maya Washington", role: "IEP Compliance Architect", image: "/images/avatars/iep_architect.png" },
    'curriculum': { name: "Sarah West", role: "Curriculum Strategist", image: "/images/avatars/curriculum_strategist.png" },
    'literacy': { name: "Dr. Emily Robinson", role: "Literacy & Data Scientist", image: "/images/avatars/literacy_coach.png" },
    'finance': { name: "Director Nova", role: "Capital Recovery Lead", image: "/images/avatars/executive_leader.png" }
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
            iconCenter={<Icon size={32} className="text-white" />}
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


