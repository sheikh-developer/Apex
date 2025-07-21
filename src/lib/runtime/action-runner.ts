import { SandpackBundler } from '../sandpack-bundler';
import type { ActionCallbackData } from './message-parser';

export class ActionRunner {
  #bundler: SandpackBundler;

  constructor(bundler: SandpackBundler) {
    this.#bundler = bundler;
  }

}
