export interface ActionCallbackData {
  messageId: string;
  actionId: string;
  name: string;
  args: Record<string, unknown>;
}

export interface ArtifactCallbackData {
  messageId: string;
  id: string;
  title: string;
}