import { map, type MapStore } from 'nanostores';
import type { WebContainer } from '~/lib/webcontainer';

export interface Preview {
  url: string;
}

export class PreviewsStore {
  #webcontainer: WebContainer;

  previews: MapStore<Record<string, Preview>> = map({});

  constructor(webcontainer: WebContainer) {
    this.#webcontainer = webcontainer;
  }

  async init() {
    // TODO: implement this
  }
}