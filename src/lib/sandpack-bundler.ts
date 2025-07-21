import { SandpackClient } from '@codesandbox/sandpack-client';
import type { SandpackMessage, SandpackRuntimeMessage } from '@codesandbox/sandpack-client';

interface SandboxFile {
  code: string;
  hidden?: boolean;
}

export class SandpackBundler {
  #client: SandpackClient;
  #files: Record<string, SandboxFile>;
  #iframe: HTMLIFrameElement;

  constructor(options: { files: Record<string, SandboxFile> }) {
    this.#files = options.files;
    this.#iframe = document.createElement('iframe');
    this.#iframe.id = 'sandpack-runtime';
    this.#frame.sandbox = 'allow-scripts allow-same-origin';
    document.body.appendChild(this.#iframe);
    
    this.#client = new SandpackClient(
      this.#iframe,
      {
        template: 'react',
        files: this.#files,
        showOpenInCodeSandbox: false
      }
    );
  }

  async init(): Promise<void> {
    return new Promise((resolve) => {
      this.#client.listen((msg: SandpackMessage) => {
        if (msg.type === 'done') {
          resolve();
        }
      });
    });
  }

  updateFile(path: string, content: string): void {
    this.#client.dispatch({
      type: 'updateFile',
      path,
      content
    });
    this.#files[path] = { code: content, hidden: false };
  }

  async runCommand(command: string): Promise<void> {
    this.#client.dispatch({
      type: 'runCommand',
      command
    });
    return Promise.resolve();
  }

  onTerminalReady(callback: () => void): void {
    this.#client.listen((msg: SandpackRuntimeMessage) => {
      if (msg.type === 'shell/ready') {
        callback();
      }
    });
  }

  onTerminalResize(callback: (cols: number, rows: number) => void): void {
    this.#client.listen((msg: SandpackRuntimeMessage) => {
      if (msg.type === 'shell/resize') {
        callback(msg.cols, msg.rows);
      }
    });
  }

  dispose(): void {
    this.#client.cleanup();
    document.body.removeChild(this.#iframe);
  }
}
