/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
import { streamUI, getMutableAIState } from '@ai-sdk/rsc';
import { enhancedProvider } from '../lib/ai/providers';
import { z } from 'zod';
import { ClientMessage } from '../lib/ai/types';
import 'dotenv/config';
import { ApexMCPAgent } from '../lib/ai/mcp-agent';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

export async function submitUserMessage(input: string): Promise<ClientMessage> {
  'use server';

  const aiState = getMutableAIState();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: input,
      id: Date.now().toString()
    }
  ]);

  const model = enhancedProvider.languageModel('gemini-1.5-flash');
  const agent = new ApexMCPAgent(process.env.GEMINI_API_KEY);
  await agent.initialize();

  const ui = await streamUI({
    model: model as any,
    system: 'You are an AI assistant that can use tools to perform tasks.',
    prompt: input,
    text: ({ content }) => {
      return <div>{content}</div>;
    },
    tools: {
      executeTool: {
        description: 'Executes a tool with the given parameters.',
        parameters: z.object({
          toolName: z.string().describe('The name of the tool to execute.'),
          parameters: z.any().describe('The parameters for the tool.'),
        }),
        generate: async function* ({ toolName, parameters }) {
          yield `Executing tool: ${toolName}...`;
          try {
            // @ts-ignore
            const result = await agent.executeMCPTool(toolName, parameters);
            return <div>Tool {toolName} executed successfully: {JSON.stringify(result)}</div>;
          } catch (error) {
            return <div>Error executing tool {toolName}: {error instanceof Error ? error.message : 'Unknown error'}</div>;
          }
        },
      },
    },
  });

  aiState.done([
    ...aiState.get(),
    {
      role: 'assistant',
      content: 'Responded to user message',
      id: Date.now().toString()
    }
  ]);

  return {
    id: Date.now().toString(),
    role: 'assistant',
    display: ui.value
  };
}
