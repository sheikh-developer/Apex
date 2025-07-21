import { map, type MapStore } from 'nanostores';
import type { SandpackClient } from '@codesandbox/sandpack-client';

export interface Preview {
  url: string;
}

export class PreviewsStore {
  #client: SandpackClient;

  previews: MapStore<Record<string, Preview>> = map({});

  constructor(client: SandpackClient) {
    this.#client = client;
  }

  async init() {
    const iframe = await this.#client.iframe;
    if (iframe) {
      this.previews.set({
        default: { url: iframe.src }
      });
    }
  }
}