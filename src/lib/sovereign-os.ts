import { createClient } from '@supabase/supabase-js';
import { AgentSwarmController, Agent } from './agents';
import { depositToMemoryBank } from './memory-bank';

// Edge Runtime for low latency
export const runtime = 'edge';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

const generateId = () => Math.random().toString(36).substring(2, 9);

export const TOKEN_COSTS = {
    LIGHTWEIGHT: 5,   // IEPs, Lessons, Behavior Logs
    HEAVYWEIGHT: 50,  // Avatar Synthesis, Voice Cloning, Analytics
};

export const DECISION_ORACLE = {
    BINARY_THRESHOLD: 0.8, // 0-1 score where Binary Mode engages
};

// --- MOCK ENGINE INTERFACES (The 100+ Engines) ---
// Now connected to Supabase where applicable

export class LiteracyArchitect {
    static async get_student_gap(intent: string, studentId: string = 'student_001') {
        try {
            const response = await fetch('/api/agents/literacy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, intent })
            });
            if (!response.ok) throw new Error('Edge Agent Offline');
            const data = await response.json();
            return data.analysis;
        } catch (error) {
            console.error('[LiteracyArchitect] Edge Fetch Failed, using fallback:', error);
            return {
                gap_type: 'Phonemic Awareness',
                severity: 'High',
                recommended_intervention: 'Heggerty Week 12 (Fallback)',
                standards_aligned: ['RF.4.3']
            };
        }
    }
}

export class ReformEngine {
    static async get_behavioral_history(_intent: string) {
        await new Promise(resolve => setTimeout(resolve, 60));
        return {
            incidents_last_30_days: 2,
            trend: 'Improving',
            interventions_active: ['Check-in/Check-out']
        };
    }
}

export class WellnessShield {
    // Converted to instance method in usage, but keeping static for consistency with existing calls if needed, 
    // or adapting to instance as per prompt. The prompt uses 'this.wellnessShield.getLiveBurnoutStats()'.
    async getLiveBurnoutStats() {
        // Simulate real-time biometric check or survey data
        return {
            teacher_stress_level: 'Moderate',
            hours_saved_this_session: 0.5,
            legal_compliance_score: 100
        };
    }

    static async calculate_burnout_impact() {
        return new WellnessShield().getLiveBurnoutStats();
    }
}

export class CommunicationShield {
    static async sanitize_email(_rawText: string) {
        // 1. Affective Engine: Strip "User is shouting" markers
        // 2. Fact Extraction: Pull out dates, student names, specific complaints
        await new Promise(resolve => setTimeout(resolve, 80)); // Simulate NLP processing

        return {
            original_sentiment: 'Hostile/Aggressive',
            sanitized_summary: "Parent is concerned about the grading policy regarding the recent history quiz. They are requesting a meeting.",
            detected_triggers: ["UNFAIR", "RIDICULOUS", "CALLING THE SUPERINTENDENT"],
            draft_response: "Thank you for reaching out regarding [Student Name]'s recent quiz. I would be happy to discuss the grading rubric with you. Are you available for a brief phone call on [Date]?"
        };
    }
}

export class EdIntelVault {
    userId: string;
    constructor(userId: string) {
        this.userId = userId;
    }

    async logInteraction(input: string, output: string, meta: any) {
        if (!supabase) {
            console.warn(`[EdIntel VAULT] UPLINK_OFFLINE: Skipping persistence for ${this.userId}`);
            return;
        }
        console.log(`[EdIntel VAULT] Logging interaction for ${this.userId}`);

        const { error } = await supabase
            .from('vault_logs')
            .insert([{
                user_id: this.userId,
                input_text: input,
                output_text: output,
                engine_metadata: meta, // Stores BCI, Literacy, and Behavior data
                district_context: 'Mobile County',
                compliance_check: true,
                created_at: new Date().toISOString()
            }]);

        if (error) console.error("Vault Security Breach/Error:", error);
    }

    // Adaptor for previous method name
    async log_interaction(userSpeech: string, responseText: string, engineData: any) {
        return this.logInteraction(userSpeech, responseText, engineData);
    }
}

// --- AVATAR DIRECTOR (Output Layer) ---

