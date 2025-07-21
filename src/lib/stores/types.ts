export interface FileEntry {
  type: 'file' | 'directory';
  content?: string;
  children?: FileEntry[];
}

export type FileMap = Record<string, FileEntry | undefined>;

export interface FilesStore {
  value: FileMap;
  get(): FileMap;
  set(files: FileMap): void;
}
