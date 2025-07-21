import { loadSandpackClient } from '@codesandbox/sandpack-client';
import type { SandboxSetup, ClientOptions, SandpackTemplate } from '@codesandbox/sandpack-client';

export class SandpackClient {
  private clientPromise: Promise<any>;

  constructor(private iframeSelector: string | HTMLIFrameElement) {
    this.clientPromise = Promise.resolve(null);
  }

  async init(sandboxSetup: SandboxSetup, options?: ClientOptions) {
    this.clientPromise = loadSandpackClient(
      this.iframeSelector,
      {
        files: sandboxSetup.files,
        dependencies: sandboxSetup.dependencies || {},
        template: sandboxSetup.template || 'react' as SandpackTemplate
      },
      {
        bundlerURL: 'https://sandpack-bundler.codesandbox.io', 
        showOpenInCodeSandbox: false,
        ...options
      }
    );
    return this.clientPromise;
  }

  async updateFiles(files: Record<string, { code: string }>) {
    const client = await this.clientPromise;
    return client?.updateSandbox({ files });
  }

  async runCommand(command: string) {
    const client = await this.clientPromise;
    return client?.dispatch({
      type: 'action',
      action: command
    });
  }
}
