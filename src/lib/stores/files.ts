import { atom } from 'nanostores';
import type { FileMap } from './types';

export const files = atom<FileMap>({});

export class FilesStore {
  #webcontainer: WebContainer;

  files: MapStore<FileMap> = map({});
  filesCount = 0;

  constructor(webcontainer: WebContainer) {
    this.#webcontainer = webcontainer;
  }

  async init() {
    const files = await this.#webcontainer.fs.readdir('/', { recursive: true });

    this.files.set(
      Object.fromEntries(
        await Promise.all(
          files.map(async (filePath) => {
            const stat = await this.#webcontainer.fs.stat(filePath);

            if (stat.isFile()) {
              const content = await this.#webcontainer.fs.readFile(filePath, 'utf8');
              return [filePath, { type: 'file', content }];
            }

            if (stat.isDirectory()) {
              return [filePath, { type: 'folder' }];
            }

            return [filePath, undefined];
          }),
        ),
      ),
    );

    this.filesCount = files.length;
  }

  getFile(filePath: string) {
    return this.files.get()[filePath];
  }

  async saveFile(filePath: string, content: string) {
    await this.#webcontainer.fs.writeFile(filePath, content);
  }

  getFileModifications() {
    // TODO: implement this
    return [];
  }

  resetFileModifications() {
    // TODO: implement this
  }
}
