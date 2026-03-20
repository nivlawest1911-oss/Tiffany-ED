import { createAI, getMutableAIState } from '@ai-sdk/rsc';
import { startEdIntelSession } from '@/app/actions/ai-session';
import { ReactNode } from 'react';

// Define the AI and UI state types
export type AIState = {
  chatId: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system' | 'tool';
    content: string;
    id?: string;
    name?: string;
    display?: ReactNode;
  }>;
};

export type UIState = Array<{
  id: string;
  display: ReactNode;
}>;

// Helper to submit user message
async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<AIProvider>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        role: 'user',
        content,
      },
    ],
  });

  // Call the core session action
  // Note: we use 'system-user' as a placeholder for the authenticated user ID
  // In production, this should ideally come from the session on the server
  const ui = await startEdIntelSession('system-user', content); 

  return ui;
}

// Create the AI provider
export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: Date.now().toString(), messages: [] },
});

export type AIProvider = typeof AI;
