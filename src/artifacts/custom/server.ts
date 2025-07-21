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
import { smoothStream, streamText } from "ai";
import { enhancedProvider } from "../../lib/ai/providers";
import { createDocumentHandler } from "../../lib/artifacts/server";
import { updateDocumentPrompt } from "../../lib/ai/prompts";
 
export const customDocumentHandler = createDocumentHandler<"custom">({
  kind: "custom",
  // Called when the document is first created.
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";
    // For demonstration, use streamText to generate content.
    const { fullStream } = streamText({
      model: enhancedProvider.languageModel("artifact-model"),
      system:
        "Generate a creative piece based on the title. Markdown is supported.",
      experimental_transform: smoothStream({ chunking: "word" }),
      prompt: title,
    });
 
    // Stream the content back to the client.
    for await (const delta of fullStream) {
      draftContent += delta;
      dataStream.writeData({
        type: "content-update",
        content: delta,
      });
    }
 
    return draftContent;
  },
  // Called when updating the document based on user modifications.
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";
    const { fullStream } = streamText({
      model: enhancedProvider.languageModel("artifact-model"),
      system: updateDocumentPrompt(document.content, "custom"),
      experimental_transform: smoothStream({ chunking: "word" }),
      prompt: description,
    });
 
    for await (const delta of fullStream) {
      draftContent += delta;
      dataStream.writeData({
        type: "content-update",
        content: delta,
      });
    }
 
    return draftContent;
  },
});
