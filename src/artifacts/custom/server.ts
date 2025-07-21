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
      if (delta.type === "text") {
        draftContent += delta.text;
        dataStream.writeData({
          type: "content-update",
          content: delta.text,
        });
      }
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
      if (delta.type === "text") {
        draftContent += delta.text;
        dataStream.writeData({
          type: "content-update",
          content: delta.text,
        });
      }
    }
 
    return draftContent;
  },
});
