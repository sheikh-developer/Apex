import { atom, map } from 'nanostores';
import type { MapStore } from 'nanostores';
import { sandpack } from '~/lib/sandpack-instance';
import type { FileMap, FileEntry } from './types';

export class FilesStore {
  #sandpack = sandpack;
  files: MapStore<FileMap> = map({});
  value: FileMap = {};
  filesCount = 0;

  get(): FileMap {
    return this.files.get();
  }

  set(files: FileMap): void {
    this.files.set(files);
    this.value = files;
  }

  async init() {
    const sandpackFiles = this.#sandpack.getFiles();
    const fileMap = Object.entries(sandpackFiles).reduce((acc, [path, content]) => {
      acc[path] = typeof content === 'string' 
        ? { type: 'file', content } 
        : { type: 'directory' };
      return acc;
    }, {} as FileMap);

    this.set(fileMap);
    this.filesCount = Object.keys(fileMap).length;
  }

  getFile(filePath: string): FileEntry | undefined {
    return this.files.get()[filePath];
  }

  async saveFile(filePath: string, content: string) {
    await this.#sandpack.updateFile(filePath, content);
    const currentFiles = this.get();
    currentFiles[filePath] = { type: 'file', content };
    this.set(currentFiles);
  }
}

export const filesStore = new FilesStore();
