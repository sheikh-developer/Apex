// Apex with MCP Server Integration
import { GoogleGenAI } from '@google/genai';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

interface MCPServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
  url?: string;
}

interface ApexMCPConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  thinkingBudget?: number;
  mcpServers?: Record<string, MCPServerConfig>;
  workingDirectory?: string;
}

export class ApexMCPAgent {
  private ai: GoogleGenAI;
  private config: ApexMCPConfig;
  private mcpClients: Map<string, Client> = new Map();
  private availableTools: Map<string, any> = new Map();

  constructor(apiKey?: string, config: ApexMCPConfig = {}) {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY must be provided or set in environment');
    }
    
    this.ai = new GoogleGenAI({ apiKey: key });
    this.config = {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      maxTokens: 8192,
      thinkingBudget: 24576,
      workingDirectory: process.cwd(),
      mcpServers: {
        // Web Automation
        puppeteer: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-puppeteer']
        },
        playwright: {
          command: 'npx', 
          args: ['@playwright/mcp@latest', '--headless']
        },
        
        // System & Memory
        memory: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-memory']
        },
        filesystem: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-filesystem', config.workingDirectory || process.cwd()]
        },
        time: {
          command: 'uvx',
          args: ['mcp-server-time', '--local-timezone=America/New_York']
        },
        
        // Development Tools
        github: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-github'],
          env: {
            GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN || ''
          }
        },
        
        // AI Enhancement
        'sequential-thinking': {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-sequential-thinking']
        }
      },
      ...config
    };
  }

  async initialize(): Promise<void> {
    console.log('🚀 Initializing Apex with MCP servers...\n');
    
    for (const [serverName, serverConfig] of Object.entries(this.config.mcpServers!)) {
      try {
        await this.connectMCPServer(serverName, serverConfig);
      } catch (error) {
        console.warn(`⚠️  Could not connect to ${serverName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    console.log(`✅ Initialized with ${this.mcpClients.size} MCP servers\n`);
    this.logAvailableTools();
  }

  private async connectMCPServer(name: string, config: MCPServerConfig): Promise<void> {
    const transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env: { ...process.env, ...config.env }
    });

    const client = new Client({
      name: `apex-${name}-client`,
      version: '1.0.0'
    }, {
      capabilities: {
        resources: {},
        tools: {},
        prompts: {}
      }
    });

    await client.connect(transport);
    this.mcpClients.set(name, client);

    // Get available tools from this server
    const toolsResponse = await client.listTools();
    toolsResponse.tools.forEach(tool => {
      this.availableTools.set(tool.name, { ...tool, server: name });
    });

    console.log(`✅ Connected to ${name} (${toolsResponse.tools.length} tools)`);
  }

  private logAvailableTools(): void {
    console.log('🔧 Available Tools:');
    for (const [toolName, toolInfo] of this.availableTools.entries()) {
      console.log(`   • ${toolName} (${toolInfo.server}): ${toolInfo.description || 'No description'}`);
    }
    console.log('');
  }

  async executeMCPTool(toolName: string, parameters: any): Promise<any> {
    const toolInfo = this.availableTools.get(toolName);
    if (!toolInfo) {
      throw new Error(`Tool ${toolName} not available`);
    }

    const client = this.mcpClients.get(toolInfo.server);
    if (!client) {
      throw new Error(`MCP client for ${toolInfo.server} not connected`);
    }

    try {
      const result = await client.callTool({
        name: toolName,
        arguments: parameters
      });
      return result;
    } catch (error) {
      console.error(`Error executing ${toolName}:`, error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    console.log('\n🧹 Cleaning up MCP connections...');
    
    for (const [name, client] of this.mcpClients.entries()) {
      try {
        await client.close();
        console.log(`✅ Closed ${name}`);
      } catch (error) {
        console.warn(`⚠️  Error closing ${name}:`, error);
      }
    }
    
    this.mcpClients.clear();
    this.availableTools.clear();
  }
}
