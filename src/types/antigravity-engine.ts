/**
 * Antigravity Infrastructure Engine Type Declarations
 * Protocol Specification: A2A/2026.1 & MCP v1.0
 */

export interface AgentRegistryItem {
    agent_id: string;
    agent_name: string;
    tier_level: 1 | 2 | 3 | 4;
    role_description: string;
    assigned_model: string;
    mcp_tools_enabled: string[];
    is_active: boolean;
    created_at?: string;
}

export interface A2ARoutingPayload {
    protocol: 'A2A/2026.1';
    trace_id: string;
    sender_agent: string;
    recipient_agent: string;
    execution_tier: 1 | 2 | 3 | 4;
    task_context: {
        action: string;
        student_id?: string;
        observation_logs?: string[];
        [key: string]: unknown;
    };
    constraints: {
        grounding_required: boolean;
        max_token_budget: number;
        require_human_gate: boolean;
    };
}

export interface MCPToolDeclaration {
    mcp_version: string;
    tool_name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, {
            type: string;
            items?: { type: string };
            enum?: string[];
            default?: unknown;
            description?: string;
        }>;
        required: string[];
    };
}

export interface AgentExecutionTask {
    task_id: string;
    parent_task_id?: string | null;
    target_agent_id: string;
    user_id: string;
    payload: Record<string, unknown>;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'awaiting_human_approval';
    result?: Record<string, unknown> | null;
    requires_human_approval: boolean;
    verified_by_human: boolean;
    human_verifier_id?: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserTokenBalance {
    user_id: string;
    subscription_tier: string;
    allocated_tokens: number;
    used_tokens: number;
    updated_at: string;
}

export interface HumanVerificationResult {
    success: boolean;
    taskId: string;
    auditTimestamp: string;
}
