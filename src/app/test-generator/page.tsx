import ImprovedGenerator from '@/components/ImprovedGenerator';

export default function TestGeneratorPage() {
    return (
        <ImprovedGenerator
            generatorId="iep-architect"
            title="IEP Architect"
            description="Generate IDEA-compliant IEPs with AI assistance"
            quickPrompts={[
                'Create IEP for 5th grade student with dyslexia',
                'Generate annual goals for math intervention',
                'Draft accommodations for ADHD student',
                'Create transition plan for high school student',
                'Write present levels of performance for reading',
            ]}
        />
    );
}
