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
// src/lib/mcp.ts
// Utility to load and launch MCP servers as defined in mcp.config.json

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const configPath = path.resolve(__dirname, '../../mcp.config.json');

export interface McpServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

export interface McpConfig {
  mcpServers: Record<string, McpServerConfig>;
}

export function loadMcpConfig(): McpConfig {
  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw);
}

export function launchMcpServer(name: string) {
  const config = loadMcpConfig();
  const server = config.mcpServers[name];
  if (!server) throw new Error(`No MCP server config for ${name}`);
  const proc = spawn(server.command, server.args, {
    env: { ...process.env, ...(server.env || {}) },
    stdio: 'inherit',
    shell: true,
  });
  proc.on('close', code => {
    console.log(`[MCP] ${name} server exited with code ${code}`);
  });
  return proc;
}

export function launchAllMcpServers() {
  const config = loadMcpConfig();
  Object.keys(config.mcpServers).forEach(launchMcpServer);
}
