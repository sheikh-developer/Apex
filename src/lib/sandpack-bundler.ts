import { SandpackMessage, loadSandpackClient, SandpackClient as SandpackClientBase } from '@codesandbox/sandpack-client';

interface SandboxFile {
  code: string;
  hidden?: boolean;
}

export class SandpackBundler {
  #client: SandpackClientBase | null = null;
  #files: Record<string, SandboxFile>;
  #iframe: HTMLIFrameElement;

  constructor(options: { files: Record<string, SandboxFile> }) {
    this.#files = options.files;
    this.#iframe = document.createElement('iframe');
    this.#iframe.id = 'sandpack-runtime';
    this.#iframe.sandbox = 'allow-scripts allow-same-origin';
    document.body.appendChild(this.#iframe);
  }

  async init(): Promise<void> {
    this.#client = await loadSandpackClient(
      this.#iframe,
      {
        template: 'create-react-app',
        files: this.#files,
      },
      {
        showOpenInCodeSandbox: false
      }
    );

    return new Promise((resolve) => {
      if (!this.#client) throw new Error('Client not initialized');
      this.#client.listen((msg: SandpackMessage) => {
        if (msg.type === 'done') {
          resolve();
        }
      });
    });
  }

  updateFile(path: string, content: string): void {
    if (!this.#client) throw new Error('Client not initialized');
    this.#files[path] = { code: content, hidden: false };
    this.#client.updateSandbox({ files: this.#files });
  }

  dispose(): void {
    if (!this.#client) return;
    this.#client.destroy();
    document.body.removeChild(this.#iframe);
  }
}
