import { atom, type WritableAtom } from 'nanostores';
import { sandpack } from '~/lib/sandpack-instance';

export class TerminalStore {
  #sandpack = sandpack;
  showTerminal: WritableAtom<boolean> = atom(false);

  toggleTerminal(value?: boolean) {
    this.showTerminal.set(value ?? !this.showTerminal.get());
  }

  attachTerminal() {
    // Terminal functionality is handled by Sandpack Preview
  }

  onTerminalResize() {
    // Resize is handled by Sandpack Preview
  }
}
