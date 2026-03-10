/**
 * EdIntel Dynamic State Protocol Router
 * 
 * Part of the Phase 3 National Expansion Protocol.
 * Maps user context (State/District) to specific instructional and compliance instructions.
 */

export interface Protocol {
    id: string;
    name: string;
    description: string;
    systemInstructions: string;
    complianceRules?: string;
    standardMappings?: Record<string, string>;
}

export interface UserContext {
    state?: string;
    district?: string;
    schoolId?: string;
}

const ALABAMA_ALCOS: Protocol = {
    id: 'ALABAMA_ALCOS',
    name: 'Alabama Course of Study (ALCOS)',
    description: 'Alignment with Alabama State Department of Education standards.',
    systemInstructions: `
    - ALIGNMENT: Strictly align with Alabama Course of Study (ALCOS) objectives.
    - STRATEGY: Incorporate AMSTI-aligned mathematical practices (Alabama Math, Science, and Technology Initiative) when applicable.
    - LITERACY: Ensure Science of Reading (SOR) alignment as per the Alabama Literacy Act.
    - TONE: Professional, structured, and focused on regional proficiency benchmarks.
    `,
    complianceRules: 'Ensure all materials meet Alabama Literacy Act and Alabama Numeracy Act requirements.'
};

const TEXAS_TEKS: Protocol = {
    id: 'TEXAS_TEKS',
    name: 'Texas Essential Knowledge and Skills (TEKS)',
    description: 'Alignment with Texas Education Agency (TEA) standardized curriculum.',
    systemInstructions: `
    - ALIGNMENT: Directly reference Texas Essential Knowledge and Skills (TEKS) standards.
    - ASSESSMENT: Focus on STAAR-readiness and evidence-based instruction.
    - STRATEGY: Use Sheltered Instruction Observation Protocol (SIOP) strategies for ELL support.
    - TONE: Comprehensive, rigorous, and result-oriented.
    `,
    complianceRules: 'Verified for TEA compliance and SBEC standards.'
};

const CALIFORNIA_SEL: Protocol = {
    id: 'CALIFORNIA_SEL',
    name: 'California Social-Emotional & Multilingual Support',
    description: 'Emphasis on SEL, ELD standards, and restorative practices.',
    systemInstructions: `
    - ALIGNMENT: Align with California Common Core State Standards (CA CCSS).
    - SEL: Integrate Social-Emotional Learning (SEL) competencies across all modules.
    - LINGUISTIC: Apply California ELD Standards for multilingual learner support.
    - INCLUSION: Prioritize Universal Design for Learning (UDL) and culturally responsive teaching.
    `,
    complianceRules: 'Compliant with California Student Data Privacy Agreement (CSDPA).'
};

const GLOBAL_VERSE: Protocol = {
    id: 'GLOBAL_VERSE',
    name: 'Global EdIntel Core Protocol ("Verse")',
    description: 'The default high-fidelity, high-rigor instructional model.',
    systemInstructions: `
    - DOCTRINE: Maximum instructional rigor.
    - persona: Act with the "Verse" persona (authoritative, inspiring, academic).
    - FOCUS: High-yield pedagogical strategies (Hattie, Marzano).
    - ESTHETIC: Modern, future-ready, and cinematic.
    `
};

const PROTOCOL_REGISTRY: Record<string, Protocol> = {
    'AL': ALABAMA_ALCOS,
    'TX': TEXAS_TEKS,
    'CA': CALIFORNIA_SEL,
};

class ProtocolRouter {
    /**
     * Resolves the appropriate protocol based on the user's current context.
     * Priorities: Individual School -> District -> State -> Global
     */
    getProtocol(context: UserContext): Protocol {
        if (context.state && PROTOCOL_REGISTRY[context.state]) {
            return PROTOCOL_REGISTRY[context.state];
        }

        return GLOBAL_VERSE;
    }

    /**
     * Injects protocol instructions into a base prompt.
     */
    applyProtocol(basePrompt: string, protocol: Protocol): string {
        return `
[PROTOCOL: ${protocol.id}]
[INSTRUCTIONS: ${protocol.systemInstructions}]

${basePrompt}
`;
    }
}

export const protocolRouter = new ProtocolRouter();
