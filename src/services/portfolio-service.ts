import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { GrowthNarrativeSchema } from '@/lib/ai/signatures';
import { z } from 'zod';

export type GrowthNarrative = z.infer<typeof GrowthNarrativeSchema>;

export interface StudentPortfolioData {
    studentId: string;
    studentName: string;
    gradeLevel: string;
    sprints: {
        title: string;
        description: string;
        completedAt: string;
        skillsMastered: string[];
    }[];
    relationalHealth: {
        depositRatio: number; // 0-10
        notableWins: string[];
        conflictResolutionStyle: string;
    };
    accommodations: {
        type: string;
        effectiveness: 'high' | 'medium' | 'low';
        notes?: string;
    }[];
    behaviorIncidents?: {
        date: string;
        type: string;
        resolution: string;
    }[];
}

// Mock function to simulate DB aggregation since we are in dev/mock mode for some parts
export async function aggregateStudentData(studentId: string): Promise<StudentPortfolioData> {
    return {
        studentId,
        studentName: "Jordan Davis",
        gradeLevel: "10th Grade",
        sprints: [
            {
                title: "The Great Gatsby - Critical Lens",
                description: "Analyzed class dynamics through Marxist lens.",
                completedAt: "2023-11-15",
                skillsMastered: ["Argumentative Writing", "Textual Evidence", "Socio-economic Analysis"]
            },
            {
                title: "Polynomial Mastery",
                description: "Advanced algebraic operations.",
                completedAt: "2023-12-02",
                skillsMastered: ["Factoring", "Graphing", "Complex Numbers"]
            }
        ],
        relationalHealth: {
            depositRatio: 7.5,
            notableWins: ["Led group discussion", "Helped peer with code", "Improved attendance"],
            conflictResolutionStyle: "Assertive but respectful"
        },
        accommodations: [
            { type: "Extended Time", effectiveness: "high", notes: "Used consistently." },
            { type: "Visual Aids", effectiveness: "medium", notes: "Helpful in math." }
        ],
        behaviorIncidents: []
    };
}

export async function generateGrowthNarrative(data: StudentPortfolioData): Promise<GrowthNarrative> {
    try {
        const prompt = `
      Act as Tiffany, a veteran Special Education Director and Master Teacher.
      Synthesize the following student data into an empowering, data-driven Growth Narrative for their end-of-year portfolio.
      
      STUDENT DATA:
      - Name: ${data.studentName}
      - Grade: ${data.gradeLevel}
      - Logic Sprints Mastered: ${data.sprints.map(s => `${s.title} (${s.skillsMastered.join(', ')})`).join('; ')}
      - Relational Health: Deposit Ratio is ${data.relationalHealth.depositRatio}/10. Wins: ${data.relationalHealth.notableWins.join(', ')}
      - Effective Accommodations: ${data.accommodations.filter(a => a.effectiveness === 'high').map(a => a.type).join(', ')}
      - Incident History: ${(data.behaviorIncidents || []).length} incidents logged.
      
      GUIDELINES:
      - Tone: Celebratory, objective, and deeply human.
      - Focus on momentum and "growth vectors" rather than deficits.
      - Highlight specific Logic Sprints and relationship milestones.
      - Include actionable next steps for the next grade level.
    `;

        const { object } = await generateObject({
            model: googleProvider(AI_MODELS.GOOGLE.PRO),
            schema: GrowthNarrativeSchema,
            prompt: prompt,
        });

        return object;
    } catch (error) {
        console.error('Error generating narrative, using fallback:', error);
        return {
            executiveSummary: `${data.studentName} is showing steady progress and developmental growth.`,
            strengths: ["Resilience", "Engagement", "Consistency"],
            growthAreas: ["Continued skill mastery"],
            recommendations: ["Continue current individualized supports"],
            tiffanyTip: "Focus on celebrating small daily wins."
        };
    }
}
