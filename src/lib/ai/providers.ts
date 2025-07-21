/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const enhancedProvider = {
  languageModel: (modelName: string) => {
    const model = google.getGenerativeModel({ model: modelName });
    return {
      supports: {
        multiModal: true,
        tools: true,
        structuredOutput: true,
        streaming: true
      },
      stream: async (prompt: string, options?: any) => {
        const result = await model.generateContentStream({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          ...options
        });
        
        return result.stream;
      }
    };
  },
};
