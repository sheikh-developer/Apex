import type { WebContainer } from '@webcontainer/api';
import type { ActionCallbackData } from './message-parser';

export class ActionRunner {
  #webcontainer: WebContainer;

  constructor(webcontainer: WebContainer) {
    this.#webcontainer = webcontainer;
  }

  addAction(data: ActionCallbackData) {
    // TODO: implement this
  }

  runAction(data: ActionCallbackData) {
    // TODO: implement this
  }
}