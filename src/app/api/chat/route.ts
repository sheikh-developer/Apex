import { GoogleGenerativeAI } from '@google/generative-ai'; // Still used for initializing the client
import { streamText, convertToModelMessages, UIMessage } from 'ai'; // NEW AI SDK 5 imports
import { google } from '@ai-sdk/google'; // NEW AI SDK 5 Google provider

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Use the new google provider from @ai-sdk/google
  // The API key is usually picked up automatically from process.env, or can be passed explicitly.
  const model = google('models/gemini-1.5-pro'); // Specify your model here

  const result = await streamText({
    model: model,
    // Convert UIMessages from the client to ModelMessages for the LLM
    messages: convertToModelMessages(messages),
  });

  // Convert the stream back to UIMessageStreamResponse for the client
  return result.toUIMessageStreamResponse();
}
