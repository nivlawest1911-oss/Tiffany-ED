import { createAI } from '@ai-sdk/rsc';
import { ReactNode } from 'react';
import { Message, submitUserMessage } from './actions';

export const AI = createAI({
    actions: {
        submitUserMessage,
    },
    initialAIState: [] as Message[],
    initialUIState: [] as { id: string; display: ReactNode }[],
});
