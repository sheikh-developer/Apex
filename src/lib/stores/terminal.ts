import { atom, type WritableAtom } from 'nanostores';
import type { SandpackBundler } from '@codesandbox/sandpack-client';

export class TerminalStore {
  #bundler: SandpackBundler;
  showTerminal: WritableAtom<boolean> = atom(false);

  constructor(bundler: SandpackBundler) {
    this.#bundler = bundler;
  }

  toggleTerminal(value?: boolean) {
    this.showTerminal.set(value ?? !this.showTerminal.get());
  }

  // These methods are now handled by Sandpack's built-in terminal
  attachTerminal() {}
  onTerminalResize() {}
}