import { z } from 'zod';

/**
 * Sovereign AI Signatures
 * Implementing the DSPy pattern: Declarative contracts for AI intent.
 * This separates the 'what' (signature) from the 'how' (model/prompt).
 */

export interface ISignature<TInput extends z.ZodType, TOutput extends z.ZodType> {
    name: string;
    description: string;
    inputSchema: TInput;
    outputSchema: TOutput;
    instruction: string;
}

/**
 * Signature for generating a Strategic IEP Summary
 */
export const IEPSummarySignature: ISignature<
    z.ZodObject<{ studentName: z.ZodString; incidentCount: z.ZodNumber; history: z.ZodString }>,
    z.ZodObject<{
        summary: z.ZodString;
        priorityLevel: z.ZodEnum<['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']>;
        recommendedActions: z.ZodArray<z.ZodString>;
        complianceRiskScore: z.ZodNumber;
    }>
> = {
    name: 'IEP_Architect_Summary',
    description: 'Generates a high-fidelity, legally compliant summary for a student IEP protocol.',
    inputSchema: z.object({
        studentName: z.string(),
        incidentCount: z.number(),
        history: z.string()
    }),
    outputSchema: z.object({
        summary: z.string().describe('The distilled strategic summary of the student status.'),
        priorityLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
        recommendedActions: z.array(z.string()).describe('List of actionable steps for the IEP team.'),
        complianceRiskScore: z.number().min(0).max(100).describe('Risk score based on Alabama state guidelines.')
    }),
    instruction: `
        You are the IEP Architect. Your goal is to synthesize student data into a regal, precise, and legally sound summary.
        Analyze the incident history and count to determine the compliance risk and recommended interventions.
        The tone must be authoritative yet supportive of student growth.
    `
};

/**
 * Signature for equity and bias verification (Red Team)
 */
export const EquityVerificationSignature: ISignature<
    z.ZodObject<{ textToVerify: z.ZodString }>,
    z.ZodObject<{
        isBiased: z.ZodBoolean;
        biasType: z.ZodOptional<z.ZodString>;
        correction: z.ZodOptional<z.ZodString>;
        explanation: z.ZodString;
        confidenceScore: z.ZodNumber;
        actionableSuggestion: z.ZodOptional<z.ZodString>;
    }>
> = {
    name: 'Equity_Sentry_Verify',
    description: 'Adversarial verification of text for systemic bias, illegal phrasing, or equity violations.',
    inputSchema: z.object({
        textToVerify: z.string()
    }),
    outputSchema: z.object({
        isBiased: z.boolean(),
        biasType: z.string().optional().describe('Type of bias found (e.g., racial, socioeconomic, linguistic).'),
        correction: z.string().optional().describe('Proposed equitable phrasing.'),
        explanation: z.string().describe('Detailed reasoning for the finding.'),
        confidenceScore: z.number().min(0).max(1).describe('Confidence score (0-1) reflecting the safety and equity of the content.'),
        actionableSuggestion: z.string().optional().describe('Actionable suggestion for the user if the confidence score is moderate or low.')
    }),
    instruction: `
        You are the Equity Sentry. Your task is to perform an adversarial audit of the provided text.
        Look for coded language, systemic bias, or violations of Alabama education equity protocols.
        If bias is found, provide a surgical correction.
    `
};

/**
 * Structured Output Schemas for Content Differentiation
 */
export const VocabularyTermSchema = z.object({
    term: z.string().describe('The vocabulary term.'),
    definition: z.string().describe('Child-friendly definition.'),
    exampleSentence: z.string().describe('Active example sentence.'),
    cognate: z.string().optional().default('').describe('Spanish or target language cognate if applicable.'),
    partOfSpeech: z.string().optional().default('noun').describe('Part of speech.'),
    pronunciation: z.string().optional().default('').describe('Pronunciation guide.'),
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional().default(2).describe('Vocabulary tier (1, 2, or 3).'),
});

export const VocabularyTermArraySchema = z.array(VocabularyTermSchema);

export const AssessmentQuestionSchema = z.object({
    id: z.string().optional().default('q1'),
    question: z.string().describe('The question text.'),
    dokLevel: z.number().min(1).max(4).optional().default(2).describe('Webb Depth of Knowledge level.'),
    format: z.string().optional().default('multiple_choice').describe('Question format.'),
    choices: z.array(z.string()).optional().default([]).describe('Choices for multiple-choice questions.'),
    correctAnswer: z.string().optional().default('').describe('Correct answer text.'),
    rationale: z.string().optional().default('').describe('Rationale explaining why the answer is correct.'),
    standardAlignment: z.string().optional().default('ACOS').describe('Aligned academic standard.'),
});

export const AssessmentQuestionArraySchema = z.array(AssessmentQuestionSchema);

export const GraphicOrganizerSchema = z.object({
    type: z.string().describe('Organizer type (e.g. 3-2-1, venn_diagram, cause_effect).'),
    title: z.string().describe('Title of the graphic organizer.'),
    instructions: z.string().describe('Instructions for the student.'),
    data: z.object({
        sections: z.array(z.object({
            label: z.string(),
            items: z.array(z.string()),
        })).optional().default([]),
    }).passthrough().optional().default({ sections: [] }),
});

