/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
import { createAI } from '@ai-sdk/rsc';
import { submitUserMessage } from './actions';
import { ServerMessage, ClientMessage } from '../lib/ai/types';
import { enhancedProvider } from '../lib/ai/providers';
import { generateId } from 'ai';

export type AIState = { chatId: string; messages: ServerMessage[] };
export type UIState = ClientMessage[];

export const AI = createAI<AIState, UIState>({
  initialAIState: { chatId: generateId(), messages: [] } as AIState,
  initialUIState: [] as UIState,
  actions: {
    submitUserMessage
  }
});
