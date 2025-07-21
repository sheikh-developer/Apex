import { atom, map } from 'nanostores';
import type { MapStore } from 'nanostores';
import type { FileMap } from './types';
import type { SandpackBundler } from '@codesandbox/sandpack-client';

export const files = atom<FileMap>({});

export class FilesStore {
  #bundler: SandpackBundler;

  files: MapStore<FileMap> = map({});
  filesCount = 0;

  constructor(bundler: SandpackBundler) {
    this.#bundler = bundler;
  }

  async init() {
    const files = this.#bundler.getFiles();
    
    this.files.set(
      Object.fromEntries(
        Object.entries(files).map(([filePath, content]) => {
          if (typeof content === 'string') {
            return [filePath, { type: 'file', content }];
          }
          return [filePath, { type: 'folder' }];
        })
      )
    );

    this.filesCount = files.length;
  }

  getFile(filePath: string) {
    return this.files.get()[filePath];
  }

  async saveFile(filePath: string, content: string) {
    await this.#bundler.updateFile(filePath, content);
  }

  getFileModifications() {
    // TODO: implement this
    return [];
  }

  resetFileModifications() {
    // TODO: implement this
  }
}
