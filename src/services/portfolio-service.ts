import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

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
    }[];
}

export interface GrowthNarrative {
    executiveSummary: string;
    strengths: string[];
    growthAreas: string[];
    recommendations: string[];
    tiffanyTip: string;
}

// Mock function to simulate DB aggregation since we are in dev/mock mode for some parts
export async function aggregateStudentData(studentId: string): Promise<StudentPortfolioData> {
    // In a real implementation, this would Promise.all() fetch from Prisma
    // const student = await prisma.student.findUnique(...)
    // const sprints = await prisma.sprint.findMany(...)
    // const logs = await prisma.relationalLog.findMany(...)

    // Returning mock data for Tiffany-ED demo purposes
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
            { type: "Extended Time", effectiveness: "high" },
            { type: "Visual Aids", effectiveness: "medium" }
        ]
    };
}

export async function generateGrowthNarrative(data: StudentPortfolioData): Promise<GrowthNarrative> {
    try {
        const prompt = `
      Act as Tiffany, an expert Special Education Director and Data Storyteller.
      Analyze the following student data and generate a "Growth Narrative" for their IEP or parent conference.
      
      Student: ${data.studentName} (${data.gradeLevel})
      
      Sprints Completed:
      ${data.sprints.map(s => `- ${s.title}: ${s.skillsMastered.join(', ')}`).join('\n')}
      
      Relational Health:
      - Deposit Ratio: ${data.relationalHealth.depositRatio}/10
      - Wins: ${data.relationalHealth.notableWins.join(', ')}
      
      Accommodations:
      ${data.accommodations.map(a => `- ${a.type}: ${a.effectiveness}`).join('\n')}
      
      Target Audience: Parents and School Admin.
      Tone: Professional, Strengths-Based, Sovereign, Hopeful.
      
      Output JSON Format:
      {
        "executiveSummary": "2-3 sentences summarizing overall progress.",
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "growthAreas": ["Area 1", "Area 2"],
        "recommendations": ["Rec 1", "Rec 2"],
        "tiffanyTip": "A specific, actionable insight for the teacher."
      }
    `;

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: prompt,
        });

        try {
            const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
            const jsonString = jsonMatch ? jsonMatch[0].replace(/```json|```/g, '') : text;
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse AI response", e);
            return {
                executiveSummary: `${data.studentName} is showing steady progress.`,
                strengths: ["Resilience", "Engagement"],
                growthAreas: ["Consistent attendance"],
                recommendations: ["Continue current supports"],
                tiffanyTip: "Focus on small wins."
            };
        }
    } catch (error) {
        console.error('Error generating narrative:', error);
        throw new Error('Failed to generate narrative');
    }
}