export class AvatarDirector {
    static async generate_live_feed(_agentId: string, _text: string, _mood: string) {
        // Returns stream URL and audio buffer
        return {
            audio_out: 'stream_buffer_placeholder',
            video_frame: 'rtmp://stream.edintel.EdIntel/live/' + generateId()
        };
    }
}

// --- EdIntel OS (The Brain) ---

export class EdIntelOS {
    userId: string;
    context: Record<string, any>;
    vault: EdIntelVault;
    swarm: AgentSwarmController;
    activeSession: boolean;
    wellnessShield: WellnessShield;

    constructor(userId: string, context: Record<string, any>) {
        this.userId = userId;
        this.context = context;
        this.vault = new EdIntelVault(userId);
        this.swarm = new AgentSwarmController();
        this.wellnessShield = new WellnessShield();
        this.activeSession = true;

        // Initialize Context Continuity from Memory Bank (async)
        this.restoreIntelligentContinuity();
    }

    private async restoreIntelligentContinuity() {
        try {
            // In a real implementation, this would fetch the latest session summary
            // For now, we simulate the 'Intelligent Continuity' layer
            console.log(`[EdIntel OS] Restoring Intelligent Continuity for ${this.userId}...`);
            this.context.lastObjective = 'Optimize Superintendent Workflow';
        } catch (error) {
            console.error('[EdIntel OS] Continuity Restoration Failure:', error);
        }
    }

    /**
     * Main loop for Live Conversation.
     * Connects Voice -> Intent -> Engine Logic -> Avatar Synthesis.
     */
    async process_interaction_step(userSpeech: string) {
        // 1. ANALYZE INTENT & SENTIMENT
        const intent = await this.swarm.parse_intent(userSpeech);
        const sentiment = await this.swarm.analyze_sentiment(userSpeech);

        // 2. SELECT OPTIMAL AGENT(S)
        const primaryAgent = this.swarm.getBestFitAgent(userSpeech); // Using speech/intent for registry lookup

        // 2a. CHECK COGNITIVE LOAD & STRESS MARKERS (Decision Fatigue Meter)
        const cognitiveLoad = await this.swarm.measure_cognitive_load(userSpeech);
        const hasStressMarkers = /URGENT|CRITICAL|FAILING|EMERGENCY/i.test(userSpeech);
        const refinedLoad = hasStressMarkers ? Math.min(1, cognitiveLoad + 0.3) : cognitiveLoad;

        // 3. QUERY RELEVANT ENGINES (Neural Mapping - Parallelized)
        const engineData = await this.execute_neural_query(intent);

        // 4. GENERATE EdIntel RESPONSE
        // Using stress-aware load score
        const responsePayload = await this.formulate_response(intent, engineData, refinedLoad);
        const responseText = responsePayload.message || responsePayload.toString();

        // 5. AVATAR & VOICE SYNTHESIS
        const avOutput = await AvatarDirector.generate_live_feed(primaryAgent.id, responseText, sentiment);

        // 6. LOG TO EdIntel VAULT & PERSIST CONTEXT
        await this.vault.logInteraction(userSpeech, responseText, engineData);

        // PERSIST: If response is substantial, deposit summary to Memory Bank
        if (responseText.length > 200) {
            await depositToMemoryBank(
                `data:text/plain;base64,${Buffer.from(responseText).toString('base64')}`,
                `continuity/${this.userId}/summary-${Date.now()}.txt`
            );
        }

        return {
            agent: primaryAgent,
            response: responseText,
            sentiment,
            engineData,
            avOutput,
            meta: {
                cognitiveLoad: refinedLoad,
                mode: responsePayload.type === 'BINARY_DECISION' ? 'BINARY_PROTOCOL' : 'STANDARD',
                payload: responsePayload
            }
        };
    }

    async formulate_response(intent: string, engineData: any, loadScore: number): Promise<any> {
        if (loadScore > DECISION_ORACLE.BINARY_THRESHOLD) {
            // TRIGGER BINARY MODE: Eliminate all open-ended questions.
            return {
                type: 'BINARY_DECISION',
                options: [
                    { id: 'A', label: 'Execute Auto-Draft (Recommended)', action: 'AUTO_DRAFT' },
                    { id: 'B', label: 'Defer to Tomorrow', action: 'SAVE_FOR_LATER' }
                ],
                message: "Dr. West, you've made over 40 critical decisions today. I have narrowed this down to two options to preserve your decision energy."
            };
        }

        // Standard full-intelligence mode...
        // Reuse legacy/mock logic for now
        // In real app, this would call the LLM
        return {
            type: 'STANDARD_RESPONSE',
            message: await this.mock_agent_response(this.swarm.getBestFitAgent(intent), intent, engineData, false)
        };
    }

