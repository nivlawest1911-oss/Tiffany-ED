import { generateText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function handleAntigravityOrchestration(
  userId: string,
  userPrompt: string
) {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase client unconfigured: missing SUPABASE_URL or SERVICE_ROLE_KEY.');
  }

  // 1. Check and deduct user token quota (10 tokens for orchestration)
  const { error: tokenError } = await supabase.rpc('deduct_agent_tokens', {
    p_user_id: userId,
    p_token_cost: 10,
  });
  if (tokenError) throw new Error(`Quota Exceeded: ${tokenError.message}`);

  // 2. Executive Orchestrator analyzes task and dispatches sub-agents
  const orchestratorResponse = await generateText({
    model: createOpenAI({ apiKey: process.env.OPENAI_API_KEY || '' })('gpt-4o'),
    system: `You are the Chief Executive Orchestrator Agent. Deconstruct goals into structured sub-tasks and assign them to specialized domain supervisors or micro-agents.`,
    prompt: userPrompt,
    tools: {
      dispatchSubtask: tool({
        description: 'Dispatch a tactical task to a specialized lower-tier agent.',
        inputSchema: z.object({
          targetAgentId: z.string(),
          taskPayload: z.record(z.any()),
          requiresHumanApproval: z.boolean(),
        }),
        execute: async ({ targetAgentId, taskPayload, requiresHumanApproval }: { targetAgentId: string; taskPayload: Record<string, any>; requiresHumanApproval: boolean }) => {
          // Insert sub-task into Supabase Execution Queue
          const { data: task, error } = await supabase
            .from('agent_execution_queue')
            .insert({
              target_agent_id: targetAgentId,
              user_id: userId,
              payload: taskPayload,
              status: requiresHumanApproval ? 'awaiting_human_approval' : 'pending',
              requires_human_approval: requiresHumanApproval,
            })
            .select()
            .single();

          if (error) throw new Error(`Dispatch Failure: ${error.message}`);
          return { status: 'dispatched', taskId: task.task_id };
        },
      }),
    },
  });

  return {
    orchestratorSummary: orchestratorResponse.text,
    toolCalls: orchestratorResponse.toolCalls,
  };
}
