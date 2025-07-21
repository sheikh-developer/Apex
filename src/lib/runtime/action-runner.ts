import type { SandpackClient } from '@codesandbox/sandpack-client';
import type { ActionCallbackData } from './message-parser';

export class ActionRunner {
  #client: SandpackClient;

  constructor(client: SandpackClient) {
    this.#client = client;
  }

  addAction(data: ActionCallbackData) {
    // Actions are now handled through Sandpack's message system
    this.#client.dispatch({ type: 'action', payload: data });
  }

  runAction(data: ActionCallbackData) {
    // Run actions through Sandpack's bundler
    this.#client.dispatch({ type: 'run-action', payload: data });
  }
}