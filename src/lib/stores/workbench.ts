import { atom, map, type ReadableAtom, type WritableAtom, type MapStore } from 'nanostores';
import { SandpackClient } from '@codesandbox/sandpack-client';
import { sandpack } from '../sandpack-instance';
import { ActionRunner } from '../runtime/action-runner';
import { EditorStore } from './editor';
import { FilesStore } from './files-store';
import type { FileMap } from './types';
import { PreviewsStore } from './previews-store';
import { TerminalStore } from './terminal-store';

export interface ArtifactState {
  id: string;
  title: string;
  closed: boolean;
  runner: ActionRunner;
}

export type ArtifactUpdateState = Pick<ArtifactState, 'title' | 'closed'>;

type Artifacts = MapStore<Record<string, ArtifactState>>;

export type WorkbenchViewType = 'code' | 'preview';

export class WorkbenchStore {
  #previewsStore = new PreviewsStore();
  #filesStore = new FilesStore();
  #editorStore = new EditorStore(this.#filesStore);
  #terminalStore = new TerminalStore();

  artifacts: Artifacts = map({});

  // ... rest of the class implementation ...
}

export const workbenchStore = new WorkbenchStore();
