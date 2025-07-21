import { atom, type WritableAtom } from 'nanostores';
import type { ITerminal } from '~/types/terminal';
import type { WebContainer } from '@webcontainer/api';

export class TerminalStore {
  #webcontainer: WebContainer;
  #terminal: ITerminal | undefined;

  showTerminal: WritableAtom<boolean> = atom(false);

  constructor(webcontainer: WebContainer) {
    this.#webcontainer = webcontainer;
  }

  toggleTerminal(value?: boolean) {
    this.showTerminal.set(value ?? !this.showTerminal.get());
  }

  attachTerminal(terminal: ITerminal) {
    this.#terminal = terminal;
    this.#webcontainer.on('terminal-ready', () => {
      this.#terminal?.focus();
    });
  }

  onTerminalResize(cols: number, rows: number) {
    this.#webcontainer.on('terminal-resize', () => {
      this.#terminal?.setOption('rows', rows);
      this.#terminal?.setOption('cols', cols);
    });
  }
}