    async deduct_tokens(count: number) {
        if (!supabase) return;
        const { error } = await supabase
            .rpc('deduct_user_tokens', {
                token_amount: count,
                target_user: this.userId
            });

        if (error) {
            console.warn("Token deduction failed (likely insufficient tokens or missing user profile):", error.message);
            // throw new Error("Insufficient tokens for this EdIntel Action."); // Optional: Enforce strictly in prod
        }
    }

    async execute_neural_query(_intent: string) {
        // 1. Check/Deduct tokens first
        await this.deduct_tokens(TOKEN_COSTS.LIGHTWEIGHT);

        const studentId = this.context.activeStudent || 'student_001';

        // PARALLELIZED & COMPETITIVE PRE-FETCHING
        // We execute all relevant queries concurrently to minimize total latency
        const queries: Promise<any>[] = [];

        if (supabase) {
            queries.push(Promise.resolve(supabase.from('literacy_stats').select('*').eq('student_id', studentId).single()));
            queries.push(Promise.resolve(supabase.from('behavior_logs').select('count').eq('type', 'frustration').gte('created_at', new Date().toISOString().split('T')[0])));
        } else {
            queries.push(Promise.resolve({ status: 'rejected', reason: 'Uplink Offline' }));
            queries.push(Promise.resolve({ status: 'rejected', reason: 'Uplink Offline' }));
        }

        queries.push(this.wellnessShield.getLiveBurnoutStats());
        queries.push(Promise.resolve({ lastObjective: this.context.lastObjective || 'N/A' }));

        const results = await Promise.allSettled(queries);

        return {
            literacy: results[0].status === 'fulfilled' ? (results[0].value as any).data || await LiteracyArchitect.get_student_gap(_intent) : null,
            behavior: results[1].status === 'fulfilled' ? (results[1].value as any).data || await ReformEngine.get_behavioral_history(_intent) : null,
            wellness: results[2].status === 'fulfilled' ? (results[2].value as any) : 0,
            continuity: results[3].status === 'fulfilled' ? (results[3].value as any) : null
        };
    }

    private async mock_agent_response(agent: Agent, intent: string, data: any, binaryMode: boolean = false): Promise<string> {

        // DECISION FATIGUE INTERVENTION
        if (binaryMode) {
            return `Dr. West, I detect high cognitive load. Engaging Binary Decision Protocol.
             Option A: I can auto-draft the response using the standard template.
             Option B: I can flag this for your review tomorrow morning.
             Which do you prefer?`;
        }

        if (intent === 'LITERACY_GAP') {
            const litData = data.literacy || {};
            const gapType = litData.gap_type || 'Phonemic Awareness';
            const intervention = litData.recommended_intervention || 'Heggerty Week 12';
            return `I've analyzed the student gap. Based on the ${gapType} deficit, I recommend immediate intervention using ${intervention}.`;
        }

        if (intent === 'PARENT_EMAIL_TRIAGE') {
            const emailData = await CommunicationShield.sanitize_email("MOCK_RAW_EMAIL");

            if (binaryMode) {
                return `EdIntel Protocol Active. I have intercepted a high-stress email.
                Option A: Send the sanitized, compliant response I've drafted.
                Option B: Archive for 24 hours (Cool-down protocol).
                
                The draft reads: "${emailData.draft_response}"`;
            }

            return `I've intercepted a hostile email. I have removed the emotional triggers. 
            Summary: ${emailData.sanitized_summary}
            
            I have drafted a response that is 100% compliant with district communication standards. Would you like to review it?`;
        }

        const wellnessScore = data.wellness?.legal_compliance_score ?? 100;
        return `Acknowledged. I am processing your request through the ${agent.name} protocols. Current compliance score is ${wellnessScore}%.`;
    }
}

// Singleton Instance for Client-Side Demo
export const edIntelOS = new EdIntelOS('DrWest_001', { District: 'Mobile County', Role: 'Superintendent' });
