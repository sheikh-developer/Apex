import { 
  SandpackProvider,
  SandpackPreview,
  type SandpackFiles
} from '@codesandbox/sandpack-react';
import type { SandpackMessage } from '@codesandbox/sandpack-client';

export interface SandboxFile {
  code: string;
  hidden?: boolean;
}

class SandpackInstance {
  #files: SandpackFiles;
  #sandpackRef?: typeof SandpackPreview;

  constructor(options: { files?: SandpackFiles } = {}) {
    this.#files = options.files || {};
  }

  setSandpackRef(ref: typeof SandpackPreview) {
    this.#sandpackRef = ref;
  }

  getFiles() {
    return this.#files;
  }

  updateFile(path: string, content: string) {
    this.#files[path] = { code: content };
  }

  listen(event: string, callback: (message: SandpackMessage) => void) {
    // Listen handled by SandpackProvider
  }

  dispatch(event: string, data?: any) {
    // Dispatch handled by SandpackProvider
  }

}

// Export singleton instance
export const sandpack = new SandpackInstance();
