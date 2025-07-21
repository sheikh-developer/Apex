import { 
  SandpackProvider, 
  SandpackPreview,
  type SandpackBundlerFiles,
  type SandpackFiles,
  type SandpackMessage
} from '@codesandbox/sandpack-react';

export interface SandboxFile {
  code: string;
  hidden?: boolean;
}

class SandpackInstance {
  #files: SandpackFiles;
  #sandpackRef?: SandpackPreview;

  constructor(options: { files?: SandpackFiles } = {}) {
    this.#files = options.files || {};
  }

  setSandpackRef(ref: SandpackPreview) {
    this.#sandpackRef = ref;
  }

  getFiles() {
    return this.#files;
  }

  updateFile(path: string, content: string) {
    this.#files[path] = { code: content };
    this.#sandpackRef?.refresh();
  }

  listen(event: string, callback: (message: SandpackMessage) => void) {
    // Listen handled by SandpackProvider
  }

  dispatch(event: string, data?: any) {
    // Dispatch handled by SandpackProvider
  }

  cleanup() {
    // Cleanup handled by React unmount
  }
}

// Export singleton instance
export const sandpack = new SandpackInstance();
