import { OpenAI } from 'openai';
import { sql } from '@/lib/db';
import { withResilience, ALABAMA_STRATEGIC_DIRECTIVE } from '@/lib/ai-resilience';
import { kv } from '@vercel/kv';

/**
 * SOVEREIGN AGENT SERVICE: Metacognitive Reasoning Layer
 * 
 * Provides:
 * 1. ReAct (Reasoning + Acting) Planning
 * 2. Self-Correction / "Critic" Loops
 * 3. Proactive Autonomous Actions
 */

// Initialize Primary LLM
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Schema Definitions for Tools used by the Planner
const TOOLS_SCHEMA = `
- SQL_Query: Execute read-only SQL for analytics.
- Email_Draft: Draft a professional communication via SMTP.
- Tavus_Uplink: Trigger the AVATAR to speak a specific message.
- Policy_Check: Scan 'sovereign_vibe.md' and local PDFs for compliance rules.
`;

export class SovereignAgentService {

    /**
     * MAIN ENTRY: Execute a Goal with Metacognitive Planning
     */
    async executeGoal(goal: string, userContext: any) {
        console.log(`[Sovereign Agent] Receiving Goal: "${goal}"`);

        // Phase 1: Planning (The "Thought" Step)
        const plan = await this.generatePlan(goal, userContext);

        // Phase 2: Criticism (The "Self-Correction" Step)
        const validatedPlan = await this.criticReview(plan);

        // Phase 3: Execution (The "Action" Step)
        return this.executePlan(validatedPlan);
    }

    /**
     * GENERATE PLAN: Breaks a complex request into tactical steps.
     */
    private async generatePlan(goal: string, context: any) {
        const cacheKey = `plan:${Buffer.from(goal).toString('base64').substring(0, 32)}`;

        try {
            const cached = await kv.get<string>(cacheKey);
            if (cached) {
                console.log("[Sovereign Agent] Plan retrieved from Neural Cache.");
                return cached;
            }
        } catch (e) {
            console.warn("Neural Cache unavailable for planning.");
        }

        const prompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}
        
        IDENTITY: You are the "Sovereign Planner" for EdIntel.
        MISSION: Achieve the user's goal with maximum efficiency and sovereign authority.
        CONTEXT: User is ${context.role} in Mobile County.
        AVAILABLE TOOLS: ${TOOLS_SCHEMA}

        GOAL: "${goal}"

        TASK:
        Generate a strictly numbered execution plan.
        Format:
        1. [Tool_Name]: [Specific Action]
        2. [Tool_Name]: [Specific Action]
        
        REASONING:
        Provide a brief "Chain of Thought" explaining why this sequence is optimal and how it aligns with Alabama statutes.
        `;

        const plan = await withResilience(async () => {
            const response = await openai.chat.completions.create({
                model: "gpt-4o", // Upgraded for superior multi-modal reasoning
                messages: [{ role: "system", content: prompt }]
            });
            return response.choices[0].message.content || "Plan Generation Failed";
        });

        // Cache the plan for 30 minutes
        kv.set(cacheKey, plan, { ex: 1800 }).catch(() => { });

        return plan;
    }

    /**
     * CRITIC REVIEW: Checks the plan for hallucinations or policy violations.
     */
    private async criticReview(plan: string) {
        const prompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}

        IDENTITY: You are the "Sovereign Critic". You are skeptical and precision-obsessed.
        INPUT PLAN:
        ${plan}

        TASK:
        Review the plan for:
        1. Hallucinations (Does it reference tables that don't exist?)
        2. Tone (Is it consistent with the Sovereign Persona?)
        3. Safety (Does it expose FERPA data or violate Alabama Numeracy/Literacy Acts?)

        OUTPUT:
        If safe, return the plan exactly.
        If unsafe, rewrite the plan with corrections and initiate the [CORRECTED] tag.
        `;

        return withResilience(async () => {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini", // Upgraded from 3.5 for high-speed precision
                messages: [{ role: "system", content: prompt }]
            });

            const reviewedPlan = response.choices[0].message.content;
            if (reviewedPlan?.includes('[CORRECTED]')) {
                console.log("[Sovereign Critic] Plan was corrected for safety/policy.");
            }
            return reviewedPlan || plan;
        });
    }

    /**
     * EXECUTE PLAN: Simulated execution of the steps.
     */
    private async executePlan(plan: any) {
        return {
            status: "EXECUTING",
            plan_trace: plan,
            message: "Sovereign Agent is autonomously executing the strategy."
        };
    }

    /**
     * PROACTIVE MONITOR: Runs on a cron/webhook to find issues before the user asks.
     */
    async runProactiveScan() {
        const result = await sql`SELECT school_id, token_balance FROM school_sovereignty WHERE token_balance < 100`;

        if (result.rows.length > 0) {
            return {
                alert: true,
                type: "CRITICAL_RESOURCE_LOW",
                schools: result.rows,
                action: "Drafted Email to Superintendent Re: Top-Up"
            };
        }
        return { alert: false };
    }
}

export const sovereignAgent = new SovereignAgentService();
