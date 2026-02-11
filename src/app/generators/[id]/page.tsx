import { notFound } from 'next/navigation';
import { generators } from '@/data/generators';
import EnhancedGenerator from '@/components/EnhancedGenerator';

// Map Real Assets to Delegate Personas
const DELEGATE_REGISTRY = [
    { image: "/images/avatars/Dr._alvin_west.png", name: "Dr. Alvin West", role: "Executive Principal" },
    { image: "/images/avatars/keisha_reynolds_premium.png", name: "Keisha Reynolds", role: "Guidance Counselor" },
    { image: "/images/avatars/emily_robinson_premium.png", name: "Dr. Emily Robinson", role: "Curriculum & Data Strategist" },
    { image: "/images/avatars/isaiah_vance_premium.png", name: "Isaiah Vance", role: "Compliance Officer" },
    { image: "/images/avatars/executive_leader.png", name: "Director Nova", role: "Finance Director" },
    { image: "/images/avatars/andre_patterson_premium.png", name: "Andre Patterson", role: "Behavior Specialist" },
    { image: "/images/avatars/maya_washington_premium.png", name: "Maya Washington", role: "SPED Coordinator" },
    // Legacy / Fallback mappings if generator data uses older paths
    { image: "/images/avatars/behavior_specialist.png", name: "Andre Patterson", role: "Behavior Intervention Lead" },
    { image: "/images/avatars/stem_coordinator.png", name: "Marcus Johnson", role: "STEM Lead" },
    { image: "/images/avatars/iep_architect.png", name: "Dr. Maya Washington", role: "IEP Compliance Architect" },
    { image: "/images/avatars/literacy_coach.png", name: "Dr. Emily Robinson", role: "Literacy Coach" },
    { image: "/images/avatars/curriculum_strategist.png", name: "Sarah West", role: "Curriculum Strategist" }
];

import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function GeneratorPage({ params }: { params: Promise<{ id: string }> }) {
    await cookies(); // Force dynamic rendering
    const { id } = await params;
    const generator = generators.find((g) => g.id === id);

    if (!generator) {
        notFound();
    }

    const Icon = generator.icon;

    // Find specific delegate based on the generator's assigned avatar image
    const specificDelegate = DELEGATE_REGISTRY.find(d => d.image === generator.avatar);

    // Fallback to Principal if no match found
    const delegate = specificDelegate || {
        name: "Dr. Alvin West",
        role: "Executive Principal",
        image: "/images/avatars/Dr._alvin_west.png"
    };

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


