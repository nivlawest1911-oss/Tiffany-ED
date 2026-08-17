import { createClient } from '@supabase/supabase-js';
import { HumanVerificationResult } from '@/types/antigravity-engine';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function verifyAndReleaseTask(
  taskId: string,
  humanVerifierId: string,
  approvedContent: Record<string, any>
): Promise<HumanVerificationResult> {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase client unconfigured: missing SUPABASE_URL or SERVICE_ROLE_KEY.');
  }

  // 1. Fetch Task State
  const { data: task, error: fetchError } = await supabase
    .from('agent_execution_queue')
    .select('*')
    .eq('task_id', taskId)
    .single();

  if (fetchError || !task) throw new Error('Target task execution not found.');
  if (!task.requires_human_approval) {
    throw new Error('This task does not require explicit human authorization.');
  }

  // 2. Commit Human Verification Signature to Audit Trail
  const { data: updatedTask, error: updateError } = await supabase
    .from('agent_execution_queue')
    .update({
      status: 'completed',
      verified_by_human: true,
      human_verifier_id: humanVerifierId,
      result: approvedContent,
      updated_at: new Date().toISOString(),
    })
    .eq('task_id', taskId)
    .select()
    .single();

  if (updateError) throw new Error(`Verification Lock Failed: ${updateError.message}`);

  return {
    success: true,
    taskId: updatedTask.task_id,
    auditTimestamp: updatedTask.updated_at,
  };
}
