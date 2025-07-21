import { createAI } from '@ai-sdk/rsc';
import { submitUserMessage } from './actions';
import { ServerMessage, ClientMessage } from '../lib/ai/types';

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

export const AI = createAI<AIState, UIState>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    submitUserMessage: {
      action: submitUserMessage,
      description: 'Submit a user message to the assistant'
    }
  }
});
