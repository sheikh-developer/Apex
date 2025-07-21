import { sandpack } from '~/lib/sandpack-instance';
import type { ActionCallbackData } from './message-parser';

export interface ActionData {
  id: string;
  callback: string;
}

export class ActionRunner {
  #sandpack = sandpack;

  addAction(data: ActionData) {
    // Actions are now handled through Sandpack's preview
    const files = this.#sandpack.getFiles();
    const path = `/actions/${data.id}.ts`;
    this.#sandpack.updateFile(path, `export default ${data.callback}`);
  }

  runAction(data: ActionData) {
    // Run actions through Sandpack's preview
    const actionPath = `/actions/${data.id}.ts`;
    if (this.#sandpack.getFiles()[actionPath]) {
      // Using SandpackPreview to handle action execution
      this.#sandpack.updateFile('/runner.ts', `
        import action from '${actionPath}';
        action();
      `);
    }
  }
}
