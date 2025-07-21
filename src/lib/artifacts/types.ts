// This is a placeholder file for artifact types.
// In a real project, this would contain type definitions for artifacts.
// For the purpose of this task, we are creating a dummy file to resolve the import error.

export interface DocumentHandler {
  kind: string;
  onCreateDocument: (params: { title: string; dataStream: any }) => Promise<string>;
  onUpdateDocument: (params: { document: any; description: string; dataStream: any }) => Promise<string>;
}