export const DifferentiationBundleSchema = z.object({
    passage: z.string().describe('Leveled reading passage.'),
    outputLexile: z.number().optional().default(500).describe('Resulting Lexile score.'),
    wordCount: z.number().optional().default(0).describe('Word count of the passage.'),
    fleschKincaid: z.number().optional().default(5.0).describe('Flesch-Kincaid grade level score.'),
    citations: z.array(z.string()).optional().default([]).describe('Factual or historical citations.'),
    vocabulary: z.array(VocabularyTermSchema).optional().default([]),
    questions: z.array(AssessmentQuestionSchema).optional().default([]),
    graphicOrganizer: GraphicOrganizerSchema.optional(),
});

/**
 * Tone & Emotion Analysis Schema
 */
export const ToneAnalysisSchema = z.object({
    sentiment: z.enum(['positive', 'neutral', 'negative', 'critical']).catch('neutral'),
    fatigueLevel: z.enum(['low', 'moderate', 'high', 'severe']).catch('moderate'),
    suggestion: z.string().catch('Take a deep breath and prioritize your peace.'),
});

/**
 * Lesson Friction & Cognitive Bottleneck Schema
 */
export const FrictionAnalysisSchema = z.object({
    frictionScore: z.number().min(0).max(100).catch(0),
    bottlenecks: z.array(z.string()).catch([]),
    gymBreaks: z.array(z.object({
        timing: z.string(),
        activity: z.string(),
        duration: z.string(),
    })).catch([]),
    scaffolding: z.object({
        tier1: z.string().catch('N/A'),
        tier2: z.string().catch('N/A'),
        tier3: z.string().catch('N/A'),
    }).catch({ tier1: 'N/A', tier2: 'N/A', tier3: 'N/A' }),
});

/**
 * Swarm Multi-Agent Decomposition & Critic Schemas
 */
export const SwarmTaskItemSchema = z.object({
    agent: z.enum(['ANALYST', 'COMMUNICATOR', 'ARCHITECT', 'FORECASTER']),
    description: z.string(),
});

export const SwarmTaskDecompositionSchema = z.array(SwarmTaskItemSchema);

export const SwarmCriticValidationSchema = z.object({
    status: z.enum(['APPROVED', 'REJECTED']).catch('APPROVED'),
    feedback: z.string().catch('Validation complete.'),
});

/**
 * Restorative Reset Schema
 */
export const RestorativeScriptSchema = z.object({
    opener: z.string().catch('Can we take a minute to reset?'),
    questions: z.array(z.string()).catch([
        'What happened just now?',
        'What were you thinking at the time?',
        'What do you think needs to happen to make things right?'
    ]),
    closing: z.string().catch("Thanks for talking with me. Let's get back on track."),
});

/**
 * Portfolio Compliance Audit Schema
 */
export const PortfolioComplianceSchema = z.object({
    compliant: z.boolean().catch(false),
    issues: z.array(z.string()).catch(['Automated compliance check failed. Manual review required.']),
});

/**
 * Growth Narrative Schema
 */
export const GrowthNarrativeSchema = z.object({
    executiveSummary: z.string(),
    strengths: z.array(z.string()),
    growthAreas: z.array(z.string()),
    recommendations: z.array(z.string()),
    tiffanyTip: z.string(),
});

/**
 * Griot Cultural Resource Schema
 */
export const GriotResourceSchema = z.object({
    title: z.string(),
    type: z.enum(['video', 'article', 'music', 'biography']).catch('article'),
    url: z.string().catch('https://example.com'),
    relevance: z.string(),
    culturalContext: z.string(),
});

export const GriotResourceArraySchema = z.array(GriotResourceSchema);

/**
 * Cognitive Gym Scenario Schema
 */
export const GymScenarioSchema = z.object({
    scenario: z.string().describe('Detailed description of the situation (3-4 sentences).'),
    challenge: z.string().describe('The core cognitive or strategic challenge.'),
    options: z.array(z.string()).describe('List of scenario options.'),
    correctOptionIndex: z.number().describe('Index of optimal option.'),
    explanation: z.string().describe('Rationale and cognitive principle.'),
});

/**
 * Ambient Meeting Scribe & Transcript Intelligence Schema
 */
export const AmbientMeetingSummarySchema = z.object({
    title: z.string().describe('Short descriptive title of the meeting or classroom session.'),
    summary: z.string().describe('Comprehensive executive summary of the discussion.'),
    actionItems: z.array(z.object({
        task: z.string().describe('Actionable task description.'),
        assignee: z.string().optional().default('Unassigned').describe('Person or role responsible.'),
        deadline: z.string().optional().describe('Target completion date if mentioned.'),
        priority: z.enum(['low', 'medium', 'high']).default('medium').describe('Task priority.'),
    })).default([]),
    participantTags: z.array(z.string()).default([]).describe('Names or roles of active participants.'),
    complianceNotes: z.string().optional().describe('Special Education, FERPA, or Alabama Literacy Act observations.'),
    keyDecisions: z.array(z.string()).default([]).describe('Key decisions or policy consensus reached.'),
    sentiment: z.enum(['positive', 'constructive', 'neutral', 'tense']).default('neutral').describe('Overall meeting climate.'),
});



