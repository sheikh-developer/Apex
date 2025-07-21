import { atom, map } from 'nanostores';
import type { MapStore } from 'nanostores';
import type { FileMap } from './types';
import { SandpackBundler } from '../sandpack-bundler';

export const files = atom<FileMap>({});

export class FilesStore {
  #bundler: SandpackBundler;

  files: MapStore<FileMap> = map({});
  filesCount = 0;

  constructor(bundler: SandpackBundler) {
    this.#bundler = bundler;
  }

  async init() {
    // TODO: Implement file initialization without direct bundler access
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
