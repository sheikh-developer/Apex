import { map, type MapStore } from 'nanostores';
import { sandpack } from '~/lib/sandpack-instance';

export interface Preview {
  url: string;
}

export class PreviewsStore {
  #sandpack = sandpack;
  previews: MapStore<Record<string, Preview>> = map({});

  async init() {
    // Preview is handled by Sandpack Preview component
    this.previews.set({
      default: { url: '' } // URL will be set by Sandpack Preview component
    });
  }
}
