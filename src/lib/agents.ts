export interface Agent {
    id: string;
    name: string;
    cluster: string;
    role?: string;
    specialty?: string;
}

export const AGENT_REGISTRY: Record<string, Agent> = {
    REFORM_GENERAL: { id: 'ref_gen', name: 'Reform General', cluster: 'Behavior', role: 'Behavior Specialist', specialty: 'Restorative Justice' },
    LITERACY_PROVOST: { id: 'lit_pro', name: 'Literacy Provost', cluster: 'Academic', role: 'Instructional Design', specialty: 'Reading Science' },
    WELLNESS_GUARDIAN: { id: 'wel_gua', name: 'Wellness Guardian', cluster: 'Human Capital', role: 'Counselor', specialty: 'Teacher Burnout Prevention' },
    BUDGET_ORACLE: { id: 'bud_ora', name: 'Budget Oracle', cluster: 'Administrative', role: 'CFO', specialty: 'Fiscal Compliance' },
    IEC_ARCHITECT: { id: 'iep_arch', name: 'IEP Architect', cluster: 'Special Education', role: 'Case Manager', specialty: 'IDEA Compliance' },
    CURRICULUM_CARTOGRAPHER: { id: 'curr_cart', name: 'Curriculum Cartographer', cluster: 'Academic', role: 'Learning Designer', specialty: 'Scope and Sequence' },
    DATA_SCIENTIST: { id: 'data_sci', name: 'Data Insight Analyst', cluster: 'Intelligence', role: 'Analyst', specialty: 'Predictive Modeling' },
    // Expandable to 70+ agents
};

export class AgentSwarmController {
    getBestFitAgent(intent: string): Agent {
        const lowerIntent = intent.toLowerCase();

        // Neural matching logic
        if (lowerIntent.includes('money') || lowerIntent.includes('budget') || lowerIntent.includes('funds')) return AGENT_REGISTRY.BUDGET_ORACLE;
        if (lowerIntent.includes('reading') || lowerIntent.includes('phonics') || lowerIntent.includes('literacy')) return AGENT_REGISTRY.LITERACY_PROVOST;
        if (lowerIntent.includes('iep') || lowerIntent.includes('special ed') || lowerIntent.includes('504')) return AGENT_REGISTRY.IEC_ARCHITECT;
        if (lowerIntent.includes('burnout') || lowerIntent.includes('stress') || lowerIntent.includes('tired')) return AGENT_REGISTRY.WELLNESS_GUARDIAN;
        if (lowerIntent.includes('curriculum') || lowerIntent.includes('lesson')) return AGENT_REGISTRY.CURRICULUM_CARTOGRAPHER;
        if (lowerIntent.includes('data') || lowerIntent.includes('score')) return AGENT_REGISTRY.DATA_SCIENTIST;

        return AGENT_REGISTRY.REFORM_GENERAL; // Default
    }

    // Adaptor for previous interface if needed
    async parse_intent(speech: string): Promise<string> {
        // Simple keyword matching for demo; replace with LLM/NLP
        if (speech.toLowerCase().includes('reading') || speech.toLowerCase().includes('literacy')) return 'LITERACY_GAP';
        if (speech.toLowerCase().includes('behavior') || speech.toLowerCase().includes('fight')) return 'BEHAVIOR_INCIDENT';
        if (speech.toLowerCase().includes('email') || speech.toLowerCase().includes('parent') || speech.toLowerCase().includes('angry')) return 'PARENT_EMAIL_TRIAGE';
        return 'GENERAL_INQUIRY';
    }

    async analyze_sentiment(speech: string): Promise<'neutral' | 'positive' | 'urgent' | 'distressed'> {
        if (speech.toLowerCase().includes('emergency') || speech.toLowerCase().includes('help')) return 'urgent';
        return 'neutral';
    }

    async measure_cognitive_load(speech: string): Promise<number> {
        // Mock implementation: in prod, use vocal biomarkers (jitter, pauses) or BCI data
        if (speech.length > 100 || speech.includes("confused") || speech.includes("tired")) {
            return 0.9; // High load
        }
        return 0.2; // Low load
    }
}
