export interface McpServer {
  command: string;
  args: string[];
  description: string;
  tools: string[];
  env?: Record<string, string>;
  security?: {
    allowedPaths?: string[];
    restrictedOperations?: string[];
  };
}

export interface AgentTemplate {
  name: string;
  description: string;
  requiredTools: string[];
  optionalTools: string[];
  capabilities: string[];
}

export interface FileSystemRestrictions {
  allowedExtensions: string[];
  maxFileSize: string;
  maxFilesPerOperation: number;
}

export interface SecurityConfig {
  enableSafeMode: boolean;
  allowedDomains: string[];
  restrictedDomains: string[];
  fileSystemRestrictions: FileSystemRestrictions;
}

export interface PerformanceConfig {
  maxConcurrentOperations: number;
  timeoutMs: number;
  retryAttempts: number;
  cacheResults: boolean;
  cacheDurationMs: number;
}

export interface McpConfig {
  name: string;
  version: string;
  description: string;
  mcpServers: Record<string, McpServer>;
  agentTemplates: Record<string, AgentTemplate>;
  security: SecurityConfig;
  performance: PerformanceConfig;
}
