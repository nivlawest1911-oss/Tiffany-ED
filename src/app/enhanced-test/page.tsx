import EnhancedGeneratorV2 from '@/components/EnhancedGeneratorV2';

export default function EnhancedTestPage() {
    return (
        <EnhancedGeneratorV2
            generatorId="iep-architect"
            title="IEP Architect Pro"
            description="Generate IDEA-compliant IEPs with advanced AI assistance"
            accentColor="purple"
            quickPrompts={[
                'Create comprehensive IEP for 5th grade student with dyslexia',
                'Generate annual goals for math intervention program',
                'Draft accommodations for ADHD student in mainstream classroom',
                'Create transition plan for high school student with autism',
                'Write present levels of performance for reading comprehension',
            ]}
        />
    );
}
