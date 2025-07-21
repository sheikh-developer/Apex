// This is a placeholder file for the AI providers.
// In a real project, this would contain the actual implementation of the AI providers.
// For the purpose of this task, we are creating a dummy file to resolve the import error.

import { LanguageModel } from "ai";

export const enhancedProvider = {
  languageModel: (modelName: string): LanguageModel => {
    return {
      modelId: modelName,
      provider: "dummy",
      specificationVersion: "v2",
      supportedUrls: {},
      doGenerate: async () => {
        throw new Error("Dummy LanguageModel: doGenerate not implemented.");
      },
      doStream: async () => {
        throw new Error("Dummy LanguageModel: doStream not implemented.");
      },
    };
  },
};
